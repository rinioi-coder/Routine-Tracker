document.addEventListener('DOMContentLoaded', () => {
  // Toggle logic
  document.querySelectorAll('.toggle').forEach(btn => {
    const card = btn.closest('.function-card');
    const desc = card.querySelector('.description');
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const opening = !card.classList.contains('active');
      card.classList.toggle('active', opening);
      btn.setAttribute('aria-expanded', String(opening));
      btn.textContent = opening ? '▲ Hide' : '▼ Show';
      card.classList.add('visible');
    });
  });

  // IntersectionObserver reveal
  const revealTargets = [];
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) revealTargets.push(heroInner);
  document.querySelectorAll('.function-card').forEach(el => revealTargets.push(el));

  function reveal(el){ el.classList.add('visible'); }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(t => io.observe(t));
  } else {
    revealTargets.forEach(reveal);
  }

  // Handle direct anchor links
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      target.classList.add('visible');
      const parentCard = target.closest('.function-card');
      if (parentCard) {
        parentCard.classList.add('active');
        const btn = parentCard.querySelector('.toggle');
        if (btn) { btn.setAttribute('aria-expanded','true'); btn.textContent = '▲ Hide'; }
      }
    }
  }
});
