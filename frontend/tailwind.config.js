/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3f9',
          100: '#cce7f3',
          200: '#99cfE7',
          300: '#66b7db',
          400: '#339fcf',
          500: '#3C8DBC', // primary blue
          600: '#2f71a3',
          700: '#235480',
          800: '#17385c',
          900: '#0c1c2e',
        },
        success: {
          DEFAULT: '#28A745',
          light: '#48c764',
          dark: '#1e7e34',
        },
        warning: {
          DEFAULT: '#FFC107',
          light: '#ffcd39',
          dark: '#d39e00',
        },
        danger: {
          DEFAULT: '#DC3545',
          light: '#e45c6a',
          dark: '#bd2130',
        },
        background: '#F7F9FA',
        text: '#333333',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '100': '25rem',
        '120': '30rem',
      },
      boxShadow: {
        'card': '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 10px 0 rgba(0, 0, 0, 0.09)',
      }
    },
  },
  plugins: [],
};