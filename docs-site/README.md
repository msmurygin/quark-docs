# Quark WMS documentation site

A static website made from the customer guides in
`docs-obsidian/user-guide/`, plus an API portal for the 756-method JSON-RPC
API.

- Guides: Docusaurus 3 (classic preset), served at `/docs/`.
- API portal: a small dependency-free static app, served at `/api/`.
- Landing page: `/` (`src/pages/index.tsx`).
- Search: offline, built at build time (`@easyops-cn/docusaurus-search-local`). No service needed.

Nothing here is deployed by anything in this repository. `npm run build`
writes a folder (`build/`) that you can put on any static host.

## The rule: sources stay where they are

The Markdown is **read in place** from `../docs-obsidian/user-guide`
(`docs.path` in `docusaurus.config.ts`). It is never copied. Edit the guides
there, in Obsidian or anywhere else, and rebuild.

The guides are written for Obsidian and GitHub, so a few things are adapted
**at build time** (in `src/build/`) without touching the files:

| In the source | On the site |
|---|---|
| `# 02 Receiving against an ASN` | Heading and sidebar label `Receiving against an ASN` |
| `00-README.md` of each part | The page behind the part title (`/docs/operator/`) |
| `README.md` of the guide | Replaced by a short "Getting started" chooser. Its author notes (screenshot conventions, known quality gaps) are not published. |
| `![alt](../assets/screens/x.png)` + italic caption | `<figure>` with a caption, click to zoom. "Focus:" is made bold. |
| An image whose PNG does not exist yet | A dashed "Screenshot not available yet" box (see `assets/MISSING-SCREENSHOTS.md`) |
| Links to `reference/*.md` | The API portal (`/api/#method_name`) |
| `api/reference/**` (75k lines, generated) | Not rendered. The portal shows the same facts per method. |
| `assets/MISSING-SCREENSHOTS.md` | Reachable by link, hidden from the sidebar |

Files are plain Markdown, **not MDX** (`markdown.format: 'detect'`): braces
and angle brackets in JSON examples are safe. Do not rely on JSX in guide pages.

## Commands

Node 20 or newer (built and tested on 22).

```bash
cd docs-site
npm ci                 # install exactly what package-lock.json says

npm start              # dev server with hot reload, http://localhost:3000
npm run build          # generate the API portal, then build the site into build/
npm run serve          # serve build/ locally (http://localhost:3000), to check the real output
npm run gen:api        # only regenerate the API portal data from openrpc.json
npm run test:api       # tests for the portal generator
npm run typecheck      # TypeScript check of the config and src/
npm run clear          # delete .docusaurus/ and build/ caches
```

`npm run build` and `npm start` run `gen:api` first, so the portal always
matches `openrpc.json`. If you call `npx docusaurus ...` directly on a fresh
checkout, run `npm run gen:api` once before (the landing page imports the
generated `src/generated/api-stats.json`).

The build fails on a broken link, a broken anchor or a duplicate route
(`onBrokenLinks`, `onBrokenAnchors`, `onBrokenMarkdownLinks`, all `throw`).

> **Caching gotcha.** Docusaurus caches compiled Markdown. After changing code
> in `src/build/` or `docusaurus.config.ts`, run `npm run clear` and
> `rm -rf node_modules/.cache`, or the old behaviour may stay.

## Add or change a page

1. Add `NN-name.md` to `docs-obsidian/user-guide/operator/`, `admin/` or `api/`.
   The number gives the order; it is hidden on the site.
2. Start with `# Title` (no number). That heading is the page title and the
   sidebar label.
3. Link to other pages with relative `.md` links (`[Putaway](05-putaway.md)`).
   They work in Obsidian and on the site.
4. `npm start` and check it. The sidebar is generated from the folders.

A new top-level part (a fourth folder) needs one line in `PARTS` in
`src/build/sidebar.ts` (name and order) and a card on the landing page.

## Add screenshots

Screenshots are produced by `scripts/docs-screenshots/` (see the guide's
README); do not edit PNGs by hand.

1. Put the PNG in `docs-obsidian/user-guide/assets/screens/<id>.png`.
2. Reference it from the guide: `![One sentence that says what the screen shows](../assets/screens/<id>.png)`
   followed on the next line by `*Caption. Focus: where to look.*`.
