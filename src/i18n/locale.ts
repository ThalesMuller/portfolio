export const supportedLocales = ['pt-BR', 'en'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'pt-BR';
export const localePaths: Record<Locale, string> = { 'pt-BR': '/', en: '/en/' };
export const localeNames: Record<Locale, string> = { 'pt-BR': 'Português', en: 'English' };
export const languageStorageKey = 'portfolio.language';

export function isLocale(value: unknown): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}

export function preferredLocale(languages: readonly string[], saved?: string | null): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0];
    if (base === 'en') return 'en';
    if (base === 'pt') return 'pt-BR';
  }
  return defaultLocale;
}

export function localeFromPath(path: string): Locale {
  return path === '/en' || path.startsWith('/en/') ? 'en' : defaultLocale;
}

export function languageLink(locale: Locale): string {
  return `${localePaths[locale]}?lang=${locale}`;
}
