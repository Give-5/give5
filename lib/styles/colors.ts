// Give5 Color System
// Based on the style guide from dev-docs/styles/style-guide.png

export const colors = {
  // Primary Colors
  primary: {
    100: '#94A7F8', // Light blue
    200: '#385DF2', // Medium blue
    300: '#0A36B0', // Standard blue
    400: '#0831CF', // Deep blue
    500: '#092184', // Give5 blue (main brand color)
    600: '#061340', // Dark blue
  },
  
  // Secondary Colors (Accent)
  secondary: {
    100: '#FDCD5B', // Light yellow/gold
    200: '#FDC931', // Medium yellow
  },
  
  // Neutral Colors
  neutral: {
    100: '#F2F8FC', // Light gray/white
    200: '#D8E5EC', // Light blue-gray
    800: '#385055', // Dark gray
    900: '#191B1C', // Near black
    1000: '#040232', // Deep black
  },
  
  // Red Colors
  red: {
    100: '#F63765', // Light red
    200: '#D00416', // Give5 red (brand accent)
  },
  
  // Yellow Colors
  yellow: {
    100: '#FFF056', // Bright yellow
  },
  
  // Green Colors
  green: {
    100: '#7FE098', // Light green
    200: '#2FC155', // Medium green
  },
  
  // Background Colors
  background: {
    light: 'rgba(13, 49, 199, 0.1)', // Give5 light background
    lightBlue: 'rgba(13, 49, 199, 0.04)', // Input background
    white: '#FFFFFF',
  },
} as const

// Semantic color mappings
export const semanticColors = {
  text: {
    primary: colors.primary[500], // #092184
    secondary: colors.neutral[800], // #385055
    inverse: colors.neutral[100], // #F2F8FC
    muted: '#CBCBCB',
  },
  button: {
    primary: {
      background: colors.primary[500],
      text: colors.neutral[100],
      hover: '#0A36B0',
    },
    secondary: {
      background: colors.background.lightBlue,
      text: colors.primary[500],
      hover: colors.primary[100],
    },
    accent: {
      background: colors.secondary[100],
      text: colors.neutral[100],
      hover: colors.secondary[200],
    },
  },
  input: {
    background: colors.background.lightBlue,
    border: colors.primary[300],
    focusBorder: colors.primary[400],
    placeholder: '#CBCBCB',
  },
  error: colors.red[200],
  success: colors.green[200],
  warning: colors.secondary[200],
} as const