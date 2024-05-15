/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF6D00',
        offwhite: '#F8F8F8',
        dark: '#333333',
      },
    },
  },
  plugins: [],
}
