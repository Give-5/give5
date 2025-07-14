import { test, expect } from '@playwright/test';

test.describe('Signup Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('matches signup page screenshot on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page).toHaveScreenshot('signup-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('compares with original signup screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Take a screenshot for manual comparison
    await expect(page).toHaveScreenshot('signup-original-comparison.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});