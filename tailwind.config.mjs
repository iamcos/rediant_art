/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        secondary: '#2C2C2C',
        accent: '#F5F5F5',
        gold: '#D4AF37',
        charcoal: '#2C2C2C',
        'warm-neutral': '#F5F5F5',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
