/* ============================================================
   SkyHigh Scanner — Main JavaScript
   Navigation, scroll effects, stat counters, product filtering,
   scroll reveal animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initStatCounters();
  initProductFilter();
  initScrollReveal();
});

/* ---- NAVIGATION ---- */
function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (nav) {
      nav.classList.toggle('nav--scrolled', scrollY > 50);
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile hamburger
  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.classList.toggle('open');
      const actions = document.querySelector('.nav__actions');
      if (actions) actions.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  if (links) {
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        const actions = document.querySelector('.nav__actions');
        if (actions) actions.classList.remove('open');
      });
    });
  }
}

/* ---- STAT COUNTERS ---- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stats__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function formatNumber(n) {
  if (n >= 1000) {
    return n.toLocaleString();
  }
  return n.toString();
}

/* ---- PRODUCT FILTER ---- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-category]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  // Auto-add reveal class to elements
  const selectors = [
    '.pillar-card',
    '.product-card',
    '.cap-card',
    '.compliance__item',
    '.arch-step',
    '.product-detail',
    '.pillar-section',
    '.about-card',
    '.exec-card',
    '.ai-card',
    '.board-card',
    '.context-card',
    '.lockin-card',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // Add stagger class to grids
  document.querySelectorAll(
    '.pillars__grid, .showcase__grid, .capabilities__grid, .compliance__grid, .about-section__grid, .ai-grid, .exec-grid, .board-grid, .context-grid, .lockin-grid'
  ).forEach(grid => {
    grid.classList.add('stagger');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- UTILITY: fade in up animation ---- */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ---- SMOOTH SCROLL for hash links ---- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
