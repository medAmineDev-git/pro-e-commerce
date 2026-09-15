import type { APIRoute } from 'astro';

/**
 * robots.txt, construit à partir de l'adresse du site (astro.config.mjs) :
 * le plan du site pointe toujours au bon endroit.
 *
 * Tant que le site est en démonstration, chaque page porte en plus une
 * balise « noindex » (voir Base.astro) : les moteurs peuvent la lire, mais ne
 * la référencent pas.
 */
export const GET: APIRoute = ({ site }) => {
  const plan = new URL('/sitemap-index.xml', site).toString();
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${plan}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
