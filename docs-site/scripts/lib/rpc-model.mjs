// Normalises the OpenRPC catalog into the records the API portal renders.
// Pure functions only: no file or network access, so they are easy to test.

export const CONTEXTS = [
  ['enterprise', 'Enterprise', 'Users, roles and permissions, user warehouses, API keys, audit log, system settings, supervisor override grants, projects, dashboard settings, handling unit types and the log level switch. These methods work across all warehouses.'],
  ['master_data', 'Master data', 'Reference data: owners, SKUs, locations, put-away zones, packs, barcode formats, code lists and similar set-up records.'],
  ['inbound', 'Inbound', 'Receiving: ASNs and receipts, receipt lines, damage, case-level receiving, receipt policies and lot policies.'],
  ['inventory', 'Inventory', 'Stock: moves, put-away and put-away policies, holds, serial numbers, adjustments, counts, the transaction log, lot lookup and barcode scan reading.'],
  ['outbound', 'Outbound', 'Shipping: shipment orders, allocation, waves, picking, packing, cartonization and replenishment policies.'],
  ['tasks', 'Tasks', 'The task manager: work areas, operators, equipment profiles and the claim, report and finish cycle of a task.'],
  ['reporting', 'Reporting', 'Reports, labels, templates and printers.'],
  ['rf', 'RF screens', 'Handheld (RF) screen definitions and the screen graph.'],
  ['integration', 'Integration', 'Methods for integrations: stock and balance reads, marking (SGTIN) confirmations, entity attributes, the event registry, integration events and their deliveries.'],
];

export const SAMPLE_UUID = '7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f';

/**
 * Category as the guide defines it (api/04-command-types-and-concurrency.md):
 * the declared command type, else `query` inferred from a read operation,
 * else `not declared`. `declared` tells the UI whether to add the asterisk.
 */
export function categoryOf(m) {
  const declared = m['x-quark-command-type'];
  if (declared) return { category: declared, declared: true };
  if (m['x-quark-operation'] === 'read') return { category: 'query', declared: false };
  return { category: 'not_declared', declared: false };
}

export function requiresIdempotency(m) {
  const c = m['x-quark-command-type'];
  return c === 'stateless_command' || c === 'stateful_command' || m['x-quark-requires-idempotency'] === true;
}

// ---------- JSON Schema -> example value ----------

const MAX_DEPTH = 6;

function resolveRef(ref, defs) {
  const m = /^#\/(?:definitions|\$defs)\/(.+)$/.exec(ref);
  return m ? defs?.[m[1]] : undefined;
}

function pickType(t) {
  if (Array.isArray(t)) return t.find((x) => x !== 'null') ?? 'null';
  return t;
}

function placeholder(key) {
  return `<${key || 'value'}>`;
}

/** Builds a small, plausible example from a schema. Required fields first. */
export function exampleOf(schema, defs = {}, key = '', depth = 0, stack = []) {
  if (schema === true || schema == null || typeof schema !== 'object') return null;
  if (depth > MAX_DEPTH) return null;
  if (schema.$ref) {
    if (stack.includes(schema.$ref)) return null;
    const target = resolveRef(schema.$ref, defs);
    return target ? exampleOf(target, defs, key, depth + 1, [...stack, schema.$ref]) : null;
  }
  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined && schema.default !== null) return schema.default;
  if (schema.const !== undefined) return schema.const;
  if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum.find((v) => v !== null) ?? null;
  const alt = schema.oneOf || schema.anyOf;
  if (alt?.length) {
    const first = alt.find((s) => pickType(s?.type) !== 'null') ?? alt[0];
    return exampleOf(first, defs, key, depth + 1, stack);
  }
  if (schema.allOf?.length) {
    const merged = { type: 'object', properties: {}, required: [] };
    for (const s of schema.allOf) {
      const r = s.$ref ? resolveRef(s.$ref, defs) ?? {} : s;
      Object.assign(merged.properties, r.properties || {});
      merged.required.push(...(r.required || []));
    }
    return exampleOf(merged, defs, key, depth + 1, stack);
  }
  let type = pickType(schema.type);
  if (!type) type = schema.properties ? 'object' : schema.items ? 'array' : undefined;
  switch (type) {
    case 'string':
      if (schema.format === 'uuid') return SAMPLE_UUID;
      if (schema.format === 'date-time') return '2026-01-01T00:00:00Z';
      if (schema.format === 'date') return '2026-01-01';
      if (schema.format === 'time') return '08:00:00';
      return placeholder(key);
    case 'integer':
      return schema.minimum !== undefined && schema.minimum > 1 ? schema.minimum : 1;
    case 'number':
      return 1.5;
    case 'boolean':
      return false;
    case 'array': {
      const item = exampleOf(schema.items, defs, key, depth + 1, stack);
      return item === null ? [] : [item];
    }
    case 'object': {
      const props = schema.properties || {};
      const req = (schema.required || []).filter((k) => k in props);
      let keys = req;
      if (keys.length === 0 && depth <= 1) keys = Object.keys(props).slice(0, 3);
      const out = {};
      for (const k of keys) out[k] = exampleOf(props[k], defs, k, depth + 1, stack);
      return out;
    }
    default:
      return null;
  }
}

