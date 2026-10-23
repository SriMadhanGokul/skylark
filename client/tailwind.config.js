export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        love: ['"Dancing Script"', 'cursive'],
      },
      colors: { gold: '#e8a020', ink: '#111111', cream: '#fbf6f0', footer: '#141414' },
    },
  },
  plugins: [],
};
