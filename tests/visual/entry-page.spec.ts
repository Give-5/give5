import { test, expect } from '@playwright/test';

test.describe('Entry Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('matches entry page screenshot on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page).toHaveScreenshot('entry-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('matches entry page screenshot on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('entry-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('matches entry page screenshot on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('entry-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('compares with original screenshot', async ({ page }) => {
    // Mobile viewport to match the original screenshot
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Take a screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    
    // We'll use this to manually compare with the original
    // In a real scenario, we'd use visual regression tools
    await expect(page).toHaveScreenshot('entry-original-comparison.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});