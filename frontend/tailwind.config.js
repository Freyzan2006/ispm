/** @type {import('tailwindcss').Config} */



module.exports = {
  mode: "jit",
  // purge: [],
  content: [
    // "./app/src/**/*.{html,js,tsx,jsx,ts}",
    // "./app/public/index.html",
    "./app/dist/**/*.{html,js,tsx,jsx,ts}",  
    "./src/**/*.{html,js,tsx,jsx,ts}",
    "./public/index.html",

    "./src/**/*.module.scss",
    
    
  ],
 
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'my-box': '2px 0px 40px 11px rgba(0,0,0,0.59)',
      },

      colors: {
        primary: {
          light: '#f0e68c', // Цвет для дневной темы
          dark: '#556b2f',  // Цвет для ночной темы
        },

      },
      textColor: {
        'light-text': '#333',
        'dark-text': '#f0f0f0',
      },
    },
    
    
  },
  safelist: [
    "bg-red-600",
    "bg-yellow-500",
    "bg-sky-500",
    "rounded-2xl",
    "hover:scale-105",
    "text-white",
    "gap-3",
    "transition",
    "pl-4",
    "pr-4",
    "pt-2",
    "pb-2",
    "shadow-sky-500/50",
    "shadow-lg",
    "flex",
    "dark:text-white",
    "text-black",
    "bg-green-300",
    "dark:bg-slate-900",
    "dark:bg-sky-500"
  ],
  plugins: [],
}