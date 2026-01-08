/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in-left': 'fadeInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in-right': 'fadeInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(20, 184, 166, 0.3), 0 0 30px rgba(20, 184, 166, 0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(20, 184, 166, 0.5), 0 0 50px rgba(20, 184, 166, 0.2), 0 0 75px rgba(59, 130, 246, 0.2)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(20, 184, 166, 0.4)',
        'glow-lg': '0 0 40px rgba(20, 184, 166, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
};
