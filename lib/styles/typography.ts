// Give5 Typography System
// Based on the design system specifications

export const typography = {
  fontFamily: {
    heading: 'Figtree, system-ui, -apple-system, sans-serif',
    body: 'League Spartan, system-ui, -apple-system, sans-serif',
  },
  
  // Heading styles
  heading: {
    h1: {
      fontSize: '48px',
      lineHeight: '72px',
      fontWeight: 700,
      letterSpacing: '-2px',
    },
    h2: {
      fontSize: '40px',
      lineHeight: '60px',
      fontWeight: 700,
      letterSpacing: '-1.5px',
    },
    h3: {
      fontSize: '34px',
      lineHeight: '51px',
      fontWeight: 600,
      letterSpacing: '-1px',
    },
    h4: {
      fontSize: '26px',
      lineHeight: '39px',
      fontWeight: 300,
      letterSpacing: 'normal',
    },
    h5: {
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: 500,
      letterSpacing: 'normal',
    },
  },
  
  // Body styles
  body: {
    b1: {
      fontSize: '18px',
      lineHeight: '30px',
      fontWeight: 400,
    },
    b2: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    b3: {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 400,
    },
  },
  
  // Component-specific text styles
  components: {
    button: {
      fontSize: '26px',
      lineHeight: '39px',
      fontWeight: 300,
      fontFamily: 'Figtree',
    },
    input: {
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: 500,
      fontFamily: 'Figtree',
    },
    label: {
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: 500,
      fontFamily: 'Figtree',
    },
  },
} as const