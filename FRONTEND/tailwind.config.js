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
        "secondary": "#C4C197",
        "tertiary": "#DDDDCC",
        "banner": "#E8E59B",
        "text-main": "#403F2B"
      },
      fontFamily: {
        "poppins": ['Poppins', 'serif'],
        "itim": ['Itim', 'serif'],
        "fraunces": ['Fraunces', 'serif']
      },
      fontSize: {
        "hero-head": "12rem"
      }
    },
  },
  plugins: [],
}