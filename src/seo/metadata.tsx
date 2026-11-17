import type { Profile } from '../content/schema.ts';
import { defaultLocale, localePaths, supportedLocales, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export type SiteSettings = { origin?: string; noindex: boolean };

export function readSiteSettings(env: Record<string, string | undefined>): SiteSettings {
  const noindex = env.CONTEXT === 'deploy-preview' || env.CONTEXT === 'branch-deploy';
  const origin = env.SITE_URL || env.URL;
  if (!origin) return { noindex };

  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL deve ser uma origem HTTPS sem caminho, consulta ou credenciais.');
  }
  return { origin: url.origin, noindex };
}

export function buildRobots({ origin, noindex }: SiteSettings): string {
  const sitemap = origin && !noindex ? `\nSitemap: ${origin}/sitemap.xml\n` : '';
  return `User-agent: *\nAllow: /\n${sitemap}`;
}

export function buildSitemap({ origin, noindex }: SiteSettings): string | undefined {
  if (!origin || noindex) return undefined;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${supportedLocales.map((locale) => `  <url><loc>${origin}${localePaths[locale]}</loc></url>`).join('\n')}
</urlset>
`;
}

export function Metadata({
  profile,
  settings,
  locale = defaultLocale,
}: {
  profile: Profile;
  settings: SiteSettings;
  locale?: Locale;
}) {
  const title = `${profile.displayName} | ${profile.currentPosition.title}`;
  const description = `${profile.displayName}, ${profile.currentPosition.title}. ${profile.summary}`;
  const url = settings.origin && `${settings.origin}${localePaths[locale]}`;
  const openGraphLocales = { 'pt-BR': 'pt_BR', en: 'en_US' };
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.currentPosition.title,
    url,
    sameAs: profile.links.filter(({ identity }) => identity).map(({ href }) => href),
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content={openGraphLocales[locale]} />
      {supportedLocales
        .filter((other) => other !== locale)
        .map((other) => (
          <meta key={other} property="og:locale:alternate" content={openGraphLocales[other]} />
        ))}
      {settings.noindex && <meta name="robots" content="noindex, follow" />}
      {url && (
        <>
          <link rel="canonical" href={url} />
          {supportedLocales.map((language) => (
            <link
              key={language}
              rel="alternate"
              hrefLang={language}
              href={`${settings.origin}${localePaths[language]}`}
            />
          ))}
          <link rel="alternate" hrefLang="x-default" href={`${settings.origin}/`} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={`${settings.origin}/art/social.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={messages[locale].socialImageAlt} />
        </>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replaceAll('<', '\\u003c') }}
      />
    </>
  );
}
