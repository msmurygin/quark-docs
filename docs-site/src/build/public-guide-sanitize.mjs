/**
 * Publication boundary for author evidence.
 *
 * The Markdown source may keep implementation evidence beside a statement so
 * that maintainers can re-check it.  None of that evidence belongs in the
 * customer site, search index, or downloadable API catalog.  This module is
 * deliberately dependency-free so the same rules can be used by the remark
 * plugin, the API generator, and the unit tests.
 */

// Keep these checks separate. A previous single alternation contained an
// unbounded filename token before a file-extension suffix. On large Markdown
// table cells V8 could spend minutes backtracking through that alternative.
// The bounded token below and the small independent expressions make every
// scan linear in the customer prose size.
const INTERNAL_PATH_PATTERNS = [
  /(?:^|[\s`('"/])(?:crates|clients|apps|services|ui\/src|app-server\/src|web-ui-server\/src|docs-obsidian|docs\/superpowers|\.claude|dev_only)\//i,
  /\bwms-[a-z0-9_-]+\/(?:src|migrations?|sql)\//i,
  /\bBASELINE(?::\d+(?:-\d+)?)?\b|\b(?:wms-(?:app|meta-ui|enterprise)|meta-ui)\s+migrations?\b|\bmigrations?\s+\d{1,4}\b|\bwms-app\s+\d{1,4}\b/i,
  /\b(?:baseline|seed)\s+migration\b|\bdev(?:elopment)?\s+seed\b|\bcode comment\b/i,
  /\b(?:grep|rg)\b[^\n]*/i,
  /\b(?:I\s+)?search(?:ed|ing)?\s+(?:all\s+)?(?:the\s+)?(?:Rust\s+)?(?:code|crates|engine)\b/i,
  /\bsearch(?:ed|ing)?\s+(?:over|through)\s+\*?\.(?:rs|sql|go|tsx?)\b|\bchecked by searching\b/i,
  /#\[[A-Za-z_][^\]\n]*\]/i,
];
const INTERNAL_PROCESS_PATTERNS = [
  /\b(?:commit|source revision|source sha)\s+[0-9a-f]{9,40}\b/i,
  /\b(?:F|P)-\d{2}\b/,
  /\bADR[-_ ]?\d+\b/i,
  /\b(?:[A-Za-z][A-Za-z -]{0,100}\s+)?spec\s+20\d{2}-\d{2}-\d{2}(?:\s*§\s*\d+)?/i,
  /\bowner decision\s+20\d{2}-\d{2}-\d{2}\b/i,
  /\bspec\s*§/i,
  /\bruling\s+[A-Z]\d+\b/i,
  /\bDecisions Log\b/i,
  /\bSlice\s*#\d+\b/i,
];
const PRIVATE_HEADING = /^(?:(?:\d+|[A-Z]\.\d+)\.?\s*)?(?:where it comes from|not confirmed(?: by code)?|findings|internal audit|known inconsistencies(?: on this page)?|known gaps.*|known problems.*|inconsistencies found.*|bugs, inconsistencies and items to verify|what to verify|what the code does not have|part 4:\s*names in code|keys read by the code but not seeded.*|the rule:\s*every arrow comes from code)$/i;
const PRIVATE_QUOTE = /^(?:not confirmed(?: by code)?|(?:\*\*)?to verify(?:\*\*)?|label missing in English)\b\s*:*/i;
const SOURCE_LABEL = /\b(?:source|sources|code proof|implementation evidence)\s*:/i;
const AUTHOR_PROCESS = /\bnot confirmed(?: by code)?\b|(?:^|[.(]\s*|\bsee\s+(?:the\s+)?["“])(?:\*\*)?to verify(?:\*\*)?\b|\blabel missing in English\b|\bwhere it comes from\b|\bsee the findings file\b|\bhow [^.!?\n]* was checked\b|\ball statements come from (?:the )?code\b|\bthat is how (?:it|they) (?:is|are) written in the code\b|\bsome (?:of these )?texts contain Russian words\b|every (?:arrow|step).*(?:comes|was read) from (?:the )?code|where the code (?:says nothing|does not prove)|checked by searching (?:the )?code|\b(?:(?:I|each(?: of these)?)\s+)?(?:(?:has|have|was|were|is|are)\s+)?searched\s+in\b|code on the main branch|table that names the file and line|file and line (?:is|are|was|were|given)/i;
const AUTHOR_NOTE_LINE = /\bnot confirmed(?: by code)?\b|\bwhere it comes from\b|(?:^\s*[-*+]?\s*|\|\s*|[.(]\s*|\bsee\s+(?:the\s+)?["“])(?:\*\*)?to verify(?:\*\*)?\b/i;
const RAW_MARKDOWN_REFERENCE = /\b(?:reference\/)?[A-Za-z0-9][A-Za-z0-9_/-]*\.md\b/gi;

function publicGuideName(value) {
  const path = String(value ?? '');
  if (/^reference\/index\.md$/i.test(path)) return 'API reference';
  const name = path.split('/').at(-1)?.replace(/\.md$/i, '').replace(/^\d+-/, '') ?? '';
  if (/^(?:README|index)$/i.test(name)) return 'overview guide';
  return `${name.replace(/[-_]+/g, ' ')} guide`;
}

function isPunctuationOnly(value) {
  return /^[\s.,;:!?()[\]{}'"`~*_\-–—/\\|]+$/.test(String(value ?? ''));
}

export function hasInternalEvidence(value) {
  const text = String(value ?? '');
  return internalPathMatch(text) != null || internalProcessMatch(text) != null;
}

function earliestMatch(value, patterns) {
  let earliest = null;
  for (const pattern of patterns) {
    const match = String(value ?? '').match(pattern);
    if (match?.index == null) continue;
    if (!earliest || match.index < earliest.index) earliest = match;
  }
  return earliest;
}

function internalPathMatch(value) {
  const text = String(value ?? '');
  const lower = text.toLowerCase();
  const mayContainPath = [
    'crates/', 'clients/', 'apps/', 'services/', 'ui/src/', 'app-server/src/',
    'web-ui-server/src/', 'docs-obsidian/', 'docs/superpowers/', '.claude/',
    'dev_only/', 'wms-', '.rs', '.sql', '.go', '.ts', '.tsx', '.toml',
    'baseline', 'migration', 'seed', 'code comment', 'grep', 'rg', 'search', '#[',
  ].some((marker) => lower.includes(marker));
  if (!mayContainPath) return null;
  const matches = [earliestMatch(text, INTERNAL_PATH_PATTERNS), sourceFilenameMatch(text)]
    .filter((match) => match?.index != null)
    .sort((a, b) => a.index - b.index);
  return matches[0] ?? null;
}

function sourceFilenameMatch(value) {
  const text = String(value ?? '');
  const lower = text.toLowerCase();
  const extensions = ['.toml', '.tsx', '.sql', '.rs', '.go', '.ts'];
  const token = /[A-Za-z0-9_.…*~-]/;
  let earliest = null;
  for (const extension of extensions) {
    let from = 0;
    for (;;) {
      const extensionAt = lower.indexOf(extension, from);
      if (extensionAt < 0) break;
      from = extensionAt + extension.length;
      let start = extensionAt - 1;
      while (start >= 0 && extensionAt - start <= 200 && token.test(text[start])) start--;
      start++;
      if (start === extensionAt || (start > 0 && token.test(text[start - 1]))) continue;
      let end = extensionAt + extension.length;
      if (text[end] === ':') {
        let cursor = end + 1;
        if (text[cursor] === '~') cursor++;
        const digitsAt = cursor;
        while (/\d/.test(text[cursor] ?? '')) cursor++;
        if (cursor === digitsAt) continue;
        if (text[cursor] === '-') {
          cursor++;
          const rangeAt = cursor;
          while (/\d/.test(text[cursor] ?? '')) cursor++;
          if (cursor === rangeAt) continue;
        }
        end = cursor;
      }
      if (/[A-Za-z0-9_]/.test(text[end] ?? '')) continue;
      const match = [text.slice(start, end)];
      match.index = start;
      if (!earliest || start < earliest.index) earliest = match;
      break;
    }
  }
  return earliest;
}

function internalProcessMatch(value) {
  const text = String(value ?? '');
  const lower = text.toLowerCase();
  if (!['commit ', 'source revision ', 'source sha ', 'f-', 'p-', 'adr-', 'adr_', 'adr ', 'spec 20', 'spec§', 'spec §', 'owner decision 20', 'ruling ', 'decisions log', 'slice #']
    .some((marker) => lower.includes(marker))) return null;
  return earliestMatch(text, INTERNAL_PROCESS_PATTERNS);
}

function authorProcessMatch(value) {
  const text = String(value ?? '');
  const lower = text.toLowerCase();
  if (!['not confirmed', 'to verify', 'label missing', 'where it comes from', 'findings file',
    'was checked', 'statements come from', 'written in the code', 'russian words',
    'comes from code', 'comes from the code', 'read from code', 'read from the code',
    'code says nothing', 'code does not prove', 'checked by searching', 'searched in',
    'code on the main branch', 'file and line']
    .some((marker) => lower.includes(marker))) return null;
  return text.match(AUTHOR_PROCESS);
}

function evidenceMatch(value, includeAuthor = false) {
  const matches = [internalPathMatch(value), internalProcessMatch(value), includeAuthor ? authorProcessMatch(value) : null]
    .filter((match) => match?.index != null)
    .sort((a, b) => a.index - b.index);
  return matches[0] ?? null;
}

function nodeText(node) {
  if (!node || typeof node !== 'object') return '';
  if (typeof node.value === 'string') return node.value;
  return Array.isArray(node.children) ? node.children.map(nodeText).join('') : '';
}

function findParenthetical(text, at) {
  let depth = 0;
  let left = -1;
  for (let i = at; i >= 0; i--) {
    if (text[i] === ')') depth++;
    if (text[i] === '(') {
      if (depth === 0) {
        left = i;
        break;
      }
      depth--;
    }
  }
  if (left < 0) return null;
  depth = 0;
  for (let i = left; i < text.length; i++) {
    if (text[i] === '(') depth++;
    if (text[i] === ')' && --depth === 0) return [left, i + 1];
  }
  return null;
}

function removeTextSpan(children, start, end) {
  let offset = 0;
  const next = [];
  for (const child of children) {
    const text = nodeText(child);
    const childStart = offset;
    const childEnd = offset + text.length;
    offset = childEnd;
    if (childEnd <= start || childStart >= end) {
      next.push(child);
      continue;
    }
    if (child.type !== 'text') continue;
    const from = Math.max(0, start - childStart);
    const to = Math.max(from, Math.min(text.length, end - childStart));
    const value = `${text.slice(0, from)}${text.slice(to)}`;
    if (value) next.push({...child, value});
  }
  children.splice(0, children.length, ...next);
}

function sentenceAround(text, at) {
  const isEnd = (index) => {
    const char = text[index];
    if (char === '\n') return true;
    if (char === '!' || char === '?') return true;
    if (char !== '.') return false;
    const next = text[index + 1];
    return next == null || /\s/.test(next);
  };
  let start = 0;
  for (let i = at - 1; i >= 0; i--) {
    if (isEnd(i)) {
      start = i + 1;
      break;
    }
  }
  while (/\s/.test(text[start] ?? '')) start++;
  let end = text.length;
  for (let i = at; i < text.length; i++) {
    if (isEnd(i) && text[i] !== '\n') {
      end = i + 1;
      break;
    }
    if (text[i] === '\n') {
      end = i;
      break;
    }
  }
  while (/\s/.test(text[end] ?? '')) end++;
  return [start, end];
}

/** Remove parenthetical implementation references while preserving the claim. */
function stripEvidenceParentheticals(children, stats) {
  if (!Array.isArray(children) || children.length === 0) return;
  for (;;) {
    const joined = children.map((child) => nodeText(child)).join('');
    const match = evidenceMatch(joined, true);
    if (!match || match.index == null) break;
    const span = findParenthetical(joined, match.index);
    if (!span) break;

    const [start, end] = span;
    removeTextSpan(children, start, end);
    if (children.map((child) => nodeText(child)).join('') === joined) break;
    stats.inlineEvidence++;
  }

  // "Useful customer sentence. Source: internal/path" keeps the first part.
  let sourceSeen = false;
  const kept = [];
  for (const child of children) {
    if (sourceSeen) continue;
    if (child.type === 'text') {
      const value = String(child.value ?? '');
      const m = SOURCE_LABEL.exec(value);
      SOURCE_LABEL.lastIndex = 0;
      if (m) {
        const before = value.slice(0, m.index).trimEnd();
        if (before) kept.push({...child, value: before});
        sourceSeen = true;
        stats.inlineEvidence++;
        continue;
      }
    }
    kept.push(child);
  }
  if (sourceSeen) children.splice(0, children.length, ...kept);

  // Evidence outside parentheses is usually a short trailing sentence such
  // as "Migration 026 changed the default." Remove that sentence only.
  for (;;) {
    const joined = children.map((child) => nodeText(child)).join('');
    const match = evidenceMatch(joined);
    if (!match || match.index == null) break;
    const [start, end] = sentenceAround(joined, match.index);
    removeTextSpan(children, start, end);
    if (children.map((child) => nodeText(child)).join('') === joined) break;
    stats.inlineEvidence++;
  }

  for (const child of children) {
    if (child.type !== 'text') continue;
    child.value = String(child.value ?? '')
      .replace(RAW_MARKDOWN_REFERENCE, publicGuideName)
      .replace(/\benterprise\.warehouse\b/gi, 'warehouse settings')
      .replace(/\s+([,.;:!?])/g, '$1')
      .replace(/\(\s*\)/g, '')
      .replace(/[ \t]{2,}/g, ' ');
  }

  const compact = [];
  for (const child of children) {
    if (child.type === 'text' && !String(child.value ?? '')) continue;
    const previous = compact.at(-1);
    if (child.type === 'text' && previous?.type === 'text') {
      previous.value = `${previous.value}${child.value}`
        .replace(/\s+([,.;:!?])/g, '$1')
        .replace(/[ \t]{2,}/g, ' ');
      continue;
    }
    compact.push(child);
  }
  children.splice(0, children.length, ...compact);

  // Removing an inline code/path can leave only its trailing full stop or
  // colon. Such fragments are authoring debris, not public content.
  if (isPunctuationOnly(children.map(nodeText).join(''))) children.splice(0, children.length);
}

function isPrivateSection(children, index) {
  const heading = children[index];
  if (heading?.type !== 'heading') return false;
  const title = nodeText(heading).trim();
  if (PRIVATE_HEADING.test(title)) return true;
  if (!/^sources?$/i.test(title)) return false;
  const depth = Number(heading.depth ?? 6);
  for (let i = index + 1; i < children.length; i++) {
    const node = children[i];
    if (node.type === 'heading' && Number(node.depth ?? 6) <= depth) break;
    if (hasInternalEvidence(nodeText(node))) return true;
  }
  return false;
}

function removePrivateSections(children, stats) {
  for (let i = 0; i < children.length;) {
    if (!isPrivateSection(children, i)) {
      i++;
      continue;
    }
    const depth = Number(children[i].depth ?? 6);
    let end = i + 1;
    while (end < children.length && !(children[end].type === 'heading' && Number(children[end].depth ?? 6) <= depth)) end++;
    children.splice(i, end - i);
    stats.sections++;
  }
}

function sanitizeTable(table, stats) {
  const rows = table.children ?? [];
  if (!rows.length) return;
  const header = rows[0].children ?? [];
  const privateColumns = [];
  for (let col = 0; col < header.length; col++) {
    const label = nodeText(header[col]).trim();
    if (!/^(?:code|source|sources|evidence|implementation evidence|where|where it comes from)$/i.test(label)) continue;
    if (rows.slice(1).some((row) => hasInternalEvidence(nodeText(row.children?.[col])))) privateColumns.push(col);
  }
  for (let col = 0; col < header.length; col++) {
    if (privateColumns.includes(col)) continue;
    if (/^where(?: it comes from)?$/i.test(nodeText(header[col]).trim())) {
      header[col].children = [{type: 'text', value: 'Configuration'}];
    }
  }
  for (const row of rows) {
    if (!row.children) continue;
    for (let i = privateColumns.length - 1; i >= 0; i--) row.children.splice(privateColumns[i], 1);
  }
  if (privateColumns.length) stats.tableColumns += privateColumns.length;
}

function startsPrivate(node) {
  const text = nodeText(node).trim();
  if (node.type === 'blockquote' && PRIVATE_QUOTE.test(text)) return true;
  if (node.type !== 'paragraph') return false;
  const authorProcess = AUTHOR_PROCESS.exec(text);
  if (authorProcess?.index === 0) return true;
  if (/^(?:source|sources|code proof|implementation evidence)\s*:/i.test(text)) return true;
  if (/^(?:paths? to code|table:\s*`?[^`]+`?\s*\(`?BASELINE:)/i.test(text)) return true;
  return false;
}

