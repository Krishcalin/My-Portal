#!/usr/bin/env python3
"""
generate_tool_pages.py
Builds a rich, self-describing detail page (tools/<id>.html) for every tool,
from curated deep-content JSON + the base data in js/tools.js.
Modern-SaaS light/dark design (shares ../css/app.css).
"""
import json, re, html as H
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # My-Portal/
OUT_DIR = ROOT / "tools"
DEEP_JSON = OUT_DIR / "deep_content.json"               # {id: <deepdata>}

# per-section infographic map: {tool_id: {"hero"|section_id: [png filenames]}}
SECTION_MAP = {}
_smf = OUT_DIR.parent / "assets" / "infographics" / "section_map.json"
if _smf.exists():
    SECTION_MAP = json.loads(_smf.read_text(encoding="utf-8"))

CATEGORY_LABELS = {
    "appsec": "Application Security", "cloud": "Cloud Security", "saas": "SaaS / SSPM",
    "infra": "Infrastructure", "threat": "Threat Detection", "redteam": "Red Teaming",
    "easm": "Attack Surface", "risk": "Governance & Risk",
}

# icon SVGs (mirrors js/tools.js TOOL_ICONS)
ICONS = {
 "code": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
 "globe": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
 "api": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
 "sap": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
 "brain": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',
 "cloud": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
 "shield": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
 "saas": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
 "firewall": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="15"/><line x1="9" y1="15" x2="9" y2="21"/></svg>',
 "container": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
 "terminal": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
 "factory": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V8l4-2v4l4-2v4l4-2v4l4-2v4l4-2v6H2z"/></svg>',
 "target": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
 "radar": '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a10 10 0 0 1 7.07 7.07"/><circle cx="12" cy="12" r="1"/></svg>',
}
SVG_GH = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>'
SVG_ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
SVG_BACK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
SVG_REPORT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
# circuit-shield brand mark (mirrors logo/phalanxcyber.jpg)
BRAND_SHIELD = ('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
 '<path d="M12 22s7.5-3.8 7.5-9.5V5L12 2 4.5 5v7.5C4.5 18.2 12 22 12 22z"/>'
 '<circle cx="9.7" cy="8.2" r="1" fill="currentColor" stroke="none"/><circle cx="9.7" cy="12" r="1" fill="currentColor" stroke="none"/>'
 '<circle cx="9.7" cy="15.8" r="1" fill="currentColor" stroke="none"/><path d="M9.7 8.2v7.6"/>'
 '<circle cx="14" cy="10.2" r=".9" fill="currentColor" stroke="none"/><path d="M9.7 12h4.3v-1.8"/></svg>')

THEME_SCRIPT = ("(function(){try{var t=localStorage.getItem('pcx-theme');"
                "if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();")
TOGGLE_SCRIPT = (
 "function pcxToggle(){var r=document.documentElement;var cur=r.getAttribute('data-theme')||'light';"
 "var next=cur==='dark'?'light':'dark';r.setAttribute('data-theme',next);"
 "try{localStorage.setItem('pcx-theme',next);}catch(e){}}"
 "document.addEventListener('DOMContentLoaded',function(){"
 "var links=document.querySelectorAll('.toc a');var secs=[].slice.call(document.querySelectorAll('.doc__section'));"
 "if('IntersectionObserver' in window && secs.length){var o=new IntersectionObserver(function(es){"
 "es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id);});}});},"
 "{rootMargin:'-20% 0px -70% 0px'});secs.forEach(function(s){o.observe(s);});}});")

def esc(s): return H.escape(str(s), quote=True)

def nav_html(prefix=".."):
    tsun='<svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
    tmoon='<svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
    return f'''<nav class="nav"><div class="container-wide nav__inner">
  <a class="brand" href="{prefix}/index.html"><img class="brand__img" src="{prefix}/logo/phalanxcyber-logo.png" alt="PhalanxCyber — Open-Source Security Tools"></a>
  <div class="nav__links">
    <a href="{prefix}/index.html#tools">Tools</a>
    <a href="{prefix}/strategy.html">Strategy</a>
    <a href="{prefix}/risk-quantification.html">Risk</a>
    <a href="{prefix}/about.html">Founder Bio</a>
  </div>
  <div class="nav__actions">
    <button class="theme-toggle" onclick="pcxToggle()" aria-label="Toggle theme">{tsun}{tmoon}</button>
    <a class="btn btn--primary btn--sm" href="https://github.com/Krishcalin" target="_blank" rel="noopener">{SVG_GH} GitHub</a>
  </div>
</div></nav>'''

def footer_html(prefix=".."):
    return f'''<footer class="footer"><div class="container-wide">
  <div class="footer__bottom" style="border:none;margin:0;padding:0">
    <span>&copy; 2026 <strong>PhalanxCyber</strong> — Open-source cybersecurity platform.</span>
    <span><a href="{prefix}/index.html">All tools</a> · <a href="https://github.com/Krishcalin" target="_blank" rel="noopener">GitHub</a></span>
  </div>
  <p class="footer__disclaimer">All tools are provided for lawful, authorized security testing and educational use only. Offensive/red-team tooling is benign-by-default and intended for environments you own or are authorized to test.</p>
</div></footer>'''

