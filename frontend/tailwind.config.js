/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        themeColor: '#101726',
        themeColor2: '#2563EB'
      }
    },
  },
  plugins: [],
}
