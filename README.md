# Portfolio

*Read this in [Français](README.fr.md)*

**Direct link**: [Portfolio](https://portfolio.tail5a5319.ts.net)

## Tech Stack

- **Front-end:** HTML5, CSS3, JavaScript (Vanilla, modular architecture)
- **Back-end (API):** Node.js / Express.js (Micro-relay)
- **Notification:** Discord Webhook integration for the contact form
- **Infrastructure:** Docker Compose, Nginx Reverse Proxy, Tailscale VPN

## Key Features

- **Dynamic UI/UX & Cookie Persistence:** Pure CSS animated background with a manual pause/play toggle and Light/Dark theme switcher, persisted via native browser cookies (`document.cookie`, `path=/`, `SameSite=Lax`, `max-age=31536000`) with automatic OS preference fallbacks (`prefers-color-scheme` and `prefers-reduced-motion`).
- **Dynamic Bilingual System (FR / EN):** Asynchronous JSON dictionary loading (`locales/fr.json` and `locales/en.json`) with live DOM translation via `data-i18n*` attributes (including localized FR/EN resume PDFs), automatic browser locale detection (`navigator.language`) persisted in a `lang` cookie, and synchronized `<html lang>` / switcher accessibility labels.
- **Asynchronous Form:** Contact form that communicates directly with the Express API without page reloads.
- **Separation of Concerns:** UI logic (`ui.js`) is strictly separated from business/backend logic (`script.js`).

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

## Infrastructure & Request Flow

This project is self-hosted on a personal Debian 13 home server using a containerized setup:

- **Reverse Proxy (Nginx):** Serves the static front-end assets on port 80 and acts as a reverse proxy by forwarding `/api/` requests to the internal Node.js container.
- **Security Micro-Relay (Express.js):** Isolates the Discord webhook URL on the server side (loaded via environment variables) to prevent credential exposure in client-side JavaScript.
- **Network & Deployment:** Orchestrated via Docker Compose, exposed securely over Tailscale VPN, and updated via a custom synchronization script (`sync-portfolio.sh`).