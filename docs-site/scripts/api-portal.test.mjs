// Sanity tests for the API portal generator. Run: npm run test:api
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildMethodRecord, categoryOf, exampleOf, SAMPLE_UUID } from './lib/rpc-model.mjs';
import { hoistSchema } from './lib/openapi.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = (p) => JSON.parse(readFileSync(resolve(here, '../static/api', p), 'utf8'));

test('categoryOf: declared, inferred query, not declared', () => {
  assert.deepEqual(categoryOf({ 'x-quark-command-type': 'stateful_command' }), { category: 'stateful_command', declared: true });
  assert.deepEqual(categoryOf({ 'x-quark-operation': 'read' }), { category: 'query', declared: false });
  assert.deepEqual(categoryOf({ 'x-quark-operation': 'execute' }), { category: 'not_declared', declared: false });
});

test('exampleOf: required fields, refs, cycles', () => {
  const defs = { Node: { type: 'object', properties: { next: { $ref: '#/definitions/Node' }, id: { type: 'integer' } }, required: ['id', 'next'] } };
  const ex = exampleOf({ $ref: '#/definitions/Node' }, defs);
  assert.equal(ex.id, 1);
  assert.equal(ex.next, null); // the cycle is cut, not looped
  assert.equal(exampleOf({ type: 'string', format: 'uuid' }), SAMPLE_UUID);
});

test('commands get meta.idempotency_key, queries do not; key is not repeated in data', () => {
  const cmd = buildMethodRecord({
    name: 'x_close', 'x-quark-command-type': 'stateful_command', 'x-quark-context': 'inbound', 'x-quark-module': 'm', 'x-quark-operation': 'execute',
    params: [{ name: 'data', required: true, schema: { type: 'object', required: ['idempotency_key', 'id'], properties: { idempotency_key: { type: 'string', format: 'uuid' }, id: { type: 'integer' } } } }],
    result: { schema: { type: 'object' } },
  });
  assert.equal(cmd.requestExample.params.meta.idempotency_key, SAMPLE_UUID);
  assert.equal('idempotency_key' in cmd.requestExample.params.data, false);
  const q = buildMethodRecord({ name: 'get_x', 'x-quark-context': 'inbound', 'x-quark-module': 'm', 'x-quark-operation': 'read', params: [{ name: 'id', required: true, schema: { type: 'integer' } }], result: { schema: { type: 'object' } } });
  assert.equal(q.requestExample.params.meta, undefined);
});

test('hoistSchema shares identical definitions and rewrites refs', () => {
  const components = new Map();
  const byHash = new Map();
  const mk = () => ({ definitions: { A: { type: 'string' } }, properties: { a: { $ref: '#/definitions/A' } }, type: 'object' });
  const s1 = hoistSchema(mk(), components, byHash);
  const s2 = hoistSchema(mk(), components, byHash);
  assert.equal(components.size, 1);
  assert.equal(s1.properties.a.$ref, '#/components/schemas/A');
  assert.deepEqual(s1, s2);
});

test('generated output matches the catalog', () => {
  const catalog = JSON.parse(readFileSync(resolve(here, '../../docs-obsidian/user-guide/api/openrpc.json'), 'utf8'));
  const index = out('data/index.json');
  const api = out('openapi.json');
  assert.equal(index.total, catalog.methods.length);
  assert.equal(index.methods.length, catalog.methods.length);
  assert.equal(Object.keys(api.paths).length, catalog.methods.length);
  const ids = new Set(Object.values(api.paths).map((p) => p.post.operationId));
  for (const m of catalog.methods) assert.ok(ids.has(m.name), `operationId ${m.name}`);
  // the portal must never claim the standard JSON-RPC error object
  assert.match(api.info.description, /not standard JSON-RPC/i);
  assert.equal(api.components.schemas.Error.properties.error.required[0], 'message');
});
