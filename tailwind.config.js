/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./views/**/*.ejs", // Path to your EJS templates
    "./public/**/*.js", // Path to your JS files (if you use Tailwind classes in JS)
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // If you are using Flowbite components
  ],
}
