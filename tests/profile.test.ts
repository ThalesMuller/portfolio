import { describe, expect, it } from 'vitest';
import { contactText, formatDate, formatPeriod, selectExperience } from '../src/content/presentation.ts';
import { profile } from '../src/content/profile.ts';
import { profileSchema } from '../src/content/schema.ts';

describe('canonical profile', () => {
  it('validates the release content and historical dates', () => {
    expect(profileSchema.parse(profile)).toEqual(profile);
    expect(formatDate('2021-06')).toBe('jun. de 2021');
    expect(formatDate('2017')).toBe('2017');
    expect(formatPeriod({ start: '2017', end: '2019' })).toBe('2017 a 2019');
    expect(formatPeriod({ start: '2021-06' })).toBe('Início em jun. de 2021');
  });

  it('requires substantive sections and provenance', () => {
    expect(profileSchema.safeParse({ ...profile, experience: [], skills: [] }).success).toBe(false);
    expect(
      profileSchema.safeParse({ ...profile, currentPosition: { title: profile.currentPosition.title } }).success,
    ).toBe(false);
  });

  it('rejects invalid or reversed dates, and accepts a year paired with a month', () => {
    const candidate = structuredClone(profile);
    const role = candidate.experience[0].roles[0];
    role.period = { start: '2021-13' };
    expect(profileSchema.safeParse(candidate).success).toBe(false);
    role.period = { start: '2021-06', end: '2021-05' };
    expect(profileSchema.safeParse(candidate).success).toBe(false);
    role.period.end = '2021';
    expect(profileSchema.safeParse(candidate).success).toBe(true);
  });

  it('rejects duplicate IDs, unknown technologies and malformed contact URLs', () => {
    const candidate = structuredClone(profile);
    candidate.skills.push(candidate.skills[0]);
    expect(profileSchema.safeParse(candidate).error?.issues).toContainEqual(
      expect.objectContaining({ path: ['skills'] }),
    );
    candidate.experience[0].technologies = ['Não cadastrada'];
    expect(profileSchema.safeParse(candidate).error?.issues).toContainEqual(
      expect.objectContaining({ path: ['experience', 0, 'technologies'] }),
    );
    for (const href of [
      'javascript:alert(1)',
      'mailto:invalido',
      'https://login:secret@example.org',
      'https:example.org',
    ]) {
      expect(profileSchema.safeParse({ ...profile, links: [{ ...profile.links[0], href }] }).success).toBe(false);
    }
  });

  it('does not present a title-only current position as a historical job', () => {
    const titleOnly = { title: profile.currentPosition.title, source: 'owner' as const };
    const minimal = { ...profile, currentPosition: titleOnly };
    expect(selectExperience(minimal).map(({ id }) => id)).toEqual(profile.experience.map(({ id }) => id));
    const current = { ...titleOnly, description: 'Descrição confirmada' };
    const candidate = { ...profile, currentPosition: current };
    expect(selectExperience(candidate)[0].roles[0]).toEqual({
      title: current.title,
      description: current.description,
      date: 'Cargo atual',
    });
    expect(selectExperience({ ...candidate, currentPosition: { ...current, start: '2025-03' } })[0].roles[0].date).toBe(
      'Desde mar. de 2025',
    );
  });

  it('uses readable contact addresses without changing their destinations', () => {
    expect(contactText('mailto:thales.em@gmail.com')).toBe('thales.em@gmail.com');
    expect(contactText('https://github.com/ThalesMuller')).toBe('github.com/ThalesMuller');
    expect(profileSchema.parse({ ...profile, displayName: 'São Jose\u0301' }).displayName).toBe('São José');
  });
});
