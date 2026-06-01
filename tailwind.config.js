/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        matrix: {
          DEFAULT: '#00ff41',
          dark: '#003B00',
          light: '#00FF66',
          bg: '#0D0D0D'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}
