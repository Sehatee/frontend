import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgb(var(--color-main) / <alpha-value>)",
        mainLight: "rgb(var(--color-mainLight) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ft: "rgb(var(--color-ft) / <alpha-value>)",
        ft2: "rgb(var(--color-ft2) / <alpha-value>)",
        textSecondary: "rgb(var(--color-textSecondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        star: "rgb(var(--color-star) / <alpha-value>)",
        primary: "#D5E4F980",
        backgroundDashboards: "rgb(var(--color-bg) / <alpha-value>)",
        orangColor: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "El Messiri", "Cairo", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Readex Pro", "Cairo", "system-ui", "sans-serif"],
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
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