def parse_base():
    c = (ROOT / "js" / "tools.js").read_text(encoding="utf-8")
    arr = c[c.index("const TOOLS = ["):c.index("\n];")]
    out = {}
    for ch in arr.split("\n  {")[1:]:
        def g(f):
            m = re.search(f + r':\s*"([^"]*)"', ch)
            return m.group(1) if m else None
        tid = g("id")
        if not tid: continue
        # clean, punchy headline metrics straight from tools.js (short values)
        sm = re.search(r'stats:\s*\{([^}]*)\}', ch)
        stats = []
        if sm:
            for part in sm.group(1).split(","):
                if ":" in part:
                    k, v = part.split(":", 1)
                    k = k.strip().strip('"').strip("'"); v = v.strip().strip('"').strip("'")
                    if k and v:
                        stats.append((k, v))
        out[tid] = {"id": tid, "name": g("name"), "tagline": g("tagline"),
                    "category": g("category"), "github": g("github"),
                    "icon": g("icon") or "shield", "version": g("version") or "1.0.0",
                    "sampleReport": g("sampleReport"), "stats": stats}
    return out

def section(num, sid, title, body):
    return (f'<section class="doc__section" id="{sid}"><h2><span class="num">{num}</span>{esc(title)}</h2>{body}</section>')

