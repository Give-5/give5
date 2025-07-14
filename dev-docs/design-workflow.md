# Give5 Design-to-Development Workflow

This document outlines the process for implementing UI designs from screenshots into the Give5 Next.js application.

## Workflow Overview

### 1. Screenshot Management
- All design screenshots are stored in `/dev-docs/screenshots/`
- Name screenshots descriptively (e.g., `login.png`, `events-list.png`)
- When updating designs, replace the existing screenshot with the new version
- Keep a changelog of design updates if needed

### 2. Implementation Process

#### Step 1: Analyze Design
1. Open the screenshot in `/dev-docs/screenshots/`
2. Identify key components:
   - Layout structure
   - Colors and typography
   - Spacing and sizing
   - Interactive elements
   - Responsive considerations

#### Step 2: Plan Implementation
1. Check if components already exist in `/components/`
2. Determine if new components need to be created
3. Update todo list with specific tasks
4. Identify any design tokens that need updating

#### Step 3: Build Components
1. Create/update components following the existing patterns
2. Use Tailwind classes with our custom design tokens
3. Ensure mobile-first responsive design
4. Follow accessibility best practices

#### Step 4: Visual Testing
1. Run Playwright tests to capture screenshots:
   ```bash
   npx playwright test tests/visual/compare-with-design.spec.ts
   ```
2. Compare generated screenshots with design files
3. Iterate until visual accuracy is achieved (target: 95%+ match)

#### Step 5: Cross-Device Testing
1. Test on multiple viewports:
   - Mobile: 390x844 (iPhone)
   - Tablet: 768x1024 (iPad)
   - Desktop: 1440x900
2. Ensure responsive behavior matches design intent

### 3. Automated Visual Regression

#### Setting Up Tests
For each new page/component, create a visual test:

```typescript
// tests/visual/[page-name].spec.ts
import { test, expect } from '@playwright/test';

test.describe('[Page Name] Visual Tests', () => {
  test('matches design screenshot', async ({ page }) => {
    await page.goto('/path-to-page');
    await page.setViewportSize({ width: 390, height: 844 });
    
    const screenshot = await page.screenshot({ fullPage: true });
    // Compare with design screenshot
  });
});
```

#### Running Tests
```bash
# Run all visual tests
npm run test

# Update snapshots when design changes
npx playwright test --update-snapshots

# Run specific test
npx playwright test tests/visual/entry-page.spec.ts
```

### 4. Design Token Management

#### Colors (Tailwind Config)
- Primary Blue: `give5-blue` (#1E40AF)
- Accent Red: `give5-red` (#EF4444)
- Light Background: `give5-light-bg` (#E0E7FF)
- Light Blue: `give5-light-blue` (#DBEAFE)

#### Typography
- Font: System font stack (Roboto preferred)
- Sizes: Use Tailwind's default scale
- Weights: Regular (400), Medium (500), Bold (700)

#### Spacing
- Use Tailwind's spacing scale
- Maintain consistent padding/margins across components

### 5. Component Library

#### Shared Components Location
- `/components/ui/` - Basic UI components (buttons, inputs, cards)
- `/components/features/` - Feature-specific components
- `/components/layout/` - Layout components (headers, navigation)

#### Component Template
```typescript
interface ComponentProps {
  // Define props
}

export default function ComponentName({ ...props }: ComponentProps) {
  return (
    // Component JSX
  );
}
```

### 6. Continuous Improvement

#### Adding New Screenshots
1. Add screenshot to `/dev-docs/screenshots/`
2. Create corresponding test in `/tests/visual/`
3. Implement the design following steps above
4. Update this workflow document if needed

#### Updating Existing Designs
1. Replace screenshot in `/dev-docs/screenshots/`
2. Run visual tests to see differences
3. Update components to match new design
4. Run tests again until satisfied
5. Commit changes with clear message

### 7. Best Practices

1. **Pixel Perfection**: Aim for 95%+ visual accuracy
2. **Performance**: Optimize images and lazy load when appropriate
3. **Accessibility**: Ensure WCAG 2.1 AA compliance
4. **Code Quality**: Follow ESLint rules and TypeScript types
5. **Documentation**: Comment complex logic and update docs

### 8. Tools and Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Run linter

# Testing
npm run test            # Run all tests
npm run test:ui         # Run tests with UI

# Visual Comparison
npx playwright test --headed  # Run tests with browser visible
```

## Design Implementation Checklist

For each new design implementation:

- [ ] Screenshot added to `/dev-docs/screenshots/`
- [ ] Design analyzed and components identified
- [ ] Todo list updated with tasks
- [ ] Components built/updated
- [ ] Visual tests created
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked
- [ ] Code reviewed and linted
- [ ] Visual regression tests passing

This workflow ensures consistent, high-quality implementation of designs while maintaining a scalable codebase.