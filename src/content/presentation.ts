import type { Profile } from './schema.ts';

export const locale = 'pt-BR';

export const labels = {
  summary: 'Resumo profissional',
  experience: 'Experiência profissional',
  skills: 'Competências técnicas',
  education: 'Formação acadêmica',
  certifications: 'Certificações',
  projects: 'Projetos',
  contact: 'Contato',
  download: 'Baixar currículo em PDF',
} as const;

export const resumeFile = 'thales-muller-curriculo.pdf';
export const resumeUrl = `/${resumeFile}`;

const monthYear = new Intl.DateTimeFormat(locale, {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: string): string {
  return date.length === 4 ? date : monthYear.format(new Date(`${date}-01T00:00:00Z`));
}

export function formatPeriod({ start, end, current }: { start: string; end?: string; current?: boolean }): string {
  if (current) return `Desde ${formatDate(start)}`;
  return end ? `${formatDate(start)} a ${formatDate(end)}` : `Início em ${formatDate(start)}`;
}

type ExperienceGroup = {
  id: string;
  organization?: string;
  description?: string;
  technologies?: string[];
  roles: { title: string; date: string; description?: string }[];
};

export function selectExperience(profile: Profile): ExperienceGroup[] {
  const { currentPosition, experience } = profile;
  const history = experience.map(({ roles, ...group }) => ({
    ...group,
    roles: roles.map(({ period, ...role }) => ({ ...role, date: formatPeriod(period) })),
  }));

  const { title, start, organization, description, technologies } = currentPosition;
  if (!organization && !start && !description && !technologies?.length) return history;

  return [
    {
      id: 'cargo-atual',
      organization,
      technologies,
      roles: [{ title, description, date: start ? `Desde ${formatDate(start)}` : 'Cargo atual' }],
    },
    ...history,
  ];
}

export function contactText(href: string): string {
  return href.startsWith('mailto:') ? href.slice('mailto:'.length) : href.replace(/^https:\/\//, '');
}
