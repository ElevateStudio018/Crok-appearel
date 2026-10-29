import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

import nightRailJam from '../assets/photos/night-rail-jam.jpg';
import nightRailJump from '../assets/photos/night-rail-jump.jpg';
import nightRailSlide from '../assets/photos/night-rail-slide.jpg';
import nightRailSpray from '../assets/photos/night-rail-spray.jpg';
import nightSnowfall from '../assets/photos/night-snowfall.jpg';
import nightRailFlip from '../assets/photos/night-rail-flip.jpg';
import starlitSlope from '../assets/photos/starlit-slope.jpg';
import powderMountain from '../assets/photos/powder-mountain.jpg';
import citySnowNight from '../assets/photos/city-snow-night.jpg';
import idreSunsetPair from '../assets/photos/idre-sunset-pair.jpg';
import streetRailCrowd from '../assets/photos/street-rail-crowd.jpg';
import parkRailHoodie from '../assets/photos/park-rail-hoodie.jpg';
import parkBoxSlide from '../assets/photos/park-box-slide.jpg';
import powderSunsetNorway from '../assets/photos/powder-sunset-norway.jpg';
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
  // Picked by CORK: 15751546 (colour hero) and, in the image picker,
  // 15751550, 15897059 and 25400943 in black and white.
  hero: {
    src: nightRailJam,
    alt: {
      en: 'Freeskier sliding a rail at a night-time street rail jam under flood lights',
      sv: 'Freeskiåkare som glider på en rail under en rail jam på en stadsgata en kväll i strålkastarljus',
    },
    credit: jdf,
    pexelsId: '15751546',
    mono: false,
  },
  nightJump: {
    src: nightRailJump,
    alt: {
      en: 'Freeskier jumping off a snow ramp at a night-time street rail jam',
      sv: 'Freeskiåkare som hoppar från en snöramp under en rail jam på en stadsgata en kväll',
    },
    credit: jdf,
    pexelsId: '15751535',
    mono: true,
  },
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
  railSpray: {
    src: nightRailSpray,
    alt: {
      en: 'Skier in baggy pants launching off a kicker with snow spraying under the street lights',
      sv: 'Skidåkare i baggy byxor som hoppar från en kicker medan snön yr i gatubelysningen',
    },
    credit: jdf,
    pexelsId: '15751537',
    mono: true,
  },
  snowfall: {
    src: nightSnowfall,
    alt: {
      en: 'Skier on yellow skis hitting a feature at a city street rail jam as snow falls',
      sv: 'Skidåkare med gula skidor på ett hinder under en rail jam på en stadsgata i snöfall',
    },
    credit: jdf,
    pexelsId: '15751549',
    mono: true,
  },
  railFlip: {
    src: nightRailFlip,
    alt: {
      en: 'Skier inverted mid-air above a city street rail jam at dusk',
      sv: 'Skidåkare upp och ner i luften ovanför en rail jam på en stadsgata i skymningen',
    },
    credit: jdf,
    pexelsId: '15751534',
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
  parkRail: {
    src: parkRailHoodie,
    alt: {
      en: 'Skier in a dark hoodie jumping onto a rail in a terrain park',
      sv: 'Skidåkare i mörk hoodie som hoppar upp på en rail i en park',
    },
    credit: 'freenwrld',
    pexelsId: '1635088',
    mono: true,
  },
  parkBox: {
    src: parkBoxSlide,
    alt: {
      en: 'Skier in a yellow jacket sliding a box in a snow park',
      sv: 'Skidåkare i gul jacka som glider på en box i en snowpark',
    },
    credit: 'Jonas Horsch',
    pexelsId: '29951732',
    mono: true,
  },
  idreSunset: {
    src: idreSunsetPair,
    alt: {
      en: 'Two skiers silhouetted mid-air against the sunset at Idre Fjäll',
      sv: 'Två skidåkare i siluett mitt i luften mot solnedgången i Idre Fjäll',
    },
    credit: 'Federico Tomasoni',
    pexelsId: '18267053',
    mono: true,
  },
  starlitSlope: {
    src: starlitSlope,
    alt: {
      en: 'Ski slope at night under a sky full of stars',
      sv: 'Skidbacke en natt under en stjärnklar himmel',
    },
    credit: 'Ahmet Yüksek',
    pexelsId: '30943994',
    mono: true,
  },
  powder: {
    src: powderMountain,
    alt: {
      en: 'Black and white photo of a skier carving fresh powder on a steep mountain face',
      sv: 'Svartvit bild på en skidåkare i orörd puder på en brant bergssida',
    },
    credit: 'Federico Tomasoni',
    pexelsId: '12100585',
    mono: true,
  },
  powderSunset: {
    src: powderSunsetNorway,
    alt: {
      en: 'Skier throwing up powder on a slope at sunset in Trøndelag, Norway',
      sv: 'Skidåkare som sprutar puder i en sluttning i solnedgången i Trøndelag, Norge',
    },
    credit: 'Lars Bugge Aarset',
    pexelsId: '35712874',
    mono: true,
  },
  citySnow: {
    src: citySnowNight,
    alt: {
      en: 'Snow-covered city street at night with a bus and lit office buildings',
      sv: 'Snötäckt stadsgata en kväll med en buss och upplysta kontorshus',
    },
    credit: 'Luca Severin',
    pexelsId: '18643200',
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
