# Portfolio

*Lire en [English](README.md)*

**Lien direct** : [Portfolio](https://portfolio.tail5a5319.ts.net)

## Stack Technique

- **Front-end :** HTML5, CSS3, JavaScript (Vanilla, architecture modulaire)
- **Back-end (API) :** Node.js / Express.js (Micro-relais)
- **Notification :** Intégration Webhook Discord pour le formulaire de contact
- **Infrastructure :** Docker Compose, Reverse Proxy Nginx, Réseau privé Tailscale

## Fonctionnalités Principales

- **UI/UX Dynamique & Persistance par Cookies :** Arrière-plan animé en CSS pur avec bouton play/pause et sélecteur de thème Clair/Sombre, persistés via des cookies natifs (`document.cookie`, `path=/`, `SameSite=Lax`, `max-age=31536000`) avec repli automatique sur les préférences système (`prefers-color-scheme` et `prefers-reduced-motion`).
- **Système Bilingue Dynamique (FR / EN) :** Chargement asynchrone des dictionnaires JSON (`locales/fr.json` et `locales/en.json`) et mise à jour dynamique du DOM via les attributs `data-i18n*` (incluant les CV PDF localisés FR/EN), détection automatique de la langue du navigateur (`navigator.language`) persistée dans le cookie `lang`, et synchronisation de `<html lang>` et des libellés d'accessibilité.
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
│   ├── cv-thomas-lableigne-fr.pdf
│   └── cv-thomas-lableigne-en.pdf
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── ui.js
├── locales/
│   ├── fr.json
│   └── en.json
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