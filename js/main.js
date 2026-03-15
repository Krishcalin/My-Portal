/* ============================================================
   Phalanx Cyber — Main JavaScript
   Navigation, stat counters, tool catalogue, search, filtering,
   detail expansion, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initToolCatalogue();
  initStatCounters();
  initScrollReveal();
});

/* ---- NAVIGATION ---- */
function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  }, { passive: true });

  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.classList.toggle('open');
      const actions = document.querySelector('.nav__actions');
      if (actions) actions.classList.toggle('open');
    });
  }

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
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current >= 1000 ? current.toLocaleString() : current.toString();
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---- TOOL CATALOGUE ---- */
function initToolCatalogue() {
  if (typeof TOOLS === 'undefined' || typeof TOOL_CATEGORIES === 'undefined') return;

  renderFilters();
  renderCards();
  initToolSearch();
  initToolFilter();
}

function renderFilters() {
  const container = document.getElementById('toolFilters');
  if (!container) return;

  container.innerHTML = TOOL_CATEGORIES.map(cat =>
    `<button class="filter-btn${cat.id === 'all' ? ' active' : ''}" data-filter="${cat.id}">
      ${cat.label}<span class="filter-btn__count">${cat.count}</span>
    </button>`
  ).join('');
}

function renderCards() {
  const grid = document.getElementById('toolGrid');
  if (!grid) return;

  grid.innerHTML = TOOLS.map(tool => {
    const iconSvg = TOOL_ICONS[tool.icon] || TOOL_ICONS.shield;
    const statsHtml = Object.entries(tool.stats)
      .map(([, v]) => `<span class="tool-stat">${v}</span>`)
      .join('');
    const tagsHtml = tool.tags.slice(0, 5)
      .map(t => `<span class="tool-tag">${t}</span>`)
      .join('');
    const isComingSoon = tool.status === 'coming-soon';

    return `<article class="tool-card" data-id="${tool.id}" data-category="${tool.category}" data-tags="${tool.tags.join(' ').toLowerCase()} ${tool.name.toLowerCase()} ${tool.tagline.toLowerCase()} ${tool.language.toLowerCase()}">
      <div class="tool-card__header">
        <div class="tool-card__icon">${iconSvg}</div>
        <div>
          <h3 class="tool-card__name">${tool.name}</h3>
          <span class="tool-card__version">v${tool.version}</span>
          ${isComingSoon ? '<span class="tool-card__badge--coming-soon">Coming Soon</span>' : ''}
        </div>
      </div>
      <p class="tool-card__desc">${tool.tagline}</p>
      <div class="tool-card__stats">${statsHtml}</div>
      <div class="tool-card__tags">${tagsHtml}</div>
      <div class="tool-card__actions">
        ${isComingSoon
          ? '<span class="btn btn--ghost btn--sm" style="opacity:0.5;cursor:default">GitHub (soon)</span>'
          : `<a href="${tool.github}" class="btn btn--primary btn--sm" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>`
        }
        <button class="btn btn--ghost btn--sm tool-card__expand" data-tool="${tool.id}">Details</button>
      </div>
    </article>`;
  }).join('');

  // Attach detail expansion handlers
  grid.querySelectorAll('.tool-card__expand').forEach(btn => {
    btn.addEventListener('click', () => expandToolDetail(btn.dataset.tool));
  });
}

/* ---- SEARCH ---- */
function initToolSearch() {
  const input = document.getElementById('toolSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    applyVisibility(query);
  });
}

function applyVisibility(query) {
  const cards = document.querySelectorAll('.tool-card');
  const activeFilter = document.querySelector('.filter-btn.active');
  const filterCat = activeFilter ? activeFilter.dataset.filter : 'all';
  let visible = 0;

  cards.forEach(card => {
    const matchesFilter = filterCat === 'all' || card.dataset.category === filterCat;
    const matchesSearch = !query || card.dataset.tags.includes(query);
    if (matchesFilter && matchesSearch) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeInUp 0.3s ease forwards';
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  const empty = document.getElementById('toolEmpty');
  if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
}

/* ---- FILTER ---- */
function initToolFilter() {
  const container = document.getElementById('toolFilters');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const input = document.getElementById('toolSearch');
    const query = input ? input.value.toLowerCase().trim() : '';
    applyVisibility(query);
  });
}

/* Footer category links */
function filterFromFooter(cat) {
  const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
  if (btn) btn.click();
}

/* ---- DETAIL EXPANSION ---- */
function expandToolDetail(toolId) {
  const existing = document.querySelector('.tool-detail');
  if (existing) {
    const wasForSame = existing.dataset.tool === toolId;
    existing.remove();
    if (wasForSame) return; // toggle off
  }

  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  const card = document.querySelector(`.tool-card[data-id="${toolId}"]`);
  if (!card) return;

  const highlightsHtml = (tool.highlights || [])
    .map(h => `<li>${h}</li>`)
    .join('');

  const statsHtml = Object.entries(tool.stats)
    .map(([k, v]) => `<div class="tool-detail__meta">
      <div class="tool-detail__meta-label">${k}</div>
      <div class="tool-detail__meta-value">${v}</div>
    </div>`)
    .join('');

  const isComingSoon = tool.status === 'coming-soon';

  const detail = document.createElement('div');
  detail.className = 'tool-detail';
  detail.dataset.tool = toolId;
  detail.innerHTML = `
    <div class="tool-detail__header">
      <h3 class="tool-detail__title">${tool.name}</h3>
      <button class="tool-detail__close" onclick="this.closest('.tool-detail').remove()">Close</button>
    </div>
    <div class="tool-detail__body">
      <div>
        <ul class="tool-detail__highlights">${highlightsHtml}</ul>
      </div>
      <div class="tool-detail__sidebar">
        <div class="tool-detail__meta">
          <div class="tool-detail__meta-label">Language</div>
          <div class="tool-detail__meta-value">${tool.language}</div>
        </div>
        <div class="tool-detail__meta">
          <div class="tool-detail__meta-label">Version</div>
          <div class="tool-detail__meta-value">v${tool.version}</div>
        </div>
        ${statsHtml}
        ${isComingSoon
          ? '<div style="padding:12px 20px;border-radius:var(--radius);background:rgba(245,158,11,0.1);color:#F59E0B;font-weight:600;font-size:0.85rem;text-align:center">Coming to GitHub soon</div>'
          : `<a href="${tool.github}" class="tool-detail__github-btn" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>`
        }
      </div>
    </div>`;

  // Insert after the card
  card.after(detail);
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  const selectors = [
    '.tool-card',
    '.about-card',
    '.timeline__item',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });

  document.querySelectorAll('.catalogue__grid').forEach(grid => grid.classList.add('stagger'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- UTILITY: fade in up animation ---- */
const _style = document.createElement('style');
_style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(_style);

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
