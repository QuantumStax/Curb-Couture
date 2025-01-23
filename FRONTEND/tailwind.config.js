/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FEFAF0",
        secondary: "#C4C197",
        tertiary: "#DDDDCC",
        banner: "#E8E59B",
        brand: "#FFFCE6",
        "text-main": "#403F2B",
        "cupon-bg": "#FCE2E1",
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
        itim: ["Itim", "serif"],
        fraunces: ["Fraunces", "serif"],
      },
      fontSize: {
        "hero-head": "12rem",
      },
    },
  },
  plugins: [tailwindScrollbar],
};
