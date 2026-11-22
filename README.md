# Portfolio

*Read this in [Français](README.fr.md)*

**Direct link**: [Portfolio](https://portfolio.tail5a5319.ts.net)

## Tech Stack

- **Front-end:** HTML5, CSS3, JavaScript (Vanilla, modular architecture)
- **Back-end (API):** Node.js / Express.js (Micro-relay)
- **Notification:** Discord Webhook integration for the contact form
- **Infrastructure:** Docker Compose, Nginx Reverse Proxy, Tailscale VPN

## Key Features

- **Dynamic UI/UX:** Pure CSS animated background with a manual pause toggle (saves user preference via `localStorage` and respects `prefers-reduced-motion`).
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

## Infrastructure & Request Flow

This project is self-hosted on a personal Debian 13 home server using a containerized setup:

- **Reverse Proxy (Nginx):** Serves the static front-end assets on port 80 and acts as a reverse proxy by forwarding `/api/` requests to the internal Node.js container.
- **Security Micro-Relay (Express.js):** Isolates the Discord webhook URL on the server side (loaded via environment variables) to prevent credential exposure in client-side JavaScript.
- **Network & Deployment:** Orchestrated via Docker Compose, exposed securely over Tailscale VPN, and updated via a custom synchronization script (`sync-portfolio.sh`).