/* ============================================================
   home.js — revamped homepage catalogue (Modern-SaaS)
   Renders tool cards from tools.js, wires each to tools/<id>.html,
   plus search, category filters, stat counters, theme toggle.
   ============================================================ */

const CATLABEL = {
  appsec: "Application Security", cloud: "Cloud Security", saas: "SaaS / SSPM",
  infra: "Infrastructure", threat: "Threat Detection", redteam: "Red Teaming",
  easm: "Attack Surface", risk: "Governance & Risk",
};

function initHome() {
  renderFilters();
  renderCards();
  initSearch();
  initFilter();
  initCounters();
  initReveal();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initHome);
else initHome();

function renderFilters() {
  const el = document.getElementById("filters");
  if (!el || typeof TOOL_CATEGORIES === "undefined") return;
  el.innerHTML = TOOL_CATEGORIES.map(c =>
    `<button class="filter-btn${c.id === "all" ? " active" : ""}" data-filter="${c.id}">${c.label}<span class="filter-btn__count">${c.count}</span></button>`
  ).join("");
}

function cardHTML(t) {
  const icon = (typeof TOOL_ICONS !== "undefined" && TOOL_ICONS[t.icon]) || (TOOL_ICONS && TOOL_ICONS.shield) || "";
  const chips = Object.values(t.stats || {}).slice(0, 3).map(v => `<span class="chip">${v}</span>`).join("");
  const tags = (t.tags || []).slice(0, 4).map(x => `<span class="tag">${x}</span>`).join("");
  const search = (t.name + " " + t.tagline + " " + (t.tags || []).join(" ") + " " + (t.language || "")).toLowerCase().replace(/"/g, "");
  const report = t.sampleReport
    ? `<a class="btn btn--ghost btn--sm" href="${t.sampleReport}" target="_blank" rel="noopener">Report</a>` : "";
  return `<article class="card tool-card reveal" data-category="${t.category}" data-search="${search}">
    <div class="tool-card__top">
      <div class="tool-card__icon">${icon}</div>
      <div>
        <div class="tool-card__cat">${CATLABEL[t.category] || t.category}</div>
        <h3 class="tool-card__name">${t.name}</h3>
        <span class="tool-card__ver">v${t.version}</span>
      </div>
    </div>
    <p class="tool-card__desc">${t.tagline}</p>
    <div class="tool-card__stats">${chips}</div>
    <div class="tool-card__tags">${tags}</div>
    <div class="tool-card__actions">
      <a class="btn btn--primary btn--sm" href="tools/${t.id}.html">Explore</a>
      <a class="btn btn--secondary btn--sm" href="${t.github}" target="_blank" rel="noopener">GitHub</a>
      ${report}
    </div>
  </article>`;
}

function renderCards() {
  const grid = document.getElementById("toolGrid");
  if (!grid || typeof TOOLS === "undefined") return;
  grid.innerHTML = TOOLS.map(cardHTML).join("");
}

function applyVisibility() {
  const q = (document.getElementById("search")?.value || "").toLowerCase().trim();
  const active = document.querySelector(".filter-btn.active");
  const cat = active ? active.dataset.filter : "all";
  let n = 0;
  document.querySelectorAll(".tool-card").forEach(c => {
    const show = (cat === "all" || c.dataset.category === cat) && (!q || c.dataset.search.includes(q));
    c.classList.toggle("hidden", !show);
    if (show) n++;
  });
  const empty = document.getElementById("empty");
  if (empty) empty.style.display = n ? "none" : "block";
  const count = document.getElementById("resultCount");
  if (count) count.textContent = n;
}

function initSearch() {
  const i = document.getElementById("search");
  if (i) i.addEventListener("input", applyVisibility);
}
function initFilter() {
  const el = document.getElementById("filters");
  if (!el) return;
  el.addEventListener("click", e => {
    const b = e.target.closest(".filter-btn");
    if (!b) return;
    el.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    applyVisibility();
  });
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.textContent = e.dataset.count + (e.dataset.suffix || "")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { runCount(e.target); io.unobserve(e.target); }
  }), { threshold: 0.4 });
  els.forEach(e => io.observe(e));
}
function runCount(el) {
  const target = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", dur = 1400, t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(eased * target);
    el.textContent = (v >= 1000 ? v.toLocaleString() : v) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  els.forEach(e => io.observe(e));
}

function pcxToggle() {
  const r = document.documentElement;
  const next = (r.getAttribute("data-theme") || "light") === "dark" ? "light" : "dark";
  r.setAttribute("data-theme", next);
  try { localStorage.setItem("pcx-theme", next); } catch (e) {}
}
