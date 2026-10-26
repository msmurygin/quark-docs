// Reads facts the OpenRPC catalog does not carry from the generated Markdown
// reference (api/reference/*.md): the result wrapper, per-method notes and the
// error table. Those files are produced by scripts/docs-api/regenerate.sh from
// the Rust sources, so this keeps the portal consistent with the guide.
// If the folder is missing the portal still builds, with heuristics.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function parseReferenceDir(dir) {
  const out = new Map();
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md') && x !== 'index.md')) {
    const text = readFileSync(resolve(dir, f), 'utf8');
    const parts = text.split(/^### /m).slice(1);
    for (const part of parts) {
      const name = part.split('\n', 1)[0].trim();
      if (!/^[a-z0-9_.]+$/.test(name)) continue;
      const info = { wrapper: undefined, notes: [], errors: [] };
      const res = /The `result` member of the response is: `?\{ ?"(meta|data)"/.exec(part);
      if (res) info.wrapper = res[1] === 'meta' ? 'command' : 'data';
      else if (/not wrapped in a `data` object/.test(part)) info.wrapper = 'plain';
      const notes = /\*\*Notes\*\*\n\n((?:- .*\n?)+)/.exec(part);
      if (notes) info.notes = notes[1].split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim());
      const errs = /\*\*Errors\*\*\n\n\|[^\n]*\n\|[^\n]*\n((?:\|.*\n?)+)/.exec(part);
      if (errs) {
        info.errors = errs[1]
          .split('\n')
          .filter((l) => l.startsWith('|'))
          .map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
          .filter((c) => c.length >= 3)
          .map(([http, error, when]) => ({ http, error, when }));
      }
      out.set(name, info);
    }
  }
  return out;
}
