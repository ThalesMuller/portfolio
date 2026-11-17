import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from '../src/App.tsx';
import { labels } from '../src/content/presentation.ts';
import { profile } from '../src/content/profile.ts';
import { createResume } from '../src/resume/create-resume.ts';
import { inspectPdf } from './pdf-inspection.ts';

describe('résumé integration', () => {
  it('contains selectable accents, conventional sections and the exact contact URLs in reading order', async () => {
    const pdf = await createResume(profile);
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    const pages = await inspectPdf(pdf);
    const text = pages.map((page) => page.text).join(' ');
    for (const page of pages) {
      expect(page.width).toBeCloseTo(595.28, 1);
      expect(page.height).toBeCloseTo(841.89, 1);
    }
    const order = [
      profile.name,
      profile.currentPosition.title,
      labels.summary,
      labels.experience,
      labels.skills,
      labels.education,
    ];
    const positions = order.map((section) => text.indexOf(section));
    expect(positions.every((index) => index >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
    expect(text).toContain(profile.education![0].title);
    expect(text).toContain(profile.currentPosition.organization);
    expect(text).toContain(profile.currentPosition.description);
    expect(text).toContain(profile.experience[0].roles[0].description);
    expect(pages.flatMap(({ links }) => links)).toEqual(profile.links.map(({ href }) => href));
  });

  it('lays out long edited content on A4 pages and propagates changes to HTML and PDF', async () => {
    const next = structuredClone(profile);
    delete next.education;
    const newDescription = 'Texto de integração revisado.';
    const endMarker = 'Fim da experiência adicional.';
    next.experience[0].roles[0].description = newDescription;
    next.currentPosition.description =
      'Descrição longa para verificar a quebra de página em um currículo. '.repeat(125) + endMarker;
    next.skills[0].items.push('Ferramenta de teste');
    next.skills[0].description = 'Contexto verificável da competência.';
    next.certifications = [
      { id: 'fixture', title: 'Certificação de teste', issuer: 'Emissor', issued: '2024-08', source: 'owner' },
    ];
    next.projects = [
      {
        id: 'fixture',
        title: 'Projeto de teste',
        description: 'Descrição do projeto.',
        href: 'https://example.org/project',
        source: 'owner',
      },
    ];
    const html = renderToStaticMarkup(<App profile={next} />);
    const pages = await inspectPdf(await createResume(next));
    const text = pages.map((page) => page.text).join(' ');
    expect(pages.length).toBeGreaterThan(2);
    expect(pages.length).toBeLessThan(8);
    for (const expected of [
      newDescription,
      endMarker,
      'Ferramenta de teste',
      'Contexto verificável da competência.',
      'Certificação de teste',
      'Projeto de teste',
    ]) {
      expect(text).toContain(expected);
      expect(html).toContain(expected);
    }
    expect(text).not.toContain(labels.education);
    expect(pages.flatMap(({ links }) => links)).toContain('https://example.org/project');
    for (const page of pages) {
      expect(page.width).toBeCloseTo(595.28, 1);
      expect(page.height).toBeCloseTo(841.89, 1);
      expect(page.text.length).toBeGreaterThan(15);
      for (const { left, bottom, right, top } of page.bounds) {
        expect(left).toBeGreaterThanOrEqual(47);
        expect(bottom).toBeGreaterThanOrEqual(47);
        expect(right).toBeLessThanOrEqual(page.width - 47);
        expect(top).toBeLessThanOrEqual(page.height - 43);
      }
    }
  });

  it('preserves organization-wide and role-specific descriptions and Unicode text', async () => {
    const next = structuredClone(profile);
    const group = next.experience.find(({ id }) => id === 'conectt')!;
    const shared = group.description!;
    const specific = 'Descrição específica do cargo. CI → CD e São José.';
    group.roles[0].description = specific;
    const pdf = (await inspectPdf(await createResume(next))).map(({ text }) => text).join(' ');
    expect(pdf).toContain(shared);
    expect(pdf).toContain(specific);
    expect(pdf.indexOf(shared)).toBeLessThan(pdf.indexOf(specific));
    const html = renderToStaticMarkup(<App profile={next} />);
    expect(html).toContain(shared);
    expect(html).toContain(specific);
    expect(html.indexOf(shared)).toBeLessThan(html.indexOf(specific));
  });
});
