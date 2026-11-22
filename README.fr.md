# Portfolio

*Lire en [English](README.md)*

**Lien direct** : [Portfolio](https://portfolio.tail5a5319.ts.net)

## Stack Technique

- **Front-end :** HTML5, CSS3, JavaScript (Vanilla, architecture modulaire)
- **Back-end (API) :** Node.js / Express.js (Micro-relais)
- **Notification :** Intégration Webhook Discord pour le formulaire de contact
- **Infrastructure :** Docker Compose, Reverse Proxy Nginx, Réseau privé Tailscale

## Fonctionnalités Principales

- **UI/UX Dynamique :** Arrière-plan animé en CSS pur avec bouton de pause (sauvegarde de la préférence utilisateur via `localStorage` et respect du `prefers-reduced-motion`).
- **Formulaire Asynchrone :** Formulaire de contact qui communique directement avec l'API Express sans rechargement de page.
- **Séparation des responsabilités :** Logique d'interface (`ui.js`) séparée de la logique métier (`script.js`).

## Architecture

```text
.
├── index.html
├── README.md
├── README.fr.md
├── .env.example
├── docker-compose.yml
├── nginx.conf
├── sync-portfolio.sh
├── assets/
│   └── CV_Thomas_LABLEIGNE.pdf
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── ui.js
└── relay/
    ├── package.json
    ├── package-lock.json
    └── server.js
```

## Infrastructure & Flux des Requêtes

Ce projet est auto-hébergé sur un serveur personnel Debian 13 via une architecture conteneurisée :

- **Reverse Proxy (Nginx) :** Sert les fichiers statiques du front-end sur le port 80 et redirige les requêtes `/api/` vers le conteneur Node.js interne.
- **Micro-Relay de Sécurité (Express.js) :** Isole l'URL du webhook Discord côté serveur (chargée via des variables d'environnement) afin d'éviter toute exposition de secrets dans le code JavaScript client.
- **Réseau & Déploiement :** Orchestré avec Docker Compose, exposé de manière sécurisée via Tailscale et mis à jour à l'aide d'un script de synchronisation dédié (`sync-portfolio.sh`).