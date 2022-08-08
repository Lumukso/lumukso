/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html,css}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'magic-purple': '#5850EC',
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
