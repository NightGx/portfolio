// --- UTILITAIRES COOKIES NATIFS ---
const COOKIE_MAX_AGE = 31536000; // 1 an en secondes

function setCookie(name, value, maxAge = COOKIE_MAX_AGE) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name) {
  const target = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const entry of cookies) {
    if (entry.startsWith(target)) {
      return decodeURIComponent(entry.slice(target.length));
    }
  }
  return null;
}

// --- GESTION DU FOND ANIMÉ ---
const savedBgState = getCookie('bg-paused');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const initialBgPaused = savedBgState === 'true' || (savedBgState === null && prefersReduced);

// Application de l'état initial
if (initialBgPaused) {
  document.body.classList.add('bg-paused');
} else if (savedBgState === 'false') {
  document.body.classList.add('bg-playing');
}

// --- GESTION DU THÈME (Clair par défaut / Sombre via theme-dark) ---
const savedTheme = getCookie('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function syncThemeToggleAccessibility(isDark) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  themeBtn.setAttribute('aria-pressed', String(isDark));
}

// Appliquer le thème sombre si sauvegardé ou si préférence système
if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
  document.body.classList.add('theme-dark');
}
syncThemeToggleAccessibility(document.body.classList.contains('theme-dark'));

// Écouteur global pour les boutons
document.addEventListener('click', (event) => {
  // Toggle Fond animé
  const bgBtn = event.target.closest('#bg-toggle-btn');
  if (bgBtn) {
    const isPaused = document.body.classList.toggle('bg-paused');
    localStorage.setItem('bg-paused', isPaused);
    return;
  }

  // Toggle Thème Clair / Sombre
  const themeBtn = event.target.closest('#theme-toggle-btn');
  if (themeBtn) {
    const isDark = document.body.classList.toggle('theme-dark');
    setCookie('theme', isDark ? 'dark' : 'light');
    syncThemeToggleAccessibility(isDark);
  }
});