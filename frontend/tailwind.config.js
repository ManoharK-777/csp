/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0a2240',      // Deep Navy for headers & primary elements
          blue: '#1565c0',      // Royal Blue for buttons and active items
          lightBlue: '#f0f6fc',  // Soft light gray-blue background
          accent: '#e65100',    // Clean orange/saffron accent
          gold: '#c5a059',      // Premium border gold
          slate: '#475569',     // Text gray
          darkbg: '#0f172a',    // Dark mode background
          darkcard: '#1e293b'   // Dark mode card background
        }
      }
    },
  },
  plugins: [],
}
