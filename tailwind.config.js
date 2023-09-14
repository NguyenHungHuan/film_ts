/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    container: false
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        heading1: ['Merriweather', 'serif']
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1376px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      })
    }
  ]
}
