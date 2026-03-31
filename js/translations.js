/* ============================================================
   Phalanx Cyber — i18n Translation Engine
   Supports: EN (default), NL (Dutch), DE (German)
   ============================================================ */
(function () {
  'use strict';

  var translations = {
    /* ---- HERO ---- */
    'hero.badge': {
      nl: '<span class="hero__badge-dot"></span>44 Open-Source Beveiligingstools',
      de: '<span class="hero__badge-dot"></span>44 Open-Source Sicherheitstools',
      en: '<span class="hero__badge-dot"></span>44 Open-Source Security Tools'
    },
    'hero.title': {
      nl: 'Open-Source<br><span class="gradient-text">Beveiligingstools</span>',
      de: 'Open-Source<br><span class="gradient-text">Sicherheitstools</span>',
      en: 'Open-Source<br><span class="gradient-text">Security Tools</span>'
    },
    'hero.subtitle': {
      nl: 'Enterprise-beveiliging zou geen zevenenhalf-cijferig budget moeten vereisen.<br><br>PhalanxCyber biedt 44 beveiligingstools, 5.800+ detectieregels en dekking over 20+ compliance-frameworks aan elk beveiligingsteam — van startups tot de Fortune 500. Applicatiecode, cloudinfrastructuur, SaaS, netwerk, dreigingsdetectie, red teaming, risicokwantificering — alles in één open-source platform.<br><br>Gebouwd door een cybersecurity-professional met 25 jaar praktijkervaring in engineering, operations en consulting. Niet door een productteam dat ARR najaagt.<br><br><strong>Open-source. Non-profit. Voor altijd.</strong>',
      en: 'Enterprise security shouldn\'t require a seven-figure budget.<br><br>PhalanxCyber puts 44 security tools, 5,800+ detection rules, and coverage across 20+ compliance frameworks into the hands of every security team — from startups to the Fortune 500. Application code, cloud infrastructure, SaaS, network, threat detection, red teaming, risk quantification — all in one open-source platform.<br><br>Built by a cybersecurity professional with 25 years of hands-on engineering, operations, and consulting experience. Not by a product team chasing ARR.<br><br><strong>Open-source. Not-for-profit. Forever.</strong>'
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
    },

    /* ---- ABOUT PAGE ---- */
    'about.hero.tag': {
      nl: 'Over de maker',
      de: 'Über den Entwickler',
      en: 'About the Creator'
    },
    'about.hero.title': {
      nl: 'Gebouwd door een Practitioner.<br><span class="gradient-text">Geen productbedrijf.</span>',
      de: 'Von einem Praktiker entwickelt.<br><span class="gradient-text">Kein Produktunternehmen.</span>',
      en: 'Built by a Practitioner.<br><span class="gradient-text">Not a Product Company.</span>'
    },
    'about.hero.desc': {
      nl: 'Phalanx Cyber is het werk van één cybersecurity-strateeg met 24+ jaar praktijkervaring in engineering, productleiderschap en enterprise security &mdash; een demonstratie van de kracht van diepgaande praktijkexpertise gecombineerd met AI-ondersteunde ontwikkeling.',
      de: 'Phalanx Cyber ist das Werk eines einzelnen Cybersecurity-Strategen mit über 24 Jahren praktischer Erfahrung in Engineering, Produktführung und Unternehmenssicherheit &mdash; ein Beweis für die Kraft tiefgreifender Praxisexpertise kombiniert mit KI-gestützter Entwicklung.',
      en: 'Phalanx Cyber is the work of a single cybersecurity strategist with 24+ years of hands-on engineering, product leadership, and enterprise security experience &mdash; demonstrating the power of deep practitioner expertise combined with AI-augmented development.'
    },
    'about.career.tag': {
      nl: 'Carrière',
      de: 'Karriere',
      en: 'Career Journey'
    },
    'about.career.title': {
      nl: '24 jaar <span class="gradient-text">Bouwen &amp; Verdedigen</span>',
      de: '24 Jahre <span class="gradient-text">Aufbauen &amp; Verteidigen</span>',
      en: '24 Years of <span class="gradient-text">Building &amp; Defending</span>'
    },
    'about.career.desc': {
      nl: 'Een carrière gedefinieerd door de convergentie van technische diepgang, beveiligingsexpertise en strategisch zakelijk denken &mdash; over industrieën, regio\'s en technologische tijdperken heen.',
      de: 'Eine Karriere geprägt von der Konvergenz aus technischer Tiefe, Sicherheitsexpertise und strategischem Geschäftsdenken &mdash; über Branchen, Regionen und Technologie-Epochen hinweg.',
      en: 'A career defined by the convergence of engineering depth, security expertise, and strategic business thinking &mdash; across industries, geographies, and technology eras.'
    },
    'about.expertise.tag': {
      nl: 'Expertise',
      de: 'Expertise',
      en: 'Expertise'
    },
    'about.expertise.title': {
      nl: 'De <span class="gradient-text">drie perspectieven</span>',
      de: 'Die <span class="gradient-text">drei Perspektiven</span>',
      en: 'The <span class="gradient-text">Three Lenses</span>'
    },
    'about.expertise.desc': {
      nl: 'Wat Krishnendu\'s aanpak onderscheidt, is het vermogen om over drie domeinen te opereren die zelden in één persoon samenkomen: diepgaande engineering, productdenken en bedrijfsstrategie.',
      de: 'Was Krishnendus Ansatz auszeichnet, ist die Fähigkeit, in drei Bereichen zu agieren, die selten in einer Person vereint sind: tiefgreifendes Engineering, Produktdenken und Geschäftsstrategie.',
      en: 'What makes Krishnendu\'s approach distinctive is the ability to operate across three domains that are rarely combined in a single practitioner: deep engineering, product thinking, and business strategy.'
    },
    'about.thought.tag': {
      nl: 'Thought Leadership',
      de: 'Thought Leadership',
      en: 'Thought Leadership'
    },
    'about.thought.title': {
      nl: 'Gepubliceerd <span class="gradient-text">Onderzoek &amp; Artikelen</span>',
      de: 'Veröffentlichte <span class="gradient-text">Forschung &amp; Artikel</span>',
      en: 'Published <span class="gradient-text">Research &amp; Writing</span>'
    },
    'about.thought.desc': {
      nl: 'Krishnendu publiceert regelmatig technisch onderzoek en strategische analyses op LinkedIn over red teaming, threat intelligence, AI in beveiliging en enterprise verdedigingsstrategieën.',
      de: 'Krishnendu veröffentlicht regelmäßig technische Forschung und strategische Analysen auf LinkedIn zu Red Teaming, Threat Intelligence, KI in der Sicherheit und Unternehmensverteidigungsstrategien.',
      en: 'Krishnendu regularly publishes technical research and strategic analysis on LinkedIn, covering red teaming, threat intelligence, AI in security, and enterprise defense strategies.'
    },
    'about.portfolio.tag': {
      nl: 'Open-Source Portfolio',
      de: 'Open-Source Portfolio',
      en: 'Open-Source Portfolio'
    },
    'about.portfolio.title': {
      nl: '<span class="gradient-text">31 Repositories.</span> Eén visie.',
      de: '<span class="gradient-text">31 Repositories.</span> Eine Vision.',
      en: '<span class="gradient-text">31 Repositories.</span> One Vision.'
    },
    'about.portfolio.desc': {
      nl: 'Elke repository op GitHub is persoonlijk gebouwd door Krishnendu &mdash; van architectuurontwerp tot de laatste regel code. Samen vormen ze het meest uitgebreide open-source enterprise beveiligingsplatform dat vandaag beschikbaar is.',
      de: 'Jedes Repository auf GitHub wurde persönlich von Krishnendu erstellt &mdash; vom Architekturentwurf bis zur letzten Codezeile. Zusammen bilden sie die umfassendste Open-Source-Unternehmenssicherheitsplattform, die heute verfügbar ist.',
      en: 'Every repository on GitHub is personally built by Krishnendu &mdash; from architecture design to the last line of code. Together, they form the most comprehensive open-source enterprise security platform available today.'
    },
    'about.creds.tag': {
      nl: 'Referenties',
      de: 'Qualifikationen',
      en: 'Credentials'
    },
    'about.creds.title': {
      nl: 'Opleiding &amp; <span class="gradient-text">Certificeringen</span>',
      de: 'Ausbildung &amp; <span class="gradient-text">Zertifizierungen</span>',
      en: 'Education &amp; <span class="gradient-text">Certifications</span>'
    },
    'about.contact.tag': {
      nl: 'Contact',
      de: 'Kontakt',
      en: 'Contact'
    },
    'about.contact.title': {
      nl: 'Begin het <span class="gradient-text">gesprek</span>',
      de: 'Starten Sie das <span class="gradient-text">Gespräch</span>',
      en: 'Start the <span class="gradient-text">Conversation</span>'
    },
    'about.contact.desc': {
      nl: 'Wilt u contact opnemen? Stuur me een e-mail en ik zal proberen te reageren. We kunnen altijd een vergadering plannen om verder te bespreken.',
      de: 'Möchten Sie sich vernetzen? Schreiben Sie mir eine E-Mail und ich werde versuchen zu antworten. Wir können jederzeit ein Treffen vereinbaren, um weitere Details zu besprechen.',
      en: 'If you would like to connect, drop me an email and I will try to respond back. We can always set up a meeting to discuss further.'
    },

    /* ---- STRATEGY PAGE ---- */
    'strat.hero.tag': {
      nl: 'Cybersecurity-strategie',
      de: 'Cybersecurity-Strategie',
      en: 'Cybersecurity Strategy'
    },
    'strat.hero.title': {
      nl: 'Een risicogebaseerde aanpak voor<br><span class="gradient-text">Enterprise Cybersecurity</span>',
      de: 'Ein risikobasierter Ansatz für<br><span class="gradient-text">Enterprise Cybersecurity</span>',
      en: 'A Risk-Based Approach to<br><span class="gradient-text">Enterprise Cybersecurity</span>'
    },
    'strat.hero.desc': {
      nl: 'Organisaties gaven in 2024 meer dan $200 miljard uit aan cybersecurity, maar het aantal inbreuken blijft stijgen. Het antwoord is niet meer uitgeven &mdash; het is slimmere strategie. Deze pagina presenteert een uitgebreid, framework-gebaseerd cybersecurity-strategie op basis van industrieonderzoek, mondiale standaarden en 24 jaar praktijkervaring.',
      de: 'Unternehmen gaben 2024 über 200 Milliarden Dollar für Cybersecurity aus, dennoch nehmen Sicherheitsverletzungen weiter zu. Die Antwort liegt nicht in mehr Ausgaben &mdash; sondern in klügerer Strategie. Diese Seite präsentiert eine umfassende, framework-basierte Cybersecurity-Strategie basierend auf Branchenforschung, globalen Standards und 24 Jahren Praxiserfahrung.',
      en: 'Organizations spent over $200 billion on cybersecurity in 2024, yet breaches continue to rise. The answer is not more spending &mdash; it is smarter strategy. This page presents a comprehensive, framework-aligned cybersecurity strategy informed by industry research, global standards, and 24 years of practitioner experience.'
    },
    'strat.landscape.tag': {
      nl: 'De uitdaging',
      de: 'Die Herausforderung',
      en: 'The Challenge'
    },
    'strat.landscape.title': {
      nl: 'Waarom cybersecurity-strategie <span class="gradient-text">moet evolueren</span>',
      de: 'Warum Cybersecurity-Strategie <span class="gradient-text">sich weiterentwickeln muss</span>',
      en: 'Why Cybersecurity Strategy <span class="gradient-text">Must Evolve</span>'
    },
    'strat.landscape.desc': {
      nl: 'Het digitale aanvalsoppervlak is exponentieel gegroeid. Cloudadoptie, thuiswerken, IoT-proliferatie, AI-aanvallen en afhankelijkheden van derden hebben perimeter-gebaseerde beveiliging achterhaald gemaakt. Organisaties hebben een risicogebaseerde, veerkracht-eerst aanpak nodig.',
      de: 'Die digitale Angriffsfläche hat sich exponentiell vergrößert. Cloud-Adoption, Remote-Arbeit, IoT-Verbreitung, KI-gestützte Angriffe und Abhängigkeiten von Drittanbietern haben perimeterbasierte Sicherheit obsolet gemacht. Organisationen benötigen einen risikobasierten, resilienzorientierten Ansatz.',
      en: 'The digital attack surface has expanded exponentially. Cloud adoption, remote work, IoT proliferation, AI-powered attacks, and third-party dependencies have rendered perimeter-based security obsolete. Organizations need a risk-based, resilience-first approach.'
    },
    'strat.mandates.tag': {
      nl: 'Transformatiekader',
      de: 'Transformationsrahmen',
      en: 'Transformation Framework'
    },
    'strat.mandates.title': {
      nl: 'Drie mandaten voor <span class="gradient-text">cybersecurity-transformatie</span>',
      de: 'Drei Mandate für die <span class="gradient-text">Cybersecurity-Transformation</span>',
      en: 'Three Mandates for <span class="gradient-text">Cybersecurity Transformation</span>'
    },
    'strat.mandates.desc': {
      nl: 'Industrieonderzoek bij \'s werelds grootste organisaties heeft drie brede mandaten onthuld die effectieve cybersecurity-transformatie stimuleren &mdash; van maturity-gebaseerde checklists naar een risicogebaseerd, veerkracht-eerst model.',
      de: 'Branchenforschung mit den weltweit größten Organisationen hat drei zentrale Mandate identifiziert, die eine effektive Cybersecurity-Transformation vorantreiben &mdash; weg von Reifegradmodellen hin zu einem risikobasierten, resilienzorientierten Ansatz.',
      en: 'Industry research with the world\'s largest organizations has revealed three broad mandates that drive effective cybersecurity transformation &mdash; shifting from maturity-based checklists to a risk-based, resilience-first model.'
    },
    'strat.pillars.tag': {
      nl: 'Strategische pijlers',
      de: 'Strategische Säulen',
      en: 'Strategic Pillars'
    },
    'strat.pillars.title': {
      nl: 'Zes pijlers van een <span class="gradient-text">moderne cyberverdediging</span>',
      de: 'Sechs Säulen einer <span class="gradient-text">modernen Cyberabwehr</span>',
      en: 'Six Pillars of a <span class="gradient-text">Modern Cyber Defense</span>'
    },
    'strat.pillars.desc': {
      nl: 'Een uitgebreide cybersecurity-strategie moet zes onderling verbonden domeinen aanpakken. Elke pijler is gekoppeld aan industriestandaarden en wordt ondersteund door open-source tools uit de Phalanx Cyber-collectie.',
      de: 'Eine umfassende Cybersecurity-Strategie muss sechs miteinander verbundene Bereiche abdecken. Jede Säule ist mit Industriestandards verknüpft und wird durch Open-Source-Tools der Phalanx Cyber-Sammlung unterstützt.',
      en: 'A comprehensive cybersecurity strategy must address six interconnected domains. Each pillar maps to industry frameworks and is supported by open-source tools from the Phalanx Cyber collection.'
    },
    'strat.frameworks.tag': {
      nl: 'Frameworks &amp; standaarden',
      de: 'Frameworks &amp; Standards',
      en: 'Frameworks &amp; Standards'
    },
    'strat.frameworks.title': {
      nl: 'Het <span class="gradient-text">framework-landschap</span>',
      de: 'Die <span class="gradient-text">Framework-Landschaft</span>',
      en: 'The <span class="gradient-text">Framework Landscape</span>'
    },
    'strat.frameworks.desc': {
      nl: 'Geen enkel framework dekt elke dimensie van cybersecurity. Een volwassen strategie combineert meerdere frameworks &mdash; elk gericht op specifieke domeinen, doelgroepen en wettelijke vereisten.',
      de: 'Kein einzelnes Framework deckt jede Dimension der Cybersecurity ab. Eine reife Strategie kombiniert mehrere Frameworks &mdash; jedes für spezifische Bereiche, Zielgruppen und regulatorische Anforderungen.',
      en: 'No single framework covers every dimension of cybersecurity. A mature strategy layers multiple frameworks &mdash; each addressing specific domains, audiences, and regulatory requirements.'
    },
    'strat.cloud.tag': {
      nl: 'Cloud-native frameworks',
      de: 'Cloud-native Frameworks',
      en: 'Cloud-Native Frameworks'
    },
    'strat.cloud.title': {
      nl: 'OEM beveiligings<span class="gradient-text">frameworks &amp; Well-Architected</span>',
      de: 'OEM Sicherheits<span class="gradient-text">frameworks &amp; Well-Architected</span>',
      en: 'OEM Security <span class="gradient-text">Frameworks &amp; Well-Architected</span>'
    },
    'strat.cloud.desc': {
      nl: 'Elke grote cloudprovider biedt een beveiligingsgericht well-architected framework. Dit zijn geen marketingmaterialen &mdash; het zijn technische handleidingen voor het bouwen van veilige, veerkrachtige en kostenefficiënte cloudomgevingen.',
      de: 'Jeder große Cloud-Anbieter bietet ein sicherheitsorientiertes Well-Architected Framework. Dies sind keine Marketingmaterialien &mdash; es sind technische Leitfäden für den Aufbau sicherer, resilienter und kosteneffizienter Cloud-Umgebungen.',
      en: 'Each major cloud provider offers a security-focused well-architected framework. These are not marketing material &mdash; they are engineering playbooks for building secure, resilient, and cost-efficient cloud environments.'
    },
    'strat.review.tag': {
      nl: 'Doorlopende evaluatie',
      de: 'Kontinuierliche Überprüfung',
      en: 'Continuous Review'
    },
    'strat.review.title': {
      nl: 'Strategie is geen <span class="gradient-text">eenmalige gebeurtenis</span>',
      de: 'Strategie ist kein <span class="gradient-text">einmaliges Ereignis</span>',
      en: 'Strategy is Not <span class="gradient-text">a One-Time Event</span>'
    },
    'strat.review.desc': {
      nl: 'Toonaangevende organisaties hanteren een driestaps continu evaluatieproces om ervoor te zorgen dat de cybersecurity-strategie afgestemd blijft op evoluerende dreigingen, bedrijfsprioriteiten en technologische mogelijkheden.',
      de: 'Führende Organisationen verfolgen einen dreistufigen kontinuierlichen Überprüfungsprozess, um sicherzustellen, dass die Cybersecurity-Strategie auf sich entwickelnde Bedrohungen, Geschäftsprioritäten und technologische Möglichkeiten ausgerichtet bleibt.',
      en: 'Leading organizations adopt a three-step continuous review process to ensure cybersecurity strategy remains aligned to evolving threats, business priorities, and technology capabilities.'
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
