import { test, expect } from '@playwright/test'

test.describe('Supabase Connection', () => {
  test('debug page should show connection status', async ({ page }) => {
    await page.goto('/debug')
    
    // Wait for status to update
    await page.waitForTimeout(2000)
    
    // Check environment variables are set
    await expect(page.getByText(/URL: https:\/\//)).toBeVisible()
    await expect(page.getByText('Anon Key: Set')).toBeVisible()
    
    // Check status
    const statusText = await page.getByText(/Status: /).textContent()
    console.log('Debug page status:', statusText)
    
    // Should not show "Checking..." after 2 seconds
    expect(statusText).not.toContain('Checking...')
  })

  test('should be able to access Supabase from client', async ({ page }) => {
    await page.goto('/debug')
    
    // Check console for errors
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.waitForTimeout(3000)
    
    // Should not have any Supabase-related errors
    const supabaseErrors = consoleErrors.filter(err => 
      err.includes('supabase') || 
      err.includes('SUPABASE') || 
      err.includes('Failed to fetch')
    )
    
    expect(supabaseErrors).toHaveLength(0)
  })
})