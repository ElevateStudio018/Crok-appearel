export interface Rider {
  name: string;
  /** Instagram handle without @ – shown as a link when set. */
  instagram?: string;
}

export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

// CORK team riders, in the order they are shown on /team.
export const riders: Rider[] = [
  { name: 'Isak Mattsson' },
  { name: 'Simon Stenhammar' },
  { name: 'Alvin Vestfjell' },
  { name: 'Malte Hongisto' },
  { name: 'Florian Moer' },
];
