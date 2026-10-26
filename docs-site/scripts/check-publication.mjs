// Fail closed for high-confidence credentials. Report file/line only, never the value.
import {readdirSync,readFileSync} from 'node:fs';
import {resolve,relative} from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const skip=new Set(['node_modules','build','.docusaurus','.git','.cache-loader','_generated']);
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:ghp|gho|ghu|ghs|github_pat)_[A-Za-z0-9_]{30,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bsk_live_[A-Za-z0-9]{20,}\b/,/\beyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\b/];
const errors=[];
function walk(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){if(skip.has(entry.name)||entry.name.startsWith('.env')||/\.(?:pem|key)$/.test(entry.name))continue;const file=resolve(dir,entry.name);if(entry.isSymbolicLink()){errors.push(relative(root,file)+' (symlink is outside the publication boundary)');continue;}if(entry.isDirectory()){walk(file);continue;}if(!/\.(?:md|mdx|html|json|[mc]?js|tsx?|css|svg|ya?ml|txt)$/.test(entry.name))continue;const lines=readFileSync(file,'utf8').split('\n');lines.forEach((line,i)=>{if(patterns.some(p=>p.test(line)))errors.push(`${relative(root,file)}:${i+1}`);});}}
for(const dir of ['docs-site','docs-obsidian/user-guide'])walk(resolve(root,dir));
if(errors.length){console.error('Potential credentials in documentation publication input (values redacted):\n'+errors.join('\n'));process.exitCode=1;}else console.log('Documentation publication boundary: no high-confidence credentials found.');
