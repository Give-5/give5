import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'give5-blue': '#092184',
        'give5-red': '#D00416',
        'give5-light-bg': 'rgba(13, 49, 199, 0.1)',
        'give5-light-blue': 'rgba(13, 49, 199, 0.04)',
        'give5-yellow': '#FDCD5B',
        'give5-green': '#2FC155',
        // Primary scale
        'primary': {
          100: '#94A7F8',
          200: '#385DF2',
          300: '#0A36B0',
          400: '#0831CF',
          500: '#092184',
          600: '#061340',
        },
        // Secondary scale
        'secondary': {
          100: '#FDCD5B',
          200: '#FDC931',
        },
        // Neutral scale
        'neutral': {
          100: '#F2F8FC',
          200: '#D8E5EC',
          800: '#385055',
          900: '#191B1C',
          1000: '#040232',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['League Spartan', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'e1': '0px 1px 4px -2px rgba(0, 0, 0, 0.13), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
        'e2': '0px 2px 6px -2px rgba(0, 0, 0, 0.19), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config