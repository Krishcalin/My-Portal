#!/usr/bin/env python3
"""
generate_overviews.py
Generates 9 professional "Tool Overview" HTML pages for non-scanner tools
in the Phalanx Cyber portal.
"""

import os
import html as html_mod
from pathlib import Path

# ---------------------------------------------------------------------------
# Output directory
# ---------------------------------------------------------------------------
OUT_DIR = Path(__file__).parent

# ---------------------------------------------------------------------------
# Colour palette for category pills (cycles through these)
# ---------------------------------------------------------------------------
PILL_COLORS = [
    ("rgba(0,212,255,0.12)", "#00D4FF"),
    ("rgba(123,97,255,0.12)", "#7B61FF"),
    ("rgba(239,68,68,0.12)", "#EF4444"),
    ("rgba(245,158,11,0.12)", "#F59E0B"),
    ("rgba(34,197,94,0.12)", "#22C55E"),
    ("rgba(59,130,246,0.12)", "#3B82F6"),
    ("rgba(236,72,153,0.12)", "#EC4899"),
    ("rgba(168,85,247,0.12)", "#A855F7"),
    ("rgba(20,184,166,0.12)", "#14B8A6"),
    ("rgba(251,146,60,0.12)", "#FB923C"),
    ("rgba(129,140,248,0.12)", "#818CF8"),
    ("rgba(253,224,71,0.12)", "#FDE047"),
    ("rgba(74,222,128,0.12)", "#4ADE80"),
    ("rgba(56,189,248,0.12)", "#38BDF8"),
    ("rgba(244,114,182,0.12)", "#F472B6"),
    ("rgba(192,132,252,0.12)", "#C084FC"),
]

GRADIENT_BORDERS = [
    "linear-gradient(135deg, #00D4FF, #7B61FF)",
    "linear-gradient(135deg, #7B61FF, #EC4899)",
    "linear-gradient(135deg, #22C55E, #00D4FF)",
    "linear-gradient(135deg, #F59E0B, #EF4444)",
    "linear-gradient(135deg, #3B82F6, #7B61FF)",
    "linear-gradient(135deg, #EC4899, #F59E0B)",
    "linear-gradient(135deg, #14B8A6, #3B82F6)",
    "linear-gradient(135deg, #A855F7, #EC4899)",
]

# ---------------------------------------------------------------------------
# SVG icons for sections
# ---------------------------------------------------------------------------
SVG_BACK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'

SVG_STATS = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'

SVG_CAPABILITIES = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'

SVG_COVERAGE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'

SVG_ARCH = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'

SVG_COMPLIANCE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'

SVG_GITHUB = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'

SVG_ARROW_RIGHT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'

