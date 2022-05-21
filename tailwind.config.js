const colors = require('tailwindcss/colors')
const { width } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['OpenSans', "'OpenSans'", 'sans-serif'],
      serif: ["'Blogger'", 'sans-serif'],
      mono: ["'Blogger'", 'sans-serif'],
      ibm: ["'IBM'", 'sans-serif'],
      OpenSans: ['OpenSans', 'sans-serif'],
      Helvetica: ['Helvetica', 'sans-serif'],
      HKGrotesk: ['HKGrotesk', 'sans-serif'],
      BloggerSans: ['BloggerSans', "'BloggerSans'", 'sans-serif'],
    },
    screens: {
      sm: '390px',
      450: '450px',
      550: '550px',
      640: '640px',
      smp: '768px',
      md: '768px',
      950: '950px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1280px',
      '3xl': '1536px',
    },
    extend: {
      transitionProperty: {
        width: width,
      },
      opacity: { 13: '0.13' },
      boxShadow: {
        head: '0 0 6px 0 rgba(0, 0, 0, 0.36)',
        search: '0 9px 34px 0 rgba(0, 0, 0, 0.19)',
        service: '0 21px 66px 0 rgba(0, 0, 0, 0.06)',
        pill: 'inset 0 1px 27px 0 rgba(0, 0, 0, 0.22)',
        pillInside: 'inset 0 1px 27px 0 rgba(0, 0, 0, 0.22)',
        grid: '0 12px 55px 0 rgba(0, 0, 0, 0.12)',
        boxes: '0 2px 64px 0 rgba(0, 0, 0, 0.16)',
        hero: '0 2px 40px 0 rgba(0, 0, 0, 0.21)',
        howitworks: '0 2px 44px 0 rgba(0, 0, 0, 0.09)',
        menu: '0 11px 30px 0 rgba(0,0,0,0.08)',
        stackedCard: '0px 2px 0px 1px #c5c5c5',
      },
      gridRowStart: {
        8: 8,
        9: 9,
        10: 10,
      },

      gridRowEnd: {
        8: 8,
        9: 9,
        10: 10,
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8-em': 'repeat(8, minmax(0, 5em))',
        8: 'repeat(8, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },

      fontSize: {
        '2.5xl': '1.6rem',
        0.8: '0.8rem',
        xxs: '0.6rem',
        micro: '0.4rem',
        nano: '0.2rem',
      },
      zIndex: {
        0: 0,

        10: 10,

        20: 20,

        30: 30,

        40: 40,

        50: 50,

        25: 25,

        50: 50,
        60: 60,

        75: 75,

        100: 100,
        200: 200,
        300: 300,
        auto: 'auto',
      },
      colors: {
        primary: '#1565d8',
        secondary: '#228B22',
        dark: '#0d2436',
      },
      radialGradientColors: {
        // defaults to {}
        'blue-blue': ['#0171BA', '#005a94'],
        'lb-lb': ['#3776dd', '#215dc0'],
      },
      animation: {
        spin5s: 'spin5s 5s linear infinite',
        spin3d: 'spin3d 6s linear infinite ',
        bounceRight: 'bounceRight 1s  cubic-bezier(0.8, 0, 1, 1) infinite',
        bounceDown: 'bounceDown 1s  cubic-bezier(0.8, 0, 1, 1) infinite',
        slideRight: 'slideRight 150ms ease-in-out',
        slideToRight: 'slideToRight 150ms ease-in-out',
        slideLeft: 'slideLeft 150ms ease-in-out',
        slideLeft500: 'slideLeft 500ms ease-in-out',
        slideToLeft: 'slideToLeft 150ms ease-in-out',
        slideRightReverse: 'slideRightReverse 150ms ease-in-out ',
        fadeIn: 'fadeIn 150ms ease-in-out',
        fadeOut: 'fadeOut 150ms ease-in',
        highlight: 'highlight 150ms ease-in',
        slideDown: 'slideDown 300ms ease-in-out',
        tripleHighlight: 'tripleHighlight 1000ms ease',
      },
      keyframes: {
        spin5s: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        tripleHighlight: {
          '0%': {
            opacity: '1',
            filter: 'saturate(130)',
          },
          '16%': {
            opacity: '0.3',
          },
          '33%': {
            opacity: '1',
            filter: 'saturate(130)',
          },
          '52%': {
            opacity: '0.3',
          },
          '66%': {
            opacity: '1',
            filter: 'saturate(130)',
          },
          '83%': {
            opacity: '0.3',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        spin3d: {
          '0%': {
            transform: 'perspective(1000px) rotateY(0deg)',
            filter: 'brightness(100%)',
          },
          '25%': { filter: 'brightness(60%)' },
          '50%': {
            filter: 'brightness(100%)',
          },
          '75%': { filter: 'brightness(60%)' },
          '100% ': {
            transform: 'perspective(1000px) rotateY(360deg)',
            filter: 'brightness(100%)',
          },
        },
        bounceRight: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideToRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideRightReverse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideToLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        highlight: {
          '0%': { background: '#df0052', color: '#fff' },
          '100%': {},
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          //390
          '@screen sm': {
            maxWidth: '390px',
          },
          //640
          '@screen smp': {
            maxWidth: '640px',
          },
          //768
          '@screen md': {
            maxWidth: '768px',
          },
          //1024
          '@screen lg': {
            maxWidth: '1024px',
          },
          //1280
          '@screen xl': {
            maxWidth: '1268px',
          },
          //1280
          '@screen 2xl': {
            maxWidth: '1268px',
          },
        },
        '.container2': {
          maxWidth: '100%',
          //390
          '@screen sm': {
            maxWidth: '390px',
          },
          //640
          '@screen smp': {
            maxWidth: '640px',
          },
          //768
          '@screen md': {
            maxWidth: '640px',
          },
          //1024
          '@screen lg': {
            maxWidth: '768px',
          },
          //1280
          '@screen xl': {
            maxWidth: '1118px',
          },
          //1280
          '@screen 2xl': {
            maxWidth: '1118px',
          },
        },
      })
    },
  ],
}
