/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#4f46e5",
        brandLight: "#6366f1",
        brandDark: "#3730a3",
        accent: "#10b981",
        bg: "#f9fafb",
        surface: "#3730a3",
        text: "#111827",
        textMuted: "#6b7280",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
