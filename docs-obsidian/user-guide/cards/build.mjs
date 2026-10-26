#!/usr/bin/env node
// Renders the task cards (cards.<lang>.json + ui.<lang>.json + template.html)
// to dist/<id>.png (@2x), dist/<id>.pdf (A5) and dist/all-cards.pdf.
// It FAILS (exit 1, message names the card) when a card breaks a format rule,
// an image is missing or a card does not fit its page.
//
//   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node build.mjs [--lang en] [--only R1,R2] [--check] [--debug]
//
//   --lang xx   use cards.xx.json / ui.xx.json (missing text falls back to English)
//   --only ids  render only these cards (all-cards.pdf is then not written)
//   --check     validate the data only; do not start a browser
//   --debug     also write failing cards to dist/_debug/ so you can look at them
//   --out dir   output folder (default dist, or dist/<lang> for another language)
import fs from 'node:fs';
import path from 'node:path';
import {createRequire, } from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? (args[i + 1] ?? true) : d; };
const flag = n => args.includes('--' + n);
const lang = opt('lang', 'en');
const only = opt('only', null)?.split(',').map(s => s.trim()).filter(Boolean);
const outDir = path.resolve(here, opt('out', lang === 'en' ? 'dist' : path.join('dist', lang)));

const readJSON = f => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));
const config = readJSON('cards.config.json');
const L = config.limits;
const errors = [];   // {card, msg}
const warns = [];
const err = (card, msg) => errors.push({card, msg});
const warn = (card, msg) => warns.push({card, msg});

// ---------------------------------------------------------------- data + language merge
const keysIn = s => [...String(s ?? '').matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
const words = s => String(s).replace(/\*\*/g, '').replace(/\[([^\]]+)\]/g, '$1').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;

function loadData() {
  const en = readJSON('cards.en.json');
  const uiEn = readJSON('ui.en.json');
  if (lang === 'en') return {cards: en, ui: uiEn};
  const f = `cards.${lang}.json`, uf = `ui.${lang}.json`;
  if (!fs.existsSync(path.join(here, f))) { console.error(`No ${f}. Copy cards.en.json to ${f} and translate the text fields (see README).`); process.exit(2); }
  const tr = readJSON(f);
  const ui = {...uiEn, ...(fs.existsSync(path.join(here, uf)) ? readJSON(uf) : (warn('ui', `no ${uf}: interface words stay English`), {}))};
  ui.areas = {...uiEn.areas, ...(ui.areas || {})};
  const byId = new Map(tr.map(c => [c.id, c]));
  const cards = en.map(base => {
    const t = byId.get(base.id);
    if (!t) { warn(base.id, `not in ${f}: English is used`); return base; }
    const c = structuredClone(base);
    const same = (a, b, what) => { if ((a?.length ?? 0) !== (b?.length ?? 0)) { warn(base.id, `${what}: ${b?.length ?? 0} in ${lang}, ${a?.length ?? 0} in English - English is used`); return false; } return true; };
    if (t.title) c.title = t.title;
    if (t.needs && same(base.needs, t.needs, 'needs')) c.needs = t.needs;
    if (t.problems && same(base.problems, t.problems, 'problems')) c.problems = t.problems;
    if (t.loop?.text && c.loop) c.loop.text = t.loop.text;
    if (t.steps && same(base.steps, t.steps, 'steps')) c.steps = base.steps.map((s, i) => ({...s, text: t.steps[i].text ?? s.text, note: t.steps[i].note, keys: undefined}));
    if (t.screens) c.screens = base.screens.map((s, i) => ({...s, caption: t.screens[i]?.caption ?? s.caption}));
    if (t.sections && same(base.sections, t.sections, 'sections')) c.sections = base.sections.map((sec, i) => ({...sec, title: t.sections[i].title ?? sec.title, rows: sec.rows.map((r, j) => ({...r, ...(t.sections[i].rows?.[j] || {}), keys: r.keys}))}));
    return c;
  });
  return {cards, ui};
}

// ---------------------------------------------------------------- validation
function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.length < 24 || b.toString('latin1', 1, 4) !== 'PNG') throw new Error('not a PNG');
  return {w: b.readUInt32BE(16), h: b.readUInt32BE(20)};
}
const sizeCache = new Map();
function imageSize(card, name) {
  const file = path.resolve(here, config.screensDir, name);
  if (!sizeCache.has(file)) {
    try { sizeCache.set(file, pngSize(file)); } catch (e) { sizeCache.set(file, null); err(card, `image not found or not a PNG: ${path.relative(here, file)}`); }
  }
  return sizeCache.get(file);
}

