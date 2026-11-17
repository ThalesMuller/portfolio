import { readFile, writeFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Plugin } from 'vite';
import { App, NotFound } from '../src/App.tsx';
import { profiles } from '../src/content/profile.ts';
import { resumeFiles, resumeUrls } from '../src/content/presentation.ts';
import { localeFromPath, supportedLocales } from '../src/i18n/locale.ts';
import { createResume } from '../src/resume/create-resume.ts';
import { buildRobots, buildSitemap, Metadata, type SiteSettings } from '../src/seo/metadata.tsx';

const redirects = new Map([
  ['/home', '/'],
  ['/experiences', '/#experiencia'],
  ['/pages', '/'],
  ['/pages/experiences.html', '/#experiencia'],
]);

function redirect(request: IncomingMessage, response: ServerResponse, next: () => void) {
  const pathname = request.url?.split('?')[0].replace(/\/$/, '');
  const destination = pathname && redirects.get(pathname);
  if (!destination) return next();
  response.writeHead(301, { Location: destination }).end();
}

export function staticSite(settings: SiteSettings): Plugin {
  let output: string;

  return {
    name: 'portfolio-static-site',
    configResolved(config) {
      output = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, { path }) {
        const locale = localeFromPath(path);
        const profile = profiles[locale];
        if (path.endsWith('/404.html')) {
          return html.replace('<!--page-->', () =>
            renderToStaticMarkup(createElement(NotFound, { ...profile, locale })),
          );
        }

        return html
          .replace('<!--metadata-->', () =>
            renderToStaticMarkup(createElement(Metadata, { profile, settings, locale })),
          )
          .replace('<!--page-->', () => renderToStaticMarkup(createElement(App, { profile, locale })));
      },
    },
    configureServer(server) {
      server.middlewares.use(redirect);
      for (const locale of supportedLocales) {
        server.middlewares.use(resumeUrls[locale], (_request, response, next) => {
          createResume(profiles[locale], locale).then((pdf) => {
            response.writeHead(200, { 'Content-Type': 'application/pdf' }).end(pdf);
          }, next);
        });
      }
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
      return () => {
        server.middlewares.use((request, response, next) => {
          if (!request.headers.accept?.includes('text/html')) return next();
          const path = request.url?.split('?')[0] ?? '/';
          if (['/index.html', '/404.html', '/en/index.html', '/en/404.html'].includes(path)) return next();
          const errorPage = localeFromPath(path) === 'en' ? 'en/404.html' : '404.html';
          readFile(resolve(output, errorPage)).then((html) => {
            response
              .writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
              .end(request.method === 'HEAD' ? undefined : html);
          }, next);
        });
      };
    },
    async writeBundle() {
      const sitemap = buildSitemap(settings);
      const rules = Array.from(redirects, ([from, to]) => `${from} ${to} 301`).join('\n');
      await Promise.all([
        ...supportedLocales.map(async (locale) =>
          writeFile(resolve(output, resumeFiles[locale]), await createResume(profiles[locale], locale)),
        ),
        writeFile(resolve(output, '_redirects'), `${rules}\n/en/* /en/404.html 404\n`),
        writeFile(resolve(output, 'robots.txt'), buildRobots(settings)),
        ...(sitemap ? [writeFile(resolve(output, 'sitemap.xml'), sitemap)] : []),
      ]);
    },
  };
}
