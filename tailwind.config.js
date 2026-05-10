/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        voltage: {
          bg: "#050712",
          panel: "#0c1020",
          cyan: "#45eaff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ff4d8d"
        }
      },
      boxShadow: {
        glow: "0 0 50px rgba(69, 234, 255, 0.18)",
        card: "0 24px 80px rgba(0,0,0,.45)"
      }
    },
  },
  plugins: [],
};
