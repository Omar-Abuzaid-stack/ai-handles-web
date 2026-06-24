import { test, expect } from '@playwright/test';

test.describe('AI Handle Website Tests', () => {
  const pages = [
    '/',
    '/services',
    '/ai-workforce',
    '/integrations',
    '/work',
    '/team',
    '/team/omar-mohamed',
    '/team/mohamed-rayan',
    '/contact'
  ];

  for (const p of pages) {
    test(`Page ${p} loads successfully`, async ({ page }) => {
      await page.goto(p);
      await expect(page).toHaveTitle(/AI Handle/);
      
      // Check for 404 text
      const content = await page.textContent('body');
      expect(content).not.toContain('Team member not found');
    });
  }

  test('Hero text is visible', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1.heading-display');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Imagine a Team That Never Sleeps');
  });

  test('Integrations are displayed correctly', async ({ page }) => {
    await page.goto('/integrations');
    const content = await page.textContent('body');
    expect(content).toContain('Supported — access required');
    expect(content).toContain('Requires approval');
  });
});
