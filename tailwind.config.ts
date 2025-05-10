import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0B62DE",
        secondary: "#E1ECFB",
        textSecondary: "#868686",
        bg: "#F4F7FD",
        ft: "#2F2F2F",
        ft2: "#868686",
        primary: "#D5E4F980",
        backgroundDashboards: "#F4F7FD",
      },
      screens: {
        xs: "330px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      animation: {
        "zoom-in": "zoomIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
