import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';
import {
  backgroundImage,
  borderWidth,
  colors,
  container,
  fontSize,
  radius,
  screens,
} from './src/themes';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      backgroundImage,
      colors,
      container,
      fontSize,
      screens,
      fontFamily: {
        inter: ['var(--font-inter)'],
        'plus-jakarta-sans': ['var(--font-plus-jakarta-sans)'],
        outfit: ['var(--font-outfit)'],
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius,
        borderWidth,
      },
      themes: {
        light: {
          colors: {
            background: {
              100: colors['black-violet'].light,
              200: colors['purple-shiny'].light,
              300: colors.purple,
              400: colors.white,
            },
            foreground: colors.neutral.light,
            primary: {
              100: colors.black,
              200: colors.stone.light,
              300: colors.gray.light,
            },
            secondary: {
              100: colors.sky.light,
              200: colors.blue,
              300: colors.emerald,
              400: colors.link.light,
              500: colors.everglade,
            },
            success: colors.everglade,
            warning: colors.yellow.light,
            danger: {
              100: colors.red.light,
              200: colors.orange,
              300: colors.red.light,
            },
            content1: colors.white,
            default: colors.white,
          },
        },
        dark: {
          colors: {
            background: {
              100: colors['black-violet'].dark,
              200: colors['purple-shiny'].dark,
              300: colors.purple,
              400: colors['black-purple'],
            },
            foreground: colors.neutral.dark,
            primary: {
              100: colors.white,
              200: colors.stone.dark,
              300: colors.gray.dark,
            },
            secondary: {
              100: colors.sky.dark,
              200: colors.blue,
              300: colors.emerald,
              400: colors.link.dark,
              500: colors.green,
            },
            success: colors.green,
            warning: colors.yellow.dark,
            danger: {
              100: colors.red.dark,
              200: colors.orange,
              300: colors['bubble-gum'],
            },
            content1: colors.white,
            default: colors.black,
          },
        },
      },
    }),
  ],
};
export default config;
