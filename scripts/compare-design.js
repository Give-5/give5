#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../dev-docs/screenshots');
const testsDir = path.join(__dirname, '../tests/visual');

// Get all screenshot files
const screenshots = fs.readdirSync(screenshotsDir)
  .filter(file => file.endsWith('.png'));

console.log('🎨 Give5 Design Comparison Tool\n');
console.log(`Found ${screenshots.length} design screenshots:\n`);

screenshots.forEach((screenshot, index) => {
  const pageName = path.basename(screenshot, '.png');
  console.log(`${index + 1}. ${pageName}`);
});

console.log('\nSelect a screenshot to compare (enter number):');

// Simple CLI interaction (in production, use a proper CLI library)
process.stdin.once('data', (data) => {
  const selection = parseInt(data.toString().trim()) - 1;
  
  if (selection >= 0 && selection < screenshots.length) {
    const selectedScreenshot = screenshots[selection];
    const pageName = path.basename(selectedScreenshot, '.png');
    
    console.log(`\n📸 Comparing implementation with ${selectedScreenshot}...`);
    
    // Check if test exists
    const testFile = path.join(testsDir, `${pageName}.spec.ts`);
    
    if (!fs.existsSync(testFile)) {
      console.log(`\n⚠️  No test found for ${pageName}. Creating one...`);
      
      // Create a basic test file
      const testContent = `import { test, expect } from '@playwright/test';

test.describe('${pageName} Visual Tests', () => {
  test('matches design screenshot', async ({ page }) => {
    await page.goto('/${pageName === 'entry' ? '' : pageName}');
    await page.setViewportSize({ width: 390, height: 844 });
    
    await expect(page).toHaveScreenshot('${pageName}-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});`;
      
      fs.writeFileSync(testFile, testContent);
      console.log(`✅ Created test file: ${testFile}`);
    }
    
    // Run the visual test
    try {
      console.log('\n🧪 Running visual test...\n');
      execSync(`npx playwright test ${testFile} --project="Mobile Chrome"`, {
        stdio: 'inherit'
      });
      
      console.log('\n✅ Visual test completed!');
      console.log('\n💡 Tip: Use --update-snapshots flag to update the baseline screenshots');
    } catch (error) {
      console.log('\n❌ Visual test failed. Check the differences above.');
      console.log('\n💡 To update snapshots: npx playwright test --update-snapshots');
    }
  } else {
    console.log('\n❌ Invalid selection');
  }
  
  process.exit(0);
});