# ---------------------------------------------------------------------------
# Tool data
# ---------------------------------------------------------------------------
TOOLS = [
    {
        "filename": "linux-hardening-overview.html",
        "title_plain": "Linux CIS Hardening",
        "title_h1": ("Linux CIS ", "Hardening"),
        "description": "Automated CIS Benchmark hardening scripts for RHEL 8/9 with 170+ security controls across 16 categories.",
        "github": "https://github.com/Krishcalin/Linux-Hardening",
        "stats": [
            ("Scripts", "2"),
            ("Controls", "170+"),
            ("Categories", "16"),
            ("Platforms", "RHEL 8/9"),
        ],
        "highlights": [
            "CIS Benchmark v3.0.0 (RHEL 8) and v2.0.0 (RHEL 9)",
            "16 security categories: filesystems, PAM, SSH, kernel, logging, cron, services, firewall",
            "Idempotent execution with full backup of modified configs",
            "RHEL 9 enhancements: AIDE, fapolicyd, usbguard, nftables stateful firewall",
            "Password quality enforcement: minlen=14, complexity, faillock after 5 attempts",
            "SSH hardening: modern ciphers (chacha20-poly1305, AES-GCM), no root login",
            "29+ audit rules for critical system events via auditd",
            "System-wide FUTURE crypto policy",
        ],
        "categories": [
            "Legacy Filesystems", "Package Removal", "Service Hardening",
            "Password Quality", "Logging & Auditing", "Cron Security",
            "SSH Hardening", "Kernel Parameters", "IPv6 Controls",
            "PAM & Faillock", "Crypto Policy", "su Restriction",
            "File Permissions", "Network Parameters", "Firewall (nftables)",
            "AIDE/Integrity",
        ],
        "compliance": [
            ("CIS RHEL 8 Benchmark v3.0.0", "Center for Internet Security hardening standard for Red Hat Enterprise Linux 8"),
            ("CIS RHEL 9 Benchmark v2.0.0", "Center for Internet Security hardening standard for Red Hat Enterprise Linux 9"),
        ],
        "language": "Bash",
        "components": ["rhel8_cis_hardening.sh", "rhel9_cis_hardening.sh"],
    },
    {
        "filename": "windows-hardening-overview.html",
        "title_plain": "Windows CIS Hardening & Scanners",
        "title_h1": ("Windows CIS ", "Hardening & Scanners"),
        "description": "PowerShell-based CIS Benchmark hardening and compliance scanning for Windows 11 Enterprise and Server 2016/2019/2022 with 1,200+ total controls.",
        "github": "https://github.com/Krishcalin/Windows-Hardening",
        "stats": [
            ("Scripts", "4"),
            ("Controls", "1,200+"),
            ("Platforms", "4"),
            ("Profiles", "L1/L2/DC/BL/NG"),
        ],
        "highlights": [
            "Windows 11 active hardening script: 170+ settings via secedit, Registry, netsh, auditpol",
            "Three read-only compliance scanners for Server 2016/2019/2022 (318\u2013392 controls each)",
            "Level 1 (general) and Level 2 (high-security) profiles with WhatIf dry-run mode",
            "Six check types: Registry, Secedit, UserRight, Auditpol, Service, Firewall",
            "Post-PrintNightmare controls, SMB hardening, Windows Defender ASR rules",
            "TLS 1.0/1.1 deprecation, Device Guard, DNS over HTTPS",
            "Auto-detection of server role (Domain Controller / Member Server / Standalone)",
            "JSON + interactive HTML dark-theme compliance reports with filtering",
        ],
        "categories": [
            "Account Policies", "Security Options (UAC, NTLM, SMB, LSA)",
            "System Services", "Windows Defender Firewall",
            "Advanced Audit Policy", "Admin Templates",
            "TLS/Cryptography", "Network Protocols",
            "Defender ASR Rules", "BitLocker", "Device Guard",
        ],
        "compliance": [
            ("CIS Windows 11 v4.0.0", "CIS Benchmark for Windows 11 Enterprise"),
            ("CIS Server 2016 v3.0.0", "CIS Benchmark for Windows Server 2016"),
            ("CIS Server 2019 v3.0.1", "CIS Benchmark for Windows Server 2019"),
            ("CIS Server 2022 v3.0.0", "CIS Benchmark for Windows Server 2022"),
        ],
        "language": "PowerShell",
        "components": [
            "Win11_CIS_Hardening.ps1",
            "WinServer2016_CIS_Scanner.ps1",
            "WinServer2019_CIS_Scanner.ps1",
            "WinServer2022_CIS_Scanner.ps1",
        ],
    },
    {
        "filename": "detection-engineering-overview.html",
        "title_plain": "Detection Engineering",
        "title_h1": ("Detection ", "Engineering"),
        "description": "SOC detection rule library with 170+ Splunk rules mapped to MITRE ATT&CK across Windows AD, RHEL Linux, Apache, and recent threat campaigns.",
        "github": "https://github.com/Krishcalin/Detection-Engineering",
        "stats": [
            ("Rules", "170+"),
            ("Platforms", "4"),
            ("Techniques", "50+"),
            ("Playbooks", "26+"),
        ],
        "highlights": [
            "11 Windows AD credential access rules: ADCS abuse, DCSync, Golden Ticket, Kerberoasting, LSASS dump, NTDS.dit, Pass-the-Hash, Password Spraying",
            "8 RHEL Linux rules: privilege escalation, persistence, credential access, defense evasion, execution, lateral movement, discovery, exfiltration",
            "6 Apache web server rules: path traversal, web shells, SQLi/XSS, brute force, recon, exploitation",
            "Each rule includes: SPL query, MITRE mapping, investigation queries, response playbook, false positive guidance",
            "Recent attack coverage: CVE-2026-21509 APT28 Operation Neusploit",
            "YAML-based rule format deployable to Splunk ES",
        ],
        "categories": [
            "Credential Access (AD)", "Privilege Escalation (RHEL)",
            "Persistence (RHEL)", "Defense Evasion",
            "Execution", "Lateral Movement",
            "Discovery & Enumeration", "Exfiltration",
            "Web Application Attacks", "Recent Threat Campaigns",
        ],
        "compliance": [
            ("MITRE ATT&CK", "Adversarial Tactics, Techniques, and Common Knowledge framework"),
            ("Splunk ES", "Splunk Enterprise Security correlation rule format"),
            ("NIST SP 800-53 IR/SI", "Incident Response and System & Information Integrity controls"),
        ],
        "language": "YAML / SPL",
        "components": [
            "windows_ad_rules/",
            "rhel_linux_rules/",
            "apache_rules/",
            "threat_campaign_rules/",
            "playbooks/",
        ],
    },
    {
        "filename": "responsible-ai-overview.html",
        "title_plain": "Responsible AI Framework",
        "title_h1": ("Responsible AI ", "Framework"),
        "description": "Python-based framework for implementing responsible AI practices \u2014 protecting AI applications and agents with safety guardrails and governance controls.",
        "github": "https://github.com/Krishcalin/Responsible-AI-Framework",
        "stats": [
            ("Principles", "6"),
            ("Modules", "5+"),
        ],
        "highlights": [
            "AI safety guardrails for production AI applications and autonomous agents",
            "Responsible AI principles: fairness, accountability, transparency, safety, privacy, security",
            "Bias detection and fairness metrics for ML model evaluation",
            "Content safety filtering and prompt injection prevention",
            "Model governance and lifecycle management controls",
            "Integration with existing ML pipelines and LLM deployments",
        ],
        "categories": [
            "Fairness", "Accountability", "Transparency",
            "Safety", "Privacy", "Security",
        ],
        "compliance": [
            ("NIST AI RMF", "NIST Artificial Intelligence Risk Management Framework"),
            ("EU AI Act", "European Union AI regulatory framework"),
            ("ISO/IEC 42001", "AI Management System standard"),
        ],
        "language": "Python",
        "components": [
            "fairness_module/",
            "safety_guardrails/",
            "governance_engine/",
            "bias_detection/",
            "prompt_shield/",
        ],
    },
    {
        "filename": "ctem-overview.html",
        "title_plain": "Continuous Threat Exposure Management",
        "title_h1": ("Continuous Threat ", "Exposure Management"),
        "description": "Agentic AI-powered CTEM platform that continuously discovers, prioritises, and validates security exposures across the attack surface.",
        "github": "https://github.com/Krishcalin/Continuous-Threat-Exposure-Management",
        "stats": [
            ("Phases", "5"),
            ("Framework", "Gartner CTEM"),
        ],
        "highlights": [
            "5-phase Gartner CTEM cycle: Scoping, Discovery, Prioritisation, Validation, Mobilisation",
            "Agentic AI workflow for autonomous threat exposure analysis",
            "Integration with existing scanners for continuous discovery and validation",
            "Risk-based prioritisation with business context and threat intelligence",
            "Automated remediation tracking and exposure trending",
            "Executive reporting with exposure reduction metrics",
        ],
        "categories": [
            "Scoping", "Discovery", "Prioritisation",
            "Validation", "Mobilisation",
        ],
        "compliance": [
            ("Gartner CTEM Framework", "Gartner\u2019s Continuous Threat Exposure Management methodology"),
            ("NIST CSF", "NIST Cybersecurity Framework"),
            ("CIS Controls v8", "Center for Internet Security Controls version 8"),
        ],
        "language": "Python",
        "components": [
            "scoping_engine/",
            "discovery_agent/",
            "prioritisation_engine/",
            "validation_runner/",
            "mobilisation_tracker/",
        ],
    },
    {
        "filename": "risk-ops-overview.html",
        "title_plain": "Risk Operation Center",
        "title_h1": ("Risk Operation ", "Center"),
        "description": "Aggregation platform that consumes data from 37+ open-source security tools to build risk simulations using real business data for executive decision-making.",
        "github": "https://github.com/Krishcalin/Risk-Operation-Center",
        "stats": [
            ("Integrations", "37+"),
            ("Dashboards", "Executive-ready"),
        ],
        "highlights": [
            "Data aggregation from 37+ open-source Phalanx Cyber security tools",
            "Risk simulation engine using real business data and scanner findings",
            "Executive-ready dashboards for C-suite risk communication",
            "Outcome modelling: what-if scenarios for security investment decisions",
            "Integration with CRQ engine for financial risk quantification",
            "Automated risk posture trending and compliance gap analysis",
        ],
        "categories": [
            "Data Aggregation", "Risk Simulation", "Executive Dashboards",
            "What-If Modelling", "Compliance Tracking", "Trend Analysis",
        ],
        "compliance": [
            ("NIST CSF", "NIST Cybersecurity Framework"),
            ("ISO 31000", "Risk Management standard"),
            ("FAIR", "Factor Analysis of Information Risk"),
        ],
        "language": "Python",
        "components": [
            "data_aggregator/",
            "risk_simulator/",
            "dashboard_engine/",
            "whatif_modeller/",
            "compliance_tracker/",
        ],
    },
    {
        "filename": "tprm-overview.html",
        "title_plain": "Third-Party Risk Management",
        "title_h1": ("Third-Party Risk ", "Management"),
        "description": "Agentic AI-powered TPRM platform for automated vendor risk assessments, questionnaire analysis, and continuous third-party monitoring.",
        "github": "https://github.com/Krishcalin/Third-Party-Risk-Management",
        "stats": [
            ("Workflows", "5"),
        ],
        "highlights": [
            "Agentic AI workflow for automated vendor risk assessment and questionnaire analysis",
            "Third-party risk scoring based on security posture, financial stability, and compliance status",
            "Continuous monitoring of vendor security with automated alert triggers",
            "Integration with SIG/SIG Lite questionnaires and SOC 2 report analysis",
            "Supply chain risk mapping and nth-party dependency tracking",
            "Remediation tracking and vendor risk register management",
        ],
        "categories": [
            "Vendor Assessment", "Questionnaire Analysis",
            "Continuous Monitoring", "Supply Chain Risk",
            "Remediation Tracking", "Risk Register",
        ],
        "compliance": [
            ("SIG/SIG Lite", "Standardised Information Gathering questionnaire"),
            ("SOC 2", "Service Organization Control 2 audit reports"),
            ("ISO 27001", "Information Security Management System standard"),
            ("NIST SP 800-53", "Security and Privacy Controls for Information Systems"),
        ],
        "language": "Python",
        "components": [
            "vendor_assessor/",
            "questionnaire_analyser/",
            "monitoring_agent/",
            "supply_chain_mapper/",
            "risk_register/",
        ],
    },
    {
        "filename": "rhel-redteam-overview.html",
        "title_plain": "RHEL Red Teaming",
        "title_h1": ("RHEL Red ", "Teaming"),
        "description": "MITRE ATT&CK-aligned red team scanner for Red Hat Enterprise Linux with 297 security checks across 52 modules and SSH remote scanning.",
        "github": "https://github.com/Krishcalin/RHEL-Red-Teaming",
        "stats": [
            ("Checks", "297"),
            ("Modules", "52"),
            ("Techniques", "180+"),
        ],
        "highlights": [
            "297 security checks across 180 MITRE ATT&CK techniques and 187 sub-techniques (Linux Matrix v16)",
            "52 modules covering reconnaissance, discovery, credential access, privilege escalation, persistence, defense evasion, lateral movement, execution, exfiltration",
            "RHEL-specific controls: SELinux policy enforcement, firewalld zone validation, auditd rule completeness",
            "Safe by default: passive checks with optional active simulation via --simulate flag",
            "SSH remote scanning support for multi-host assessments",
            "ATT&CK Navigator JSON layer export, HTML dark-themed reports",
        ],
        "categories": [
            "Reconnaissance", "Discovery", "Credential Access",
            "Privilege Escalation", "Persistence", "Defense Evasion",
            "Lateral Movement", "Execution", "Exfiltration",
            "Collection", "C2", "Impact",
        ],
        "compliance": [
            ("MITRE ATT&CK Linux Matrix v16", "Adversarial Tactics and Techniques for Linux systems"),
            ("NIST SP 800-53", "Security and Privacy Controls for Information Systems"),
            ("CIS RHEL Benchmark", "Center for Internet Security benchmark for RHEL"),
        ],
        "language": "Python",
        "components": [
            "rhel_redteam_scanner.py",
            "modules/ (52 technique modules)",
            "attack_navigator_export.py",
            "report_generator.py",
        ],
    },
    {
        "filename": "ad-attack-overview.html",
        "title_plain": "Active Directory Attack Scenarios",
        "title_h1": ("Active Directory ", "Attack Scenarios"),
        "description": "Structured attack scenario library for Active Directory environments with MITRE ATT&CK mapped techniques, detection rules, and response playbooks.",
        "github": "https://github.com/Krishcalin/Active-Directory-Attack-Scenarios",
        "stats": [
            ("Scenarios", "20+"),
            ("Tactics", "8"),
        ],
        "highlights": [
            "Comprehensive AD attack scenario documentation with step-by-step execution guides",
            "MITRE ATT&CK technique mapping for each attack scenario",
            "Covers: DCSync, Golden Ticket, Silver Ticket, Kerberoasting, AS-REP Roasting, Pass-the-Hash, NTLM Relay, GPO abuse",
            "Detection rules and indicators of compromise for each scenario",
            "Lab setup guides for safe testing in isolated environments",
            "Paired with Detection Engineering repo for blue team validation",
        ],
        "categories": [
            "Credential Access", "Lateral Movement",
            "Persistence", "Privilege Escalation",
            "Defense Evasion", "Collection",
            "Impact", "Initial Access",
        ],
        "compliance": [
            ("MITRE ATT&CK", "Adversarial Tactics, Techniques, and Common Knowledge framework"),
            ("Atomic Red Team", "Library of tests mapped to the MITRE ATT&CK framework"),
        ],
        "language": "Markdown / YAML",
        "components": [
            "scenarios/",
            "detection_rules/",
            "playbooks/",
            "lab_setup/",
        ],
    },
]


