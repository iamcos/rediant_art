// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://rediant-art2.vercel.app',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  image: {
    domains: ['rediant-art2.vercel.app'],
  },
});