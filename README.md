# Quark WMS documentation

This is the primary documentation repository for https://docs.quark.build.

- `docs-obsidian/user-guide/` contains the authoring Markdown and images.
- `docs-site/` contains the Docusaurus site, styles, search and API renderer.
- Product code remains in the private `msmurygin/wms-axum` repository. Read it to verify instructions; do not copy runtime source, internal findings, credentials or customer data here.

Vercel builds `main` directly with Root Directory `docs-site` and files outside that directory included. Set `DOCS_SITE_URL=https://docs.quark.build`. No cross-repository publisher, SSH deploy key or GitHub Actions job is needed for deployment. A local commit must be pushed before Vercel sees it.

```sh
cd docs-site
npm ci
npm run typecheck
npm run test:docs
npm run build
```

The documentation writer works with both repositories: inspect changes in WMS, update the relevant guides here, have an independent documentation reviewer check the changed instructions, run the documentation checks and publish a small commit. `docs-source.json` records the WMS revision used as source evidence; it is not a statement that every guide has been re-certified at that revision.

Preview builds are noindex; production uses the docs.quark.build canonical origin and sitemap. Roll back to the previous successful Vercel deployment, then revert the corresponding documentation commit. No analytics is enabled.
