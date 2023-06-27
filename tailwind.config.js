/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: media,
  theme: {
    extend: {
      backgroundImage: {
        radial: 'radial-gradient(transparent 1px, #fff 1px);',
      },
      backgroundSize: {
        '4px': '4px 4px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({})
    }),
  ],
}
