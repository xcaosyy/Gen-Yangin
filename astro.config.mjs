import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://genyangin.com', // 👈 Google'ın haritayı okuyabilmesi için bu satır şart!
  integrations: [tailwind(), sitemap()],
});