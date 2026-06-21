/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        'bg-near': '#070707',
        'bg-surface': '#111111',
        'text-primary': '#F5F5F2',
        'text-muted': 'rgba(255,255,255,0.55)',
        'text-dim': 'rgba(255,255,255,0.3)',
        'purple': '#8B5CF6',
        'purple-deep': '#6D28D9',
        'violet': '#7C3AED',
        'gold': '#C9A96E',
      },
      fontFamily: {
        'serif': ['Instrument Serif', 'Georgia', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
