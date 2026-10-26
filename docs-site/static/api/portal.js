/* Quark WMS API portal. No framework, no build step, no third-party code.
 * Data comes from data/index.json (nav + search) and one shard per context
 * (data/<context>.json), fetched on demand. Hash routes:
 *   #                 overview
 *   #ctx-<context>    one context
 *   #<method_name>    one method (deep link)
 */
(function () {
  'use strict';

  var CAT = {
    query: { label: 'query', text: 'Reads data. No idempotency key and no version in the request.' },
    stateless_command: { label: 'stateless command', text: 'Changes data. Send meta.idempotency_key. No version check: the decision does not depend on what you read.' },
    stateful_command: { label: 'stateful command', text: 'Changes data. Send meta.idempotency_key and the current version of each row it checks. If the row changed, the call fails with return code 40 and the answer carries the current state.' },
    not_declared: { label: 'not declared', text: 'This write method has no command type in the catalog. Treat it as a write: read the notes below and send an idempotency key.' }
  };
  var DOCS = '../docs/';
  var state = { index: null, shards: {}, byName: {}, ctxById: {}, active: null, results: [], sel: -1 };
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- tiny DOM helpers (text only: nothing from the catalog is parsed as HTML) ---------- */
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  }
  function add(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(e, x); });
    else e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  /** `code` spans only. */
  function inline(text) {
    var out = [];
    String(text || '').split(/(`[^`]+`|\b\d\d-[a-z-]+\.md\b)/).forEach(function (p) {
      if (!p) return;
      var md = /^\d\d-([a-z-]+)\.md$/.exec(p);
      if (md) out.push(h('a', { href: DOCS + 'api/' + md[1], text: p })); // "05-errors.md" -> the Errors page
      else out.push(p.charAt(0) === '`' && p.length > 2 ? h('code', { text: p.slice(1, -1) }) : p);
    });
    return out;
  }
  function pretty(v) { return JSON.stringify(v, null, 2); }
  function highlight(json) {
    var frag = document.createDocumentFragment();
    var re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, last = 0, m;
    while ((m = re.exec(json))) {
      if (m.index > last) frag.appendChild(document.createTextNode(json.slice(last, m.index)));
      var cls = m[2] ? 'k' : m[1] ? 's' : m[3] ? 'l' : 'n';
      frag.appendChild(h('span', { class: cls, text: m[1] || m[3] || m[4] }));
      if (m[2]) frag.appendChild(document.createTextNode(m[2]));
      last = re.lastIndex;
    }
    frag.appendChild(document.createTextNode(json.slice(last)));
    return frag;
  }
  function copyBtn(getText) {
    var b = h('button', { class: 'copy', type: 'button', text: 'Copy' });
    b.addEventListener('click', function () {
      var t = getText();
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1400); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, fallback);
      else fallback();
      function fallback() {
        var ta = h('textarea', { 'aria-hidden': 'true' }); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { b.textContent = 'Press Ctrl+C'; }
        ta.remove();
      }
    });
    return b;
  }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- theme ---------- */
  $('#theme-btn').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', cur);
    store('theme', cur);
  });

  /* ---------- data ---------- */
  function getJson(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ': HTTP ' + r.status); return r.json(); }); }
  function shard(ctx) {
    if (!state.shards[ctx]) state.shards[ctx] = getJson('data/' + ctx + '.json');
    return state.shards[ctx];
  }

  /* ---------- navigation tree ---------- */
  function dot(k) { return h('span', { class: 'dot ' + k.replace('*', ''), title: CAT[k.replace('*', '')].label + (k.indexOf('*') >= 0 ? ' (inferred)' : '') }); }
  function methodLink(name) {
    var m = state.byName[name];
    return h('a', { class: 'm', href: '#' + name, 'data-n': name, 'aria-current': state.active === name ? 'true' : false }, dot(m.k), name);
  }
  function buildNav() {
    var nav = $('#nav');
    nav.textContent = '';
    nav.appendChild(h('a', { class: 'home', href: '#', 'data-home': '1' }, 'Overview'));
    state.index.contexts.forEach(function (c) {
      var d = h('details', { 'data-ctx': c.id }, h('summary', null, c.label, h('span', { class: 'n', text: String(c.count) })));
      d.addEventListener('toggle', function () { if (d.open) fillCtx(d, c); });
      nav.appendChild(d);
    });
  }
  function fillCtx(d, c) {
    if (d.getAttribute('data-filled')) return;
    d.setAttribute('data-filled', '1');
    var frag = document.createDocumentFragment();
    frag.appendChild(h('a', { class: 'm', href: '#ctx-' + c.id, style: 'font-family:var(--font);font-weight:600' }, 'All ' + c.label + ' methods'));
    c.modules.forEach(function (mod) {
      frag.appendChild(h('div', { class: 'mod', text: mod.id.replace(/_/g, ' ') }));
      mod.methods.forEach(function (n) { frag.appendChild(methodLink(n)); });
    });
    d.appendChild(frag);
    markActive();
  }
  function openCtx(id) {
    var d = document.querySelector('#nav details[data-ctx="' + id + '"]');
    if (d && !d.open) d.open = true; // toggle event fills it
    if (d) fillCtx(d, state.ctxById[id]);
  }
  function markActive() {
    document.querySelectorAll('#nav a[aria-current]').forEach(function (a) { a.removeAttribute('aria-current'); });
    var home = $('#nav .home');
    if (!state.active) home.setAttribute('aria-current', 'true');
    var a = state.active && document.querySelector('#nav a.m[data-n="' + state.active + '"]');
    if (a) { a.setAttribute('aria-current', 'true'); a.scrollIntoView({ block: 'nearest' }); }
  }

  /* ---------- search ---------- */
  function score(m, toks) {
    var n = m.n.toLowerCase(), s = m.s.toLowerCase(), mod = m.m.toLowerCase(), tot = 0;
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i], v = 0;
      if (n === t) v = 100;
      else if (n.indexOf(t) === 0) v = 60;
      else if (n.indexOf('_' + t) >= 0) v = 45;
      else if (n.indexOf(t) >= 0) v = 35;
      else if (mod.indexOf(t) >= 0) v = 15;
      else if (s.indexOf(t) >= 0) v = 10;
      else return 0;
      tot += v;
    }
    return tot - m.n.length / 100;
  }
  function runSearch(q) {
    var nav = $('#nav');
    q = q.trim().toLowerCase();
    if (!q) { state.results = []; buildNav(); markActive(); restoreOpen(); return; }
    var toks = q.split(/[\s_]+/).filter(Boolean), hits = [];
    state.index.methods.forEach(function (m) { var s = score(m, toks); if (s > 0) hits.push([s, m]); });
    hits.sort(function (a, b) { return b[0] - a[0] || (a[1].n < b[1].n ? -1 : 1); });
    state.results = hits.map(function (x) { return x[1]; });
    state.sel = state.results.length ? 0 : -1;
    nav.textContent = '';
    nav.appendChild(h('div', { class: 'count', 'aria-live': 'polite', text: state.results.length + ' of ' + state.index.total + ' methods' + (state.results.length > 60 ? ' (showing 60)' : '') }));
    state.results.slice(0, 60).forEach(function (m, i) {
      nav.appendChild(h('a', { class: 'res' + (i === 0 ? ' sel' : ''), href: '#' + m.n, 'data-i': i },
        h('span', { class: 'rn' }, dot(m.k), m.n), m.s ? h('span', { class: 'rs', text: m.s }) : null));
    });
  }
  var openCtxs = {};
  function restoreOpen() { if (state.active && state.byName[state.active]) openCtx(state.byName[state.active].c); }
  var qEl = $('#q'), tm;
  qEl.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { runSearch(qEl.value); }, 60); });
  qEl.addEventListener('keydown', function (e) {
    var rs = document.querySelectorAll('#nav .res');
    if (e.key === 'Escape') { qEl.value = ''; runSearch(''); }
    else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && rs.length) {
      e.preventDefault();
      state.sel = Math.max(0, Math.min(rs.length - 1, state.sel + (e.key === 'ArrowDown' ? 1 : -1)));
      rs.forEach(function (r, i) { r.classList.toggle('sel', i === state.sel); });
      rs[state.sel].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && rs[state.sel]) { location.hash = rs[state.sel].getAttribute('href'); closeMenu(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) && !e.metaKey && !e.ctrlKey) { e.preventDefault(); qEl.focus(); qEl.select(); }
  });
  $('#nav').addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });

  /* ---------- mobile menu ---------- */
  function closeMenu() { document.body.classList.remove('nav-open'); $('#menu-btn').setAttribute('aria-expanded', 'false'); }
  $('#menu-btn').addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $('#scrim').addEventListener('click', closeMenu);

  /* ---------- schema tree ---------- */
  var MAX_DEPTH = 10;
  function refName(s) { var m = s && typeof s.$ref === 'string' && /^#\/(?:definitions|\$defs)\/(.+)$/.exec(s.$ref); return m ? m[1] : null; }
  function deref(s, defs) { var n = refName(s); return n && defs[n] ? defs[n] : s; }
  function typeOf(s, defs) {
    if (s === true || s == null) return 'any';
    var rn = refName(s);
    var r = deref(s, defs);
    if (rn && r !== s && !r.type && !r.enum && !r.oneOf && !r.anyOf) return rn;
    var t = r.type;
    if (Array.isArray(t)) t = t.join(' | ');
    if (r.enum) return (rn || t || 'enum') + ' (enum)';
    if (r.oneOf || r.anyOf) return 'one of';
    if (r.allOf) return rn || 'object';
    if (t === 'array') return 'array of ' + typeOf(r.items, defs);
    if (t === 'object' || (!t && r.properties)) return rn || (r.title ? r.title : 'object');
    if (!t) return rn || 'any';
    return t + (r.format ? ' (' + r.format + ')' : '');
  }
  /** Child schemas worth showing under a node. */
  function children(s, defs) {
    var r = deref(s, defs), out = [];
    if (r.allOf) r.allOf.forEach(function (x) { var y = deref(x, defs); if (y.properties) out.push(y); });
    else if (r.properties) out.push(r);
    if (r.type === 'array' || (Array.isArray(r.type) && r.type.indexOf('array') >= 0)) {
      var it = deref(r.items, defs);
      if (it && (it.properties || it.oneOf || it.anyOf || it.allOf)) return children(r.items, defs);
    }
    return out;
  }
  function variants(s, defs) {
    var r = deref(s, defs);
    var list = r.oneOf || r.anyOf;
    if (!list && (r.type === 'array') && r.items) { var it = deref(r.items, defs); list = it.oneOf || it.anyOf; }
    return list || null;
  }
  function renderProps(schemas, defs, depth, stack) {
    var ul = h('ul', { class: 'schema' }), any = false;
    schemas.forEach(function (sc) {
      var req = sc.required || [];
      Object.keys(sc.properties || {}).forEach(function (k) {
        any = true;
        ul.appendChild(renderNode(k, sc.properties[k], defs, depth, stack, req.indexOf(k) >= 0));
      });
    });
    return any ? ul : null;
  }
  function renderNode(name, s, defs, depth, stack, required) {
    var r = deref(s, defs), li = h('li');
    var row = h('div', { class: 'prow' }, h('span', { class: 'pname', text: name }), h('span', { class: 'ptype', text: typeOf(s, defs) }), required ? h('span', { class: 'req', text: 'required' }) : null);
    li.appendChild(row);
    var desc = (s && s.description) || r.description;
    if (desc) li.appendChild(h('div', { class: 'pdesc' }, inline(desc.length > 600 ? desc.slice(0, 600) + '...' : desc)));
    if (r.enum) li.appendChild(h('div', { class: 'enum' }, r.enum.slice(0, 40).map(function (v) { return h('code', { text: String(v) }); }), r.enum.length > 40 ? ' ...' : null));
    if (r.default !== undefined && r.default !== null) li.appendChild(h('div', { class: 'pdesc' }, 'Default: ', h('code', { text: JSON.stringify(r.default) })));
    var rn = refName(s), kids = children(s, defs), vars = variants(s, defs);
    if ((kids.length || vars) && depth < MAX_DEPTH && !(rn && stack.indexOf(rn) >= 0)) {
      var st = rn ? stack.concat(rn) : stack, holder = h('div'), btn = h('button', { class: 'toggle', type: 'button', 'aria-expanded': 'false' }, 'Show fields');
      var built = false;
      btn.addEventListener('click', function () {
        if (!built) { built = true; holder.appendChild(renderChildren(kids, vars, defs, depth + 1, st)); }
        var open = holder.hidden = !holder.hidden;
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        btn.textContent = open ? 'Show fields' : 'Hide fields';
      });
      holder.hidden = true;
      row.appendChild(btn);
      li.appendChild(holder);
    } else if (rn && stack.indexOf(rn) >= 0) {
      row.appendChild(h('span', { class: 'none', text: '(recursive)' }));
    }
    return li;
  }
  function renderChildren(kids, vars, defs, depth, stack) {
    var box = h('div');
    var ul = renderProps(kids, defs, depth, stack);
    if (ul) box.appendChild(ul);
    if (vars) {
      var vl = h('ul', { class: 'schema' });
      vars.forEach(function (v, i) {
        var li = h('li'), r = deref(v, defs);
        li.appendChild(h('div', { class: 'prow' }, h('span', { class: 'pname', text: 'Variant ' + (i + 1) }), h('span', { class: 'ptype', text: typeOf(v, defs) })));
        if (r.description) li.appendChild(h('div', { class: 'pdesc' }, inline(r.description.slice(0, 400))));
        var k2 = children(v, defs);
        if (k2.length && depth < MAX_DEPTH) li.appendChild(renderChildren(k2, null, defs, depth + 1, stack));
        vl.appendChild(li);
      });
      box.appendChild(vl);
    }
    return box;
  }
  /** Top level of a param or result: its own fields, one level expanded. */
  function renderTop(schema) {
    var defs = Object.assign({}, schema.definitions || {}, schema.$defs || {});
    var kids = children(schema, defs), vars = variants(schema, defs);
    if (kids.length || vars) {
      var box = renderChildren(kids, vars, defs, 0, []);
      if (schema.description) box.insertBefore(h('p', { class: 'pdesc' }, inline(schema.description.slice(0, 800))), box.firstChild);
      return box;
    }
    var ul = h('ul', { class: 'schema' });
    ul.appendChild(renderNode(typeOf(schema, defs), schema, defs, 0, [], false));
    return ul;
  }

  /* ---------- pages ---------- */
  function setPage(title, nodes) {
    var main = $('#main');
    main.textContent = '';
    add(main, nodes);
    document.title = title + ' | Quark WMS API';
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  function errorNotice() {
    return h('div', { class: 'callout warn', role: 'note' },
      h('p', null, h('b', { text: 'Errors are not standard JSON-RPC. ' }),
        'A failed call returns an HTTP error status and ', h('code', { text: '{ "id", "error": { "message", "data": { "req_uuid", "detail" } } }' }),
        '. There is no ', h('code', { text: 'jsonrpc' }), ' key and no numeric ', h('code', { text: 'code' }), '. Switch on ', h('code', { text: 'error.message' }),
        '. See ', h('a', { href: DOCS + 'api/errors', text: 'Errors' }), ' in the API guide.'));
  }

  function overview() {
    state.active = null;
    var x = state.index;
    setPage('API reference', [
      h('h1', { text: 'API reference' }),
      h('p', { class: 'lead', text: 'Every method of the Quark WMS JSON-RPC API: ' + x.total + ' methods in ' + x.contexts.length + ' contexts. Each entry shows the parameters, the result, the errors and a copy-able curl call.' }),
      errorNotice(),
      h('h2', { text: 'How a call looks' }),
      h('p', null, 'Every call is ', h('code', { text: 'POST /api/rpc' }), ' with a JSON-RPC 2.0 request. The method name goes in ', h('code', { text: 'method' }), ' and the arguments in ', h('code', { text: 'params' }), '. New here? Start with the ', h('a', { href: DOCS + 'api/quickstart', text: 'Quickstart' }), '.'),
      codeBox([{ label: 'Request', text: pretty({ jsonrpc: '2.0', id: 1, method: 'receipt_close', params: { meta: { idempotency_key: '7f1c2d4e-5a6b-4c8d-9e0f-1a2b3c4d5e6f' }, data: { receipt_id: 42, expected_receipt_version: 7 } } }) }]),
      h('h2', { text: 'Contexts' }),
      h('div', { class: 'grid' }, x.contexts.map(function (c) {
        return h('a', { class: 'card', href: '#ctx-' + c.id }, h('b', null, c.label, h('span', { text: c.count + ' methods' })), h('p', { text: c.description }));
      })),
      h('h2', { text: 'Method categories' }),
      h('div', { class: 'legend' }, ['query', 'stateless_command', 'stateful_command', 'not_declared'].map(function (k) {
        return h('div', null, h('span', { class: 'badge ' + k }, h('span', { class: 'dot ' + k }), CAT[k].label), h('span', { text: CAT[k].text }));
      })),
      h('p', { class: 'muted' }, 'A category marked ', h('b', { text: '*' }), ' is inferred: the catalog declares no command type, so a read operation is shown as a query. See ',
        h('a', { href: DOCS + 'api/command-types-and-concurrency', text: 'Command types and concurrency' }), '.'),
      h('h2', { text: 'Downloads' }),
      h('ul', null,
        h('li', null, h('a', { href: 'openapi.json', text: 'openapi.json' }), ' - OpenAPI 3.1, one ', h('code', { text: 'POST /api/rpc' }), ' operation per method (path key ', h('code', { text: '/api/rpc#method' }), '). For Postman, code generators and API gateways.'),
        h('li', null, h('a', { href: 'openrpc.json', text: 'openrpc.json' }), ' - the OpenRPC catalog this portal is built from. A running server also returns it for ', h('code', { text: 'rpc.discover' }), '.')),
      h('footer', { class: 'foot', text: 'Catalog ' + (x.source.title || '') + ' ' + (x.source.version || '') + ', OpenRPC ' + (x.source.openrpc || '') + ', build ' + x.source.sha256 + '.' })
    ]);
    markActive();
  }

  function contextPage(id) {
    var c = state.ctxById[id];
    if (!c) return notFound(id);
    state.active = null;
    var filter = null, host = h('div');
    function draw() {
      host.textContent = '';
      c.modules.forEach(function (mod) {
        var rows = mod.methods.map(function (n) { return state.byName[n]; }).filter(function (m) { return !filter || m.k.replace('*', '') === filter; });
        if (!rows.length) return;
        host.appendChild(h('h3', { text: mod.id.replace(/_/g, ' ') }));
        host.appendChild(h('table', null,
          h('thead', null, h('tr', null, h('th', { text: 'Method' }), h('th', { text: 'Category' }), h('th', { text: 'What it does' }))),
          h('tbody', null, rows.map(function (m) {
            var k = m.k.replace('*', '');
            return h('tr', null, h('td', null, h('a', { class: 'mn', href: '#' + m.n, text: m.n })),
              h('td', null, h('span', { class: 'badge ' + k }, CAT[k].label + (m.k.indexOf('*') >= 0 ? '*' : ''))), h('td', { text: m.s }));
          }))));
      });
    }
    var chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Filter by category' }, ['all', 'query', 'stateless_command', 'stateful_command', 'not_declared'].map(function (k) {
      var b = h('button', { class: 'chip', type: 'button', 'aria-pressed': k === 'all' ? 'true' : 'false', text: k === 'all' ? 'All' : CAT[k].label });
      b.addEventListener('click', function () {
        filter = k === 'all' ? null : k;
        chips.querySelectorAll('.chip').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        draw();
      });
      return b;
    }));
    draw();
    setPage(c.label, [h('div', { class: 'crumbs' }, h('a', { href: '#', text: 'API reference' }), ' / ' + c.label),
      h('h1', { text: c.label + ' (' + c.count + ')' }), h('p', { class: 'lead', text: c.description }), chips, host]);
    openCtx(id);
    markActive();
  }

  function notFound(name) {
    state.active = null;
    setPage('Not found', [h('h1', { text: 'No such method' }), h('p', null, h('code', { text: name }), ' is not in this catalog. Try the search box (press /), or go back to the ', h('a', { href: '#', text: 'overview' }), '.')]);
    markActive();
  }

  function codeBox(tabs, footerLeft) {
    var pre = h('pre', { tabindex: '0' }), cur = 0, bar = h('div', { class: 'codebar', role: 'tablist' });
    function show(i) {
      cur = i;
      pre.textContent = '';
      pre.appendChild(tabs[i].html ? tabs[i].html() : highlight(typeof tabs[i].text === 'function' ? tabs[i].text() : tabs[i].text));
      bar.querySelectorAll('.tab').forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
    }
    tabs.forEach(function (t, i) { var b = h('button', { class: 'tab', type: 'button', role: 'tab', text: t.label }); b.addEventListener('click', function () { show(i); }); bar.appendChild(b); });
    bar.appendChild(h('span', { class: 'grow' }));
    bar.appendChild(copyBtn(function () { var t = tabs[cur]; return typeof t.text === 'function' ? t.text() : t.text; }));
    var box = h('div', { class: 'codebox' }, bar, pre);
    box.refresh = function () { show(cur); };
    show(0);
    return box;
  }

  function curlText(rec, base) {
    var body = pretty(rec.requestExample).replace(/'/g, "'\\''").replace(/\n/g, '\n  ');
    return 'curl -sS -X POST "' + base + '/api/rpc" \\\n' +
      '  -H "Authorization: Bearer $WMS_API_KEY" \\\n' +
      '  -H "X-Warehouse-Id: $WAREHOUSE_ID" \\\n' +
      '  -H "Content-Type: application/json" \\\n' +
      "  -d '" + body + "'";
  }

  function methodPage(name) {
    var meta = state.byName[name];
    if (!meta) return notFound(name);
    state.active = name;
    var ctx = state.ctxById[meta.c];
    setPage(name, [h('p', { class: 'loading', text: 'Loading ' + name + '...' })]);
    openCtx(meta.c); markActive();
    shard(meta.c).then(function (data) {
      if (state.active !== name) return; // user moved on
      var rec = data[name];
      if (!rec) return notFound(name);
      var base = store('quark-api-base') || '$BASE_URL';
      var catKey = rec.category;
      var curlBox = codeBox([
        { label: 'curl', text: function () { return curlText(rec, base); }, html: function () { return document.createTextNode(curlText(rec, base)); } },
        { label: 'JSON-RPC body', text: pretty(rec.requestExample) }
      ]);
      var baseInput = h('input', { type: 'text', value: base === '$BASE_URL' ? '' : base, placeholder: 'https://wms.example.com', 'aria-label': 'Server address for the curl example', spellcheck: 'false' });
      baseInput.addEventListener('input', function () {
        var v = baseInput.value.trim().replace(/\/+$/, '');
        base = v || '$BASE_URL'; store('quark-api-base', base); curlBox.refresh();
      });
      var perm = h('dd', null, 'RBAC resource type ', h('code', { text: 'api' }), ', resource code ', h('code', { text: name }));
      var page = [
        h('div', { class: 'crumbs' }, h('a', { href: '#', text: 'API reference' }), ' / ', h('a', { href: '#ctx-' + meta.c, text: ctx.label }), ' / ' + rec.module.replace(/_/g, ' ')),
        h('h1', { class: 'method', text: name }),
        rec.summary ? h('p', { class: 'lead', text: rec.summary }) : null,
        h('div', { class: 'badges' },
          h('span', { class: 'badge ' + catKey, title: CAT[catKey].text }, h('span', { class: 'dot ' + catKey }), CAT[catKey].label + (rec.declared ? '' : '*')),
          h('span', { class: 'badge', text: rec.operation }),
          rec.idempotency ? h('span', { class: 'badge', text: 'idempotency key' }) : null,
          rec.versionedEntities.length ? h('span', { class: 'badge', text: 'versioned: ' + rec.versionedEntities.map(function (e) { return e.entity; }).join(', ') }) : null),
        h('div', { class: 'callout' }, h('p', { text: CAT[catKey].text + (rec.declared ? '' : ' (Category inferred: the catalog declares no command type for this method.)') })),
        h('dl', { class: 'facts' },
          h('dt', { text: 'Context' }), h('dd', null, h('a', { href: '#ctx-' + meta.c, text: ctx.label }), ' / ' + rec.module),
          h('dt', { text: 'Default roles' }), h('dd', { text: (rec.roles.join(', ') || 'none') + ' (an administrator can change the grants)' }),
          h('dt', { text: 'Permission' }), perm,
          rec.versionedEntities.length ? [h('dt', { text: 'Version check' }), h('dd', null, rec.versionedEntities.map(function (e, i) {
            return h('div', { key: i }, 'Row ', h('code', { text: e.entity }), ' (id in ', h('code', { text: 'data.' + e.id_field }), '): send its current version in ', h('code', { text: 'data.' + e.version_field }), '.');
          }))] : null),
        h('h2', { text: 'Request' }),
        h('div', { class: 'server' }, h('label', { for: 'base-in', text: 'Your server:' }), baseInput),
        curlBox,
        h('p', { class: 'muted' }, 'Set ', h('code', { text: 'WMS_API_KEY' }), ' and ', h('code', { text: 'WAREHOUSE_ID' }), ' first (see ', h('a', { href: DOCS + 'api/authentication', text: 'Authentication' }), '). Values such as ', h('code', { text: '<sku_code>' }), ' are placeholders. Replace them.'),
        rec.notes.length ? h('div', null, h('h3', { text: 'Notes' }), h('ul', null, rec.notes.map(function (n) { return h('li', null, inline(n)); }))) : null,
        h('h2', { text: 'Parameters' }),
        h('p', { class: 'muted' }, 'These are the keys of ', h('code', { text: 'params' }), '.'),
        rec.params.length ? rec.params.map(function (p) {
          return h('div', null, h('h3', null, h('code', { text: p.name }), ' ', h('span', { class: p.required ? 'req' : 'ptype', text: p.required ? 'required' : 'optional' })),
            p.summary ? h('p', { class: 'pdesc' }, inline(p.summary)) : null, renderTop(p.schema));
        }) : h('p', { class: 'none', text: 'This method takes no parameters.' }),
        h('h2', { text: 'Response' }),
        h('p', { class: 'muted' }, wrapperText(rec.wrapper)),
        codeBox([{ label: 'Example result', text: pretty({ jsonrpc: '2.0', id: 1, result: rec.resultExample }) }]),
        h('h3', { text: 'Fields of the value' }),
        renderTop(rec.result.schema),
        h('h2', { text: 'Errors' }),
        errorNotice(),
        rec.errors.length ? h('table', { class: 'errs' }, h('thead', null, h('tr', null, h('th', { text: 'HTTP' }), h('th', { text: 'Error' }), h('th', { text: 'When' }))),
          h('tbody', null, rec.errors.map(function (e) { return h('tr', null, h('td', { text: e.http }), h('td', { text: e.error }), h('td', null, inline(e.when))); }))) : null,
        h('p', { class: 'muted' }, 'A handler can return more than the table lists. The full list of names is in ', h('a', { href: DOCS + 'api/errors', text: 'Errors' }), '.')
      ];
      setPage(name, page);
      markActive();
    }).catch(function (err) {
      setPage('Error', [h('h1', { text: 'Could not load the method' }), h('p', { text: String(err.message || err) }), h('p', null, h('a', { href: '', text: 'Reload' }))]);
    });
  }
  function wrapperText(w) {
    if (w === 'command') return 'The result is an object with meta.idempotency_replayed (true when the answer is a stored copy of an earlier call with the same key) and data. The fields below describe data.';
    if (w === 'plain') return 'The result is returned as is. It is not wrapped in a data object.';
    return 'The result is an object with one member, data. The fields below describe data.';
  }

  /* ---------- router ---------- */
  function route() {
    var hash = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    if (!hash) return overview();
    if (hash.indexOf('ctx-') === 0) return contextPage(hash.slice(4));
    methodPage(hash);
  }
  window.addEventListener('hashchange', route);

  getJson('data/index.json').then(function (idx) {
    state.index = idx;
    idx.contexts.forEach(function (c) { state.ctxById[c.id] = c; });
    idx.methods.forEach(function (m) { state.byName[m.n] = m; });
    qEl.placeholder = 'Search ' + idx.total + ' methods';
    buildNav();
    route();
  }).catch(function (e) {
    $('#main').textContent = 'Could not load the API catalog: ' + e.message;
  });
})();
