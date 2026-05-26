import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        background: "hsl(var(--color-background) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        text: {
          DEFAULT: "hsl(var(--color-text) / <alpha-value>)",
          muted: "hsl(var(--color-text-muted) / <alpha-value>)",
          subtle: "hsl(var(--color-text-subtle) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        neo: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        "neo-sm": "8px 8px 24px #bebebe, -8px -8px 24px #ffffff",
        "neo-inset": "inset 4px 4px 12px #bebebe, inset -4px -4px 12px #ffffff",
        soft: "0px 20px 50px rgba(9, 17, 106, 0.06)",
        card: "0px 4px 20px rgba(29, 41, 57, 0.05), 0px 1px 2px rgba(29, 41, 57, 0.03)",
        "glow-blue": "0 0 24px rgba(108, 122, 224, 0.4)",
        "glow-sm": "0 0 12px rgba(108, 122, 224, 0.2)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1500": "1500ms",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
