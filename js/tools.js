/* ================================================================
   tools.js — Structured tool data for the portal catalogue
   ================================================================ */
const TOOLS = [
  // ── Application Security ──────────────────────────────────────
  {
    id: "app-security-scanner",
    name: "Static Application Security Testing",
    tagline: "Multi-language SAST covering Java, PHP, Python, MERN, and OWASP LLM Top 10 with 200+ rules, 80+ dependency CVEs, and M365 SSPM",
    category: "appsec",
    tags: ["SAST", "Java", "PHP", "Python", "MERN", "OWASP Top 10", "LLM", "CWE", "CVE"],
    stats: { rules: "200+", scanners: 6, cves: "80+", loc: "11,212" },
    version: "4.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Static-Application-Security-Testing",
    sampleReport: "reports/sast-report.html",
    status: "public",
    icon: "code",
    highlights: [
      "6 scanners: Java SAST (3,696 lines), PHP SAST (848), Python SAST (1,231), MERN SAST (1,181), OWASP LLM (1,998), M365 SSPM (2,258)",
      "Java: deserialization, SQLi, XSS, command injection, XXE, SSRF, Log4Shell (CVE-2021-44228), Spring4Shell",
      "PHP: RCE (eval, preg_replace /e), LFI/RFI, SQLi, file upload vulns, 8 php.ini misconfig checks",
      "Python: pickle/YAML deserialization, SSTI (Jinja2), Django/Flask misconfigs, LangChain agent risks, 18 dependency CVEs",
      "MERN: NoSQL injection, prototype pollution, JWT weak secrets, node-serialize RCE, ReDoS, 20+ npm CVEs",
      ".env checks (NODE_ENV, secrets), CORS, helmet, cookie security validation",
      "Zero dependencies (pure Python stdlib), CI/CD exit codes, JSON + HTML dark-theme reports"
    ]
  },
  {
    id: "dast-scanner",
    name: "DAST Scanner",
    tagline: "Active dynamic application security testing with 58 checks, BFS web crawler, WAF detection, and proxy support for Burp/ZAP",
    category: "appsec",
    tags: ["DAST", "OWASP Top 10", "Active Scanning", "Web Apps", "Crawler", "WAF"],
    stats: { checks: 58, categories: 11, loc: "2,205" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Dynamic-Application-Security-Testing",
    sampleReport: "reports/dast-report.html",
    status: "public",
    icon: "globe",
    highlights: [
      "11 test categories: injection (7), XSS (5), auth/session (7), access control (4), info disclosure (11), headers (9), SSRF (3), LFI/RFI (3), XXE (2), API (4), JWT (3)",
      "Active scanner with BFS web crawler, robots.txt/sitemap.xml pre-crawl, HTML form extraction",
      "WAF detection: Cloudflare, AWS WAF, Imperva, Akamai, ModSecurity, F5, Sucuri, Barracuda",
      "Auth modes: none, bearer token, cookie, basic auth, form-based login",
      "Technology fingerprinting: server, framework, CMS detection",
      "ThreadPoolExecutor parallelization, token-bucket rate limiting, scope enforcement",
      "Proxy support (Burp Suite, ZAP integration), configurable crawl depth and page limits",
      "OWASP Top 10 2021 mapped to every finding, JSON + HTML reports"
    ]
  },
  {
    id: "api-security-scanner",
    name: "API Security Scanner",
    tagline: "API discovery and vulnerability scanner with 112+ rules across 22 categories, OWASP API Top 10 (2023), and 5 compliance frameworks",
    category: "appsec",
    tags: ["API", "REST", "GraphQL", "gRPC", "OpenAPI", "OWASP API Top 10", "PCI-DSS", "GDPR"],
    stats: { rules: "112+", categories: 22, frameworks: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/API-Security",
    sampleReport: "reports/api-security-report.html",
    status: "public",
    icon: "api",
    highlights: [
      "OWASP API Security Top 10 (2023): BOLA (6), Broken Auth (10), Property Auth (5), Resource Consumption (6), BFLA (4), Business Flow (3), SSRF (4), Misconfig (10), Inventory (4), Unsafe Consumption (4)",
      "12 additional categories: input validation (7), secrets (6), TLS (4), logging (3), GraphQL (5), gRPC (4), API gateway (5), env secrets (6), containers (4), K8s (5), OpenAPI spec (5), protobuf (2)",
      "Scans: Python, JS/TS, Java, Go, Ruby, PHP, .graphql, .proto, .yaml, .json, nginx.conf, Dockerfile, K8s manifests, .env",
      "API inventory discovery: auto-detects frameworks (Flask, FastAPI, Django, Express, NestJS, Spring Boot), protocols, auth methods, gateways, databases",
      "PCI-DSS v4.0, GDPR, HIPAA, DORA compliance mapping",
      "Zero dependencies (pure stdlib), interactive HTML reports, CI/CD exit codes"
    ]
  },
  {
    id: "owasp-llm-scanner",
    name: "OWASP LLM Top 10 Scanner",
    tagline: "Dedicated SAST scanner for LLM/AI applications with 73 rules covering all 10 OWASP LLM Top 10 categories plus 16 dependency CVEs",
    sampleReport: "reports/owasp-llm-report.html",
    category: "appsec",
    tags: ["LLM", "OWASP LLM Top 10", "Prompt Injection", "AI Security", "SAST"],
    stats: { rules: 73, categories: 10, cves: 16 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Static-Application-Security-Testing",
    status: "public",
    icon: "brain",
    highlights: [
      "Full OWASP LLM Top 10 coverage: LLM01 Prompt Injection, LLM02 Info Disclosure, LLM03 Supply Chain, LLM04 Data Poisoning, LLM05 Improper Output, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector/Embedding, LLM09 Misinformation, LLM10 Unbounded Consumption",
      "36 Python SAST rules: f-string prompt injection, LangChain PromptTemplate, PII in prompts, ShellTool/PythonREPLTool, system prompt in logs",
      "16 JS/TS SAST rules: template literal injection, dangerouslySetInnerHTML with LLM output, hardcoded API keys",
      "4 environment rules (.env), 4 YAML rules (deployment configs)",
      "13 vulnerable Python LLM packages (LangChain, transformers, mlflow, openai, langsmith) + 3 npm LLM packages with known CVEs",
      "Scans .py, .js/.ts/.jsx/.tsx, .env, .yaml, requirements.txt, package.json"
    ]
  },
  {
    id: "sap-abap-scanner",
    name: "SAP ABAP Vulnerability Analyzer",
    tagline: "Dual-mode scanner: 81 SAST rules for ABAP/CDS source code + 30 live BTP API checks via XSUAA OAuth 2.0",
    category: "appsec",
    tags: ["SAP", "ABAP", "BTP", "SAST", "CDS", "XSUAA", "CWE"],
    stats: { rules: 111, modes: 2, categories: 13 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-Code-Vulnerability-Analyzer",
    sampleReport: "reports/sap-abap-report.html",
    status: "public",
    icon: "sap",
    highlights: [
      "SAST mode — 81 rules across 13 categories: SQL injection (10), code injection (8), OS command injection (4), directory traversal (5), XSS (6), missing auth (8), hardcoded credentials (6), weak crypto (5), info disclosure (5), insecure config (6), RFC security (5), BTP-specific config (8), vulnerable SAP dependencies (6 CVEs)",
      "BTP API mode — 30 live checks: password policy (4), user access (4), role management (4), service security (3), trust config (3), audit logging (3), comm security (4), security settings (3), destination security (2)",
      "ABAP-aware parsing: handles * column-1 comments, inline comments, case-insensitive keywords",
      "File types: .abap, .prog.abap, .clas.abap, .intf.abap, .cds, xs-security.json, xs-app.json, mta.yaml",
      "Deep JSON inspection of xs-security.json for wildcard scopes and unauthenticated routes",
      "OAuth 2.0 client credentials flow with automatic token refresh, dual-mode reporting (SAST + API combined)"
    ]
  },
  {
    id: "mast-scanner",
    name: "Mobile Application Security Testing",
    tagline: "Static analysis scanner for Android APK and iOS IPA files with 130+ SAST rules across 24 check modules, MASVS v2 mapping, and 39 dependency CVEs",
    category: "appsec",
    tags: ["Mobile", "Android", "iOS", "APK", "IPA", "MASVS", "OWASP Mobile Top 10", "SAST"],
    stats: { rules: "130+", modules: 24, cves: 39 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Mobile-Application-Security-Testing",
    sampleReport: "reports/mast-report.html",
    status: "public",
    icon: "code",
    highlights: [
      "24 check modules: hardcoded secrets, insecure storage, network security, crypto, WebView, logging, binary protections, permissions, and more",
      "Android analysis: DEX string extraction, AndroidManifest.xml parsing, Smali/Java source scanning, resource XML checks",
      "iOS analysis: Mach-O binary inspection, Info.plist parsing, entitlements extraction, Swift/ObjC source scanning",
      "OWASP MASVS v2 mapping covering 22 of 24 controls across 8 groups",
      "39 dependency CVEs: known vulnerable libraries for both Android and iOS ecosystems",
      "Hardcoded secret detection: AWS, Google, Stripe, Firebase, OAuth tokens, private keys",
      "OWASP Mobile Top 10 2024 alignment, JSON + HTML dark-theme reports"
    ]
  },
  {
    id: "ai-spm-scanner",
    name: "AI Security Posture Management",
    tagline: "AI/ML project SAST scanner with 149+ rules across 26 categories, covering NIST AI RMF, EU AI Act, OWASP ML Top 10, and MITRE ATLAS",
    category: "appsec",
    tags: ["AI/ML", "LLM", "SAST", "RAG", "MCP", "Guardrails", "NIST AI RMF", "EU AI Act", "MITRE ATLAS"],
    stats: { rules: "149+", categories: 26, frameworks: 4 },
    version: "1.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/AI-Secure-Posture-Management",
    sampleReport: "reports/ai-spm-report.html",
    status: "public",
    icon: "brain",
    highlights: [
      "26 security categories: model security (10), prompt/LLM (10), data pipeline (6), privacy (6), guardrails (8), agent security (10), RAG security (5), secrets (8), shadow AI (4), infrastructure (8), MCP security (5), fine-tuning/LoRA (5), multimodal (5), AI observability (6), AI gateway (4), bias & fairness (4), K8s AI workloads (5), Terraform AI IaC (5), model card compliance (5), .env (6), JS/TS (8), config/YAML (8), Docker (4), agent frameworks (5)",
      "Supply chain: 31 PyPI packages + 3 npm packages with known CVEs (tensorflow, pytorch, transformers, langchain)",
      "Agent/MCP security: shell access, filesystem write, human-in-loop, CrewAI/AutoGen/LangGraph risks",
      "AI inventory discovery and shadow AI detection across codebases",
      "4 compliance frameworks: NIST AI RMF (GOVERN/MAP/MEASURE/MANAGE), EU AI Act (High/Limited/GPAI), OWASP ML Top 10 (ML01-ML10), MITRE ATLAS (7 tactics)",
      "Scans: .py, .js/.ts, .env, .yaml, .toml, Dockerfile, .tf, requirements.txt, package.json, .ipynb"
    ]
  },

  // ── Cloud Security ────────────────────────────────────────────
  {
    id: "aws-scanner",
    name: "AWS Security Scanner",
    tagline: "Dual-mode AWS security: IaC scanner (60+ Terraform + 42 CloudFormation rules) and live API auditor (57 checks across 16 service domains)",
    category: "cloud",
    tags: ["AWS", "CloudFormation", "Terraform", "IaC", "S3", "IAM", "CIS", "Live API"],
    stats: { rules: "116+", services: "25+", modes: 2 },
    version: "1.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/AWS-Security-Scanner",
    sampleReport: "reports/aws-security-report.html",
    status: "public",
    icon: "cloud",
    highlights: [
      "IaC Scanner (aws_offline_scanner.py): 60+ Terraform regex rules + 42 CloudFormation resource type handlers across 25+ AWS services",
      "Live API Auditor (aws_live_scanner.py): 57 read-only checks across 16 service domains — IAM (6), S3 (3), VPC (2), Logging (4), RDS (6), CloudFront (5), SNS/SQS (8), Route53 (5), Bedrock (10)",
      "Services: S3, IAM, EC2/SG, RDS, CloudTrail, KMS, CloudFront, ECS, Lambda, API Gateway, VPC, WAF, GuardDuty, Config, Beanstalk, SageMaker, Bedrock, EBS, Step Functions",
      "Custom YAML loader for CloudFormation intrinsic functions (!Ref, !Sub, !GetAtt, !Join, !Select, !If)",
      "Live auditor: evidence artefacts saved per check (CSV/JSON), lazy-loaded cached boto3 clients, IAM credential report generation",
      "CIS AWS Foundations Benchmark v3.0, AWS Well-Architected Framework — Security Pillar",
      "3 output formats: coloured console, JSON, interactive HTML dark-theme reports"
    ]
  },
  {
    id: "azure-scanner",
    name: "Azure Security Scanner",
    tagline: "Live Azure subscription audit with 70+ checks across 16 sections, CIS Azure Foundations Benchmark v4.0.0 alignment, and evidence collection",
    category: "cloud",
    tags: ["Azure", "CIS", "Subscription", "RBAC", "NSG", "Defender", "AKS"],
    stats: { checks: "70+", sections: 16, loc: "1,824" },
    version: "1.0.0",
    language: "Bash",
    github: "https://github.com/Krishcalin/Azure-Security-Scanner",
    sampleReport: "reports/azure-security-report.html",
    status: "public",
    icon: "cloud",
    highlights: [
      "16 audit sections: IAM (IAM-01), Storage (STG-02), Networking (NET-03), Logging (LOG-04), Key Vault (KV-05), VMs (VM-06), App Service (APP-07), Database (DB-08), Defender for Cloud (DEF-09), Conditional Access (CA-10), Resource Locks (LOCK-11), NSG Flow Logs (FLOW-12), Bastion (BASTION-13), ACR (ACR-14), AKS (AKS-15), Miscellaneous (MISC-16)",
      "CIS Microsoft Azure Foundations Benchmark v4.0.0 alignment",
      "Hybrid Bash + inline Python heredocs for complex checks",
      "Zero external dependencies — Bash + Azure CLI 2.50+ + Python 3 only",
      "Read-only by design (never modifies resources), ANSI color-coded output",
      "Timestamped output directory with CSV/JSON evidence files and AUDIT_MANIFEST.txt"
    ]
  },
  {
    id: "gcp-scanner",
    name: "GCP CNAPP Scanner",
    tagline: "Cloud-Native Application Protection Platform for GCP with 67+ checks across 5 CNAPP pillars and 15 audit modules",
    sampleReport: "reports/gcp-cnapp-report.html",
    category: "cloud",
    tags: ["GCP", "CNAPP", "CSPM", "CIEM", "CWPP", "GKE", "CIS", "NIST"],
    stats: { checks: "67+", pillars: 5, modules: 15, loc: "1,837" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/GCP-CNAPP-Security-Scanner",
    status: "public",
    icon: "cloud",
    highlights: [
      "5 CNAPP pillars: CSPM (39 checks), CIEM (8 checks), CWPP (14 checks), IaC scanning (2), Compliance/Encryption (4)",
      "15 auditor modules: IAM, Network, Compute, Storage, Database, Logging, BigQuery, CIEM, ServiceAccount, GKE, Serverless, Container, IaC, CIS, KMS",
      "Offline JSON analysis — no GCP credentials required, pure Python 3.8+",
      "Input: 19+ JSON config types exported from gcloud CLI",
      "CIS Google Cloud Foundation Benchmark v2.0, CIS GKE Benchmark, NIST SP 800-53 Rev 5, NIST CSF 2.0, SOC 2, ISO/IEC 27001:2022",
      "Baseline comparison capability, interactive HTML dashboard, module-selective scanning"
    ]
  },
  {
    id: "multicloud-scanner",
    name: "MultiCloud Security Audit Tool",
    tagline: "ScoutSuite-inspired multi-cloud auditing engine with 30+ condition operators, path wildcards, and extensible rule-based processing",
    category: "cloud",
    tags: ["Multi-Cloud", "AWS", "Azure", "GCP", "ScoutSuite", "Rule Engine"],
    stats: { operators: "30+", providers: 3, checks: "57+" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/MultiCloud-Security-Audit-Tool",
    sampleReport: "reports/multicloud-report.html",
    status: "public",
    icon: "cloud",
    highlights: [
      "Modular rule-based processing engine inspired by ScoutSuite architecture",
      "30+ condition operators: null/empty, boolean, equality, string (contains, startsWith, match), list, dict, length, network (inSubnets, isPublicCidr), date (olderThanDays), logic (and/or/not recursive)",
      "Path wildcards for nested iteration (e.g., iam.users.*, ec2.regions.*.vpcs.*)",
      "Rule parameterization with _ARG_0_, _ARG_1_ tokens for reusable rules",
      "AWS Phase 2 (57 checks), Azure Phase 3 (~50 checks planned), GCP Phase 4 (~40 checks planned)",
      "JSON ruleset definitions with CIS Benchmark compliance mapping",
      "Demo mode (no credentials needed), interactive HTML report, extensible provider architecture"
    ]
  },
  {
    id: "cdr-scanner",
    name: "Cloud Detection & Response",
    tagline: "Cloud audit log analyser with 59 detection rules, MITRE ATT&CK Cloud Matrix mapping (38 techniques), and 7 compliance frameworks",
    category: "cloud",
    tags: ["CDR", "MITRE ATT&CK", "CloudTrail", "Azure Activity", "GCP Audit", "Threat Detection"],
    stats: { rules: 59, techniques: 38, frameworks: 7 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Cloud-Detection-Response",
    sampleReport: "reports/cdr-report.html",
    status: "public",
    icon: "shield",
    highlights: [
      "59 detection rules: AWS CloudTrail (35 rules, 9 tactics), Azure Activity/Sign-in (14 rules, 6 tactics), GCP Audit Logs (10 rules, 6 tactics)",
      "9 MITRE ATT&CK Cloud tactics: Initial Access, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Exfiltration, Lateral Movement, Impact",
      "Rule ID format: CDR-{CLOUD}-{TACTIC}-{NNN} (e.g., CDR-AWS-IA-001, CDR-AZ-PE-002, CDR-GCP-DE-001)",
      "Lambda-based contextual condition functions (15+ condition helpers)",
      "Auto-detection of cloud provider from JSON log structure (CloudTrail, Azure Activity, GCP Audit)",
      "7 compliance frameworks: CIS AWS/Azure/GCP, NIST 800-53, SOC 2 Type II, PCI-DSS v4.0, ISO 27001:2022",
      "Zero dependencies (pure Python 3.10+ stdlib), single portable file"
    ]
  },

  // ── SaaS Security (SSPM) ──────────────────────────────────────
  {
    id: "m365-scanner",
    name: "Microsoft 365 & Entra ID SSPM",
    tagline: "SaaS Security Posture Management for M365 and Entra ID via Microsoft Graph API with 50+ checks across 12 domains",
    category: "saas",
    tags: ["M365", "Entra ID", "Graph API", "Exchange", "Teams", "SharePoint", "Conditional Access"],
    stats: { checks: "50+", domains: 12, loc: "3,773" },
    version: "2.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-O365",
    sampleReport: "reports/m365-sspm-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "Live Microsoft Graph API scanning via OAuth 2.0 client credentials",
      "12 check domains: Entra ID (users, MFA, risky sign-ins), Exchange (mailbox audit, sharing, transport rules), Teams (external access, guest policies), SharePoint (sharing links, external sites), OneDrive, Compliance (DLP, retention, eDiscovery)",
      "Conditional Access policy validation: MFA enforcement, sign-in risk, device compliance, location-based controls",
      "Mailbox audit logging, external forwarding rules, anti-phishing policies",
      "Guest access controls, B2B collaboration settings, cross-tenant access",
      "Rule ID format: M365-{CAT}-{NNN}, JSON + HTML dark-theme reports"
    ]
  },
  {
    id: "servicenow-scanner",
    name: "ServiceNow SSPM",
    tagline: "SaaS Security Posture Management for ServiceNow via live REST API with 43 checks across 13 categories",
    category: "saas",
    tags: ["ServiceNow", "SSPM", "REST API", "ITSM", "Property", "ACL"],
    stats: { rules: 43, categories: 13 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-ServiceNow",
    sampleReport: "reports/servicenow-sspm-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "Live REST API scanning: 30 system property checks + 6 user account hygiene checks + 4 OAuth client audits + 3 ACL validation checks",
      "13 check categories covering authentication, authorization, data security, session management, and API security",
      "Property-based checks with operator validation (equals, not-equals, contains, regex)",
      "User account hygiene: stale accounts, admin sprawl, service account security",
      "OAuth client auditing: scope review, token lifetime, client secrets",
      "Rule ID format: SN-{CAT}-{NNN}, JSON + HTML reports"
    ]
  },
  {
    id: "successfactors-scanner",
    name: "SAP SuccessFactors SSPM",
    tagline: "Dual-mode SSPM for SAP SuccessFactors: 45 live OData API checks + 49 offline config audit checks across 7 modules",
    category: "saas",
    tags: ["SAP", "SuccessFactors", "OData", "SSPM", "HCM", "GDPR"],
    stats: { checks: "94+", modes: 2, modules: 7 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-SuccessFactors",
    sampleReport: "reports/sap-successfactors-report.html",
    status: "public",
    icon: "sap",
    highlights: [
      "Online Scanner — 45 live OData API checks across 8 categories: password policy (10), user security (5), permission roles (2), SSO/auth (4), session mgmt (2), audit logging (4), data privacy (3), integration security (4)",
      "Offline Scanner — 49 config audit checks across 7 modules: RBP permissions (7), auth/provisioning (7), SSO/MFA (9), API/integration (8), data privacy/PII (8), instance/platform (4), audit logging (6)",
      "9 OData entities queried read-only: PasswordPolicy, User, CompanyInfo, PermissionRole, AuditConfiguration, OAuthClient, PersonalDataPurgeJob, ConsentManagementConfig, IntegrationFlowDesign",
      "5 data-center regions: US (DC1), EU (DC2), US2 (DC4), APAC (DC10), Canada (DC12)",
      "Offline mode accepts 22 export files from Admin Center, RBP, Integration Center, SCIM, Picklist Center",
      "GDPR compliance: data purge jobs, field masking, consent management validation",
      "SAP SuccessFactors Security Hardening Guide, CIS HR SaaS, NIST SP 800-63B alignment"
    ]
  },
  {
    id: "tableau-scanner",
    name: "Tableau Cloud SSPM",
    tagline: "SaaS Security Posture Management for Tableau Cloud with 45 controls, severity-weighted scoring (0-100), and 5 security domains",
    category: "saas",
    tags: ["Tableau", "SSPM", "REST API", "Analytics", "Posture Score"],
    stats: { controls: 45, domains: 5, scoring: "0-100" },
    version: "0.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-Tableau",
    sampleReport: "reports/tableau-sspm-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "5 security domains with 9 controls each: Identity & Auth (AUTH), Access Control (ACCS), Data Security (DATA), API & Integrations (API), Logging & Monitoring (LOG)",
      "AUTH: IdP federation (SAML/OIDC), stale accounts (>90d), admin count, duplicate admins, service accounts, auth consistency",
      "DATA: embedded credentials audit, extract encryption at rest, sensitive data source naming, certification coverage",
      "Severity-weighted posture scoring: CRITICAL=25pts, HIGH=15pts, MEDIUM=8pts, LOW=3pts; scores 85-100=Strong, 65-84=Moderate, 40-64=Weak, 0-39=Critical",
      "9 REST API endpoints queried read-only via tableauserverclient SDK (PAT auth)",
      "CI/CD integration: exit code 1 if CRITICAL failures or score below --min-score threshold",
      "Docker support with SHA-pinned base image, GitHub Actions workflow, pre-commit hooks"
    ]
  },
  {
    id: "sap-s4hana-scanner",
    name: "SAP S/4HANA RISE Scanner",
    tagline: "Comprehensive offline security audit for SAP S/4HANA RISE with 186+ checks across 12 modules covering system, cloud, and BTP security",
    category: "saas",
    tags: ["SAP", "S/4HANA", "RISE", "BTP", "Fiori", "SoD", "CIS SAP"],
    stats: { checks: "186+", modules: 12, loc: "10,807" },
    version: "2.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-S4HANA-RISE-Security-Scanner",
    sampleReport: "reports/sap-s4hana-report.html",
    status: "public",
    icon: "sap",
    highlights: [
      "12 audit modules: User & Auth (9), Advanced IAM (25), Security Parameters (25+), Network & Services (8), RISE/BTP (7), BTP Cloud Surface (32), Integration Layer (32), Data Protection (23), Code & Transport (21), Logging & Monitoring (13), Fiori UI (8), Cryptographic Posture (16)",
      "Separation of Duties (SoD) conflict detection: firefighter access, role admin, user admin violations",
      "Cross-system identity validation for consistency across SAP landscapes",
      "BTP Cloud Foundry security: subscriptions, entitlements, cloud foundry orgs/spaces",
      "Cryptographic audit: algorithm strength, key length, TLS version validation",
      "Offline config review: CSV/JSON exports from RZ11, SU01, PFCG, SM59, BTP Admin Console",
      "CIS SAP Benchmark, SAP Security Baseline, NIST CSF, ISO 27001, SOC 2, CSA CAIQ alignment"
    ]
  },

  {
    id: "oracle-ebs-scanner",
    name: "Oracle EBS Security Audit",
    tagline: "Live DB + offline CSV security audit for Oracle E-Business Suite R12.x with 68 checks across 10 domains, SoD detection, and 17+ CWE mappings",
    category: "saas",
    tags: ["Oracle", "EBS", "R12", "SoD", "SOX", "CIS", "PCI-DSS", "Audit", "Database"],
    stats: { checks: 68, categories: 10, cwes: "17+", loc: "4,775" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Oracle-EBS-Security-Audit",
    sampleReport: "reports/oracle-ebs-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "Dual-mode: Live DB scanner (oracledb) + Offline CSV scanner (zero dependencies) with 20 SQL export queries provided",
      "10 audit domains: User Security (8), Password & Auth (6), Profile Options (10), Responsibility & Access (6), Segregation of Duties (6), Concurrent Programs (4), Audit Trail (5), Database Security (10), Patching & Versions (4), Workflow & Approvals (4)",
      "Segregation of Duties: 6 conflict pairs — AP/AR, AP/PO, GL/AP, PO/INV, Admin/AP, HR/AP",
      "Database hardening: DBA role grants, PUBLIC privileges, UTL_FILE_DIR, remote OS auth, password verify function, default accounts",
      "Audit trail validation: 13 critical tables (AP, GL, PO, AR, INV, PER, PAY), sign-on audit level, DB-level auditing",
      "SOX, CIS Oracle DB Benchmark, NIST 800-53, PCI-DSS v4.0, HIPAA, ISO 27001 compliance alignment",
      "JSON + HTML (Catppuccin Mocha dark theme with filters) + console reports, CI/CD exit-code gating"
    ]
  },

  // ── Infrastructure Security ───────────────────────────────────
  {
    id: "fortinet-scanner",
    name: "Fortinet FortiGate Scanner",
    tagline: "Live FortiOS REST API security scanner with 260+ rules, 30 MITRE ATT&CK resilience tests, 30 CVEs, 5 compliance frameworks, and multi-device fleet scanning",
    sampleReport: "reports/fortinet-report.html",
    category: "infra",
    tags: ["FortiGate", "FortiOS", "NGFW", "REST API", "CVE", "MITRE ATT&CK", "VPN", "ZTNA", "CIS", "PCI-DSS", "NIST"],
    stats: { rules: "260+", categories: 18, cves: 30, mitre: 30, loc: "5,174" },
    version: "4.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Fortinet-Network-Security",
    status: "public",
    icon: "firewall",
    highlights: [
      "18 check methods: admin (24), system (12), policies (16), SSL VPN (14), IPsec (12), security profiles (11), logging (18), HA (8), certs (11), network (18), FortiGuard (7), ZTNA/SD-WAN (6), wireless (9), backup (5), auth (6), advanced hardening (~15), MITRE ATT&CK resilience (~30), CVEs (30)",
      "30 MITRE ATT&CK techniques tested across 10 tactics with 0-100% resilience scoring",
      "30 known FortiOS CVEs (2019-2025) with train-based firmware version matching (6.2-7.6)",
      "5 compliance frameworks: CIS FortiGate, PCI-DSS 4.0, NIST 800-53 Rev 5, SOC 2 Type II, HIPAA — 76 rule-to-control mappings",
      "42 FortiOS CLI remediation commands per finding (--remediation export)",
      "Multi-device fleet scanning via JSON inventory (--inventory), unified reports, compliance CSV export",
      "FortiOS 6.x/7.x, zero-agent REST API, JSON + interactive HTML dark-theme reports, CI/CD exit codes"
    ]
  },
  {
    id: "cisco-scanner",
    name: "Cisco Network Security Scanner",
    tagline: "Offline config analysis for Cisco IOS/IOS-XE/NX-OS/FTD with 128+ checks across 10 modules, CIS and NSA benchmark alignment",
    category: "infra",
    tags: ["Cisco", "IOS", "IOS-XE", "NX-OS", "FTD", "CIS Benchmark", "NSA"],
    stats: { checks: "128+", modules: 10, platforms: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Cisco-Network-Security",
    sampleReport: "reports/cisco-nss-report.html",
    status: "public",
    icon: "firewall",
    highlights: [
      "10 audit modules: management plane (25), control plane (11), data plane (9), services/protocols (9), switch security (8), wireless (10), NGFW core (9), NGFW platform (7), logging (10), cryptographic posture (10)",
      "Platforms: Cisco IOS, IOS-XE, NX-OS, Firepower/FTD, WLC (wireless controllers)",
      "Management: passwords, AAA, SSH hardening, VTY access, login banners",
      "Control: CoPP, routing auth (OSPF/BGP/EIGRP), NTP, STP, CDP/LLDP",
      "Switch: port security, VLAN segmentation, trunk hardening, DTP, BPDU guard, DAI",
      "NGFW: access control policies, IPS, AMP, SSL inspection, FTD management, FXOS",
      "CIS Cisco IOS/IOS-XE/FTD Benchmarks, NSA FTD Hardening Guide, zero dependencies (offline analysis)"
    ]
  },
  {
    id: "paloalto-scanner",
    name: "Palo Alto PAN-OS Scanner",
    tagline: "Offline config analysis for Palo Alto NGFW and Prisma SASE with 85+ checks across 10 modules, CIS PAN-OS Benchmark alignment",
    category: "infra",
    tags: ["Palo Alto", "PAN-OS", "NGFW", "Prisma", "SASE", "ZTNA", "CIS Benchmark"],
    stats: { rules: "85+", modules: 10 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/PaloAlto-Network-Security",
    sampleReport: "reports/paloalto-pan-report.html",
    status: "public",
    icon: "firewall",
    highlights: [
      "10 audit modules: device/management (11), security policy (8), threat prevention (8), network security (6), decryption/SSL/TLS (6), GlobalProtect VPN (6), logging/forwarding (5), HA/resilience (5), SASE/Prisma Access (9), URL/data filtering (5)",
      "Dual coverage: PAN-OS NGFW + Prisma SASE/Prisma Access",
      "Threat prevention: AV profiles, anti-spyware, vulnerability protection, WildFire, DNS security",
      "GlobalProtect: HIP checks, split tunneling, crypto profiles, portal/gateway auth",
      "SASE/Prisma Access: ZTNA 2.0, Secure Web Gateway, CASB, DLP integration",
      "CIS Benchmarks (PAN-OS 9/10/11), Palo Alto best practices, IronSkillet hardening",
      "Input formats: XML (PAN-OS), JSON/CSV (Prisma), zero dependencies, offline analysis"
    ]
  },
  {
    id: "kspm-scanner",
    name: "Kubernetes KSPM",
    tagline: "Agentless Kubernetes Security Posture Management with 150+ checks, 19 check groups, OPA/Rego + Kyverno integration, and supply chain security",
    sampleReport: "reports/kspm-report.html",
    category: "infra",
    tags: ["Kubernetes", "K8s", "KSPM", "CIS Benchmark", "RBAC", "OPA", "Kyverno", "Supply Chain"],
    stats: { checks: "150+", groups: 19, frameworks: 6, loc: "5,564" },
    version: "2.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Kubernetes-Security-Posture-Management",
    status: "public",
    icon: "container",
    highlights: [
      "19 check groups: RBAC (27), pod security (25), images (5), network (10), namespaces (6), secrets (6), service accounts (4), cluster config (10), storage/PV (4), admission control (5), node security (6), PDB (3), HPA (4), service mesh (4), deprecated APIs (3), runtime (3), advanced RBAC (12), supply chain (10), Kyverno (6)",
      "Supply chain security: CVE scanning (Trivy/Grype), cosign signature verification, SBOM validation, EOL image detection",
      "RBAC graph analysis: dormant service accounts, privilege escalation paths, drift tracking",
      "OPA/Rego integration, Kyverno policy validation, Pod Security Admission baseline profiles",
      "Multi-cluster scanning, baseline profiles (dev/staging/prod), exception management with YAML DSL",
      "6 compliance frameworks: CIS K8s Benchmark, NSA/CISA Hardening, MITRE ATT&CK Containers, SOC 2, PCI-DSS, NIST 800-190",
      "Output: Console, JSON, HTML, SARIF (GitHub), PDF; Slack/Teams webhook alerts"
    ]
  },
  {
    id: "vuln-mgmt-scanner",
    name: "Vulnerability Management Scanner",
    tagline: "Enterprise vulnerability scanner with 820+ rules, 32,000+ CVE database, DAST capabilities, and 23 platform support across 6 CIS Benchmarks",
    category: "infra",
    tags: ["Vulnerability Management", "CVE", "NVD", "CISA KEV", "CIS Benchmark", "DAST", "SARIF"],
    stats: { rules: "820+", cves: "32,000+", platforms: 23 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Vulnerability-Management",
    sampleReport: "reports/vuln-mgmt-report.html",
    status: "public",
    icon: "target",
    highlights: [
      "820+ security rules across 21 modules + 11 DAST check categories",
      "32,000+ CVE database (NVD + CISA KEV), 510 bundled seed CVEs for offline operation",
      "23 platforms: Windows, Linux, Cisco, web servers, middleware, databases, network devices",
      "6 CIS Benchmarks integrated, NIST 800-53, ISO 27001, PCI-DSS v4.0, CIS Controls v8",
      "Built-in DAST: injection, XSS, auth, access control, API, file inclusion, SSRF, XXE, JWT",
      "Scan profiles: quick, standard, full, compliance, cve-only; baseline diff and incremental CVE sync",
      "Plugin architecture, credential management, output: Console, JSON, CSV, SARIF, HTML, PDF"
    ]
  },
  {
    id: "linux-hardening",
    name: "Linux CIS Hardening",
    tagline: "CIS Benchmark hardening scripts for RHEL 8 and RHEL 9 with L1/L2 profiles and automated audit modes",
    category: "infra",
    tags: ["Linux", "RHEL", "CIS Benchmark", "Hardening", "Compliance"],
    stats: { controls: "200+", scripts: 2, loc: "1,717" },
    version: "1.0.0",
    language: "Bash",
    github: "https://github.com/Krishcalin/Linux-Hardening",
    overview: "reports/linux-hardening-overview.html",
    status: "public",
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
    tagline: "CIS Benchmark hardening (Win11, 170+ settings) and compliance scanners for Server 2016/2019/2022 with 1,240+ total controls",
    category: "infra",
    tags: ["Windows", "CIS Benchmark", "PowerShell", "GPO", "Server", "BitLocker"],
    stats: { controls: "1,240+", scanners: 4, loc: "6,046" },
    version: "1.0.0",
    language: "PowerShell",
    github: "https://github.com/Krishcalin/Windows-Hardening",
    overview: "reports/windows-hardening-overview.html",
    status: "public",
    icon: "terminal",
    highlights: [
      "Windows 11 Hardening (CIS v4.0.0): 170+ settings, L1/L2 profiles, -WhatIf, -BackupOnly, GPO-deployable as Computer Startup Script",
      "Server 2016 Scanner (CIS v3.0.0): 318 controls",
      "Server 2019 Scanner (CIS v3.0.1): 360 controls",
      "Server 2022 Scanner (CIS v3.0.0): 392 controls",
      "Server scanner profiles: L1_MS, L2_MS, L1_DC, L2_DC, BL (BitLocker), NG (Next Gen), All",
      "Auto-detection: Domain Controller vs. Member Server, check types: Registry, Secedit, UserRight, Auditpol, Service, Firewall",
      "Timestamped transcript logs, before/after backup snapshots, colour-coded console + JSON + HTML output"
    ]
  },
  {
    id: "ot-security-scanner",
    name: "OT/ICS Security Scanner",
    tagline: "Passive PCAP analysis for OT/ICS environments with dual scanners covering 7+ industrial protocols and 130+ vendor OUI fingerprints",
    sampleReport: "reports/ot-security-report.html",
    category: "infra",
    tags: ["OT", "ICS", "SCADA", "Modbus", "DNP3", "S7comm", "IEC 61850", "IEC 62443"],
    stats: { protocols: "7+", vendors: "130+", scanners: 2, loc: "559" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/OT-Security",
    status: "public",
    icon: "factory",
    highlights: [
      "PLC Passive Scanner: protocol-aware PCAP analysis for Modbus/TCP (502), S7comm/S7comm+ (102), EtherNet/IP/CIP (44818), DNP3 (20000), Omron FINS (9600), MELSEC MC (5006-5008), IEC 60870-5-104 (2404)",
      "RTU/FRTU Vulnerability Scanner: passive vulnerability detection for DNP3, IEC-104, IEC 61850 (MMS/GOOSE/SV), Modbus, SEL Fast Message",
      "130+ vendor OUI fingerprints: Siemens, Rockwell/Allen-Bradley, Schneider Electric, Mitsubishi, Omron, ABB, Honeywell, GE, Yokogawa",
      "Vulnerability categories: authentication, encryption, GOOSE security, command safety, configuration",
      "IEC 62443, IEC 62351 framework alignment",
      "Output: JSON, CSV, interactive HTML; fully passive (no traffic injection)"
    ]
  },

  // ── Threat Detection & Response ───────────────────────────────
  {
    id: "detection-engineering",
    name: "Detection Engineering",
    tagline: "35+ SPL detection rules for Splunk SIEM covering Windows AD, RHEL Linux, Apache, and recent attacks with MITRE ATT&CK mapping",
    category: "threat",
    tags: ["SPL", "Splunk", "SIEM", "Active Directory", "MITRE ATT&CK", "RHEL", "Apache"],
    stats: { rules: "35+", platforms: 3, formats: "SPL" },
    version: "1.0.0",
    language: "YAML/SPL",
    github: "https://github.com/Krishcalin/Detection-Engineering",
    overview: "reports/detection-engineering-overview.html",
    status: "public",
    icon: "shield",
    highlights: [
      "170+ SPL (Splunk Processing Language) detection rules with YAML-based rule definitions",
      "Windows AD attacks: ADCS abuse, DCSync, Golden Ticket, Kerberoasting, LSASS access, NTDS extraction, Pass-the-Hash, Password Spray, Privilege Group modification, GPO abuse",
      "Pending rules: Silver Ticket, BloodHound Enum, NTLM Relay, Event Log Tampering, Kerberos Delegation, ACL/DACL Abuse, DCShadow, Skeleton Key, Zerologon, Print Spooler",
      "RHEL Linux and Apache Web Server detection rules included",
      "MITRE ATT&CK technique mapping for every rule",
      "Investigation queries, incident response playbooks, and correlation searches"
    ]
  },
  {
    id: "crowdstrike-redteam",
    name: "CrowdStrike Red Team Validation",
    tagline: "All 59 Atomic Red Team tests for MITRE ATT&CK T1562.001 (Impair Defenses) across 6 platforms and 18 categories",
    category: "threat",
    tags: ["CrowdStrike", "Red Team", "Atomic Red Team", "MITRE ATT&CK", "T1562.001"],
    stats: { tests: 59, categories: 18, platforms: 6 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/CrowdStrike-Red-Teaming-Test",
    sampleReport: "reports/crowdstrike-redteam-report.html",
    status: "public",
    icon: "target",
    highlights: [
      "All 59 Atomic Red Team tests for T1562.001 — Impair Defenses: Disable or Modify Tools",
      "18 categories: Syslog/Linux, macOS, Sysmon, AMSI, Security Services, Defender, Registry, Office, O365, EDR, LockBit, HVCI, Cloud, ASR, ETW, and more",
      "6 platforms: Windows, Linux, macOS, AWS, ESXi, Office 365",
      "Offline JSON-based configuration analysis (no live system modification)",
      "Input: exported services, registry, Defender preferences, processes, scheduled tasks",
      "Each test mapped to Atomic GUID with severity and remediation guidance",
      "Zero dependencies, CI/CD exit codes"
    ]
  },
  {
    id: "crowdstrike-falcon",
    name: "CrowdStrike Falcon EDR Scanner",
    tagline: "Falcon deployment validation and configuration audit with 36+ checks across 10 modules including prevention, exclusions, and MITRE coverage",
    category: "threat",
    tags: ["CrowdStrike", "Falcon", "EDR", "MITRE ATT&CK", "Prevention Policy"],
    stats: { checks: "36+", modules: 10 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/CrowdStrike-Falcon-Validation-Scanner",
    sampleReport: "reports/crowdstrike-falcon-report.html",
    status: "public",
    icon: "shield",
    highlights: [
      "10 audit modules: prevention policy (10), sensor update (4), response policy (2), device control (2), exclusion audit (7), sensor health (4), admin/API security (4), custom IOA (2), firewall policy (1), MITRE ATT&CK coverage (1)",
      "Prevention: NGAV, ML levels (aggressive/moderate/cautious), behavioral analysis, exploit mitigation, ransomware protection",
      "Exclusion audit: dangerous paths, wildcards, LOLBins in exclusions, excessive scope, exclusion count thresholds",
      "Sensor health: RFM mode, stale sensors, OS distribution, deployment completeness",
      "Admin security: admin count, MFA enforcement, API scope review, RBAC validation",
      "Input: JSON exports from Falcon Console or FalconPy API, interactive HTML dashboard"
    ]
  },

  // ── Attack Surface Management ─────────────────────────────────
  {
    id: "easm-scanner",
    name: "Attack Surface Management",
    tagline: "14-step EASM pipeline: discovery, enrichment, vulnerability assessment with CVE/Nuclei scanning, subdomain takeover, and risk scoring",
    category: "easm",
    tags: ["EASM", "Subdomain", "DNS", "Port Scan", "CT Logs", "ASN", "Nuclei", "CVE"],
    stats: { steps: 14, phases: 4, integrations: 7 },
    version: "4.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Attack-Surface-Management",
    sampleReport: "reports/easm-report.html",
    status: "public",
    icon: "radar",
    highlights: [
      "Phase 1 — Discovery (6 steps): seed ingestion, ASN expansion (BGPView, RIPE, asnmap), subdomain enumeration (crt.sh, subfinder, DNS brute-force), DNS resolution, port scanning, HTTP probing",
      "Phase 2 — Enrichment (4 steps): WHOIS lookup, TLS certificate analysis, GeoIP mapping, technology fingerprinting and attribution",
      "Phase 3 — Vulnerability Assessment (4 steps): CVE scanning (25+ products) with EPSS + CISA KEV, Nuclei scanning (15 built-in templates + Go binary), subdomain takeover (25 cloud providers), misconfig (39 sensitive paths), default credentials (8 services, 36 pairs), DNS security (SPF/DKIM/DMARC, AXFR, CAA)",
      "Phase 4 — Integration: REST API, interactive dashboard, Slack/Teams/Email alerts, Splunk/Elasticsearch/Syslog export, Jira ticketing, scheduled scans",
      "Multi-factor risk scoring with 5 auto-escalation rules",
      "Cloud storage enumeration: S3, Azure Blob, GCS bucket discovery",
      "Output: JSON, CSV, HTML dashboard, REST API"
    ]
  },

  // ── Governance & Risk ─────────────────────────────────────────
  {
    id: "crq-engine",
    name: "Cyber Risk Quantification",
    tagline: "FAIR-based Monte Carlo risk quantification engine with loss exceedance curves, control effectiveness analysis, and industry-calibrated threat modelling",
    category: "risk",
    tags: ["CRQ", "FAIR", "Monte Carlo", "Risk Quantification", "Loss Exceedance", "GRC"],
    stats: { model: "FAIR", simulations: "10,000", threats: 7 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Cyber-Risk-Quantification",
    sampleReport: "reports/crq-report.html",
    status: "public",
    icon: "shield",
    highlights: [
      "Factor Analysis of Information Risk (FAIR) model: Risk = Loss Event Frequency (TEF x Vulnerability) x Loss Magnitude (Primary + Secondary)",
      "10,000 Monte Carlo iterations (configurable) with PERT (beta) distribution sampling for realistic uncertainty modelling",
      "7 threat communities: nation-state, organized crime, hacktivist, insider (malicious/accidental), competitor, script kiddie",
      "Industry-calibrated loss multipliers: financial services, healthcare, tech, manufacturing, retail, government",
      "Output: risk scores (0-100 normalized to revenue), loss exceedance curves, control effectiveness analysis, percentile distributions (5th-95th)",
      "Risk thresholds: CRITICAL (>5% revenue), HIGH (>2%), MEDIUM (>0.5%), LOW (<0.5%)",
      "Zero dependencies (pure Python stdlib), JSON + interactive HTML with SVG charts"
    ]
  },

  // ── Red Teaming ─────────────────────────────────────────────
  {
    id: "windows-red-teaming",
    name: "Windows Red Teaming",
    tagline: "MITRE ATT&CK-aligned red team scanner with 29 Python modules + 202 Atomic Red Team-style YAML tests across 13 tactics, dual check/simulate modes",
    category: "redteam",
    tags: ["Red Team", "MITRE ATT&CK", "Windows", "Atomic Red Team", "PowerShell", "WinRM", "YAML"],
    stats: { techniques: "~90", modules: 29, atomics: 202, tests: 122 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Windows-Red-Teaming",
    sampleReport: "reports/windows-redteam-report.html",
    status: "public",
    icon: "target",
    highlights: [
      "Dual-mode: 29 Python modules (check/simulate/cleanup) + 202 YAML atomic tests (ART-style) across 61 techniques",
      "13 MITRE ATT&CK tactics: Reconnaissance, Discovery, Execution, Persistence, Priv Esc, Defense Evasion, Credential Access, Lateral Movement, Collection, C2, Exfiltration, Impact, Initial Access",
      "Atomic YAML tests: #{arg} templating, dependencies (prereq_command/get_prereq_command), cleanup commands, powershell/cmd/manual executors",
      "Credential Access: LSASS PPL/Credential Guard, SAM/NTDS.dit, Kerberoasting, brute force, credentials in files",
      "Lateral Movement (NEW): RDP config, SMB admin shares, WinRM, Pass the Hash feasibility",
      "Impact (NEW): service stop, inhibit recovery, data destruction, account access removal",
      "Session abstraction: Local + Remote WinRM. run-atomic CLI for single-technique execution. 122 pytest tests"
    ]
  },
  {
    id: "rhel-red-teaming",
    name: "RHEL Red Teaming",
    tagline: "MITRE ATT&CK-aligned red team scanner for Red Hat Enterprise Linux with 297 security checks across 52 implemented modules and SSH remote scanning",
    category: "redteam",
    tags: ["Red Team", "MITRE ATT&CK", "RHEL", "Linux", "SSH", "SELinux", "auditd", "PAM"],
    stats: { checks: 297, modules: 52, techniques: 180 },
    version: "0.1.0",
    language: "Python",
    github: "https://github.com/Krishcalin/RHEL-Red-Teaming",
    overview: "reports/rhel-redteam-overview.html",
    status: "public",
    icon: "target",
    highlights: [
      "297 security checks across 180 MITRE ATT&CK techniques and 187 sub-techniques (Linux Matrix v16)",
      "52 modules implemented covering reconnaissance, discovery, credential access, privilege escalation, execution, persistence, defense evasion, lateral movement",
      "RHEL-specific controls: SELinux policy enforcement, firewalld zone validation, auditd rule completeness, PAM configuration, sudoers hardening",
      "Safe by default: passive checks with optional active simulation via --simulate flag and automatic cleanup",
      "Local and remote scanning via SSH (paramiko), module auto-discovery, scan profiles",
      "ATT&CK Navigator JSON layer export, HTML dark-themed reports, JSON, CSV output formats"
    ]
  },
  {
    id: "ad-attack-scenarios",
    name: "Active Directory Attack Scenarios",
    tagline: "Structured attack scenario library for Active Directory environments with MITRE ATT&CK mapped techniques, detection rules, and response playbooks",
    category: "redteam",
    tags: ["Active Directory", "Red Team", "MITRE ATT&CK", "Kerberos", "LDAP", "BloodHound", "Mimikatz"],
    stats: { scenarios: "20+", tactics: 8 },
    version: "1.0.0",
    language: "Markdown/YAML",
    github: "https://github.com/Krishcalin/Active-Directory-Attack-Scenarios",
    overview: "reports/ad-attack-overview.html",
    status: "public",
    icon: "target",
    highlights: [
      "Comprehensive AD attack scenario documentation with step-by-step execution guides",
      "MITRE ATT&CK technique mapping for each attack scenario",
      "Covers: DCSync, Golden Ticket, Silver Ticket, Kerberoasting, AS-REP Roasting, Pass-the-Hash, NTLM Relay, GPO abuse",
      "Detection rules and indicators of compromise for each scenario",
      "Lab setup guides for safe testing in isolated environments",
      "Paired with Detection Engineering repo for blue team validation"
    ]
  },
  {
    id: "autonomous-pentest",
    name: "Autonomous Penetration Testing Copilot",
    tagline: "AI-powered pentest agent with 27 autonomous tools, 4 recon pipelines, 14-protocol credential spray engine, and LLM-driven agentic kill chain execution",
    category: "redteam",
    tags: ["Pentest", "Autonomous", "AI Agent", "Recon", "Credential Spray", "MITRE ATT&CK", "PTES"],
    stats: { tools: 27, playbooks: 5, protocols: 14, commands: 21 },
    version: "2.3.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Autonomous-Pen-Testing",
    sampleReport: "reports/autonomous-pentest-report.html",
    status: "public",
    icon: "target",
    highlights: [
      "27 agent tools enabling autonomous execution of security tools with LLM-driven agentic loop",
      "4 autonomous recon pipelines: full, quick, subdomain, and stealth with multi-tool chaining",
      "14-protocol credential spray engine: SSH, FTP, SMB, RDP, WinRM, MSSQL, MySQL, PostgreSQL, Redis, MongoDB, LDAP, SNMP, HTTP Basic, VNC",
      "5 playbooks: external pentest, internal network, web app, cloud recon, wireless assessment",
      "Kill chain tracking with automatic phase progression and evidence collection",
      "OWASP Top 10, PTES, NIST 800-53, CWE, MITRE ATT&CK framework alignment",
      "21 CLI commands with interactive and non-interactive modes, JSON evidence export"
    ]
  },

  // ── Additional SaaS / SSPM ─────────────────────────────────
  {
    id: "oracle-saas-scanner",
    name: "Oracle SaaS Cloud SSPM",
    tagline: "SaaS Security Posture Management for Oracle Fusion Cloud (ERP, HCM, SCM, CX), EPM Cloud, and IDCS with 55 live API checks across 4 CIS sections",
    category: "saas",
    tags: ["Oracle", "Fusion Cloud", "IDCS", "SSPM", "ERP", "HCM", "CIS", "OAuth 2.0"],
    stats: { checks: 55, sections: 4, frameworks: 4 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-Oracle-SaaS-Cloud",
    sampleReport: "reports/oracle-saas-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "4 CIS sections: Identity & Access Management, Data Protection, Logging & Monitoring, Network & Application Security",
      "Dual authentication: OAuth 2.0 Client Credentials + Basic Auth fallback with dual API support (IDCS + Fusion Cloud REST)",
      "Graceful degradation with IDCS-only mode when Fusion URL unavailable",
      "4 compliance frameworks per finding: CIS Oracle Cloud SaaS Applications Benchmark v1.0.0, NIST SP 800-53, ISO 27001, SOC 2 Type II",
      "95% CIS benchmark coverage with severity-weighted scoring and letter grades (A-F)",
      "JSON + HTML dark-theme dashboard reports, CI/CD exit-code gating"
    ]
  },
  {
    id: "snowflake-scanner",
    name: "Snowflake SSPM Scanner",
    tagline: "Read-only SaaS Security Posture Management scanner for Snowflake Data Platform with 39 checks across 4 CIS domains and severity-weighted scoring",
    category: "saas",
    tags: ["Snowflake", "SSPM", "Data Platform", "CIS", "IAM", "Networking", "Data Protection"],
    stats: { checks: 39, domains: 4, frameworks: 4 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SSPM-Snowflake-Data-Platform",
    sampleReport: "reports/snowflake-sspm-report.html",
    status: "public",
    icon: "saas",
    highlights: [
      "4 CIS domains: Identity & Access Management (17 checks), Monitoring & Alerting (9), Networking (2), Data Protection (11)",
      "CIS Snowflake Foundations Benchmark v1.0.0 alignment with severity-weighted scoring engine and letter grades (A-F)",
      "Read-only assessment: all checks use SHOW/DESCRIBE commands, no data modification",
      "Compliance mapping: NIST SP 800-53 Rev 5, ISO 27001:2022, SOC 2 Type II per finding",
      "Exit code gating on critical failures or score thresholds for CI/CD integration",
      "Three output formats: ANSI console, JSON, and self-contained HTML dashboard"
    ]
  },
  {
    id: "sap-ariba-scanner",
    name: "SAP Ariba SSPM Scanner",
    tagline: "Offline SSPM security posture assessment for SAP Ariba procurement environments with 47+ checks across 10 audit modules and 6 compliance frameworks",
    category: "saas",
    tags: ["SAP", "Ariba", "SSPM", "Procurement", "SOX", "GDPR", "ISO 27001"],
    stats: { checks: "47+", modules: 10, frameworks: 6 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/SAP-Ariba-Security-Scanner",
    sampleReport: "reports/sap-ariba-report.html",
    status: "public",
    icon: "sap",
    highlights: [
      "10 audit modules: identity & access, authentication, API security, procurement workflow, data protection, integration, supplier management, configuration, network, logging",
      "Offline analysis: processes JSON/CSV exports without live API access",
      "Procurement-specific checks: approval workflows, contract security, invoice validation, supplier onboarding",
      "6 compliance frameworks: SOX (Sarbanes-Oxley), GDPR, ISO 27001, SOC 2, CIS Controls v8, NIST SP 800-53 Rev 5",
      "Zero external dependencies — Python 3.8+ standard library only",
      "HTML dashboard reporting with severity filtering, JSON output, CI/CD exit codes"
    ]
  },

  // ── Additional Cloud Security ───────────────────────────────
  {
    id: "ocp-cnapp-scanner",
    name: "OCI CNAPP Security Scanner",
    tagline: "Comprehensive offline CNAPP assessment combining CSPM, CIEM, CWPP, KSPM, and IaC scanning for Oracle Cloud Infrastructure with 96 checks across 13 modules",
    category: "cloud",
    tags: ["OCI", "Oracle Cloud", "CNAPP", "CSPM", "CWPP", "KSPM", "IaC", "CIS"],
    stats: { checks: 96, modules: 13, pillars: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/OCI-CNAPP-Security-Scanner",
    sampleReport: "reports/oci-cnapp-report.html",
    status: "public",
    icon: "cloud",
    highlights: [
      "5 CNAPP pillars: CSPM (71 checks), CWPP/KSPM (16 checks), Encryption (5 checks), IaC (3 checks), CIEM integrated",
      "13 modules: IAM, Networking, Compute, Storage, Database, Logging, KMS, VCN, Vault, Container Engine, Functions, Events, Notifications",
      "CIS Oracle Cloud Infrastructure Foundations Benchmark v3.1.0 mapping with 95% coverage (45+ checks)",
      "Offline-only analysis: processes JSON exports, zero live OCI connections required",
      "Compliance: NIST SP 800-53 Rev 5, SOC 2, ISO 27001:2022",
      "Interactive HTML dashboard with severity breakdown, JSON output, CI/CD exit codes"
    ]
  },

  // ── Additional Infrastructure ──────────────────────────────
  {
    id: "zscaler-scanner",
    name: "Zscaler Security Scanner",
    tagline: "Security posture assessment for Zscaler ZIA and ZPA deployments with policy validation, tunnel health, and ZTNA configuration auditing",
    category: "infra",
    tags: ["Zscaler", "ZIA", "ZPA", "ZTNA", "SASE", "Zero Trust", "SWG"],
    stats: { modules: 8 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Zscaler-Security-Scanner",
    sampleReport: "reports/zscaler-report.html",
    status: "public",
    icon: "firewall",
    highlights: [
      "Zscaler Internet Access (ZIA) policy validation: URL filtering, SSL inspection, firewall rules, DLP policies",
      "Zscaler Private Access (ZPA) auditing: application segments, access policies, connector health, posture profiles",
      "ZTNA configuration checks: identity provider integration, device trust, app-level microsegmentation",
      "Tunnel and connector health monitoring, bandwidth policies, location-based rules",
      "CIS-aligned security posture benchmarking for SASE deployments",
      "JSON/HTML reporting with severity-based findings"
    ]
  },

  // ── Additional Governance & Risk ───────────────────────────
  {
    id: "responsible-ai",
    name: "Responsible AI Framework",
    tagline: "Python-based framework for implementing responsible AI practices — protecting AI applications and agents with safety guardrails and governance controls",
    category: "risk",
    tags: ["Responsible AI", "AI Safety", "AI Governance", "Guardrails", "EU AI Act", "NIST AI RMF"],
    stats: { pillars: 6 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Responsible-AI-Framework",
    overview: "reports/responsible-ai-overview.html",
    status: "public",
    icon: "brain",
    highlights: [
      "AI safety guardrails for production AI applications and autonomous agents",
      "Responsible AI principles: fairness, accountability, transparency, safety, privacy, security",
      "Bias detection and fairness metrics for ML model evaluation",
      "Content safety filtering and prompt injection prevention",
      "Alignment with EU AI Act, NIST AI RMF, and ISO/IEC 42001 standards",
      "Extensible Python framework with pluggable safety checks"
    ]
  },
  {
    id: "ctem-engine",
    name: "Continuous Threat Exposure Management",
    tagline: "Agentic AI-powered CTEM platform that continuously discovers, prioritises, and validates security exposures across the attack surface",
    category: "risk",
    tags: ["CTEM", "Agentic AI", "Exposure Management", "Threat Intelligence", "Attack Surface"],
    stats: { phases: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Continuous-Threat-Exposure-Management",
    overview: "reports/ctem-overview.html",
    status: "public",
    icon: "radar",
    highlights: [
      "5-phase Gartner CTEM cycle: Scoping, Discovery, Prioritisation, Validation, Mobilisation",
      "Agentic AI workflow for autonomous threat exposure analysis",
      "Integration with existing scanners for continuous discovery and validation",
      "Risk-based prioritisation with business context and threat intelligence",
      "Automated remediation recommendations and ticket creation",
      "Dashboard-driven exposure tracking and trend analysis"
    ]
  },
  {
    id: "risk-ops-center",
    name: "Risk Operation Center",
    tagline: "Aggregation platform that consumes data from open-source security tools to build risk simulations using real business data for executive decision-making",
    category: "risk",
    tags: ["ROC", "Risk Analytics", "Simulation", "C-Suite", "Decision Support", "Dashboard"],
    stats: { sources: "37+" },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Risk-Operation-Center",
    overview: "reports/risk-ops-overview.html",
    status: "public",
    icon: "shield",
    highlights: [
      "Data aggregation from 37+ open-source Phalanx Cyber security tools",
      "Risk simulation engine using real business data and scanner findings",
      "Executive-ready dashboards for C-suite risk communication",
      "Outcome modelling: what-if scenarios for security investment decisions",
      "Integration with CRQ engine for financial risk quantification",
      "Automated risk posture trending and compliance gap analysis"
    ]
  },
  {
    id: "tprm-engine",
    name: "Third-Party Risk Management",
    tagline: "Agentic AI-powered TPRM platform for automated vendor risk assessments, questionnaire analysis, and continuous third-party monitoring",
    category: "risk",
    tags: ["TPRM", "Vendor Risk", "Agentic AI", "Supply Chain", "SIG", "SOC 2"],
    stats: { workflows: 5 },
    version: "1.0.0",
    language: "Python",
    github: "https://github.com/Krishcalin/Third-Party-Risk-Management",
    overview: "reports/tprm-overview.html",
    status: "public",
    icon: "shield",
    highlights: [
      "Agentic AI workflow for automated vendor risk assessment and questionnaire analysis",
      "Third-party risk scoring based on security posture, financial stability, and compliance status",
      "Continuous monitoring of vendor security with automated alert triggers",
      "Integration with SIG/SIG Lite questionnaires and SOC 2 report analysis",
      "Supply chain risk mapping and nth-party dependency tracking",
      "Remediation tracking and vendor risk register management"
    ]
  }
];

const TOOL_CATEGORIES = [
  { id: "all",     label: "All Tools",           count: TOOLS.length },
  { id: "appsec",  label: "Application Security", count: TOOLS.filter(t => t.category === "appsec").length },
  { id: "cloud",   label: "Cloud Security",       count: TOOLS.filter(t => t.category === "cloud").length },
  { id: "saas",    label: "SaaS / SSPM",          count: TOOLS.filter(t => t.category === "saas").length },
  { id: "infra",   label: "Infrastructure",        count: TOOLS.filter(t => t.category === "infra").length },
  { id: "threat",  label: "Threat Detection",      count: TOOLS.filter(t => t.category === "threat").length },
  { id: "redteam", label: "Red Teaming",           count: TOOLS.filter(t => t.category === "redteam").length },
  { id: "easm",    label: "Attack Surface",        count: TOOLS.filter(t => t.category === "easm").length },
  { id: "risk",    label: "Governance & Risk",     count: TOOLS.filter(t => t.category === "risk").length },
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
