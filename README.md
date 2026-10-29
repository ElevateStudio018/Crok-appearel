# CORK – wearcork.shop

Storefront for CORK, independent freeski outerwear from Uppsala, Sweden.
Built with [Astro](https://astro.build) as a static site: every page is pre-rendered HTML, which is fast and easy for search engines to crawl.

## Getting started

```bash
npm install
npm run dev              # http://localhost:4321
npm run build            # production build into dist/
npm run check            # type check
npm run preview:githack  # build + write preview/ for raw.githack.com
```

Requires Node 22.12 or newer.

## Preview on githack

The `preview/` folder is a copy of the built site with relative links, so it can be opened straight from GitHub via githack:

- English: https://raw.githack.com/ElevateStudio018/Crok-appearel/claude/magical-cerf-5pjzkw/preview/index.html
- Swedish: https://raw.githack.com/ElevateStudio018/Crok-appearel/claude/magical-cerf-5pjzkw/preview/sv.html

To update it:

1. `npm run preview:githack` and commit `preview/`
2. `npm run preview:pin` and commit again

githack passes images, videos and fonts on to raw.githubusercontent.com, which rate-limits shared connections such as mobile networks, so photos can go missing. The second pass points those files at jsDelivr, pinned to the commit from step 1. Swap the branch name in the URL for other branches. The preview is `noindex`, and checkout and forms only work on Netlify.

## Languages (EN / SV)

English is served at the root (`/shop`) and Swedish under `/sv` (`/sv/shop`). The EN/SV switch in the header (and in the mobile menu) links to the same page in the other language. Every page has `hreflang` alternates and the sitemap lists both versions.

- UI text: `src/i18n/ui.ts` (`sv` is type-checked against `en`, so a missing translation fails `npm run check`)
- Product copy, FAQ, policies and photo alt texts have an `en` and an `sv` entry in `src/data/`
- Pages live in `src/views/`; `src/pages/` and `src/pages/sv/` only pick the language

## Project structure

```
src/
  data/
    site.ts        Brand info, address, navigation, social links, announcement bar
    catalog.ts     Prices, sizes, pre-order status (also used by the checkout function)
    products.ts    Product copy (EN/SV), specs, size guides, gallery images, SEO titles
    photos.ts      Editorial photos + Pexels credits (`mono: true` shows a photo in black and white)
    videos.ts      Video clips on /videos (files in public/videos/)
    faq.ts         FAQ (shown on the home page and as FAQPage schema)
    policies.ts    Pre-order, shipping, returns, privacy and purchase terms
  i18n/            Language routing helpers and UI strings (EN/SV)
  views/           Page templates shared by both languages
  pages/           One file per URL (/, /shop, /product/[id] …) – Swedish copies under pages/sv/
  components/      Header, Footer, Hero, ProductCard, Newsletter …
  layouts/         BaseLayout – <head>, meta tags, Open Graph, JSON-LD
  lib/schema.ts    Structured data (Organization, Product, Breadcrumb, FAQ …)
  scripts/         Cart (localStorage) and form handling in the browser
  assets/          Product photos, Pexels photos (black and white), logo/mascot as SVG
netlify/functions/checkout.mts   Creates the Stripe Checkout session
public/og/       Share images (1200×630, Swedish in og/sv/) – regenerate with node scripts/generate-og.cjs
scripts/build-preview.mjs        Writes preview/ for githack
preview/         Generated githack preview – do not edit by hand
```

### Common changes

| What | Where |
| --- | --- |
| Price, sold out, pre-order | `src/data/catalog.ts` (then regenerate `public/og/` if the price changes) |
| Product copy, specs, size guide | `src/data/products.ts` |
| Announcement bar, ship-by date, address | `src/data/site.ts` |
| Buttons, headings and other UI text | `src/i18n/ui.ts` |
| Instagram/YouTube/TikTok links | `site.social` in `src/data/site.ts` (empty values are hidden) |
| Menu and footer links | `nav` and `footerNav` in `src/data/site.ts` |
| Swap a photo, or colour ↔ black and white | `src/data/photos.ts` (put the colour original in `src/assets/photos/`) |
| Add or replace a video | `src/data/videos.ts` + an H.264 MP4 and a poster in `public/videos/` |
| New product | Add it to `catalog.ts` + `products.ts` and put its images in `src/assets/products/` |

## Deploying (Netlify)

The site is set up for Netlify (`netlify.toml`): static hosting, forms, the checkout function, redirects and cache headers.

1. Create a new site in Netlify from this repo. Build command and publish folder are read from `netlify.toml`.
2. **Stripe:** under *Site configuration → Environment variables*, add
   - `STRIPE_SECRET_KEY` – your Stripe secret key (`sk_live_…`)
   - `STRIPE_SHIPPING_RATE_ID` (optional) – a Stripe shipping rate (`shr_…`) to charge shipping
   Without a key the cart shows "Checkout is not open yet".
3. **Forms:** enable *Forms* in Netlify. The contact form (`contact`) and the mailing list (`newsletter`) are detected automatically. Set up email notifications under *Forms → Notifications*.
4. **Domain:** point `wearcork.shop` at Netlify.
5. Submit `https://wearcork.shop/sitemap-index.xml` in Google Search Console.

The menu follows the original site: Videos, Shop, Team, About, Backstage, Mailing list and Info (Swedish: Videor, Shop, Team, Om oss, Backstage, Nyhetsbrev, Info). Netlify Forms picks up three forms: `contact`, `newsletter` and `team` (rider/filmer applications on /team).

## SEO

- Unique `<title>`, meta description and canonical URL on every page
- Open Graph and Twitter cards with dedicated share images
- JSON-LD: Organization, WebSite, Product (price, `PreOrder`, return policy), BreadcrumbList, ItemList, FAQPage
- English and Swedish versions with `hreflang` (en, sv, x-default) and localized Open Graph images
- `sitemap-index.xml` + `robots.txt`; cart and checkout are `noindex`
- Images served as AVIF/WebP in responsive sizes, self-hosted font (no Google Fonts calls)

## Images

- **Product photos** are CORK's own photos from the previous site.
- **Editorial photos** are the four CORK picked in the image picker – Pexels 15751550, 15897059, 25400943 and 15751546 – all shown in black and white. They come from [Pexels](https://www.pexels.com/license/) (free to use commercially, no attribution required). The files are the colour originals; `mono` in `photos.ts` decides whether a photo is shown in black and white. All photographers are credited on `/about#credits`.
- **Videos** on `/videos` are Pexels clips (Alex Moliski, Rob Bouchat), re-encoded to 720p without sound (about 1–2 MB each) and credited on every clip.
- The previous site's AI-generated images (fisheye skier, the "cork workshop") have been removed.

When CORK has its own lookbook photos, replace the files in `src/assets/photos/` (or point `photos.ts` at new files) – the layout stays the same.
