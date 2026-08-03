import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "oklch(0.52 0.165 256)",      // deep trustworthy blue (was #0B62DE)
        mainLight: "oklch(0.62 0.13 256)",  // was #3D87F2
        secondary: "oklch(0.95 0.02 256)",  // pale blue surface (was #E1ECFB)
        bg: "oklch(0.985 0.004 256)",       // near-white, blue tint (was #F4F7FD)
        ft: "oklch(0.23 0.025 256)",        // near-black ink, blue tint (was #2F2F2F)
        ft2: "oklch(0.55 0.03 256)",        // tinted gray (was #868686)
        textSecondary: "oklch(0.55 0.03 256)", // tinted gray (was #868686)
        accent: "oklch(0.68 0.18 30)",      // warm coral (refines #FF5F0F)
        cream: "oklch(0.97 0.012 90)",      // warm cream surface
        star: "oklch(0.8 0.16 85)",         // golden star rating
        primary: "#D5E4F980",               // unchanged
        backgroundDashboards: "oklch(0.985 0.004 256)",
        orangColor: "oklch(0.68 0.18 30)",
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
    },
  },
  plugins: [scrollbar],
} satisfies Config;
