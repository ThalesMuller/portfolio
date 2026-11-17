import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { contactText, labels } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';

export function Contact({ links }: Pick<Profile, 'links'>) {
  return (
    <section className="contact section-pad" id="contato" aria-labelledby="contact-title">
      <div className="shell section-split">
        <h2 className="section-title" id="contact-title">
          {labels.contact}
        </h2>
        <ul className="contact-links">
          {links.map(({ id, label, href }) => (
            <li key={id}>
              <a href={href}>
                <span className="contact-label">{label}</span>
                <span className="contact-address">{contactText(href).replace(/\/$/, '')}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer({ displayName }: Pick<Profile, 'displayName'>) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>{displayName}</span>
        <a href="#inicio">
          Voltar ao topo <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
