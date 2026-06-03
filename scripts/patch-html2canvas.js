#!/usr/bin/env node
/**
 * Post-install script: Monkey-patch html2canvas v1.4.1 to support modern CSS
 * color functions (lab, oklch, oklab, color-mix) used by Tailwind CSS 4.
 *
 * html2canvas v1.4.1 only supports hsl/hsla/rgb/rgba color functions.
 * Tailwind CSS 4 uses lab/oklch/oklab/color-mix extensively, causing
 * "Attempting to parse an unsupported color function" errors on export.
 *
 * This patch replaces the throw statement with a safe fallback (gray color).
 * The actual colors are handled by our onclone callback which converts
 * lab->rgb and copies computed styles.
 */

const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'node_modules', 'html2canvas', 'dist', 'html2canvas.esm.js'),
  path.join(__dirname, '..', 'node_modules', 'html2canvas', 'dist', 'html2canvas.js'),
];

const SEARCH = 'throw new Error("Attempting to parse an unsupported color function \\"' + value.name + '\\")';
const REPLACE = [
  '// MONKEY-PATCH: Support modern CSS color functions (lab, oklch, oklab, color-mix).',
  '// Tailwind CSS 4 uses these extensively. html2canvas v1.4.1 does not support them.',
  '// We return gray as a safe fallback. Actual colors are overridden in onclone callback.',
  'return pack(128, 128, 128, 1)',
].join(' ');

let patched = 0;
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('SKIP: ' + path.basename(file) + ' (not found)');
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(SEARCH)) {
    fs.writeFileSync(file, content.replace(SEARCH, REPLACE), 'utf8');
    console.log('PATCHED: ' + path.basename(file));
    patched++;
  } else if (content.includes('MONKEY-PATCH: Support modern CSS color functions')) {
    console.log('ALREADY PATCHED: ' + path.basename(file));
    patched++;
  } else {
    console.log('WARN: Could not find patch target in ' + path.basename(file));
  }
}

if (patched === 0) {
  console.error('FAILED to patch any html2canvas files');
  process.exit(1);
}

console.log('html2canvas patched (' + patched + ' files)');
