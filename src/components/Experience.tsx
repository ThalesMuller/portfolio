import { selectExperience } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';
import { defaultLocale, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export function Experience({ profile, locale = defaultLocale }: { profile: Profile; locale?: Locale }) {
  const labels = messages[locale];
  return (
    <section className="experience section-pad" id="experiencia" aria-labelledby="experience-title">
      <div className="shell section-split">
        <h2 className="section-title" id="experience-title">
          {labels.experienceTitle}
        </h2>
        <ol className="timeline" aria-label={labels.experience}>
          {selectExperience(profile, locale).map((group) => (
            <li className="timeline-entry" key={group.id}>
              <article>
                {group.organization && <h3 className="organization">{group.organization}</h3>}
                {group.description && <p className="role-description group-description">{group.description}</p>}
                <div className="timeline-roles">
                  {group.roles.map((role) => {
                    const RoleTitle = group.organization ? 'h4' : 'h3';
                    return (
                      <div className="timeline-role" key={`${role.title}-${role.date}`}>
                        <RoleTitle>{role.title}</RoleTitle>
                        <p className="fact-date">{role.date}</p>
                        {role.description && <p className="role-description">{role.description}</p>}
                      </div>
                    );
                  })}
                </div>
                {!!group.technologies?.length && (
                  <ul className="technology-tags" aria-label={labels.technologies}>
                    {group.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
