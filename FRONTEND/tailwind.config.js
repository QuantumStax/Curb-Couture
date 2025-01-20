/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FEFAF0",
        "banner": "#E8E59B"
      },
      fontFamily: {
        "poppins": ['Poppins', 'serif'],
        "itim": ['Itim', 'serif'],
        "fraunces": ['Fraunces', 'serif']
      }
    },
  },
  plugins: [],
}