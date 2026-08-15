/* ============================================================
   THANGAMAGAL — Typewriter animation for the hero business name
   Respects prefers-reduced-motion. Runs once on load, replays on language change.
   ============================================================ */

(function () {
  const TYPE_SPEED = 130; // ms per character — unhurried, premium pace
  const HOLD_BEFORE_START = 350;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function runTypewriter(el) {
    if (!el) return;
    const fullText = el.getAttribute('data-typewriter-text') ||
      (translations[getStoredLang()] && translations[getStoredLang()].heroName) || '';

    // Reserve space so there is no layout shift while typing
    el.style.display = 'inline-block';

    if (prefersReducedMotion()) {
      el.textContent = fullText;
      return;
    }

    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    let i = 0;
    function typeNext() {
      el.textContent = fullText.slice(0, i);
      el.appendChild(cursor);
      i++;
      if (i <= fullText.length) {
        setTimeout(typeNext, TYPE_SPEED);
      }
    }
    setTimeout(typeNext, HOLD_BEFORE_START);
  }

  function initTypewriter() {
    const el = document.querySelector('[data-typewriter]');
    if (!el) return;
    const lang = (typeof getStoredLang === 'function') ? getStoredLang() : 'en';
    el.setAttribute('data-typewriter-text', translations[lang].heroName);
    runTypewriter(el);
  }

  document.addEventListener('DOMContentLoaded', initTypewriter);

  // Optional replay when the language changes
  document.addEventListener('tgm:langchange', (e) => {
    const el = document.querySelector('[data-typewriter]');
    if (!el) return;
    const lang = e.detail.lang;
    el.setAttribute('data-typewriter-text', translations[lang].heroName);
    runTypewriter(el);
  });
})();
