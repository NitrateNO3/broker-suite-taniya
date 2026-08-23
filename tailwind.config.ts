import type { Config } from 'tailwindcss';

/**
 * Design tokens derived from the BrokerSuite logo:
 *  - brand.600 (#4F46E5) — the violet logo tile
 *  - brand.400 (#818CF8) — the "Suite" wordmark periwinkle
 *  - ink.950   (#0F1117) — the logo's dark ground
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './config/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF1FF',
          100: '#E0E5FF',
          200: '#C7CEFE',
          300: '#A5AEFB',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        ink: {
          50: '#F6F7F9',
          100: '#ECEEF2',
          200: '#D9DDE5',
          300: '#B4BBC8',
          400: '#8A93A5',
          500: '#646E82',
          600: '#4A5365',
          700: '#363E4D',
          800: '#222833',
          900: '#161A22',
          950: '#0F1117',
        },
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes so mobile gets its own scale, not a shrunk desktop one.
        'display-lg': ['clamp(2.25rem, 1.4rem + 3.6vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.875rem, 1.3rem + 2.4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 1.15rem + 1.5vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(15 17 23 / 0.05)',
        sm: '0 1px 3px 0 rgb(15 17 23 / 0.06), 0 1px 2px -1px rgb(15 17 23 / 0.06)',
        md: '0 4px 12px -2px rgb(15 17 23 / 0.08), 0 2px 4px -2px rgb(15 17 23 / 0.05)',
        lg: '0 12px 32px -8px rgb(15 17 23 / 0.12), 0 4px 8px -4px rgb(15 17 23 / 0.06)',
        xl: '0 24px 56px -16px rgb(15 17 23 / 0.16), 0 8px 16px -8px rgb(15 17 23 / 0.08)',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
