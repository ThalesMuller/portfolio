import type { Profile } from './schema.ts';
import { defaultLocale, type Locale } from '../i18n/locale.ts';
import { messages } from '../i18n/messages.ts';

export const labels = messages[defaultLocale];
export const resumeFiles: Record<Locale, string> = {
  'pt-BR': 'thales-muller-curriculo.pdf',
  en: 'thales-muller-resume.pdf',
};
export const resumeUrls: Record<Locale, string> = {
  'pt-BR': `/${resumeFiles['pt-BR']}`,
  en: `/${resumeFiles.en}`,
};
export const resumeFile = resumeFiles[defaultLocale];
export const resumeUrl = resumeUrls[defaultLocale];

export function formatDate(date: string, locale: Locale = defaultLocale): string {
  if (date.length === 4) return date;
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${date}-01T00:00:00Z`),
  );
}

export function formatPeriod(
  { start, end, current }: { start: string; end?: string; current?: boolean },
  locale: Locale = defaultLocale,
): string {
  const copy = messages[locale];
  if (current) return `${copy.since} ${formatDate(start, locale)}`;
  return end
    ? `${formatDate(start, locale)} ${copy.dateConnector} ${formatDate(end, locale)}`
    : `${copy.started} ${formatDate(start, locale)}`;
}

type ExperienceGroup = {
  id: string;
  organization?: string;
  description?: string;
  technologies?: string[];
  roles: { title: string; date: string; description?: string }[];
};

export function selectExperience(profile: Profile, locale: Locale = defaultLocale): ExperienceGroup[] {
  const { currentPosition, experience } = profile;
  const history = experience.map(({ roles, ...group }) => ({
    ...group,
    roles: roles.map(({ period, ...role }) => ({ ...role, date: formatPeriod(period, locale) })),
  }));

  const { title, start, organization, description, technologies } = currentPosition;
  if (!organization && !start && !description && !technologies?.length) return history;

  return [
    {
      id: 'cargo-atual',
      organization,
      technologies,
      roles: [
        {
          title,
          description,
          date: start ? `${messages[locale].since} ${formatDate(start, locale)}` : messages[locale].currentRole,
        },
      ],
    },
    ...history,
  ];
}

export function contactText(href: string): string {
  return href.startsWith('mailto:') ? href.slice('mailto:'.length) : href.replace(/^https:\/\//, '');
}
