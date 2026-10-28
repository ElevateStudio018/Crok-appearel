// Language routing: English lives at the root, Swedish under /sv.
// Page slugs are identical in both languages, so switching language only
// adds or removes the /sv prefix.

export const languages = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_GB' },
  sv: { label: 'SV', name: 'Svenska', htmlLang: 'sv', ogLocale: 'sv_SE' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

export const isLang = (value: unknown): value is Lang => typeof value === 'string' && value in languages;

/** "/sv/shop" -> "sv", "/shop" -> "en" */
export const getLangFromPath = (pathname: string): Lang => (/^\/sv(\/|$|\.html)/.test(pathname) ? 'sv' : defaultLang);

/** "/sv/shop" -> "/shop", "/sv" -> "/" */
export const stripLang = (pathname: string) => pathname.replace(/^\/sv(?=\/|$)/, '') || '/';

/** ("/shop", "sv") -> "/sv/shop", ("/#newsletter", "sv") -> "/sv#newsletter" */
export const localizePath = (path: string, lang: Lang) => {
  if (lang === defaultLang) return path;
  const match = path.match(/^([^#?]*)(.*)$/)!;
  const [, base, rest] = match;
  return base === '/' || base === '' ? `/${lang}${rest}` : `/${lang}${base}${rest}`;
};