/** The `definitions` a param schema carries (draft-07), as a flat map. */
function defsOf(schema) {
  return { ...(schema?.definitions || {}), ...(schema?.$defs || {}) };
}

function stripMeta(schema) {
  if (Array.isArray(schema)) return schema.map(stripMeta);
  if (schema && typeof schema === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(schema)) {
      if (k === '$schema') continue;
      out[k] = stripMeta(v);
    }
    return out;
  }
  return schema;
}

/** One portal record per OpenRPC method. */
export function buildMethodRecord(m, extra = {}) {
  const { category, declared } = categoryOf(m);
  const idem = requiresIdempotency(m);
  const params = (m.params || []).map((p) => ({
    name: p.name,
    required: !!p.required,
    summary: p.summary || p.description || '',
    schema: stripMeta(p.schema ?? {}),
  }));

  const reqParams = {};
  for (const p of params) {
    if (p.name === 'meta') {
      const meta = idem ? { idempotency_key: SAMPLE_UUID } : {};
      const ex = exampleOf(p.schema, defsOf(p.schema), 'meta');
      reqParams.meta = idem ? { ...(ex && typeof ex === 'object' && !Array.isArray(ex) ? ex : {}), ...meta } : ex;
      // Keep the envelope small: idempotency_key is the one meta field we show.
      if (idem) reqParams.meta = meta;
    } else if (p.required || p.name === 'data' || p.name === 'id' || p.name === 'ids') {
      reqParams[p.name] = exampleOf(p.schema, defsOf(p.schema), p.name);
    }
  }
  // The key travels in `meta` (guide, api/03). Drop the copy some `data` schemas declare.
  if (idem && reqParams.data && typeof reqParams.data === 'object' && !Array.isArray(reqParams.data)) {
    delete reqParams.data.idempotency_key;
  }
  // A command that needs a key but declares no `meta` parameter still gets one.
  if (idem && !('meta' in reqParams)) reqParams.meta = { idempotency_key: SAMPLE_UUID };
  // `meta` first, as in the guide.
  const ordered = {};
  if ('meta' in reqParams) ordered.meta = reqParams.meta;
  for (const k of Object.keys(reqParams)) if (k !== 'meta') ordered[k] = reqParams[k];

  const resultSchema = stripMeta(m.result?.schema ?? {});
  const value = exampleOf(resultSchema, defsOf(resultSchema), 'result');
  // Which wrapper the answer uses is not in the catalog. The generated reference
  // read it from the Rust handlers; without it, fall back to the guide's rule.
  const wrapper = extra.wrapper || (params.some((p) => p.name === 'meta') && idem ? 'command' : 'data');
  const resultExample = wrapper === 'plain' ? value : wrapper === 'command' ? { meta: { idempotency_replayed: false }, data: value } : { data: value };

  const rec = {
    name: m.name,
    summary: m.summary || '',
    context: m['x-quark-context'],
    module: m['x-quark-module'],
    methodClass: m['x-quark-method-class'],
    operation: m['x-quark-operation'],
    category,
    declared,
    idempotency: idem,
    roles: m['x-quark-default-roles'] || [],
    versionedEntities: m['x-quark-versioned-entities'] || [],
    params,
    result: { required: !!m.result?.required, schema: resultSchema },
    requestExample: { jsonrpc: '2.0', id: 1, method: m.name, ...(Object.keys(ordered).length ? { params: ordered } : {}) },
    resultExample,
    wrapper,
    notes: extra.notes || [],
    errors: extra.errors || [],
  };
  return rec;
}

/** Search/nav index: short keys keep it small (it loads on every portal visit). */
export function buildIndex(records) {
  const ctxIds = CONTEXTS.map((c) => c[0]);
  const unknown = [...new Set(records.map((r) => r.context))].filter((c) => !ctxIds.includes(c));
  const contexts = [
    ...CONTEXTS.map(([id, label, description]) => ({ id, label, description })),
    ...unknown.map((id) => ({ id, label: id, description: '' })),
  ];
  const out = contexts
    .map((c) => {
      const rs = records.filter((r) => r.context === c.id);
      const modules = [];
      for (const r of rs) {
        let mod = modules.find((x) => x.id === r.module);
        if (!mod) modules.push((mod = { id: r.module, methods: [] }));
        mod.methods.push(r.name);
      }
      return { ...c, count: rs.length, modules };
    })
    .filter((c) => c.count > 0);
  const methods = records.map((r) => ({ n: r.name, c: r.context, m: r.module, k: r.category + (r.declared ? '' : '*'), s: r.summary }));
  return { contexts: out, methods, total: records.length };
}
