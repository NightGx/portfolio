// --- GESTION DU FOND ANIMÉ ---
const savedBgState = localStorage.getItem('bg-paused');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Application de l'état initial
if (savedBgState === 'true' || (savedBgState === null && prefersReduced)) {
  document.body.classList.add('bg-paused');
}

// --- GESTION DU THÈME (Clair par défaut / Sombre via theme-dark) ---
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Appliquer le thème sombre si sauvegardé ou si préférence système
if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
  document.body.classList.add('theme-dark');
}

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
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
});