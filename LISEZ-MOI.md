# Portfolio de Mouhammad Diabagaté — version 2

## Démarrer
```bash
npm install
npm run dev      # développement
npm run build    # production : génère dist/client/index.html (publié par Netlify)
```

## Modifier le contenu
Tout le texte est dans **`src/data/portfolio.ts`** : nom, contact, projets, parcours, services.
- Ajouter un lien de démo à un projet : `live: "https://..."` (un bouton « Voir la démo » apparaît).
- Remplacer `href` des projets par le lien direct de chaque dépôt GitHub.

## Où est quoi
- `src/components/portfolio/` : une section par fichier (Hero, Projects, Journey, Contact…).
- `WovenField.tsx` : le champ de losanges du hero. `KineticName.tsx` : le nom qui réagit au curseur.
- `Mocks.tsx` : les aperçus animés des projets (à remplacer par de vraies captures si tu veux).
- `src/styles.css` : couleurs (`--color-gold`, `--color-night`…), polices, animations.

## À faire
- Image de partage : remplacer `OG_IMAGE` dans `src/routes/__root.tsx` par une image 1200×630 à toi.
- Domaine personnalisé sur Netlify.
