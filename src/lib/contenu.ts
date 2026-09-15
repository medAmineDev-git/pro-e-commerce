import type { ImageMetadata } from 'astro';
import site from '../contenu/site.json';
import catalogue from '../contenu/produits.json';

export { site };

export type Gamme = (typeof catalogue.gammes)[number];
export type Produit = (typeof catalogue.produits)[number];

export const gammes: Gamme[] = catalogue.gammes;
export const produits: Produit[] = catalogue.produits;

export function gammeDe(produit: Produit): Gamme {
  const gamme = gammes.find((g) => g.id === produit.gamme);
  if (!gamme) {
    throw new Error(`Le produit « ${produit.nom} » cite une gamme inconnue : « ${produit.gamme} ».`);
  }
  return gamme;
}

export function produitsDe(gammeId: string): Produit[] {
  return produits.filter((p) => p.gamme === gammeId);
}

/** La page du métier : /fabrication-t-shirts-tunisie… */
export function lienGamme(gamme: Gamme): string {
  return `/${gamme.page.slug}`;
}

/*
 * Les images sont désignées par leur nom de fichier dans les fichiers de
 * contenu. Elles vivent dans src/assets/images : Astro les optimise à la
 * construction du site (formats modernes, tailles adaptées à chaque écran).
 * Remplacer une photo, c'est déposer un fichier du même nom.
 */
const fichiers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function image(nom: string): ImageMetadata {
  const trouve = fichiers[`/src/assets/images/${nom}`];
  if (!trouve) {
    // Une erreur claire à la construction vaut mieux qu'une image cassée en ligne.
    throw new Error(
      `Image introuvable : « ${nom} ». Vérifiez son nom dans src/assets/images (majuscules et extension comprises).`,
    );
  }
  return trouve.default;
}

/** Lien WhatsApp avec un message déjà écrit. */
export function lienWhatsapp(message: string): string {
  const numero = site.marque.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

export function lienTelephone(): string {
  return `tel:${site.marque.telephone.replace(/\s/g, '')}`;
}

/**
 * Titre du fichier de contenu, prêt à afficher : les mots entre astérisques
 * passent en italique terracotta — « Un atelier, *pas un intermédiaire.* ».
 * {nombre} est remplacé par le nombre de modèles de la collection.
 * Le reste est échappé : aucun balisage saisi ne passe tel quel.
 */
export function titre(texte: string): string {
  const echappe = insecables(texte)
    .replaceAll('{nombre}', String(produits.length))
    .replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);
  return (
    echappe
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // « t-shirts », « prêt-à-porter » : un mot composé ne se coupe pas à son
      // trait d'union en fin de ligne, dans les grands titres.
      .replace(/([\p{L}\d]+(?:-[\p{L}\d]+)+)/gu, '<span class="insecable">$1</span>')
  );
}

/**
 * Typographie française : l'espace avant « ? ! : ; » devient insécable, pour
 * que le signe ne passe jamais seul à la ligne.
 */
export function insecables(texte: string): string {
  return texte.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
}

/** Le même texte, sans mise en forme : pour les titres de page et les descriptions lus par Google. */
export function texteBrut(texte: string): string {
  return texte.replaceAll('{nombre}', String(produits.length)).replace(/\*/g, '');
}

/** 25000 → « 25 000 », à la française. */
export function nombre(valeur: number): string {
  return new Intl.NumberFormat('fr-FR').format(valeur).replace(/ /g, ' ');
}
