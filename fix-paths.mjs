#!/usr/bin/env node
// Post-build script: Replace relative ./ asset paths with absolute / paths
// This fixes the issue where Vite's base:'/' produces relative paths on Vercel
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distIndex = join(process.cwd(), 'dist', 'index.html');
let html = readFileSync(distIndex, 'utf-8');

// Replace "./assets/" with "/assets/" and "./brand/" with "/brand/" etc.
const fixed = html.replace(/"\.\//g, '"\/');

if (fixed !== html) {
  writeFileSync(distIndex, fixed);
  console.log('✅ Fixed relative asset paths in dist/index.html');
} else {
  console.log('ℹ️  Asset paths already absolute');
}

// Verify
const check = readFileSync(distIndex, 'utf-8');
const scriptMatch = check.match(/src="[^"]*index[^"]*\.js"/);
console.log('Script tag:', scriptMatch?.[0] || 'NOT FOUND');
