/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.9,
            transform: 'scale(1.05)',
          },
        },
        glow: {
          from: {
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff',
          },
          to: {
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff',
          },
        },
      },
    },
  },
  plugins: [],
};