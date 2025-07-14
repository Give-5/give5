import { test, expect } from '@playwright/test';

test.describe('Login Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('matches login page screenshot on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page).toHaveScreenshot('login-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('compares with original login screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Take a screenshot for manual comparison
    await expect(page).toHaveScreenshot('login-original-comparison.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});