import type { Lang } from '../i18n';

export const site = {
  name: 'CORK',
  legalName: 'CORK',
  url: 'https://wearcork.shop',
  currency: 'SEK',
  address: {
    street: 'Almstigen 30',
    city: 'Uppsala',
    country: { en: 'Sweden', sv: 'Sverige' },
    countryCode: 'SE',
  },
  // Add the real profile URLs here; empty entries are not rendered.
  social: {
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  description: {
    en: 'CORK is an independent freeski and streetwear label from Uppsala, Sweden. Technical baggy pants and puffer jackets, made in limited runs.',
    sv: 'CORK är ett självständigt freeski- och streetwearmärke från Uppsala. Tekniska baggy byxor och dunjackor, tillverkade i begränsade upplagor.',
  },
  shipsBy: { en: '24 December', sv: '24 december' },
  announcement: {
    en: 'CORK 3 pre-order is open — limited to 25 pieces per style. Ships before 24 December.',
    sv: 'Förbeställningen av CORK 3 är öppen — 25 exemplar per modell. Skickas före 24 december.',
  },
} as const;

type NavItem = { href: string; label: string };

export const nav: Record<Lang, NavItem[]> = {
  en: [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/policies#shipping', label: 'Shipping & Returns' },
    { href: '/contact', label: 'Contact' },
  ],
  sv: [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Om oss' },
    { href: '/policies#shipping', label: 'Frakt & retur' },
    { href: '/contact', label: 'Kontakt' },
  ],
};

export const footerNav: Record<Lang, { title: string; links: NavItem[] }[]> = {
  en: [
    {
      title: 'Shop',
      links: [
        { href: '/shop', label: 'CORK 3 Collection' },
        { href: '/product/cork-3-baggy-pants', label: 'Baggy Pants' },
        { href: '/product/cork-3-puff', label: 'Puff Jacket' },
      ],
    },
    {
      title: 'Help',
      links: [
        { href: '/policies#pre-order', label: 'Pre-orders' },
        { href: '/policies#shipping', label: 'Shipping' },
        { href: '/policies#returns', label: 'Returns' },
        { href: '/contact', label: 'Contact us' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About CORK' },
        { href: '/policies#privacy', label: 'Privacy' },
        { href: '/policies#terms', label: 'Terms of purchase' },
      ],
    },
  ],
  sv: [
    {
      title: 'Shop',
      links: [
        { href: '/shop', label: 'CORK 3-kollektionen' },
        { href: '/product/cork-3-baggy-pants', label: 'Baggy Pants' },
        { href: '/product/cork-3-puff', label: 'Puff Jacket' },
      ],
    },
    {
      title: 'Hjälp',
      links: [
        { href: '/policies#pre-order', label: 'Förbeställningar' },
        { href: '/policies#shipping', label: 'Frakt' },
        { href: '/policies#returns', label: 'Returer' },
        { href: '/contact', label: 'Kontakta oss' },
      ],
    },
    {
      title: 'Företaget',
      links: [
        { href: '/about', label: 'Om CORK' },
        { href: '/policies#privacy', label: 'Integritet' },
        { href: '/policies#terms', label: 'Köpvillkor' },
      ],
    },
  ],
};
