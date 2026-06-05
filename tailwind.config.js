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
        mono: ['SF Mono', 'ui-monospace', 'JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontWeight: {
        regular: 'var(--weight-regular)',
        medium: 'var(--weight-medium)',
        semibold: 'var(--weight-semibold)',
        bold: 'var(--weight-bold)',
      },
      // Typography scale (10 → 48). Sizes only; line-height comes from
      // leading-* utilities or the global default. Tokens live in index.css.
      fontSize: {
        '2xs': 'var(--text-2xs)',   // 10px
        'xs': 'var(--text-xs)',     // 12px
        'sm': 'var(--text-sm)',     // 14px
        'base': 'var(--text-base)', // 16px
        'lg': 'var(--text-lg)',     // 18px
        'xl': 'var(--text-xl)',     // 20px
        '2xl': 'var(--text-2xl)',   // 24px
        '3xl': 'var(--text-3xl)',   // 32px
        '4xl': 'var(--text-4xl)',   // 40px
        '5xl': 'var(--text-5xl)',   // 48px
      },
      // Motion tokens (see index.css). Use as duration-fast, ease-decelerate, etc.
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast: 'var(--dur-fast)',
        quick: 'var(--dur-quick)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
        slower: 'var(--dur-slower)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        decelerate: 'var(--ease-decelerate)',
        accelerate: 'var(--ease-accelerate)',
        emphasized: 'var(--ease-emphasized)',
        spring: 'var(--ease-spring)',
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        'glass-lg': 'var(--glass-shadow-lg)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      zIndex: {
        hide: 'var(--z-hide)',
        base: 'var(--z-base)',
        raised: 'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        header: 'var(--z-header)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        toast: 'var(--z-toast)',
        tooltip: 'var(--z-tooltip)',
      },
      opacity: {
        disabled: 'var(--opacity-disabled)',
        muted: 'var(--opacity-muted)',
      },
      colors: {
        surface: {
          primary: 'var(--surface-color-primary)',
          secondary: 'var(--surface-color-secondary)',
          tertiary: 'var(--surface-color-tertiary)',
        },
        text: {
          primary: 'var(--text-color-primary)',
          secondary: 'var(--text-color-secondary)',
          tertiary: 'var(--text-color-tertiary)',
        },
        border: {
          primary: 'var(--border-color-primary)',
          secondary: 'var(--border-color-secondary)',
          'on-primary': 'var(--border-color-on-primary)',
        },
        'surface-contrast': {
          primary: 'var(--surface-color-contrast-primary)',
          secondary: 'var(--surface-color-contrast-secondary)',
          tertiary: 'var(--surface-color-contrast-tertiary)',
        },
        'text-contrast': {
          primary: 'var(--text-color-contrast-primary)',
          secondary: 'var(--text-color-contrast-secondary)',
          tertiary: 'var(--text-color-contrast-tertiary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          contrast: 'var(--accent-contrast)',
        },
        success: { DEFAULT: 'var(--feedback-success)', soft: 'var(--feedback-success-soft)' },
        warning: { DEFAULT: 'var(--feedback-warning)', soft: 'var(--feedback-warning-soft)' },
        danger: { DEFAULT: 'var(--feedback-danger)', soft: 'var(--feedback-danger-soft)' },
        info: { DEFAULT: 'var(--feedback-info)', soft: 'var(--feedback-info-soft)' },
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
