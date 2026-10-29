import type { Lang } from '../i18n';

// Clips licensed from Pexels (https://www.pexels.com/license/), re-encoded to
// 720p H.264 without sound and served from public/videos/. Replace or extend
// this list with CORK's own films – a YouTube id can be added later the same way.

export interface Clip {
  slug: string;
  pexelsId: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  credit: string;
  location?: string;
  /** Seconds. */
  duration: number;
  orientation: 'landscape' | 'portrait';
}

export const clips: Clip[] = [
  {
    slug: 'air-over-the-pines',
    pexelsId: '31940035',
    title: { en: 'Air over the pines', sv: 'Luft över tallarna' },
    description: {
      en: 'A big spring kicker, blue sky and a clean trick above the tree line.',
      sv: 'En stor vårkicker, blå himmel och ett rent trick ovanför trädtopparna.',
    },
    credit: 'Alex Moliski',
    location: 'Brighton, Utah',
    duration: 8,
    orientation: 'landscape',
  },
  {
    slug: 'through-the-pines',
    pexelsId: '36517441',
    title: { en: 'Through the pines', sv: 'Genom tallarna' },
    description: {
      en: 'Point of view through snow-loaded trees, ski tips first.',
      sv: 'Åkarens perspektiv genom snötunga träd, skidspetsarna först.',
    },
    credit: 'Alex Moliski',
    duration: 10,
    orientation: 'portrait',
  },
  {
    slug: 'spring-hop-slow-motion',
    pexelsId: '26268261',
    title: { en: 'Spring hop, slowed down', sv: 'Vårhopp i slowmotion' },
    description: {
      en: 'Shot at 120 frames per second: a pop off a soft spring lip.',
      sv: 'Filmat i 120 bilder per sekund: ett hopp från en mjuk vårkant.',
    },
    credit: 'Alex Moliski',
    location: 'Brighton, Utah',
    duration: 8,
    orientation: 'portrait',
  },
  {
    slug: 'forest-pov',
    pexelsId: '35612649',
    title: { en: 'Forest laps', sv: 'Skogsvarv' },
    description: {
      en: 'Chest-mounted run down a tracked-out forest trail.',
      sv: 'Bröstkamera nerför ett uppkört skogsspår.',
    },
    credit: 'Alex Moliski',
    duration: 10,
    orientation: 'landscape',
  },
  {
    slug: 'groomer-spin',
    pexelsId: '28902827',
    title: { en: 'Groomer spin', sv: 'Spinn på pisten' },
    description: {
      en: 'Speed down a fresh groomer and a spin to finish.',
      sv: 'Fart nerför en nypreparerad pist och en spinn på slutet.',
    },
    credit: 'Alex Moliski',
    location: 'Brighton, Utah',
    duration: 10,
    orientation: 'portrait',
  },
  {
    slug: 'ridge-slash',
    pexelsId: '35752223',
    title: { en: 'Ridge slash', sv: 'Slash på krönet' },
    description: {
      en: 'A slash across wind-packed snow under a deep blue sky.',
      sv: 'En slash över vindpackad snö under en djupblå himmel.',
    },
    credit: 'Rob Bouchat',
    duration: 6,
    orientation: 'landscape',
  },
  {
    slug: 'carving-in-yellow',
    pexelsId: '30598012',
    title: { en: 'Carving in yellow', sv: 'Carving i gult' },
    description: {
      en: 'Long turns on a sunny piste, filmed from below.',
      sv: 'Långa svängar i en solig backe, filmat nerifrån.',
    },
    credit: 'Alex Moliski',
    duration: 15,
    orientation: 'portrait',
  },
];

export const clipUrl = (slug: string) => `/videos/${slug}.mp4`;
export const posterUrl = (slug: string) => `/videos/${slug}.webp`;
export const pexelsVideoUrl = (id: string) => `https://www.pexels.com/video/${id}/`;
export const formatDuration = (s: number) => `0:${String(s).padStart(2, '0')}`;
