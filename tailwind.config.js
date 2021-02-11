module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        infoMenuColor: {
          DEFAULT: '#f0f0f0',
        },
        infoMenuBg: {
          light: '#202020',
          DEFAULT: '#101010',
          dark: '#080808',
        },
      },
      keyframes: {
        progressBar: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
