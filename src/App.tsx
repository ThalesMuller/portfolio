import { Contact, Footer } from './components/Contact.tsx';
import { Experience } from './components/Experience.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Qualifications } from './components/Qualifications.tsx';
import { Skills } from './components/Skills.tsx';
import type { Profile } from './content/schema.ts';
import { defaultLocale, languageLink, type Locale } from './i18n/locale.ts';
import { messages } from './i18n/messages.ts';

export function App({ profile, locale = defaultLocale }: { profile: Profile; locale?: Locale }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        {messages[locale].skip}
      </a>
      <Header displayName={profile.displayName} locale={locale} />
      <main id="conteudo" tabIndex={-1}>
        <Hero name={profile.name} currentPosition={profile.currentPosition} summary={profile.summary} locale={locale} />
        <Experience profile={profile} locale={locale} />
        <Skills skills={profile.skills} locale={locale} />
        <Qualifications {...profile} locale={locale} />
        <Contact links={profile.links} locale={locale} />
      </main>
      <Footer displayName={profile.displayName} locale={locale} />
    </>
  );
}

export function NotFound({ displayName, locale = defaultLocale }: Pick<Profile, 'displayName'> & { locale?: Locale }) {
  return (
    <main className="not-found shell">
      <p>{displayName}</p>
      <h1>{messages[locale].notFound}</h1>
      <a href={languageLink(locale)}>{messages[locale].backHome}</a>
    </main>
  );
}
