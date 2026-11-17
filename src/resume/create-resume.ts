import { readFileSync } from 'node:fs';
import PDFDocument from 'pdfkit';
import { contactText, formatDate, formatPeriod, labels, locale, selectExperience } from '../content/presentation.ts';
import type { Profile } from '../content/schema.ts';

const ink = '#183029';
const green = '#27543f';
const margin = 48;
const gap = 8;
const regular = readFileSync(new URL('./fonts/LiberationSans-Regular.ttf', import.meta.url));
const bold = readFileSync(new URL('./fonts/LiberationSans-Bold.ttf', import.meta.url));

const styles = {
  name: { font: 'Bold', size: 28, color: ink, after: 3 },
  position: { font: 'Bold', size: 13, color: green, after: 8 },
  section: { font: 'Bold', size: 13, color: green, after: 6 },
  heading: { font: 'Bold', size: 11, color: ink, after: 2 },
  date: { font: 'Regular', size: 10, color: '#3c544a', after: 3 },
  body: { font: 'Regular', size: 11, color: ink, after: 2 },
  link: { font: 'Regular', size: 10, color: green, after: 2 },
} as const;

type Line = {
  content: string;
  style: keyof typeof styles;
  href?: string;
};

type Section = { title: string; blocks: Line[][] };

function resumeSections(profile: Profile): Section[] {
  const experience = selectExperience(profile).flatMap((group) => {
    const roles = group.roles.map((role): Line[] => {
      const title = [role.title, group.organization].filter(Boolean).join(' | ');
      const lines: Line[] = [
        { style: 'heading', content: title },
        { style: 'date', content: role.date },
      ];
      if (role.description) lines.push({ style: 'body', content: role.description });
      return lines;
    });
    if (!group.organization || !group.description) return roles;

    return [
      [
        { style: 'heading', content: group.organization },
        { style: 'body', content: group.description },
      ] satisfies Line[],
      ...roles,
    ];
  });

  const sections: Section[] = [
    { title: labels.summary, blocks: [[{ style: 'body', content: profile.summary }]] },
    { title: labels.experience, blocks: experience },
    {
      title: labels.skills,
      blocks: [
        profile.skills.flatMap(({ title, description, items }): Line[] => [
          { style: 'body', content: `${title} · ${items.join(', ')}` },
          ...(description ? [{ style: 'body' as const, content: description }] : []),
        ]),
      ],
    },
  ];

  if (profile.education?.length) {
    sections.push({
      title: labels.education,
      blocks: profile.education.map(({ title, institution, period, description }) => [
        { style: 'heading', content: `${title} | ${institution}` },
        { style: 'date', content: formatPeriod(period) },
        ...(description ? [{ style: 'body' as const, content: description }] : []),
      ]),
    });
  }

  if (profile.certifications?.length) {
    sections.push({
      title: labels.certifications,
      blocks: profile.certifications.map(({ title, issuer, issued }) => [
        { style: 'heading', content: `${title} | ${issuer}` },
        { style: 'date', content: formatDate(issued) },
      ]),
    });
  }

  if (profile.projects?.length) {
    sections.push({
      title: labels.projects,
      blocks: profile.projects.map(({ title, description, href }) => [
        { style: href ? 'link' : 'heading', content: title, href },
        { style: 'body', content: description },
      ]),
    });
  }

  return sections;
}

function writeResume(doc: PDFKit.PDFDocument, profile: Profile) {
  const options = { width: doc.page.width - 2 * margin, lineGap: 2 };

  function setStyle(line: Line) {
    const style = styles[line.style];
    doc.font(style.font).fontSize(style.size).fillColor(style.color);
    return style;
  }

  function measure(line: Line) {
    const { after } = setStyle(line);
    return doc.heightOfString(line.content, options) + after;
  }

  function write(line: Line) {
    const { after } = setStyle(line);
    doc.text(line.content, { ...options, link: line.href ?? null, underline: !!line.href });
    doc.y += after;
  }

  function reserve(points: number) {
    if (doc.y + points > doc.page.height - margin) doc.addPage();
  }

  function leadHeight(block: Line[]) {
    // PDFKit flows paragraphs across pages. Reserve the labels and opening lines together.
    const firstBody = block.findIndex(({ style }) => style === 'body');
    const prefix = firstBody < 0 ? block : block.slice(0, firstBody + 1);
    return prefix.reduce((height, line) => height + Math.min(measure(line), 2.5 * styles[line.style].size), 0);
  }

  write({ content: profile.name, style: 'name' });
  write({ content: profile.currentPosition.title, style: 'position' });
  for (const { label, href } of profile.links) {
    write({ content: `${label} · ${contactText(href)}`, style: 'link', href });
  }
  doc.y += gap;

  for (const { title, blocks } of resumeSections(profile)) {
    const heading: Line = { style: 'section', content: title };
    reserve(measure(heading) + leadHeight(blocks[0]));
    write(heading);
    for (const block of blocks) {
      reserve(leadHeight(block));
      block.forEach(write);
      doc.y += gap;
    }
  }
}

export function createResume(profile: Profile): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin,
      lang: locale,
      info: { Title: `Currículo | ${profile.name}`, Author: profile.name },
    });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.once('end', () => resolve(Buffer.concat(chunks)));
    doc.once('error', reject);
    doc.registerFont('Regular', regular);
    doc.registerFont('Bold', bold);
    writeResume(doc, profile);
    doc.end();
  });
}
