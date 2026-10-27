/**
 * Build-time adapters for the guide sources in ../docs-obsidian/user-guide.
 *
 * The sources are written for Obsidian / GitHub: numbered file names,
 * "# 02 Receiving..." headings, relative links to the generated API reference,
 * and an author-facing README. This file adapts them for the site WITHOUT
 * editing them:
 *
 *  - parseFrontMatter hook: derives clean titles and sidebar labels, rewrites
 *    the README into a customer-facing "Getting started" page, hides the
 *    screenshots list from the sidebar.
 *  - remark plugin: image + italic caption -> <figure>, and links to
 *    reference/*.md -> the API portal (the reference is not rendered here).
 */
import type {MarkdownConfig} from '@docusaurus/types';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {sanitizePublicGuideTree, sanitizePublicMarkdownSource} from './public-guide-sanitize.mjs';

function relToGuide(guideDir: string, filePath: string): string | null {
  const rel = path.relative(guideDir, filePath).split(path.sep).join('/');
  return rel.startsWith('..') ? null : rel;
}

const PART_NAMES: Record<string, string> = {
  'operator/': 'Operator guide',
  'admin/': 'Administrator guide',
  'api/': 'API guide',
  'studio/': 'Metadata Studio',
};

/** Title shown for each part of the guide, keyed by the README table's first column. */
function readmeRows(source: string) {
  const rows: Array<{name: string; href: string; text: string}> = [];
  const re = /^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*(.+?)\s*\|/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const name = PART_NAMES[m[1]];
    if (name) rows.push({name, href: m[2], text: m[3]});
  }
  return rows;
}

const t = (value: string): Node => ({type: 'text', value});

/**
 * README.md is written for the people who maintain the guide (screenshot
 * conventions, known quality gaps). Customers get a short chooser built from
 * its table instead. The source file is not touched.
 */
function customerReadme(source: string, apiUrl: string): Node[] {
  return [
    {type: 'heading', depth: 1, children: [t('Getting started')]},
    {type: 'paragraph', children: [t('Choose a guide for your role or the task you want to complete.')]},
    {
      type: 'list',
      ordered: false,
      spread: false,
      children: readmeRows(source).map((r) => ({
        type: 'listItem',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [{type: 'strong', children: [{type: 'link', url: r.href, children: [t(r.name)]}]}, t(`. ${r.text}.`)],
          },
        ],
      })),
    },
    {type: 'heading', depth: 2, children: [t('Looking for a method?')]},
    {
      type: 'paragraph',
      children: [t('Every API method has its own entry, with parameters, results, errors and a copy-able curl call, in the '), {type: 'link', url: apiUrl, children: [t('API reference')]}, t('.')],
    },
  ];
}

export const createParseFrontMatter = (guideDir: string): MarkdownConfig['parseFrontMatter'] => async (params) => {
  const parsed = await params.defaultParseFrontMatter(params);
  const rel = relToGuide(guideDir, params.filePath);
  if (!rel) return parsed;
  let {frontMatter, content} = parsed;
  content = sanitizePublicMarkdownSource(content);

  if (rel === 'README.md') {
    return {frontMatter: {...frontMatter, title: 'Getting started', sidebar_label: 'Getting started', slug: '/'}, content};
  }

  if (rel === 'assets/MISSING-SCREENSHOTS.md') {
    // Linked from two guide pages; reachable, but not part of the navigation.
    return {frontMatter: {...frontMatter, unlisted: true, title: 'Screens without a picture'}, content};
  }

  const h1 = /^# +(.+?)\s*$/m.exec(content);
  if (h1) {
    const clean = h1[1].replace(/^\d+\s+/, '');
    const index = /^([a-z]+)\/00-README\.md$/.exec(rel);
    frontMatter = {
      ...frontMatter,
      title: clean,
      sidebar_label: index ? 'Overview' : clean,
      // operator/00-README.md is the page behind the part's title: /docs/operator/
      ...(index ? {slug: `/${index[1]}/`} : {}),
    };
  }
  return {frontMatter, content};
};

// ---------------------------------------------------------------- remark ---

type Node = {type: string; url?: string; value?: string; children?: Node[]; data?: Record<string, unknown>; [k: string]: unknown};

const isBlankText = (n: Node) => n.type === 'text' && !String(n.value ?? '').trim();

function splitFocus(caption: Node) {
  // "... Focus: where to look." -> bold "Focus:" so the eye finds it.
  const out: Node[] = [];
  for (const c of caption.children ?? []) {
    const v = c.type === 'text' ? String(c.value) : '';
    const i = v.indexOf('Focus:');
    if (i < 0) {
      out.push(c);
      continue;
    }
    if (i > 0) out.push({type: 'text', value: v.slice(0, i)});
    out.push({type: 'strong', children: [{type: 'text', value: 'Focus:'}]});
    out.push({type: 'text', value: v.slice(i + 6)});
  }
  caption.children = out;
}

