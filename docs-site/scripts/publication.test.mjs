import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {sanitizePublicGuideTree,sanitizePublicMarkdownSource,sanitizePublicObject,sanitizePublicText} from '../src/build/public-guide-sanitize.mjs';
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
  for(const name of ['guide.md','screen.png','src/build/guide-markdown.ts','.env','private.key','node_modules/dependency.js','reference/_generated/form.md','src/generated/cards.json']){const f=join(src,name);mkdirSync(resolve(f,'..'),{recursive:true});writeFileSync(f,'fixture');}
  execFileSync('rsync',['-a','--exclude-from='+join(site,'publication-excludes.txt'),src+'/',dest+'/']);
  for(const name of ['guide.md','screen.png','src/build/guide-markdown.ts'])assert.ok(existsSync(join(dest,name)),name);
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

test('Mermaid sequence notes do not use statement-separating semicolons',()=>{
 const docs=resolve(site,'../docs-obsidian');
 const files=[];
 const walk=(dir)=>{for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())walk(path);else if(entry.name.endsWith('.md'))files.push(path);}};
 walk(docs);
 for(const file of files){
  const source=readFileSync(file,'utf8');
  for(const block of source.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)){
   if(!block[1].trimStart().startsWith('sequenceDiagram'))continue;
   assert.doesNotMatch(block[1],/^\s*Note\s+(?:over|left of|right of)\s+[^:\n]+:[^\n;]*;/im,`${file} has a Mermaid sequence note containing a semicolon`);
  }
 }
});

test('missing screenshot placeholders keep captions on a separate line',()=>{
 const css=readFileSync(join(site,'src/css/custom.css'),'utf8');
 const rule=/\.shot-missing\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
 assert.match(rule,/display:\s*block/);
 assert.match(rule,/width:\s*100%/);
 assert.match(rule,/box-sizing:\s*border-box/);
});

test('publication sanitizer hides author evidence without damaging customer instructions',()=>{
 const text=(value)=>({type:'text',value});
 const paragraph=(children)=>({type:'paragraph',children});
 const tree={type:'root',children:[
  {type:'heading',depth:1,children:[text('Allocate stock')]},
  paragraph([text('Press '),{type:'inlineCode',value:'Allocate'},text(' to reserve available stock.')]),
  paragraph([text('The order stays open when stock is short ('),{type:'inlineCode',value:'crates/libs/wms-outbound/src/allocation.rs:12-20'},text(').')]),
  paragraph([text('Refresh the page after the command. Source: '),{type:'inlineCode',value:'release_action.rs:55-90'},text('.')]),
  paragraph([text('The default is false. Migration 026 changed old rows. The next save uses the current value.')]),
  {type:'heading',depth:2,children:[text('Where it comes from')]},
  paragraph([{type:'inlineCode',value:'crates/libs/wms-outbound/src/allocation.rs:1'}]),
  {type:'heading',depth:2,children:[text('Recovery')]},
  {type:'blockquote',children:[paragraph([text('Not confirmed by code: try this on a test system.')])]},
  paragraph([text('Refresh and try again.')]),
  {type:'table',children:[
   {type:'tableRow',children:[{type:'tableCell',children:[text('Step')]},{type:'tableCell',children:[text('Code')]}]},
   {type:'tableRow',children:[{type:'tableCell',children:[text('Reserve stock')]},{type:'tableCell',children:[{type:'inlineCode',value:'reserve.rs:20'}]}]},
  ]},
 ]};
 const stats=sanitizePublicGuideTree(tree);
 const rendered=JSON.stringify(tree);
 assert.match(rendered,/Press/);assert.match(rendered,/order stays open/);assert.match(rendered,/Refresh and try again/);assert.match(rendered,/The default is false/);assert.match(rendered,/next save uses/);
 assert.doesNotMatch(rendered,/Where it comes from|Not confirmed|crates\/|Migration 026/);assert.doesNotMatch(rendered,/\.rs/);
 assert.equal(tree.children.at(-1).children[0].children.length,1);
 assert.deepEqual(stats,{sections:1,blocks:1,inlineEvidence:3,tableColumns:1});
});

