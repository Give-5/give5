import { test, expect } from '@playwright/test';

const pages = [
  { name: 'entry', path: '/', screenshot: 'entry.png' },
  { name: 'login', path: '/login', screenshot: 'login.png' },
  { name: 'signup', path: '/signup', screenshot: 'signup.png' },
  { name: 'welcome', path: '/welcome', screenshot: 'welcome.png' },
  { name: 'home', path: '/home', screenshot: 'home.png' },
  { name: 'events', path: '/events', screenshot: 'events-list.png' },
  { name: 'event-registration', path: '/event-registration', screenshot: 'event-registration.png' }
];

test.describe('All Pages Visual Comparison', () => {
  for (const page of pages) {
    test(`${page.name} page matches design`, async ({ page: playwright }) => {
      await playwright.goto(page.path);
      await playwright.setViewportSize({ width: 390, height: 844 });
      await playwright.waitForLoadState('networkidle');
      
      await expect(playwright).toHaveScreenshot(`${page.name}-comparison.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});