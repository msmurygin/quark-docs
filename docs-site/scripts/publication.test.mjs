import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
const site=resolve(import.meta.dirname,'..');
for(const mode of ['production','preview'])test(`${mode} output has the right robots and API canonical metadata`,()=>{
 const dir=mkdtempSync(join(tmpdir(),'quark-docs-test-'));try{
  mkdirSync(join(dir,'build/api'),{recursive:true});writeFileSync(join(dir,'build/api/index.html'),'<html><head><title>API</title></head></html>');
  execFileSync(process.execPath,[join(site,'scripts/finalize-build.mjs')],{cwd:dir,env:{...process.env,VERCEL_ENV:mode,DOCS_PUBLIC_BUILD:'',DOCS_SITE_URL:'https://docs.quark.build',VERCEL_GIT_COMMIT_SHA:'PUBLIC-REV',DO_NOT_PUBLISH_SECRET:'PRIVATE-VALUE'}});
  const robots=readFileSync(join(dir,'build/robots.txt'),'utf8'),html=readFileSync(join(dir,'build/api/index.html'),'utf8');
  assert.match(html,/href="https:\/\/docs.quark.build\/api\/"/);assert.match(robots,mode==='production'?/Allow: \/\nSitemap: https:\/\/docs.quark.build\/sitemap.xml/:/Disallow: \//);assert.ok(html.includes(mode==='production'?'index,follow':'noindex,nofollow'));
  assert.doesNotMatch(readFileSync(join(dir,'build/build-info.json'),'utf8'),/PRIVATE-VALUE|DO_NOT_PUBLISH/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('publication sync excludes private and generated files while preserving guide assets',()=>{
 const dir=mkdtempSync(join(tmpdir(),'quark-docs-sync-'));try{
  const src=join(dir,'source'),dest=join(dir,'destination');mkdirSync(src);mkdirSync(dest);
  for(const name of ['guide.md','screen.png','.env','private.key','node_modules/dependency.js','reference/_generated/form.md','src/generated/cards.json']){const f=join(src,name);mkdirSync(resolve(f,'..'),{recursive:true});writeFileSync(f,'fixture');}
  execFileSync('rsync',['-a','--exclude-from='+join(site,'publication-excludes.txt'),src+'/',dest+'/']);
  for(const name of ['guide.md','screen.png'])assert.ok(existsSync(join(dest,name)),name);
  for(const name of ['.env','private.key','node_modules','reference/_generated','src/generated'])assert.ok(!existsSync(join(dest,name)),name);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('current Studio guide is source Markdown with explicit routes, diagrams and corrected UI labels',()=>{
 const guide=resolve(site,'../docs-obsidian/user-guide/studio');
 const overview=readFileSync(join(guide,'00-README.md'),'utf8'),lifecycle=readFileSync(join(guide,'02-module-lifecycle.md'),'utf8'),transfer=readFileSync(join(guide,'10-export-import-and-troubleshooting.md'),'utf8');
 assert.match(overview,/Graph Explorer/);assert.match(overview,/Architecture Catalog/);assert.match(overview,/Runtime API Map/);assert.match(overview,/```mermaid\njourney/);
 assert.match(lifecycle,/```mermaid\nsequenceDiagram/);assert.match(lifecycle,/Apply & Publish/);assert.match(lifecycle,/Apply Module/);assert.doesNotMatch(lifecycle,/dialog suggests a version increment|Apply Draft/);
 assert.match(transfer,/does not provide a connected import button/);assert.match(transfer,/Overview → Export JSON/);
});
