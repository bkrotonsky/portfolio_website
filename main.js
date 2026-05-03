/* ============================================================
   PORTFOLIO — Navigation & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Page routing ────────────────────────────────────────── */
  const pages   = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-links a');

  function showPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(a => a.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    const activeLink = document.querySelector(`.nav-links a[data-page="${id}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Trigger fade-in animations
    const fadeEls = target?.querySelectorAll('.fade-in');
    fadeEls?.forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth; // reflow
      el.style.animation = '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pageId = link.dataset.page;
      showPage(pageId);
    });
  });

  // In-page link buttons
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showPage(btn.dataset.goto);
    });
  });

  // Show home on load
  showPage('home');

  /* ── Intersection observer for stagger rows ─────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.stagger-pair').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    observer.observe(el);
  });

  /* ── Nav scroll shadow ───────────────────────────────────── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 1px 20px rgba(0,0,0,0.06)'
      : 'none';
  });

});
