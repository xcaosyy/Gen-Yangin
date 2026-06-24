import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://genyangin.com', // 👈 Haritanın oluşması için bu satırın tam olarak böyle olması ŞART!
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});