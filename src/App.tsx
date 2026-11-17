import { Contact, Footer } from './components/Contact.tsx';
import { Experience } from './components/Experience.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Qualifications } from './components/Qualifications.tsx';
import { Skills } from './components/Skills.tsx';
import type { Profile } from './content/schema.ts';

export function App({ profile }: { profile: Profile }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header displayName={profile.displayName} />
      <main id="conteudo" tabIndex={-1}>
        <Hero name={profile.name} currentPosition={profile.currentPosition} summary={profile.summary} />
        <Experience profile={profile} />
        <Skills skills={profile.skills} />
        <Qualifications {...profile} />
        <Contact links={profile.links} />
      </main>
      <Footer displayName={profile.displayName} />
    </>
  );
}

export function NotFound({ displayName }: Pick<Profile, 'displayName'>) {
  return (
    <main className="not-found shell">
      <p>{displayName}</p>
      <h1>Página não encontrada</h1>
      <a href="/">Voltar ao portfólio</a>
    </main>
  );
}
