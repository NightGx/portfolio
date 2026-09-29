// --- GESTION DU FOND ANIMÉ ---
const savedBgState = localStorage.getItem('bg-paused');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Application de l'état initial
if (savedBgState === 'true' || (savedBgState === null && prefersReduced)) {
  document.body.classList.add('bg-paused');
}

// Écouteur global pour le bouton (délégation d'événements)
document.addEventListener('click', (event) => {
  const btn = event.target.closest('#bg-toggle-btn');
  if (!btn) return; // Si on n'a pas cliqué sur le bouton, on arrête là

  const isPaused = document.body.classList.toggle('bg-paused');
  localStorage.setItem('bg-paused', isPaused);
});