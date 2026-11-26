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

// --- GESTION DE LA TRADUCTION (FR / EN) ---
const SUPPORTED_LANGS = ['fr', 'en'];
const translationsCache = {};
let currentLang = 'fr';
let currentTranslations = {};

function t(key, fallback = '') {
  if (Object.prototype.hasOwnProperty.call(currentTranslations, key)) {
    return currentTranslations[key];
  }
  return fallback;
}

window.portfolioI18n = {
  t,
  getLang: () => currentLang,
};

async function loadTranslations(lang) {
  const targetLang = SUPPORTED_LANGS.includes(lang) ? lang : 'fr';
  if (translationsCache[targetLang]) {
    return translationsCache[targetLang];
  }

  try {
    const response = await fetch(`locales/${targetLang}.json`, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const dict = await response.json();
    translationsCache[targetLang] = dict;
    return dict;
  } catch (error) {
    console.error(`Impossible de charger les traductions (${targetLang}):`, error);
    return translationsCache.fr || {};
  }
}

function applyTranslations(dict) {
  if (!dict || typeof dict !== 'object') return;
  currentTranslations = dict;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute('aria-label', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute('alt', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-tooltip]').forEach((el) => {
    const key = el.getAttribute('data-i18n-tooltip');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute('data-tooltip', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-modal-desc]').forEach((el) => {
    const key = el.getAttribute('data-i18n-modal-desc');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute('data-modal-desc', dict[key]);
    }
  });

  syncBgToggleAccessibility(document.body.classList.contains('bg-paused'));
  syncThemeToggleAccessibility(document.body.classList.contains('theme-dark'));
}

function syncLanguageToggle(lang) {
  document.documentElement.lang = lang;

  const langBtn = document.getElementById('lang-toggle-btn') || document.querySelector('.lang-switch');
  if (!langBtn) return;

  const nextLangLabel = lang === 'fr' ? 'EN' : 'FR';
  const nextAriaLabel =
    lang === 'fr'
      ? t('aria_lang_to_en', 'Passer en anglais')
      : t('aria_lang_to_fr', 'Switch to French');

  langBtn.textContent = nextLangLabel;
  langBtn.setAttribute('aria-label', nextAriaLabel);
  langBtn.setAttribute('title', nextAriaLabel);
}

function detectInitialLanguage() {
  const savedLang = getCookie('lang');
  if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
    return savedLang;
  }
  const browserLang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
  return browserLang.startsWith('en') ? 'en' : 'fr';
}

async function setLanguage(lang, persist = true) {
  const normalizedLang = SUPPORTED_LANGS.includes(lang) ? lang : 'fr';
  currentLang = normalizedLang;
  syncLanguageToggle(normalizedLang);

  if (persist) {
    setCookie('lang', normalizedLang);
  }

  const dict = await loadTranslations(normalizedLang);
  if (currentLang === normalizedLang) {
    applyTranslations(dict);
    syncLanguageToggle(normalizedLang);
  }
}

// --- GESTION DU FOND ANIMÉ ---
const savedBgState = getCookie('bg-paused');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const initialBgPaused = savedBgState === 'true' || (savedBgState === null && prefersReduced);

function syncBgToggleAccessibility(isPaused) {
  const bgBtn = document.getElementById('bg-toggle-btn');
  if (!bgBtn) return;
  bgBtn.setAttribute('aria-pressed', String(isPaused));
  bgBtn.setAttribute(
    'aria-label',
    isPaused
      ? t('aria_bg_play', "Reprendre l'animation d'arrière-plan")
      : t('aria_bg_pause', "Mettre en pause l'animation d'arrière-plan")
  );
}

// Application de l'état initial
if (initialBgPaused) {
  document.body.classList.add('bg-paused');
} else if (savedBgState === 'false') {
  document.body.classList.add('bg-playing');
}
syncBgToggleAccessibility(document.body.classList.contains('bg-paused'));

// --- GESTION DU THÈME (Clair par défaut / Sombre via theme-dark) ---
const savedTheme = getCookie('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function syncThemeToggleAccessibility(isDark) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  themeBtn.setAttribute('aria-pressed', String(isDark));
  themeBtn.setAttribute(
    'aria-label',
    isDark
      ? t('aria_theme_to_light', 'Passer au thème clair')
      : t('aria_theme_to_dark', 'Passer au thème sombre')
  );
}

// Appliquer le thème sombre si sauvegardé ou si préférence système
if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
  document.body.classList.add('theme-dark');
}
syncThemeToggleAccessibility(document.body.classList.contains('theme-dark'));

// Initialisation de la langue au chargement
setLanguage(detectInitialLanguage(), false);

// Écouteur global pour les boutons
document.addEventListener('click', (event) => {
  // Toggle Langue (FR / EN)
  const langBtn = event.target.closest('#lang-toggle-btn, .lang-switch');
  if (langBtn) {
    const nextLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(nextLang, true);
    return;
  }

  // Toggle Fond animé
  const bgBtn = event.target.closest('#bg-toggle-btn');
  if (bgBtn) {
    const isPaused = document.body.classList.toggle('bg-paused');
    document.body.classList.toggle('bg-playing', !isPaused);
    setCookie('bg-paused', String(isPaused));
    syncBgToggleAccessibility(isPaused);
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