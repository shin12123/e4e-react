/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#161a16",
        paper: "#f1efe8",
        lime: "#a7ff4f",
        moss: "#29412f",
        line: "#d3d4ca"
      }
    }
  },
  plugins: []
};
