// Index only a production build. API portal is static and needs its own metadata.
import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const out=resolve('build');
const publicBuild=process.env.VERCEL_ENV==='production'||process.env.DOCS_PUBLIC_BUILD==='1';
const origin=process.env.DOCS_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'https://docs.quark.build');
const url=new URL(origin);if(url.protocol!=='https:')throw Error('Documentation canonical origin must use HTTPS.');
writeFileSync(resolve(out,'robots.txt'),publicBuild?`User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
const api=resolve(out,'api/index.html');let html=readFileSync(api,'utf8');
html=html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/g,'').replace(/<meta\b[^>]*name=["']robots["'][^>]*>/g,'');
html=html.replace('</head>',`<link rel="canonical" href="${url.origin}/api/"><meta name="robots" content="${publicBuild?'index,follow':'noindex,nofollow'}"></head>`);
writeFileSync(api,html);
// Public provenance contains only the source revision, never local paths or credentials.
let reviewedSource = null;
try { reviewedSource = JSON.parse(readFileSync(resolve('../docs-source.json'),'utf8')).sourceRevision || null; } catch (error) { if (error.code !== 'ENOENT') throw error; }
writeFileSync(resolve(out,'build-info.json'),JSON.stringify({sourceRevision:process.env.DOCS_SOURCE_SHA||reviewedSource,publicationRevision:process.env.VERCEL_GIT_COMMIT_SHA||null})+'\n');
console.log(`[publication] ${publicBuild?'Indexable production':'Non-indexable preview'}; canonical ${url.origin}`);
