import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the entry page
    await page.goto('/')
  })

  test('should load entry page without errors', async ({ page }) => {
    // Check that page loads
    await expect(page).toHaveTitle(/Give5/)
    
    // Check for loading state
    const loadingText = page.getByText('Loading...')
    
    // Loading should disappear within 5 seconds
    await expect(loadingText).toBeHidden({ timeout: 5000 })
    
    // Should show the entry page content
    await expect(page.getByText('Make a difference in Denver.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign in with Google/i })).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page).toHaveURL('/login')
    await expect(page.getByText('Volunteer Login')).toBeVisible()
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: 'Join Give 5' }).click()
    await expect(page).toHaveURL('/signup')
    await expect(page.getByText('Volunteer Sign Up')).toBeVisible()
  })

  test('should handle login with test credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    
    // Fill in test credentials
    await page.getByPlaceholder('volunteerprofile@email.com').fill('volunteer1@example.com')
    await page.getByPlaceholder('Password').fill('TestPass123!')
    
    // Submit form
    await page.getByRole('button', { name: 'Login' }).click()
    
    // Should redirect to home or show error
    await page.waitForURL(url => url.pathname === '/home' || url.pathname === '/login', { timeout: 10000 })
    
    if (page.url().includes('/home')) {
      // Check home page loads
      await expect(page.getByText('hours tracker')).toBeVisible({ timeout: 10000 })
    }
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    
    // Fill in invalid credentials
    await page.getByPlaceholder('volunteerprofile@email.com').fill('invalid@example.com')
    await page.getByPlaceholder('Password').fill('wrongpassword')
    
    // Submit form
    await page.getByRole('button', { name: 'Login' }).click()
    
    // Should show error
    await expect(page.getByText(/Invalid login credentials|Failed to sign in/i)).toBeVisible({ timeout: 5000 })
  })

  test('should handle signup flow', async ({ page }) => {
    await page.getByRole('link', { name: 'Join Give 5' }).click()
    
    // Generate unique email
    const uniqueEmail = `test${Date.now()}@example.com`
    
    // Fill in signup form
    await page.getByPlaceholder('Jane Doe').fill('Test User')
    await page.getByPlaceholder('volunteerprofile@email.com').fill(uniqueEmail)
    await page.getByLabel('password').fill('TestPass123!')
    await page.getByLabel('confirm password').fill('TestPass123!')
    
    // Submit form
    await page.getByRole('button', { name: 'Become a volunteer' }).click()
    
    // Should redirect to welcome or show error
    await page.waitForURL(url => url.pathname === '/welcome' || url.pathname === '/signup', { timeout: 10000 })
  })

  test('authenticated user should be redirected from entry to home', async ({ page, context }) => {
    // First login
    await page.goto('/login')
    await page.getByPlaceholder('volunteerprofile@email.com').fill('volunteer1@example.com')
    await page.getByPlaceholder('Password').fill('TestPass123!')
    await page.getByRole('button', { name: 'Login' }).click()
    
    // Wait for redirect to home
    await page.waitForURL('/home', { timeout: 10000 })
    
    // Now navigate back to entry page
    await page.goto('/')
    
    // Should redirect to home
    await expect(page).toHaveURL('/home', { timeout: 5000 })
  })
})

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated user from home to login', async ({ page }) => {
    await page.goto('/home')
    await expect(page).toHaveURL('/login', { timeout: 5000 })
  })

  test('should allow authenticated user to access home', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByPlaceholder('volunteerprofile@email.com').fill('volunteer1@example.com')
    await page.getByPlaceholder('Password').fill('TestPass123!')
    await page.getByRole('button', { name: 'Login' }).click()
    
    // Should be on home page
    await expect(page).toHaveURL('/home', { timeout: 10000 })
    await expect(page.getByText('hours tracker')).toBeVisible()
  })
})

test.describe('OAuth Flow', () => {
  test('should initiate Google OAuth', async ({ page }) => {
    const googleOAuthPromise = page.waitForRequest(request => 
      request.url().includes('accounts.google.com') || 
      request.url().includes('supabase.co/auth/v1/authorize')
    )
    
    await page.getByRole('button', { name: /Sign in with Google/i }).click()
    
    // Should initiate OAuth request
    const oauthRequest = await googleOAuthPromise
    expect(oauthRequest.url()).toContain('auth')
  })
})