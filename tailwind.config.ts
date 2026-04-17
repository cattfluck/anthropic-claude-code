import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mountain: {
          dark: '#0f172a',
          mid: '#1e293b',
          light: '#334155',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
