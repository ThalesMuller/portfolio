import { profileSchema, type Profile } from './schema.ts';
import type { Locale } from '../i18n/locale.ts';

export type LocalizedText = Record<Locale, string>;
type Role = Profile['experience'][number]['roles'][number];
type RoleContent = Omit<Role, 'title' | 'description'> & {
  title: LocalizedText;
  description?: LocalizedText;
};
type Experience = Profile['experience'][number];
type ExperienceContent = Omit<Experience, 'roles' | 'description'> & {
  roles: RoleContent[];
  description?: LocalizedText;
};
type Skill = Profile['skills'][number];
type SkillContent = Omit<Skill, 'title' | 'description' | 'items'> & {
  title: LocalizedText;
  description?: LocalizedText;
  items: (string | LocalizedText)[];
};
type Education = NonNullable<Profile['education']>[number];
type EducationContent = Omit<Education, 'title' | 'description'> & {
  title: LocalizedText;
  description?: LocalizedText;
};
type Certification = NonNullable<Profile['certifications']>[number];
type CertificationContent = Omit<Certification, 'title'> & { title: LocalizedText };
type Project = NonNullable<Profile['projects']>[number];
type ProjectContent = Omit<Project, 'title' | 'description'> & {
  title: LocalizedText;
  description: LocalizedText;
};
type Contact = Profile['links'][number];
type ContactContent = Omit<Contact, 'label'> & { label: LocalizedText };
type PositionContent = Omit<Profile['currentPosition'], 'title' | 'description'> & {
  title: LocalizedText;
  description?: LocalizedText;
};

export type ProfileContent = Omit<
  Profile,
  'summary' | 'currentPosition' | 'experience' | 'skills' | 'education' | 'certifications' | 'projects' | 'links'
> & {
  summary: LocalizedText;
  currentPosition: PositionContent;
  experience: ExperienceContent[];
  skills: SkillContent[];
  education?: EducationContent[];
  certifications?: CertificationContent[];
  projects?: ProjectContent[];
  links: ContactContent[];
};

export function resolveProfile(content: ProfileContent, locale: Locale): Profile {
  function text(copy?: LocalizedText) {
    if (!copy) return undefined;
    if (typeof copy[locale] !== 'string') throw new Error(`Missing ${locale} translation.`);
    return copy[locale];
  }

  return profileSchema.parse({
    ...content,
    summary: text(content.summary),
    currentPosition: {
      ...content.currentPosition,
      title: text(content.currentPosition.title),
      description: text(content.currentPosition.description),
    },
    experience: content.experience.map((group) => ({
      ...group,
      description: text(group.description),
      roles: group.roles.map((role) => ({
        ...role,
        title: text(role.title),
        description: text(role.description),
      })),
    })),
    skills: content.skills.map((group) => ({
      ...group,
      title: text(group.title),
      description: text(group.description),
      items: group.items.map((item) => (typeof item === 'string' ? item : text(item))),
    })),
    education: content.education?.map((entry) => ({
      ...entry,
      title: text(entry.title),
      description: text(entry.description),
    })),
    certifications: content.certifications?.map((entry) => ({ ...entry, title: text(entry.title) })),
    projects: content.projects?.map((entry) => ({
      ...entry,
      title: text(entry.title),
      description: text(entry.description),
    })),
    links: content.links.map((link) => ({ ...link, label: text(link.label) })),
  });
}
