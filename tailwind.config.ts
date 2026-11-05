import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        border: "#303030",
        // Custom monochromatic surfaces
        surface: {
          base: "#000000",
          secondary: "#0A0A0A",
          card: "#111111",
          elevated: "#181818",
          subtle: "#202020",
        },
        // Monochromatic UI text tokens
        mono: {
          primary: "#FFFFFF",
          secondary: "#D0D0D0",
          muted: "#999999",
          faint: "#666666",
        },
        // Monochromatic border tokens
        stroke: {
          primary: "#303030",
          secondary: "#444444",
          faint: "#222222",
        },
        // Re-mapped navy shades to pure elegant dark surfaces
        navy: {
          950: "#000000",
          900: "#0A0A0A",
          850: "#111111",
          800: "#181818",
          700: "#222222",
          600: "#303030",
        },
        // Animation accent palette (reserved strictly for animations, charts, 3D)
        anim: {
          ice: "#75D7FF",
          violet: "#A78BFA",
          silver: "#C0C0C0",
          white: "#F5F5F5",
          lavender: "#8B80B8",
          gray: "#777777",
        },
        // Electric mapped to tasteful grayscale in UI, or subtle animation accents
        electric: {
          cyan: "#75D7FF",
          blue: "#38bdf8",
          violet: "#A78BFA",
          purple: "#c084fc",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid":
          "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 20px -4px rgba(255, 255, 255, 0.12)",
        "glow-violet": "0 0 20px -4px rgba(167, 139, 250, 0.2)",
        "glow-ice": "0 0 20px -4px rgba(117, 215, 255, 0.2)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
