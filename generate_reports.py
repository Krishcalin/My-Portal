#!/usr/bin/env python3
"""
generate_reports.py  --  Phalanx Cyber Portal Report Generator
================================================================
Reads JSON / HTML scanner reports and generates self-contained HTML
report pages matching the portal's dark-theme design.

Usage:
    python generate_reports.py
"""

import json
import os
import re
import html
import sys
from datetime import datetime

# ──────────────────────────────────────────────────────────────
# TOOL CONFIGURATION
# ──────────────────────────────────────────────────────────────
TOOLS_CONFIG = [
    {
        "id": "gcp-scanner",
        "name": "GCP CNAPP Security Scanner",
        "description": "Cloud-Native Application Protection Platform assessment for Google Cloud Platform covering IAM, networking, storage, compute, KMS, and logging.",
        "json_path": "c:/KRISHNENDU/PROJECTS/GCP-CNAPP-Security-Scanner/GCP-CNAPP-Security-Scanner/sample_data/gcp_report.html",
        "output": "gcp-cnapp-report.html",
        "github": "https://github.com/Krishcalin/GCP-CNAPP-Security-Scanner",
        "meta": {"Platform": "Google Cloud Platform", "Scanner": "gcp_scanner.py v1.0.0", "Mode": "Offline JSON Analysis"},
        "compliance": ["CIS GCP Foundations Benchmark", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "ocp-cnapp-scanner",
        "name": "OCI CNAPP Security Scanner",
        "description": "Comprehensive offline CNAPP assessment combining CSPM, CIEM, CWPP, KSPM, and IaC scanning for Oracle Cloud Infrastructure.",
        "json_path": "c:/KRISHNENDU/PROJECTS/OCP-CNAPP-Security-Scanner/OCP-CNAPP-Security-Scanner/sample_data/oci_report.html",
        "output": "oci-cnapp-report.html",
        "github": "https://github.com/Krishcalin/OCI-CNAPP-Security-Scanner",
        "meta": {"Platform": "Oracle Cloud Infrastructure", "Scanner": "oci_scanner.py v1.0.0", "Modules": "13 CNAPP modules"},
        "compliance": ["CIS OCI Foundations Benchmark v3.1.0", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "cisco-scanner",
        "name": "Cisco Network Security Scanner",
        "description": "Security posture assessment for Cisco IOS, IOS-XE, NX-OS, and FTD devices covering access control, routing, management plane, and firewall rules.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Cisco-Network-Security/Cisco-Network-Security/sample_configs/nss_report.html",
        "output": "cisco-nss-report.html",
        "github": "https://github.com/Krishcalin/Cisco-Network-Security",
        "meta": {"Devices": "3 (Router, Switch, Firewall)", "Scanner": "nss_scanner.py v1.0.0", "Mode": "Offline Config Analysis"},
        "compliance": ["CIS Cisco IOS Benchmark", "NIST SP 800-53", "PCI-DSS v4.0", "DISA STIG"],
    },
    {
        "id": "paloalto-scanner",
        "name": "Palo Alto PAN-OS Security Scanner",
        "description": "Security configuration assessment for Palo Alto Networks PAN-OS firewalls covering security policies, threat prevention, URL filtering, and GlobalProtect.",
        "json_path": "c:/KRISHNENDU/PROJECTS/PaloAlto-Network-Security/PaloAlto-Network-Security/sample_configs/pan_report.html",
        "output": "paloalto-pan-report.html",
        "github": "https://github.com/Krishcalin/PaloAlto-Network-Security",
        "meta": {"Platform": "PAN-OS", "Scanner": "pan_scanner.py v1.0.0", "Mode": "Offline Config Analysis"},
        "compliance": ["CIS Palo Alto Benchmark", "NIST SP 800-53", "PCI-DSS v4.0"],
    },
    {
        "id": "multicloud-scanner",
        "name": "MultiCloud Security Audit Tool",
        "description": "Unified security audit across AWS, Azure, and GCP in a single scan with cross-cloud correlation and risk scoring.",
        "json_path": "c:/KRISHNENDU/PROJECTS/MultiCloud-Security-Audit-Tool/MultiCloud-Security-Audit-Tool/multicloud_report.json",
        "output": "multicloud-report.html",
        "github": "https://github.com/Krishcalin/MultiCloud-Security-Audit-Tool",
        "meta": {"Providers": "AWS + Azure + GCP (Demo)", "Scanner": "scout.py v1.0.0", "Mode": "Demo Mode"},
        "compliance": ["CIS Benchmarks (multi-cloud)", "NIST SP 800-53", "ISO 27001"],
    },
    {
        "id": "crowdstrike-falcon",
        "name": "CrowdStrike Falcon EDR Scanner",
        "description": "Validation scanner for CrowdStrike Falcon deployment covering prevention policies, sensor health, exclusion hygiene, and API client security.",
        "json_path": "c:/KRISHNENDU/PROJECTS/CrowdStrike-Falcon-Validation-Scanner/CrowdStrike-Falcon-Validation-Scanner/sample_data/cs_report.html",
        "output": "crowdstrike-falcon-report.html",
        "github": "https://github.com/Krishcalin/CrowdStrike-Falcon-Validation-Scanner",
        "meta": {"Platform": "CrowdStrike Falcon", "Scanner": "cs_scanner.py v1.0.0", "Mode": "Offline JSON Analysis"},
        "compliance": ["CrowdStrike Best Practices", "NIST SP 800-53", "MITRE ATT&CK"],
    },
    {
        "id": "sap-s4hana-scanner",
        "name": "SAP S/4HANA RISE Security Scanner",
        "description": "Comprehensive security audit for SAP S/4HANA and BTP environments covering access controls, transport management, RFC security, and GDPR compliance.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SAP-S4HANA-RISE-Security-Scanner/SAP-S4HANA-RISE-Security-Scanner/sample_data/sap_report.html",
        "output": "sap-s4hana-report.html",
        "github": "https://github.com/Krishcalin/SAP-S4HANA-RISE-Security-Scanner",
        "meta": {"Platform": "SAP S/4HANA RISE", "Scanner": "sap_scanner.py v1.0.0", "Modules": "18 security modules"},
        "compliance": ["SAP Security Baseline", "SOX", "GDPR", "ISO 27001", "NIST SP 800-53"],
    },
    {
        "id": "successfactors-scanner",
        "name": "SAP SuccessFactors SSPM",
        "description": "SaaS Security Posture Management for SAP SuccessFactors covering authentication, RBAC, data protection, API security, and audit logging.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SAP-SuccessFactors/SAP-SuccessFactors/sample_data/sample_report.html",
        "output": "sap-successfactors-report.html",
        "github": "https://github.com/Krishcalin/SAP-SuccessFactors",
        "meta": {"Platform": "SAP SuccessFactors", "Scanner": "successfactors_offlinescanner.py v1.0.0"},
        "compliance": ["CIS SAP SuccessFactors Benchmark", "SOC 2", "GDPR", "ISO 27001"],
    },
    {
        "id": "crq-engine",
        "name": "Cyber Risk Quantification",
        "description": "FAIR-based Monte Carlo risk quantification engine with loss exceedance curves, control effectiveness analysis, and industry-calibrated threat modelling.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Cyber-Risk-Quantification/Cyber-Risk-Quantification/crq_report.json",
        "output": "crq-report.html",
        "github": "https://github.com/Krishcalin/Cyber-Risk-Quantification",
        "meta": {"Model": "FAIR (Factor Analysis of Information Risk)", "Simulations": "10,000 Monte Carlo iterations", "Scenarios": "8"},
        "compliance": ["FAIR", "NIST CSF", "ISO 31000"],
    },
    {
        "id": "cdr-scanner",
        "name": "Cloud Detection & Response",
        "description": "Multi-cloud threat detection engine analyzing AWS CloudTrail, Azure Activity, and GCP Audit logs for security incidents and suspicious behavior.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Cloud-Detection-Response/Cloud-Detection-Response/tests/samples/cdr_report.json",
        "output": "cdr-report.html",
        "github": "https://github.com/Krishcalin/Cloud-Detection-Response",
        "meta": {"Providers": "AWS + Azure + GCP", "Scanner": "cdr_scanner.py v1.0.0", "Mode": "Log Analysis"},
        "compliance": ["MITRE ATT&CK Cloud", "NIST SP 800-53", "CIS Controls"],
    },
    {
        "id": "crowdstrike-redteam",
        "name": "CrowdStrike Red Team Validation",
        "description": "MITRE ATT&CK T1562.001 audit module validating defense evasion controls across Windows, Linux, and macOS with 59 Atomic Red Team tests.",
        "json_path": "c:/KRISHNENDU/PROJECTS/CrowdStrike-Red-Teaming-Test/CrowdStrike-Red-Teaming-Test/sample_data/redteam_report.json",
        "output": "crowdstrike-redteam-report.html",
        "github": "https://github.com/Krishcalin/CrowdStrike-Red-Teaming-Test",
        "meta": {"Technique": "T1562.001 -- Impair Defenses", "Tests": "59 Atomic Red Team", "Scanner": "t1562_001_audit.py v1.0.0"},
        "compliance": ["MITRE ATT&CK", "Atomic Red Team", "NIST SP 800-53 SI-4"],
    },
    {
        "id": "api-security-scanner",
        "name": "API Security Scanner",
        "description": "Static analysis scanner for OpenAPI/Swagger, GraphQL, and gRPC API definitions detecting authentication gaps, injection risks, and misconfigurations.",
        "json_path": "c:/KRISHNENDU/PROJECTS/API-Security/API-Security/tests/samples/api_report.json",
        "output": "api-security-report.html",
        "github": "https://github.com/Krishcalin/API-Security",
        "meta": {"Protocols": "REST + GraphQL + gRPC", "Scanner": "api_security_scanner.py v1.0.0"},
        "compliance": ["OWASP API Top 10 2023", "CWE", "PCI-DSS v4.0"],
    },
    {
        "id": "sap-abap-scanner",
        "name": "SAP ABAP Vulnerability Analyzer",
        "description": "Dual-mode scanner with 81 SAST rules for ABAP/CDS source code plus 30 live BTP API checks via XSUAA OAuth 2.0.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SAP-Code-Vulnerability-Analyzer/SAP-Code-Vulnerability-Analyzer/tests/samples/abap_report.json",
        "output": "sap-abap-report.html",
        "github": "https://github.com/Krishcalin/SAP-Code-Vulnerability-Analyzer",
        "meta": {"Mode": "SAST (Static Analysis)", "Scanner": "abap_scanner.py v1.0.0"},
        "compliance": ["SAP Security Baseline", "CWE", "OWASP Top 10"],
    },
    {
        "id": "ai-spm-scanner",
        "name": "AI Security Posture Management",
        "description": "Static analysis scanner for AI/ML pipelines detecting model supply chain risks, prompt injection vectors, training data poisoning, and infrastructure misconfigurations.",
        "json_path": "c:/KRISHNENDU/PROJECTS/AI-Security-Posture-Management/AI-Secure-Posture-Management/tests/samples/ai_spm_report.json",
        "output": "ai-spm-report.html",
        "github": "https://github.com/Krishcalin/AI-Secure-Posture-Management",
        "meta": {"Scanner": "ai_spm_scanner.py v1.0.0", "Mode": "Static Analysis"},
        "compliance": ["OWASP LLM Top 10", "NIST AI RMF", "EU AI Act", "CWE"],
    },
    {
        "id": "aws-scanner",
        "name": "AWS Security Scanner",
        "description": "Dual-mode AWS security scanner with IaC analysis (Terraform + CloudFormation) and live API auditing across 25+ services.",
        "json_path": "c:/KRISHNENDU/PROJECTS/AWS-Security-Scanner/AWS-Security-Scanner/tests/samples/aws_report.json",
        "output": "aws-security-report.html",
        "github": "https://github.com/Krishcalin/AWS-Security-Scanner",
        "meta": {"Mode": "IaC Offline Scan (Terraform)", "Scanner": "aws_offline_scanner.py v1.1.0"},
        "compliance": ["CIS AWS Foundations Benchmark v3.0", "AWS Well-Architected", "NIST SP 800-53"],
    },
    {
        "id": "app-security-scanner",
        "name": "Static Application Security Testing",
        "description": "Multi-language SAST covering Java, PHP, Python, MERN, and OWASP LLM Top 10 with 200+ rules and 80+ dependency CVEs.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Static-Application-Security-Testing/Static-Application-Security-Testing/tests/samples/java_report.json",
        "output": "sast-report.html",
        "github": "https://github.com/Krishcalin/Static-Application-Security-Testing",
        "meta": {"Scanner": "java_scanner.py v4.0.0", "Mode": "Static Analysis (Java)"},
        "compliance": ["OWASP Top 10 2021", "CWE", "SANS Top 25"],
    },
    {
        "id": "mast-scanner",
        "name": "Mobile Application Security Testing",
        "description": "Static analysis scanner for Android APK and iOS IPA files with 130+ SAST rules across 24 check modules, MASVS v2 mapping, and 39 dependency CVEs.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Mobile-Application-Security-Testing/Mobile-Application-Security-Testing/mast_report.json",
        "output": "mast-report.html",
        "github": "https://github.com/Krishcalin/Mobile-Application-Security-Testing",
        "meta": {"Platform": "Android APK", "Scanner": "mast_scanner.py v1.0.0"},
        "compliance": ["OWASP Mobile Top 10 2024", "MASVS v2", "CWE"],
    },
    {
        "id": "windows-red-teaming",
        "name": "Windows Red Teaming",
        "description": "MITRE ATT&CK-aligned red team scanner with 29 Python modules and 202 Atomic Red Team YAML tests across 13 tactics.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Windows-Red-Teaming/Windows-Red-Teaming/reports/test_redteam.json",
        "output": "windows-redteam-report.html",
        "github": "https://github.com/Krishcalin/Windows-Red-Teaming",
        "meta": {"Target": "localhost", "Scanner": "main.py v1.0.0", "Profile": "quick"},
        "compliance": ["MITRE ATT&CK", "Atomic Red Team", "NIST SP 800-53"],
    },
    {
        "id": "m365-scanner",
        "name": "Microsoft 365 & Entra ID SSPM",
        "description": "SaaS Security Posture Management for M365 and Entra ID via Microsoft Graph API with 50+ checks across 12 domains.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SSPM-O365/SSPM-O365/reports/o365_sspm_report.json",
        "output": "m365-sspm-report.html",
        "github": "https://github.com/Krishcalin/SSPM-O365",
        "meta": {"Platform": "Microsoft 365 + Entra ID", "Scanner": "o365_scanner.py v2.1.0"},
        "compliance": ["CIS M365 Foundations Benchmark", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "servicenow-scanner",
        "name": "ServiceNow SSPM Scanner",
        "description": "SaaS Security Posture Management for ServiceNow instances covering XSS prevention, session management, authentication, and API security.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SSPM-ServiceNow/SSPM-ServiceNow/reports/servicenow_sspm_report.json",
        "output": "servicenow-sspm-report.html",
        "github": "https://github.com/Krishcalin/SSPM-ServiceNow",
        "meta": {"Platform": "ServiceNow", "Scanner": "servicenow_scanner.py v1.0.0"},
        "compliance": ["CIS ServiceNow Benchmark", "NIST SP 800-53", "SOC 2", "ISO 27001"],
    },
    {
        "id": "snowflake-scanner",
        "name": "Snowflake SSPM Scanner",
        "description": "Read-only SSPM scanner for Snowflake Data Platform with 39 checks across 4 CIS domains and severity-weighted scoring.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SSPM-Snowflake-Data-Platform/SSPM-Snowflake-Data-Platform/reports/snowflake_sspm_report.json",
        "output": "snowflake-sspm-report.html",
        "github": "https://github.com/Krishcalin/SSPM-Snowflake-Data-Platform",
        "meta": {"Platform": "Snowflake Data Platform", "Scanner": "snowflake_scanner.py v1.0.0"},
        "compliance": ["CIS Snowflake Foundations Benchmark v1.0.0", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "tableau-scanner",
        "name": "Tableau Cloud SSPM",
        "description": "SaaS Security Posture Management for Tableau Cloud covering authentication, authorization, content governance, and data security.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SSPM-Tableau/SSPM-Tableau/reports/SSPM-20260331-081911.json",
        "output": "tableau-sspm-report.html",
        "github": "https://github.com/Krishcalin/SSPM-Tableau",
        "meta": {"Platform": "Tableau Cloud", "Scanner": "tableau_sspm v1.0.0"},
        "compliance": ["CIS Benchmarks", "NIST SP 800-53", "SOC 2", "ISO 27001"],
    },
    {
        "id": "fortinet-scanner",
        "name": "Fortinet FortiOS Security Scanner",
        "description": "Comprehensive security audit for Fortinet FortiGate firewalls covering 18 security domains including firewall policies, VPN, security profiles, and MITRE ATT&CK resilience.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Fortinet-Network-Security/Fortinet-Network-Security/test_data/fortinet_report.json",
        "output": "fortinet-report.html",
        "github": "https://github.com/Krishcalin/Fortinet-Network-Security",
        "meta": {"Platform": "FortiOS 7.0.10", "Scanner": "fortinet_scanner.py v4.0.0", "Mode": "Mock API Data"},
        "compliance": ["CIS FortiOS Benchmark", "NIST SP 800-53", "PCI-DSS v4.0", "MITRE ATT&CK"],
    },
    {
        "id": "ot-security-scanner",
        "name": "OT/ICS Security Scanner",
        "description": "Unified passive network scanner for OT/ICS environments detecting 15 industrial protocols, asset discovery, and vulnerability identification.",
        "json_path": "c:/KRISHNENDU/PROJECTS/OT-Security/OT-Security/test_data/ot_report.json",
        "output": "ot-security-report.html",
        "github": "https://github.com/Krishcalin/OT-Security",
        "meta": {"Mode": "Passive PCAP Analysis", "Scanner": "ot_scanner.py v2.0.0", "Protocols": "15 OT/ICS protocols"},
        "compliance": ["IEC 62443", "NERC CIP", "NIST SP 800-82", "ISA/IEC 62351"],
    },
    {
        "id": "kspm-scanner",
        "name": "Kubernetes KSPM Scanner",
        "description": "Agentless Kubernetes Security Posture Management with 120+ checks across 18 categories covering RBAC, workload hardening, network security, and CIS benchmarks.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Kubernetes-KSPM/Kubernetes-Security-Posture-Management/test_data/kspm_report.json",
        "output": "kspm-report.html",
        "github": "https://github.com/Krishcalin/Kubernetes-Security-Posture-Management",
        "meta": {"Platform": "Kubernetes (Mock Cluster)", "Scanner": "kspm_scanner.py v2.0.0", "Check Groups": "18"},
        "compliance": ["CIS Kubernetes Benchmark", "NSA/CISA Hardening Guide", "MITRE ATT&CK Containers", "NIST SP 800-190", "PCI-DSS v4.0"],
    },
    {
        "id": "owasp-llm-scanner",
        "name": "OWASP LLM Top 10 Scanner",
        "description": "Static analysis scanner covering all 10 OWASP LLM Top 10 categories with 60 rules for Python, JavaScript/TypeScript, .env, and YAML files.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Static-Application-Security-Testing/Static-Application-Security-Testing/tests/samples/llm_report.json",
        "output": "owasp-llm-report.html",
        "github": "https://github.com/Krishcalin/Static-Application-Security-Testing",
        "meta": {"Scanner": "owasp_llm_scanner.py v4.0.0", "Mode": "Static Analysis"},
        "compliance": ["OWASP LLM Top 10", "CWE", "NIST AI RMF"],
    },
    {
        "id": "azure-scanner",
        "name": "Azure Security Scanner",
        "description": "Comprehensive security audit for Microsoft Azure covering IAM/RBAC, NSGs, Storage, Key Vault, SQL Database, App Service, AKS, and Defender for Cloud.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Azure-Security-Scanner/Azure-Security-Scanner/test_data/azure_report.json",
        "output": "azure-security-report.html",
        "github": "https://github.com/Krishcalin/Azure-Security-Scanner",
        "meta": {"Platform": "Microsoft Azure", "Scanner": "azure_security_audit v1.0.0", "Mode": "Synthetic Demo"},
        "compliance": ["CIS Azure Foundations Benchmark", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "sap-ariba-scanner",
        "name": "SAP Ariba SSPM Scanner",
        "description": "Offline SSPM security posture assessment for SAP Ariba procurement environments with 47+ checks across 10 audit modules.",
        "json_path": "c:/KRISHNENDU/PROJECTS/My-Portal/My-Portal/synthetic_data/ariba_report.json",
        "output": "sap-ariba-report.html",
        "github": "https://github.com/Krishcalin/SAP-Ariba-Security-Scanner",
        "meta": {"Platform": "SAP Ariba", "Scanner": "ariba_scanner.py v1.0.0", "Mode": "Offline Analysis"},
        "compliance": ["SOX", "GDPR", "ISO 27001", "SOC 2", "CIS Controls v8", "NIST SP 800-53"],
    },
    {
        "id": "zscaler-scanner",
        "name": "Zscaler Security Scanner",
        "description": "Security posture assessment for Zscaler ZIA and ZPA environments covering URL filtering, SSL inspection, DLP, firewall rules, and access policies.",
        "json_path": "c:/KRISHNENDU/PROJECTS/My-Portal/My-Portal/synthetic_data/zscaler_report.json",
        "output": "zscaler-report.html",
        "github": "https://github.com/Krishcalin/Zscaler-Security-Scanner",
        "meta": {"Platform": "Zscaler ZIA + ZPA", "Scanner": "zscaler_scanner.py v1.0.0", "Mode": "Synthetic Demo"},
        "compliance": ["CIS Benchmarks", "NIST SP 800-53", "PCI-DSS v4.0", "ISO 27001"],
    },
    {
        "id": "oracle-saas-scanner",
        "name": "Oracle SaaS Cloud SSPM",
        "description": "SaaS Security Posture Management for Oracle Fusion Cloud (ERP, HCM, SCM, CX), EPM Cloud, and IDCS with 55 live API checks.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SSPM-Oracle-SaaS-Cloud/SSPM-Oracle-SaaS-Cloud/reports/oracle_saas_sspm_report.json",
        "output": "oracle-saas-report.html",
        "github": "https://github.com/Krishcalin/SSPM-Oracle-SaaS-Cloud",
        "meta": {"Platform": "Oracle Fusion Cloud + IDCS", "Scanner": "oracle_saas_scanner.py v1.0.0"},
        "compliance": ["CIS Oracle Cloud SaaS v1.0.0", "NIST SP 800-53", "ISO 27001", "SOC 2"],
    },
    {
        "id": "dast-scanner",
        "name": "DAST Scanner",
        "description": "Active dynamic application security testing with 58 checks, BFS web crawler, WAF detection, and proxy support for Burp/ZAP.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Dynamic-Application-Security-Testing/Dynamic-Application-Security-Testing/tests/dast_report.json",
        "output": "dast-report.html",
        "github": "https://github.com/Krishcalin/Dynamic-Application-Security-Testing",
        "meta": {"Target": "demo.acmecorp.com (Synthetic)", "Scanner": "dast_scanner.py v1.0.0"},
        "compliance": ["OWASP Top 10 2021", "CWE", "PCI-DSS v4.0"],
    },
    {
        "id": "easm-scanner",
        "name": "Attack Surface Management",
        "description": "External attack surface discovery and assessment with subdomain enumeration, port scanning, TLS analysis, and vulnerability detection.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Attack-Surface-Management/Attack-Surface-Management/test_data/easm_report.json",
        "output": "easm-report.html",
        "github": "https://github.com/Krishcalin/Attack-Surface-Management",
        "meta": {"Target": "acmecorp.com (Synthetic)", "Scanner": "easm_scanner.py v1.0.0", "Assets": "30"},
        "compliance": ["OWASP Top 10", "CIS Controls v8", "NIST SP 800-53"],
    },
    {
        "id": "autonomous-pentest",
        "name": "Autonomous Penetration Testing Copilot",
        "description": "AI-powered pentest agent with 27 autonomous tools, 4 recon pipelines, 14-protocol credential spray engine, and LLM-driven kill chain execution.",
        "json_path": "c:/KRISHNENDU/PROJECTS/Autonomous-Pen-Testing/Autonomous-Pen-Testing/test_data/pentest_report.json",
        "output": "autonomous-pentest-report.html",
        "github": "https://github.com/Krishcalin/Autonomous-Pen-Testing",
        "meta": {"Target": "10.10.10.0/24 (Synthetic)", "Scanner": "pentest_copilot.py v2.3.0", "Kill Chain Steps": "5"},
        "compliance": ["PTES", "OWASP Top 10", "MITRE ATT&CK", "NIST SP 800-53"],
    },
    {
        "id": "vuln-mgmt-scanner",
        "name": "Vulnerability Management Scanner",
        "description": "Enterprise vulnerability management with CVE correlation, EPSS scoring, CISA KEV integration, and multi-format reporting.",
        "json_path": "c:/KRISHNENDU/PROJECTS/SkyHigh-Scanner/Vulnerability-Management/test_data/vuln_report.json",
        "output": "vuln-mgmt-report.html",
        "github": "https://github.com/Krishcalin/Vulnerability-Management",
        "meta": {"Scanner": "vulnerability_management v1.0.0", "Mode": "Synthetic Demo", "KEV Flagged": "7"},
        "compliance": ["NIST SP 800-53", "PCI-DSS v4.0", "ISO 27001", "CIS Controls v8"],
    },
]

# Output directory (same as portal root)
OUTPUT_DIR = "c:/KRISHNENDU/PROJECTS/My-Portal/My-Portal"


# ──────────────────────────────────────────────────────────────
# HTML PARSER  --  Extract findings from scanner-generated HTML
# ──────────────────────────────────────────────────────────────
def extract_findings_from_html(html_content):
    """
    Parse scanner-generated HTML reports that use the <div class="finding-card">
    pattern.  Returns a list of normalised finding dicts.
    """
    findings = []

    # Pattern to match each finding-card block
    card_pattern = re.compile(
        r'<div\s+class="finding-card"\s+data-severity="([^"]*)"\s+data-category="([^"]*)">'
        r'(.*?)</div>\s*</div>\s*</div>',
        re.DOTALL,
    )

    # Simpler approach: find all finding-card opening tags with attributes,
    # then extract content between them
    severity_pattern = re.compile(
        r'data-severity="([^"]*)"', re.DOTALL
    )
    category_pattern = re.compile(
        r'data-category="([^"]*)"', re.DOTALL
    )
    title_pattern = re.compile(
        r'<span\s+class="finding-title">(.*?)</span>', re.DOTALL
    )
    id_pattern = re.compile(
        r'<span\s+class="finding-id">(.*?)</span>', re.DOTALL
    )
    desc_pattern = re.compile(
        r'<div\s+class="finding-section-title">Description</div>\s*<p>(.*?)</p>',
        re.DOTALL,
    )
    remediation_pattern = re.compile(
        r'<div\s+class="finding-section-title">Remediation</div>\s*<div\s+class="remediation-text">(.*?)</div>',
        re.DOTALL,
    )
    affected_pattern = re.compile(
        r'<div\s+class="finding-section-title">Affected Items[^<]*</div>\s*<ul\s+class="affected-list">(.*?)</ul>',
        re.DOTALL,
    )
    references_pattern = re.compile(
        r'<div\s+class="finding-section-title">References</div>\s*<ul\s+class="ref-list">(.*?)</ul>',
        re.DOTALL,
    )

    # Split on finding-card boundaries
    cards = re.split(r'<div\s+class="finding-card"\s+', html_content)
    for card_chunk in cards[1:]:  # skip the part before the first finding-card
        sev_m = severity_pattern.search(card_chunk)
        cat_m = category_pattern.search(card_chunk)
        title_m = title_pattern.search(card_chunk)
        id_m = id_pattern.search(card_chunk)
        desc_m = desc_pattern.search(card_chunk)
        rem_m = remediation_pattern.search(card_chunk)
        aff_m = affected_pattern.search(card_chunk)
        ref_m = references_pattern.search(card_chunk)

        severity = html.unescape(sev_m.group(1).strip()) if sev_m else "INFO"
        category = html.unescape(cat_m.group(1).strip()) if cat_m else "General"
        name = html.unescape(title_m.group(1).strip()) if title_m else "Unknown"
        rule_id = html.unescape(id_m.group(1).strip()) if id_m else ""
        description = html.unescape(desc_m.group(1).strip()) if desc_m else ""
        recommendation = html.unescape(rem_m.group(1).strip()) if rem_m else ""

        # Build context from affected items
        context = ""
        if aff_m:
            items_html = aff_m.group(1)
            items = re.findall(r'<li>(.*?)</li>', items_html, re.DOTALL)
            context = "; ".join(html.unescape(i.strip()) for i in items)

        # CWE extraction from references or description
        cwe = ""
        cwe_m = re.search(r'(CWE-\d+)', card_chunk)
        if cwe_m:
            cwe = cwe_m.group(1)

        findings.append({
            "rule_id": rule_id,
            "name": name,
            "category": category,
            "severity": severity.upper(),
            "description": description,
            "recommendation": recommendation,
            "source": context if context else "",
            "context": context if context else "",
            "cwe": cwe,
        })

    return findings


# ──────────────────────────────────────────────────────────────
# JSON PARSER  --  Handle multiple JSON report formats
# ──────────────────────────────────────────────────────────────
def normalise_finding(raw, tool_id):
    """Map various scanner JSON field names to a standard finding dict."""
    f = {
        "rule_id": "",
        "name": "",
        "category": "",
        "severity": "INFO",
        "description": "",
        "recommendation": "",
        "source": "",
        "context": "",
        "cwe": "",
    }

    # rule_id
    f["rule_id"] = raw.get("rule_id") or raw.get("check_id") or raw.get("id") or raw.get("test_number", "")
    if isinstance(f["rule_id"], int):
        f["rule_id"] = str(f["rule_id"])

    # name
    f["name"] = raw.get("name") or raw.get("title") or raw.get("rule_name") or ""

    # category
    f["category"] = (
        raw.get("category")
        or raw.get("tactic")
        or raw.get("service")
        or raw.get("platform")
        or "General"
    )

    # For multicloud scanner: combine provider + service
    if tool_id == "multicloud-scanner" and raw.get("provider"):
        provider = raw.get("provider", "").upper()
        service = raw.get("service", "general")
        f["category"] = f"{provider}: {service.upper()}"

    # severity
    sev = (raw.get("severity") or "INFO").upper()
    if sev not in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"):
        sev = "INFO"
    f["severity"] = sev

    # description
    f["description"] = raw.get("description") or ""

    # recommendation
    f["recommendation"] = (
        raw.get("recommendation")
        or raw.get("remediation")
        or raw.get("fix")
        or ""
    )

    # source / context
    f["source"] = (
        raw.get("source")
        or raw.get("file_path")
        or raw.get("file")
        or raw.get("source_file")
        or raw.get("resource_path")
        or ""
    )
    f["context"] = (
        raw.get("context")
        or raw.get("code")
        or raw.get("line_content")
        or ""
    )

    # If there are affected_items, join them into context
    if raw.get("affected_items"):
        items = raw["affected_items"]
        if isinstance(items, list):
            parts = []
            for item in items:
                if isinstance(item, str):
                    parts.append(item)
                elif isinstance(item, dict):
                    parts.append(item.get("id", "") or str(item))
            if parts:
                f["context"] = "; ".join(parts)

    # CWE
    f["cwe"] = raw.get("cwe") or ""
    if not f["cwe"]:
        # search in description for CWE pattern
        cwe_m = re.search(r'(CWE-\d+)', f["description"])
        if cwe_m:
            f["cwe"] = cwe_m.group(1)

    return f


def normalise_crq_scenario(scenario):
    """Convert a CRQ risk scenario to a finding-like dict."""
    ale_mean = scenario.get("ale", {}).get("mean", 0)
    ale_p50 = scenario.get("ale", {}).get("percentiles", {}).get("50", ale_mean)
    ale_p90 = scenario.get("ale", {}).get("percentiles", {}).get("90", ale_mean)
    risk_score = scenario.get("risk_score", 0)

    lef_mean = scenario.get("lef", {}).get("mean", 0)
    lm = scenario.get("loss_magnitude", {})
    lm_mean = lm.get("mean", 0)

    context_parts = [
        f"Risk Score: {risk_score}/100",
        f"ALE P50: ${ale_p50:,.0f}",
        f"ALE P90: ${ale_p90:,.0f}",
        f"LEF: {lef_mean:.1f} events/yr",
        f"Avg Loss: ${lm_mean:,.0f}/event",
    ]

    # Build description from loss breakdown
    primary = lm.get("primary_breakdown", {})
    secondary = lm.get("secondary_breakdown", {})
    desc_parts = [scenario.get("name", "Risk Scenario")]
    if primary:
        breakdown = ", ".join(f"{k}: ${v:,.0f}" for k, v in primary.items())
        desc_parts.append(f"Primary loss: {breakdown}.")
    if secondary:
        breakdown = ", ".join(f"{k}: ${v:,.0f}" for k, v in secondary.items())
        desc_parts.append(f"Secondary loss: {breakdown}.")

    return {
        "rule_id": scenario.get("id", ""),
        "name": scenario.get("name", ""),
        "category": "Risk Scenario",
        "severity": (scenario.get("severity") or "INFO").upper(),
        "description": " ".join(desc_parts),
        "recommendation": f"Reduce loss exposure. Current ALE (P90): ${ale_p90:,.0f}.",
        "source": f"{scenario.get('iterations', 10000)} Monte Carlo iterations",
        "context": "; ".join(context_parts),
        "cwe": "",
    }


def extract_findings_from_json(filepath, tool_id):
    """Load a JSON report file and return normalised findings + summary."""
    with open(filepath, "r", encoding="utf-8") as fh:
        data = json.load(fh)

    findings_raw = []
    summary = {}

    # CRQ engine: scenarios instead of findings
    if tool_id == "crq-engine":
        scenarios = data.get("scenarios", [])
        findings = [normalise_crq_scenario(s) for s in scenarios]
        summary = {
            "CRITICAL": data.get("summary", {}).get("critical_count", 0),
            "HIGH": data.get("summary", {}).get("high_count", 0),
            "MEDIUM": data.get("summary", {}).get("medium_count", 0),
            "LOW": data.get("summary", {}).get("low_count", 0),
            "INFO": 0,
        }
        return findings, summary

    # OT Security: vulnerabilities nested inside devices[]
    if isinstance(data, dict) and "devices" in data and "scan_metadata" in data:
        for dev in data.get("devices", []):
            ip = dev.get("ip", "unknown")
            for v in dev.get("vulnerabilities", []):
                v.setdefault("category", dev.get("protocol", "OT/ICS"))
                v.setdefault("source", ip)
                v.setdefault("name", v.get("description", "")[:80])
                v.setdefault("rule_id", v.get("cve_id", f"OT-{ip}"))
                findings_raw.append(v)
        findings = [normalise_finding(f, tool_id) for f in findings_raw]
        summary = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
        for f in findings:
            sev = f["severity"]
            if sev in summary:
                summary[sev] += 1
        return findings, summary

    # Windows Red Teaming: module_results -> findings nested inside
    if isinstance(data, dict) and "module_results" in data:
        for m in data["module_results"]:
            mod_name = m.get("module", m.get("technique_id", "General"))
            for f in m.get("findings", []):
                f.setdefault("category", mod_name)
                findings_raw.append(f)
        summary = data.get("findings_by_severity", {})
        findings = [normalise_finding(f, tool_id) for f in findings_raw]
        if not summary or not any(summary.get(k) for k in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO")):
            summary = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
            for f in findings:
                sev = f["severity"]
                if sev in summary:
                    summary[sev] += 1
        for k in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"):
            summary.setdefault(k, 0)
        return findings, summary

    # Top-level list (e.g. multicloud_report.json is a bare JSON array)
    if isinstance(data, list):
        findings_raw = data
    elif isinstance(data, dict):
        findings_raw = data.get("findings") or data.get("results") or data.get("vulnerabilities") or []
        summary = data.get("summary", {})

    findings = [normalise_finding(f, tool_id) for f in findings_raw]

    # Build summary from findings if not provided
    if not summary or not any(summary.get(k) for k in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO")):
        summary = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
        for f in findings:
            sev = f["severity"]
            if sev in summary:
                summary[sev] += 1

    # Ensure all keys present
    for k in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"):
        summary.setdefault(k, 0)

    return findings, summary


# ──────────────────────────────────────────────────────────────
# POSTURE SCORE CALCULATION
# ──────────────────────────────────────────────────────────────
def calc_posture_score(summary):
    """Score = 100 - (CRITICAL*15 + HIGH*5 + MEDIUM*2 + LOW*0.5), clamped 0-100."""
    penalty = (
        summary.get("CRITICAL", 0) * 15
        + summary.get("HIGH", 0) * 5
        + summary.get("MEDIUM", 0) * 2
        + summary.get("LOW", 0) * 0.5
    )
    score = max(0, min(100, 100 - penalty))
    score = round(score, 1)

    if score >= 85:
        grade, grade_label = "A", "Excellent"
    elif score >= 70:
        grade, grade_label = "B", "Good"
    elif score >= 55:
        grade, grade_label = "C", "Fair"
    elif score >= 40:
        grade, grade_label = "D", "Poor"
    else:
        grade, grade_label = "F", "Critical"

    return score, grade, grade_label


def score_color(score):
    """Return CSS color variable for the score."""
    if score >= 85:
        return "var(--sev-low)"
    elif score >= 70:
        return "#22C55E"
    elif score >= 55:
        return "var(--sev-medium)"
    elif score >= 40:
        return "var(--sev-high)"
    else:
        return "var(--sev-critical)"


def grade_bg(grade):
    """Return grade badge background color."""
    mapping = {
        "A": "rgba(34,197,94,0.15)",
        "B": "rgba(34,197,94,0.15)",
        "C": "rgba(59,130,246,0.15)",
        "D": "rgba(245,158,11,0.15)",
        "F": "rgba(239,68,68,0.15)",
    }
    return mapping.get(grade, "rgba(239,68,68,0.15)")


def grade_fg(grade):
    mapping = {
        "A": "var(--sev-low)",
        "B": "var(--sev-low)",
        "C": "var(--sev-medium)",
        "D": "var(--sev-high)",
        "F": "var(--sev-critical)",
    }
    return mapping.get(grade, "var(--sev-critical)")


# ──────────────────────────────────────────────────────────────
# HTML GENERATION
# ──────────────────────────────────────────────────────────────
def esc(text):
    """HTML-escape a string, handling None."""
    if text is None:
        return ""
    return html.escape(str(text))


def build_findings_json(findings):
    """Serialise findings list to a safe JS literal."""
    safe = []
    for f in findings:
        safe.append({
            "rule_id": f.get("rule_id", ""),
            "name": f.get("name", ""),
            "category": f.get("category", ""),
            "severity": f.get("severity", "INFO"),
            "description": f.get("description", ""),
            "recommendation": f.get("recommendation", ""),
            "source": f.get("source", ""),
            "context": f.get("context", ""),
            "cwe": f.get("cwe", ""),
        })
    return json.dumps(safe, ensure_ascii=False)


def build_meta_cards(tool):
    """Generate HTML for meta cards."""
    cards = []
    meta = tool.get("meta", {})
    for label, value in meta.items():
        cards.append(f'''      <div class="meta-card">
        <div class="meta-card__label">{esc(label)}</div>
        <div class="meta-card__value">{esc(value)}</div>
      </div>''')
    # Always add scan date
    cards.append(f'''      <div class="meta-card">
        <div class="meta-card__label">Scan Date</div>
        <div class="meta-card__value">{datetime.now().strftime("%Y-%m-%d")}</div>
      </div>''')
    return "\n".join(cards)


def build_compliance_section(compliance_list):
    """Generate HTML for the compliance section."""
    if not compliance_list:
        return ""
    cards = []
    for fw in compliance_list:
        cards.append(f'''      <div class="compliance-card">
        <div class="compliance-card__name">{esc(fw)}</div>
      </div>''')
    return f'''
<!-- ======== COMPLIANCE ======== -->
<section class="compliance">
  <div class="container">
    <h2 class="section-title">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      Compliance Mapping
    </h2>
    <div class="compliance-grid">
{chr(10).join(cards)}
    </div>
  </div>
</section>
'''


def generate_report_html(tool, findings, summary):
    """Generate the full self-contained HTML report page."""
    total = sum(summary.get(k, 0) for k in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"))
    if total == 0:
        total = len(findings)

    score, grade, grade_label = calc_posture_score(summary)
    s_color = score_color(score)
    g_bg = grade_bg(grade)
    g_fg = grade_fg(grade)

    # Ring gauge stroke math: circumference = 2 * pi * 54 = 339.292
    circumference = 339.292
    offset = circumference - (circumference * score / 100)

    # Build posture description
    crit = summary.get("CRITICAL", 0)
    high = summary.get("HIGH", 0)
    med = summary.get("MEDIUM", 0)
    low = summary.get("LOW", 0)
    posture_desc_parts = []
    if crit:
        posture_desc_parts.append(f"{crit} critical finding{'s' if crit != 1 else ''} require immediate attention.")
    if high:
        posture_desc_parts.append(f"{high} high-severity issue{'s' if high != 1 else ''} compound the risk.")
    if med:
        posture_desc_parts.append(f"{med} medium-severity finding{'s' if med != 1 else ''} should be addressed in the next sprint.")
    if low:
        posture_desc_parts.append(f"{low} low-severity item{'s' if low != 1 else ''} are informational or best-practice recommendations.")
    posture_desc = " ".join(posture_desc_parts) if posture_desc_parts else "No findings detected."

    findings_json = build_findings_json(findings)
    meta_cards_html = build_meta_cards(tool)
    compliance_html = build_compliance_section(tool.get("compliance"))

    page_title = f'{esc(tool["name"])} &mdash; Sample Report | Phalanx Cyber'
    # Split name for gradient highlight (use last word)
    name_parts = tool["name"].rsplit(" ", 1)
    if len(name_parts) == 2:
        hero_h1 = f'{esc(name_parts[0])} <span>{esc(name_parts[1])}</span>'
    else:
        hero_h1 = f'<span>{esc(tool["name"])}</span>'

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{page_title}</title>
<meta name="description" content="{esc(tool['description'])}">
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
.report-hero__badge{{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:20px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);font-size:0.8rem;font-weight:600;color:var(--accent-1);margin-bottom:20px}}
.report-hero__badge::before{{content:'';width:8px;height:8px;border-radius:50%;background:var(--accent-1);animation:pulse 2s infinite}}
@keyframes pulse{{0%,100%{{opacity:1}}50%{{opacity:0.4}}}}
.report-hero h1{{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.2;margin-bottom:12px}}
.report-hero h1 span{{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}}
.report-hero__sub{{color:var(--text-secondary);font-size:1.05rem;max-width:680px;margin-bottom:32px}}

/* ---- META GRID ---- */
.meta-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:0}}
.meta-card{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;backdrop-filter:blur(8px)}}
.meta-card__label{{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:4px}}
.meta-card__value{{font-size:0.95rem;font-weight:600;color:var(--text);word-break:break-all}}

/* ---- SEVERITY DASHBOARD ---- */
.dashboard{{padding:48px 0}}
.section-title{{font-size:1.4rem;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:10px}}
.section-title svg{{color:var(--accent-1)}}

.sev-grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:40px}}
@media(max-width:768px){{.sev-grid{{grid-template-columns:repeat(3,1fr)}}}}
@media(max-width:480px){{.sev-grid{{grid-template-columns:repeat(2,1fr)}}}}
.sev-card{{position:relative;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:24px 20px;text-align:center;overflow:hidden;cursor:pointer;transition:all 0.25s}}
.sev-card:hover{{transform:translateY(-2px);border-color:rgba(255,255,255,0.15)}}
.sev-card::before{{content:'';position:absolute;top:0;left:0;right:0;height:3px}}
.sev-card[data-sev="CRITICAL"]::before{{background:var(--sev-critical)}}
.sev-card[data-sev="HIGH"]::before{{background:var(--sev-high)}}
.sev-card[data-sev="MEDIUM"]::before{{background:var(--sev-medium)}}
.sev-card[data-sev="LOW"]::before{{background:var(--sev-low)}}
.sev-card[data-sev="INFO"]::before{{background:var(--sev-info)}}
.sev-card__count{{font-size:2.2rem;font-weight:800;line-height:1}}
.sev-card[data-sev="CRITICAL"] .sev-card__count{{color:var(--sev-critical)}}
.sev-card[data-sev="HIGH"] .sev-card__count{{color:var(--sev-high)}}
.sev-card[data-sev="MEDIUM"] .sev-card__count{{color:var(--sev-medium)}}
.sev-card[data-sev="LOW"] .sev-card__count{{color:var(--sev-low)}}
.sev-card[data-sev="INFO"] .sev-card__count{{color:var(--sev-info)}}
.sev-card__label{{font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-secondary);margin-top:6px}}
.sev-card.active{{border-color:rgba(0,212,255,0.4);background:rgba(0,212,255,0.06)}}

/* ---- POSTURE SCORE ---- */
.posture{{display:flex;align-items:center;gap:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:32px;margin-bottom:40px}}
@media(max-width:640px){{.posture{{flex-direction:column;text-align:center}}}}
.posture__ring{{position:relative;width:120px;height:120px;flex-shrink:0}}
.posture__ring svg{{transform:rotate(-90deg)}}
.posture__ring circle{{fill:none;stroke-width:8}}
.posture__ring .bg{{stroke:rgba(255,255,255,0.06)}}
.posture__ring .fg{{stroke:{s_color};stroke-linecap:round;stroke-dasharray:{circumference};stroke-dashoffset:{offset:.2f};transition:stroke-dashoffset 1.5s ease}}
.posture__score{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}}
.posture__score-num{{font-size:2rem;font-weight:800;color:{s_color}}}
.posture__score-max{{font-size:0.75rem;color:var(--text-muted)}}
.posture__text h3{{font-size:1.1rem;font-weight:700;margin-bottom:4px}}
.posture__text .grade{{display:inline-block;padding:2px 10px;border-radius:4px;font-weight:700;font-size:0.85rem;background:{g_bg};color:{g_fg};margin-left:8px}}
.posture__text p{{color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-top:8px}}

