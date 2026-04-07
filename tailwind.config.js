/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#fcf9f8',
        primary: '#3437f1',
        'primary-container': '#dde0ff',
        'on-primary': '#ffffff',
        secondary: '#fd7a4b',
        'secondary-container': '#ffb59c',
        tertiary: '#006639',
        'tertiary-container': '#6ffda9',
        surface: '#fcf9f8',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#454556',
        outline: '#767588',
        'surface-container': '#f0eded',
        'surface-container-low': '#f6f3f2',
        'surface-container-high': '#eae7e7',
        'surface-container-highest': '#e5e2e1',
        // Solais palette
        'solais-navy': 'rgb(17, 35, 55)',
        'solais-offwhite': '#f5f3f0',
        'solais-crimson': '#c02b0a',
        'solais-maroon': '#3c091e',
        'solais-rose': '#97494e',
        'solais-dark': '#111',
      },
      fontFamily: {
        headline: ['Epilogue', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        label: ['"Plus Jakarta Sans"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        profont: ['ProFontWindows', 'Courier New', 'monospace'],
        // Solais fonts (Typekit fallbacks)
        teknolog: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        ki: ['"IBM Plex Sans"', '"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        '4xl': '4rem',
        full: '9999px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
