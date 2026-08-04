/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // deep charcoal
        primary: '#ffffff',
        secondary: '#a1a1aa',
        accent: '#c5a880', // champagne gold
        luxuryGold: '#d4af37',
        ivory: '#fdfbf7', // warm ivory
        stone: '#f4f3ef', // stone white
        beige: '#eae6df', // natural beige
        bronze: '#8c7861', // muted bronze
        charcoal: '#121212', // matte black/dark charcoal
        sand: '#e5ded4', // soft sand
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        editorial: '0.08em',
      },
    },
  },
  plugins: [],
}
