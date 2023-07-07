/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
  important: true,
}
