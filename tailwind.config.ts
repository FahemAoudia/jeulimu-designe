import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ju: {
          orange: "#FF6A00",
          yellow: "#FFC300",
          electric: "#00AEEF",
          deep: "#0066FF",
          green: "#39FF14",
          magenta: "#FF2D95",
          purple: "#7B2CFF",
          bgPurple: "#0D0221",
          midnight: "#050A30",
          space: "#02020F",
          cyanGlow: "#00F5FF",
          pinkGlow: "#FF00E5",
          limeGlow: "#66FF00",
          purpleGlow: "#A259FF",
          white: "#FFFFFF",
          soft: "#EAEAEA",
          muted: "#A0A0A0",
        },
        neon: {
          cyan: "#00F5FF",
          magenta: "#FF00E5",
          purple: "#7B2CFF",
          blue: "#00AEEF",
          pink: "#FF2D95",
        },
        void: {
          DEFAULT: "#050A30",
          soft: "#0D0221",
          deep: "#02020F",
        },
      },
  fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan":
          "0 0 20px rgba(0, 245, 255, 0.45), 0 0 60px rgba(0, 174, 239, 0.12)",
        "neon-magenta":
          "0 0 24px rgba(255, 0, 229, 0.5), 0 0 70px rgba(255, 45, 149, 0.15)",
        "neon-purple":
          "0 0 20px rgba(123, 44, 255, 0.45), 0 0 50px rgba(162, 89, 255, 0.15)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.45)",
        "btn-brand":
          "0 0 28px rgba(255, 0, 229, 0.45), 0 0 56px rgba(123, 44, 255, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-overlay":
          "linear-gradient(105deg, rgba(5,10,48,0.5) 0%, rgba(13,2,33,0.28) 38%, transparent 72%)",
        "brand-bg":
          "linear-gradient(165deg, #050A30 0%, #0D0221 52%, #02020F 100%)",
        "btn-book": "linear-gradient(90deg, #FF2D95 0%, #7B2CFF 100%)",
      },
      animation: {
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
