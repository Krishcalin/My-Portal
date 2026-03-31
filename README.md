# Phalanx Cyber — Open-Source Security Tools Portal

A single-page web portal showcasing **44 open-source security tools** across 9 security domains. Built as a static site with no backend — just HTML, CSS, and vanilla JavaScript.

**Live site:** Deployed via GitHub Pages

---

## At a Glance

| Metric | Value |
|--------|-------|
| Tools | 44 |
| Security Domains | 9 |
| Compliance Frameworks | 20+ |
| Security Rules (across all tools) | 5,800+ |
| Sample Report Pages | 35 |
| Tool Overview Pages | 9 |
| Languages | EN, NL |

---

## Tool Categories

| Category | Tools | Examples |
|----------|------:|---------|
| Application Security | 7 | SAST, DAST, API Security, OWASP LLM, SAP ABAP, MAST, AI SPM |
| Cloud Security | 6 | AWS, Azure, GCP CNAPP, OCI CNAPP, MultiCloud, Cloud Detection |
| SaaS / SSPM | 9 | M365, ServiceNow, SuccessFactors, Tableau, SAP S/4HANA, Oracle EBS, Snowflake, Oracle SaaS, SAP Ariba |
| Infrastructure | 9 | Fortinet, Cisco, Palo Alto, Kubernetes KSPM, Vulnerability Mgmt, Linux/Windows Hardening, OT/ICS, Zscaler |
| Threat Detection | 3 | Detection Engineering, CrowdStrike Red Team, CrowdStrike Falcon |
| Red Teaming | 4 | Windows Red Team, RHEL Red Team, AD Attack Scenarios, Autonomous Pentest |
| Attack Surface | 1 | EASM Scanner |
| Governance & Risk | 5 | Cyber Risk Quantification, Responsible AI, CTEM, Risk OpCenter, TPRM |

---

## Repository Structure

```
My-Portal/
├── index.html                    # Main portal page (tool catalogue)
├── about.html                    # About / founder page
├── strategy.html                 # Cybersecurity strategy page
├── risk-quantification.html      # Risk quantification dashboard page
├── css/
│   └── styles.css                # Portal styles (dark theme, glassmorphic cards)
├── js/
│   ├── tools.js                  # Tool data array (44 entries) + categories + icons
│   ├── main.js                   # Card rendering, search, filters, detail expansion
│   └── translations.js           # i18n engine (EN, NL)
├── assets/
│   └── favicon.svg               # Site favicon
├── reports/                      # Sample reports, overviews, and generators
│   ├── generate_reports.py       # Batch generator for sample report HTML pages
│   ├── generate_overviews.py     # Batch generator for tool overview HTML pages
│   ├── *-report.html (35 files)  # Interactive sample report pages (scanner tools)
│   └── *-overview.html (9 files) # Tool overview pages (non-scanner tools)
├── synthetic_data/               # Synthetic JSON data for tools without local repos
│   ├── ariba_report.json
│   └── zscaler_report.json
└── LICENSE                       # GPL-3.0
```

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Main portal — hero, tool catalogue with search/filters, category navigation |
| `strategy.html` | Cybersecurity strategy — maturity model, governance, compliance |
| `risk-quantification.html` | Risk dashboard — composite risk gauge, trend chart, CTEM phases, loss exceedance curve, compliance coverage |
| `about.html` | Founder bio, career timeline, certifications |

**Navigation order:** Strategy | Tools | Risk Quantification | Why Open Source | About | GitHub

---

## Sample Reports & Overviews

Every tool card has three action buttons:

1. **GitHub** — Links to the tool's repository
2. **Sample Report** (cyan, 35 tools) — Interactive report page with:
   - Severity dashboard with clickable filter cards
   - Posture score ring gauge with letter grades (A–F)
   - Category breakdown horizontal bar chart
   - Expandable finding accordions with issue/recommendation/CWE
   - Real-time search + severity/category dropdown filters
   - Compliance framework mapping
3. **Overview** (purple, 9 tools) — Capability showcase page with:
   - Key stats grid
   - Feature highlights as styled cards
   - Category/coverage tags
   - Architecture summary
   - Compliance mapping

### Regenerating Report Pages

```bash
# Regenerate all 35 sample report pages
python reports/generate_reports.py

# Regenerate all 9 overview pages
python reports/generate_overviews.py
```

Both scripts produce self-contained HTML files in the `reports/` directory.

---

## Design

- **Theme:** Dark glassmorphic (Catppuccin-inspired)
- **Palette:** `#0A0E1A` background, `#00D4FF` cyan accent, `#7B61FF` purple accent
- **Fonts:** Inter (UI), JetBrains Mono (code)
- **Layout:** CSS Grid responsive catalogue, mega-menu navigation
- **Features:** Animated hero with particle canvas, counter animations, category filters, full-text search

---

## Adding a New Tool

1. Add a tool entry to `js/tools.js` in the `TOOLS` array
2. Add a `sampleReport` or `overview` field pointing to `reports/<filename>.html`
3. Run `python reports/generate_reports.py` (or create the page manually)
4. Update tool counts in `index.html` and `js/translations.js`

---

## License

GPL-3.0 — see [LICENSE](LICENSE) for details.
