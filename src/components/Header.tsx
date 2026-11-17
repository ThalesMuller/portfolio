import type { Profile } from '../content/schema.ts';
import { defaultLocale, languageLink, localeNames, supportedLocales, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export function Header({ displayName, locale = defaultLocale }: Pick<Profile, 'displayName'> & { locale?: Locale }) {
  const labels = messages[locale];
  const words = displayName.split(' ');
  const monogram = words.length === 1 ? words[0][0] : `${words[0][0]}${words.at(-1)?.[0]}`;

  return (
    <header className="site-header" id="inicio">
      <div className="shell header-inner">
        <a className="brand" href={languageLink(locale)}>
          <span className="monogram" aria-hidden="true">
            {monogram}
          </span>
          {displayName}
        </a>
        <nav className="primary-nav" aria-label={labels.mainNavigation}>
          <a href="#experiencia">{labels.navExperience}</a>
          <a href="#competencias">{labels.navSkills}</a>
          <a className="nav-contact" href="#contato">
            {labels.contact}
          </a>
        </nav>
        <nav className="language-switch" aria-label={labels.language}>
          {supportedLocales.map((language) => (
            <a
              key={language}
              href={languageLink(language)}
              data-language={language}
              lang={language}
              hrefLang={language}
              aria-label={`${language === 'pt-BR' ? 'PT' : 'EN'} · ${localeNames[language]}`}
              aria-current={locale === language ? 'page' : undefined}
            >
              {language === 'pt-BR' ? 'PT' : 'EN'}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
