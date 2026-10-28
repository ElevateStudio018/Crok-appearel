import { site } from '../data/site';
import type { Product } from '../data/products';

// JSON-LD builders (https://schema.org). Rendered by BaseLayout.

const abs = (path: string) => new URL(path, site.url).toString();

export const organizationSchema = () => {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: site.name,
    url: site.url,
    logo: abs('/icon-512.png'),
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
};

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: site.name,
  url: site.url,
  inLanguage: 'en',
  publisher: { '@id': abs('/#organization') },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: site.address.countryCode,
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
};

export const productSchema = (product: Product, imageUrls: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': abs(`/product/${product.id}#product`),
  name: product.name,
  description: [product.summary, ...product.description].join(' '),
  sku: product.id,
  image: imageUrls,
  brand: { '@type': 'Brand', name: site.name },
  color: product.colour,
  material: product.material,
  category: product.category,
  size: 'S, M, L',
  offers: {
    '@type': 'Offer',
    url: abs(`/product/${product.id}`),
    priceCurrency: site.currency,
    price: product.price,
    itemCondition: 'https://schema.org/NewCondition',
    availability: product.soldOut
      ? 'https://schema.org/SoldOut'
      : product.preOrder
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
    seller: { '@id': abs('/#organization') },
    hasMerchantReturnPolicy: returnPolicy,
  },
});

export const itemListSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    url: abs(item.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