# ---------------------------------------------------------------------------
# HTML generation
# ---------------------------------------------------------------------------
def esc(text: str) -> str:
    """HTML-escape a string."""
    return html_mod.escape(str(text))


def build_stats_cards(stats: list[tuple[str, str]]) -> str:
    cards = []
    for label, value in stats:
        cards.append(f"""      <div class="meta-card">
        <div class="meta-card__label">{esc(label)}</div>
        <div class="meta-card__value">{esc(value)}</div>
      </div>""")
    return "\n".join(cards)


def build_highlights(highlights: list[str]) -> str:
    items = []
    for i, h in enumerate(highlights):
        grad = GRADIENT_BORDERS[i % len(GRADIENT_BORDERS)]
        items.append(f"""      <div class="cap-card" style="--grad:{grad}">
        <div class="cap-card__num">{i + 1:02d}</div>
        <div class="cap-card__text">{esc(h)}</div>
      </div>""")
    return "\n".join(items)


def build_pills(categories: list[str]) -> str:
    pills = []
    for i, cat in enumerate(categories):
        bg, fg = PILL_COLORS[i % len(PILL_COLORS)]
        pills.append(f'      <span class="pill" style="background:{bg};color:{fg}">{esc(cat)}</span>')
    return "\n".join(pills)


