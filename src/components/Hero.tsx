import { ArrowDown, Download } from 'lucide-react';
import { labels, resumeUrl } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';

export function Hero({ name, currentPosition, summary }: Pick<Profile, 'name' | 'currentPosition' | 'summary'>) {
  return (
    <section className="hero" aria-labelledby="nome">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="position">{currentPosition.title}</p>
          <h1 id="nome">{name}</h1>
          <p className="hero-summary">{summary}</p>
          <div className="hero-actions">
            <a className="button-download" href={resumeUrl} download>
              <Download aria-hidden="true" size={18} />
              {labels.download}
            </a>
            <a className="link-trajectory" href="#experiencia">
              Ver trajetória <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-image" />
        </div>
      </div>
    </section>
  );
}
