// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ],
// };

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths as needed
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
