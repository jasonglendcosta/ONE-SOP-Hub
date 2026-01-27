"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Full department data with SOPs
const departments = [
  {
    id: "SALES",
    name: "Sales Department",
    icon: "🏠",
    owner: "Head of Sales Operations",
    description: "Manages the complete sales lifecycle from customer booking to agreement execution, ensuring RERA compliance and seamless cross-department coordination.",
    kpis: [
      { value: "25%", label: "Conversion Rate" },
      { value: "<48h", label: "Booking Cycle" },
      { value: "98%", label: "First-Time Right" },
      { value: "4.7/5", label: "CSAT Score" }
    ],
    responsible: ["Head of Sales Operations", "Sales Manager", "Senior Sales Agent", "Sales Coordinator", "Legal Coordinator"],
    sops: [
      { id: "SOP-SALES-001", title: "Customer Booking & URRF Processing", owner: "Head of Sales Operations", version: "V1.0", purpose: "Establishes the standardized process for converting qualified leads into confirmed bookings through the URRF system, ensuring 100% RERA compliance with URRF submission within 72 hours.", kpis: { target: "100%", accuracy: "99.9%", sla: "<48h" }, flow: ["Customer Confirms Unit", "Verify Documentation", "Collect Booking Deposit", "Generate URRF", "Digital Signatures", "DLD Molak Submission", "Collections Handoff", "SPA Trigger"] },
      { id: "SOP-SALES-002", title: "Sales Agreement Preparation & Execution", owner: "Sales Manager", version: "V1.0", purpose: "Defines the end-to-end process for preparing, reviewing, and executing Sales Purchase Agreements (SPAs) in compliance with RERA Law and DLD regulations.", kpis: { target: "30 days", accuracy: "100%", sla: "<14 days" }, flow: ["SPA Request Received", "Legal Review", "Customer Verification", "Draft SPA", "Internal Approval", "Customer Review", "Final Execution", "DLD Registration"] },
      { id: "SOP-SALES-003", title: "Sales Offer Generation & Pricing Management", owner: "Sales Manager", version: "V1.0", purpose: "Standardizes the creation of sales offers and quotations, ensuring pricing accuracy, discount approval workflows, and real-time price list management.", kpis: { target: "99%", accuracy: "100%", sla: "<2h" }, flow: ["Price Request", "Check Availability", "Apply Payment Plan", "Calculate Discounts", "Manager Approval", "Generate Quote", "Customer Presentation", "Quote Acceptance"] },
      { id: "SOP-SALES-004", title: "Cross-Department Handoffs & Status Updates", owner: "Sales Operations", version: "V1.0", purpose: "Establishes protocols for seamless handoffs between Sales, Collections, Legal, and Customer Service departments with real-time status tracking.", kpis: { target: "<1h", accuracy: "100%", sla: "Real-time" }, flow: ["Sales Closes Deal", "Update Salesforce", "Notify Collections", "Trigger Legal Process", "Customer Service Alert", "Finance Notification", "Status Dashboard Update"] },
      { id: "SOP-SALES-005", title: "Discount Approval & Pricing Exceptions", owner: "Head of Sales", version: "V1.0", purpose: "Defines the approval matrix for pricing deviations, special discounts, and bulk purchase arrangements with complete audit trails.", kpis: { target: "<3%", accuracy: "100%", sla: "<4h" }, flow: ["Discount Request", "Check Threshold", "Route to Approver", "Manager Review", "CCO Approval (>10%)", "Document Approval", "Apply to Quote", "Audit Log Entry"] }
    ]
  },
  {
    id: "BROK",
    name: "Broker Management",
    icon: "🤝",
    owner: "Head of Broker Relations",
    description: "Manages broker relationships, commission structures, RERA compliance, and channel partnerships for optimal sales distribution.",
    kpis: [
      { value: "99.5%", label: "Calc Accuracy" },
      { value: "<7 days", label: "Payment Time" },
      { value: "<2%", label: "Dispute Rate" },
      { value: "4.5/5", label: "Satisfaction" }
    ],
    responsible: ["Head of Broker Relations", "Commission Processing Team", "Finance Department", "Sales Operations Manager", "Legal & Compliance"],
    sops: [
      { id: "SOP-BROK-001", title: "Commission Calculation & Payment", owner: "Head of Broker Relations", version: "V1.0", purpose: "Establishes standardized procedures for calculating, processing, and disbursing broker commissions in compliance with RERA regulations.", kpis: { target: "99.5%", accuracy: "100%", sla: "<7 days" }, flow: ["Deal Closure", "Milestone Verification", "Calculate Commission", "Apply Adjustments", "Approval Workflow", "Generate Statement", "Execute Payment", "Send Confirmation"] },
      { id: "SOP-BROK-002", title: "Broker Registration & Onboarding", owner: "Channel Manager", version: "V1.0", purpose: "Defines the complete process for registering new brokers, verifying RERA credentials, executing agreements, and providing system access.", kpis: { target: "<3 days", accuracy: "100%", sla: "<48h" }, flow: ["Application Received", "RERA License Check", "Background Verification", "Agreement Signing", "System Access Setup", "Portal Training", "Go-Live Activation"] },
      { id: "SOP-BROK-003", title: "Deal Registration & Conflict Resolution", owner: "Channel Manager", version: "V1.0", purpose: "Standardizes the deal registration process to prevent conflicts, manage client protection periods, and resolve disputes fairly.", kpis: { target: "<48h", accuracy: "100%", sla: "<24h" }, flow: ["Submit Registration", "Duplicate Check", "Assign DRN", "Protection Period Start", "Conflict Detection", "Dispute Resolution", "Commission Assignment"] },
      { id: "SOP-BROK-004", title: "Channel Pricing & Incentive Programs", owner: "Head of Sales", version: "V1.0", purpose: "Manages broker incentive programs, volume bonuses, and special campaign structures to drive performance.", kpis: { target: "15%", accuracy: "100%", sla: "Monthly" }, flow: ["Define Program", "Set Targets", "Configure System", "Communicate Brokers", "Track Performance", "Calculate Bonuses", "Disburse Incentives"] },
      { id: "SOP-BROK-005", title: "Broker Compliance & RERA Requirements", owner: "Compliance Officer", version: "V1.0", purpose: "Ensures all brokers maintain valid RERA licenses, comply with regulations, and meet audit requirements.", kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" }, flow: ["License Monitoring", "Expiry Alerts", "Compliance Audit", "Violation Handling", "RERA Reporting", "License Renewal", "Status Update"] }
    ]
  },
  {
    id: "COLL",
    name: "Collections Department",
    icon: "💰",
    owner: "Head of Collections",
    description: "Handles payment collections, PDC management, late payment penalties, and payment plan modifications.",
    kpis: [
      { value: "95%", label: "Collection Rate" },
      { value: "<2%", label: "Default Rate" },
      { value: "100%", label: "Escrow Accuracy" },
      { value: "<24h", label: "Processing Time" }
    ],
    responsible: ["Head of Collections", "Collections Manager", "Collections Officer", "Finance Manager", "Legal Department"],
    sops: [
      { id: "SOP-COLL-001", title: "Payment Schedule Management", owner: "Collections Manager", version: "V1.0", purpose: "Manages customer payment schedules, generates reminders, tracks installments, and maintains accurate payment records.", kpis: { target: "100%", accuracy: "99%", sla: "<24h" }, flow: ["Schedule Creation", "Payment Due Alerts", "Reminder Automation", "Payment Receipt", "Reconciliation", "Status Update", "Customer Notification"] },
      { id: "SOP-COLL-002", title: "PDC Management & Banking", owner: "Collections Manager", version: "V1.0", purpose: "Handles post-dated cheque collection, safe storage, timely deposit, and bounce management.", kpis: { target: "100%", accuracy: "99.9%", sla: "<48h" }, flow: ["Cheque Receipt", "Verification", "Safe Storage", "Pre-Deposit Alert", "Bank Deposit", "Clearance Check", "Bounce Handling", "Customer Contact"] },
      { id: "SOP-COLL-003", title: "Late Payment Penalty Assessment", owner: "Collections Manager", version: "V1.0", purpose: "Calculates and applies late payment penalties as per contract terms and RERA guidelines.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Payment Overdue", "Grace Period Check", "Calculate Penalty", "Customer Notification", "Apply Penalty", "Update Records", "Escalation if Needed"] },
      { id: "SOP-COLL-004", title: "Collections Escalation Process", owner: "Head of Finance", version: "V1.0", purpose: "Defines escalation procedures for overdue accounts including legal action initiation.", kpis: { target: "<5%", accuracy: "100%", sla: "<72h" }, flow: ["Aging Analysis", "First Escalation", "Manager Call", "Demand Letter", "Legal Notice", "Legal Action", "Recovery Execution"] },
      { id: "SOP-COLL-005", title: "Payment Plan Modification", owner: "Collections Manager", version: "V1.0", purpose: "Handles customer requests for payment plan changes with proper approval workflows.", kpis: { target: "<5 days", accuracy: "100%", sla: "<48h" }, flow: ["Request Received", "Assessment", "Approval Routing", "Legal Review", "New Schedule", "Documentation", "Customer Confirmation"] }
    ]
  },
  {
    id: "CRM",
    name: "Customer Service",
    icon: "💬",
    owner: "Head of Customer Service",
    description: "Manages customer inquiries, complaints, ownership transfers, RERA complaints, and NOC requests.",
    kpis: [
      { value: "<4h", label: "Response Time" },
      { value: "95%", label: "Resolution Rate" },
      { value: "4.8/5", label: "CSAT Score" },
      { value: "<2%", label: "Escalation Rate" }
    ],
    responsible: ["Head of Customer Service", "CRM Manager", "Customer Service Representatives", "Legal Coordinator", "Compliance Officer"],
    sops: [
      { id: "SOP-CRM-001", title: "RERA Complaint Handling & Resolution", owner: "CRM Manager", version: "V1.0", purpose: "Manages RERA-escalated complaints with regulatory compliance and timely resolution.", kpis: { target: "100%", accuracy: "100%", sla: "<72h" }, flow: ["RERA Notice", "Case Creation", "Investigation", "Response Draft", "Legal Review", "RERA Submission", "Resolution", "Case Closure"] },
      { id: "SOP-CRM-002", title: "Ownership Transfer & Name Change", owner: "CRM Manager", version: "V1.0", purpose: "Handles property ownership transfers and name changes with DLD compliance.", kpis: { target: "<14 days", accuracy: "100%", sla: "<7 days" }, flow: ["Request Received", "Document Verification", "Fee Calculation", "Approval Workflow", "DLD Submission", "New Title Deed", "Customer Handover"] },
      { id: "SOP-CRM-003", title: "Payment Inquiry & Receipt Management", owner: "CRM Manager", version: "V1.0", purpose: "Handles customer payment inquiries and generates official receipts.", kpis: { target: "<4h", accuracy: "100%", sla: "<2h" }, flow: ["Inquiry Received", "Account Lookup", "Payment Verification", "Generate Statement", "Issue Receipt", "Customer Delivery"] },
      { id: "SOP-CRM-004", title: "Customer Inquiry & Complaint Management", owner: "CRM Manager", version: "V1.0", purpose: "Manages all customer inquiries and complaints with SLA tracking.", kpis: { target: "95%", accuracy: "100%", sla: "<24h" }, flow: ["Ticket Creation", "Categorization", "Assignment", "Investigation", "Resolution", "Customer Update", "Satisfaction Survey", "Case Closure"] },
      { id: "SOP-CRM-005", title: "NOC Request Processing", owner: "CRM Manager", version: "V1.0", purpose: "Processes No Objection Certificate requests for various purposes.", kpis: { target: "<5 days", accuracy: "100%", sla: "<3 days" }, flow: ["NOC Request", "Eligibility Check", "Outstanding Verification", "Approval", "NOC Generation", "Customer Collection"] }
    ]
  },
  {
    id: "FIN",
    name: "Finance Department",
    icon: "📈",
    owner: "Chief Financial Officer",
    description: "Handles revenue recognition, escrow management, financial reporting, reconciliation, and tax compliance.",
    kpis: [
      { value: ">99%", label: "Accuracy" },
      { value: "100%", label: "IFRS Compliance" },
      { value: "0", label: "Audit Findings" },
      { value: "<5 days", label: "Month Close" }
    ],
    responsible: ["Chief Financial Officer", "Finance Manager", "Revenue Accountant", "Tax Manager", "Financial Controller"],
    sops: [
      { id: "SOP-FIN-001", title: "Revenue Recognition (IFRS 15)", owner: "CFO", version: "V1.0", purpose: "Establishes standardized procedures for revenue recognition in accordance with IFRS 15 for all real estate development projects.", kpis: { target: ">99%", accuracy: "100%", sla: "<48h" }, flow: ["Contract Identification", "Performance Obligations", "Transaction Price", "Price Allocation", "POC Calculation", "Revenue Journal", "Variance Analysis", "Audit Trail"] },
      { id: "SOP-FIN-002", title: "Escrow Account Management", owner: "Finance Manager", version: "V1.0", purpose: "Manages DLD-registered escrow accounts ensuring 100% regulatory compliance.", kpis: { target: "100%", accuracy: "100%", sla: "Daily" }, flow: ["Deposit Receipt", "Account Allocation", "DLD Reconciliation", "Withdrawal Request", "Approval Workflow", "Fund Release", "Audit Report"] },
      { id: "SOP-FIN-003", title: "Financial Reporting & Compliance", owner: "CFO", version: "V1.0", purpose: "Ensures timely and accurate financial reporting meeting all regulatory requirements.", kpis: { target: "100%", accuracy: "100%", sla: "Monthly" }, flow: ["Data Collection", "Trial Balance", "Adjustments", "Report Generation", "Management Review", "Board Approval", "Regulatory Filing"] },
      { id: "SOP-FIN-004", title: "Payment Reconciliation & Variance Analysis", owner: "Finance Manager", version: "V1.0", purpose: "Reconciles all payment transactions and investigates variances.", kpis: { target: "<1%", accuracy: "100%", sla: "Daily" }, flow: ["Extract Transactions", "Bank Statement Match", "Variance Identification", "Investigation", "Adjustment Entry", "Approval", "Report Generation"] },
      { id: "SOP-FIN-005", title: "Tax Compliance (VAT & Corporate)", owner: "Tax Manager", version: "V1.0", purpose: "Ensures compliance with UAE VAT and corporate tax requirements.", kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" }, flow: ["Transaction Analysis", "VAT Calculation", "Input Tax Credit", "Return Preparation", "Management Review", "FTA Submission", "Payment Processing"] }
    ]
  },
  {
    id: "HAND",
    name: "Handover Department",
    icon: "🔑",
    owner: "Head of Handover",
    description: "Manages unit inspections, snagging, handover scheduling, completion certificates, and defect tracking.",
    kpis: [
      { value: ">85%", label: "First Pass Rate" },
      { value: "<7 days", label: "Snagging Time" },
      { value: ">4.5/5", label: "CSAT Score" },
      { value: ">60%", label: "Zero Defect" }
    ],
    responsible: ["Handover Manager", "Senior Inspector", "Inspector", "Technical Coordinator", "Customer Service"],
    sops: [
      { id: "SOP-HAND-001", title: "Unit Inspection & Snagging Management", owner: "Handover Manager", version: "V2.0", purpose: "Establishes procedures for comprehensive unit inspections, snagging lists, and quality control before customer handover.", kpis: { target: ">85%", accuracy: "100%", sla: "<48h" }, flow: ["Schedule Inspection", "Pre-Inspection Prep", "Conduct Inspection", "Generate Snagging List", "Contractor Assignment", "Rectification", "Re-Inspection", "Sign-Off"] },
      { id: "SOP-HAND-002", title: "Handover Appointment Scheduling", owner: "Handover Manager", version: "V1.0", purpose: "Manages customer handover appointments with efficient scheduling.", kpis: { target: "95%", accuracy: "100%", sla: "<24h" }, flow: ["Customer Contact", "Availability Check", "Schedule Appointment", "Confirmation SMS", "Reminder 48h", "Reschedule if Needed", "Appointment Execution"] },
      { id: "SOP-HAND-003", title: "Completion Certificate & NOC Processing", owner: "Handover Manager", version: "V1.0", purpose: "Obtains Dubai Municipality completion certificates and required NOCs.", kpis: { target: "100%", accuracy: "100%", sla: "<14 days" }, flow: ["Pre-Submission Check", "Document Compilation", "DM Submission", "Inspection Coordination", "Certificate Receipt", "NOC Processing", "Customer Notification"] },
      { id: "SOP-HAND-004", title: "Keys & Documentation Handover", owner: "Handover Manager", version: "V1.0", purpose: "Executes the final handover of keys and documentation to customers.", kpis: { target: "100%", accuracy: "100%", sla: "<2h" }, flow: ["Final Inspection", "Documentation Pack", "Key Preparation", "Customer Briefing", "Handover Execution", "Sign-Off", "System Update", "Welcome Kit"] },
      { id: "SOP-HAND-005", title: "Defect Rectification Tracking", owner: "Handover Manager", version: "V1.0", purpose: "Tracks and manages defect rectification during warranty period.", kpis: { target: "<7 days", accuracy: "100%", sla: "<72h" }, flow: ["Defect Report", "Categorization", "Contractor Assignment", "SLA Tracking", "Rectification", "Quality Check", "Customer Confirmation", "Case Closure"] }
    ]
  },
  {
    id: "LEAD",
    name: "Lead Management",
    icon: "🎯",
    owner: "Head of Marketing Operations",
    description: "Manages lead capture, qualification, scoring, assignment, nurturing, and conversion tracking.",
    kpis: [
      { value: "100%", label: "Capture Rate" },
      { value: "<2 min", label: "Processing" },
      { value: "<2%", label: "Duplicate Rate" },
      { value: ">95%", label: "Data Quality" }
    ],
    responsible: ["Head of Marketing Operations", "Marketing Manager", "Sales Operations", "Digital Marketing Team", "Inside Sales"],
    sops: [
      { id: "SOP-LEAD-001", title: "Lead Capture & Source Attribution", owner: "Marketing Manager", version: "V1.0", purpose: "Captures leads across all channels with accurate source attribution for marketing ROI analysis.", kpis: { target: "100%", accuracy: "100%", sla: "<2 min" }, flow: ["Lead Ingestion", "Source Detection", "UTM Parsing", "Duplicate Check", "Enrichment", "CRM Creation", "Attribution Log", "Routing Trigger"] },
      { id: "SOP-LEAD-002", title: "Lead Qualification & Scoring", owner: "Sales Operations", version: "V1.0", purpose: "Qualifies and scores leads using defined criteria to prioritize sales efforts.", kpis: { target: "100%", accuracy: ">90%", sla: "<4h" }, flow: ["Lead Receipt", "Data Validation", "BANT Assessment", "Score Calculation", "Priority Assignment", "Quality Gate", "Sales Notification"] },
      { id: "SOP-LEAD-003", title: "Lead Assignment & Distribution", owner: "Sales Operations", version: "V1.0", purpose: "Distributes qualified leads to sales agents using round-robin and skill-based routing.", kpis: { target: "<5 min", accuracy: "100%", sla: "<15 min" }, flow: ["Qualification Complete", "Agent Availability", "Match Criteria", "Assignment", "Agent Notification", "Response Tracking", "Reassignment if Needed"] },
      { id: "SOP-LEAD-004", title: "Lead Nurturing & Follow-Up Campaigns", owner: "Marketing Manager", version: "V1.0", purpose: "Nurtures leads through automated campaigns until sales-ready.", kpis: { target: ">25%", accuracy: "100%", sla: "Automated" }, flow: ["Lead Segmentation", "Journey Assignment", "Content Delivery", "Engagement Tracking", "Score Update", "Sales Alert", "Conversion Handoff"] },
      { id: "SOP-LEAD-005", title: "Lead Conversion Tracking & Analytics", owner: "Sales Operations", version: "V1.0", purpose: "Tracks lead conversion metrics and provides actionable analytics.", kpis: { target: ">25%", accuracy: "100%", sla: "Real-time" }, flow: ["Data Collection", "Funnel Analysis", "Conversion Attribution", "Channel Performance", "Report Generation", "Insight Delivery", "Optimization"] }
    ]
  },
  {
    id: "INV",
    name: "Inventory Management",
    icon: "📦",
    owner: "Head of Inventory Management",
    description: "Manages unit availability, reservations, pricing strategies, allocation, and project phase launches.",
    kpis: [
      { value: "99.99%", label: "Accuracy" },
      { value: "<30s", label: "Sync Time" },
      { value: "0", label: "Double Booking" },
      { value: "24/7", label: "Availability" }
    ],
    responsible: ["Head of Inventory Management", "Inventory Controllers", "Sales Operations", "System Administrators", "Channel Managers"],
    sops: [
      { id: "SOP-INV-001", title: "Inventory Status & Availability Tracking", owner: "Head of Inventory", version: "V1.0", purpose: "Maintains real-time inventory status across all channels with zero double-booking incidents.", kpis: { target: "99.99%", accuracy: "100%", sla: "<30s" }, flow: ["Status Change Request", "Validation", "Lock Mechanism", "Update All Channels", "Sync Verification", "Audit Log", "Dashboard Refresh"] },
      { id: "SOP-INV-002", title: "Unit Reservation & Hold Management", owner: "Inventory Manager", version: "V1.0", purpose: "Manages unit holds and reservations with automatic expiry handling.", kpis: { target: "100%", accuracy: "100%", sla: "90 min" }, flow: ["Hold Request", "Availability Check", "Apply Hold", "Timer Start", "Extension Request", "Expiry Processing", "Status Release"] },
      { id: "SOP-INV-003", title: "Inventory Pricing & Release Strategy", owner: "Head of Sales", version: "V1.0", purpose: "Manages pricing strategies and phased inventory releases.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Pricing Decision", "Configure Price List", "Phase Definition", "Release Schedule", "Channel Distribution", "Performance Monitoring", "Price Adjustments"] },
      { id: "SOP-INV-004", title: "Inventory Allocation & Distribution", owner: "Inventory Manager", version: "V1.0", purpose: "Allocates inventory across sales channels based on performance.", kpis: { target: "100%", accuracy: "100%", sla: "Weekly" }, flow: ["Channel Analysis", "Allocation Decision", "Pool Creation", "Channel Assignment", "Notification", "Performance Tracking", "Reallocation"] },
      { id: "SOP-INV-005", title: "Project Phase Management & Launches", owner: "Project Director", version: "V1.0", purpose: "Manages project phase launches with coordinated go-to-market activities.", kpis: { target: "100%", accuracy: "100%", sla: "<48h" }, flow: ["Phase Planning", "Inventory Preparation", "Pricing Approval", "Marketing Alignment", "System Configuration", "Launch Execution", "Post-Launch Review"] }
    ]
  },
  {
    id: "DEV",
    name: "Development",
    icon: "🏗️",
    owner: "Head of Development",
    description: "Oversees project planning, construction management, quality control, and regulatory approvals.",
    kpis: [
      { value: "100%", label: "On Schedule" },
      { value: "<5%", label: "Cost Variance" },
      { value: "100%", label: "Quality Score" },
      { value: "100%", label: "Compliance" }
    ],
    responsible: ["Development Manager", "Project Manager", "Design Manager", "Construction Manager", "Quality Manager"],
    sops: [
      { id: "SOP-DEV-001", title: "Project Planning & Feasibility Assessment", owner: "Development Manager", version: "V1.0", purpose: "Evaluates project feasibility and creates comprehensive project plans.", kpis: { target: "100%", accuracy: ">90%", sla: "<30 days" }, flow: ["Market Analysis", "Site Assessment", "Financial Modeling", "Risk Analysis", "Feasibility Report", "Board Approval", "Project Initiation"] },
      { id: "SOP-DEV-002", title: "Construction Tender & Contract Management", owner: "Development Manager", version: "V1.0", purpose: "Manages contractor selection and contract administration.", kpis: { target: "100%", accuracy: "100%", sla: "<45 days" }, flow: ["Tender Preparation", "Contractor Prequalification", "Bid Evaluation", "Negotiation", "Contract Award", "Performance Monitoring", "Variation Management"] },
      { id: "SOP-DEV-003", title: "Construction Progress Monitoring & QC", owner: "Project Manager", version: "V1.0", purpose: "Monitors construction progress and ensures quality standards.", kpis: { target: "100%", accuracy: "100%", sla: "Weekly" }, flow: ["Daily Reports", "Progress Measurement", "Quality Inspections", "Issue Resolution", "Milestone Verification", "Stakeholder Updates", "Corrective Actions"] },
      { id: "SOP-DEV-004", title: "Design Management & Consultant Coordination", owner: "Design Manager", version: "V1.0", purpose: "Coordinates design consultants and manages design changes.", kpis: { target: "100%", accuracy: "100%", sla: "<14 days" }, flow: ["Brief Development", "Consultant Briefing", "Design Review", "Change Management", "Value Engineering", "Approval Workflow", "Documentation"] },
      { id: "SOP-DEV-005", title: "Regulatory Approvals & Permit Management", owner: "Development Manager", version: "V1.0", purpose: "Obtains all required regulatory approvals and permits.", kpis: { target: "100%", accuracy: "100%", sla: "<60 days" }, flow: ["Requirements Analysis", "Document Preparation", "Authority Submission", "Query Resolution", "Approval Receipt", "Permit Management", "Renewal Tracking"] }
    ]
  },
  {
    id: "HR",
    name: "Human Resources",
    icon: "👥",
    owner: "Head of HR",
    description: "Handles recruitment, onboarding, performance management, leave management, and employee separation.",
    kpis: [
      { value: "<30 days", label: "Time to Hire" },
      { value: ">90%", label: "Retention Rate" },
      { value: "100%", label: "Compliance" },
      { value: ">4.5/5", label: "Employee Sat" }
    ],
    responsible: ["Head of HR", "HR Manager", "Recruitment Specialist", "HR Coordinator", "Payroll Manager"],
    sops: [
      { id: "SOP-HR-001", title: "Recruitment & Selection Process", owner: "HR Manager", version: "V1.0", purpose: "Manages end-to-end recruitment from requisition to offer acceptance.", kpis: { target: "<30 days", accuracy: "100%", sla: "<21 days" }, flow: ["Requisition Approval", "Job Posting", "Screening", "Interviews", "Assessment", "Reference Check", "Offer Letter", "Acceptance"] },
      { id: "SOP-HR-002", title: "Employee Onboarding & Orientation", owner: "HR Manager", version: "V1.0", purpose: "Ensures smooth onboarding for new employees.", kpis: { target: "100%", accuracy: "100%", sla: "<5 days" }, flow: ["Pre-Joining", "Day 1 Setup", "Orientation Program", "Department Induction", "System Access", "Probation Goals", "Feedback Collection"] },
      { id: "SOP-HR-003", title: "Performance Management & Appraisal", owner: "HR Manager", version: "V1.0", purpose: "Manages performance reviews and development planning.", kpis: { target: "100%", accuracy: "100%", sla: "Annual" }, flow: ["Goal Setting", "Quarterly Review", "Mid-Year Check", "Annual Appraisal", "Rating Calibration", "Feedback Delivery", "Development Plan"] },
      { id: "SOP-HR-004", title: "Leave Management & Attendance", owner: "HR Coordinator", version: "V1.0", purpose: "Manages employee leave requests and attendance tracking.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Leave Request", "Balance Check", "Manager Approval", "System Update", "Payroll Integration", "Attendance Tracking", "Reports Generation"] },
      { id: "SOP-HR-005", title: "Employee Separation & Offboarding", owner: "HR Manager", version: "V1.0", purpose: "Manages employee exits and final settlements.", kpis: { target: "100%", accuracy: "100%", sla: "<14 days" }, flow: ["Resignation Receipt", "Exit Interview", "Clearance Process", "Final Settlement", "Experience Letter", "Access Revocation", "Knowledge Transfer"] }
    ]
  },
  {
    id: "IT",
    name: "Information Technology",
    icon: "💻",
    owner: "IT Director",
    description: "Manages Salesforce configuration, user access, system integration, data backup, and IT service requests.",
    kpis: [
      { value: "99.9%", label: "Uptime" },
      { value: "<4h", label: "Response Time" },
      { value: "100%", label: "Security Score" },
      { value: "<24h", label: "Request SLA" }
    ],
    responsible: ["IT Director", "IT Manager", "System Administrator", "Database Administrator", "IT Support"],
    sops: [
      { id: "SOP-IT-001", title: "Salesforce Configuration Change Management", owner: "IT Manager", version: "V1.0", purpose: "Manages Salesforce configuration changes with proper governance.", kpis: { target: "100%", accuracy: "100%", sla: "<48h" }, flow: ["Change Request", "Impact Analysis", "Approval", "Sandbox Testing", "User Acceptance", "Production Deploy", "Post-Deploy Review"] },
      { id: "SOP-IT-002", title: "User Access Provisioning & De-provisioning", owner: "IT Manager", version: "V1.0", purpose: "Manages user access lifecycle across all systems.", kpis: { target: "<24h", accuracy: "100%", sla: "<4h" }, flow: ["Access Request", "Manager Approval", "Role Assignment", "Account Creation", "Access Grant", "Periodic Review", "Access Revocation"] },
      { id: "SOP-IT-003", title: "System Integration & API Management", owner: "IT Manager", version: "V1.0", purpose: "Manages system integrations and API connections.", kpis: { target: "99.9%", accuracy: "100%", sla: "<4h" }, flow: ["Integration Request", "Technical Design", "Development", "Testing", "Security Review", "Deployment", "Monitoring"] },
      { id: "SOP-IT-004", title: "Data Backup & Disaster Recovery", owner: "IT Director", version: "V1.0", purpose: "Ensures data protection and business continuity.", kpis: { target: "100%", accuracy: "100%", sla: "<4h RTO" }, flow: ["Backup Schedule", "Automated Backup", "Verification", "Offsite Storage", "DR Testing", "Recovery Procedure", "Documentation"] },
      { id: "SOP-IT-005", title: "IT Service Request Management", owner: "IT Manager", version: "V1.0", purpose: "Manages IT support requests and incidents.", kpis: { target: ">95%", accuracy: "100%", sla: "<24h" }, flow: ["Ticket Creation", "Categorization", "Priority Assignment", "Assignment", "Resolution", "User Confirmation", "Ticket Closure"] }
    ]
  },
  {
    id: "LEG",
    name: "Legal Department",
    icon: "⚖️",
    owner: "Legal Director",
    description: "Handles contract review, litigation management, corporate governance, and IP management.",
    kpis: [
      { value: "<48h", label: "Contract Review" },
      { value: "100%", label: "Compliance" },
      { value: "<5%", label: "Dispute Rate" },
      { value: "100%", label: "IP Protected" }
    ],
    responsible: ["Legal Director", "Legal Manager", "Legal Coordinator", "Contracts Specialist", "Compliance Officer"],
    sops: [
      { id: "SOP-LEG-001", title: "Contract Review & Approval", owner: "Legal Manager", version: "V1.0", purpose: "Reviews and approves all commercial contracts.", kpis: { target: "<48h", accuracy: "100%", sla: "<24h" }, flow: ["Contract Receipt", "Risk Assessment", "Legal Review", "Markup", "Negotiation", "Final Approval", "Execution", "Archive"] },
      { id: "SOP-LEG-002", title: "Litigation & Dispute Management", owner: "Legal Director", version: "V1.0", purpose: "Manages litigation and dispute resolution.", kpis: { target: "<5%", accuracy: "100%", sla: "<72h" }, flow: ["Dispute Receipt", "Case Assessment", "Strategy Development", "Negotiation", "Mediation/Arbitration", "Court Proceedings", "Resolution", "Lessons Learned"] },
      { id: "SOP-LEG-003", title: "Corporate Governance & Compliance", owner: "Legal Director", version: "V1.0", purpose: "Ensures corporate governance compliance.", kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" }, flow: ["Regulatory Monitoring", "Gap Analysis", "Policy Update", "Board Reporting", "Compliance Audit", "Remediation", "Documentation"] },
      { id: "SOP-LEG-004", title: "Real Estate Transaction Documentation", owner: "Legal Manager", version: "V1.0", purpose: "Prepares and reviews real estate transaction documents.", kpis: { target: "100%", accuracy: "100%", sla: "<5 days" }, flow: ["Document Request", "Template Selection", "Customization", "Review", "Customer Review", "Execution", "Registration", "Archive"] },
      { id: "SOP-LEG-005", title: "Intellectual Property Management", owner: "Legal Manager", version: "V1.0", purpose: "Protects and manages company intellectual property.", kpis: { target: "100%", accuracy: "100%", sla: "<30 days" }, flow: ["IP Identification", "Registration", "Renewal Tracking", "Infringement Monitoring", "Enforcement", "Licensing", "Portfolio Review"] }
    ]
  },
  {
    id: "MKT",
    name: "Marketing Department",
    icon: "📢",
    owner: "Chief Marketing Officer",
    description: "Handles campaign planning, brand management, digital marketing, events, and budget management.",
    kpis: [
      { value: ">3x", label: "ROAS" },
      { value: ">25%", label: "Lead Conv" },
      { value: "100%", label: "Brand Score" },
      { value: "<5%", label: "Budget Var" }
    ],
    responsible: ["Chief Marketing Officer", "Marketing Manager", "Digital Marketing Manager", "Brand Manager", "Events Manager"],
    sops: [
      { id: "SOP-MKT-001", title: "Campaign Planning & Execution", owner: "Marketing Manager", version: "V1.0", purpose: "Plans and executes integrated marketing campaigns.", kpis: { target: ">3x", accuracy: "100%", sla: "<14 days" }, flow: ["Brief Development", "Strategy", "Creative Development", "Channel Selection", "Budget Allocation", "Execution", "Performance Tracking", "Optimization"] },
      { id: "SOP-MKT-002", title: "Brand Management & Guidelines", owner: "Brand Manager", version: "V1.0", purpose: "Maintains brand consistency across all touchpoints.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Guidelines Update", "Asset Management", "Review Process", "Approval Workflow", "Distribution", "Compliance Check", "Training"] },
      { id: "SOP-MKT-003", title: "Digital Marketing & Social Media", owner: "Digital Marketing Manager", version: "V1.0", purpose: "Manages digital marketing channels and social media.", kpis: { target: ">5%", accuracy: "100%", sla: "Daily" }, flow: ["Content Calendar", "Content Creation", "Approval", "Publishing", "Community Management", "Analytics", "Optimization"] },
      { id: "SOP-MKT-004", title: "Event Management & Exhibitions", owner: "Events Manager", version: "V1.0", purpose: "Plans and executes marketing events and exhibitions.", kpis: { target: ">100", accuracy: "100%", sla: "<30 days" }, flow: ["Event Brief", "Venue Selection", "Vendor Management", "Promotion", "Execution", "Lead Capture", "Post-Event Analysis"] },
      { id: "SOP-MKT-005", title: "Marketing Budget & ROI Management", owner: "CMO", version: "V1.0", purpose: "Manages marketing budget and measures ROI.", kpis: { target: "<5%", accuracy: "100%", sla: "Monthly" }, flow: ["Budget Planning", "Allocation", "Spend Tracking", "Invoice Processing", "ROI Analysis", "Reallocation", "Board Reporting"] }
    ]
  },
  {
    id: "LAND",
    name: "Lands Department",
    icon: "🏝️",
    owner: "Head of Land Acquisition",
    description: "Handles land acquisition, due diligence, land bank optimization, JV structuring, and title management.",
    kpis: [
      { value: "<90 days", label: "Acquisition" },
      { value: "100%", label: "Due Diligence" },
      { value: ">15%", label: "IRR Target" },
      { value: "100%", label: "Title Clear" }
    ],
    responsible: ["Head of Land Acquisition", "Land Manager", "Business Development", "Legal Team", "Finance Team"],
    sops: [
      { id: "SOP-LAND-001", title: "Land Acquisition & Due Diligence", owner: "Land Manager", version: "V1.0", purpose: "Manages land acquisition with comprehensive due diligence.", kpis: { target: "<90 days", accuracy: "100%", sla: "<60 days" }, flow: ["Opportunity Identification", "Initial Assessment", "Due Diligence", "Valuation", "Negotiation", "Board Approval", "Transaction Close", "Title Transfer"] },
      { id: "SOP-LAND-002", title: "Land Bank Management & Optimization", owner: "Land Manager", version: "V1.0", purpose: "Optimizes the land bank portfolio for maximum returns.", kpis: { target: ">15%", accuracy: "100%", sla: "Quarterly" }, flow: ["Portfolio Review", "Market Analysis", "Holding Cost", "Development Timing", "Optimization Strategy", "Board Report", "Action Plan"] },
      { id: "SOP-LAND-003", title: "Joint Venture & Partnership Structuring", owner: "Business Development", version: "V1.0", purpose: "Structures JV and partnership arrangements.", kpis: { target: "100%", accuracy: "100%", sla: "<45 days" }, flow: ["Partner Identification", "Term Sheet", "Due Diligence", "Legal Review", "Negotiation", "Documentation", "Execution", "Governance Setup"] },
      { id: "SOP-LAND-004", title: "Government Land Allocation Applications", owner: "Land Manager", version: "V1.0", purpose: "Manages applications for government land allocations.", kpis: { target: "100%", accuracy: "100%", sla: "<120 days" }, flow: ["Opportunity Review", "Application Prep", "Document Compilation", "Submission", "Follow-up", "Presentation", "Allocation Receipt", "Development Commitment"] },
      { id: "SOP-LAND-005", title: "Land Registration & Title Management", owner: "Land Manager", version: "V1.0", purpose: "Manages land registration and title documentation.", kpis: { target: "100%", accuracy: "100%", sla: "<30 days" }, flow: ["Title Review", "Encumbrance Check", "Registration Prep", "DLD Submission", "Title Receipt", "Safe Storage", "Database Update"] }
    ]
  },
  {
    id: "MIS",
    name: "MIS Department",
    icon: "📊",
    owner: "Head of MIS",
    description: "Manages reporting, dashboards, data quality, business analytics, and master data management.",
    kpis: [
      { value: "100%", label: "Report Accuracy" },
      { value: "<24h", label: "Delivery SLA" },
      { value: ">99%", label: "Data Quality" },
      { value: "Real-time", label: "Dashboard" }
    ],
    responsible: ["Head of MIS", "MIS Manager", "Data Analysts", "Report Developers", "Data Quality Team"],
    sops: [
      { id: "SOP-MIS-001", title: "Management Reporting & Dashboards", owner: "MIS Manager", version: "V1.0", purpose: "Produces management reports and maintains dashboards.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Data Collection", "Validation", "Report Generation", "Quality Check", "Distribution", "Dashboard Update", "Feedback Integration"] },
      { id: "SOP-MIS-002", title: "Data Quality Management", owner: "MIS Manager", version: "V1.0", purpose: "Ensures data quality across all systems.", kpis: { target: ">99%", accuracy: "100%", sla: "Daily" }, flow: ["Quality Rules", "Automated Checks", "Exception Reports", "Root Cause", "Remediation", "Prevention", "Metrics Tracking"] },
      { id: "SOP-MIS-003", title: "Business Analytics & Insights", owner: "MIS Manager", version: "V1.0", purpose: "Provides business analytics and actionable insights.", kpis: { target: "100%", accuracy: "100%", sla: "<48h" }, flow: ["Request Receipt", "Data Analysis", "Pattern Detection", "Insight Generation", "Visualization", "Presentation", "Action Tracking"] },
      { id: "SOP-MIS-004", title: "System Integration & Data Flows", owner: "MIS Manager", version: "V1.0", purpose: "Manages data flows between integrated systems.", kpis: { target: "99.9%", accuracy: "100%", sla: "<4h" }, flow: ["Flow Design", "Implementation", "Testing", "Deployment", "Monitoring", "Error Handling", "Performance Tuning"] },
      { id: "SOP-MIS-005", title: "Master Data Management", owner: "MIS Manager", version: "V1.0", purpose: "Manages master data across the organization.", kpis: { target: "100%", accuracy: "100%", sla: "<24h" }, flow: ["Data Definition", "Governance Rules", "Data Entry", "Validation", "Approval", "Distribution", "Change Management"] }
    ]
  },
  {
    id: "PROC",
    name: "Procurement",
    icon: "🛒",
    owner: "Head of Procurement",
    description: "Manages vendor selection, purchase orders, contract management, and vendor performance evaluation.",
    kpis: [
      { value: ">10%", label: "Cost Savings" },
      { value: "<7 days", label: "PO Cycle" },
      { value: "100%", label: "Compliance" },
      { value: ">90%", label: "On-Time Del" }
    ],
    responsible: ["Head of Procurement", "Procurement Manager", "Procurement Officer", "Vendor Manager", "Finance Team"],
    sops: [
      { id: "SOP-PROC-001", title: "Vendor Selection & Qualification", owner: "Procurement Manager", version: "V1.0", purpose: "Qualifies and selects vendors through rigorous evaluation.", kpis: { target: "100%", accuracy: "100%", sla: "<14 days" }, flow: ["Requirement Definition", "RFQ/RFP", "Bid Receipt", "Evaluation", "Due Diligence", "Selection", "Agreement", "Onboarding"] },
      { id: "SOP-PROC-002", title: "Purchase Order Creation & Approval", owner: "Procurement Manager", version: "V1.0", purpose: "Manages PO creation with proper approvals.", kpis: { target: "<7 days", accuracy: "100%", sla: "<48h" }, flow: ["PR Receipt", "Vendor Selection", "PO Creation", "Budget Check", "Approval Workflow", "PO Dispatch", "Confirmation", "Tracking"] },
      { id: "SOP-PROC-003", title: "Contract Management & Renewal", owner: "Procurement Manager", version: "V1.0", purpose: "Manages vendor contracts throughout lifecycle.", kpis: { target: "100%", accuracy: "100%", sla: "<30 days" }, flow: ["Contract Repository", "Expiry Tracking", "Performance Review", "Renewal Decision", "Negotiation", "Execution", "Archive"] },
      { id: "SOP-PROC-004", title: "Invoice Processing & Payment", owner: "Procurement Manager", version: "V1.0", purpose: "Processes vendor invoices for payment.", kpis: { target: "<7 days", accuracy: "100%", sla: "<5 days" }, flow: ["Invoice Receipt", "Three-Way Match", "Discrepancy Resolution", "Approval", "Payment Queue", "Payment Execution", "Confirmation"] },
      { id: "SOP-PROC-005", title: "Vendor Performance Evaluation", owner: "Procurement Manager", version: "V1.0", purpose: "Evaluates vendor performance regularly.", kpis: { target: ">80%", accuracy: "100%", sla: "Quarterly" }, flow: ["KPI Definition", "Data Collection", "Scoring", "Feedback Session", "Improvement Plan", "Follow-up", "Status Update"] }
    ]
  }
];