/* ---- CATEGORY BAR CHART ---- */
.cat-chart{{margin-bottom:40px}}
.cat-bar{{display:flex;align-items:center;gap:12px;margin-bottom:10px}}
.cat-bar__label{{width:180px;text-align:right;font-size:0.82rem;color:var(--text-secondary);flex-shrink:0}}
@media(max-width:640px){{.cat-bar__label{{width:120px;font-size:0.75rem}}}}
.cat-bar__track{{flex:1;height:28px;background:rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;position:relative}}
.cat-bar__fill{{height:100%;border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:0.75rem;font-weight:700;color:#fff;transition:width 0.8s ease}}
.cat-bar__count{{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:0.75rem;color:var(--text-muted)}}

/* ---- FILTERS ---- */
.filters{{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;align-items:center}}
.filter-select,.filter-search{{background:var(--bg-surface);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:var(--radius-sm);font-size:0.85rem;font-family:inherit;transition:border-color 0.2s}}
.filter-select:focus,.filter-search:focus{{outline:none;border-color:var(--accent-1)}}
.filter-search{{flex:1;min-width:200px}}
.filter-count{{margin-left:auto;font-size:0.85rem;color:var(--text-muted)}}

/* ---- FINDINGS ---- */
.findings-section{{padding-bottom:60px}}
.finding{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:12px;overflow:hidden;transition:border-color 0.2s}}
.finding:hover{{border-color:rgba(255,255,255,0.12)}}
.finding__header{{display:flex;align-items:center;gap:12px;padding:16px 20px;cursor:pointer;user-select:none}}
.finding__sev{{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border-radius:4px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;flex-shrink:0;min-width:72px}}
.finding__sev--CRITICAL{{background:rgba(239,68,68,0.15);color:var(--sev-critical)}}
.finding__sev--HIGH{{background:rgba(245,158,11,0.15);color:var(--sev-high)}}
.finding__sev--MEDIUM{{background:rgba(59,130,246,0.15);color:var(--sev-medium)}}
.finding__sev--LOW{{background:rgba(34,197,94,0.15);color:var(--sev-low)}}
.finding__sev--INFO{{background:rgba(107,114,128,0.15);color:var(--sev-info)}}
.finding__id{{font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.8rem;color:var(--accent-1);font-weight:600;flex-shrink:0;min-width:120px}}
.finding__name{{font-size:0.9rem;font-weight:600;flex:1}}
.finding__chevron{{color:var(--text-muted);transition:transform 0.2s;flex-shrink:0}}
.finding.open .finding__chevron{{transform:rotate(180deg)}}
.finding__body{{display:none;padding:0 20px 20px;border-top:1px solid var(--border)}}
.finding.open .finding__body{{display:block}}
.finding__grid{{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}}
@media(max-width:640px){{.finding__grid{{grid-template-columns:1fr}}}}
.finding__field{{padding:14px;background:rgba(255,255,255,0.02);border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,0.04)}}
.finding__field-label{{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px}}
.finding__field-value{{font-size:0.85rem;color:var(--text-secondary);line-height:1.5}}
.finding__field-value code{{font-family:'JetBrains Mono','Fira Code',monospace;font-size:0.82rem;background:rgba(0,212,255,0.08);color:var(--accent-1);padding:2px 6px;border-radius:3px}}
.finding__field--full{{grid-column:1/-1}}
.finding__field--rec{{border-left:3px solid var(--accent-1)}}
.finding__field--issue{{border-left:3px solid var(--sev-high)}}
.finding__cwe{{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:4px;background:rgba(123,97,255,0.12);color:var(--accent-2);font-size:0.78rem;font-weight:600;font-family:'JetBrains Mono','Fira Code',monospace}}

