# Portfolio de Mouhammad Diabagaté — version 3

## Démarrer
```bash
npm install
npm run dev      # développement
npm run build    # production : génère dist/client/ (publié par Netlify)
```

## Modifier le contenu
Tout le texte est dans **`src/data/portfolio.ts`** : nom, contact, projets, parcours, services,
lignes du terminal dans "À propos", chemin du CV.

- Ajouter un lien de démo à un projet : `live: "https://..."` (un bouton « Voir la démo » apparaît).
- Remplacer `href` des projets par le lien direct de chaque dépôt GitHub (3 sur 4 pointent
  encore vers ton profil général).
- Chaque projet peut avoir `problem` / `solution` / `features` / `role` pour le storytelling
  (Problème → Solution → Fonctionnalités → Mon rôle). Laisse-les vides pour revenir à `desc` seul.

## Le CV
Le fichier vit dans **`public/cv/Mouhammad-Diabagate-CV.pdf`**. Pour le remplacer, dépose le
nouveau PDF au même endroit avec le même nom (ou change `CV.fileName` dans `portfolio.ts`).

⚠️ Si tu ajoutes un jour une deuxième route au site, désactive bien `crawlLinks` dans
`vite.config.ts` avant de builder — sinon le pré-rendu explore le lien du CV comme une page et
corrompt le PDF livré (bug rencontré et corrigé dans cette version).

## Où est quoi
- `src/components/portfolio/` : une section par fichier (Hero, Projects, Journey, Contact…).
- `WovenField.tsx` : le champ de losanges du hero. `KineticName.tsx` : le nom qui réagit au curseur.
- `DevStatus.tsx` : le petit terminal de la section "À propos" (visible en desktop).
- `Mocks.tsx` : les aperçus animés des projets (à remplacer par de vraies captures si tu veux).
- `src/styles.css` : couleurs (`--color-gold`, `--color-night`…), polices, animations.

## À faire
- Image de partage : remplacer `OG_IMAGE` dans `src/routes/__root.tsx` par une image 1200×630 à toi.
- Domaine personnalisé sur Netlify.
- Confirmer si PharmaCi a réellement un espace pharmacien / une gestion de stock : je ne l'ai
  pas ajouté au storytelling faute de confirmation, pour ne rien inventer.
