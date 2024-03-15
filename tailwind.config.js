/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '5rem',
      },
    },
    extend: {
      colors: {
        primary: '#117453',
        light: '#e8f2ee',
      },
    },
  },
  plugins: [],
};