/* ---- COMPLIANCE ---- */
.compliance{{padding:40px 0 60px}}
.compliance-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}}
.compliance-card{{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px;text-align:center}}
.compliance-card__name{{font-weight:700;font-size:0.9rem;margin-bottom:4px}}
.compliance-card__desc{{font-size:0.75rem;color:var(--text-muted);line-height:1.4}}

/* ---- FOOTER ---- */
.report-footer{{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--text-muted);font-size:0.82rem}}
.report-footer a{{color:var(--accent-1)}}

/* ---- ANIMATIONS ---- */
@keyframes fadeIn{{from{{opacity:0;transform:translateY(10px)}}to{{opacity:1;transform:translateY(0)}}}}
.animate-in{{animation:fadeIn 0.4s ease both}}

/* ---- PRINT ---- */
@media print{{
  body{{background:#fff;color:#111}}
  .back-nav,.filters{{display:none}}
  .finding__body{{display:block!important}}
  .finding{{break-inside:avoid}}
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      Back to Portal
    </a>
    <div class="back-nav__brand">Phalanx<span>Cyber</span></div>
  </div>
</nav>

<!-- ======== HERO ======== -->
<header class="report-hero">
  <div class="container">
    <div class="report-hero__badge">Sample Security Audit Report</div>
    <h1>{hero_h1}</h1>
    <p class="report-hero__sub">
      {esc(tool["description"])}
      {total} finding{"s" if total != 1 else ""} generated by the open-source scanner.
    </p>
    <div class="meta-grid">
{meta_cards_html}
    </div>
  </div>
</header>

<!-- ======== SEVERITY DASHBOARD ======== -->
<section class="dashboard">
  <div class="container">
    <h2 class="section-title">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      Finding Summary
    </h2>

    <div class="sev-grid">
      <div class="sev-card" data-sev="CRITICAL" onclick="filterBySev('CRITICAL')">
        <div class="sev-card__count">{summary.get("CRITICAL", 0)}</div>
        <div class="sev-card__label">Critical</div>
      </div>
      <div class="sev-card" data-sev="HIGH" onclick="filterBySev('HIGH')">
        <div class="sev-card__count">{summary.get("HIGH", 0)}</div>
        <div class="sev-card__label">High</div>
      </div>
      <div class="sev-card" data-sev="MEDIUM" onclick="filterBySev('MEDIUM')">
        <div class="sev-card__count">{summary.get("MEDIUM", 0)}</div>
        <div class="sev-card__label">Medium</div>
      </div>
      <div class="sev-card" data-sev="LOW" onclick="filterBySev('LOW')">
        <div class="sev-card__count">{summary.get("LOW", 0)}</div>
        <div class="sev-card__label">Low</div>
      </div>
      <div class="sev-card" data-sev="INFO" onclick="filterBySev('INFO')">
        <div class="sev-card__count">{summary.get("INFO", 0)}</div>
        <div class="sev-card__label">Info</div>
      </div>
    </div>

    <!-- Posture Score -->
    <div class="posture">
      <div class="posture__ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle class="bg" cx="60" cy="60" r="54"/>
          <circle class="fg" cx="60" cy="60" r="54"/>
        </svg>
        <div class="posture__score">
          <div class="posture__score-num">{score}</div>
          <div class="posture__score-max">/ 100</div>
        </div>
      </div>
      <div class="posture__text">
        <h3>Security Posture <span class="grade">{grade} &mdash; {grade_label}</span></h3>
        <p>{esc(posture_desc)}</p>
      </div>
    </div>

    <!-- Category Breakdown Chart -->
    <h2 class="section-title" style="margin-top:16px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      Findings by Category
    </h2>
    <div class="cat-chart" id="catChart"></div>
  </div>
</section>

<!-- ======== FINDINGS ======== -->
<section class="findings-section">
  <div class="container">
    <h2 class="section-title">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Detailed Findings
    </h2>

    <div class="filters">
      <select class="filter-select" id="sevFilter" onchange="applyFilters()">
        <option value="">All Severities</option>
        <option value="CRITICAL">Critical</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
        <option value="INFO">Info</option>
      </select>
      <select class="filter-select" id="catFilter" onchange="applyFilters()">
        <option value="">All Categories</option>
      </select>
      <input type="text" class="filter-search" id="searchFilter" placeholder="Search findings..." oninput="applyFilters()">
      <span class="filter-count" id="filterCount">Showing {total} of {total}</span>
    </div>

    <div id="findingsContainer"></div>
  </div>
</section>

{compliance_html}

<!-- ======== FOOTER ======== -->
<footer class="report-footer">
  <div class="container">
    Generated by <a href="{esc(tool['github'])}" target="_blank" rel="noopener">{esc(tool['name'])}</a> &mdash;
    part of the <a href="index.html">Phalanx Cyber</a> open-source security toolkit.
    This is a sample report using synthetic test data.
  </div>
</footer>

<script>
/* ================================================================
   FINDINGS DATA
   ================================================================ */
const FINDINGS = {findings_json};

/* ================================================================
   RENDER
   ================================================================ */
const SEV_ORDER = {{CRITICAL:0,HIGH:1,MEDIUM:2,LOW:3,INFO:4}};
const SEV_COLORS = {{CRITICAL:'var(--sev-critical)',HIGH:'var(--sev-high)',MEDIUM:'var(--sev-medium)',LOW:'var(--sev-low)',INFO:'var(--sev-info)'}};

// Category chart
(function renderCatChart(){{
  const cats = {{}};
  FINDINGS.forEach(f => {{ cats[f.category] = (cats[f.category]||0) + 1 }});
  const sorted = Object.entries(cats).sort((a,b) => b[1]-a[1]);
  if(!sorted.length) return;
  const max = sorted[0][1];
  const barColors = ['#EF4444','#F59E0B','#3B82F6','#8B5CF6','#22C55E','#EC4899','#06B6D4','#F97316','#14B8A6','#A855F7'];
  const container = document.getElementById('catChart');
  container.innerHTML = sorted.map(([cat, count], i) => {{
    const pct = Math.round((count / max) * 100);
    return `<div class="cat-bar animate-in" style="animation-delay:${{i*60}}ms">
      <div class="cat-bar__label">${{cat}}</div>
      <div class="cat-bar__track">
        <div class="cat-bar__fill" style="width:${{pct}}%;background:${{barColors[i%barColors.length]}}">${{count}}</div>
      </div>
    </div>`;
  }}).join('');
}})();

// Populate category filter
(function populateCatFilter(){{
  const cats = [...new Set(FINDINGS.map(f=>f.category))].sort();
  const sel = document.getElementById('catFilter');
  cats.forEach(c => {{ const o = document.createElement('option'); o.value = c; o.textContent = c; sel.appendChild(o) }});
}})();

// Render findings
function renderFindings(list){{
  const container = document.getElementById('findingsContainer');
  if(!list.length){{
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">No findings match the current filters.</p>';
    return;
  }}
  container.innerHTML = list.map((f, i) => `
    <div class="finding animate-in" data-sev="${{f.severity}}" data-cat="${{f.category}}" style="animation-delay:${{Math.min(i*20,400)}}ms">
      <div class="finding__header" onclick="this.parentElement.classList.toggle('open')">
        <span class="finding__sev finding__sev--${{f.severity}}">${{f.severity}}</span>
        <span class="finding__id">${{f.rule_id}}</span>
        <span class="finding__name">${{escHtml(f.name)}}</span>
        <svg class="finding__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="finding__body">
        <div class="finding__grid">
          <div class="finding__field finding__field--full finding__field--issue">
            <div class="finding__field-label">Issue</div>
            <div class="finding__field-value">${{escHtml(f.description)}}</div>
          </div>
          <div class="finding__field finding__field--full finding__field--rec">
            <div class="finding__field-label">Recommendation</div>
            <div class="finding__field-value">${{escHtml(f.recommendation)}}</div>
          </div>
          ${{f.context ? `<div class="finding__field">
            <div class="finding__field-label">Context</div>
            <div class="finding__field-value"><code>${{escHtml(f.context)}}</code></div>
          </div>` : ''}}
          ${{f.source ? `<div class="finding__field">
            <div class="finding__field-label">Source</div>
            <div class="finding__field-value"><code>${{escHtml(f.source)}}</code></div>
          </div>` : ''}}
          ${{f.cwe ? `<div class="finding__field">
            <div class="finding__field-label">Weakness</div>
            <div class="finding__field-value"><span class="finding__cwe">${{f.cwe}}</span></div>
          </div>` : ''}}
          <div class="finding__field">
            <div class="finding__field-label">Category</div>
            <div class="finding__field-value">${{escHtml(f.category)}}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}}

function escHtml(s){{ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }}

// Initial render
renderFindings(FINDINGS);

// Filters
function applyFilters(){{
  const sev = document.getElementById('sevFilter').value;
  const cat = document.getElementById('catFilter').value;
  const q = document.getElementById('searchFilter').value.toLowerCase();

  // Reset sev card highlights
  document.querySelectorAll('.sev-card').forEach(c => c.classList.remove('active'));
  if(sev) document.querySelector(`.sev-card[data-sev="${{sev}}"]`)?.classList.add('active');

  const filtered = FINDINGS.filter(f => {{
    if(sev && f.severity !== sev) return false;
    if(cat && f.category !== cat) return false;
    if(q && !((f.rule_id||'')+' '+(f.name||'')+' '+(f.description||'')+' '+(f.context||'')+' '+(f.cwe||'')+' '+(f.category||'')).toLowerCase().includes(q)) return false;
    return true;
  }});
  renderFindings(filtered);
  document.getElementById('filterCount').textContent = `Showing ${{filtered.length}} of ${{FINDINGS.length}}`;
}}

function filterBySev(sev){{
  const sel = document.getElementById('sevFilter');
  sel.value = sel.value === sev ? '' : sev;
  applyFilters();
  document.querySelector('.findings-section').scrollIntoView({{behavior:'smooth'}});
}}
</script>
</body>
</html>
'''


# ──────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────
def process_tool(tool):
    """Load data for one tool and generate its HTML report."""
    src = tool["json_path"]
    out_name = tool["output"]
    tool_id = tool["id"]
    out_path = os.path.join(OUTPUT_DIR, out_name)

    if not os.path.isfile(src):
        print(f"  [SKIP] {tool['name']}: source not found -> {src}")
        return False

    # Determine source type
    if src.lower().endswith(".json"):
        findings, summary = extract_findings_from_json(src, tool_id)
    elif src.lower().endswith(".html") or src.lower().endswith(".htm"):
        with open(src, "r", encoding="utf-8") as fh:
            html_content = fh.read()
        findings = extract_findings_from_html(html_content)
        # Build summary from extracted findings
        summary = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
        for f in findings:
            sev = f.get("severity", "INFO").upper()
            if sev in summary:
                summary[sev] += 1
    else:
        print(f"  [SKIP] {tool['name']}: unsupported file type -> {src}")
        return False

    if not findings:
        print(f"  [WARN] {tool['name']}: no findings extracted from {src}")

    total = sum(summary.values())
    report_html = generate_report_html(tool, findings, summary)

    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(report_html)

    score, grade, _ = calc_posture_score(summary)
    print(f"  [OK]   {tool['name']:45s}  {total:>4d} findings  Score: {score:5.1f} ({grade})  -> {out_name}")
    return True


def main():
    print("=" * 72)
    print("  Phalanx Cyber -- Report Generator")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Tools:  {len(TOOLS_CONFIG)}")
    print("=" * 72)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success = 0
    skipped = 0
    for tool in TOOLS_CONFIG:
        try:
            if process_tool(tool):
                success += 1
            else:
                skipped += 1
        except Exception as exc:
            print(f"  [ERR]  {tool['name']}: {exc}")
            skipped += 1

    print("-" * 72)
    print(f"  Done. Generated {success} report(s), skipped {skipped}.")
    print("=" * 72)


if __name__ == "__main__":
    main()
