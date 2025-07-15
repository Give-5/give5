// Give5 Effects System
// Shadows, borders, and other visual effects

export const effects = {
  // Border radius
  radius: {
    none: '0px',
    small: '5px',
    medium: '8px',
    large: '16px',
    full: '24px', // Used for buttons
    round: '9999px', // Fully rounded
  },
  
  // Box shadows
  shadow: {
    e0: 'none',
    e1: '0px 1px 4px -2px rgba(0, 0, 0, 0.13), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    e2: '0px 2px 6px -2px rgba(0, 0, 0, 0.19), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    card: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    hover: '0px 6px 16px rgba(0, 0, 0, 0.15)',
  },
  
  // Border styles
  border: {
    default: '1px solid rgba(0, 0, 0, 0.08)',
    focus: '1px solid #0D31C7',
    error: '1px solid #D00416',
    dashed: '1px dashed #8A38F5', // For component preview
  },
  
  // Transitions
  transition: {
    fast: 'all 150ms ease-in-out',
    normal: 'all 250ms ease-in-out',
    slow: 'all 350ms ease-in-out',
  },
  
  // Spacing (consistent with Tailwind)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
} as const