function validate(cards, ui) {
  const maxW = ui.maxWordsPerStep ?? L.maxWordsPerStep;
  const ids = new Set();
  for (const c of cards) {
    const id = c.id;
    if (!/^[A-Z]\d+$/.test(id || '')) err(id, `id "${id}" must look like R1, K2, Z1`);
    if (ids.has(id)) err(id, 'duplicate id'); ids.add(id);
    if (!c.title) err(id, 'title is missing');
    if (!config.areaOrder.includes(c.area)) err(id, `area "${c.area}" is not in cards.config.json areaOrder`);
    if (!ui.areas?.[c.area]) err(id, `ui.${lang}.json has no label for area "${c.area}"`);
    if (c.layout === 'reference') {
      if (!c.sections?.length) err(id, 'reference card has no sections');
      for (const sec of c.sections || []) for (const r of sec.rows) { for (const k of keysIn(r.text ?? r.do)) void k; }
      continue;
    }
    if (!c.needs?.length) err(id, 'needs[] is empty ("You need" line)');
    if (!c.steps?.length) err(id, 'no steps');
    if ((c.steps?.length ?? 0) > L.maxSteps) err(id, `${c.steps.length} steps (max ${L.maxSteps})`);
    (c.steps || []).forEach((s, i) => {
      const n = words(s.text);
      if (n > maxW) err(id, `step ${i + 1} has ${n} words (max ${maxW}): "${s.text}"`);
      if (s.note && words(s.note) > 16) err(id, `note of step ${i + 1} has ${words(s.note)} words (max 16)`);
      if (s.keys) {
        for (const k of [...keysIn(s.text), ...keysIn(s.note)]) if (!s.keys.includes(k)) err(id, `step ${i + 1} shows keycap [${k}] but keys[] does not list it`);
        for (const k of s.keys) if (![...keysIn(s.text), ...keysIn(s.note)].includes(k)) warn(id, `step ${i + 1}: keys[] lists "${k}" but the text does not use it`);
      }
    });
    if (c.loop && !(c.loop.afterStep >= 1 && c.loop.afterStep <= c.steps.length)) err(id, `loop.afterStep ${c.loop.afterStep} is not a step number`);
    const np = c.problems?.length ?? 0;
    if (np < L.minProblems || np > L.maxProblems) err(id, `${np} problems (need ${L.minProblems} to ${L.maxProblems})`);
    (c.problems || []).forEach((p, i) => { if (!p.if || !p.do) err(id, `problem ${i + 1} needs both "if" and "do"`); });
    const ns = c.screens?.length ?? 0;
    if (ns > L.maxScreens) err(id, `${ns} screenshots (max ${L.maxScreens})`);
    if (ns < L.minScreens) warn(id, `only ${ns} screenshot(s) (target ${L.minScreens} to ${L.maxScreens}) - no more real screens exist for this card yet`);
    (c.screens || []).forEach((s, i) => {
      const tag = `screen ${i + 1} (${s.image})`;
      // badge: one step number, or a range "4-6" when one screen covers several steps
      const bm = /^(\d+)(?:\s*[-\u2013]\s*(\d+))?$/.exec(String(s.badge).trim());
      const b1 = bm ? +bm[1] : 0, b2 = bm ? +(bm[2] ?? bm[1]) : 0;
      if (!bm || b1 < 1 || b2 < b1 || b2 > c.steps.length) err(id, `${tag}: badge ${s.badge} is not a step number or a step range like "4-6"`);
      const sz = imageSize(id, s.image); if (!sz) return;
      if (sz.w !== config.sourceWidth) warn(id, `${tag}: width ${sz.w}, expected ${config.sourceWidth}; coordinates are in source pixels`);
      const bands = Array.isArray(s.crop) ? s.crop : [s.crop];
      if (!s.crop) return err(id, `${tag}: crop is missing`);
      for (const b of bands) {
        if (b.top != null && b.height != null) { b.y0 = b.top; b.y1 = b.top + b.height; }
        if (!(b.y0 >= 0 && b.y1 > b.y0 && b.y1 <= sz.h)) err(id, `${tag}: crop ${b.y0}-${b.y1} is outside the image (height ${sz.h})`);
      }
      const hls = !s.highlight ? [] : Array.isArray(s.highlight) ? s.highlight : [s.highlight];
      for (const h of hls) {
        if (![h.x, h.y, h.w, h.h].every(Number.isFinite)) { err(id, `${tag}: highlight needs numeric x, y, w, h`); continue; }
        if (!bands.some(b => h.y >= b.y0 - 1 && h.y + h.h <= b.y1 + 1)) err(id, `${tag}: highlight y ${h.y}-${h.y + h.h} is not inside one crop band`);
        if (h.x < 0 || h.x + h.w > sz.w + 1) err(id, `${tag}: highlight is outside the image width`);
      }
    });
    if (!c.codes?.length) err(id, 'codes[] is empty (footer screen codes)');
  }
}

