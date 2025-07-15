import { test, expect } from '@playwright/test'

test.describe('Auth Debug Tests', () => {
  test('debug auth initialization', async ({ page }) => {
    // Set up console logging
    const consoleLogs: string[] = []
    page.on('console', msg => {
      const text = msg.text()
      if (text.includes('[Auth]') || text.includes('[Supabase]') || text.includes('[Entry]')) {
        consoleLogs.push(`${msg.type()}: ${text}`)
      }
    })

    // Navigate to home page
    console.log('Navigating to localhost:3000...')
    await page.goto('http://localhost:3000')
    
    // Wait for either auth to complete or timeout
    await page.waitForTimeout(6000) // Wait past the 5s safety timeout
    
    // Log all console messages
    console.log('\n=== Console Logs ===')
    consoleLogs.forEach(log => console.log(log))
    
    // Check what's visible on the page
    const loadingVisible = await page.locator('text=Loading').isVisible()
    const signInVisible = await page.locator('text=Sign in to Give5').isVisible()
    const homePageVisible = await page.locator('text=Find Your Next').isVisible()
    
    console.log('\n=== Page State ===')
    console.log('Loading visible:', loadingVisible)
    console.log('Sign in visible:', signInVisible)
    console.log('Home page visible:', homePageVisible)
    
    // Take a screenshot
    await page.screenshot({ path: 'tests/screenshots/auth-state.png' })
  })

  test('test getUser directly', async ({ page }) => {
    await page.goto('http://localhost:3000/test-raw')
    
    // Wait for tests to complete
    await page.waitForTimeout(5000)
    
    // Check for success/failure messages
    const logs = await page.locator('.text-green-400, .text-red-400').allTextContents()
    
    console.log('\n=== Raw Client Test Results ===')
    logs.forEach(log => console.log(log))
    
    await page.screenshot({ path: 'tests/screenshots/raw-client-test.png' })
  })

  test('test auth flow with credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/test-auth-flow')
    
    // Wait for auth to initialize
    await page.waitForSelector('text=Current Auth State', { timeout: 10000 })
    
    // Fill in test credentials
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'testpassword123')
    
    // Try to sign in
    console.log('Attempting sign in...')
    await page.click('button:has-text("Sign In")')
    
    // Wait for response
    await page.waitForTimeout(5000)
    
    // Check for error or success
    const errorText = await page.locator('.text-red-700').textContent()
    const successText = await page.locator('.text-green-700').textContent()
    
    console.log('\n=== Sign In Result ===')
    if (errorText) console.log('Error:', errorText)
    if (successText) console.log('Success:', successText)
    
    await page.screenshot({ path: 'tests/screenshots/sign-in-result.png' })
  })

  test('check network requests to Supabase', async ({ page }) => {
    // Track all network requests
    const requests: any[] = []
    
    page.on('request', request => {
      if (request.url().includes('supabase')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers()
        })
      }
    })
    
    page.on('response', response => {
      if (response.url().includes('supabase')) {
        console.log(`Response: ${response.status()} ${response.url()}`)
      }
    })
    
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(5000)
    
    console.log('\n=== Supabase Network Requests ===')
    requests.forEach(req => {
      console.log(`${req.method} ${req.url}`)
    })
  })

  test('test minimal auth implementation', async ({ page }) => {
    // Create a minimal test page inline
    await page.goto('about:blank')
    
    await page.evaluate(() => {
      // Add script to test Supabase directly in browser
      const script = document.createElement('script')
      script.type = 'module'
      script.textContent = `
        import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
        
        const supabase = createClient(
          '${process.env.NEXT_PUBLIC_SUPABASE_URL}',
          '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}'
        )
        
        console.log('Testing direct Supabase client...')
        
        // Test getUser
        supabase.auth.getUser().then(({ data, error }) => {
          console.log('getUser result:', { user: data.user?.email, error })
        }).catch(err => {
          console.log('getUser error:', err)
        })
        
        // Test getSession
        Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) => setTimeout(() => reject('Timeout'), 3000))
        ]).then(({ data, error }) => {
          console.log('getSession result:', { session: data?.session, error })
        }).catch(err => {
          console.log('getSession error:', err)
        })
      `
      document.head.appendChild(script)
    })
    
    await page.waitForTimeout(5000)
  })
})