test('API publication sanitizer removes internal development narrative and preserves standards',()=>{
 const value={description:'Use this method to release an order. (`release.rs:10-20`)\n\nPer ADR-058, this was wired in `.claude/rules/api.md`.',nested:['Customer-visible result.','ruling T12 came from migration 137.','See docs/superpowers/plans/2026-07-27-change.md.','Owner decision 2026-08-24.','dashboard spec 2026-10-09 §6.','#[serde(default)]','An RFC 3339 time in UTC.']};
 const clean=sanitizePublicObject(value);
 assert.equal(clean.description,'Use this method to release an order.');
 assert.equal(clean.nested[0],'Customer-visible result.');
 assert.equal(clean.nested[1],'');
 assert.equal(clean.nested[2],'');
 assert.equal(clean.nested[3],'');
 assert.equal(clean.nested[4],'');
 assert.equal(clean.nested[5],'');
 assert.equal(clean.nested[6],'An RFC 3339 time in UTC.');
 assert.equal(sanitizePublicText('A useful sentence (`task.rs:12`).'),'A useful sentence.');
});

test('publication sanitizer preserves screenshot-only paragraphs',()=>{
 const tree={type:'root',children:[
  {type:'paragraph',children:[{type:'image',url:'../assets/screens/example.png',alt:'Example screen'}]},
 ]};
 sanitizePublicGuideTree(tree);
 assert.equal(tree.children.length,1);
 assert.equal(tree.children[0].children[0].type,'image');
});

test('publication sanitizer removes real-world evidence variants and orphan punctuation',()=>{
 const text=(value)=>({type:'text',value});
 const paragraph=(children)=>({type:'paragraph',children});
 const tree={type:'root',children:[
  paragraph([{type:'inlineCode',value:'wms-app/migrations/059_*.sql:~50'},text('.')]),
  paragraph([text('I searched all crates and no code reads this field.')]),
  paragraph([text('The dev seed changes this row.')]),
  paragraph([text('Keep this instruction ('),{type:'inlineCode',value:'wms-lib-sql/sql/wms-app/migrations/001_baseline.sql:12'},text(').')]),
  paragraph([text('Keep this sentence. Checked by searching the code.')]),
  paragraph([text('Keep before. Migration path '),{type:'inlineCode',value:'wms-app/migrations/059_*.sql:50'},text(' changed it. Keep after.')]),
 ]};
 sanitizePublicGuideTree(tree);
 const rendered=JSON.stringify(tree);
 assert.doesNotMatch(rendered,/wms-app|migrations|I searched|dev seed|checked by searching/i);
 assert.doesNotMatch(rendered,/"value":"[.:]"/);
 assert.match(rendered,/Keep this instruction/);
 assert.match(rendered,/Keep this sentence/);
 assert.match(rendered,/Keep before/);
 assert.match(rendered,/Keep after/);
});

test('publication sanitizer removes developer search commands and server source paths',()=>{
 const source=`# Public title

Keep this customer instruction.

Defaults found in app-server/src/web/rpcs/*.rs.

Search: grep -rn max_candidates crates --include=*.rs

Searched: rg tolerance cartonization/

search over *.rs: only the writers`;
 const clean=sanitizePublicMarkdownSource(source);
 assert.match(clean,/Keep this customer instruction/);
 assert.doesNotMatch(clean,/app-server\/src|grep|\brg\b|search(?:ed|ing)?\s+(?:over|through)|\*\.rs/i);
});

test('early Markdown sanitizer protects descriptions, tables, lists and search text',()=>{
 const source=`# Public title

Useful introduction.

This paragraph explains the author review. Where the code does not prove a statement, it says Not confirmed by code.

Keep this customer sentence. Checked by searching the code.

Keep this default. (wms-app/migrations/059_*.sql:~50)

| Setting | Where it comes from |
|---|---|
| Retry | System setting RETRY_LIMIT |
| Unknown | To verify: inspect a test system |

| Action | Where |
|---|---|
| Save | wms-app/migrations/059_*.sql:50 |

- Keep this customer instruction.
- Not confirmed by code: remove this item.

## Where it comes from

| Step | Code |
|---|---|
| Save | crates/service/save.rs:20 |

## Recovery

Refresh and try again.`;
 const clean=sanitizePublicMarkdownSource(source);
 assert.match(clean,/Useful introduction/);assert.match(clean,/Configuration/);assert.match(clean,/Keep this customer instruction/);assert.match(clean,/Keep this customer sentence/);assert.match(clean,/Keep this default/);assert.match(clean,/## Recovery/);
 assert.doesNotMatch(clean,/Not confirmed|To verify|Where it comes from|crates\/|wms-app\/migrations|Checked by searching|\| Where \|/i);
});
