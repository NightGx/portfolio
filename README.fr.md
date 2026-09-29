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
- **Formulaire Asynchrone :** Formulaire de contact qui communique directement avec l'API Express sans rechargement de page.
- **Séparation des responsabilités :** Logique d'interface (`ui.js`) séparée de la logique métier (`script.js`).

## Architecture

```
.
├── index.html
├── README.md
├── css
│   └── style.css
└── js
    ├── script.js
    └── ui.js

3 directories, 5 files
```
