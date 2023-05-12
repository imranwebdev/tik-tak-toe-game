/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
      customBlue: '#006BE8',
      customBlueLight:'#2C8DFF',
      customGreen:'#27FF30'
    },
   },
  },
  plugins: [],
}
