import { readFile, writeFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Plugin } from 'vite';
import { App, NotFound } from '../src/App.tsx';
import { profile } from '../src/content/profile.ts';
import { resumeFile, resumeUrl } from '../src/content/presentation.ts';
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
        if (path === '/404.html') {
          return html.replace('<!--page-->', () => renderToStaticMarkup(createElement(NotFound, profile)));
        }

        return html
          .replace('<!--metadata-->', () => renderToStaticMarkup(createElement(Metadata, { profile, settings })))
          .replace('<!--page-->', () => renderToStaticMarkup(createElement(App, { profile })));
      },
    },
    configureServer(server) {
      server.middlewares.use(redirect);
      server.middlewares.use(resumeUrl, (_request, response, next) => {
        createResume(profile).then((pdf) => {
          response.writeHead(200, { 'Content-Type': 'application/pdf' }).end(pdf);
        }, next);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
      return () => {
        server.middlewares.use((request, response, next) => {
          if (!request.headers.accept?.includes('text/html')) return next();
          const path = request.url?.split('?')[0];
          if (path === '/index.html' || path === '/404.html') return next();
          readFile(resolve(output, '404.html')).then((html) => {
            response
              .writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
              .end(request.method === 'HEAD' ? undefined : html);
          }, next);
        });
      };
    },
    async writeBundle() {
      const pdf = await createResume(profile);
      const sitemap = buildSitemap(settings);
      const rules = Array.from(redirects, ([from, to]) => `${from} ${to} 301`).join('\n');
      await Promise.all([
        writeFile(resolve(output, resumeFile), pdf),
        writeFile(resolve(output, '_redirects'), `${rules}\n`),
        writeFile(resolve(output, 'robots.txt'), buildRobots(settings)),
        ...(sitemap ? [writeFile(resolve(output, 'sitemap.xml'), sitemap)] : []),
      ]);
    },
  };
}
