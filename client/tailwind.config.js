module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', 'Noto Sans TC', 'sans-serif'],
      },
      colors: {
        primary: {
          100: "#d4d4d7",
          200: "#a9aaaf",
          300: "#7e7f86",
          400: "#53555e",
          500: "#282a36",
          600: "#20222b",
          700: "#181920",
          800: "#101116",
          900: "#08080b"
        },
      }
    },
  },
  plugins: [],
}
