import type { ImageMetadata } from 'astro';

import nightRailJump from '../assets/photos/night-rail-jump.jpg';
import nightRailSlide from '../assets/photos/night-rail-slide.jpg';
import nightRailSpray from '../assets/photos/night-rail-spray.jpg';
import nightSnowfall from '../assets/photos/night-snowfall.jpg';
import nightRailFlip from '../assets/photos/night-rail-flip.jpg';
import starlitSlope from '../assets/photos/starlit-slope.jpg';
import powderMountain from '../assets/photos/powder-mountain.jpg';
import citySnowNight from '../assets/photos/city-snow-night.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  credit: string;
  source: string;
}

// Editorial photography licensed from Pexels (https://www.pexels.com/license/),
// converted to black and white for the site. Credits are listed on /about.
const jdf = 'Jean-Daniel Francoeur';

export const photos = {
  hero: {
    src: nightRailJump,
    alt: 'Freeskier jumping off a snow ramp at a night-time street rail jam',
    credit: jdf,
    source: 'https://www.pexels.com/photo/15751535/',
  },
  railSlide: {
    src: nightRailSlide,
    alt: 'Black and white photo of a skier sliding a rail at night in falling snow',
    credit: jdf,
    source: 'https://www.pexels.com/photo/15751550/',
  },
  railSpray: {
    src: nightRailSpray,
    alt: 'Skier in baggy pants launching off a kicker with snow spraying under the street lights',
    credit: jdf,
    source: 'https://www.pexels.com/photo/15751537/',
  },
  snowfall: {
    src: nightSnowfall,
    alt: 'Rider hitting a feature at a city street rail jam at night as snow falls',
    credit: jdf,
    source: 'https://www.pexels.com/photo/15751549/',
  },
  railFlip: {
    src: nightRailFlip,
    alt: 'Skier inverted mid-air above a city street rail jam at dusk',
    credit: jdf,
    source: 'https://www.pexels.com/photo/15751534/',
  },
  starlitSlope: {
    src: starlitSlope,
    alt: 'Ski slope at night under a sky full of stars',
    credit: 'Ahmet Yüksek',
    source: 'https://www.pexels.com/photo/30943994/',
  },
  powder: {
    src: powderMountain,
    alt: 'Black and white photo of a skier carving fresh powder on a steep mountain face',
    credit: 'Federico Tomasoni',
    source: 'https://www.pexels.com/photo/12100585/',
  },
  citySnow: {
    src: citySnowNight,
    alt: 'Snow-covered city street at night with a bus and lit office buildings',
    credit: 'Luca Severin',
    source: 'https://www.pexels.com/photo/18643200/',
  },
} satisfies Record<string, Photo>;

export const photoCredits = Object.values(photos).reduce<{ credit: string; sources: string[] }[]>((acc, p) => {
  const entry = acc.find((e) => e.credit === p.credit);
  if (entry) {
    if (!entry.sources.includes(p.source)) entry.sources.push(p.source);
  } else {
    acc.push({ credit: p.credit, sources: [p.source] });
  }
  return acc;
}, []);