function sanitizeContainer(node, stats) {
  if (typeof node.value === 'string') {
    node.value = node.value
      .replace(RAW_MARKDOWN_REFERENCE, publicGuideName)
      .replace(/\benterprise\.warehouse\b/gi, 'warehouse settings');
  }
  if (!Array.isArray(node.children)) return;
  removePrivateSections(node.children, stats);
  const out = [];
  for (const child of node.children) {
    if (startsPrivate(child)) {
      stats.blocks++;
      continue;
    }
    if (child.type === 'table') sanitizeTable(child, stats);
    if (['paragraph', 'tableCell'].includes(child.type) && Array.isArray(child.children)) {
      stripEvidenceParentheticals(child.children, stats);
    }
    sanitizeContainer(child, stats);
    if (hasInternalEvidence(nodeText(child)) || authorProcessMatch(nodeText(child))) {
      // A remaining reference was not safely separable from its prose. Hide
      // the containing block rather than publish a broken partial sentence.
      stats.blocks++;
      if (child.type === 'tableCell') {
        child.children = [{type: 'text', value: '—'}];
        out.push(child);
      }
      continue;
    }
    const cleanedText = nodeText(child).trim();
    const hasImage = child.type === 'paragraph' && child.children?.some((node) => node.type === 'image');
    if (['paragraph', 'heading'].includes(child.type) && (!cleanedText || isPunctuationOnly(cleanedText)) && !hasImage) continue;
    if (child.type === 'tableCell' && (!cleanedText || isPunctuationOnly(cleanedText))) {
      child.children = [{type: 'text', value: '—'}];
    }
    if ((child.type === 'list' || child.type === 'listItem' || child.type === 'tableRow') && child.children?.length === 0) continue;
    out.push(child);
  }
  node.children = out;
}

