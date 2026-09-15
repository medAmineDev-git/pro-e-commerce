# Guide du site Yomna Fashion — Atelier

Ce guide explique comment modifier le site sans toucher au code : textes, photos,
vidéo, produits, puis comment le mettre en ligne.

---

## 1. Où se trouve quoi

| Ce que vous voulez changer         | Où                                         |
| ---------------------------------- | ------------------------------------------ |
| Tous les textes, chiffres, contact | `src/contenu/site.json`                    |
| Les 15 produits et les 4 gammes    | `src/contenu/produits.json`                |
| Les photos                         | `src/assets/images/`                       |
| La vidéo de la bannière            | `public/video/banniere.mp4`                |
| L'adresse du site en ligne         | `astro.config.mjs` (ligne `ADRESSE_DU_SITE`) |

Vous n'avez besoin de rien d'autre.

---

## 2. Modifier un texte

Ouvrez `src/contenu/site.json` (Bloc-notes, ou mieux : [Visual Studio Code](https://code.visualstudio.com)).

- Changez **seulement ce qui est entre guillemets à droite** des deux-points.
  Ne touchez jamais au nom à gauche (`"titre":`, `"texte":`…).
- Gardez les guillemets `"` et les virgules en fin de ligne.
- Pour mettre des mots **en italique terracotta** dans un titre, entourez-les
  d'astérisques : `"Un atelier, *pas un intermédiaire.*"`.
- `{nombre}` est remplacé automatiquement par le nombre de produits.

Si le site refuse de se construire après une modification, c'est presque
toujours une virgule ou un guillemet oublié : l'erreur indique la ligne.

**Vos coordonnées** sont dans le bloc `"marque"` : téléphone, WhatsApp (au format
`+216…`, sans espace), e-mail, adresse, horaires, lien de la boutique au détail,
Instagram et Facebook (laissés vides, ils n'apparaissent pas).

---

## 3. Remplacer une photo

Toutes les photos sont dans `src/assets/images/`. **Pour en remplacer une, déposez
votre photo avec exactement le même nom** (par exemple `tshirt-01.jpg`) : c'est
tout. Le site crée lui-même les versions légères pour téléphone et ordinateur.

Conseils pour un rendu professionnel :

| Photo                   | Format conseillé                  | Taille conseillée |
| ----------------------- | --------------------------------- | ----------------- |
| Produits (`tshirt-…`, `sweat-…`, `enfant-…`, `femme-…`) | Portrait, fond uni clair | 1600 × 2000 px |
| Atelier (`atelier-…`)   | Paysage, lumière naturelle        | 2000 × 1333 px    |
| Bannière (`banniere.jpg`) | Paysage, sujet au centre ou à droite | 2000 × 1200 px |
| Matières (`matiere-…`)  | Gros plan du tissu                | 1200 × 1600 px    |

- JPEG, moins de 1 Mo par photo si possible.
- Une seule photo par image (pas de montage de plusieurs photos).
- Le texte de la bannière est écrit par le site : **ne mettez pas de texte dans
  la photo**, il serait coupé sur téléphone.

**Ajouter une 2e photo à un produit :** déposez-la dans le dossier (par exemple
`tshirt-01-2.jpg`), puis ajoutez son nom dans la liste `"images"` du produit :

```json
"images": ["tshirt-01.jpg", "tshirt-01-2.jpg"]
```

La première photo de la liste est la photo principale.

---

## 4. Remplacer la vidéo

Remplacez `public/video/banniere.mp4` par votre vidéo, sous le même nom.

- 10 à 20 secondes, sans son (elle est jouée en silence, en boucle).
- MP4, format paysage 1920 × 1080, **moins de 8 Mo**.
- Filmez des gestes : mains sous la machine, coupe, pliage. Évitez les visages
  en gros plan.

La vidéo n'est chargée que sur ordinateur. Sur téléphone, c'est la photo
`banniere.jpg` qui s'affiche, pour ne pas consommer les données du visiteur.

---

## 5. Ajouter, modifier ou retirer un produit

Dans `src/contenu/produits.json`, chaque produit est un bloc entre `{ }`.

- **Modifier :** changez les valeurs (nom, description, tissu, minimum…).
- **Ajouter :** copiez un bloc complet, collez-le après une virgule, puis
  changez au moins le `"slug"` (l'adresse de la fiche : minuscules, tirets,
  sans accent, unique), le `"nom"` et les `"images"`.
- **Retirer :** supprimez le bloc, et la virgule qui le suit.
- `"gamme"` doit être l'une de : `t-shirts`, `sweats`, `enfants`, `femme`.

---

## 6. Avant de prospecter : passer du mode démo au vrai site

Le site est livré en **mode démonstration** : un petit message l'indique en bas
de l'écran. Avant d'envoyer le lien à des prospects, remplacez :

- [ ] **Les 15 photos de produits** par vos propres modèles. C'est le point le plus
      important : un acheteur doit voir ce que vous fabriquez réellement.
- [ ] **Les photos de l'atelier** et la vidéo, par votre atelier.
- [ ] **Les chiffres** (`"chiffres"` dans `site.json` : années, pièces par mois,
      boutiques partenaires, délai d'échantillon) par vos vrais chiffres.
- [ ] **Les témoignages** (`"temoignages"`) par de vrais avis de clients, avec
      leur accord. Sans avis réels, supprimez-les plutôt que d'en inventer.
- [ ] **Les conditions** (`"conditions"` et `"faq"`) : minimum, délais, paiement,
      livraison, tels que vous les pratiquez.
- [ ] **Les coordonnées** (`"marque"`) : adresse exacte, e-mail qui fonctionne.
- [ ] Le **minimum et le délai** de chaque produit dans `produits.json`.

Puis, dans `site.json`, passez `"modeDemo": true` à `"modeDemo": false` : le
message de démonstration disparaît.

---

## 7. Suivre vos prospects

Ajoutez `?ref=` suivi d'un nom à la fin du lien que vous envoyez :

```
https://pro.yomna-fashion.com/?ref=boutique-sfax
https://pro.yomna-fashion.com/collection?ref=salon-textile-2026
```

Quand ce visiteur vous écrit sur WhatsApp, son message se termine par
`(Réf. boutique-sfax)`. Vous savez ainsi quelle démarche a porté ses fruits.
Le nom est retenu même s'il visite plusieurs pages avant d'écrire.

---

## 8. Voir le site sur votre ordinateur

Il faut [Node.js](https://nodejs.org) (version 22 ou plus). Dans le dossier du
projet :

```bash
npm install      # la première fois seulement
npm run dev      # puis ouvrez http://localhost:4321
```

Chaque modification enregistrée s'affiche aussitôt dans le navigateur.

---

## 9. Mettre le site en ligne (gratuit)

Le site est fait de simples fichiers : aucun serveur, aucune base de données.

1. Créez un compte [GitHub](https://github.com) et déposez-y ce projet.
2. Créez un compte [Cloudflare](https://dash.cloudflare.com), puis
   **Workers & Pages → Créer → Pages → Connecter à Git**, et choisissez le dépôt.
3. Réglages de construction :
   - Framework : **Astro**
   - Commande : `npm run build`
   - Dossier de sortie : `dist`
4. Cliquez sur **Enregistrer et déployer**. Le site est en ligne en une minute,
   sur une adresse `….pages.dev`.
5. **Votre adresse** : dans le projet Cloudflare, onglet **Domaines
   personnalisés**, ajoutez `pro.yomna-fashion.com`, puis créez chez votre
   registraire de domaine l'enregistrement CNAME indiqué par Cloudflare.

Ensuite, **chaque modification déposée sur GitHub met le site à jour toute seule**,
y compris depuis le site de GitHub : ouvrez un fichier, cliquez sur le crayon,
modifiez, validez. Pour une photo : **Add file → Upload files** dans
`src/assets/images/`, avec le même nom que celle à remplacer.

Si vous publiez sous une autre adresse, changez `ADRESSE_DU_SITE` dans
`astro.config.mjs` : elle sert aux aperçus de lien sur WhatsApp et Facebook.

---

## 10. Crédits des photos de démonstration

Les photos et la vidéo de démonstration viennent de Pexels et d'Unsplash, sous
licence libre (usage commercial autorisé, attribution non obligatoire). La liste
complète est dans `CREDITS.md`. Elles disparaissent d'elles-mêmes à mesure que
vous les remplacez par les vôtres.
