export const site = {
  name: 'CORK',
  legalName: 'CORK',
  url: 'https://wearcork.shop',
  tagline: 'Independent by nature.',
  description:
    'CORK is an independent freeski and streetwear label from Uppsala, Sweden. Technical baggy pants and puffer jackets, made in limited runs.',
  locale: 'en_GB',
  currency: 'SEK',
  address: {
    street: 'Almstigen 30',
    city: 'Uppsala',
    country: 'Sweden',
    countryCode: 'SE',
  },
  // Add the real profile URLs here; empty entries are not rendered.
  social: {
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  shipsBy: '24 December',
  announcement: 'CORK 3 pre-order is open — limited to 25 pieces per style. Ships before 24 December.',
} as const;

export const nav = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/policies#shipping', label: 'Shipping & Returns' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerNav = [
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
] as const;
