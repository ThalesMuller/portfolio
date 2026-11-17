import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App, NotFound } from '../src/App.tsx';
import { labels, resumeUrl } from '../src/content/presentation.ts';
import { profile } from '../src/content/profile.ts';
import { buildRobots, buildSitemap, Metadata, readSiteSettings } from '../src/seo/metadata.tsx';

describe('portfolio rendering', () => {
  it('renders the canonical identity, evidence and navigation as HTML', () => {
    const html = renderToStaticMarkup(<App profile={profile} />);
    expect(html).toContain(`<h1 id="nome">${profile.name}</h1>`);
    expect(html).toContain(profile.currentPosition.title);
    expect(html).toContain(profile.summary);
    expect(html).toContain(profile.experience[0].roles[0].description);
    expect(html).toContain('Tech Lead · QEO');
    expect(html).toContain('Tech Lead · Portais');
    expect(html).toContain('Desde mar. de 2026');
    expect(html).toContain('nov. de 2024 a mar. de 2026');
    expect(html).toContain(`href="${resumeUrl}" download=""`);
    for (const { href } of profile.links) expect(html).toContain(`href="${href}"`);
    expect(renderToStaticMarkup(<NotFound displayName={profile.displayName} />)).toContain('href="/"');
  });

  it('handles omitted optional sections and displays new information without changing components', () => {
    const next = structuredClone(profile);
    delete next.education;
    next.currentPosition.description = 'Descrição editorial de teste.';
    next.experience.push({
      id: 'experience-fixture',
      organization: 'Organização de teste',
      roles: [{ title: 'Desenvolvimento', period: { start: '2018-01' } }],
      sources: ['owner'],
    });
    next.skills.push({ id: 'fixture', title: 'Grupo de teste', items: ['Integração de teste'], sources: ['owner'] });
    next.certifications = [
      { id: 'fixture', title: 'Certificação de teste', issuer: 'Emissor de teste', issued: '2020', source: 'owner' },
    ];
    next.projects = [
      {
        id: 'with-link',
        title: 'Página de teste',
        href: 'https://example.org/project',
        description: 'Com link.',
        source: 'owner',
      },
      { id: 'no-link', title: 'Projeto sem link', description: 'Sem link.', source: 'owner' },
    ];
    const html = renderToStaticMarkup(<App profile={next} />);
    expect(html).toContain('Descrição editorial de teste.');
    expect(html).toContain('Organização de teste');
    expect(html).toContain('Integração de teste');
    expect(html).toContain('Certificação de teste');
    expect(html).toContain('href="https://example.org/project"');
    expect(html).toContain('Projeto sem link');
    expect(html).not.toContain(labels.education);
  });
});

describe('site metadata', () => {
  const origin = 'https://portfolio.example';

  it('generates canonical, social, structured data and sitemap only from an HTTPS origin', () => {
    const production = readSiteSettings({ SITE_URL: `${origin}/`, URL: 'https://other.example' });
    const html = renderToStaticMarkup(<Metadata profile={profile} settings={production} />);
    expect(html).toContain(`href="${origin}/"`);
    expect(html).toContain(`${origin}/art/social.jpg`);
    expect(html).toContain(`"jobTitle":"${profile.currentPosition.title}"`);
    expect(buildSitemap(production)).toContain(`<loc>${origin}/</loc>`);
    expect(buildRobots(production)).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });

  it('omits unknown origins and prevents previews from being indexed', () => {
    expect(readSiteSettings({ DEPLOY_PRIME_URL: 'https://preview.example' })).toEqual({ noindex: false });
    const unconfigured = readSiteSettings({});
    const preview = readSiteSettings({ CONTEXT: 'deploy-preview', URL: origin });
    expect(readSiteSettings({ CONTEXT: 'branch-deploy' }).noindex).toBe(true);
    expect(renderToStaticMarkup(<Metadata profile={profile} settings={unconfigured} />)).not.toContain('canonical');
    expect(renderToStaticMarkup(<Metadata profile={profile} settings={preview} />)).toContain('noindex, follow');
    expect(buildSitemap(preview)).toBeUndefined();
    expect(buildSitemap(unconfigured)).toBeUndefined();
    expect(buildRobots(preview)).not.toContain('Sitemap:');
    expect(() => readSiteSettings({ SITE_URL: 'http://example.org' })).toThrow(/HTTPS/);
    expect(() => readSiteSettings({ SITE_URL: 'https://example.org/path' })).toThrow(/HTTPS/);
  });

  it('escapes structured data before inserting it into a script element', () => {
    const candidate = { ...profile, name: 'Teste </script><script>throw 1</script>' };
    const markup = renderToStaticMarkup(<Metadata profile={candidate} settings={readSiteSettings({})} />);
    expect(markup).not.toContain('<script>throw 1');
    expect(markup).toContain('\\u003c/script>');
  });

  it('keeps utility contacts out of professional identity metadata', () => {
    const candidate = structuredClone(profile);
    candidate.links.push({
      id: 'booking',
      label: 'Agendar conversa',
      href: 'https://calendly.com/fixture',
      source: 'owner',
    });
    const markup = renderToStaticMarkup(<Metadata profile={candidate} settings={readSiteSettings({})} />);
    expect(markup).toContain('https://github.com/ThalesMuller');
    expect(markup).not.toContain('calendly.com');
  });
});
