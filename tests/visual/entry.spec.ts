import { test, expect } from '@playwright/test';

test.describe('entry Visual Tests', () => {
  test('matches design screenshot', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });
    
    await expect(page).toHaveScreenshot('entry-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});