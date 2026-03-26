/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-bg': '#1a1a1a',
        'win-accent': '#0067c0',
        'win-btn': 'rgba(255, 255, 255, 0.05)',
        'win-btn-hover': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}