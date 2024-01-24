/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      dangerous: "#AB002A",
      dark: "#0D47A1",
      primary_dark: "#FFFFFF",
      secondly: "#6DFACD",
    },

    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