export function sanitizePublicGuideTree(tree) {
  const stats = {sections: 0, blocks: 0, inlineEvidence: 0, tableColumns: 0};
  sanitizeContainer(tree, stats);
  return stats;
}

function headingDepth(line) {
  const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
  return match ? {depth: match[1].length, title: match[2]} : null;
}

function rawTableCells(line) {
  return line.split(/(?<!\\)\|/);
}

function sanitizeRawTable(lines) {
  const rows = lines
    .filter((line, index) => index < 2 || !AUTHOR_NOTE_LINE.test(line))
    .map(rawTableCells);
  if (rows.length < 2) return null;

  const header = rows[0];
  const privateColumns = [];
  for (let col = 0; col < header.length; col++) {
    const label = String(header[col] ?? '').trim();
    if (!/^(?:code|source|sources|evidence|implementation evidence|where|where it comes from)$/i.test(label)) continue;
    if (rows.slice(2).some((row) => hasInternalEvidence(row[col] ?? ''))) privateColumns.push(col);
  }

  return rows.map((row) => row
    .filter((_, index) => !privateColumns.includes(index))
    .map((cell) => {
      const renamed = String(cell).replace(/Where it comes from/gi, 'Configuration');
      if (/^\s*:?-{3,}:?\s*$/.test(renamed) || !renamed.trim()) return renamed;
      const clean = stripEvidenceSentences(renamed);
      return clean || ' — ';
    })
    .join('|')).join('\n');
}

