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

// pallet - 1

// primary = "2C3E50"  -> Main text, headers, branding elements
// secondary = "ECF0F1" -> Backgrounds, sections
// tertiary = "E74C3C" -> Primary buttons, call-to-action elements
// accent = "3498DB" -> Links, hover effects, secondary buttons

// pallet - 2

// primary = "1E1E1E"  -> Text, headers, logo, navbar
// secondary = "F5F5F5" -> Background, product cards, sections
// tertiary = "FF6B6B" -> Buttons (Buy Now, Add to Cart), CTA elements
// accent = "007AFF" -> Links, hover effects, secondary buttons