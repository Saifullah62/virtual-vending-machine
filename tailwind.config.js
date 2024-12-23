/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#df4630',
          light: '#e66d5c',
          dark: '#b33826',
        },
        secondary: {
          DEFAULT: '#0047ab',
          light: '#0056ce',
          dark: '#003888',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neon': '0 0 20px rgba(223, 70, 48, 0.5)',
        'glow': '0 0 20px rgba(0, 71, 171, 0.5)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metal': 'linear-gradient(145deg, #f5f5f5, #e6e6e6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};