import { test, expect } from '@playwright/test'

test.describe('Simple Auth Test', () => {
  test('app should load without hanging', async ({ page }) => {
    // Navigate to home
    await page.goto('http://localhost:3000')
    
    // Should not show Loading... after 2 seconds
    await page.waitForTimeout(2000)
    
    // Check what's visible
    const loadingVisible = await page.locator('text=Loading').isVisible()
    const signInVisible = await page.locator('text=Sign in to Give5').isVisible()
    
    console.log('Loading visible:', loadingVisible)
    console.log('Sign in visible:', signInVisible)
    
    // Should show sign in page, not loading
    expect(loadingVisible).toBe(false)
    expect(signInVisible).toBe(true)
    
    await page.screenshot({ path: 'tests/screenshots/app-loaded.png' })
  })
  
  test('should be able to attempt login', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Wait for page to load
    await page.waitForSelector('text=Sign in to Give5')
    
    // Fill in credentials
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    
    // Click sign in
    await page.click('button:has-text("Sign In")')
    
    // Wait a bit
    await page.waitForTimeout(3000)
    
    // Check if we got an error or success
    const errorVisible = await page.locator('.text-red-600').isVisible()
    if (errorVisible) {
      const errorText = await page.locator('.text-red-600').textContent()
      console.log('Login error:', errorText)
    }
    
    await page.screenshot({ path: 'tests/screenshots/login-attempt.png' })
  })
})