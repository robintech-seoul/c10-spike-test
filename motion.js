(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('section-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0 });

  document.querySelectorAll('main section, main > .page-heading').forEach((section) => {
    observer.observe(section);
  });

  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    document.querySelectorAll('.section-revealed').forEach((section) => {
      section.classList.remove('section-revealed');
    });
  });
})();
