/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pccOrange: '#f58220',
        pccMaroon: '#b03011',
      },
    },
  },
  plugins: [],
}
