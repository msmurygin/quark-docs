#!/usr/bin/env node
// Generates the API portal data from the OpenRPC catalog.
//
//   input : ../docs-obsidian/user-guide/api/openrpc.json  (override: OPENRPC_PATH)
//   output: static/api/data/index.json        nav + search index
//           static/api/data/<context>.json    method records, one shard per context
//           static/api/openapi.json           OpenAPI 3.1 conversion (download)
//           static/api/openrpc.json           copy of the catalog (download)
//           src/generated/api-stats.json      counts for the landing page
//
// Also reads api/reference/*.md (generated, not rendered by the guide site) for
// the result wrapper, notes and error table of each method.
//
// Runs as the first step of `npm run build` / `npm start`, so the portal
// always matches openrpc.json. Output is deterministic (no timestamps).
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildMethodRecord, buildIndex } from './lib/rpc-model.mjs';
import { toOpenApi } from './lib/openapi.mjs';
import { parseReferenceDir } from './lib/reference-notes.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(here, '..');
const src = resolve(process.env.OPENRPC_PATH || resolve(siteDir, '../docs-obsidian/user-guide/api/openrpc.json'));
const outDir = resolve(siteDir, 'static/api');
const dataDir = resolve(outDir, 'data');

const t0 = Date.now();
const raw = readFileSync(src);
const doc = JSON.parse(raw.toString('utf8'));
if (!Array.isArray(doc.methods) || doc.methods.length === 0) throw new Error(`${src}: no methods`);

const names = new Set();
for (const m of doc.methods) {
  if (names.has(m.name)) throw new Error(`duplicate method name ${m.name}`);
  names.add(m.name);
}

const refNotes = parseReferenceDir(resolve(dirname(src), 'reference'));
const records = doc.methods.map((m) => buildMethodRecord(m, refNotes.get(m.name)));
const withNotes = records.filter((r) => r.errors.length).length;
if (refNotes.size && withNotes < records.length * 0.95) throw new Error(`reference/*.md parsed for only ${withNotes}/${records.length} methods; the generated format may have changed`);
const index = buildIndex(records);
index.source = { file: 'openrpc.json', openrpc: doc.openrpc, title: doc.info?.title, version: doc.info?.version, sha256: createHash('sha256').update(raw).digest('hex').slice(0, 12) };

rmSync(dataDir, { recursive: true, force: true });
mkdirSync(dataDir, { recursive: true });
writeFileSync(resolve(dataDir, 'index.json'), JSON.stringify(index));
for (const c of index.contexts) {
  const shard = Object.fromEntries(records.filter((r) => r.context === c.id).map((r) => [r.name, r]));
  writeFileSync(resolve(dataDir, `${c.id}.json`), JSON.stringify(shard));
}
const openapi = toOpenApi(doc, records);
writeFileSync(resolve(outDir, 'openapi.json'), JSON.stringify(openapi));
copyFileSync(src, resolve(outDir, 'openrpc.json'));
// The landing page shows these numbers, so they can never drift from the catalog.
mkdirSync(resolve(siteDir, 'src/generated'), { recursive: true });
writeFileSync(resolve(siteDir, 'src/generated/api-stats.json'), JSON.stringify({ total: records.length, contexts: index.contexts.length, version: doc.info?.version ?? '', openrpc: doc.openrpc ?? '' }, null, 2) + '\n');

const ops = Object.keys(openapi.paths).length;
if (ops !== records.length) throw new Error(`OpenAPI has ${ops} operations, expected ${records.length}`);
console.log(`[api-portal] ${records.length} methods, ${index.contexts.length} contexts, ${Object.keys(openapi.components.schemas).length} shared schemas, ${Date.now() - t0} ms (source sha ${index.source.sha256})`);
