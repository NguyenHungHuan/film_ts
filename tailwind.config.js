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
        display: ['Oswald', 'sans-serif']
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1344px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      })
    }
  ]
}
