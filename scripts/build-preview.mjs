// Turns dist/ into preview/: a copy of the site that works from any sub-folder,
// e.g. https://raw.githack.com/<owner>/<repo>/<branch>/preview/index.html
//
// - root-relative URLs ("/shop", "/_astro/x.css") become relative ("shop.html", "../_astro/x.css")
// - page links get their .html file name, since githack has no pretty URLs
// - every page gets noindex so the preview never competes with wearcork.shop
// - CSS, scripts, images, videos and fonts that are already committed load from
//   jsDelivr, pinned to that commit. githack hands binary files on to
//   raw.githubusercontent.com, which rate-limits shared connections (mobile networks),
//   and it can serve a cached page from an older build whose CSS and images are gone.
//   Pinned files never go missing, so even a cached page stays complete.
//
// Usage: npm run preview:githack  (builds first, then runs this script)
// New or changed files are not committed yet on the first run, so they fall back
// to githack. Commit, run `npm run preview:pin` and commit again to pin them too.
// Checkout and forms need Netlify and do not work in the preview.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
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

const cdnRepo = 'ElevateStudio018/Crok-appearel';
const pinnable = /\.(css|js|avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|woff2?)$/i;

// Blob ids of the preview files in HEAD, to tell which output files jsDelivr can serve.
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
let commit = '';
const committed = new Map();
try {
  commit = git('rev-parse', 'HEAD').trim();
  for (const line of git('ls-tree', '-r', commit, '--', 'preview').split('\n')) {
    const m = line.match(/^\d+ blob ([0-9a-f]+)\t(.+)$/);
    if (m) committed.set(m[2], m[1]);
  }
} catch {
  console.warn('No git history found – all files are served by githack.');
}

const blobId = (file) => {
  const data = readFileSync(file);
  return createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
};

const cdnFiles = new Map();
/** "_astro/a.avif" -> jsDelivr URL if HEAD has the exact same file, otherwise null */
const cdnUrl = (file) => {
  const [, path, rest = ''] = file.match(/^([^?#]*)(.*)$/);
  if (!pinnable.test(path)) return null;
  if (!cdnFiles.has(path)) {
    const key = `preview/${path}`;
    const local = join(out, path);
    const same = committed.has(key) && existsSync(local) && committed.get(key) === blobId(local);
    cdnFiles.set(path, same ? `https://cdn.jsdelivr.net/gh/${cdnRepo}@${commit}/${key}` : null);
  }
  const url = cdnFiles.get(path);
  return url && url + rest;
};

const files = walk(out);

// CSS first, so it is in its final form when the pages compare it with HEAD.
// It lives in _astro/ next to its fonts; relative font URLs keep it free of commit
// hashes, so the same CSS can be pinned on the next run.
for (const file of files.filter((f) => f.endsWith('.css'))) {
  writeFileSync(file, readFileSync(file, 'utf8').replace(/url\(\/_astro\//g, 'url(./'));
}

let pages = 0;
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const depth = relative(out, dirname(file)).split(sep).filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  const rel = (url) => {
    if (!isRootPath(url)) return url;
    const file = toFile(url);
    return cdnUrl(file) ?? prefix + file;
  };

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
const urls = [...cdnFiles.values()];
const pinned = urls.filter(Boolean).length;
console.log(`preview/ ready: ${pages} pages rewritten for sub-folder hosting.`);
console.log(`${pinned} of ${urls.length} CSS, script, image, video and font files load from jsDelivr @ ${commit.slice(0, 7) || '–'}.`);
if (pinned < urls.length) {
  console.log('The rest are new or changed: commit preview/, then run `npm run preview:pin` and commit again.');
}
