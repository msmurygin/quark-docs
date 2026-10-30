#!/usr/bin/env node
// Fail closed if author-only implementation evidence reaches the built site.
// This is the publication equivalent of the repository grep review: it scans
// every reader-visible HTML, search JSON, XML and text artifact after Docusaurus
// has resolved Markdown links and removed author-only source material.
import {readdirSync, readFileSync} from 'node:fs';
import {relative, resolve} from 'node:path';
import {PUBLIC_FORBIDDEN_PATTERNS} from '../src/build/public-guide-sanitize.mjs';

const root = resolve('build');
const patterns = [
  ...PUBLIC_FORBIDDEN_PATTERNS,
  /\b(?:demo1|sup1|op1|welcome1)\b/i,
  /(?:password|pwd)["'`\s:=>]+welcome1\b/i,
];
const failures = [];

function walk(dir) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const file = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    // Docusaurus JavaScript contains its own module ids with authoring paths.
    // Every reader-visible document is also present in HTML/search JSON, which
    // is the publication surface this check protects.
    if (!/\.(?:html|json|xml|txt)$/i.test(entry.name) || entry.name.endsWith('.map')) continue;
    const value = readFileSync(file, 'utf8');
    for (let i = 0; i < patterns.length; i++) {
      patterns[i].lastIndex = 0;
      if (patterns[i].test(value)) failures.push(`${relative(root, file)} (rule ${i + 1})`);
    }
  }
}

walk(root);
if (failures.length) {
  console.error(`Author-only evidence found in public build:\n${[...new Set(failures)].join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Public build boundary: no internal source paths, verification notes, or development credentials found.');
}
