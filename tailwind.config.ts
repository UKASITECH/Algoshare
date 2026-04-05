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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
        pixel: ["VT323", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      animation: {
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s step-end infinite",
        "flicker": "flicker 0.15s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "typing-cursor": "typing-cursor 0.75s step-end infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.98" },
        },
        "glow-pulse": {
          "0%, 100%": { textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3)" },
          "50%": { textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)" },
        },
        "typing-cursor": {
          "0%, 100%": { borderRightColor: "#ffffff" },
          "50%": { borderRightColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
