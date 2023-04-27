/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#2C3639',
        'secondary': '#3F4E4F',
        'secondary2': '#A27B5C',
        'secondary3': '#DCD7C9',
      },

      container: {
        padding: {
          DEFAULT: '1.25rem',
          sm: '2rem',
          md: '2.25rem',
          lg: '2.5rem',
          xl: '12rem',
        //   '2xl': '6.5rem',
        },
      },
    },
  },
  plugins: [],
}

