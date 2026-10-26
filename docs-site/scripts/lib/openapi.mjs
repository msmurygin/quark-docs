// OpenRPC -> OpenAPI 3.1. One POST operation per JSON-RPC method.
//
// OpenAPI cannot hold several operations on the same path + verb, so each
// method gets the path `/api/rpc#<method>`. The fragment is never sent by a
// client; every operation really is `POST /api/rpc`. Tools that group by
// operationId (Postman, Redoc, Scalar, code generators) handle this shape.
import { createHash } from 'node:crypto';
import { SAMPLE_UUID } from './rpc-model.mjs';

const DEF_REF = /^#\/(?:definitions|\$defs)\/(.+)$/;

function sha(s) {
  return createHash('sha1').update(s).digest('hex').slice(0, 8);
}

/** Names of definitions a (sub)schema refers to. */
function refsIn(node, acc = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => refsIn(n, acc));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === '$ref' && typeof v === 'string') {
        const m = DEF_REF.exec(v);
        if (m) acc.add(m[1]);
      } else refsIn(v, acc);
    }
  }
  return acc;
}

/**
 * Moves a schema's local `definitions` into `components.schemas` and rewrites
 * `$ref`s. A definition is shared between methods when it, and everything it
 * refers to, is byte-identical (closure hash). Names that clash get a suffix.
 */
export function hoistSchema(schema, components, nameByHash) {
  const defs = { ...(schema.definitions || {}), ...(schema.$defs || {}) };
  const closure = (name, seen = new Set()) => {
    if (seen.has(name) || !(name in defs)) return [];
    seen.add(name);
    const parts = [name, JSON.stringify(defs[name])];
    for (const r of [...refsIn(defs[name])].sort()) parts.push(...closure(r, seen));
    return parts;
  };
  const keyFor = {};
  for (const name of Object.keys(defs)) {
    const h = sha(closure(name).join('\u0000'));
    if (!nameByHash.has(h)) {
      let key = name.replace(/[^A-Za-z0-9._-]/g, '_');
      if (components.has(key)) key = `${key}_${h.slice(0, 6)}`;
      nameByHash.set(h, key);
      components.set(key, null); // reserve; filled below
    }
    keyFor[name] = nameByHash.get(h);
  }
  const rewrite = (node) => {
    if (Array.isArray(node)) return node.map(rewrite);
    if (node && typeof node === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        if (k === '$schema' || k === 'definitions' || k === '$defs') continue;
        if (k === '$ref' && typeof v === 'string') {
          const m = DEF_REF.exec(v);
          out[k] = m && keyFor[m[1]] ? `#/components/schemas/${keyFor[m[1]]}` : v;
        } else out[k] = rewrite(v);
      }
      return out;
    }
    return node;
  };
  for (const [name, def] of Object.entries(defs)) {
    const key = keyFor[name];
    if (components.get(key) === null) components.set(key, rewrite(def));
  }
  return rewrite(schema);
}

const ERROR_SCHEMA = {
  type: 'object',
  description:
    'Error body. This is NOT the JSON-RPC 2.0 error object: there is no `jsonrpc` key and no numeric `code`. Switch on `error.message`. See the Errors page of the API guide.',
  required: ['error'],
  properties: {
    id: { description: 'The id of your request. null when the server refused the call before it ran the method.', type: ['integer', 'string', 'null'] },
    error: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string', description: 'The error name in capital letters, for example RPC_PARAMS_INVALID.' },
        data: {
          type: 'object',
          properties: {
            req_uuid: { type: 'string', description: 'Request id in the server log. Give it to support.' },
            detail: { description: 'More information: null, a text, a number or an object.' },
          },
        },
      },
    },
  },
};

const CATEGORY_TEXT = {
  query: 'Reads data. No idempotency key, no version.',
  stateless_command: 'Changes data. Requires `meta.idempotency_key`. No version check.',
  stateful_command: 'Changes data. Requires `meta.idempotency_key` and the current version of each row it checks.',
  not_declared: 'The catalog gives no command type for this write method. Send an idempotency key to be safe.',
};

function wrapResult(wrapper, schema) {
  if (wrapper === 'plain') return schema;
  const props = { data: schema };
  if (wrapper === 'command') props.meta = { type: 'object', properties: { idempotency_replayed: { type: 'boolean' } } };
  return { type: 'object', properties: props };
}

