/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        white: "#ffffff",
        offwhite: "#f6f6f6",
        primary: "#fc5185",
        secondary: "#ffe8ef",
        accent: "#ff0055",
        black: "#0e0e0c",
        lightgrey: "#a1a1a1",
        darkgrey: "#757575",
      },
      fontSize: {
        clamp1: "clamp(32px, 7vw ,40px)",
        clamp2: "clamp(24px, 5vw ,32px)",
        clamp3: "clamp(18px, 4vw ,24px)",
        clamp4: "clamp(16px, 3vw ,20px)",
        clamp5: "clamp(10px, 7vw ,16px)",
      },
      
    },
  },
  plugins: [
    
  ],
};

