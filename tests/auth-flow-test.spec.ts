import { test, expect } from '@playwright/test'

test.describe('Auth Flow with Session', () => {
  test('should maintain session after login', async ({ page, context }) => {
    // Enable console logging
    page.on('console', msg => {
      if (msg.text().includes('[Auth]')) {
        console.log('Browser:', msg.text())
      }
    })
    
    // Go to login page
    await page.goto('http://localhost:3000/login')
    
    // Create a test account first
    console.log('Creating test account...')
    await page.click('text=Create account')
    await page.fill('input[type="email"]', `test${Date.now()}@example.com`)
    await page.fill('input[type="password"]', 'testpassword123')
    await page.fill('input[placeholder="John Doe"]', 'Test User')
    await page.click('button:has-text("Sign Up")')
    
    // Wait for navigation or error
    await page.waitForTimeout(3000)
    
    // Check if we're on welcome or home page
    const url = page.url()
    console.log('Current URL after signup:', url)
    
    if (url.includes('/welcome')) {
      console.log('Redirected to welcome page')
    } else if (url.includes('/home')) {
      console.log('Redirected to home page')
    } else if (url.includes('/login') || url.includes('/')) {
      // Check for error message
      const errorText = await page.locator('.text-red-600').textContent().catch(() => null)
      if (errorText) {
        console.log('Signup error:', errorText)
      } else {
        console.log('Still on login page, no error shown')
      }
    }
    
    // Save the storage state
    await context.storageState({ path: 'tests/auth-state.json' })
    
    // Now test that session persists
    console.log('\nTesting session persistence...')
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(3000)
    
    // Check final URL
    const finalUrl = page.url()
    console.log('Final URL:', finalUrl)
    
    // Take screenshots
    await page.screenshot({ path: 'tests/screenshots/final-state.png', fullPage: true })
    
    // We should be on home page if auth is working
    if (finalUrl.includes('/home')) {
      console.log('✅ Success: Session persisted, on home page')
    } else {
      console.log('❌ Failed: Session not persisted, on:', finalUrl)
    }
  })
  
  test('check auth storage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Check all storage mechanisms
    const storage = await page.evaluate(() => {
      const result: any = {
        localStorage: {},
        cookies: document.cookie,
        sessionStorage: {}
      }
      
      // Get all localStorage items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes('supabase')) {
          result.localStorage[key] = localStorage.getItem(key)
        }
      }
      
      // Get all sessionStorage items
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && key.includes('supabase')) {
          result.sessionStorage[key] = sessionStorage.getItem(key)
        }
      }
      
      return result
    })
    
    console.log('\n=== Storage Check ===')
    console.log('LocalStorage keys:', Object.keys(storage.localStorage))
    console.log('Cookies:', storage.cookies)
    console.log('SessionStorage keys:', Object.keys(storage.sessionStorage))
    
    // Parse and check session data if exists
    Object.entries(storage.localStorage).forEach(([key, value]: [string, any]) => {
      if (key.includes('auth-token')) {
        try {
          const parsed = JSON.parse(value)
          console.log(`\nSession in ${key}:`)
          console.log('- Has currentSession:', !!parsed.currentSession)
          console.log('- User email:', parsed.currentSession?.user?.email)
          console.log('- Expires at:', parsed.currentSession?.expires_at)
        } catch (e) {
          console.log(`Failed to parse ${key}`)
        }
      }
    })
  })
})