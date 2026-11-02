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

test('aggregate master-data create examples repeat the validated key in data', () => {
  for (const name of ['create_owner_full', 'create_pack_with_items', 'create_sku_full']) {
    const cmd = buildMethodRecord({
      name,
      'x-quark-command-type': 'stateless_command',
      'x-quark-context': 'master_data',
      'x-quark-module': 'm',
      'x-quark-operation': 'execute',
      params: [{
        name: 'data',
        required: true,
        schema: { type: 'object', properties: { idempotency_key: { type: 'string', format: 'uuid' } } },
      }],
      result: { schema: { type: 'object' } },
    });
    assert.equal(cmd.requestExample.params.meta.idempotency_key, SAMPLE_UUID);
    assert.equal(cmd.requestExample.params.data.idempotency_key, SAMPLE_UUID);
  }
});

test('published aggregate master-data schemas require both idempotency keys', () => {
  const catalog = JSON.parse(readFileSync(resolve(here, '../../docs-obsidian/user-guide/api/openrpc.json'), 'utf8'));
  for (const name of ['create_owner_full', 'create_pack_with_items', 'create_sku_full']) {
    const method = catalog.methods.find((candidate) => candidate.name === name);
    assert.ok(method, name);
    const meta = method.params.find((param) => param.name === 'meta');
    const data = method.params.find((param) => param.name === 'data');
    assert.equal(meta.required, true, `${name} meta parameter`);
    assert.ok(meta.schema.required.includes('idempotency_key'), `${name} meta key`);
    assert.equal(data.required, true, `${name} data parameter`);
    assert.ok(data.schema.required.includes('idempotency_key'), `${name} data key`);
  }
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
