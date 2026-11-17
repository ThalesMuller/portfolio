import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { profiles } from '../src/content/profile.ts';
import { resumeFiles } from '../src/content/presentation.ts';
import { supportedLocales } from '../src/i18n/locale.ts';
import { createResume } from '../src/resume/create-resume.ts';

await mkdir('dist', { recursive: true });
for (const locale of supportedLocales) {
  const path = join('dist', resumeFiles[locale]);
  await writeFile(path, await createResume(profiles[locale], locale));
  console.log(path);
}