const totalSOPs = departments.reduce((sum, d) => sum + d.sops.length, 0);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<typeof departments[0] | null>(null);
  const [expandedSOP, setExpandedSOP] = useState<string | null>(null);

  const filteredDepts = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    const q = searchQuery.toLowerCase();
    return departments.filter(d => 
      d.name.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q) ||
      d.sops.some(s => s.title.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-50 -top-64 -right-40" style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)', animation: 'float 25s ease-in-out infinite' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-50 -bottom-52 -left-40" style={{ background: 'linear-gradient(135deg, #B84CB8, #D86DCB)', animation: 'float 25s ease-in-out infinite', animationDelay: '-8s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-40 top-1/3 left-1/3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #B84CB8)', animation: 'float 25s ease-in-out infinite', animationDelay: '-16s' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(216, 109, 203, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 109, 203, 0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(60px, -60px) scale(1.1); } 50% { transform: translate(-40px, 40px) scale(0.95); } 75% { transform: translate(50px, 30px) scale(1.05); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 25px rgba(216, 109, 203, 0.3); } 50% { box-shadow: 0 0 50px rgba(216, 109, 203, 0.6), 0 0 80px rgba(139, 92, 246, 0.3); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.9); } }
        .space-grotesk { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 py-10 pb-24">
        {/* Header */}
        <header className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
          <div className="mb-6">
            <div className="space-grotesk text-5xl font-light tracking-[14px] bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent">ONE</div>
            <div className="space-grotesk text-[11px] tracking-[10px] text-white/50 uppercase mt-1">Development</div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-[13px] font-bold tracking-[4px] uppercase mb-7" style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.2), rgba(139, 92, 246, 0.15))', border: '1px solid rgba(216, 109, 203, 0.3)', color: '#D86DCB', animation: 'pulse-glow 3s ease-in-out infinite', backdropFilter: 'blur(10px)' }}>
            <span style={{ animation: 'spin 4s linear infinite' }}>⚡</span>
            GOD TIER EDITION
          </div>

          <h1 className="space-grotesk text-5xl md:text-7xl font-bold mb-5 leading-tight">
            <span className="bg-gradient-to-r from-white via-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent">SOP Command Center</span>
          </h1>
          
          <p className="text-lg text-white/70 max-w-[750px] mx-auto leading-relaxed">
            Enterprise-grade Standard Operating Procedures with complete process documentation, responsible stakeholders, KPIs, and interactive workflows for <span className="text-[#D86DCB] font-semibold">{departments.length} departments</span>.
          </p>
        </header>

        {/* Search */}
        <div className="max-w-[650px] mx-auto relative mb-12">
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D86DCB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search departments, SOPs, or keywords... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-5 pl-16 pr-7 rounded-[20px] text-base text-white placeholder:text-white/50 transition-all focus:outline-none"
            style={{ background: 'rgba(20, 20, 30, 0.6)', border: '1px solid rgba(216, 109, 203, 0.2)', backdropFilter: 'blur(20px)' }}
            onFocus={(e) => { e.target.style.borderColor = '#D86DCB'; e.target.style.boxShadow = '0 0 40px rgba(216, 109, 203, 0.3)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(216, 109, 203, 0.2)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-[900px] mx-auto mb-12">
          {[
            { value: totalSOPs, label: "Total SOPs" },
            { value: departments.length, label: "Departments" },
            { value: totalSOPs, label: "Process Flows" },
            { value: "100%", label: "RERA Compliant" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, borderColor: '#D86DCB', boxShadow: '0 20px 50px rgba(216, 109, 203, 0.25)' }}
              className="py-7 px-5 rounded-[20px] text-center transition-all duration-400"
              style={{ background: 'rgba(20, 20, 30, 0.6)', border: '1px solid rgba(216, 109, 203, 0.15)', backdropFilter: 'blur(20px)' }}
            >
              <div className="space-grotesk text-5xl font-bold bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-[11px] text-white/50 tracking-[2px] uppercase mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-5 my-14">
          <div className="w-36 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D86DCB, transparent)' }} />
          <div className="w-4 h-4 rotate-45" style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)', boxShadow: '0 0 30px rgba(216, 109, 203, 0.4)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <div className="w-36 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D86DCB, transparent)' }} />
        </div>

        {/* Section Title */}
        <h2 className="space-grotesk text-center text-[13px] font-semibold tracking-[5px] uppercase text-white/50 mb-12">Department SOPs</h2>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredDepts.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -12, scale: 1.02, borderColor: 'rgba(216, 109, 203, 0.5)', boxShadow: '0 30px 70px -20px rgba(216, 109, 203, 0.4)' }}
              className="relative p-8 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden group"
              style={{ background: 'rgba(20, 20, 30, 0.6)', border: '1px solid rgba(216, 109, 203, 0.12)', backdropFilter: 'blur(20px)' }}
              onClick={() => setSelectedDept(dept)}
            >
              {/* Top gradient bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, #D86DCB, #B84CB8, #8B5CF6)' }} />
              
              {/* Radial glow on hover */}
              <div className="absolute -inset-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(216, 109, 203, 0.08) 0%, transparent 40%)' }} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-[68px] h-[68px] rounded-[18px] flex items-center justify-center text-[32px] shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_15px_40px_rgba(216,109,203,0.5)]" style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.2), rgba(139, 92, 246, 0.15))', border: '1px solid rgba(216, 109, 203, 0.25)' }}>
                    {dept.icon}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-[10px] font-bold tracking-[2px] uppercase text-[#D86DCB] px-3 py-1.5 rounded-md mb-2" style={{ background: 'rgba(216, 109, 203, 0.12)' }}>{dept.id} DEPARTMENT</span>
                    <h3 className="space-grotesk text-xl font-semibold mb-1.5">{dept.name}</h3>
                    <p className="text-[13px] text-white/50">Process Owner: <strong className="text-[#D86DCB]">{dept.owner}</strong></p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-5 py-4 border-y border-white/5 mb-5">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#D86DCB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span className="text-[13px] text-white/70"><span className="font-bold text-white">{dept.sops.length}</span> SOPs</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#D86DCB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    <span className="text-[13px] text-white/70"><span className="font-bold text-white">{dept.sops.length}</span> Flows</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-[14px] text-sm font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #D86DCB, #B84CB8)', boxShadow: '0 6px 25px rgba(216, 109, 203, 0.35)' }}>
                    View All SOPs
                    <svg className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#00D26A] px-3.5 py-2 rounded-full" style={{ background: 'rgba(0, 210, 106, 0.1)', border: '1px solid rgba(0, 210, 106, 0.2)' }}>
                    <span className="w-2 h-2 rounded-full bg-[#00D26A]" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                    RERA Compliant
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-24 pt-12 border-t border-white/5">
          <div className="space-grotesk text-2xl font-medium bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent mb-3">ONE DEVELOPMENT</div>
          <p className="text-sm text-white/50 mb-2">Enterprise-Grade Standard Operating Procedures</p>
          <p className="text-sm text-white/50">Created with GOD TIER Precision</p>
          <div className="inline-flex items-center gap-2.5 mt-5 px-6 py-2.5 rounded-full text-[13px] text-[#D86DCB]" style={{ background: 'rgba(216, 109, 203, 0.1)', border: '1px solid rgba(216, 109, 203, 0.2)' }}>
            <span>⚡</span> January 2026 | Dubai, UAE
          </div>
        </footer>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
            style={{ background: 'rgba(10, 10, 15, 0.97)', backdropFilter: 'blur(15px)' }}
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="w-full max-w-[1100px] my-auto rounded-[28px] overflow-hidden"
              style={{ background: 'linear-gradient(180deg, rgba(25, 25, 35, 0.98) 0%, rgba(15, 15, 20, 0.98) 100%)', border: '1px solid rgba(216, 109, 203, 0.25)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 md:p-9 border-b border-white/5" style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.12), rgba(139, 92, 246, 0.08))' }}>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[18px] flex items-center justify-center text-[32px]" style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)', boxShadow: '0 15px 40px rgba(216, 109, 203, 0.4)' }}>
                    {selectedDept.icon}
                  </div>
                  <div>
                    <span className="space-grotesk text-xs font-bold tracking-[2px] text-[#D86DCB]">{selectedDept.id} DEPARTMENT</span>
                    <h2 className="space-grotesk text-2xl md:text-[28px] font-semibold mt-1">{selectedDept.name}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center transition-all hover:rotate-90"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-9">
                {/* Overview Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-[18px]" style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}>
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-3.5 flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      Department Overview
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">{selectedDept.description}</p>
                  </div>
                  <div className="p-6 rounded-[18px]" style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}>
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-3.5 flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Responsible Stakeholders
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedDept.responsible.map((r, i) => (
                        <span key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px]" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="p-6 rounded-[18px] mb-8" style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}>
                  <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    Key Performance Indicators
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedDept.kpis.map((kpi, i) => (
                      <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                        <div className="space-grotesk text-[22px] font-bold text-[#00D26A]">{kpi.value}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-[1px] mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOPs Section */}
                <div className="space-grotesk text-xs font-semibold tracking-[3px] uppercase text-white/50 mb-5 flex items-center gap-3">
                  Standard Operating Procedures ({selectedDept.sops.length})
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="space-y-3.5">
                  {selectedDept.sops.map((sop, i) => (
                    <div
                      key={sop.id}
                      className={`rounded-[18px] overflow-hidden transition-all duration-300 ${expandedSOP === sop.id ? 'border-[#D86DCB] shadow-[0_15px_50px_rgba(216,109,203,0.15)]' : 'border-white/5 hover:border-[rgba(216,109,203,0.3)] hover:bg-[rgba(216,109,203,0.04)]'}`}
                      style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid' }}
                    >
                      {/* SOP Header */}
                      <div
                        className="flex items-center gap-4 md:gap-5 p-5 md:p-6 cursor-pointer transition-colors hover:bg-[rgba(216,109,203,0.06)]"
                        onClick={() => setExpandedSOP(expandedSOP === sop.id ? null : sop.id)}
                      >
                        <div className="w-11 h-11 md:w-[46px] md:h-[46px] rounded-[14px] flex items-center justify-center shrink-0 space-grotesk text-base font-bold text-[#D86DCB]" style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(216, 109, 203, 0.2)' }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="space-grotesk text-[11px] font-semibold tracking-[1.5px] text-white/50 mb-1">{sop.id}</div>
                          <div className="text-[15px] font-medium truncate">{sop.title}</div>
                        </div>
                        <button className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-all ${expandedSOP === sop.id ? 'bg-[#D86DCB] text-white' : 'bg-white/5 text-white/50'}`}>
                          <svg className={`w-[18px] h-[18px] transition-transform ${expandedSOP === sop.id ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                      </div>

                      {/* SOP Details */}
                      <AnimatePresence>
                        {expandedSOP === sop.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 md:px-6 pb-6 border-t border-white/5">
                              {/* Purpose */}
                              <div className="my-5 p-4 md:p-5 rounded-r-[14px]" style={{ background: 'rgba(139, 92, 246, 0.08)', borderLeft: '3px solid #8B5CF6' }}>
                                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#8B5CF6] mb-2.5">Purpose & Objective</h5>
                                <p className="text-sm text-white/70 leading-relaxed">{sop.purpose}</p>
                              </div>

                              {/* Meta Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
                                {[
                                  { label: 'Process Owner', value: sop.owner, color: '#D86DCB' },
                                  { label: 'Version', value: sop.version, color: 'white' },
                                  { label: 'Target', value: sop.kpis.target, color: '#00D26A' },
                                  { label: 'Accuracy', value: sop.kpis.accuracy, color: '#00D26A' },
                                  { label: 'SLA', value: sop.kpis.sla, color: 'white' },
                                  { label: 'Status', value: 'Active', color: '#00D26A' }
                                ].map((item, j) => (
                                  <div key={j} className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                    <div className="text-[10px] font-semibold tracking-[1px] uppercase text-white/50 mb-1.5">{item.label}</div>
                                    <div className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Process Flow */}
                              <div className="p-5 md:p-6 rounded-[16px] my-5" style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.06), rgba(139, 92, 246, 0.04))', border: '1px solid rgba(216, 109, 203, 0.12)' }}>
                                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#D86DCB] mb-5 flex items-center gap-2.5">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                                  Interactive Process Flow
                                </h5>
                                <div className="flex flex-wrap items-center gap-3">
                                  {sop.flow.map((step, j) => (
                                    <div key={j} className="contents">
                                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] transition-all hover:-translate-y-0.5 hover:bg-[rgba(216,109,203,0.1)] hover:border-[#D86DCB]" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                        <span className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)' }}>{j + 1}</span>
                                        {step}
                                      </div>
                                      {j < sop.flow.length - 1 && <span className="text-[#D86DCB] text-lg">➔</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-wrap gap-3.5 mt-6">
                                <button className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #D86DCB, #B84CB8)', boxShadow: '0 6px 25px rgba(216, 109, 203, 0.3)' }}>
                                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                                  View Full Process Flow
                                </button>
                                <button className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] text-sm font-semibold text-[#00D26A]" style={{ background: 'rgba(0, 210, 106, 0.1)', border: '1px solid rgba(0, 210, 106, 0.25)' }}>
                                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                  Download DOCX
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
