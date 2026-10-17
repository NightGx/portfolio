# Portfolio

*Read this in [Français](README.fr.md)*

**Direct link**: [Portfolio](https://portfolio.tail5a5319.ts.net)

## Tech Stack

- **Front-end:** HTML5, CSS3, JavaScript (Vanilla, modular architecture)
- **Back-end (API):** Node.js / Express.js
- **Notification:** Discord Webhook integration for the contact form
- **Infrastructure:** Self-hosted on a personal server (Debian 13) using Nginx

## Key Features

- **Dynamic UI/UX:** Pure CSS animated background with a manual pause toggle (saves user preference via `localStorage` and respects `prefers-reduced-motion`).
- **Project Modal Preview:** Interactive popup modal for detailed project views (`modal.js`).
- **Asynchronous Form:** Contact form that communicates directly with the Express API without page reloads.
- **Separation of Concerns:** Modular JS architecture (`script.js`, `modal.js`, `ui.js`).

## Architecture

```text
.
├── index.html
├── README.md
├── css
│   └── style.css
└── js
    ├── modal.js
    ├── script.js
    └── ui.js

3 directories, 6 files
```
