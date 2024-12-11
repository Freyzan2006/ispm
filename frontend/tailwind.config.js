/** @type {import('tailwindcss').Config} */



module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx,jsx,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'my-box': '2px 0px 40px 11px rgba(0,0,0,0.59)',
      }
    },
  },
  safelist: [
    
  ],
  plugins: [],
}