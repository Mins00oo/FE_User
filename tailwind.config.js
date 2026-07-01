/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // shopper.dc.html theme tokens
        bg: '#FBFAF7',
        card: '#FFFFFF',
        soft: '#F5EFE6',
        ink: '#28231D',
        muted: '#948C81',
        line: '#ECE6DC',
        accent: '#E4572E',
        accentSoft: 'rgba(228,87,46,.09)',
        // helper tone used in original for secondary body text
        body: '#6b6355',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        hsFade: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        hsEq: {
          '0%,100%': { transform: 'scaleY(.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        hsPulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '.3' },
        },
        hsPop: {
          '0%': { transform: 'scale(.7)' },
          '60%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        hsBadge: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        hsFade: 'hsFade .28s ease',
        hsFadeFast: 'hsFade .2s ease',
        hsEq: 'hsEq .9s ease-in-out infinite',
        hsPulse: 'hsPulse 1.2s infinite',
        hsPop: 'hsPop .45s ease',
        hsBadge: 'hsBadge .3s ease',
      },
    },
  },
  plugins: [],
}
