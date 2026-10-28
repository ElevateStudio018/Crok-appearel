import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
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
}

interface ProductCopy {
  category: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  description: string[];
  technicalDetails: { label: string; value: string }[];
  material: string;
  sizeGuide?: { columns: string[]; rows: (string | number)[][]; note: string };
  fitNote: string;
  alts: string[];
}

export interface Product extends Omit<CatalogItem, 'colour'>, Omit<ProductCopy, 'alts'> {
  colour: string;
  gallery: GalleryImage[];
}

const images: Record<string, ImageMetadata[]> = {
  'cork-3-baggy-pants': [pantsFront, pantsWaist, pantsPocket, pantsHem],
  'cork-3-puff': [puffFront, puffBack, puffLabel, puffPocket],
};

const puffSizes = [
  ['S', 116, 64],
  ['M', 120, 66],
  ['L', 124, 68],
];

const copy: Record<string, Record<Lang, ProductCopy>> = {
  'cork-3-baggy-pants': {
    en: {
      category: 'Ski pants',
      seoTitle: 'CORK 3 Baggy Pants – Waterproof Baggy Ski Pants',
      seoDescription:
        'Waterproof baggy ski pants with 20,000 mm waterproofing, a fleece liner and a drawstring waist. Limited to 25 pieces. Pre-order for 1 500 SEK – ships before 24 December.',
      summary: 'A baggy, insulated ski pant built for long nights in the park and the walk home after.',
      description: [
        'The CORK 3 Baggy Pants pair a 20,000 mm waterproof, 20,000 g breathable shell with an insulated fleece liner, so you stay dry on the rail and warm on the lift.',
        'The cut is baggy by design. An adjustable drawstring waist sets the fit, insulated phone and side pockets keep your essentials close, and the cargo pocket carries the CORK logo.',
      ],
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
      alts: [
        'CORK 3 Baggy Pants in black, front view',
        'Close-up of the elastic drawstring waist on the CORK 3 Baggy Pants',
        'Close-up of the zipped side pocket on the CORK 3 Baggy Pants',
        'Close-up of the elasticated hem on the CORK 3 Baggy Pants',
      ],
    },
    sv: {
      category: 'Skidbyxor',
      seoTitle: 'CORK 3 Baggy Pants – Vattentäta baggy skidbyxor',
      seoDescription:
        'Vattentäta baggy skidbyxor med 20 000 mm vattenpelare, fleecefoder och dragsko i midjan. Begränsat till 25 exemplar. Förbeställ för 1 500 kr – skickas före 24 december.',
      summary: 'Baggy, fodrade skidbyxor för långa kvällar i parken – och promenaden hem efteråt.',
      description: [
        'CORK 3 Baggy Pants kombinerar ett vattentätt skal med 20 000 mm vattenpelare och 20 000 g andningsförmåga med ett isolerande fleecefoder – torr på railen och varm i liften.',
        'Passformen är baggy med flit. En justerbar dragsko i midjan ställer in passformen, isolerade mobil- och sidofickor håller det viktiga nära och cargofickan bär CORK-loggan.',
      ],
      technicalDetails: [
        { label: 'Vattenpelare', value: '20 000 mm' },
        { label: 'Andningsförmåga', value: '20 000 g' },
        { label: 'Foder', value: 'Isolerande fleecefoder' },
        { label: 'Skal', value: 'Uppgraderat ytterskal' },
        { label: 'Midja', value: 'Justerbar dragsko' },
        { label: 'Fickor', value: 'Isolerade mobil- och sidofickor' },
        { label: 'Passform', value: 'Baggy' },
        { label: 'Färg', value: 'Svart' },
      ],
      material: 'Vattentätt skal med fleecefoder',
      fitNote:
        'Baggy passform med justerbar dragsko i midjan. Välj din vanliga storlek. Vill du ha exakta mått? Kontakta oss innan du beställer.',
      alts: [
        'CORK 3 Baggy Pants i svart, framifrån',
        'Närbild på den elastiska midjan med dragsko på CORK 3 Baggy Pants',
        'Närbild på sidofickan med dragkedja på CORK 3 Baggy Pants',
        'Närbild på det elastiska benslutet på CORK 3 Baggy Pants',
      ],
    },
  },
  'cork-3-puff': {
    en: {
      category: 'Puffer jacket',
      seoTitle: 'CORK 3 Puff Jacket – Baggy Down Puffer Jacket',
      seoDescription:
        'A baggy-fit hooded down puffer with a glossy nylon shell, DWR finish and YKK zippers. Limited to 25 pieces. Pre-order for 3 000 SEK – ships before 24 December.',
      summary: 'A glossy, baggy-fit down puffer with the CORK mascot printed large across the front.',
      description: [
        'The CORK 3 Puff is a hooded down jacket with a high-shine 100% nylon shell, 90/10 down fill and a water-repellent DWR finish.',
        'It is cut baggy to layer over a hoodie, closes with YKK zippers and is made PFC-free. The front carries an oversized print of the CORK mascot.',
      ],
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
        rows: puffSizes,
        note: 'Garment measurements, laid flat. Oversized fit – measurements are indicative.',
      },
      fitNote: 'Baggy, oversized fit designed to layer over a hoodie. Take your usual size.',
      alts: [
        'CORK 3 Puff Jacket in glossy black with oversized mascot print, front view',
        'CORK 3 Puff Jacket in glossy black, back view',
        'Inside label and hood of the CORK 3 Puff Jacket',
        'Zipped hand pocket on the CORK 3 Puff Jacket',
      ],
    },
    sv: {
      category: 'Dunjacka',
      seoTitle: 'CORK 3 Puff Jacket – Baggy dunjacka',
      seoDescription:
        'Baggy dunjacka med luva, blankt nylonskal, DWR-behandling och YKK-dragkedjor. Begränsat till 25 exemplar. Förbeställ för 3 000 kr – skickas före 24 december.',
      summary: 'En blank dunjacka med baggy passform och CORK-maskoten i stort tryck över framsidan.',
      description: [
        'CORK 3 Puff är en dunjacka med luva, blankt skal i 100 % nylon, 90/10-dunfyllning och vattenavvisande DWR-behandling.',
        'Den är skuren baggy för att rymma en hoodie under, stängs med YKK-dragkedjor och är PFC-fri. Framsidan pryds av ett stort tryck med CORK-maskoten.',
      ],
      technicalDetails: [
        { label: 'Skal', value: '100 % nylon' },
        { label: 'Isolering', value: '90/10-dun' },
        { label: 'Behandling', value: 'DWR (vattenavvisande)' },
        { label: 'Dragkedjor', value: 'YKK' },
        { label: 'Kemikalier', value: 'PFC-fri' },
        { label: 'Passform', value: 'Baggy' },
        { label: 'Färg', value: 'Svart' },
        { label: 'Tillverkad i', value: 'Pakistan' },
      ],
      material: 'Nylon',
      sizeGuide: {
        columns: ['Storlek', 'Bröstvidd (cm)', 'Längd (cm)'],
        rows: puffSizes,
        note: 'Plaggmått, mätt liggande. Oversized passform – måtten är ungefärliga.',
      },
      fitNote: 'Baggy, oversized passform som rymmer en hoodie under. Välj din vanliga storlek.',
      alts: [
        'CORK 3 Puff Jacket i blankt svart med stort maskottryck, framifrån',
        'CORK 3 Puff Jacket i blankt svart, bakifrån',
        'Innerlapp och luva på CORK 3 Puff Jacket',
        'Handficka med dragkedja på CORK 3 Puff Jacket',
      ],
    },
  },
};

export const getProducts = (lang: Lang): Product[] =>
  catalog.map((item) => {
    const { alts, ...text } = copy[item.id][lang];
    return {
      ...item,
      ...text,
      colour: item.colour[lang],
      gallery: images[item.id].map((src, i) => ({ src, alt: alts[i] })),
    };
  });