/**
 * Early Markdown pass. Docusaurus derives descriptions and search records at
 * several stages, so author-only prose must be absent before those stages as
 * well as from the final Markdown AST.
 */
export function sanitizePublicMarkdownSource(value) {
  const lines = String(value ?? '').split('\n');
  const withoutSections = [];
  let hiddenDepth = 0;
  for (const line of lines) {
    const heading = headingDepth(line);
    if (hiddenDepth) {
      if (!heading || heading.depth > hiddenDepth) continue;
      hiddenDepth = 0;
    }
    if (heading && PRIVATE_HEADING.test(heading.title)) {
      hiddenDepth = heading.depth;
      continue;
    }
    withoutSections.push(line);
  }

  const blocks = withoutSections.join('\n').split(/\n{2,}/);
  const clean = [];
  for (let block of blocks) {
    const blockLines = block.replace(/^\n+|\n+$/g, '').split('\n');
    const table = blockLines.length > 1 && blockLines.every((line) => /^\s*\|/.test(line));
    if (table) {
      const sanitized = sanitizeRawTable(blockLines);
      if (sanitized) clean.push(sanitized);
      continue;
    }

    if (blockLines.some((line) => /^\s*[-*+]\s+/.test(line))) {
      const kept = [];
      let hideContinuation = false;
      for (const line of blockLines) {
        if (/^\s*[-*+]\s+/.test(line)) {
          hideContinuation = AUTHOR_NOTE_LINE.test(line);
          if (!hideContinuation) kept.push(line);
        } else if (!hideContinuation) {
          kept.push(line);
        }
      }
      block = kept.join('\n');
      if (!block.trim()) continue;
    }

    block = stripEvidenceSentences(block);
    if (!block || /^\s*(?:source|sources|code proof|implementation evidence)\s*:/i.test(block)) continue;
    clean.push(block.replace(/Where it comes from/gi, 'Configuration'));
  }
  return clean.join('\n\n')
    // Docusaurus derives page descriptions before the remark tree pass. Make
    // raw authoring filenames reader-friendly in link labels at this earlier
    // boundary while preserving the real Markdown destination.
    .replace(/\[((?:reference\/)?[A-Za-z0-9][A-Za-z0-9_/-]*\.md)\](\([^)]+\))/gi,
      (_match, label, destination) => `[${publicGuideName(label)}]${destination}`);
}

