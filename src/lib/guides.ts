import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;

/** Les guides publiés, du plus récent au plus ancien. */
export async function guidesPublies(): Promise<Guide[]> {
  const guides = await getCollection('guides', (guide: Guide) => !guide.data.brouillon);
  return guides.sort((a: Guide, b: Guide) => b.data.date.getTime() - a.data.date.getTime());
}

/** Environ 220 mots par minute : l'ordre de grandeur d'une lecture à l'écran. */
export function tempsDeLecture(guide: Guide): number {
  const mots = (guide.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 220));
}

export function dateLongue(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
