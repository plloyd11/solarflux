// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Merriweather', 'serif'],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    zIndex: {
      'max': 10000
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
        primaryPurple: '#16134C',
        primaryOrange: '#F04822',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      },
      width: {
        '78': '20rem'
      }
    },
    plugins: [
      require('@tailwindcss/ui')
    ],
  }
}