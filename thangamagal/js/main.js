/* ============================================================
   THANGAMAGAL — Main site interactions
   Sticky header, mobile nav panel, language dropdown, scroll reveal
   ============================================================ */

(function () {
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const panel = document.querySelector('.mobile-panel');
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function open() {
      panel.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      isOpen ? close() : open();
    });

    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  function initLangDropdown() {
    document.querySelectorAll('.lang-select-wrap').forEach((wrap) => {
      const btn = wrap.querySelector('.lang-btn');
      const menu = wrap.querySelector('.lang-menu');
      if (!btn || !menu) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        document.querySelectorAll('.lang-menu.open').forEach((m) => m.classList.remove('open'));
        document.querySelectorAll('.lang-btn[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
        if (!isOpen) {
          menu.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.lang-menu.open').forEach((m) => m.classList.remove('open'));
      document.querySelectorAll('.lang-btn[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
  }

  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((s) => observer.observe(s));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initLangDropdown();
    initScrollReveal();
    initActiveNavHighlight();
  });
})();
