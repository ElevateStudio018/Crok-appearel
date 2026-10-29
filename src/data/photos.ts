import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

import nightRailJam from '../assets/photos/night-rail-jam.jpg';
import nightRailSlide from '../assets/photos/night-rail-slide.jpg';
import streetRailCrowd from '../assets/photos/street-rail-crowd.jpg';
import swissTrick from '../assets/photos/swiss-trick.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: Record<Lang, string>;
  credit: string;
  /** Pexels photo id – matches the numbers in the image picker. */
  pexelsId: string;
  /** Shown in black and white (CSS filter on the colour original) when true. */
  mono: boolean;
}

// Editorial photography licensed from Pexels (https://www.pexels.com/license/).
// Files are the colour originals; `mono` switches a photo to black and white.
// Credits are listed on /about#credits.
const jdf = 'Jean-Daniel Francoeur';

export const photos = {
  // The photos CORK picked in the image picker, all shown in black and white:
  // 15751550, 15897059 and 25400943, plus 15751546 from the first round.
  railSlide: {
    src: nightRailSlide,
    alt: {
      en: 'Black and white photo of a skier sliding a rail at night in falling snow',
      sv: 'Svartvit bild på en skidåkare som glider på en rail i snöfall en kväll',
    },
    credit: jdf,
    pexelsId: '15751550',
    mono: true,
  },
  streetRail: {
    src: streetRailCrowd,
    alt: {
      en: 'Skier sliding a rail on a city street in front of a crowd at dusk',
      sv: 'Skidåkare som glider på en rail på en stadsgata framför publik i skymningen',
    },
    credit: 'Frank Cone',
    pexelsId: '15897059',
    mono: true,
  },
  swissTrick: {
    src: swissTrick,
    alt: {
      en: 'Black and white photo of a skier inverted off a kicker above wind-sculpted snow in Switzerland',
      sv: 'Svartvit bild på en skidåkare upp och ner från en kicker ovanför vindformad snö i Schweiz',
    },
    credit: 'Thomas Forsberg',
    pexelsId: '25400943',
    mono: true,
  },
  railJam: {
    src: nightRailJam,
    alt: {
      en: 'Freeskier sliding a rail at a night-time street rail jam under flood lights',
      sv: 'Freeskiåkare som glider på en rail under en rail jam på en stadsgata en kväll i strålkastarljus',
    },
    credit: jdf,
    pexelsId: '15751546',
    mono: true,
  },
} satisfies Record<string, Photo>;

export const pexelsUrl = (id: string) => `https://www.pexels.com/photo/${id}/`;

export const photoCredits = Object.values(photos).reduce<{ credit: string; sources: string[] }[]>((acc, p) => {
  const source = pexelsUrl(p.pexelsId);
  const entry = acc.find((e) => e.credit === p.credit);
  if (entry) {
    if (!entry.sources.includes(source)) entry.sources.push(source);
  } else {
    acc.push({ credit: p.credit, sources: [source] });
  }
  return acc;
}, []);
