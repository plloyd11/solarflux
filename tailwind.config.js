// tailwind.config.js
module.exports = {
  purge: [
    './site/**/*.njk',
    './site/*.njk',
    './site/includes/components/*.njk',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Merriweather', 'serif'],
      },
      colors: {
        cyan: '#9cdbff',
        primaryPurple: '#16134C',
        primaryOrange: '#F04822',
        primaryOrangeDark: '#E2421D',
        primaryPurpleDark: '#1F1E33',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      },
      width: {
        '78': '20rem'
      },
      screens: {
        '2xl': '1440px',
        '3xl': '1680px'
      },
      zIndex: {
        '1000': 1000
      },
      maxWidth: {
        'max-w-screen-body': '1680px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui')
  ],
}