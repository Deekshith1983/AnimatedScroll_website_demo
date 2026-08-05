/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5EF', // Primary canvas background
        travertine: '#F2ECE3', // Section break background
        sand: '#ECE4D7', // Highlight blocks background
        limestone: '#FAF8F4', // Card background
        espresso: '#2E241C', // Primary typography text
        warmGrey: '#6F6358', // Secondary typography text
        bronze: '#B68A52', // Champagne Bronze accent
        brass: '#C5A46D', // Soft Brass fixture accent
        brassHover: '#D4B37A', // Hover accent
        charcoal: '#1C1C1C', // legacy / loading text if any
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        luxury: '0.22em',
        editorial: '0.08em',
      },
      boxShadow: {
        luxury: '0 30px 80px rgba(132, 100, 70, 0.12)',
      },
      borderColor: {
        luxuryBorder: 'rgba(46, 36, 28, 0.08)',
      }
    },
  },
  plugins: [],
}
