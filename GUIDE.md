# Guide du site Yomna Fashion — Atelier

Ce guide explique comment modifier le site sans toucher au code : textes, photos,
vidéo, produits, puis comment le mettre en ligne.

---

## 1. Où se trouve quoi

| Ce que vous voulez changer         | Où                                         |
| ---------------------------------- | ------------------------------------------ |
| Tous les textes, chiffres, contact | `src/contenu/site.json`                    |
| Les 15 produits et les 4 gammes    | `src/contenu/produits.json`                |
| Les textes des 4 pages métier      | `src/contenu/produits.json` (bloc `"page"` de chaque gamme) |
| Les articles de la rubrique Guides | `src/contenu/guides/` (un fichier par article) |
| Les photos                         | `src/assets/images/`                       |
| La vidéo de la bannière            | `public/video/banniere.mp4`                |
| L'adresse du site en ligne         | `astro.config.mjs` (ligne `ADRESSE_DU_SITE`) |
| Le déploiement Cloudflare          | `wrangler.jsonc` (à ne pas supprimer)      |

Vous n'avez besoin de rien d'autre.

**Les pages du site :**

| Adresse                                   | Page                                   |
| ----------------------------------------- | -------------------------------------- |
| `/`                                       | Accueil                                |
| `/atelier`                                | L'atelier, l'équipe, la méthode        |
| `/collection` et `/collection/…`          | Les 15 modèles et leurs fiches         |
| `/marque-blanche`                         | Fabriquer pour une marque              |
| `/fabrication-t-shirts-tunisie`           | Page métier T-shirts                   |
| `/fabrication-sweats-hoodies-tunisie`     | Page métier Sweats                     |
| `/confection-vetements-enfants-tunisie`   | Page métier Enfants                    |
| `/confection-pret-a-porter-femme-tunisie` | Page métier Femme                      |
| `/guides` et `/guides/…`                  | Les articles de conseil                |
| `/devis`                                  | Comment obtenir un devis               |
| `/devis/…`                                | La demande de devis d'un modèle        |

Les pages métier répondent à ce que tapent les acheteurs sur Google
(« fabrication t-shirt Tunisie », « atelier confection enfant »…) : c'est par
elles que la plupart des visiteurs arriveront.

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
- `"personnalisation"` : les marquages possibles, séparés par des virgules. Ce sont
  les cases proposées dans la demande de devis du modèle.
- `"tailles"` (facultatif) : les tailles du modèle, par exemple
  `["2 ans", "4 ans", "6 ans"]`. Sans ce champ, le modèle reprend les tailles de
  sa gamme (champ `"tailles"` de la gamme).

**Les demandes de devis.** L'atelier ne produit que les modèles de la collection :
chaque devis porte donc sur un modèle, depuis sa fiche (bouton « Demander un
devis pour ce modèle »). Le formulaire reprend la photo du modèle, ses tailles et
ses marquages ; la demande part sur WhatsApp, déjà rédigée, avec le lien de la
fiche. Le site retient les coordonnées de l'acheteur sur son appareil : sa
demande suivante, pour un autre modèle, ne prend que quelques secondes.

La page `/devis` du menu ne contient pas de formulaire : elle explique comment
obtenir un devis et mène à la collection. Ses textes sont dans le bloc `"devis"`
de `site.json`.

**Les pages métier** se règlent dans le bloc `"page"` de chaque gamme : titre
affiché, introduction, 4 arguments et questions fréquentes. `"seoTitre"` (60
caractères au plus) et `"seoDescription"` (160 au plus) sont ce que Google
affiche dans ses résultats.

Ne changez pas le `"slug"` d'une page métier (ni celui d'un produit) une fois le
site référencé : l'ancienne adresse, déjà connue de Google, ne mènerait plus
nulle part.

---

## 6. Écrire un guide

Les guides sont des articles de conseil : ils attirent les marques qui
cherchent comment produire, et montrent que vous connaissez votre métier. Un
article tous les mois ou deux suffit.

Chaque article est un fichier texte dans `src/contenu/guides/`. Le nom du
fichier devient l'adresse : `mon-article.md` → `/guides/mon-article`
(minuscules, tirets, sans accent). Le plus simple est de copier un article
existant et d'en changer le contenu.

Le fichier commence par une fiche entre deux lignes `---` :

```markdown
---
titre: "Faire fabriquer ses vêtements en Tunisie : le guide complet"
titreCourt: "Faire fabriquer ses vêtements en Tunisie"
description: "Coûts, délais, douane, TVA : tout ce qu'il faut savoir avant de produire en Tunisie."
date: 2026-09-15
image: atelier-machines.jpg
brouillon: false
---

Le texte de l'article commence ici.

## Un intertitre

Un paragraphe, une **expression en gras**, un [lien](/devis).

- une liste
- à puces
```

- `titre` : le titre affiché en haut de l'article.
- `titreCourt` (facultatif) : la version courte pour Google, 60 caractères au plus.
- `description` : le résumé affiché sous le titre et dans Google, 160 caractères au plus.
- `date` : la date de publication, au format année-mois-jour. Ajoutez
  `miseAJour: 2027-01-10` si vous révisez l'article.
