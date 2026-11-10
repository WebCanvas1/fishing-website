/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071C2C',
          50: '#E8EEF2',
          100: '#C5D3DD',
          800: '#0B2A40',
          900: '#071C2C',
        },
        ocean: {
          DEFAULT: '#0077A8',
          600: '#006290',
          500: '#0077A8',
          100: '#D6EBF4',
        },
        teal: {
          DEFAULT: '#00A7A0',
          500: '#00A7A0',
          100: '#CCEFED',
        },
        mist: '#F7F9FA',
        charcoal: '#17232D',
        coral: {
          DEFAULT: '#FF7A30',
          600: '#E8641C',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slow-zoom': 'slow-zoom 12s ease-out both',
      },
    },
  },
  plugins: [],
};
