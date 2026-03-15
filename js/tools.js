/* ================================================================
   tools.js — Structured tool data for the portal catalogue
   ================================================================ */
const TOOLS = [
  // ── Application Security ──────────────────────────────────────
  {
    id: "app-security-scanner",
    name: "Application Security Scanner",
    tagline: "Multi-language SAST covering Java, PHP, Python, MERN, OWASP LLM Top 10, AI-SPM, and SAP ABAP",
    category: "appsec",
    tags: ["SAST", "Java", "PHP", "Python", "MERN", "OWASP LLM", "AI-SPM", "SAP ABAP"],
    stats: { rules: "450+", scanners: 7, cves: "40+" },
    version: "4.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Application-Security-Scanner",
    status: "public",
    icon: "code",
    highlights: [
      "7 scanners in one repo: Java, PHP, Python, MERN, OWASP LLM, AI-SPM, SAP ABAP",
      "SQL injection, XSS, command injection, deserialization, path traversal",
      "OWASP LLM Top 10 coverage (70 rules across 10 categories)",
      "AI Security Posture Management with 148 rules",
      "Dependency CVE analysis for all ecosystems",
      "JSON + HTML dark-theme reports, CI/CD exit codes"
    ]
  },
  {
    id: "dast-scanner",
    name: "DAST Scanner",
    tagline: "Active dynamic application security testing with 58 checks across OWASP Top 10",
    category: "appsec",
    tags: ["DAST", "OWASP Top 10", "Active Scanning", "Web Apps"],
    stats: { checks: 58, categories: 11 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Dynamic-Application-Security-Testing",
    status: "public",
    icon: "globe",
    highlights: [
      "11 test categories: injection, XSS, auth, access control, info disclosure, headers, SSRF, LFI, XXE, API, JWT",
      "Active scanner — sends real probes against running applications",
      "OWASP Top 10 2021 mapped to every finding",
      "Severity-based exit codes for CI/CD pipelines"
    ]
  },
  {
    id: "api-security-scanner",
    name: "API Security Scanner",
    tagline: "API discovery, vulnerability and misconfiguration scanner with OWASP API Top 10 coverage",
    category: "appsec",
    tags: ["API", "REST", "GraphQL", "gRPC", "OpenAPI", "OWASP API Top 10"],
    stats: { rules: "112+", categories: 22 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/API-Security",
    status: "public",
    icon: "api",
    highlights: [
      "OWASP API Security Top 10 (2023) full coverage",
      "Scans REST, GraphQL, gRPC, OpenAPI specs, Protobuf",
      "PCI-DSS, GDPR, HIPAA, DORA compliance mapping",
      "API inventory discovery: frameworks, protocols, auth, gateways",
      "Nginx, K8s, Docker, .env configuration checks"
    ]
  },
  {
    id: "sap-abap-scanner",
    name: "SAP ABAP Vulnerability Analyzer",
    tagline: "Dual-mode SAST for ABAP source code and live BTP API scanning via XSUAA OAuth 2.0",
    category: "appsec",
    tags: ["SAP", "ABAP", "BTP", "SAST", "CDS", "XSUAA"],
    stats: { rules: "111+", modes: 2 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-Code-Vulnerability-Analyzer",
    status: "public",
    icon: "sap",
    highlights: [
      "SAST mode: 81 regex rules for .abap, .cds, xs-security.json, mta.yaml",
      "BTP API mode: 30 checks via XSUAA OAuth 2.0 client credentials",
      "SQL injection, code injection, OS command injection, XSS, auth bypass",
      "RFC security, hardcoded credentials, weak cryptography",
      "Dual-mode: run both SAST + BTP API for unified report"
    ]
  },
  {
    id: "ai-spm-scanner",
    name: "AI Security Posture Management",
    tagline: "AI/ML project SAST scanner covering model security, prompt injection, data pipelines, and governance",
    category: "appsec",
    tags: ["AI/ML", "LLM", "SAST", "RAG", "MCP", "Guardrails"],
    stats: { rules: "148+", categories: 22 },
    version: "1.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/AI-Secure-Posture-Management",
    status: "public",
    icon: "brain",
    highlights: [
      "148 rules across 22 AI/ML security categories",
      "Model security, prompt injection, data poisoning, RAG security",
      "Agent/MCP security, fine-tuning risks, multimodal threats",
      "AI supply chain, shadow AI detection, model card validation",
      "K8s AI workload, Terraform AI infra, API gateway checks",
      "NIST AI RMF, EU AI Act, ISO/IEC 42001 mapping"
    ]
  },

  // ── Cloud Security ────────────────────────────────────────────
  {
    id: "aws-scanner",
    name: "AWS Security Scanner",
    tagline: "CloudFormation and Terraform IaC security scanner with 102 rules across 25+ AWS services",
    category: "cloud",
    tags: ["AWS", "CloudFormation", "Terraform", "IaC", "S3", "IAM"],
    stats: { rules: "102+", services: "25+" },
    version: "1.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/AWS-Security-Scanner",
    status: "public",
    icon: "cloud",
    highlights: [
      "60+ Terraform regex rules + 42 CloudFormation resource type handlers",
      "S3, IAM, EC2/SG, RDS, CloudTrail, KMS, CloudFront, ECS, Lambda, API Gateway",
      "VPC, WAF, GuardDuty, Config, Beanstalk, SageMaker, Bedrock, EBS",
      "Custom YAML loader for CloudFormation intrinsic functions (!Ref, !Sub, etc.)",
      "JSON + HTML reports with severity filtering"
    ]
  },
  {
    id: "azure-scanner",
    name: "Azure Security Scanner",
    tagline: "Live Azure subscription security audit with 57+ checks across 16 sections",
    category: "cloud",
    tags: ["Azure", "CIS", "Subscription", "RBAC", "NSG"],
    stats: { checks: "57+", sections: 16 },
    version: "1.0.0",
    language: "Bash",
    github: "https://github.com/Krishcalin/Azure-Security-Scanner",
    status: "coming-soon",
    icon: "cloud",
    highlights: [
      "Live Azure CLI-based audit with evidence collection (CSV/JSON)",
      "16 audit sections covering IAM, networking, storage, compute, databases",
      "CIS Azure Foundations Benchmark alignment",
      "Automated evidence gathering for compliance reporting"
    ]
  },
  {
    id: "gcp-scanner",
    name: "GCP CNAPP Scanner",
    tagline: "Cloud-Native Application Protection Platform for GCP with 67+ checks across 5 pillars",
    category: "cloud",
    tags: ["GCP", "CNAPP", "CSPM", "CIEM", "CWPP", "GKE"],
    stats: { checks: "67+", pillars: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/GCP-CNAPP-Security-Scanner",
    status: "coming-soon",
    icon: "cloud",
    highlights: [
      "CSPM: 39 checks (IAM, Network, Compute, Storage, Cloud SQL, Logging, BigQuery)",
      "CIEM: 8 checks (entitlements, service accounts, over-privileged identities)",
      "CWPP: 14 checks (GKE/KSPM, Cloud Functions, container security)",
      "IaC scanning + compliance mapping"
    ]
  },
  {
    id: "cdr-scanner",
    name: "Cloud Detection & Response",
    tagline: "Cloud audit log analyser with MITRE ATT&CK mapping for AWS, Azure, and GCP",
    category: "cloud",
    tags: ["CDR", "MITRE ATT&CK", "CloudTrail", "Azure Activity", "GCP Audit"],
    stats: { rules: 59, techniques: 38 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Cloud-Detection-Response",
    status: "public",
    icon: "shield",
    highlights: [
      "59 detection rules: AWS 35, Azure 14, GCP 10",
      "MITRE ATT&CK Cloud Matrix mapping (38 techniques)",
      "7 compliance framework references",
      "Analyses JSON cloud audit logs (CloudTrail, Azure Activity, GCP Audit)",
      "Auto-detection of cloud provider from log format"
    ]
  },

  // ── SaaS Security (SSPM) ──────────────────────────────────────
  {
    id: "m365-scanner",
    name: "Microsoft 365 & Entra ID SSPM",
    tagline: "SaaS Security Posture Management for M365 and Entra ID via Microsoft Graph API",
    category: "saas",
    tags: ["M365", "Entra ID", "Graph API", "Exchange", "Teams", "SharePoint"],
    stats: { checks: "50+", domains: 12 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/O365-Security-Posture-Management",
    status: "public",
    icon: "saas",
    highlights: [
      "Live Microsoft Graph API scanning via OAuth 2.0",
      "12 check domains: Entra ID, Exchange, Teams, SharePoint, OneDrive, compliance",
      "Conditional Access policy validation, MFA enforcement checks",
      "Mailbox audit, sharing policies, guest access controls"
    ]
  },
  {
    id: "servicenow-scanner",
    name: "ServiceNow SSPM",
    tagline: "SaaS Security Posture Management for ServiceNow via live REST API",
    category: "saas",
    tags: ["ServiceNow", "SSPM", "REST API", "ITSM"],
    stats: { rules: "29+", categories: 13 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-ServiceNow",
    status: "public",
    icon: "saas",
    highlights: [
      "Live REST API scanning: system properties, users, OAuth, ACL",
      "13 check categories covering authentication, authorization, data security",
      "Property-based checks with operator validation",
      "User account hygiene and OAuth client auditing"
    ]
  },
  {
    id: "successfactors-scanner",
    name: "SAP SuccessFactors SSPM",
    tagline: "SaaS security scanner for SAP SuccessFactors via OData REST API",
    category: "saas",
    tags: ["SAP", "SuccessFactors", "OData", "SSPM", "HCM"],
    stats: { checks: "80+", modules: 7 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-SuccessFactors",
    status: "public",
    icon: "sap",
    highlights: [
      "OData REST API live scanning with OAuth 2.0",
      "7 modules: password policy, user access, SSO, API security, data privacy, instance, audit",
      "Role-based access validation and privilege escalation detection",
      "Data privacy and GDPR compliance checks"
    ]
  },
  {
    id: "tableau-scanner",
    name: "Tableau Cloud SSPM",
    tagline: "SaaS Security Posture Management for Tableau Cloud with 45 controls",
    category: "saas",
    tags: ["Tableau", "SSPM", "REST API", "Analytics"],
    stats: { controls: 45, domains: 5 },
    version: "0.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-Tableau",
    status: "public",
    icon: "saas",
    highlights: [
      "5 domains: identity (AUTH), access (ACCS), data (DATA), API, logging (LOG)",
      "REST API collector with Jinja2 templated reports",
      "Severity-weighted risk scoring per domain",
      "9 controls per domain for comprehensive coverage"
    ]
  },
  {
    id: "sap-s4hana-scanner",
    name: "SAP S/4HANA RISE Scanner",
    tagline: "Security audit for SAP S/4HANA RISE with 70+ checks across 10 modules",
    category: "saas",
    tags: ["SAP", "S/4HANA", "RISE", "BTP", "Fiori"],
    stats: { checks: "70+", modules: 10 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-S4HANA-RISE-Security-Scanner",
    status: "coming-soon",
    icon: "sap",
    highlights: [
      "10 audit modules: user auth, security params, network, BTP, IAM, cloud surface",
      "Integration security, data protection, code transport, log monitoring",
      "Fiori launchpad security and crypto posture assessment",
      "Offline config review mode for air-gapped environments"
    ]
  },

  // ── Infrastructure Security ───────────────────────────────────
  {
    id: "fortinet-scanner",
    name: "Fortinet FortiGate Scanner",
    tagline: "Live FortiOS REST API security scanner with 196 rules across 16 check categories",
    category: "infra",
    tags: ["FortiGate", "FortiOS", "NGFW", "REST API", "CVE"],
    stats: { rules: 196, categories: 16, cves: 20 },
    version: "3.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Fortinet-Network-Security",
    status: "public",
    icon: "firewall",
    highlights: [
      "Live FortiOS REST API scanning (/api/v2/cmdb/...)",
      "16 categories: admin, policies, VPN, profiles, logging, HA, certs, ZTNA, wireless, auth",
      "20 known FortiOS CVEs with train-based firmware version matching",
      "Wireless security, backup/DR, LDAP/RADIUS/SAML authentication checks",
      "FortiOS 6.x and 7.x support"
    ]
  },
  {
    id: "cisco-scanner",
    name: "Cisco Network Security Scanner",
    tagline: "Security scanner for Cisco IOS/IOS-XE routers, switches, WAPs, and NGFW with 128+ checks",
    category: "infra",
    tags: ["Cisco", "IOS", "IOS-XE", "NGFW", "CIS Benchmark"],
    stats: { checks: "128+", modules: 10 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Cisco-Network-Security",
    status: "public",
    icon: "firewall",
    highlights: [
      "10 audit modules: management, control, data, services, switch, wireless, NGFW core/platform, logging, crypto",
      "CIS Cisco IOS Benchmark + NSA FTD Hardening Guide alignment",
      "Supports routers, switches, wireless APs, and Firepower/FTD NGFW",
      "SSH-based live device scanning"
    ]
  },
  {
    id: "paloalto-scanner",
    name: "Palo Alto PAN-OS Scanner",
    tagline: "Security posture scanner for Palo Alto NGFW via PAN-OS XML API with 112+ rules",
    category: "infra",
    tags: ["Palo Alto", "PAN-OS", "NGFW", "XML API", "CVE"],
    stats: { rules: "112+", cves: 20 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Vulnerability-Management",
    status: "public",
    icon: "firewall",
    highlights: [
      "Live PAN-OS XML API scanning",
      "92 config rules + 20 known PAN-OS CVEs",
      "Security zones, policies, GlobalProtect VPN, threat profiles",
      "Decryption policy, WildFire, URL filtering validation"
    ]
  },
  {
    id: "kspm-scanner",
    name: "Kubernetes KSPM",
    tagline: "Agentless Kubernetes Security Posture Management with 150+ checks and CIS Benchmark mapping",
    category: "infra",
    tags: ["Kubernetes", "K8s", "KSPM", "CIS Benchmark", "RBAC", "OPA"],
    stats: { checks: "150+", groups: 16 },
    version: "2.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Kubernetes-Security-Posture-Management",
    status: "public",
    icon: "container",
    highlights: [
      "16 check groups: RBAC, Pod security, images, network, namespaces, secrets, service accounts",
      "CIS Kubernetes Benchmark mapping",
      "OPA/Rego integration, Kyverno validation, baseline profiles",
      "Agentless — connects via standard kubeconfig",
      "Policy engine with exception management"
    ]
  },
  {
    id: "linux-hardening",
    name: "Linux CIS Hardening",
    tagline: "CIS Benchmark hardening scripts for Linux distributions",
    category: "infra",
    tags: ["Linux", "CIS Benchmark", "Hardening", "Compliance"],
    stats: { controls: "200+" },
    version: "1.0.0",
    language: "Bash",
    github: "https://github.com/Krishcalin/Linux-Hardening",
    status: "coming-soon",
    icon: "terminal",
    highlights: [
      "CIS Benchmark compliance for major Linux distributions",
      "Automated hardening and audit modes",
      "L1 and L2 profile support",
      "Idempotent execution with rollback capability"
    ]
  },
  {
    id: "windows-hardening",
    name: "Windows CIS Hardening & Scanners",
    tagline: "CIS Benchmark hardening and scanners for Windows 11 and Windows Server 2016/2019/2022",
    category: "infra",
    tags: ["Windows", "CIS Benchmark", "PowerShell", "GPO", "Server"],
    stats: { controls: "1,240+", scanners: 4 },
    version: "1.0.0",
    language: "PowerShell",
    github: "https://github.com/Krishcalin/Windows-Hardening",
    status: "coming-soon",
    icon: "terminal",
    highlights: [
      "Windows 11 hardening: 170+ CIS settings (L1/L2 profiles)",
      "Server 2016 scanner: 318 controls (CIS v3.0.0)",
      "Server 2019 scanner: 360 controls (CIS v3.0.1)",
      "Server 2022 scanner: 392 controls (CIS v3.0.0)",
      "GPO-deployable as Computer Startup Script, -WhatIf support"
    ]
  },
  {
    id: "ot-security-scanner",
    name: "OT/ICS Security Scanner",
    tagline: "Operational Technology and Industrial Control Systems security assessment",
    category: "infra",
    tags: ["OT", "ICS", "SCADA", "IEC 62443"],
    stats: { checks: "50+" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/OT-Security",
    status: "coming-soon",
    icon: "factory",
    highlights: [
      "OT/ICS environment security posture assessment",
      "IEC 62443 framework alignment",
      "Network segmentation and zone validation",
      "Protocol security checks (Modbus, OPC UA, DNP3)"
    ]
  },

  // ── Threat Detection & Response ───────────────────────────────
  {
    id: "detection-engineering",
    name: "Detection Engineering",
    tagline: "SIEM detection rules in Sigma and KQL for Active Directory and identity attacks",
    category: "threat",
    tags: ["Sigma", "KQL", "SIEM", "Active Directory", "MITRE ATT&CK"],
    stats: { rules: "20+", formats: 2 },
    version: "1.0.0",
    language: "YAML/KQL",
    github: "https://github.com/Krishcalin/Detection-Engineering",
    status: "coming-soon",
    icon: "shield",
    highlights: [
      "Sigma + KQL dual-format detection rules",
      "AD attacks: DCSync, Golden Ticket, Kerberoasting, LSASS, PtH, Password Spray",
      "ADCS, GPO abuse, NTDS extraction, privilege escalation",
      "MITRE ATT&CK technique mapping for every rule"
    ]
  },
  {
    id: "crowdstrike-redteam",
    name: "CrowdStrike Red Team Validation",
    tagline: "Atomic Red Team validation tests for CrowdStrike Falcon detection coverage",
    category: "threat",
    tags: ["CrowdStrike", "Red Team", "Atomic Red Team", "MITRE ATT&CK"],
    stats: { tests: 59 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/CrowdStrike-Red-Teaming-Test",
    status: "coming-soon",
    icon: "target",
    highlights: [
      "59 tests for T1562.001 (Impair Defenses: Disable/Modify Tools)",
      "Atomic Red Team 1:1 mapping for validation",
      "Windows, Linux, and macOS host configuration analysis",
      "Validates CrowdStrike Falcon detection efficacy"
    ]
  },
  {
    id: "crowdstrike-falcon",
    name: "CrowdStrike Falcon EDR Scanner",
    tagline: "CrowdStrike Falcon deployment validation and configuration audit",
    category: "threat",
    tags: ["CrowdStrike", "Falcon", "EDR", "MITRE ATT&CK"],
    stats: { modules: 10 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/CrowdStrike-Falcon-Validation-Scanner",
    status: "coming-soon",
    icon: "shield",
    highlights: [
      "10 audit modules: prevention, updates, response, device control, exclusions",
      "Sensor health, admin access, custom IOA validation",
      "Firewall policy checks and MITRE ATT&CK coverage analysis",
      "Deployment completeness verification"
    ]
  },

  // ── Attack Surface Management ─────────────────────────────────
  {
    id: "easm-scanner",
    name: "Attack Surface Management",
    tagline: "External Attack Surface Management with discovery, enrichment, and vulnerability assessment",
    category: "easm",
    tags: ["EASM", "Subdomain", "DNS", "Port Scan", "CT Logs", "ASN"],
    stats: { rules: "50+", phases: 4 },
    version: "4.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Attack-Surface-Management",
    status: "public",
    icon: "radar",
    highlights: [
      "Subdomain discovery, DNS enumeration, port scanning, HTTP fingerprinting",
      "Certificate Transparency log analysis, ASN mapping",
      "Enrichment and attribution engine with risk scoring",
      "Vulnerability assessment with severity-based alerting",
      "REST API, SIEM export, Jira integration, scheduling"
    ]
  }
];

const TOOL_CATEGORIES = [
  { id: "all",    label: "All Tools",           count: TOOLS.length },
  { id: "appsec", label: "Application Security", count: TOOLS.filter(t => t.category === "appsec").length },
  { id: "cloud",  label: "Cloud Security",       count: TOOLS.filter(t => t.category === "cloud").length },
  { id: "saas",   label: "SaaS / SSPM",          count: TOOLS.filter(t => t.category === "saas").length },
  { id: "infra",  label: "Infrastructure",        count: TOOLS.filter(t => t.category === "infra").length },
  { id: "threat", label: "Threat Detection",      count: TOOLS.filter(t => t.category === "threat").length },
  { id: "easm",   label: "Attack Surface",        count: TOOLS.filter(t => t.category === "easm").length },
];

const TOOL_ICONS = {
  code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  globe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  api: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  sap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  brain: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',
  cloud: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  saas: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  firewall: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="15"/><line x1="9" y1="15" x2="9" y2="21"/></svg>',
  container: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  terminal: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
  factory: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V8l4-2v4l4-2v4l4-2v4l4-2v4l4-2v6H2z"/></svg>',
  target: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  radar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a10 10 0 0 1 7.07 7.07"/><circle cx="12" cy="12" r="1"/></svg>',
};
