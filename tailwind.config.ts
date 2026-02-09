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
        // Frame & panel system
        frame: "#0d0d0d",
        panel: {
          DEFAULT: "#dce4e9",
          alt: "#cdd6dc",
          dark: "#0d0d0d",
        },
        // Accent colors
        coral: {
          DEFAULT: "#ff9e80",
          50: "#fff5f0",
          100: "#ffe8dd",
          200: "#ffd4c0",
          300: "#ffb89e",
          400: "#ff9e80",
          500: "#e8845f",
          600: "#c66a42",
        },
        ice: {
          DEFAULT: "#a8cce0",
          50: "#eef5fa",
          100: "#d4e8f2",
          200: "#a8cce0",
          300: "#7cb0ce",
          400: "#5094bc",
        },
        // Ink (keep for backwards compat on inner pages during transition)
        ink: {
          50: "#e8edf4",
          100: "#c5d1e3",
          200: "#9fb3d0",
          300: "#7994bc",
          400: "#5c7dae",
          500: "#3f669f",
          600: "#335590",
          700: "#25437d",
          800: "#002244",
          900: "#001729",
          950: "#000e1a",
        },
        // Warm marketing palette (landing page)
        navy: {
          DEFAULT: "#1a2744",
          50: "#f0f3f8",
          100: "#d6dde8",
          200: "#94a3b8",
          700: "#1e3554",
          800: "#1E293B",
          900: "#0F172A",
        },
        gold: {
          DEFAULT: "#F59E0B",
          50: "#fdf8ef",
          100: "#f8edcc",
          200: "#f0d994",
          300: "#FBBF24",
          400: "#F59E0B",
          500: "#D97706",
          600: "#B45309",
        },
        // Semantic
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
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        mono: ["Courier New", "Courier", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display sizes
        "display-xl": [
          "4.5rem",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        display: [
          "3rem",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        "display-sm": [
          "2.25rem",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        // Score/number display
        "score-xl": [
          "5rem",
          { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "700" },
        ],
        score: [
          "2.5rem",
          { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        // Headings
        "heading-lg": [
          "1.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        heading: [
          "1.125rem",
          { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        // Section labels (uppercase)
        label: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "700" },
        ],
        // Body
        "body-lg": ["1.0625rem", { lineHeight: "1.4" }],
        body: ["0.9375rem", { lineHeight: "1.4" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.4" }],
        caption: ["0.6875rem", { lineHeight: "1.4" }],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        subtle: "none",
        card: "none",
        paper: "none",
        elevated: "none",
        float: "none",
        "paper-lg": "none",
        document: "none",
        sharp: "none",
        "sharp-sm": "none",
        "premium-glow": "none",
      },
      gap: {
        frame: "4px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.2s ease-out",
        "scan-line": "scanLine 2.5s ease-in-out infinite",
        "count-up": "countUp 1s cubic-bezier(0.16, 1, 0.3, 1)",
        reveal: "reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        odometer: "odometer 0.15s ease-out",
        "bridge-fill":
          "bridgeFill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
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
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 8px 2px rgb(255 158 128 / 0.3)",
          },
          "50%": { boxShadow: "0 0 20px 6px rgb(255 158 128 / 0.5)" },
        },
        odometer: {
          "0%": {
            opacity: "0",
            transform: "translateY(-100%)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        bridgeFill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
