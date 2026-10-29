// Renders the 1200×630 share images in public/og/.
// Usage: node scripts/generate-og.cjs   (needs Playwright: npx playwright install chromium)
// Update the product list below and re-run after changing product names or prices.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

const R = path.resolve(__dirname, '..');
const font = 'file://' + path.join(R, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const logo = fs.readFileSync(path.join(R, 'src/assets/brand/cork-logo.svg'), 'utf8');
const base = `
@font-face { font-family: A; src: url(${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; font-family: A, sans-serif; overflow: hidden; }
.logo svg { height: 100%; width: auto; display: block; }
.eyebrow { font-size: 18px; font-weight: 600; font-stretch: 110%; letter-spacing: .16em; text-transform: uppercase; }
.title { font-weight: 800; font-stretch: 125%; text-transform: uppercase; line-height: .92; letter-spacing: -.02em; }
`;
// Text per language. English images go to public/og/, Swedish to public/og/sv/.
const copy = {
  en: {
    dir: '',
    collection: 'CORK 3 Collection',
    preorderEyebrow: 'CORK 3 Collection · Pre-order',
    sub: 'Baggy ski pants &amp; puffer jackets from Uppsala, Sweden. 25 pieces per style.',
    tag: 'Pre-order',
    pieces: '25 pieces',
    currency: 'SEK',
  },
  sv: {
    dir: 'sv',
    collection: 'CORK 3-kollektionen',
    preorderEyebrow: 'CORK 3-kollektionen · Förbeställ',
    sub: 'Baggy skidbyxor &amp; dunjackor från Uppsala. 25 exemplar per modell.',
    tag: 'Förbeställ',
    pieces: '25 ex',
    currency: 'kr',
  },
};

const products = [
  ['cork-3-baggy-pants', 'CORK 3 Baggy Pants', '1 500', 'cork-3-pants-front.jpg'],
  ['cork-3-puff', 'CORK 3 Puff Jacket', '3 000', 'cork-3-puff-front.jpg'],
];

const pages = Object.values(copy).flatMap((c) => [
  {
    out: path.join(c.dir, 'cork-default.jpg'),
    html: `<style>${base}
      body { background: #0e0e0e; color: #f4f3ef; display: grid; grid-template-columns: 560px 640px; }
      .copy { padding: 64px; display: flex; flex-direction: column; justify-content: space-between; }
      .logo { height: 44px; color: #f4f3ef; }
      .title { font-size: 48px; margin-top: 18px; }
      .sub { margin-top: 22px; font-size: 22px; color: #c9c9c4; line-height: 1.4; }
      .img { background: url(file://${R}/src/assets/photos/night-rail-jam.jpg) center 40% / cover; }
    </style>
    <div class="copy"><div class="logo">${logo}</div>
      <div><p class="eyebrow">${c.preorderEyebrow}</p><h1 class="title">Independent by nature.</h1>
      <p class="sub">${c.sub}</p></div></div>
    <div class="img"></div>`,
  },
  ...products.map(([id, name, price, img]) => ({
    out: path.join(c.dir, `${id}.jpg`),
    html: `<style>${base}
      body { background: #f5f5f5; color: #0e0e0e; display: grid; grid-template-columns: 600px 600px; }
      .copy { padding: 64px; display: flex; flex-direction: column; justify-content: space-between; background: #fff; }
      .logo { height: 40px; color: #0e0e0e; }
      .title { font-size: 64px; margin-top: 18px; }
      .meta { margin-top: 26px; display: flex; gap: 14px; align-items: center; font-size: 26px; font-weight: 600; }
      .tag { font-size: 15px; letter-spacing: .12em; text-transform: uppercase; background: #0e0e0e; color: #fff; padding: 8px 12px; font-weight: 650; }
      .img { background: url(file://${R}/src/assets/products/${img}) center / 108% no-repeat #f5f5f5; }
    </style>
    <div class="copy"><div class="logo">${logo}</div>
      <div><p class="eyebrow">${c.collection}</p><h1 class="title">${name}</h1>
      <div class="meta"><span>${price} ${c.currency}</span><span class="tag">${c.tag}</span><span class="tag" style="background:#fff;color:#0e0e0e;box-shadow:inset 0 0 0 1.5px #0e0e0e">${c.pieces}</span></div></div></div>
    <div class="img"></div>`,
  })),
]);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const pg of pages) {
    const tmp = path.join(os.tmpdir(), 'cork-og.html');
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"></head><body>${pg.html}</body></html>`);
    await p.goto('file://' + tmp, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    const out = path.join(R, 'public/og', pg.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await p.screenshot({ path: out, type: 'jpeg', quality: 86 });
    console.log('wrote', pg.out);
  }
  await b.close();
})();
