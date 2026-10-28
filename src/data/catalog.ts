// Plain product data shared by the site and the checkout function.
// Prices are in whole SEK. The checkout function only trusts these values,
// never prices sent from the browser.

export const sizes = ['S', 'M', 'L'] as const;
export type Size = (typeof sizes)[number];

export interface CatalogItem {
  id: string;
  name: string;
  colour: { en: string; sv: string };
  price: number;
  preOrder: boolean;
  soldOut: boolean;
  editionLimit: number;
}

export const catalog: CatalogItem[] = [
  {
    id: 'cork-3-baggy-pants',
    name: 'CORK 3 Baggy Pants',
    colour: { en: 'Black', sv: 'Svart' },
    price: 1500,
    preOrder: true,
    soldOut: false,
    editionLimit: 25,
  },
  {
    id: 'cork-3-puff',
    name: 'CORK 3 Puff Jacket',
    colour: { en: 'Black', sv: 'Svart' },
    price: 3000,
    preOrder: true,
    soldOut: false,
    editionLimit: 25,
  },
];

export const findCatalogItem = (id: string) => catalog.find((item) => item.id === id);
