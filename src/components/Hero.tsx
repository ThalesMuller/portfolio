import { ArrowDown, Download } from 'lucide-react';
import { resumeUrls } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';
import { defaultLocale, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export function Hero({
  name,
  currentPosition,
  summary,
  locale = defaultLocale,
}: Pick<Profile, 'name' | 'currentPosition' | 'summary'> & { locale?: Locale }) {
  const labels = messages[locale];
  return (
    <section className="hero" aria-labelledby="nome">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="position">{currentPosition.title}</p>
          <h1 id="nome">{name}</h1>
          <p className="hero-summary">{summary}</p>
          <div className="hero-actions">
            <a className="button-download" href={resumeUrls[locale]} download>
              <Download aria-hidden="true" size={18} />
              {labels.download}
            </a>
            <a className="link-trajectory" href="#experiencia">
              {labels.trajectory} <ArrowDown aria-hidden="true" size={16} />
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
