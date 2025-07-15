# Give5 Style Guide

## Overview
This document outlines the design system and styling guidelines for the Give5 volunteer management platform. All UI components and pages should adhere to these standards to maintain visual consistency.

## Design Tokens

### Color Palette

#### Primary Colors
- **Give5 Blue** (#092184) - Main brand color, used for headers, primary buttons, and key UI elements
- **Give5 Red** (#D00416) - Accent color, used for the "5" in logo and important highlights
- **Light Background** (rgba(13, 49, 199, 0.1)) - Light blue tint for page backgrounds
- **Input Background** (rgba(13, 49, 199, 0.04)) - Very light blue for form inputs

#### Secondary Colors
- **Accent Yellow** (#FDCD5B) - Used for CTA buttons like "register" and "rewards"
- **Success Green** (#2FC155) - For success states and confirmations
- **Error Red** (#F63765) - For error messages and validation

#### Neutral Colors
- **White** (#F2F8FC) - Slightly off-white for text on dark backgrounds
- **Light Gray** (#D8E5EC) - Borders and dividers
- **Dark Gray** (#385055) - Secondary text
- **Near Black** (#040232) - High contrast text

### Typography

#### Font Families
- **Headings**: Figtree (fallback: system-ui)
- **Body Text**: League Spartan (fallback: system-ui)

#### Type Scale
- **H1**: 48px/72px, 700 weight, -2px letter-spacing
- **H2**: 40px/60px, 700 weight, -1.5px letter-spacing
- **H3**: 34px/51px, 600 weight, -1px letter-spacing
- **H4**: 26px/39px, 300 weight
- **H5**: 20px/30px, 500 weight
- **Body**: 18px/30px, 400 weight

### Effects

#### Border Radius
- **Buttons**: 24px (fully rounded)
- **Cards**: 16px
- **Inputs**: 8px
- **Small elements**: 5px

#### Shadows
- **E1**: 0px 1px 4px -2px rgba(0, 0, 0, 0.13), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)
- **E2**: 0px 2px 6px -2px rgba(0, 0, 0, 0.19), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)

## Component Guidelines

### Buttons

#### Primary Button
```css
background: #092184;
color: #F2F8FC;
padding: 12px 80px;
border-radius: 24px;
font-size: 26px;
font-weight: 300;
```

#### Secondary Button
```css
background: rgba(13, 49, 199, 0.1);
color: #092184;
padding: 12px 80px;
border-radius: 24px;
```

#### Accent Button
```css
background: #FDCD5B;
color: #F2F8FC;
padding: 12px 80px;
border-radius: 24px;
```

### Form Inputs

```css
background: rgba(13, 49, 199, 0.04);
border: 1px solid transparent;
border-radius: 8px;
padding: 16px 24px;
font-size: 20px;
font-weight: 500;

/* Focus state */
border-color: #0D31C7;
box-shadow: 0 0 0 2px rgba(13, 49, 199, 0.1);
```

### Cards

Event cards and content containers should use:
```css
background: rgba(13, 49, 199, 0.04);
border-radius: 16px;
padding: 24px;
```

## Layout Principles

1. **Spacing**: Use consistent spacing units (4px, 8px, 16px, 24px, 32px, 48px, 64px)
2. **Mobile-first**: Design for mobile screens first, then enhance for larger screens
3. **Accessibility**: Maintain WCAG AA color contrast ratios
4. **Consistency**: Use design tokens instead of hardcoded values

## Logo Usage

The Give5 logo has three variants:
1. **Icon only**: Hand icon for small spaces
2. **Text only**: "GIVE5 MILE HIGH" for headers on colored backgrounds
3. **Combined**: Icon + text for marketing materials

Always maintain proper spacing around the logo and ensure it's clearly visible against the background.

## Implementation

### Using Style Tokens in Code

```typescript
import { colors, typography, effects } from '@/lib/styles'

// Use in styled components or inline styles
const buttonStyle = {
  backgroundColor: colors.primary[500],
  color: colors.neutral[100],
  borderRadius: effects.radius.full,
}
```

### Tailwind Classes

The Tailwind config has been updated with our design tokens:
- `text-give5-blue`, `bg-give5-blue`
- `text-give5-red`, `bg-give5-red`
- `bg-give5-light-bg`
- `bg-give5-light-blue`
- `bg-give5-yellow`
- `shadow-e1`, `shadow-e2`

## Maintaining Consistency

1. Always check the component showcase page (`/components`) before creating new components
2. Use existing components when possible
3. Follow the established patterns for new components
4. Update the showcase when adding new reusable components
5. Run visual tests to ensure UI consistency