// Turns dist/ into preview/: a copy of the site that works from any sub-folder,
// e.g. https://raw.githack.com/<owner>/<repo>/<branch>/preview/index.html
//
// - root-relative URLs ("/shop", "/_astro/x.css") become relative ("shop.html", "../_astro/x.css")
// - page links get their .html file name, since githack has no pretty URLs
// - every page gets noindex so the preview never competes with wearcork.shop
//
// Usage: npm run preview:githack  (builds first, then runs this script)
// Checkout and forms need Netlify and do not work in the preview.

import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const out = join(root, 'preview');

if (!existsSync(dist)) {
  console.error('dist/ is missing – run `npm run build` first.');
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
cpSync(dist, out, { recursive: true });

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

/** "/shop#x" -> "shop.html#x", "/" -> "index.html", "/_astro/a.css" -> "_astro/a.css" */
const toFile = (url) => {
  const [, path, rest = ''] = url.match(/^([^?#]*)(.*)$/);
  let file = path.replace(/^\//, '');
  if (file === '' || file.endsWith('/')) file += 'index.html';
  else if (!/\.[a-z0-9]+$/i.test(file.split('/').pop())) file += '.html';
  return file + rest;
};

const isRootPath = (url) => url.startsWith('/') && !url.startsWith('//');

let pages = 0;
for (const file of walk(out)) {
  if (file.endsWith('.css')) {
    // CSS lives in _astro/, next to the fonts it references.
    const css = readFileSync(file, 'utf8').replace(/url\(\/_astro\//g, 'url(./');
    writeFileSync(file, css);
    continue;
  }
  if (!file.endsWith('.html')) continue;

  const depth = relative(out, dirname(file)).split(sep).filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  const rel = (url) => (isRootPath(url) ? prefix + toFile(url) : url);

  let html = readFileSync(file, 'utf8');
  html = html
    // href, src, action, poster
    .replace(/(\s(?:href|src|action|poster)=")([^"]*)"/g, (_, attr, url) => `${attr}${rel(url)}"`)
    // srcset / imagesrcset
    .replace(/(\s(?:srcset|imagesrcset)=")([^"]*)"/g, (_, attr, set) =>
      `${attr}${set
        .split(',')
        .map((part) => part.trim().replace(/^\S+/, (url) => rel(url)))
        .join(', ')}"`,
    )
    // URLs inside inline JSON (cart data)
    .replace(/("(?:href|image)":")([^"]*)"/g, (_, key, url) => `${key}${rel(url)}"`)
    // inline module imports and CSS urls
    .replace(/(from\s*["']|import\s*\(\s*["'])(\/_astro\/[^"']+)/g, (_, kw, url) => kw + rel(url))
    .replace(/url\((\/_astro\/[^)]+)\)/g, (_, url) => `url(${rel(url)})`)
    // keep the preview out of search engines
    .replace(/<meta name="robots"[^>]*>/g, '')
    .replace('<head>', '<head><meta name="robots" content="noindex, nofollow">');

  writeFileSync(file, html);
  pages++;
}

writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`preview/ ready: ${pages} pages rewritten for sub-folder hosting.`);
