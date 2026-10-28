import type { ImageMetadata } from 'astro';
import { catalog, type CatalogItem } from './catalog';

import pantsFront from '../assets/products/cork-3-pants-front.jpg';
import pantsWaist from '../assets/products/cork-3-pants-waist.jpg';
import pantsPocket from '../assets/products/cork-3-pants-pocket.jpg';
import pantsHem from '../assets/products/cork-3-pants-hem.jpg';
import puffFront from '../assets/products/cork-3-puff-front.jpg';
import puffBack from '../assets/products/cork-3-puff-back.jpg';
import puffLabel from '../assets/products/cork-3-puff-label.jpg';
import puffPocket from '../assets/products/cork-3-puff-pocket.jpg';

export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
  label: string;
}

export interface Product extends CatalogItem {
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  description: string[];
  highlights: string[];
  technicalDetails: { label: string; value: string }[];
  material: string;
  sizeGuide?: { columns: string[]; rows: (string | number)[][]; note: string };
  fitNote: string;
  gallery: GalleryImage[];
}

const content: Record<string, Omit<Product, keyof CatalogItem>> = {
  'cork-3-baggy-pants': {
    shortName: 'Baggy Pants',
    seoTitle: 'CORK 3 Baggy Pants – Waterproof Baggy Ski Pants',
    seoDescription:
      'Waterproof baggy ski pants with 20,000 mm waterproofing, a fleece liner and a drawstring waist. Limited to 25 pieces. Pre-order for 1 500 SEK – ships before 24 December.',
    summary:
      'A baggy, insulated ski pant built for long nights in the park and the walk home after.',
    description: [
      'The CORK 3 Baggy Pants pair a 20,000 mm waterproof, 20,000 g breathable shell with an insulated fleece liner, so you stay dry on the rail and warm on the lift.',
      'The cut is baggy by design. An adjustable drawstring waist sets the fit, insulated phone and side pockets keep your essentials close, and the cargo pocket carries the CORK logo.',
    ],
    highlights: ['20,000 mm waterproofing', '20,000 g breathability', 'Insulated fleece liner', 'Adjustable drawstring waist'],
    technicalDetails: [
      { label: 'Waterproofing', value: '20,000 mm' },
      { label: 'Breathability', value: '20,000 g' },
      { label: 'Lining', value: 'Insulated fleece liner' },
      { label: 'Shell', value: 'Upgraded outer shell' },
      { label: 'Waist', value: 'Adjustable drawstring' },
      { label: 'Pockets', value: 'Insulated phone and side pockets' },
      { label: 'Fit', value: 'Baggy' },
      { label: 'Colour', value: 'Black' },
    ],
    material: 'Waterproof shell with fleece lining',
    fitNote:
      'Baggy fit with an adjustable drawstring waist. Take your usual size. Need exact measurements? Contact us before you order.',
    gallery: [
      { src: pantsFront, label: 'Front', alt: 'CORK 3 Baggy Pants in black, front view' },
      { src: pantsWaist, label: 'Waist', alt: 'Close-up of the elastic drawstring waist on the CORK 3 Baggy Pants' },
      { src: pantsPocket, label: 'Pocket', alt: 'Close-up of the zipped side pocket on the CORK 3 Baggy Pants' },
      { src: pantsHem, label: 'Hem', alt: 'Close-up of the elasticated hem on the CORK 3 Baggy Pants' },
    ],
  },
  'cork-3-puff': {
    shortName: 'Puff Jacket',
    seoTitle: 'CORK 3 Puff Jacket – Baggy Down Puffer Jacket',
    seoDescription:
      'A baggy-fit hooded down puffer with a glossy nylon shell, DWR finish and YKK zippers. Limited to 25 pieces. Pre-order for 3 000 SEK – ships before 24 December.',
    summary: 'A glossy, baggy-fit down puffer with the CORK mascot printed large across the front.',
    description: [
      'The CORK 3 Puff is a hooded down jacket with a high-shine 100% nylon shell, 90/10 down fill and a water-repellent DWR finish.',
      'It is cut baggy to layer over a hoodie, closes with YKK zippers and is made PFC-free. The front carries an oversized print of the CORK mascot.',
    ],
    highlights: ['90/10 down fill', 'DWR finish', 'YKK zippers', 'PFC-free'],
    technicalDetails: [
      { label: 'Shell', value: '100% nylon' },
      { label: 'Insulation', value: '90/10 down' },
      { label: 'Finish', value: 'DWR (durable water repellent)' },
      { label: 'Zippers', value: 'YKK' },
      { label: 'Chemistry', value: 'PFC-free' },
      { label: 'Fit', value: 'Baggy' },
      { label: 'Colour', value: 'Black' },
      { label: 'Made in', value: 'Pakistan' },
    ],
    material: 'Nylon',
    sizeGuide: {
      columns: ['Size', 'Chest (cm)', 'Length (cm)'],
      rows: [
        ['S', 116, 64],
        ['M', 120, 66],
        ['L', 124, 68],
      ],
      note: 'Garment measurements, laid flat. Oversized fit – measurements are indicative.',
    },
    fitNote: 'Baggy, oversized fit designed to layer over a hoodie. Take your usual size.',
    gallery: [
      { src: puffFront, label: 'Front', alt: 'CORK 3 Puff Jacket in glossy black with oversized mascot print, front view' },
      { src: puffBack, label: 'Back', alt: 'CORK 3 Puff Jacket in glossy black, back view' },
      { src: puffLabel, label: 'Label', alt: 'Inside label and hood of the CORK 3 Puff Jacket' },
      { src: puffPocket, label: 'Pocket', alt: 'Zipped hand pocket on the CORK 3 Puff Jacket' },
    ],
  },
};

export const products: Product[] = catalog.map((item) => ({ ...item, ...content[item.id] }));

export const getProduct = (id: string) => products.find((p) => p.id === id);