function stripParentheticalStrings(value) {
  let text = String(value ?? '');
  for (;;) {
    const match = evidenceMatch(text, true);
    if (!match || match.index == null) break;
    const span = findParenthetical(text, match.index);
    if (!span) break;
    const next = `${text.slice(0, span[0])}${text.slice(span[1])}`;
    if (next === text) break;
    text = next;
  }
  return text;
}

function stripEvidenceSentences(value) {
  let text = stripParentheticalStrings(value);
  for (;;) {
    const match = evidenceMatch(text, true);
    if (!match) break;
    const [start, end] = sentenceAround(text, match.index);
    const next = `${text.slice(0, start)}${text.slice(end)}`;
    if (next === text) break;
    text = next;
  }
  return text
    .replace(/[ \t]+([,.;:!?])/g, '$1')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/** Sanitize prose stored in OpenRPC/reference JSON. */
export function sanitizePublicText(value) {
  let text = stripEvidenceSentences(value);
  text = text
    .split(/\n{2,}/)
    .filter((paragraph) => {
      const p = paragraph.trim();
      return p && !PRIVATE_QUOTE.test(p) && !hasInternalEvidence(p) && !/^(?:source|sources|code proof|implementation evidence)\s*:/i.test(p);
    })
    .join('\n\n')
    .replace(/[ \t]+([,.;:!?])/g, '$1')
    .replace(/\(\s*\)/g, '')
    .replace(/\bdemo1\b/gi, 'example.admin')
    .replace(/\bsup1\b/gi, 'example.supervisor')
    .replace(/\bop1\b/gi, 'example.operator')
    .replace(/\bwelcome1\b/gi, '<password>')
    .replace(RAW_MARKDOWN_REFERENCE, publicGuideName)
    .replace(/\benterprise\.warehouse\b/gi, 'warehouse settings')
    .trim();
  return text;
}

export function sanitizePublicObject(value) {
  if (typeof value === 'string') return sanitizePublicText(value);
  if (Array.isArray(value)) return value.map(sanitizePublicObject);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizePublicObject(item)]));
}

