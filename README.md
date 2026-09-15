# Yomna Fashion — Atelier

Site vitrine de l'atelier de confection Yomna Fashion (Moknine, Tunisie), pensé
pour la prospection en gros : présentation de l'atelier, savoir-faire, collection
de 15 modèles, conditions de gros et demande de devis par WhatsApp.

Site statique construit avec [Astro](https://astro.build) : ni serveur, ni base
de données. Il s'héberge gratuitement (Cloudflare Pages, Netlify…).

**Pour modifier les textes, les photos, la vidéo ou les produits, et pour mettre
le site en ligne : voir [GUIDE.md](GUIDE.md).**

## Commandes

| Commande          | Action                                         |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Installe les dépendances (la première fois)    |
| `npm run dev`     | Site de travail sur http://localhost:4321      |
| `npm run build`   | Construit le site final dans `dist/`           |
| `npm run preview` | Affiche le site final construit                |

## Organisation

```
src/contenu/site.json       textes, chiffres, coordonnées
src/contenu/produits.json   gammes et produits
src/assets/images/          photos (optimisées à la construction)
public/video/               vidéo de la bannière
src/pages/                  accueil, collection, fiches produit, devis
src/components/             en-tête, pied de page, carte produit, fil de couture
```

Médias de démonstration : voir [CREDITS.md](CREDITS.md).
