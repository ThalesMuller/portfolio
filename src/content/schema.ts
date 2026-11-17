import { z } from 'zod';

const text = z.string().trim().normalize().min(1);
const id = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().regex(/^[12]\d{3}(?:-(?:0[1-9]|1[0-2]))?$/);
const source = z.enum(['owner', 'linkedin', 'user-resume', 'portfolio-2022', 'project-notes-2022', 'github-profile']);

const period = z
  .strictObject({ start: date, end: date.optional() })
  .refine(({ start, end }) => !end || end.padEnd(7, '-12') >= start.padEnd(7, '-01'), {
    message: 'O fim do período deve ser posterior ou igual ao início.',
    path: ['end'],
  });

const role = z.strictObject({
  title: text,
  period,
  description: text.optional(),
});

const experience = z.strictObject({
  id,
  organization: text,
  roles: z.array(role).min(1),
  description: text.optional(),
  technologies: z.array(text).optional(),
  sources: z.array(source).min(1),
});

const education = z.strictObject({
  id,
  title: text,
  institution: text,
  period,
  description: text.optional(),
  source,
});

const certification = z.strictObject({ id, title: text, issuer: text, issued: date, source });

const httpsLink = z.url({ protocol: /^https$/ }).refine((value) => {
  const url = URL.parse(value);
  return value.startsWith('https://') && !!url && !url.username && !url.password;
}, 'Use uma URL HTTPS sem credenciais.');
const link = z.strictObject({
  id,
  label: text,
  href: z.union([httpsLink, z.templateLiteral(['mailto:', z.email()])]),
  source,
  identity: z.boolean().optional(),
});

const skills = z.strictObject({
  id,
  title: text,
  items: z.array(text).min(1),
  sources: z.array(source).min(1),
});

const project = z.strictObject({
  id,
  title: text,
  description: text,
  href: httpsLink.optional(),
  source,
});

export const profileSchema = z
  .strictObject({
    name: text,
    displayName: text,
    summary: text,
    currentPosition: z.strictObject({
      title: text,
      organization: text.optional(),
      start: date.optional(),
      description: text.optional(),
      technologies: z.array(text).optional(),
      source,
    }),
    experience: z.array(experience).min(1),
    skills: z.array(skills).min(1),
    education: z.array(education).optional(),
    certifications: z.array(certification).optional(),
    projects: z.array(project).optional(),
    links: z.array(link).min(1),
  })
  .superRefine((profile, context) => {
    const collections = ['experience', 'skills', 'education', 'certifications', 'projects', 'links'] as const;

    for (const collection of collections) {
      const entries = profile[collection] ?? [];
      const ids = entries.map((entry) => entry.id);
      if (new Set(ids).size !== ids.length) {
        context.addIssue({ code: 'custom', path: [collection], message: 'Identificadores devem ser únicos.' });
      }
    }

    const technologies = new Set(profile.skills.flatMap(({ items }) => items));
    const references = [
      { path: ['currentPosition'], items: profile.currentPosition.technologies },
      ...profile.experience.map(({ technologies: items }, index) => ({
        path: ['experience', index],
        items,
      })),
    ];
    for (const { path, items } of references) {
      for (const item of items ?? []) {
        if (!technologies.has(item)) {
          context.addIssue({
            code: 'custom',
            path: [...path, 'technologies'],
            message: `Tecnologia ausente em skills: ${item}.`,
          });
        }
      }
    }
  });

export type Profile = z.infer<typeof profileSchema>;