export const PUBLIC_FORBIDDEN_PATTERNS = [
  /Not confirmed(?: by code)?/i,
  /Where it comes from/i,
  /<h[1-6][^>]*>[^<]*(?:Findings|Internal audit)[^<]*<\/h[1-6]>/i,
  /\b(?:commit|source revision|source sha)\s+[0-9a-f]{9,40}\b/i,
  /\b[A-Za-z0-9][A-Za-z0-9_-]*\.md\b/i,
  /\bapp-server\s+check-(?:config|dependencies)\b/i,
  /\benterprise\.warehouse\b/i,
  /(?:crates|clients|apps|ui\/src|app-server\/src|web-ui-server\/src|docs-obsidian|\.claude)\//i,
  /docs\/superpowers\//i,
  /\bwms-[a-z0-9_-]+\/(?:src|migrations?|sql)\//i,
  /\b[A-Za-z0-9_.…*~-]+\.(?:rs|sql|go|tsx?)(?::(?:~?\d+)(?:-\d+)?)?\b/i,
  /(?:^|[\s`=('"/])\*\.(?:rs|sql|go|tsx?)\b/i,
  /\bBASELINE(?::\d+(?:-\d+)?)?\b/i,
  /every arrow comes from (?:the )?code/i,
  /paths? to code start/i,
  /<(?:p|li|td|blockquote|strong)[^>]*>\s*(?:<[^>]+>\s*)*To verify\b/i,
  /\(\s*(?:bug,\s*)?to verify\s*\)/i,
  /\bSee (?:the )?["“]?To verify\b/i,
  /\b(?:wms-(?:app|meta-ui|enterprise)|meta-ui)\s+migrations?\b/i,
  /\bmigrations?\s+\d{1,4}\b/i,
  /\bwms-app\s+\d{1,4}\b/i,
  /\bruling\s+[A-Z]\d+\b/i,
  /\b(?:[A-Za-z][A-Za-z -]+\s+)?spec\s+20\d{2}-\d{2}-\d{2}(?:\s*§\s*\d+)?/i,
  /\bowner decision\s+20\d{2}-\d{2}-\d{2}\b/i,
  /\b(?:F|P)-\d{2}\b/,
  /\bcode comment\b/i,
  /\bdev(?:elopment)?\s+seed\b/i,
  /\b(?:I\s+)?search(?:ed|ing)?\s+(?:all\s+)?(?:the\s+)?(?:Rust\s+)?(?:code|crates|engine)\b/i,
  /\b(?:grep|rg)\b[^\n]*/i,
  /\bsearch(?:ed|ing)?\s+(?:over|through)\s+\*?\.(?:rs|sql|go|tsx?)\b/i,
  /\bchecked by searching\b/i,
  /\b(?:(?:I|each(?: of these)?)\s+)?(?:(?:has|have|was|were|is|are)\s+)?searched\s+in\b/i,
  /\bLabel missing in English\b/i,
  /\bsee the findings file\b/i,
  /\bHow [^<>.!?\n]* was checked\b/i,
  /\bAll statements come from (?:the )?code\b/i,
  /\bSome (?:of these )?texts contain Russian words\b/i,
  /\bThat is how (?:it|they) (?:is|are) written in the code\b/i,
  /#\[[A-Za-z_][^\]\n]*\]/i,
  /<(?:p|li)[^>]*>\s*(?:Source|Sources):\s/i,
];