def build_compliance(compliance: list[tuple[str, str]]) -> str:
    cards = []
    for name, desc in compliance:
        cards.append(f"""      <div class="compliance-card">
        <div class="compliance-card__icon">{SVG_COMPLIANCE}</div>
        <div class="compliance-card__name">{esc(name)}</div>
        <div class="compliance-card__desc">{esc(desc)}</div>
      </div>""")
    return "\n".join(cards)


def build_components(components: list[str], language: str) -> str:
    lines = []
    for c in components:
        lines.append(f"  {esc(c)}")
    file_tree = "\n".join(lines)
    return f"""<div class="arch-card">
        <div class="arch-card__header">
          <div class="arch-card__dot" style="background:#EF4444"></div>
          <div class="arch-card__dot" style="background:#F59E0B"></div>
          <div class="arch-card__dot" style="background:#22C55E"></div>
          <span class="arch-card__title">Project Structure</span>
        </div>
        <pre class="arch-card__code"><span class="arch-lang"># Language: {esc(language)}</span>
{file_tree}</pre>
      </div>"""


def generate_page(tool: dict) -> str:
    title_pre, title_span = tool["title_h1"]
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(tool["title_plain"])} &mdash; Tool Overview | Phalanx Cyber</title>
<meta name="description" content="{esc(tool["description"])}">
<style>
/* ---- RESET ---- */
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#0A0E1A;--bg-surface:#111827;--bg-card:rgba(17,24,39,0.6);
  --bg-glass:rgba(255,255,255,0.04);--border:rgba(255,255,255,0.08);
  --text:#F9FAFB;--text-secondary:#9CA3AF;--text-muted:#6B7280;
  --accent-1:#00D4FF;--accent-2:#7B61FF;
  --gradient:linear-gradient(135deg,var(--accent-1),var(--accent-2));
  --radius:12px;--radius-sm:8px;
  --sev-critical:#EF4444;--sev-high:#F59E0B;--sev-medium:#3B82F6;
  --sev-low:#22C55E;--sev-info:#6B7280;
}}