3. A reference to a missing file is shown as a placeholder, and the build prints
   `[guide] <file>: N screenshot(s) not captured yet`. To make that an error
   (for a release check): `DOCS_STRICT_IMAGES=1 npm run build`.

Readers click an image to zoom (`docusaurus-plugin-image-zoom`).

## The API portal

`scripts/build-api-portal.mjs` reads
`docs-obsidian/user-guide/api/openrpc.json` (override with
`OPENRPC_PATH=/path/to/openrpc.json`) and writes, all git-ignored:

| Output | Used for |
|---|---|
| `static/api/data/index.json` | Navigation and search (143 KB) |
| `static/api/data/<context>.json` | One file per context with the full method records, fetched when a method of that context is opened |
| `static/api/openapi.json` | OpenAPI 3.1 conversion: one `POST /api/rpc` operation per method (path key `/api/rpc#<method>`), `operationId` = method name, request example with `meta.idempotency_key` where the category needs it, category, roles, versioned entities and errors in `x-quark-*` fields and descriptions |
| `static/api/openrpc.json` | Copy of the catalog, for download |
| `src/generated/api-stats.json` | Method count for the landing page |

The generator also reads `api/reference/*.md` (generated, not rendered) for the
facts the catalog does not carry: the result wrapper (`data`, `meta`+`data` or
plain), the per-method notes and the error table. If the folder is missing the
portal still builds and falls back to a rule of thumb for the wrapper.

The portal itself is `static/api/index.html`, `portal.css`, `portal.js`: no
framework and no build step. Edit them directly; `npm start` serves them as is.
They never put catalog text into HTML (everything is set as text), so a method
description cannot inject markup.

Features: nav grouped by context and module, search across 756 methods (press
`/`; arrows and Enter), a page per method with deep links (`/api/#receipt_close`,
`/api/#ctx-inbound` for a context), copy-able curl and JSON body (the server
address is editable and remembered), a schema browser, notes, errors, and the
dark/light toggle shared with the guides.

**Errors are not standard JSON-RPC.** A failed call returns
`{"id", "error": {"message", "data": {"req_uuid", "detail"}}}` with no `jsonrpc`
key and no numeric code (`docs-obsidian/user-guide/api/05-errors.md`). The
portal says so on the overview and on every method, and `npm run test:api`
checks that the OpenAPI file says so. Keep that when you change the portal.

When a method is added to the server, the flow is the one in
`docs-obsidian/user-guide/api/00-README.md`: run
`scripts/docs-api/regenerate.sh` (refreshes `openrpc.json` and `reference/`),
then rebuild this site.

## Task cards

The gallery (`/cards/`, `src/pages/cards/`) lists the A5 task cards built in
`docs-obsidian/user-guide/cards/` (see its README). `scripts/copy-cards.mjs`
(`npm run gen:cards`, run by `build` and `start`) copies `cards/dist` into
`static/cards/files/` (git-ignored) and writes `src/generated/cards.json`.
No browser runs here; rebuild and commit `cards/dist` when a card changes.

## Add a language

English is the default. `ru` and `kk` are prepared but off: both are declared in
`i18n.localeConfigs` in `docusaurus.config.ts` and have empty folders
`i18n/ru/` and `i18n/kk/`, but only `en` is in `locales` and the navbar.

1. Turn the locale on: build with `DOCS_LOCALES=en,ru` (or change the default in
   the config) and uncomment `{type: 'localeDropdown', position: 'right'}` in
   `themeConfig.navbar.items`.
2. Create `i18n/ru/docusaurus-plugin-content-docs/current/` and copy only the
   files you translate into it, **with the same relative path as in
   `docs-obsidian/user-guide/`** (for example `operator/05-putaway.md`).
   Files you do not copy fall back to English.
3. Translate the UI strings: `npx docusaurus write-translations --locale ru`
   creates `i18n/ru/code.json` and `i18n/ru/docusaurus-theme-classic/*.json`.
   Translate the `message` values. The landing page text is in
   `src/pages/index.tsx`; wrap new strings in `<Translate>` when you localize it.
