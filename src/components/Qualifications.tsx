import { ArrowUpRight } from 'lucide-react';
import { formatDate, formatPeriod } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';
import { defaultLocale, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export function Qualifications({
  education,
  certifications,
  projects,
  locale = defaultLocale,
}: Profile & { locale?: Locale }) {
  const labels = messages[locale];
  return (
    <>
      {!!education?.length && (
        <section className="section-pad qualifications" aria-labelledby="education-title">
          <div className="shell section-split">
            <h2 className="section-title" id="education-title">
              {labels.education}
            </h2>
            <ul className="facts">
              {education.map(({ id, title, institution, period, description }) => (
                <li key={id}>
                  <h3>{title}</h3>
                  <p>{institution}</p>
                  <p className="fact-date">{formatPeriod(period, locale)}</p>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {!!certifications?.length && (
        <section className="section-pad qualifications" aria-labelledby="certifications-title">
          <div className="shell section-split">
            <h2 className="section-title" id="certifications-title">
              {labels.certifications}
            </h2>
            <ul className="facts">
              {certifications.map(({ id, title, issuer, issued }) => (
                <li key={id}>
                  <h3>{title}</h3>
                  <p>{issuer}</p>
                  <p className="fact-date">{formatDate(issued, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {!!projects?.length && (
        <section className="section-pad qualifications" aria-labelledby="projects-title">
          <div className="shell section-split">
            <h2 className="section-title" id="projects-title">
              {labels.projects}
            </h2>
            <ul className="facts">
              {projects.map(({ id, title, description, href }) => (
                <li key={id}>
                  <h3>
                    {href ? (
                      <a href={href}>
                        {title} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      title
                    )}
                  </h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
