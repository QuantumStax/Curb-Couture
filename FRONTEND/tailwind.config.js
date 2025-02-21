/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_2: "#EEEEEE",
        secondary_2: "#222831",
        secondary_light: "#3f3f3f",
        tertiary: "#2C3E50",
        banner_2: "#7A1CAC",
        brand: "#31363F",
        "bg-main": "#111418",
        "text-main": "#403F2B",
        "cupon-bg": "#9ACBD0",
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
        itim: ["Itim", "serif"],
        fraunces: ["Fraunces", "serif"],
        Outfit: ["Outfit", "serif"],
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        'bleeding-cowboys': ['"Bleeding_Cowboys"', 'sans-serif'],
        'Roman-SD': ['Roman SD', 'sans-serif'],
        '911porschav33d': ['"911porschav33d"', 'sans-serif'],
        '911porschav3title': ['"911porschav3title"', 'sans-serif'],
        '911porschav3laser': ['"911porschav3laser"', 'sans-serif'],
        '911porschav3expand': ['"911porschav3expand"', 'sans-serif'],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      fontSize: {
        "hero-head": "12rem",
      },
    },
  },
  plugins: [tailwindScrollbar],
};

// pallet - 1

// primary = "2C3E50"  -> Main text, headers, branding elements - dark
// secondary = "ECF0F1" -> Backgrounds, sections - light blue-white
// tertiary = "E74C3C" -> Primary buttons, call-to-action elements - red light
// accent = "3498DB" -> Links, hover effects, secondary buttons - sky blue

// pallet - 2

// primary = "1E1E1E"  -> Text, headers, logo, navbar - darker
// secondary = "F5F5F5" -> Background, product cards, sections - whitish
// tertiary = "FF6B6B" -> Buttons (Buy Now, Add to Cart), CTA elements - ligher redish
// accent = "007AFF" -> Links, hover effects, secondary buttons - darker sky blue

// Alex recomended

// #F2EFE7 - white with tone
// #9ACBD0 - green bluish tone
// #48A6A7 - dark green bluish tone
// #2973B2 - dark bluish tone

// boss recomended

// #000957
// #344CB7
// #577BC1
// #578E7E

// Poster related colors - Alex
// #E6F52E
// #343434
// #DADADA
