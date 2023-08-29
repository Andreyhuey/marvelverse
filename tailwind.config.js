/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
  },
  plugins: ["@babel/plugin-proposal-private-property-in-object"],
};
