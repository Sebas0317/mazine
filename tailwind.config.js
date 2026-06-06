module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.primary.20', '#E5E5E5'),
    }),
    boxShadow: {
      DEFAULT: 'var(--shadow-md)',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      none: '0 0 #0000',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: 'var(--primary)',
        95: 'var(--primary-95)',
        90: 'var(--primary-90)',
        80: 'var(--primary-80)',
        60: '#666666',
        40: 'var(--primary-40)',
        20: '#E5E5E5',
        10: '#F0F0F0',
        '05': '#FAFAFA',
      },
      secondary: 'var(--secondary)',
      'black-a-30': 'var(--black-a-30)',
      accent: 'var(--accent)',
      'accent-hover': 'var(--accent-hover)',
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      lineHeight: {
        article: '1.8',
      },
      inset: {
        '1/2': '50%',
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.3333%',
        '2/3': '66.6667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        full: '100%',
      },
      screens: {
        standalone: {
          raw: '(display-mode: standalone)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
        'fade-in-up': 'fadeIn 0.2s ease-in-out, slideUp 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: 'translateY(8px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'focus'],
      scale: ['hover', 'focus'],
    },
  },
  plugins: [],
}
