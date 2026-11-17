import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { labels, resumeFile, resumeUrl } from '../../src/content/presentation.ts';
import { profile } from '../../src/content/profile.ts';
import { inspectPdf } from '../pdf-inspection.ts';

test.use({ javaScriptEnabled: false });

test('serves a readable static homepage and working section and contact links', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (!response.ok()) errors.push(`${response.status()} ${response.url()}`);
  });

  expect((await page.goto('/'))?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle(`${profile.displayName} | ${profile.currentPosition.title}`);
  await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible();
  await expect(page.getByText(profile.currentPosition.title, { exact: true }).first()).toBeVisible();
  expect(await page.locator('script[type="module"][src]').count()).toBe(1);
  const languages = page.getByRole('region', { name: labels.languages });
  await expect(languages.getByText('Português', { exact: true })).toBeVisible();
  await expect(languages.getByText('Nativo', { exact: true })).toBeVisible();
  await expect(languages.getByText('Inglês', { exact: true })).toBeVisible();
  await expect(languages.getByText('Avançado', { exact: true })).toBeVisible();
  for (const group of profile.experience) {
    await expect(page.getByRole('heading', { name: group.organization })).toBeVisible();
  }

  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  for (const [label, id] of [
    ['Experiência', 'experiencia'],
    ['Competências', 'competencias'],
    [labels.contact, 'contato'],
  ]) {
    await nav.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }

  const contact = page.getByRole('region', { name: labels.contact });
  for (const link of profile.links) {
    await expect(contact.getByRole('link', { name: new RegExp(link.label, 'i') })).toHaveAttribute('href', link.href);
  }
  await page.getByRole('link', { name: 'Voltar ao topo' }).click();
  await expect(nav).toBeInViewport();
  expect((await request.get('/mark.svg')).ok()).toBe(true);
  expect((await request.get('/art/structure.webp')).ok()).toBe(true);
  expect((await request.get('/art/social.jpg')).ok()).toBe(true);
  expect(errors).toEqual([]);
});

test('supports keyboard skip, focus and download on the published build', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Ir para o conteúdo' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  const cta = page.getByRole('link', { name: labels.download });
  await expect(cta).toBeFocused();
  await expect(cta).toHaveCSS('outline-style', 'solid');
  await expect(cta).toHaveAttribute('href', resumeUrl);
  const [download] = await Promise.all([page.waitForEvent('download'), page.keyboard.press('Enter')]);
  expect(download.suggestedFilename()).toBe(resumeFile);
  expect(await download.failure()).toBeNull();
  const bytes = await readFile(await download.path());
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  const pages = await inspectPdf(bytes);
  const text = pages.map((page) => page.text).join(' ');
  expect(text).toContain(profile.name);
  expect(text).toContain(profile.currentPosition.title);
  const livelo = profile.experience.find(({ id }) => id === 'livelo')!;
  expect(text).toContain(livelo.organization);
  for (const role of livelo.roles) {
    expect(text).toContain(role.title);
    expect(text).toContain(role.description);
  }
  expect(pages.flatMap(({ links }) => links)).toEqual(profile.links.map(({ href }) => href));
});

test('preserves legacy routes and uses an actual 404 for unknown pages', async ({ page, request }) => {
  const redirects = [
    ['/home', '/'],
    ['/experiences', '/#experiencia'],
    ['/pages', '/'],
    ['/pages/experiences.html', '/#experiencia'],
  ];
  const publishedRules = await (await request.get('/_redirects')).text();
  for (const [from, to] of redirects) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toBe(to);
    expect(publishedRules).toContain(`${from} ${to} 301`);
  }
  await page.goto('/experiences');
  await expect(page).toHaveURL(/#experiencia$/);
  const response = await page.goto('/indisponivel');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await page.getByRole('link', { name: 'Voltar ao portfólio' }).click();
  await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`fits the ${width}px viewport and keeps navigation usable`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const cta = page.getByRole('link', { name: labels.download });
    await expect(cta).toBeInViewport();
    expect((await cta.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    if (width === 390 || width === 1440) {
      await testInfo.attach(`portfolio-${width}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    }
    await page
      .getByRole('navigation', { name: labels.mainNavigation })
      .getByRole('link', { name: labels.contact })
      .click();
    await expect(page.getByRole('heading', { name: labels.contact })).toBeInViewport();
  });
}

for (const width of [390, 1440]) {
  test(`preserves the reviewed ${width}px visual baseline`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`homepage-${width}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}

test.describe('automated accessibility', () => {
  test.use({ javaScriptEnabled: true, reducedMotion: 'reduce', locale: 'pt-BR' });

  for (const width of [390, 1440]) {
    test(`passes axe WCAG checks at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

test('reflows at 200% native text size on a narrow viewport', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const session = await context.newCDPSession(page);
  await session.send('Page.setFontSizes', { fontSizes: { standard: 32, fixed: 26 } });
  await page.goto('/');
  expect(await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(32);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page
    .getByRole('navigation', { name: labels.mainNavigation })
    .getByRole('link', { name: labels.contact })
    .click();
  await expect(page.getByRole('heading', { name: labels.contact })).toBeInViewport();
});
