# Quark WMS documentation

Public documentation at https://docs.quark.build.

This repository contains the documentation website and its publication inputs. It contains no Quark WMS application source code, customer data or runtime credentials.

## Build

```sh
cd docs-site
npm ci
npm run typecheck
npm run test:docs
npm run build
```

Docusaurus reads Markdown from `docs-obsidian/user-guide` and produces static HTML in `docs-site/build`. Local search is built with the site; it does not send search terms to an external service.

## Source of truth

The authoring source remains in the private WMS repository. An automated publisher copies only `docs-site` and `docs-obsidian/user-guide` after documentation checks succeed. `docs-source.json` records the source revision. Make source edits there so that a later synchronization does not overwrite them here.

## Hosting

Vercel project root: `docs-site`. Enable access to files outside that root so the Markdown is available at build time. Output: `build`. Canonical origin: `https://docs.quark.build`. Production deploys from `main`; previews are non-indexable. No analytics integration is enabled.