def render(base, deep):
    icon = ICONS.get(base["icon"], ICONS["shield"])
    cat = CATEGORY_LABELS.get(base["category"], base["category"])
    smap = SECTION_MAP.get(base["id"], {})
    def figs(sid):
        return "".join(f'<figure class="doc__figure"><img src="../assets/infographics/{img}" '
                       f'alt="{esc(base["name"])} — {esc(sid)} diagram" loading="lazy"></figure>'
                       for img in smap.get(sid, []))
    toc, secs, n = [], [], 0
    def add(sid, label, title, body):
        nonlocal n; n += 1
        toc.append(f'<a href="#{sid}">{esc(label)}</a>')
        secs.append(section(f"{n:02d}", sid, title, body + figs(sid)))

    # overview
    paras = "".join(f"<p{' class=\"doc__lead\"' if i==0 else ''}>{esc(p)}</p>" for i,p in enumerate(deep.get("summary",[])))
    add("overview","Overview","Overview", paras)
    # features
    if deep.get("features"):
        fg = "".join(f'<div class="feature"><h3>{esc(f["title"])}</h3><p>{esc(f["description"])}</p></div>' for f in deep["features"])
        add("features","Capabilities","Key Capabilities", f'<div class="feature-grid">{fg}</div>')
    # architecture
    if deep.get("architecture_layers"):
        ls = "".join(f'<div class="layer"><div class="layer__idx">{i+1}</div><div><div class="layer__name">{esc(l["name"])}</div><div class="layer__desc">{esc(l["description"])}</div></div></div>' for i,l in enumerate(deep["architecture_layers"]))
        body = (f'<p>{esc(deep.get("architecture_summary",""))}</p>' if deep.get("architecture_summary") else "") + f'<div class="layers">{ls}</div>'
        add("architecture","Architecture","Architecture", body)
    # project structure
    if deep.get("project_structure"):
        rows = "".join(f'<div class="filerow"><code>{esc(r["path"])}</code><span>{esc(r["description"])}</span></div>' for r in deep["project_structure"])
        tree = (f'<div class="filetree"><div class="filetree__head">'
                f'<span class="filetree__dot" style="background:#f87171"></span><span class="filetree__dot" style="background:#fbbf24"></span><span class="filetree__dot" style="background:#4ade80"></span></div>'
                f'<div class="filetree__body">{rows}</div></div>')
        add("structure","Project Structure","Project Structure", tree)
    # security controls
    if deep.get("security_controls"):
        cs = "".join(f'<div class="control"><div class="control__area">{esc(c["area"])}</div><div class="control__detail">{esc(c["detail"])}</div></div>' for c in deep["security_controls"])
        add("controls","Security Controls","Security Controls", f'<div class="controls">{cs}</div>')
    # tech stack
    if deep.get("tech_stack"):
        ts = "".join(f'<div class="techrow"><dt>{esc(t["label"])}</dt><dd>{esc(t["value"])}</dd></div>' for t in deep["tech_stack"])
        add("stack","Tech Stack","Technology Stack", f'<dl class="techstack">{ts}</dl>')
    # usage
    if deep.get("usage"):
        lines = []
        for u in deep["usage"]:
            u = str(u)
            if u.strip().startswith("#"):
                lines.append(f'<span class="cmt">{esc(u)}</span>')
            else:
                lines.append(f'<span class="prompt">$</span> {esc(u)}')
        add("usage","Usage","Quick Start", f'<div class="code"><pre>' + "\n".join(lines) + '</pre></div>')
    # compliance
    if deep.get("compliance"):
        cc = "".join(f'<div class="comp"><div class="comp__name">{esc(c["name"])}</div><div class="comp__desc">{esc(c["desc"])}</div></div>' for c in deep["compliance"])
        add("compliance","Compliance","Compliance & Frameworks", f'<div class="compliance-grid">{cc}</div>')
    # integrations
    if deep.get("integrations"):
        tags = "".join(f'<span class="pill">{esc(i)}</span>' for i in deep["integrations"])
        add("integrations","Integrations","Integrations & Outputs", f'<div class="taglist">{tags}</div>')

    # hero metrics: clean short values from tools.js (big-impact numbers, never clip)
    bstats = base.get("stats") or []
    stat_html = "".join(f'<div class="stat"><div class="stat__num">{esc(v)}</div><div class="stat__label">{esc(k)}</div></div>' for k, v in bstats[:4])
    meta_pills = f'<span class="pill pill--accent">{esc(cat)}</span><span class="pill">v{esc(base["version"])}</span>'
    report_btn = ""
    if base.get("sampleReport"):
        report_btn = f'<a class="btn btn--secondary" href="../{esc(base["sampleReport"])}" target="_blank" rel="noopener">{SVG_REPORT} Sample Report</a>'

    # hero infographic: from section_map["hero"], else <id>.png fallback
    hero_imgs = smap.get("hero")
    if not hero_imgs:
        _p = OUT_DIR.parent / "assets" / "infographics" / f'{base["id"]}.png'
        hero_imgs = [f'{base["id"]}.png'] if _p.exists() else []
    if hero_imgs:
        figure_html = (f'<figure class="detail-hero__figure">'
                       f'<img src="../assets/infographics/{hero_imgs[0]}" alt="{esc(base["name"])} — how it works infographic" loading="lazy">'
                       f'<figcaption class="detail-hero__figcap">How {esc(base["name"])} works</figcaption></figure>')
        grid_cls = "detail-hero__lower has-figure"
    else:
        figure_html = ""
        grid_cls = "detail-hero__lower"

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(base["name"])} — PhalanxCyber</title>
<meta name="description" content="{esc(base["tagline"])}">
<script>{THEME_SCRIPT}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/app.css">
</head>
<body>
{nav_html()}
<header class="detail-hero"><div class="container-wide">
  <div class="breadcrumb"><a href="../index.html">Tools</a> {SVG_ARROW.replace("16","12")} <span>{esc(cat)}</span> {SVG_ARROW.replace("16","12")} <span>{esc(base["name"])}</span></div>
  <div class="detail-hero__row">
    <div class="detail-hero__icon">{icon}</div>
    <div>
      <h1>{esc(base["name"])}</h1>
      <div class="detail-hero__meta">{meta_pills}</div>
    </div>
  </div>
  <p class="detail-hero__tagline">{esc(base["tagline"])}</p>
  <div class="detail-hero__actions">
    <a class="btn btn--primary" href="{esc(base["github"])}" target="_blank" rel="noopener">{SVG_GH} View on GitHub</a>
    {report_btn}
    <a class="btn btn--ghost" href="../index.html">{SVG_BACK} All tools</a>
  </div>
  <div class="{grid_cls}">
    <div class="stat-row">{stat_html}</div>
    {figure_html}
  </div>
</div></header>

<div class="container-wide"><div class="detail-layout">
  <aside class="toc"><div class="toc__title">On this page</div>{"".join(toc)}</aside>
  <main class="doc">{"".join(secs)}
    <div class="cta-band">
      <h2>Explore {esc(base["name"])}</h2>
      <p>Full source, documentation, and deployment guides live on GitHub.</p>
      <div class="cta-band__btns">
        <a class="btn btn--primary" href="{esc(base["github"])}" target="_blank" rel="noopener">{SVG_GH} View on GitHub</a>
        <a class="btn btn--secondary" href="../index.html">{SVG_ARROW} Browse all tools</a>
      </div>
    </div>
  </main>
</div></div>
{footer_html()}
<script>{TOGGLE_SCRIPT}</script>
</body>
</html>'''

def main():
    base = parse_base()
    if not DEEP_JSON.exists():
        print("!! missing", DEEP_JSON); return
    deep_all = json.loads(DEEP_JSON.read_text(encoding="utf-8"))
    made = 0
    for tid, b in base.items():
        d = deep_all.get(tid)
        if not d:
            print("   [skip] no deep content:", tid); continue
        (OUT_DIR / f"{tid}.html").write_text(render(b, d), encoding="utf-8")
        made += 1
    print(f"Done. {made} tool pages generated in {OUT_DIR}")

if __name__ == "__main__":
    main()
