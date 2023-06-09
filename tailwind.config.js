/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  // darkMode: media,
  theme: {
    extend: {

    },
  },
  plugins: [plugin(function ({ addUtilities }) {
    addUtilities({
      // '.items-space-between': {
      //   alignItems: 'space-between',
      // }
    })
  })],
}