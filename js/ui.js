const cookieRead = (name) => {
  let res;

  // La sécurité en premier pour ne pas lancer le split dans le vide
  if (!name || !document.cookie) {
    return null;
  }

  let infoUserString = document.cookie.split(";");
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

const updateLangValue = (lang) => {};

// --- GESTION DU FOND ANIMÉ ---
const savedBgState = cookieRead("bg-paused");
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (savedBgState === "true" || (savedBgState === null && prefersReduced)) {
  document.body.classList.add("bg-paused");
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("#bg-toggle-btn");
  if (!btn) return;

  const isPaused = document.body.classList.toggle("bg-paused");
  cookieWrite("bg-paused", isPaused, 31536000);
});

// --- GESTION DE LA LANGUE ---
let currentLang = "fr";

const cookieLang = cookieRead("lang");
if (cookieLang) {
  currentLang = cookieLang;
}

const langBtn = document.querySelector(".lang-switch");

if (langBtn) {
  langBtn.textContent = currentLang === "fr" ? "EN" : "FR";
}

document.addEventListener("click", (event) => {
  let btn = event.target.closest(".lang-switch");
  if (!btn) return;

  currentLang = currentLang === "fr" ? "en" : "fr";
  cookieWrite("lang", currentLang, 31536000);
  btn.textContent = currentLang === "fr" ? "EN" : "FR";
});
