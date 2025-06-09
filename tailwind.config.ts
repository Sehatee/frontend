import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

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
        orangColor: "#FF5F0F",
      },
      screens: {
        xs: "330px",
        s: "400px",
        m: "520px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