html{{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}}
body{{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}}
a{{color:var(--accent-1);text-decoration:none}}
a:hover{{text-decoration:underline}}

/* ---- LAYOUT ---- */
.container{{max-width:1280px;margin:0 auto;padding:0 24px}}

/* ---- BACK NAV ---- */
.back-nav{{position:sticky;top:0;z-index:100;background:rgba(10,14,26,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:16px 0}}
.back-nav .container{{display:flex;align-items:center;justify-content:space-between}}
.back-nav a{{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:0.9rem;color:var(--text-secondary);transition:color 0.2s}}
.back-nav a:hover{{color:var(--accent-1);text-decoration:none}}
.back-nav__brand{{font-weight:800;font-size:1.1rem;color:var(--text)}}
.back-nav__brand span{{color:var(--accent-1)}}

/* ---- HERO HEADER ---- */
.report-hero{{position:relative;padding:80px 0 60px;overflow:hidden}}
.report-hero::before{{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,212,255,0.08),transparent 70%)}}
.report-hero__badge{{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:20px;background:rgba(123,97,255,0.1);border:1px solid rgba(123,97,255,0.25);font-size:0.8rem;font-weight:600;color:var(--accent-2);margin-bottom:20px}}
.report-hero__badge::before{{content:'';width:8px;height:8px;border-radius:50%;background:var(--accent-2);animation:pulse 2s infinite}}
@keyframes pulse{{0%,100%{{opacity:1}}50%{{opacity:0.4}}}}
.report-hero h1{{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.2;margin-bottom:12px}}
.report-hero h1 span{{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}}
.report-hero__sub{{color:var(--text-secondary);font-size:1.05rem;max-width:680px;margin-bottom:32px}}

