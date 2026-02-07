import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Legal Ink" primary palette
        ink: {
          50: "#e8edf4",
          100: "#c5d1e3",
          200: "#9fb3d0",
          300: "#7994bc",
          400: "#5c7dae",
          500: "#3f669f",
          600: "#335590",
          700: "#25437d",
          800: "#002244", // Primary "Legal Ink"
          900: "#001729",
          950: "#000e1a",
        },
        // Keep brand for backwards compat (map to ink)
        brand: {
          50: "#e8edf4",
          100: "#c5d1e3",
          200: "#9fb3d0",
          300: "#7994bc",
          400: "#5c7dae",
          500: "#3f669f",
          600: "#002244",
          700: "#001e3d",
          800: "#001729",
          900: "#000e1a",
          950: "#000e1a",
        },
        // Paper surfaces
        paper: {
          white: "#FAFAFA",
          warm: "#F9F8F6",
          cream: "#F5F4F0",
          muted: "#EDECE8",
        },
        // Highlight accents (lawyer markup)
        highlight: {
          yellow: "#FDFFB6",
          "yellow-strong": "#FDE68A",
          peach: "#FFD7BA",
          "peach-strong": "#FDBA74",
        },
        // Semantic
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        surface: {
          0: "#ffffff",
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        serif: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Serif display sizes
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        display: [
          "3.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-sm": [
          "2.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        // Sans headings
        "heading-lg": [
          "1.5rem",
          { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        heading: [
          "1.25rem",
          { lineHeight: "1.4", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["0.9375rem", { lineHeight: "1.7" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        paper:
          "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 4px 12px -2px rgb(0 0 0 / 0.04)",
        elevated:
          "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        float:
          "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 10px -6px rgb(0 0 0 / 0.04)",
        "paper-lg":
          "0 4px 16px -2px rgb(0 0 0 / 0.08), 0 1px 4px -1px rgb(0 0 0 / 0.04)",
        document:
          "0 25px 50px -12px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.03)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.3s ease-out",
        "scan-line": "scanLine 2.5s ease-in-out infinite",
        "count-up": "countUp 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "reveal": "reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scanLine: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
