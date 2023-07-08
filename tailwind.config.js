const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    // Add more here
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#3a405a",
        primary: "#436484",
        primaryLight: "#00a6b6",
        secondary: "#de9b2a",
        secondaryDark: "#554734",
        accent: "#d4cac1",
        accentLight: "#f1e9d6",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
    },
  },
});
