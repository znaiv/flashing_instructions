/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      colors: {
        voltage: {
          bg: "#080706",
          panel: "#11100d",
          surface: "#1a1814",
          gold: "#e8b923",
          "gold-light": "#f5d547",
          "gold-bright": "#ffe566",
          amber: "#f59e0b",
          bronze: "#a67c00",
          ember: "#d97706",
          muted: "#8a8272",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(232, 185, 35, 0.22)",
        "glow-sm": "0 0 24px rgba(232, 185, 35, 0.14)",
        card: "0 24px 80px rgba(0, 0, 0, 0.5)",
        inner: "inset 0 1px 0 rgba(255, 229, 102, 0.08)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ffe566 0%, #e8b923 45%, #d97706 100%)",
        "gold-shine": "linear-gradient(135deg, rgba(255,229,102,0.15) 0%, transparent 50%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
