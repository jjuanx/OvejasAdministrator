/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: 'rgb(131,54,73)',  dark: 'rgb(106,33,52)' },
        secondary: { DEFAULT: 'rgb(28,124,153)', dark: 'rgb(22,102,126)' },
        teal:      { DEFAULT: '#059f94',         dark: '#047a71' },
        cream:     '#fff9f0',
        card:      '#fff4cc',
      },
    },
  },
  plugins: [],
}
