import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { profiles } from '../../src/content/profile.ts';
import { resumeFiles, resumeUrls } from '../../src/content/presentation.ts';
import { languageStorageKey } from '../../src/i18n/locale.ts';
import { messages } from '../../src/i18n/messages.ts';
import { inspectPdf } from '../pdf-inspection.ts';

test.describe('static English portfolio', () => {
  test.use({ javaScriptEnabled: false });

  test('switches languages and downloads the matching resume without JavaScript', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'EN · English', exact: true }).click();
    await expect(page).toHaveURL('/en/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const languages = page.getByRole('region', { name: messages.en.languages });
    await expect(languages.getByText('Portuguese', { exact: true })).toBeVisible();
    await expect(languages.getByText('Native', { exact: true })).toBeVisible();
    await expect(languages.getByText('English', { exact: true })).toBeVisible();
    await expect(languages.getByText('Advanced', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: messages.en.experienceTitle })).toBeVisible();
    await expect(page.getByRole('link', { name: 'EN · English', exact: true })).toHaveAttribute('aria-current', 'page');
    const cta = page.getByRole('link', { name: messages.en.download });
    await expect(cta).toHaveAttribute('href', resumeUrls.en);
    const [download] = await Promise.all([page.waitForEvent('download'), cta.click()]);
    expect(download.suggestedFilename()).toBe(resumeFiles.en);
    expect(await download.failure()).toBeNull();
    const pages = await inspectPdf(await readFile(await download.path()));
    const text = pages.map(({ text }) => text).join(' ');
    expect(text).toContain(profiles.en.summary);
    expect(text).toContain('Since Mar 2026');
    expect(text).toContain('Tech Lead · Portals');
    expect(text).toContain('Portuguese · Native');
    expect(text).toContain('English · Advanced');
    await page.getByRole('link', { name: 'PT · Português', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('link', { name: messages['pt-BR'].download })).toHaveAttribute(
      'href',
      resumeUrls['pt-BR'],
    );
  });

  test('serves a real English 404 and a localized return link', async ({ page, request }) => {
    expect((await page.goto('/en/missing-page'))?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: messages.en.notFound })).toBeVisible();
    await page.getByRole('link', { name: messages.en.backHome }).click();
    await expect(page).toHaveURL('/en/?lang=en');
    await expect(page.getByRole('link', { name: messages.en.download })).toBeVisible();
    expect(await (await request.get('/_redirects')).text()).toContain('/en/* /en/404.html 404');
  });

  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`fits English content and language controls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.goto('/en/');
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const language = page.getByRole('link', { name: 'EN · English', exact: true });
      await expect(language).toBeInViewport();
      expect((await language.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      const cta = page.getByRole('link', { name: messages.en.download });
      await expect(cta).toBeInViewport();
      await page
        .getByRole('navigation', { name: messages.en.mainNavigation })
        .getByRole('link', { name: messages.en.contact })
        .click();
      await expect(page.getByRole('heading', { name: messages.en.contact })).toBeInViewport();
    });
  }

  for (const width of [390, 1440]) {
    test(`preserves the reviewed English ${width}px visual baseline`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.goto('/en/');
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`homepage-en-${width}.png`, { fullPage: true, maxDiffPixelRatio: 0.02 });
    });
  }

  test('reflows English at 200% native text size on a narrow viewport', async ({ page, context }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const session = await context.newCDPSession(page);
    await session.send('Page.setFontSizes', { fontSizes: { standard: 32, fixed: 26 } });
    await page.goto('/en/');
    expect(await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(32);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    await page
      .getByRole('navigation', { name: messages.en.mainNavigation })
      .getByRole('link', { name: messages.en.contact })
      .click();
    await expect(page.getByRole('heading', { name: messages.en.contact })).toBeInViewport();
  });
});

test.describe('browser language preference', () => {
  test.use({ javaScriptEnabled: true });

  test('detects English while preserving the section and query', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'languages', { value: ['en-GB', 'pt-BR'] }));
    await page.goto('/?source=shared#experiencia');
    await expect(page).toHaveURL('/en/?source=shared#experiencia');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: messages.en.experienceTitle })).toBeInViewport();
  });

  for (const languages of [
    ['pt-PT', 'en-US'],
    ['fr-FR', 'de-DE'],
  ]) {
    test(`keeps Portuguese for browser preferences ${languages.join(', ')}`, async ({ page }) => {
      await page.addInitScript(
        (languages) => Object.defineProperty(navigator, 'languages', { value: languages }),
        languages,
      );
      await page.goto('/');
      await expect(page.getByRole('link', { name: 'EN · English', exact: true })).toHaveAttribute('href', /\?lang=en$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
      await expect(page).toHaveURL('/');
    });
  }

  test('remembers a manual choice across visits and retains the active section', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'languages', { value: ['en-US'] }));
    await page.goto('/?source=shared#competencias');
    await expect(page).toHaveURL('/en/?source=shared#competencias');
    await page.getByRole('link', { name: 'PT · Português', exact: true }).click();
    await expect(page).toHaveURL('/?source=shared&lang=pt-BR#competencias');
    expect(await page.evaluate((key) => localStorage.getItem(key), languageStorageKey)).toBe('pt-BR');
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveURL('/');
    await page.getByRole('link', { name: 'EN · English', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.goto('/');
    await expect(page).toHaveURL('/en/');
  });

  test('honors an explicit English URL over a saved Portuguese preference', async ({ page }) => {
    await page.addInitScript((key) => localStorage.setItem(key, 'pt-BR'), languageStorageKey);
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL('/en/');
  });

  test('allows a Portuguese override when storage is blocked', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'languages', { value: ['en-US'] });
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('Blocked', 'SecurityError');
        },
      });
    });
    await page.goto('/');
    await expect(page).toHaveURL('/en/');
    await page.getByRole('link', { name: 'PT · Português', exact: true }).click();
    await expect(page).toHaveURL('/?lang=pt-BR');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await page.reload();
    await expect(page).toHaveURL('/?lang=pt-BR');
    await page.getByRole('link', { name: profiles['pt-BR'].displayName }).click();
    await expect(page).toHaveURL('/?lang=pt-BR');
    expect(errors).toEqual([]);
  });

  for (const width of [390, 1440]) {
    test(`passes English axe WCAG checks at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/en/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