/** A screenshot the guide mentions but nobody has captured yet (see assets/MISSING-SCREENSHOTS.md). */
function pendingShot(img: Node): Node {
  return {
    type: 'emphasis',
    data: {hName: 'span', hProperties: {className: ['shot-missing']}},
    children: [{type: 'text', value: `Screenshot not available yet${img.alt ? `: ${String(img.alt)}` : ''}`}],
  };
}

function makeFigure(img: Node, caption: Node): Node {
  if (img.data?.missing) img = pendingShot(img);
  splitFocus(caption);
  caption.data = {...caption.data, hName: 'figcaption'};
  return {
    type: 'paragraph',
    data: {hName: 'figure', hProperties: {className: ['doc-figure']}},
    children: [img, caption],
  };
}

function figureIn(children: Node[]) {
  for (let i = 0; i < children.length; i++) {
    const p = children[i];
    if (p.type !== 'paragraph' || !p.children) continue;
    const kids = p.children.filter((c) => !isBlankText(c) && c.type !== 'break');
    const imgs = kids.filter((c) => c.type === 'image');
    const ems = kids.filter((c) => c.type === 'emphasis');
    if (imgs.length !== 1 || kids.length !== imgs.length + ems.length || ems.length > 1) continue;
    let caption = ems[0];
    if (!caption) {
      // admin pages: the italic caption is the next paragraph
      const next = children[i + 1];
      const nk = next?.type === 'paragraph' ? (next.children ?? []).filter((c) => !isBlankText(c)) : [];
      if (nk.length === 1 && nk[0].type === 'emphasis') {
        caption = nk[0];
        children.splice(i + 1, 1);
      }
    }
    if (caption) children[i] = makeFigure(imgs[0], caption);
  }
}

const LINK_REFERENCE = /^(?:\.\.?\/)*reference\/([a-z_]+)\.md(#[^#]+)?$/;

function friendlyLinkText(ctx: string, hash: string | undefined) {
  if (hash) return hash.slice(1);
  if (ctx === 'index') return 'API reference';
  return `${ctx.replace(/_/g, ' ')} methods`;
}

export interface GuideRemarkOptions {
  baseUrl: string;
  guideDir: string;
}

export default function remarkGuide(options: GuideRemarkOptions) {
  const base = options.baseUrl.endsWith('/') ? options.baseUrl : `${options.baseUrl}/`;
  let missing = 0;
  const markMissing = (node: Node, dir: string) => {
    for (const c of node.children ?? []) {
      if (c.type === 'image' && typeof c.url === 'string' && !/^([a-z]+:|\/|#)/i.test(c.url) && !existsSync(path.resolve(dir, decodeURI(c.url)))) {
        c.data = {...c.data, missing: true};
        missing++;
      }
      markMissing(c, dir);
    }
  };
  const walk = (node: Node) => {
    if (!node.children) return;
    figureIn(node.children);
    node.children = node.children.map((c) => (c.type === 'image' && c.data?.missing ? pendingShot(c) : c));
    for (const child of node.children) {
      if (child.type === 'link' && typeof child.url === 'string') {
        const m = LINK_REFERENCE.exec(child.url);
        if (m) {
          const [, ctx, hash] = m;
          const only = child.children?.length === 1 && child.children[0].type === 'inlineCode' ? child.children[0] : child.children?.length === 1 && child.children[0].type === 'text' ? child.children[0] : null;
          if (only && only.value === child.url) {
            child.children = [{type: 'text', value: friendlyLinkText(ctx, hash)}];
          }
          // pathname:// = a real file on the server, not a Docusaurus route
          const target = hash ? hash : ctx === 'index' ? '' : `#ctx-${ctx}`;
          child.url = `pathname://${base}api/${target}`;
        }
      }
      walk(child);
    }
  };
  return (tree: Node, file: {path?: string}) => {
    missing = 0;
    if (file.path && relToGuide(options.guideDir, file.path) === 'README.md') {
      const source = readFileSync(file.path, 'utf8');
      tree.children = customerReadme(source, `pathname://${base}api/`);
    } else if (file.path) {
      // "# 02 Receiving..." -> "# Receiving..."
      const h1 = tree.children?.find((c) => c.type === 'heading' && c.depth === 1);
      const first = h1?.children?.[0];
      if (first?.type === 'text') first.value = String(first.value).replace(/^\d+\s+/, '');
    }
    const publication = sanitizePublicGuideTree(tree);
    if (publication.sections || publication.blocks || publication.inlineEvidence || publication.tableColumns) {
      console.warn(`[guide] ${path.basename(file.path ?? '')}: author evidence hidden from public output (${publication.sections} sections, ${publication.blocks} blocks, ${publication.inlineEvidence} inline references, ${publication.tableColumns} table columns)`);
    }
    if (file.path) markMissing(tree, path.dirname(file.path));
    if (missing) {
      const msg = `${path.basename(file.path ?? '')}: ${missing} screenshot(s) not captured yet, shown as placeholders`;
      if (process.env.DOCS_STRICT_IMAGES) throw new Error(msg);
      console.warn(`[guide] ${msg}`);
    }
    walk(tree);
  };
}