- `image` : le nom d'une photo de `src/assets/images/`.
- `brouillon: true` : l'article n'est pas publié tant que vous ne repassez pas à `false`.

Si une information manque ou dépasse la longueur permise, la construction du site
s'arrête et indique quoi corriger.

Les chiffres de douane et de TVA des guides sont des repères généraux : faites-les
relire par votre transitaire.

---

## 7. Avant de prospecter : passer du mode démo au vrai site

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
message de démonstration disparaît, **et Google est autorisé à référencer le
site** (voir la partie 8).

---

## 8. Être trouvé sur Google

Tout le nécessaire est déjà en place : titres et descriptions de chaque page,
plan du site pour Google (`/sitemap-index.xml`), fichier `/robots.txt`, fiches
d'information lisibles par Google (atelier, fil d'Ariane, questions fréquentes,
articles), aperçus soignés quand un lien est partagé sur WhatsApp ou LinkedIn.

**Tant que `"modeDemo"` vaut `true`, le site demande à Google de ne pas le
référencer**, pour que les photos et avis d'exemple n'apparaissent jamais dans
les résultats. Passer à `false` suffit à tout ouvrir.

Le jour où votre adresse `pro.yomna-fashion.com` est branchée :

1. Dans `astro.config.mjs`, remplacez l'adresse `ADRESSE_DU_SITE` par
   `https://pro.yomna-fashion.com`. Elle sert aux liens envoyés à Google et aux
   aperçus de lien.
2. Déclarez le site dans [Google Search Console](https://search.google.com/search-console),
   puis envoyez-y l'adresse du plan du site :
   `https://pro.yomna-fashion.com/sitemap-index.xml`.
3. Créez votre fiche [Google Business Profile](https://business.google.com)
   (« Fabricant de vêtements »), avec la même adresse et le même téléphone que
   sur le site.

**Mesurer les visites.** Le site peut compter ses visiteurs avec Cloudflare Web
Analytics, gratuit, sans cookie et donc sans bandeau de consentement :

1. Dans Cloudflare : **Analytics & Logs → Web Analytics → Ajouter un site**,
   saisissez l'adresse du site.
2. Cloudflare affiche un petit code contenant `"token": "…"`. Copiez la suite de
   lettres et de chiffres entre les guillemets.
3. Collez-la dans `site.json`, bloc `"analytics"` : `"jetonCloudflare": "votre-jeton"`.

Vous verrez alors, dans Cloudflare, le nombre de visiteurs, les pages lues, les
pays et les sites d'où ils viennent.

---

## 9. Suivre vos prospects

Ajoutez `?ref=` suivi d'un nom à la fin du lien que vous envoyez :

```
https://pro.yomna-fashion.com/?ref=boutique-sfax
https://pro.yomna-fashion.com/collection?ref=salon-textile-2026
```

Quand ce visiteur vous écrit sur WhatsApp, son message se termine par
`(Réf. boutique-sfax)`. Vous savez ainsi quelle démarche a porté ses fruits.
Le nom est retenu même s'il visite plusieurs pages avant d'écrire.

---

## 10. Voir le site sur votre ordinateur

Il faut [Node.js](https://nodejs.org) (version 22 ou plus). Dans le dossier du
projet :

```bash
npm install      # la première fois seulement
npm run dev      # puis ouvrez http://localhost:4321
```

Chaque modification enregistrée s'affiche aussitôt dans le navigateur.

---

## 11. Mettre le site en ligne (gratuit)

Le site est fait de simples fichiers : aucun serveur, aucune base de données.

1. Créez un compte [GitHub](https://github.com) et déposez-y ce projet.
2. Créez un compte [Cloudflare](https://dash.cloudflare.com), puis
   **Workers & Pages → Créer → Importer un dépôt**, et choisissez le dépôt.
3. Réglages de construction :
   - Commande de construction : `npm run build`
   - Commande de déploiement : `npx wrangler deploy`
4. Enregistrez et déployez. Le site est en ligne en une minute, sur une adresse
   `….workers.dev`.
5. **Votre adresse** : dans le projet Cloudflare, onglet **Paramètres →
   Domaines et routes**, ajoutez `pro.yomna-fashion.com`, puis suivez les
   indications de Cloudflare pour le domaine.

Le fichier `wrangler.jsonc` indique à Cloudflare que c'est un site statique :
**ne le supprimez pas.** Sans lui, Cloudflare transforme le projet en site
« avec serveur » et les photos ne s'affichent plus.

Ensuite, **chaque modification déposée sur GitHub met le site à jour toute seule**,
y compris depuis le site de GitHub : ouvrez un fichier, cliquez sur le crayon,
modifiez, validez. Pour une photo : **Add file → Upload files** dans
`src/assets/images/`, avec le même nom que celle à remplacer.

Si vous publiez sous une autre adresse, changez `ADRESSE_DU_SITE` dans
`astro.config.mjs` : elle sert à Google et aux aperçus de lien sur WhatsApp et
Facebook.

---

## 12. Crédits des photos de démonstration

Les photos et la vidéo de démonstration viennent de Pexels et d'Unsplash, sous
licence libre (usage commercial autorisé, attribution non obligatoire). La liste
complète est dans `CREDITS.md`. Elles disparaissent d'elles-mêmes à mesure que
vous les remplacez par les vôtres.
