/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7f4',
          100: '#d6ede3',
          200: '#a8d5be',
          300: '#73b89a',
          400: '#449b77',
          500: '#2d7d5c',
          600: '#226347',
          700: '#1B4D35',   // forest green — primary
          800: '#163d2b',
          900: '#0f2e1f',
          950: '#081a12',
        },
        accent: {
          50:  '#fdf2ee',
          100: '#f9ddd4',
          200: '#f3b8a4',
          300: '#eb8f74',
          400: '#e36b4a',
          500: '#D9502C',   // terracotta — CTAs & highlights
          600: '#b8401e',
          700: '#953218',
          800: '#722614',
          900: '#501b0e',
        },
        cream: {
          50:  '#fdfaf5',
          100: '#f8f3e8',   // main page bg
          200: '#ede4d0',
          300: '#ddd0b6',
        },
        forest: {
          900: '#0d2318',
          950: '#071410',
        }
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
      },
    },
  },
  plugins: [],
}
