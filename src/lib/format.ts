import type { Lang } from '../i18n';

const sek = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 });

/** 1500 -> "1 500 SEK" (en) / "1 500 kr" (sv) */
export const formatPrice = (amount: number, lang: Lang) =>
  `${sek.format(amount).replace(/ /g, ' ')} ${lang === 'sv' ? 'kr' : 'SEK'}`;
