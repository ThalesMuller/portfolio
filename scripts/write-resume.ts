import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { profile } from '../src/content/profile.ts';
import { resumeFile } from '../src/content/presentation.ts';
import { createResume } from '../src/resume/create-resume.ts';

await mkdir('dist', { recursive: true });
const path = join('dist', resumeFile);
await writeFile(path, await createResume(profile));
console.log(path);
