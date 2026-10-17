const cookieRead = (name) => {
  let res;
  let infoUserString = document.cookie.split(";");
  if (!name || !document.cookie) {
    return null;
  }
  infoUserString.forEach((cookie) => {
    cookie = cookie.trim();
    cookie = cookie.split("=");
    if (cookie[0] === name) {
      res = cookie[1];
    }
  });
  return res;
};

const cookieWrite = (name, value, age) => {
  document.cookie = `${name}=${value}; path=/; max-age=${age}`;
};

// --- GESTION DU FOND ANIMÉ ---
const savedBgState = cookieRead("bg-paused");
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Application de l'état initial
if (savedBgState === "true" || (savedBgState === null && prefersReduced)) {
  document.body.classList.add("bg-paused");
}

// Écouteur global pour le bouton (délégation d'événements)
document.addEventListener("click", (event) => {
  const btn = event.target.closest("#bg-toggle-btn");
  if (!btn) return; // Si on n'a pas cliqué sur le bouton, on arrête là

  const isPaused = document.body.classList.toggle("bg-paused");
  cookieWrite("bg-paused", isPaused, 31536000);
});
