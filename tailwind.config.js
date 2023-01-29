/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#181D31",
        teal: "#678983",
        beige: "#E6DDC4",
        lightBeige: "#F0E9D2",
        orange: "#FC6B3F",
      },
      borderRadius: {
        10: "10px"
      },
      fontFamily:{
        title: ["'Black Han Sans'", "sans-serif"]
      }
    },
  },
  plugins: [],
}