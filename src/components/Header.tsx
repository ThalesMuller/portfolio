import type { Profile } from '../content/schema.ts';
import { labels } from '../content/presentation.ts';

export function Header({ displayName }: Pick<Profile, 'displayName'>) {
  const words = displayName.split(' ');
  const monogram = words.length === 1 ? words[0][0] : `${words[0][0]}${words.at(-1)?.[0]}`;

  return (
    <header className="site-header" id="inicio">
      <div className="shell header-inner">
        <a className="brand" href="/">
          <span className="monogram" aria-hidden="true">
            {monogram}
          </span>
          {displayName}
        </a>
        <nav aria-label="Navegação principal">
          <a href="#experiencia">Experiência</a>
          <a href="#competencias">Competências</a>
          <a className="nav-contact" href="#contato">
            {labels.contact}
          </a>
        </nav>
      </div>
    </header>
  );
}