/* ---- META GRID ---- */
.meta-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:0}}
.meta-card{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;backdrop-filter:blur(8px);transition:border-color 0.2s}}
.meta-card:hover{{border-color:rgba(0,212,255,0.25)}}
.meta-card__label{{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:4px}}
.meta-card__value{{font-size:1.3rem;font-weight:800;color:var(--accent-1)}}

/* ---- SECTIONS ---- */
.section{{padding:48px 0}}
.section + .section{{border-top:1px solid var(--border)}}
.section-title{{font-size:1.4rem;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:10px}}
.section-title svg{{color:var(--accent-1)}}

/* ---- CAPABILITIES (HIGHLIGHTS) ---- */
.cap-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}}
@media(max-width:480px){{.cap-grid{{grid-template-columns:1fr}}}}
.cap-card{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px 20px 20px 24px;display:flex;align-items:flex-start;gap:16px;position:relative;overflow:hidden;transition:border-color 0.2s,transform 0.2s}}
.cap-card:hover{{border-color:rgba(255,255,255,0.15);transform:translateY(-2px)}}
.cap-card::before{{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--grad,var(--gradient))}}
.cap-card__num{{font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.8rem;font-weight:700;color:var(--accent-2);background:rgba(123,97,255,0.12);padding:4px 8px;border-radius:4px;flex-shrink:0;line-height:1.2}}
.cap-card__text{{font-size:0.88rem;color:var(--text-secondary);line-height:1.55}}

