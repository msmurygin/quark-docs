#!/usr/bin/env node
// Copies the printable task cards into the site. No browser is started here:
// the PNG and PDF files are built (and committed) in
// docs-obsidian/user-guide/cards/dist by `node build.mjs` in that folder.
//
//   input : ../docs-obsidian/user-guide/cards/dist/{manifest.json, <id>.png, <id>.pdf, all-cards.pdf}
//   output: static/cards/files/*           what the gallery links to (git-ignored)
//           src/generated/cards.json       gallery data (git-ignored)
//
// Runs as a step of `npm run build` / `npm start`. Output is deterministic.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(here, '..');
const srcDir = resolve(process.env.CARDS_DIST || resolve(siteDir, '../docs-obsidian/user-guide/cards/dist'));
const outDir = resolve(siteDir, 'static/cards/files');
const genFile = resolve(siteDir, 'src/generated/cards.json');

const fail = (msg) => { console.error(`[cards] ${msg}`); process.exit(1); };
const manifestFile = resolve(srcDir, 'manifest.json');
if (!existsSync(manifestFile)) {
  // A clean Git checkout may not include optional printable exports.
  // Publish the guides without presenting broken PDF download links.
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(dirname(genFile), { recursive: true });
  writeFileSync(genFile, JSON.stringify({ lang: 'en', areas: [], cards: [], all: { pdf: '', pages: 0, bytes: 0 } }, null, 2) + '\n');
  console.log('[cards] No printable exports committed; publishing guides without downloads.');
  process.exit(0);
}
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
if (!manifest.cards?.length || !manifest.all) fail('manifest.json has no cards or no all-cards.pdf (was it built with --only?)');

// PNG size from the IHDR chunk, so the gallery can reserve space before the image loads.
const pngSize = (file) => {
  const b = readFileSync(file);
  if (b.toString('latin1', 1, 4) !== 'PNG') fail(`${file} is not a PNG`);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
mkdirSync(dirname(genFile), { recursive: true });

const copy = (name) => {
  const from = resolve(srcDir, name);
  if (!existsSync(from)) fail(`${name} is listed in manifest.json but missing in ${srcDir}`);
  copyFileSync(from, resolve(outDir, name));
  return statSync(from).size;
};

const cards = manifest.cards.map((c) => {
  const pngBytes = copy(c.png);
  const pdfBytes = copy(c.pdf);
  return { id: c.id, title: c.title, area: c.area, areaLabel: c.areaLabel, png: c.png, pdf: c.pdf, pngBytes, pdfBytes, ...pngSize(resolve(srcDir, c.png)) };
});
const allBytes = copy(manifest.all.pdf);

writeFileSync(genFile, JSON.stringify({ lang: manifest.lang, areas: manifest.areas, cards, all: { pdf: manifest.all.pdf, pages: manifest.all.pages, bytes: allBytes } }, null, 1) + '\n');
console.log(`[cards] ${cards.length} cards + ${manifest.all.pdf} copied to static/cards/files`);
