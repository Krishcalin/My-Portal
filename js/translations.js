/* ============================================================
   Phalanx Cyber — i18n Translation Engine
   Supports: EN (default), NL (Dutch), DE (German)
   ============================================================ */
(function () {
  'use strict';

  var translations = {
    /* ---- HERO ---- */
    'hero.badge': {
      nl: '<span class="hero__badge-dot"></span>25 Open-Source Beveiligingstools',
      de: '<span class="hero__badge-dot"></span>25 Open-Source Sicherheitstools',
      en: '<span class="hero__badge-dot"></span>25 Open-Source Security Tools'
    },
    'hero.title': {
      nl: 'Open-Source<br><span class="gradient-text">Beveiligingstools</span>',
      de: 'Open-Source<br><span class="gradient-text">Sicherheitstools</span>',
      en: 'Open-Source<br><span class="gradient-text">Security Tools</span>'
    },
    'hero.subtitle': {
      nl: '25 scanners voor applicatiecode, cloudinfrastructuur, SaaS-platforms, netwerkapparaten en dreigingsdetectie. 2.800+ beveiligingsregels. Gebouwd door een practitioner. Gratis voor altijd.',
      de: '25 Scanner für Anwendungscode, Cloud-Infrastruktur, SaaS-Plattformen, Netzwerkgeräte und Bedrohungserkennung. 2.800+ Sicherheitsregeln. Von einem Praktiker entwickelt. Für immer kostenlos.',
      en: '25 scanners covering application code, cloud infrastructure, SaaS platforms, network devices, and threat detection. 2,800+ security rules. Built by a practitioner. Free forever.'
    },
    'hero.cta1': {
      nl: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg> Bekijk tools',
      de: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg> Tools durchsuchen',
      en: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg> Browse Tools'
    },
    'hero.cta2': {
      nl: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> Bekijk op GitHub',
      de: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> Auf GitHub ansehen',
      en: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> View on GitHub'
    },

    /* ---- STATS ---- */
    'stats.tools': { nl: 'Beveiligingstools', de: 'Sicherheitstools', en: 'Security Tools' },
    'stats.rules': { nl: 'Beveiligingsregels', de: 'Sicherheitsregeln', en: 'Security Rules' },
    'stats.domains': { nl: 'Beveiligingsdomeinen', de: 'Sicherheitsdomänen', en: 'Security Domains' },
    'stats.frameworks': { nl: 'Frameworks Toegewezen', de: 'Frameworks Zugeordnet', en: 'Frameworks Mapped' },
    'stats.cost': { nl: 'Licentiekosten', de: 'Lizenzkosten', en: 'Licence Cost' },

    /* ---- CATALOGUE ---- */
    'catalogue.tag': { nl: 'Open-Source Tools', de: 'Open-Source Tools', en: 'Open-Source Tools' },
    'catalogue.title': { nl: 'Verken de collectie', de: 'Sammlung durchsuchen', en: 'Browse the Collection' },
    'catalogue.desc': {
      nl: 'Elke tool is open-source, gratis te gebruiken en gebouwd met Python. Filter op domein, zoek op naam of bekijk de details.',
      de: 'Jedes Tool ist Open Source, kostenlos nutzbar und mit Python entwickelt. Filtern Sie nach Domäne, suchen Sie nach Name oder erkunden Sie die Details.',
      en: 'Every tool is open-source, free to use, and built with Python. Filter by domain, search by name, or explore the details.'
    }
  };

  function setLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        el.innerHTML = translations[key][lang];
      }
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('phalanx-lang', lang); } catch (e) {}
    document.documentElement.lang = lang === 'nl' ? 'nl' : lang === 'de' ? 'de' : 'en';
  }

  window.setLang = setLang;

  document.addEventListener('DOMContentLoaded', function () {
    var saved = null;
    try { saved = localStorage.getItem('phalanx-lang'); } catch (e) {}
    if (saved && saved !== 'en') setLang(saved);
  });
})();