/* ---- COVERAGE PILLS ---- */
.pill-wrap{{display:flex;flex-wrap:wrap;gap:10px}}
.pill{{display:inline-flex;align-items:center;padding:7px 16px;border-radius:20px;font-size:0.82rem;font-weight:600;border:1px solid rgba(255,255,255,0.06);transition:transform 0.15s}}
.pill:hover{{transform:scale(1.05)}}

/* ---- ARCHITECTURE CARD ---- */
.arch-card{{background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}}
.arch-card__header{{display:flex;align-items:center;gap:8px;padding:14px 20px;background:rgba(255,255,255,0.03);border-bottom:1px solid var(--border)}}
.arch-card__dot{{width:12px;height:12px;border-radius:50%}}
.arch-card__title{{font-size:0.8rem;color:var(--text-muted);margin-left:8px;font-family:'JetBrains Mono','Fira Code',monospace}}
.arch-card__code{{padding:20px 24px;font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.85rem;color:var(--text-secondary);line-height:1.8;overflow-x:auto;white-space:pre}}
.arch-lang{{color:var(--text-muted)}}

/* ---- COMPLIANCE ---- */
.compliance-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}}
.compliance-card{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:24px;text-align:center;transition:border-color 0.2s}}
.compliance-card:hover{{border-color:rgba(0,212,255,0.25)}}
.compliance-card__icon{{margin-bottom:12px;color:var(--accent-1)}}
.compliance-card__name{{font-weight:700;font-size:0.95rem;margin-bottom:6px}}
.compliance-card__desc{{font-size:0.78rem;color:var(--text-muted);line-height:1.5}}