// ---------------------------------------------------------------- main
const {cards: allCards, ui} = loadData();
validate(allCards, ui);
const rank = a => config.areaOrder.indexOf(a);
let cards = allCards.map((c, i) => ({c, i})).sort((a, b) => rank(a.c.area) - rank(b.c.area) || a.i - b.i).map(x => x.c);
if (only) { for (const id of only) if (!cards.some(c => c.id === id)) { console.error(`--only: no card ${id}`); process.exit(2); } cards = cards.filter(c => only.includes(c.id)); }

function report() {
  for (const w of warns) console.log(`warn  ${w.card}: ${w.msg}`);
  for (const e of errors) console.error(`FAIL  ${e.card}: ${e.msg}`);
}
if (errors.length || flag('check')) {
  report();
  if (errors.length) { console.error(`\n${errors.length} problem(s) in the card data. Nothing was rendered.`); process.exit(1); }
  console.log(`Data OK: ${cards.length} cards (${lang}).`);
  process.exit(0);
}

process.env.PLAYWRIGHT_BROWSERS_PATH ||= '/opt/pw-browsers';
const req = createRequire(process.env.PLAYWRIGHT_MODULES_DIR ? process.env.PLAYWRIGHT_MODULES_DIR.replace(/\/?$/, '/') : '/opt/node22/lib/node_modules/');
let chromium;
try { ({chromium} = req('playwright')); } catch { ({chromium} = createRequire(import.meta.url)('playwright')); }

const payload = {
  ui,
  cards: cards.map(c => ({
    ...c,
    screens: (c.screens || []).map(s => ({...s, src: pathToFileURL(path.resolve(here, config.screensDir, s.image)).href})),
  })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({viewport: {width: 700, height: 1000}, deviceScaleFactor: 2});
const page = await ctx.newPage();
await page.goto(pathToFileURL(path.join(here, 'template.html')).href);
const results = await page.evaluate(p => window.renderAll(p), payload);
for (const r of results) { for (const m of r.issues) err(r.id, m); if (r.tier && r.tier[0] < 14) warn(r.id, `dense card: step text shrunk to ${r.tier[0]}px (target 14 or more) - cut words or notes`); }

fs.mkdirSync(outDir, {recursive: true});
const debugDir = path.join(outDir, '_debug');
const written = [];
for (let i = 0; i < cards.length; i++) {
  const c = cards[i], r = results[i];
  const failed = r.issues.length > 0;
  const dir = failed ? (flag('debug') ? debugDir : null) : outDir;
  if (!dir) continue;
  fs.mkdirSync(dir, {recursive: true});
  await page.locator(`.card[data-id="${c.id}"]`).screenshot({path: path.join(dir, `${c.id}.png`)});
  if (!failed) {
    await page.pdf({path: path.join(dir, `${c.id}.pdf`), width: '148mm', height: '210mm', printBackground: true, preferCSSPageSize: true, pageRanges: String(i + 1)});
    written.push(c);
  }
}
let allOk = errors.length === 0;
if (allOk && !only) {
  const file = path.join(outDir, 'all-cards.pdf');
  await page.pdf({path: file, width: '148mm', height: '210mm', printBackground: true, preferCSSPageSize: true});
  const pages = (fs.readFileSync(file).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (pages !== cards.length) { err('all-cards.pdf', `has ${pages} pages for ${cards.length} cards: a card spills to a second page`); allOk = false; }
}
await browser.close();

report();
if (errors.length) {
  const bad = [...new Set(errors.map(e => e.card))].join(', ');
  console.error(`\nFAILED: ${bad}. ${flag('debug') ? 'Failing cards were written to ' + path.relative(process.cwd(), debugDir) : 'Run with --debug to write the failing cards to dist/_debug/ and look at them.'}`);
  process.exit(1);
}
const manifest = {
  lang,
  areas: config.areaOrder.map(a => ({id: a, label: ui.areas[a]})),
  cards: cards.map((c, i) => ({id: c.id, title: c.title.replace(/\*\*/g, ''), area: c.area, areaLabel: ui.areas[c.area], png: `${c.id}.png`, pdf: `${c.id}.pdf`, steps: c.steps?.length ?? 0, fontTier: results[i].tier?.[0]})),
  all: only ? null : {pdf: 'all-cards.pdf', pages: cards.length},
};
if (!only) fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`OK ${cards.length} cards -> ${path.relative(process.cwd(), outDir) || '.'}  (steps font px: ${results.map(r => r.id + ':' + r.tier?.[0]).join(' ')})`);
