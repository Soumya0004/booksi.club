/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [   
  ],
}
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // Adjust based on your project structure
  theme: {
    extend: {
      colors: {
        customBlue: "#1e2e47",
      },
    },
  },
  plugins: [],
};


