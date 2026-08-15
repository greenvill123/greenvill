/* ============================================================
   THANGAMAGAL — FAQ accordion
   ============================================================ */

(function () {
  function closeItem(item) {
    const answer = item.querySelector('.faq-answer');
    const btn = item.querySelector('.faq-question');
    item.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = null;
  }

  function openItem(item) {
    const answer = item.querySelector('.faq-answer');
    const btn = item.querySelector('.faq-question');
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }

  function initFaq() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFaq);

  // Keep open answers correctly sized if language text changes their height
  document.addEventListener('tgm:langchange', () => {
    document.querySelectorAll('.faq-item.open').forEach((item) => {
      const answer = item.querySelector('.faq-answer');
      requestAnimationFrame(() => {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      });
    });
  });
})();
