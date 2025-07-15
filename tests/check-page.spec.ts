import { test } from '@playwright/test'

test('check what is on the page', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(3000)
  
  // Get all text on the page
  const pageText = await page.textContent('body')
  console.log('Page text:', pageText)
  
  // Get page title
  const title = await page.title()
  console.log('Page title:', title)
  
  // Check for any visible text
  const visibleText = await page.locator('body').innerText()
  console.log('Visible text:', visibleText)
  
  // Take screenshot
  await page.screenshot({ path: 'tests/screenshots/actual-page.png', fullPage: true })
})