/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          'on-primary': 'var(--border-on-primary)',
        },
        'surface-contrast': {
          primary: 'var(--surface-contrast-primary)',
          secondary: 'var(--surface-contrast-secondary)',
          tertiary: 'var(--surface-contrast-tertiary)',
        },
        'text-contrast': {
          primary: 'var(--text-contrast-primary)',
          secondary: 'var(--text-contrast-secondary)',
          tertiary: 'var(--text-contrast-tertiary)',
        },
        // Neutral scale 0-900 (Tailwind default, ensuring it's available)
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}

