import { Braces, Database, GitBranch, Layers3 } from 'lucide-react';
import { labels } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';

const skillIcons = new Map([
  ['front-end', Braces],
  ['back-end', Database],
  ['engineering', GitBranch],
]);

export function Skills({ skills }: Pick<Profile, 'skills'>) {
  return (
    <section className="expertise section-pad" id="competencias" aria-labelledby="skills-title">
      <div className="shell">
        <h2 className="section-title" id="skills-title">
          {labels.skills}
        </h2>
        <div className="skills-grid">
          {skills.map(({ id, title, description, items }) => {
            const Icon = skillIcons.get(id) ?? Layers3;
            return (
              <article className="skill-group" key={id}>
                <span className="skill-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <h3>{title}</h3>
                {description && <p className="skill-description">{description}</p>}
                <ul className="skill-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
