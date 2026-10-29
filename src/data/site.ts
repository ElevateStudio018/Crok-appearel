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
    { href: '/videos', label: 'Videos' },
    { href: '/shop', label: 'Shop' },
    { href: '/team', label: 'Team' },
    { href: '/about', label: 'About' },
    { href: '/backstage', label: 'Backstage' },
    { href: '/mailing-list', label: 'Mailing list' },
    { href: '/info', label: 'Info' },
  ],
  sv: [
    { href: '/videos', label: 'Videor' },
    { href: '/shop', label: 'Shop' },
    { href: '/team', label: 'Team' },
    { href: '/about', label: 'Om oss' },
    { href: '/backstage', label: 'Backstage' },
    { href: '/mailing-list', label: 'Nyhetsbrev' },
    { href: '/info', label: 'Info' },
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
      title: 'Explore',
      links: [
        { href: '/videos', label: 'Videos' },
        { href: '/team', label: 'Team' },
        { href: '/backstage', label: 'Backstage' },
        { href: '/mailing-list', label: 'Mailing list' },
      ],
    },
    {
      title: 'Help',
      links: [
        { href: '/info', label: 'Info & FAQ' },
        { href: '/info#sizing', label: 'Size guide' },
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
      title: 'Utforska',
      links: [
        { href: '/videos', label: 'Videor' },
        { href: '/team', label: 'Team' },
        { href: '/backstage', label: 'Backstage' },
        { href: '/mailing-list', label: 'Nyhetsbrev' },
      ],
    },
    {
      title: 'Hjälp',
      links: [
        { href: '/info', label: 'Info & FAQ' },
        { href: '/info#sizing', label: 'Storleksguide' },
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
