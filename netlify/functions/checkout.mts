// Creates a Stripe Checkout Session for the items in the cart.
// Prices and product names come from the catalog on the server – the browser
// only sends product ids, sizes and quantities.
//
// Environment variables (Netlify → Site configuration → Environment variables):
//   STRIPE_SECRET_KEY        required – your Stripe secret key
//   STRIPE_SHIPPING_RATE_ID  optional – a Stripe shipping rate (shr_…) added to every order

import { findCatalogItem, sizes } from '../../src/data/catalog';
import { site } from '../../src/data/site';

const MAX_QTY = 5;
const MAX_LINES = 10;

const text = {
  en: { prefix: '', size: 'size', preOrder: `Pre-order · ships before ${site.shipsBy.en}` },
  sv: { prefix: '/sv', size: 'storlek', preOrder: `Förbeställning · skickas före ${site.shipsBy.sv}` },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: 'checkout_not_configured' }, 503);

  let items: unknown;
  let lang: keyof typeof text = 'en';
  try {
    const body = await req.json();
    items = body.items;
    if (body.lang === 'sv') lang = 'sv';
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
    return json({ error: 'invalid_cart' }, 400);
  }

  const origin = new URL(req.url).origin;
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  const t = text[lang];
  params.set('success_url', `${origin}${t.prefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}${t.prefix}/cart`);
  params.set('locale', lang);
  params.set('metadata[language]', lang);
  params.set('billing_address_collection', 'auto');
  params.set('shipping_address_collection[allowed_countries][0]', 'SE');
  params.set('phone_number_collection[enabled]', 'true');
  if (process.env.STRIPE_SHIPPING_RATE_ID) {
    params.set('shipping_options[0][shipping_rate]', process.env.STRIPE_SHIPPING_RATE_ID);
  }

  for (const [i, raw] of (items as any[]).entries()) {
    const id = String(raw?.id ?? '');
    const size = String(raw?.size ?? '');
    const qty = Number(raw?.qty);
    const product = findCatalogItem(id);

    if (!product || product.soldOut) return json({ error: 'unknown_product' }, 400);
    if (!(sizes as readonly string[]).includes(size)) return json({ error: 'invalid_size' }, 400);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return json({ error: 'invalid_quantity' }, 400);

    const p = `line_items[${i}]`;
    params.set(`${p}[quantity]`, String(qty));
    params.set(`${p}[price_data][currency]`, 'sek');
    params.set(`${p}[price_data][unit_amount]`, String(product.price * 100));
    params.set(`${p}[price_data][product_data][name]`, `${product.name} – ${product.colour[lang]}, ${t.size} ${size}`);
    params.set(`${p}[price_data][product_data][metadata][product_id]`, product.id);
    params.set(`${p}[price_data][product_data][metadata][size]`, size);
    if (product.preOrder) {
      params.set(`${p}[price_data][product_data][description]`, t.preOrder);
    }
    params.set(`metadata[line_${i}]`, `${product.id}:${size}:${qty}`);
  }

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const session = await res.json();
  if (!res.ok) {
    console.error('Stripe error', session?.error?.message);
    return json({ error: 'stripe_error' }, 502);
  }

  return json({ url: session.url });
};

export const config = {
  path: '/api/checkout',
};
