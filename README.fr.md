# Portfolio

*Lire en [English](README.md)*

**Lien direct** : [Portfolio](https://portfolio.tail5a5319.ts.net)

## Stack Technique

- **Front-end :** HTML5, CSS3, JavaScript (Vanilla, architecture modulaire)
- **Back-end (API) :** Node.js / Express.js
- **Notification :** Intégration Webhook Discord pour le formulaire de contact
- **Infrastructure :** Auto-hébergé sur serveur personnel (Debian 13) avec Nginx

## Fonctionnalités Principales

- **UI/UX Dynamique :** Arrière-plan animé en CSS pur avec bouton de pause (sauvegarde de la préférence utilisateur via `localStorage` et respect du `prefers-reduced-motion`).
- **Modal de Projets :** Fenêtre modale interactive pour la consultation détaillée des projets (`modal.js`).
- **Formulaire Asynchrone :** Formulaire de contact qui communique directement avec l'API Express sans rechargement de page.
- **Séparation des responsabilités :** Architecture JS modulaire (`script.js`, `modal.js`, `ui.js`).

## Architecture

```
.
├── index.html
├── README.md
├── css
│   └── style.css
└── js
    ├── modal.js
    ├── script.js
    └── ui.js

3 directories, 6 files
```
