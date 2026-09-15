// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// L'adresse publique du site. Elle sert aux adresses canoniques, au plan du
// site et aux aperçus de lien (WhatsApp, Facebook) : elle doit être celle où le
// site répond réellement.
//
// Le jour où le domaine pro.yomna-fashion.com est branché sur Cloudflare,
// remplacez-la par « https://pro.yomna-fashion.com », puis poussez sur GitHub.
const ADRESSE_DU_SITE = 'https://pro-e-commerce.aouidane-med-amine.workers.dev';

export default defineConfig({
  site: ADRESSE_DU_SITE,
  integrations: [
    sitemap({
      // La page d'erreur et les formulaires de devis de chaque modèle n'ont
      // rien à faire dans le plan du site.
      filter: (page) => !page.includes('/404') && !page.includes('/devis/'),
    }),
  ],
  // Des adresses sans « .html » ni barre finale : /collection/le-classique
  trailingSlash: 'never',
  build: { format: 'file' },
});