4. `npm start -- --locale ru` to preview, `npm run build` builds every locale in
   `DOCS_LOCALES` (each is a full build) into `build/` and `build/ru/`.
5. The API portal (`static/api/`) is English only for now. Its labels are plain
   strings at the top of `portal.js`; translated method text would need the
   generator to read a translated catalog.
6. Search is built per locale. For Russian add `'ru'` to `language` in the search
   plugin options (the plugin supports `en`, `ru` and many others; check
   whether Kazakh is supported before enabling `kk`, otherwise use `'en'` tokenization).

## What to configure before publishing

| What | Where | Why |
|---|---|---|
| Public address | `DOCS_SITE_URL` (or `url` in the config), default `https://docs.example.com` | Canonical URLs, sitemap, social cards |
| Path prefix | `DOCS_BASE_URL`, default `/` | Only if the site is not served at the root (for example `/wms-docs/`). The API portal uses relative links and keeps working. |
| Server address in curl examples | Defaults to `$BASE_URL`; each reader can type their own in the portal | Nothing to do |
| Footer | `themeConfig.footer` | Add a legal name, support contact, privacy link. It is deliberately neutral now. |
| Editing links | `docs.editUrl` is unset | Do not set it for customer docs: the sources live in a private repository |
| Analytics / cookie banner | not included | Add through your host or a Docusaurus plugin if you need it |
| `robots.txt` | not included | Add `static/robots.txt` (`Disallow: /` for a private site) |
| Access control | the host | See below |
| Content status | `README.md` source, landing page "Status: draft" | Update the text in `src/pages/index.tsx` when the guides leave draft |
| Not-confirmed notes | guide sources | The guides contain `Not confirmed by code:` notes written for the team; decide whether customers should see them |

Hosting notes (static hosts, access control, custom domain, versioned docs) are
in the hand-off report; short version: the output is plain files, any static
host works, and the pages are not safe to publish publicly until the points
above are done.

## Layout

```
docs-site/
  docusaurus.config.ts     site config (docs path, plugins, navbar, i18n, link checks)
  sidebars.ts              autogenerated tree; names and order in src/build/sidebar.ts
  package.json, package-lock.json
  src/
    build/                 build-time adapters for the guide sources (see the table above)
    css/custom.css         theme: teal brand ramp from the web UI, typography, figures
    pages/index.tsx        landing page (+ index.module.css)
    generated/             api-stats.json (git-ignored, from gen:api)
  static/
    img/                   logo and favicon
    api/                   the API portal; data/ and *.json are generated and git-ignored
  scripts/
    build-api-portal.mjs   openrpc.json -> portal data + OpenAPI 3.1
    lib/                   rpc-model.mjs, openapi.mjs, reference-notes.mjs
    api-portal.test.mjs
  i18n/ru, i18n/kk         empty, prepared
```

## Licence and third-party code

Docusaurus, React, the search plugin and the zoom plugin are MIT-licensed. The
portal contains no third-party code. The site loads Inter and JetBrains Mono from
Google Fonts to match quark.build, with system-font fallbacks. No analytics or
tracking events have been added.

## Publication

This repository is the authoring source and is connected directly to Vercel. Root Directory is `docs-site`; include source files outside the root for the Markdown guide. `DOCS_SITE_URL=https://docs.quark.build` sets the public canonical origin. Push a verified documentation commit to `main` to deploy it. GitHub Actions and a cross-repository deploy key are not required.

The documentation agent reads current WMS code in `msmurygin/wms-axum` and edits guides here. It checks the relevant implementation, obtains a separate documentation review, runs type checking, nine focused documentation/API tests and a strict Docusaurus build, then checks affected pages in the browser. No WMS runtime changes or WMS certification are part of publication.

`check-publication.mjs` checks for high-confidence credentials and unexpected symlinks. Preview builds emit noindex and disallow crawling; production emits canonical URLs and the sitemap for docs.quark.build. No analytics is enabled. The optional printable card exports may be absent.

### Rollback

Select the previous successful production deployment in Vercel for immediate recovery. Then revert the corresponding commit in this repository and push the revert. A failed build keeps the last successful deployment available.
