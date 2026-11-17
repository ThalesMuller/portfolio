import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App, NotFound } from '../src/App.tsx';
import { resolveProfile, type ProfileContent } from '../src/content/localized.ts';
import { formatDate, formatPeriod, resumeUrls, selectExperience } from '../src/content/presentation.ts';
import { profileContent, profiles } from '../src/content/profile.ts';
import { profileSchema } from '../src/content/schema.ts';
import { isLocale, localeFromPath, preferredLocale, supportedLocales } from '../src/i18n/locale.ts';
import { messages } from '../src/i18n/messages.ts';
import { createResume } from '../src/resume/create-resume.ts';
import { buildSitemap, Metadata } from '../src/seo/metadata.tsx';
import { inspectPdf } from './pdf-inspection.ts';

describe('bilingual content', () => {
  it('validates both languages and preserves shared career facts and sources', () => {
    for (const locale of supportedLocales) expect(profileSchema.parse(profiles[locale])).toEqual(profiles[locale]);
    const facts = (profile: typeof profiles.en) => ({
      name: profile.name,
      experience: profile.experience.map(({ id, organization, roles, sources, technologies }) => ({
        id,
        organization,
        sources,
        technologies,
        periods: roles.map(({ period }) => period),
      })),
      education: profile.education?.map(({ id, institution, period, source }) => ({ id, institution, period, source })),
      links: profile.links.map(({ id, href, source, identity }) => ({ id, href, source, identity })),
    });
    expect(facts(profiles.en)).toEqual(facts(profiles['pt-BR']));
    expect(profiles.en.education![0].description).toContain('Completed in December 2024');
    expect(profiles.en.education![0].description).toContain('ceremony in April 2025');
    expect(profiles.en.education![1].description).toContain('paused in 2023');
    expect(profiles.en.skills.find(({ id }) => id === 'ai-engineering')?.description).toContain(
      'Personal use of Codex',
    );
  });

  it('fails on a missing translation and supports optional content in both languages', () => {
    const incomplete = structuredClone(profileContent) as ProfileContent;
    Reflect.deleteProperty(incomplete.experience[0].roles[0].title, 'en');
    expect(() => resolveProfile(incomplete, 'en')).toThrow('Missing en translation');
    const content: ProfileContent = structuredClone(profileContent);
    content.currentPosition.description = { 'pt-BR': 'Contexto do cargo.', en: 'Role context.' };
    content.certifications = [
      {
        id: 'fixture',
        title: { 'pt-BR': 'Certificação de teste', en: 'Test certification' },
        issuer: 'Example',
        issued: '2024-08',
        source: 'owner',
      },
    ];
    content.projects = [
      {
        id: 'fixture',
        title: { 'pt-BR': 'Projeto de teste', en: 'Test project' },
        description: { 'pt-BR': 'Descrição do projeto.', en: 'Project description.' },
        source: 'owner',
      },
    ];
    const english = resolveProfile(content, 'en');
    expect(english.currentPosition.description).toBe('Role context.');
    expect(english.certifications![0].title).toBe('Test certification');
    expect(english.projects![0].description).toBe('Project description.');
    expect(selectExperience(english, 'en')[0].roles[0].date).toBe('Current role');
    english.currentPosition.start = '2026-03';
    expect(selectExperience(english, 'en')[0].roles[0].date).toBe('Since Mar 2026');
  });

  it('renders English sections, dates, accessible switch and the matching PDF link', () => {
    const html = renderToStaticMarkup(<App profile={profiles.en} locale="en" />);
    expect(html).toContain('Since Mar 2026');
    expect(html).toContain('Nov 2024 to Mar 2026');
    expect(html).toContain('Tech Lead · Portals');
    expect(html).toContain(`href="${resumeUrls.en}" download=""`);
    for (const key of ['skip', 'experienceTitle', 'skills', 'education', 'download', 'contact', 'language'] as const) {
      expect(html).toContain(messages.en[key]);
    }
    expect(html).toContain(
      'href="/en/?lang=en" data-language="en" lang="en" hrefLang="en" aria-label="EN · English" aria-current="page"',
    );
    expect(html).not.toContain('Trajetória profissional');
    expect(renderToStaticMarkup(<NotFound displayName={profiles.en.displayName} locale="en" />)).toContain(
      'Page not found',
    );
    expect(formatDate('2024', 'en')).toBe('2024');
    expect(formatPeriod({ start: '2024-01' }, 'en')).toBe('Started in Jan 2024');
  });

  it('generates a selectable A4 English resume with English dates and the same contacts', async () => {
    const pages = await inspectPdf(await createResume(profiles.en, 'en'));
    const text = pages.map(({ text }) => text).join(' ');
    expect(pages).toHaveLength(2);
    for (const page of pages) {
      expect(page.width).toBeCloseTo(595.28, 1);
      expect(page.height).toBeCloseTo(841.89, 1);
      for (const { left, right, bottom, top } of page.bounds) {
        expect(left).toBeGreaterThanOrEqual(47);
        expect(right).toBeLessThanOrEqual(page.width - 47);
        expect(bottom).toBeGreaterThanOrEqual(47);
        expect(top).toBeLessThanOrEqual(page.height - 43);
      }
    }
    for (const expected of [
      profiles.en.summary,
      'Tech Lead · Portals',
      'Since Mar 2026',
      'Nov 2024 to Mar 2026',
      messages.en.education,
      profiles.en.education![0].description!,
    ]) {
      expect(text).toContain(expected);
    }
    expect(text).not.toContain(messages['pt-BR'].experience);
    expect(pages.flatMap(({ links }) => links)).toEqual(profiles.en.links.map(({ href }) => href));
  });

  it('publishes distinct canonical URLs, language alternatives and a shared social image', () => {
    const settings = { origin: 'https://portfolio.example', noindex: false };
    const html = renderToStaticMarkup(<Metadata profile={profiles.en} settings={settings} locale="en" />);
    expect(html).toContain('rel="canonical" href="https://portfolio.example/en/"');
    expect(html).toContain('hrefLang="pt-BR" href="https://portfolio.example/"');
    expect(html).toContain('hrefLang="en" href="https://portfolio.example/en/"');
    expect(html).toContain('hrefLang="x-default" href="https://portfolio.example/"');
    expect(html).toContain('content="en_US"');
    expect(html).toContain('https://portfolio.example/art/social.jpg');
    expect(html).not.toContain('/en/art/');
    expect(buildSitemap(settings)).toContain('<loc>https://portfolio.example/en/</loc>');
  });
});

describe('language selection', () => {
  it('uses the first supported browser preference and Portuguese as fallback', () => {
    expect(preferredLocale(['en-GB', 'pt-BR'])).toBe('en');
    expect(preferredLocale(['pt-PT', 'en-US'])).toBe('pt-BR');
    expect(preferredLocale(['fr-FR', 'en-US'])).toBe('en');
    expect(preferredLocale(['fr-FR', 'de-DE'])).toBe('pt-BR');
    expect(preferredLocale([])).toBe('pt-BR');
  });

  it('prioritizes an explicit saved choice and recognizes English routes', () => {
    expect(preferredLocale(['en-US'], 'pt-BR')).toBe('pt-BR');
    expect(preferredLocale(['pt-BR'], 'en')).toBe('en');
    expect(preferredLocale(['en-US'], 'invalid')).toBe('en');
    expect(localeFromPath('/en')).toBe('en');
    expect(localeFromPath('/en/missing')).toBe('en');
    expect(localeFromPath('/enough')).toBe('pt-BR');
    expect(isLocale('en-US')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});
