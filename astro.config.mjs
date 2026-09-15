// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// L'adresse définitive du site : elle sert au plan du site et aux aperçus de
// lien (WhatsApp, Facebook). À changer si le site est publié ailleurs.
const ADRESSE_DU_SITE = 'https://pro.yomna-fashion.com';

export default defineConfig({
  site: ADRESSE_DU_SITE,
  integrations: [sitemap()],
  // Des adresses sans « .html » ni barre finale : /collection/le-classique
  trailingSlash: 'never',
  build: { format: 'file' },
});