/* ---- CTA FOOTER ---- */
.cta-footer{{padding:60px 0;text-align:center}}
.cta-footer__inner{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:48px 32px;position:relative;overflow:hidden}}
.cta-footer__inner::before{{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 100%,rgba(123,97,255,0.06),transparent 70%)}}
.cta-footer h2{{font-size:1.5rem;font-weight:800;margin-bottom:8px;position:relative}}
.cta-footer p{{color:var(--text-secondary);font-size:0.95rem;margin-bottom:28px;position:relative}}
.cta-btns{{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;position:relative}}
.btn{{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:var(--radius-sm);font-weight:700;font-size:0.9rem;transition:all 0.2s;text-decoration:none !important;border:none;cursor:pointer}}
.btn--primary{{background:var(--gradient);color:#0A0E1A}}
.btn--primary:hover{{opacity:0.9;transform:translateY(-1px)}}
.btn--outline{{background:transparent;border:1px solid var(--border);color:var(--text)}}
.btn--outline:hover{{border-color:var(--accent-1);color:var(--accent-1);transform:translateY(-1px)}}

/* ---- SITE FOOTER ---- */
.report-footer{{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--text-muted);font-size:0.82rem}}
.report-footer a{{color:var(--accent-1)}}

/* ---- ANIMATIONS ---- */
@keyframes fadeIn{{from{{opacity:0;transform:translateY(10px)}}to{{opacity:1;transform:translateY(0)}}}}
.animate-in{{animation:fadeIn 0.4s ease both}}

/* ---- PRINT ---- */
@media print{{
  body{{background:#fff;color:#111}}
  .back-nav{{display:none}}
  .cap-card,.pill,.compliance-card{{break-inside:avoid}}
}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>

<!-- ======== BACK NAV ======== -->
<nav class="back-nav">
  <div class="container">
    <a href="index.html">
      {SVG_BACK}
      Back to Portal
    </a>
    <div class="back-nav__brand">Phalanx<span>Cyber</span></div>
  </div>
</nav>

<!-- ======== HERO ======== -->
<header class="report-hero">
  <div class="container">
    <div class="report-hero__badge">Tool Overview</div>
    <h1>{esc(title_pre)}<span>{esc(title_span)}</span></h1>
    <p class="report-hero__sub">{esc(tool["description"])}</p>
    <div class="meta-grid">
{build_stats_cards(tool["stats"])}
    </div>
  </div>
</header>

<!-- ======== KEY CAPABILITIES ======== -->
<section class="section">
  <div class="container">
    <h2 class="section-title">{SVG_CAPABILITIES} Key Capabilities</h2>
    <div class="cap-grid">
{build_highlights(tool["highlights"])}
    </div>
  </div>
</section>

<!-- ======== COVERAGE ======== -->
<section class="section">
  <div class="container">
    <h2 class="section-title">{SVG_COVERAGE} Coverage Areas</h2>
    <div class="pill-wrap">
{build_pills(tool["categories"])}
    </div>
  </div>
</section>

<!-- ======== ARCHITECTURE ======== -->
<section class="section">
  <div class="container">
    <h2 class="section-title">{SVG_ARCH} Architecture &amp; Components</h2>
    {build_components(tool["components"], tool["language"])}
  </div>
</section>

<!-- ======== COMPLIANCE ======== -->
<section class="section">
  <div class="container">
    <h2 class="section-title">{SVG_COMPLIANCE} Compliance &amp; Framework Mapping</h2>
    <div class="compliance-grid">
{build_compliance(tool["compliance"])}
    </div>
  </div>
</section>

<!-- ======== CTA FOOTER ======== -->
<section class="cta-footer">
  <div class="container">
    <div class="cta-footer__inner">
      <h2>Explore {esc(tool["title_plain"])}</h2>
      <p>View the full source code, documentation, and deployment guides on GitHub.</p>
      <div class="cta-btns">
        <a href="{esc(tool["github"])}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
          {SVG_GITHUB} View on GitHub
        </a>
        <a href="index.html" class="btn btn--outline">
          {SVG_ARROW_RIGHT} Back to Portal
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ======== FOOTER ======== -->
<footer class="report-footer">
  <div class="container">
    &copy; 2026 <a href="index.html">PhalanxCyber</a> &mdash; Open-Source Cybersecurity Platform
  </div>
</footer>

</body>
</html>"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    generated = []
    for tool in TOOLS:
        html_content = generate_page(tool)
        out_path = OUT_DIR / tool["filename"]
        out_path.write_text(html_content, encoding="utf-8")
        generated.append(tool["filename"])
        print(f"  [+] Generated: {tool['filename']}")

    print(f"\nDone. {len(generated)} overview pages generated in {OUT_DIR}")


if __name__ == "__main__":
    main()
