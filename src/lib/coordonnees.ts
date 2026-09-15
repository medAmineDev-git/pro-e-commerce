const CLE = 'yomna-coordonnees';

export interface Coordonnees {
  nom?: string;
  marque?: string;
  ville?: string;
  telephone?: string;
}

/**
 * Les coordonnées de l'acheteur, gardées dans son navigateur après une
 * première demande : on ne fait qu'un devis par modèle, le deuxième ne doit
 * pas redemander le nom, la boutique et le téléphone.
 */
export function lireCoordonnees(): Coordonnees {
  try {
    return JSON.parse(localStorage.getItem(CLE) ?? '{}') ?? {};
  } catch {
    // Stockage indisponible (navigation privée) ou contenu illisible.
    return {};
  }
}

/** Complète les coordonnées déjà gardées ; une valeur vide n'efface rien. */
export function enregistrerCoordonnees(nouvelles: Coordonnees): void {
  const remplies = Object.fromEntries(Object.entries(nouvelles).filter(([, valeur]) => valeur?.trim()));
  try {
    localStorage.setItem(CLE, JSON.stringify({ ...lireCoordonnees(), ...remplies }));
  } catch {}
}

export function effacerCoordonnees(): void {
  try {
    localStorage.removeItem(CLE);
  } catch {}
}
