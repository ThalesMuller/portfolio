import { isLocale, languageStorageKey, localeFromPath, localePaths, preferredLocale } from './locale.ts';

function readSavedLanguage(): string | null {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

function rememberLanguage(locale: string) {
  try {
    localStorage.setItem(languageStorageKey, locale);
  } catch {
    // The explicit URL still preserves the choice when browser storage is unavailable.
  }
}

function initializeLanguage() {
  const url = new URL(location.href);
  const requested = url.searchParams.get('lang');
  const explicit = isLocale(requested) ? requested : undefined;
  if (explicit) rememberLanguage(explicit);

  const current = localeFromPath(url.pathname);
  const rootEntry = url.pathname === '/' || url.pathname === '/index.html';
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const desired = explicit ?? (rootEntry ? preferredLocale(languages, readSavedLanguage()) : current);
  if (desired !== current) {
    url.pathname = localePaths[desired];
    location.replace(url.href);
    return;
  }

  function updateLinks() {
    for (const anchor of document.querySelectorAll<HTMLAnchorElement>('[data-language]')) {
      const locale = anchor.dataset.language;
      if (!isLocale(locale)) continue;
      const target = new URL(localePaths[locale], location.origin);
      target.search = location.search;
      target.searchParams.set('lang', locale);
      target.hash = location.hash;
      anchor.href = target.href;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateLinks);
  else updateLinks();
  window.addEventListener('hashchange', updateLinks);
}

initializeLanguage();
