import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Les guides : un fichier Markdown par article dans src/contenu/guides.
 * Le nom du fichier donne l'adresse de l'article (/guides/nom-du-fichier).
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contenu/guides' }),
  schema: z.object({
    titre: z.string(),
    /** Titre court pour l'onglet et Google (60 caractères environ) ; à défaut, le titre. */
    titreCourt: z.string().max(60, 'Le titre court doit tenir en 60 caractères.').optional(),
    /** Le résumé : sous le titre, dans la liste des guides et pour Google. */
    description: z.string().max(160, 'Le résumé doit tenir en 160 caractères (limite affichée par Google).'),
    /** Date de publication, au format 2026-09-16. */
    date: z.coerce.date(),
    /** Date de dernière mise à jour, facultative. */
    miseAJour: z.coerce.date().optional(),
    /** Nom d'un fichier de src/assets/images. */
    image: z.string(),
    /** Brouillon : l'article n'est pas publié. */
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { guides };
