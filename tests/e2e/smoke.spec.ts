import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/departments',
  '/doctors',
  '/team',
  '/guide',
  '/book',
  '/emergency',
  '/path',
  '/families',
  '/families/board',
  '/ledger',
  '/packages',
  '/diagnostics',
  '/portal',
  '/understand',
  '/international',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/demo-disclosure',
  '/accessibility',
  '/sitemap',
];

test.describe('Phase 0 E2E Route Resolution', () => {
  for (const route of routes) {
    test(`visits ${route} without errors`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
    });
  }
});
