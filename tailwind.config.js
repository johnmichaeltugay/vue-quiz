/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'black'
      },
      fontFamily: {
        primary: "'Noto Sans', sans-serif"
      }
    }
  },
  plugins: []
}
