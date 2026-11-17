import { defineConfig, loadEnv } from 'vite';
import { staticSite } from './scripts/static-site.ts';
import { readSiteSettings } from './src/seo/metadata.tsx';

export default defineConfig(({ mode }) => ({
  appType: 'mpa',
  plugins: [staticSite(readSiteSettings({ ...loadEnv(mode, process.cwd(), ''), ...process.env }))],
  build: { rollupOptions: { input: ['index.html', '404.html'] } },
}));
