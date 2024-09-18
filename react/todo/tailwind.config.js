/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        secondary: "#00ff00",
        tertiary: "#0000ff",
      },
      screens: {
        xl: "1290px",
      },
    },
  },
  plugins: [],
};
