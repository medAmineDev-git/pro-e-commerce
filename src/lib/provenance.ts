const CLE = 'yomna-ref';

/**
 * Provenance du visiteur : le paramètre ?ref=… du lien de prospection.
 *
 * Elle est gardée dans le navigateur à la première visite, pour survivre au
 * passage d'une page à l'autre, et ressort dans chaque message WhatsApp.
 * Envoyer « pro.yomna-fashion.com/?ref=boutique-sfax » à un prospect permet
 * ainsi de savoir, à la réception d'une demande, d'où elle vient.
 */
export function lireProvenance(): string | null {
  const dansLien = new URLSearchParams(location.search).get('ref')?.trim().slice(0, 60);
  try {
    if (dansLien) {
      localStorage.setItem(CLE, dansLien);
      return dansLien;
    }
    return localStorage.getItem(CLE);
  } catch {
    // Stockage indisponible (navigation privée) : seule l'adresse compte.
    return dansLien ?? null;
  }
}