export function toOpenApi(openrpc, records, { serverUrl = 'https://your-wms.example.com' } = {}) {
  const components = new Map();
  const nameByHash = new Map();
  const paths = {};
  const tagNames = [];

  for (const rec of records) {
    if (!tagNames.includes(rec.context)) tagNames.push(rec.context);
    const props = {};
    const required = [];
    for (const p of rec.params) {
      props[p.name] = { ...hoistSchema(p.schema, components, nameByHash), ...(p.summary ? { description: p.summary } : {}) };
      if (p.required) required.push(p.name);
    }
    const params = { type: 'object', properties: props, ...(required.length ? { required } : {}) };
    const resultSchema = hoistSchema(rec.result.schema, components, nameByHash);
    const desc = [
      rec.summary,
      '',
      `**Category:** \`${rec.category}\`${rec.declared ? '' : ' (inferred)'}. ${CATEGORY_TEXT[rec.category]}`,
      '',
      `**Default roles:** ${rec.roles.join(', ') || 'none'}. An administrator can change the grants.`,
      rec.versionedEntities.length ? `\n**Versioned entities:** ${rec.versionedEntities.map((e) => `${e.entity} (id in data.${e.id_field}, version in data.${e.version_field})`).join('; ')}.` : '',
      '',
      rec.notes.length ? '\n**Notes**\n\n' + rec.notes.map((n) => `- ${n}`).join('\n') : '',
      '',
      '_Errors are not standard JSON-RPC 2.0 error objects. See the `Error` response._',
    ].join('\n');

    paths[`/api/rpc#${rec.name}`] = {
      post: {
        operationId: rec.name,
        summary: rec.summary || rec.name,
        description: desc,
        tags: [rec.context],
        'x-quark-category': rec.category,
        'x-quark-category-declared': rec.declared,
        'x-quark-requires-idempotency': rec.idempotency,
        'x-quark-default-roles': rec.roles,
        'x-quark-versioned-entities': rec.versionedEntities,
        'x-quark-errors': rec.errors,
        'x-quark-module': rec.module,
        'x-quark-operation': rec.operation,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['jsonrpc', 'id', 'method', ...(rec.params.length ? ['params'] : [])],
                properties: {
                  jsonrpc: { const: '2.0' },
                  id: { description: 'Any JSON value. Returned in the answer.', type: ['integer', 'string'] },
                  method: { const: rec.name },
                  params,
                },
              },
              example: rec.requestExample,
            },
          },
        },
        responses: {
          200: {
            description: 'Success. A failed business rule can also answer HTTP 200 with an error body (APPLICATION_RETURN): always check for `error`.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['jsonrpc', 'id', 'result'],
                  properties: { jsonrpc: { const: '2.0' }, id: {}, result: wrapResult(rec.wrapper, resultSchema) },
                },
                example: { jsonrpc: '2.0', id: 1, result: rec.resultExample },
              },
            },
          },
          default: {
            description: 'Error (HTTP 400, 401, 403, 500 or 503). Not a JSON-RPC 2.0 error object.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    };
  }

  const schemas = { Error: ERROR_SCHEMA };
  for (const [k, v] of [...components].sort(([a], [b]) => a.localeCompare(b))) schemas[k] = v;

  return {
    openapi: '3.1.0',
    info: {
      title: openrpc.info?.title ?? 'WMS API',
      version: openrpc.info?.version ?? '1.0.0',
      description:
        'Every method is `POST /api/rpc` with a JSON-RPC 2.0 request body. The path key `/api/rpc#<method>` only keeps the operations apart in this file.\n\n' +
        '**Errors are not standard JSON-RPC.** A failed call returns `{ "id", "error": { "message", "data": { "req_uuid", "detail" } } }` with no `jsonrpc` key and no numeric code.\n\n' +
        `Generated from openrpc.json (${records.length} methods). Example idempotency key: \`${SAMPLE_UUID}\`.`,
    },
    servers: [{ url: serverUrl, description: 'Your WMS installation' }],
    tags: tagNames.map((name) => ({ name })),
    paths,
    components: {
      schemas,
      securitySchemes: {
        apiKey: { type: 'http', scheme: 'bearer', description: 'API key: `Authorization: Bearer wms_live_sk_...`' },
        session: { type: 'apiKey', in: 'cookie', name: 'auth-token', description: 'Session cookie from POST /api/login.' },
      },
    },
    security: [{ apiKey: [] }, { session: [] }],
  };
}
