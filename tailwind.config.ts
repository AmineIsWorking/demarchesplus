import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2B6B",
          light: "#162552",
          dark: "#0B1E3D",
        },
        marianne: {
          red: "#E63030",
          cream: "#F8F5EE",
        },
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
      },
      animation: {
        pulse: "pulse 2s infinite",
        bounce: "bounce 1.2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
