/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a', // Soft black for text
        secondary: '#4a4a4a', // Dark gray
        accent: '#F5F5F5', // Off-white background
        gold: '#C5A035', // Muted gold for subtle accents
        charcoal: '#1a1a1a', // Reuse primary
        'warm-neutral': '#F9F9F9', // Very light gray for backgrounds
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}
