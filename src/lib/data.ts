// GOD TIER SOP Data - ONE Development
// Complete enterprise-grade SOP documentation

export interface SOP {
  id: string;
  title: string;
  owner: string;
  version: string;
  purpose: string;
  kpis: {
    target: string;
    accuracy: string;
    sla: string;
  };
  flow: string[];
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  owner: string;
  description: string;
  kpis: { value: string; label: string }[];
  responsible: string[];
  sops: SOP[];
}

export const departments: Department[] = [
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
      {
        id: "SOP-SALES-001",
        title: "Customer Booking & URRF Processing",
        owner: "Head of Sales Operations",
        version: "V1.0",
        purpose: "Establishes the standardized process for converting qualified leads into confirmed bookings through the URRF system, ensuring 100% RERA compliance with URRF submission within 72 hours.",
        kpis: { target: "100%", accuracy: "99.9%", sla: "<48h" },
        flow: ["Customer Confirms Unit", "Verify Documentation", "Collect Booking Deposit", "Generate URRF", "Digital Signatures", "DLD Molak Submission", "Collections Handoff", "SPA Trigger"]
      },
      {
        id: "SOP-SALES-002",
        title: "Sales Agreement Preparation & Execution",
        owner: "Sales Manager",
        version: "V1.0",
        purpose: "Defines the end-to-end process for preparing, reviewing, and executing Sales Purchase Agreements (SPAs) in compliance with RERA Law and DLD regulations.",
        kpis: { target: "30 days", accuracy: "100%", sla: "<14 days" },
        flow: ["SPA Request Received", "Legal Review", "Customer Verification", "Draft SPA", "Internal Approval", "Customer Review", "Final Execution", "DLD Registration"]
      },
      {
        id: "SOP-SALES-003",
        title: "Sales Offer Generation & Pricing Management",
        owner: "Sales Manager",
        version: "V1.0",
        purpose: "Standardizes the creation of sales offers and quotations, ensuring pricing accuracy, discount approval workflows, and real-time price list management.",
        kpis: { target: "99%", accuracy: "100%", sla: "<2h" },
        flow: ["Price Request", "Check Availability", "Apply Payment Plan", "Calculate Discounts", "Manager Approval", "Generate Quote", "Customer Presentation", "Quote Acceptance"]
      },
      {
        id: "SOP-SALES-004",
        title: "Cross-Department Handoffs & Status Updates",
        owner: "Sales Operations",
        version: "V1.0",
        purpose: "Establishes protocols for seamless handoffs between Sales, Collections, Legal, and Customer Service departments with real-time status tracking.",
        kpis: { target: "<1h", accuracy: "100%", sla: "Real-time" },
        flow: ["Sales Closes Deal", "Update Salesforce", "Notify Collections", "Trigger Legal Process", "Customer Service Alert", "Finance Notification", "Status Dashboard Update"]
      },
      {
        id: "SOP-SALES-005",
        title: "Discount Approval & Pricing Exceptions",
        owner: "Head of Sales",
        version: "V1.0",
        purpose: "Defines the approval matrix for pricing deviations, special discounts, and bulk purchase arrangements with complete audit trails.",
        kpis: { target: "<3%", accuracy: "100%", sla: "<4h" },
        flow: ["Discount Request", "Check Threshold", "Route to Approver", "Manager Review", "CCO Approval (>10%)", "Document Approval", "Apply to Quote", "Audit Log Entry"]
      }
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
      {
        id: "SOP-BROK-001",
        title: "Commission Calculation & Payment",
        owner: "Head of Broker Relations",
        version: "V1.0",
        purpose: "Establishes standardized procedures for calculating, processing, and disbursing broker commissions in compliance with RERA regulations, ensuring 100% accuracy and timely payments.",
        kpis: { target: "99.5%", accuracy: "100%", sla: "<7 days" },
        flow: ["Deal Closure", "Milestone Verification", "Calculate Commission", "Apply Adjustments", "Approval Workflow", "Generate Statement", "Execute Payment", "Send Confirmation"]
      },
      {
        id: "SOP-BROK-002",
        title: "Broker Registration & Onboarding",
        owner: "Channel Manager",
        version: "V1.0",
        purpose: "Defines the complete process for registering new brokers, verifying RERA credentials, executing agreements, and providing system access.",
        kpis: { target: "<3 days", accuracy: "100%", sla: "<48h" },
        flow: ["Application Received", "RERA License Check", "Background Verification", "Agreement Signing", "System Access Setup", "Portal Training", "Go-Live Activation"]
      },
      {
        id: "SOP-BROK-003",
        title: "Deal Registration & Conflict Resolution",
        owner: "Channel Manager",
        version: "V1.0",
        purpose: "Standardizes the deal registration process to prevent conflicts, manage client protection periods, and resolve disputes fairly.",
        kpis: { target: "<48h", accuracy: "100%", sla: "<24h" },
        flow: ["Submit Registration", "Duplicate Check", "Assign DRN", "Protection Period Start", "Conflict Detection", "Dispute Resolution", "Commission Assignment"]
      },
      {
        id: "SOP-BROK-004",
        title: "Channel Pricing & Incentive Programs",
        owner: "Head of Sales",
        version: "V1.0",
        purpose: "Manages broker incentive programs, volume bonuses, and special campaign structures to drive performance.",
        kpis: { target: "15%", accuracy: "100%", sla: "Monthly" },
        flow: ["Define Program", "Set Targets", "Configure System", "Communicate Brokers", "Track Performance", "Calculate Bonuses", "Disburse Incentives"]
      },
      {
        id: "SOP-BROK-005",
        title: "Broker Compliance & RERA Requirements",
        owner: "Compliance Officer",
        version: "V1.0",
        purpose: "Ensures all brokers maintain valid RERA licenses, comply with regulations, and meet audit requirements.",
        kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" },
        flow: ["License Monitoring", "Expiry Alerts", "Compliance Audit", "Violation Handling", "RERA Reporting", "License Renewal", "Status Update"]
      }
    ]
  },
  {
    id: "COLL",
    name: "Collections Department",
    icon: "💰",
    owner: "Head of Collections",
    description: "Handles payment collections, PDC management, late payment penalties, and payment plan modifications with complete escrow compliance.",
    kpis: [
      { value: "95%", label: "Collection Rate" },
      { value: "<2%", label: "Default Rate" },
      { value: "100%", label: "Escrow Accuracy" },
      { value: "<24h", label: "Processing Time" }
    ],
    responsible: ["Head of Collections", "Collections Manager", "Collections Officer", "Finance Manager", "Legal Department"],
    sops: [
      {
        id: "SOP-COLL-001",
        title: "Payment Schedule Management",
        owner: "Collections Manager",
        version: "V1.0",
        purpose: "Manages customer payment schedules, generates automated reminders, tracks installments, and maintains accurate payment records in Salesforce.",
        kpis: { target: "100%", accuracy: "99%", sla: "<24h" },
        flow: ["Schedule Creation", "Payment Due Alerts", "Reminder Automation", "Payment Receipt", "Reconciliation", "Status Update", "Customer Notification"]
      },
      {
        id: "SOP-COLL-002",
        title: "PDC Management & Banking",
        owner: "Collections Manager",
        version: "V1.0",
        purpose: "Handles post-dated cheque collection, secure storage, timely bank deposit, and bounce management with full audit trail.",
        kpis: { target: "100%", accuracy: "99.9%", sla: "<48h" },
        flow: ["Cheque Receipt", "Verification", "Safe Storage", "Pre-Deposit Alert", "Bank Deposit", "Clearance Check", "Bounce Handling", "Customer Contact"]
      },
      {
        id: "SOP-COLL-003",
        title: "Late Payment Penalty Assessment",
        owner: "Collections Manager",
        version: "V1.0",
        purpose: "Calculates and applies late payment penalties as per contract terms and RERA guidelines with transparent customer communication.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Payment Overdue", "Grace Period Check", "Calculate Penalty", "Customer Notification", "Apply Penalty", "Update Records", "Escalation if Needed"]
      },
      {
        id: "SOP-COLL-004",
        title: "Collections Escalation Process",
        owner: "Head of Finance",
        version: "V1.0",
        purpose: "Defines escalation procedures for overdue accounts including legal action initiation with proper documentation.",
        kpis: { target: "<5%", accuracy: "100%", sla: "<72h" },
        flow: ["Aging Analysis", "First Escalation", "Manager Call", "Demand Letter", "Legal Notice", "Legal Action", "Recovery Execution"]
      },
      {
        id: "SOP-COLL-005",
        title: "Payment Plan Modification",
        owner: "Collections Manager",
        version: "V1.0",
        purpose: "Handles customer requests for payment plan changes with proper approval workflows and legal documentation.",
        kpis: { target: "<5 days", accuracy: "100%", sla: "<48h" },
        flow: ["Request Received", "Assessment", "Approval Routing", "Legal Review", "New Schedule", "Documentation", "Customer Confirmation"]
      }
    ]
  },
  {
    id: "CRM",
    name: "Customer Service",
    icon: "💬",
    owner: "Head of Customer Service",
    description: "Manages customer inquiries, complaints, ownership transfers, RERA complaints, and NOC requests with excellence.",
    kpis: [
      { value: "<4h", label: "Response Time" },
      { value: "95%", label: "Resolution Rate" },
      { value: "4.8/5", label: "CSAT Score" },
      { value: "<2%", label: "Escalation Rate" }
    ],
    responsible: ["Head of Customer Service", "CRM Manager", "Customer Service Representatives", "Legal Coordinator", "Compliance Officer"],
    sops: [
      {
        id: "SOP-CRM-001",
        title: "RERA Complaint Handling & Resolution",
        owner: "CRM Manager",
        version: "V1.0",
        purpose: "Manages RERA-escalated complaints with full regulatory compliance, timely resolution, and complete documentation.",
        kpis: { target: "100%", accuracy: "100%", sla: "<72h" },
        flow: ["RERA Notice", "Case Creation", "Investigation", "Response Draft", "Legal Review", "RERA Submission", "Resolution", "Case Closure"]
      },
      {
        id: "SOP-CRM-002",
        title: "Ownership Transfer & Name Change",
        owner: "CRM Manager",
        version: "V1.0",
        purpose: "Handles property ownership transfers and name changes with DLD compliance and complete documentation.",
        kpis: { target: "<14 days", accuracy: "100%", sla: "<7 days" },
        flow: ["Request Received", "Document Verification", "Fee Calculation", "Approval Workflow", "DLD Submission", "New Title Deed", "Customer Handover"]
      },
      {
        id: "SOP-CRM-003",
        title: "Payment Inquiry & Receipt Management",
        owner: "CRM Manager",
        version: "V1.0",
        purpose: "Handles customer payment inquiries and generates official receipts with accurate financial records.",
        kpis: { target: "<4h", accuracy: "100%", sla: "<2h" },
        flow: ["Inquiry Received", "Account Lookup", "Payment Verification", "Generate Statement", "Issue Receipt", "Customer Delivery"]
      },
      {
        id: "SOP-CRM-004",
        title: "Customer Inquiry & Complaint Management",
        owner: "CRM Manager",
        version: "V1.0",
        purpose: "Manages all customer inquiries and complaints with SLA tracking and satisfaction measurement.",
        kpis: { target: "95%", accuracy: "100%", sla: "<24h" },
        flow: ["Ticket Creation", "Categorization", "Assignment", "Investigation", "Resolution", "Customer Update", "Satisfaction Survey", "Case Closure"]
      },
      {
        id: "SOP-CRM-005",
        title: "NOC Request Processing",
        owner: "CRM Manager",
        version: "V1.0",
        purpose: "Processes No Objection Certificate requests for various purposes including resale, mortgage, and fit-out.",
        kpis: { target: "<5 days", accuracy: "100%", sla: "<3 days" },
        flow: ["NOC Request", "Eligibility Check", "Outstanding Verification", "Approval", "NOC Generation", "Customer Collection"]
      }
    ]
  },
  {
    id: "FIN",
    name: "Finance Department",
    icon: "📈",
    owner: "Chief Financial Officer",
    description: "Handles revenue recognition, escrow management, financial reporting, reconciliation, and tax compliance per IFRS standards.",
    kpis: [
      { value: ">99%", label: "Accuracy" },
      { value: "100%", label: "IFRS Compliance" },
      { value: "0", label: "Audit Findings" },
      { value: "<5 days", label: "Month Close" }
    ],
    responsible: ["Chief Financial Officer", "Finance Manager", "Revenue Accountant", "Tax Manager", "Financial Controller"],
    sops: [
      {
        id: "SOP-FIN-001",
        title: "Revenue Recognition (IFRS 15)",
        owner: "CFO",
        version: "V1.0",
        purpose: "Establishes standardized procedures for revenue recognition in accordance with IFRS 15 for all real estate development projects.",
        kpis: { target: ">99%", accuracy: "100%", sla: "<48h" },
        flow: ["Contract Identification", "Performance Obligations", "Transaction Price", "Price Allocation", "POC Calculation", "Revenue Journal", "Variance Analysis", "Audit Trail"]
      },
      {
        id: "SOP-FIN-002",
        title: "Escrow Account Management",
        owner: "Finance Manager",
        version: "V1.0",
        purpose: "Manages DLD-registered escrow accounts ensuring 100% regulatory compliance with daily reconciliation.",
        kpis: { target: "100%", accuracy: "100%", sla: "Daily" },
        flow: ["Deposit Receipt", "Account Allocation", "DLD Reconciliation", "Withdrawal Request", "Approval Workflow", "Fund Release", "Audit Report"]
      },
      {
        id: "SOP-FIN-003",
        title: "Financial Reporting & Compliance",
        owner: "CFO",
        version: "V1.0",
        purpose: "Ensures timely and accurate financial reporting meeting all regulatory requirements and board expectations.",
        kpis: { target: "100%", accuracy: "100%", sla: "Monthly" },
        flow: ["Data Collection", "Trial Balance", "Adjustments", "Report Generation", "Management Review", "Board Approval", "Regulatory Filing"]
      },
      {
        id: "SOP-FIN-004",
        title: "Payment Reconciliation & Variance Analysis",
        owner: "Finance Manager",
        version: "V1.0",
        purpose: "Reconciles all payment transactions and investigates variances with root cause analysis.",
        kpis: { target: "<1%", accuracy: "100%", sla: "Daily" },
        flow: ["Extract Transactions", "Bank Statement Match", "Variance Identification", "Investigation", "Adjustment Entry", "Approval", "Report Generation"]
      },
      {
        id: "SOP-FIN-005",
        title: "Tax Compliance (VAT & Corporate)",
        owner: "Tax Manager",
        version: "V1.0",
        purpose: "Ensures compliance with UAE VAT and corporate tax requirements with timely filing.",
        kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" },
        flow: ["Transaction Analysis", "VAT Calculation", "Input Tax Credit", "Return Preparation", "Management Review", "FTA Submission", "Payment Processing"]
      }
    ]
  },
  {
    id: "HAND",
    name: "Handover Department",
    icon: "🔑",
    owner: "Head of Handover",
    description: "Manages unit inspections, snagging, handover scheduling, completion certificates, and defect tracking for customer delight.",
    kpis: [
      { value: ">85%", label: "First Pass Rate" },
      { value: "<7 days", label: "Snagging Time" },
      { value: ">4.5/5", label: "CSAT Score" },
      { value: ">60%", label: "Zero Defect" }
    ],
    responsible: ["Handover Manager", "Senior Inspector", "Inspector", "Technical Coordinator", "Customer Service"],
    sops: [
      {
        id: "SOP-HAND-001",
        title: "Unit Inspection & Snagging Management",
        owner: "Handover Manager",
        version: "V2.0",
        purpose: "Establishes procedures for comprehensive unit inspections, snagging lists, and quality control before customer handover.",
        kpis: { target: ">85%", accuracy: "100%", sla: "<48h" },
        flow: ["Schedule Inspection", "Pre-Inspection Prep", "Conduct Inspection", "Generate Snagging List", "Contractor Assignment", "Rectification", "Re-Inspection", "Sign-Off"]
      },
      {
        id: "SOP-HAND-002",
        title: "Handover Appointment Scheduling",
        owner: "Handover Manager",
        version: "V1.0",
        purpose: "Manages customer handover appointments with efficient scheduling and customer communication.",
        kpis: { target: "95%", accuracy: "100%", sla: "<24h" },
        flow: ["Customer Contact", "Availability Check", "Schedule Appointment", "Confirmation SMS", "Reminder 48h", "Reschedule if Needed", "Appointment Execution"]
      },
      {
        id: "SOP-HAND-003",
        title: "Completion Certificate & NOC Processing",
        owner: "Handover Manager",
        version: "V1.0",
        purpose: "Obtains Dubai Municipality completion certificates and required NOCs for unit handover.",
        kpis: { target: "100%", accuracy: "100%", sla: "<14 days" },
        flow: ["Pre-Submission Check", "Document Compilation", "DM Submission", "Inspection Coordination", "Certificate Receipt", "NOC Processing", "Customer Notification"]
      },
      {
        id: "SOP-HAND-004",
        title: "Keys & Documentation Handover",
        owner: "Handover Manager",
        version: "V1.0",
        purpose: "Executes the final handover of keys and documentation to customers with memorable experience.",
        kpis: { target: "100%", accuracy: "100%", sla: "<2h" },
        flow: ["Final Inspection", "Documentation Pack", "Key Preparation", "Customer Briefing", "Handover Execution", "Sign-Off", "System Update", "Welcome Kit"]
      },
      {
        id: "SOP-HAND-005",
        title: "Defect Rectification Tracking",
        owner: "Handover Manager",
        version: "V1.0",
        purpose: "Tracks and manages defect rectification during warranty period with contractor accountability.",
        kpis: { target: "<7 days", accuracy: "100%", sla: "<72h" },
        flow: ["Defect Report", "Categorization", "Contractor Assignment", "SLA Tracking", "Rectification", "Quality Check", "Customer Confirmation", "Case Closure"]
      }
    ]
  },
  {
    id: "LEAD",
    name: "Lead Management",
    icon: "🎯",
    owner: "Head of Marketing Operations",
    description: "Manages lead capture, qualification, scoring, assignment, nurturing, and conversion tracking for sales pipeline optimization.",
    kpis: [
      { value: "100%", label: "Capture Rate" },
      { value: "<2 min", label: "Processing" },
      { value: "<2%", label: "Duplicate Rate" },
      { value: ">95%", label: "Data Quality" }
    ],
    responsible: ["Head of Marketing Operations", "Marketing Manager", "Sales Operations", "Digital Marketing Team", "Inside Sales"],
    sops: [
      {
        id: "SOP-LEAD-001",
        title: "Lead Capture & Source Attribution",
        owner: "Marketing Manager",
        version: "V1.0",
        purpose: "Captures leads across all channels with accurate source attribution for marketing ROI analysis and optimization.",
        kpis: { target: "100%", accuracy: "100%", sla: "<2 min" },
        flow: ["Lead Ingestion", "Source Detection", "UTM Parsing", "Duplicate Check", "Enrichment", "CRM Creation", "Attribution Log", "Routing Trigger"]
      },
      {
        id: "SOP-LEAD-002",
        title: "Lead Qualification & Scoring",
        owner: "Sales Operations",
        version: "V1.0",
        purpose: "Qualifies and scores leads using defined criteria to prioritize sales efforts and improve conversion.",
        kpis: { target: "100%", accuracy: ">90%", sla: "<4h" },
        flow: ["Lead Receipt", "Data Validation", "BANT Assessment", "Score Calculation", "Priority Assignment", "Quality Gate", "Sales Notification"]
      },
      {
        id: "SOP-LEAD-003",
        title: "Lead Assignment & Distribution",
        owner: "Sales Operations",
        version: "V1.0",
        purpose: "Distributes qualified leads to sales agents using round-robin and skill-based routing for optimal coverage.",
        kpis: { target: "<5 min", accuracy: "100%", sla: "<15 min" },
        flow: ["Qualification Complete", "Agent Availability", "Match Criteria", "Assignment", "Agent Notification", "Response Tracking", "Reassignment if Needed"]
      },
      {
        id: "SOP-LEAD-004",
        title: "Lead Nurturing & Follow-Up Campaigns",
        owner: "Marketing Manager",
        version: "V1.0",
        purpose: "Nurtures leads through automated campaigns until sales-ready with personalized content journeys.",
        kpis: { target: ">25%", accuracy: "100%", sla: "Automated" },
        flow: ["Lead Segmentation", "Journey Assignment", "Content Delivery", "Engagement Tracking", "Score Update", "Sales Alert", "Conversion Handoff"]
      },
      {
        id: "SOP-LEAD-005",
        title: "Lead Conversion Tracking & Analytics",
        owner: "Sales Operations",
        version: "V1.0",
        purpose: "Tracks lead conversion metrics and provides actionable analytics for continuous improvement.",
        kpis: { target: ">25%", accuracy: "100%", sla: "Real-time" },
        flow: ["Data Collection", "Funnel Analysis", "Conversion Attribution", "Channel Performance", "Report Generation", "Insight Delivery", "Optimization"]
      }
    ]
  },
  {
    id: "INV",
    name: "Inventory Management",
    icon: "📦",
    owner: "Head of Inventory Management",
    description: "Manages unit availability, reservations, pricing strategies, allocation, and project phase launches with real-time accuracy.",
    kpis: [
      { value: "99.99%", label: "Accuracy" },
      { value: "<30s", label: "Sync Time" },
      { value: "0", label: "Double Booking" },
      { value: "24/7", label: "Availability" }
    ],
    responsible: ["Head of Inventory Management", "Inventory Controllers", "Sales Operations", "System Administrators", "Channel Managers"],
    sops: [
      {
        id: "SOP-INV-001",
        title: "Inventory Status & Availability Tracking",
        owner: "Head of Inventory",
        version: "V1.0",
        purpose: "Maintains real-time inventory status across all channels with zero double-booking incidents and instant sync.",
        kpis: { target: "99.99%", accuracy: "100%", sla: "<30s" },
        flow: ["Status Change Request", "Validation", "Lock Mechanism", "Update All Channels", "Sync Verification", "Audit Log", "Dashboard Refresh"]
      },
      {
        id: "SOP-INV-002",
        title: "Unit Reservation & Hold Management",
        owner: "Inventory Manager",
        version: "V1.0",
        purpose: "Manages unit holds and reservations with automatic expiry handling and customer communication.",
        kpis: { target: "100%", accuracy: "100%", sla: "90 min" },
        flow: ["Hold Request", "Availability Check", "Apply Hold", "Timer Start", "Extension Request", "Expiry Processing", "Status Release"]
      },
      {
        id: "SOP-INV-003",
        title: "Inventory Pricing & Release Strategy",
        owner: "Head of Sales",
        version: "V1.0",
        purpose: "Manages pricing strategies and phased inventory releases for optimal revenue and absorption.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Pricing Decision", "Configure Price List", "Phase Definition", "Release Schedule", "Channel Distribution", "Performance Monitoring", "Price Adjustments"]
      },
      {
        id: "SOP-INV-004",
        title: "Inventory Allocation & Distribution",
        owner: "Inventory Manager",
        version: "V1.0",
        purpose: "Allocates inventory across sales channels based on performance and strategic priorities.",
        kpis: { target: "100%", accuracy: "100%", sla: "Weekly" },
        flow: ["Channel Analysis", "Allocation Decision", "Pool Creation", "Channel Assignment", "Notification", "Performance Tracking", "Reallocation"]
      },
      {
        id: "SOP-INV-005",
        title: "Project Phase Management & Launches",
        owner: "Project Director",
        version: "V1.0",
        purpose: "Manages project phase launches with coordinated go-to-market activities and inventory preparation.",
        kpis: { target: "100%", accuracy: "100%", sla: "<48h" },
        flow: ["Phase Planning", "Inventory Preparation", "Pricing Approval", "Marketing Alignment", "System Configuration", "Launch Execution", "Post-Launch Review"]
      }
    ]
  },
  {
    id: "DEV",
    name: "Development",
    icon: "🏗️",
    owner: "Head of Development",
    description: "Oversees project planning, construction management, quality control, and regulatory approvals for world-class developments.",
    kpis: [
      { value: "100%", label: "On Schedule" },
      { value: "<5%", label: "Cost Variance" },
      { value: "100%", label: "Quality Score" },
      { value: "100%", label: "Compliance" }
    ],
    responsible: ["Development Manager", "Project Manager", "Design Manager", "Construction Manager", "Quality Manager"],
    sops: [
      {
        id: "SOP-DEV-001",
        title: "Project Planning & Feasibility Assessment",
        owner: "Development Manager",
        version: "V1.0",
        purpose: "Evaluates project feasibility and creates comprehensive project plans with financial modeling.",
        kpis: { target: "100%", accuracy: ">90%", sla: "<30 days" },
        flow: ["Market Analysis", "Site Assessment", "Financial Modeling", "Risk Analysis", "Feasibility Report", "Board Approval", "Project Initiation"]
      },
      {
        id: "SOP-DEV-002",
        title: "Construction Tender & Contract Management",
        owner: "Development Manager",
        version: "V1.0",
        purpose: "Manages contractor selection and contract administration with performance accountability.",
        kpis: { target: "100%", accuracy: "100%", sla: "<45 days" },
        flow: ["Tender Preparation", "Contractor Prequalification", "Bid Evaluation", "Negotiation", "Contract Award", "Performance Monitoring", "Variation Management"]
      },
      {
        id: "SOP-DEV-003",
        title: "Construction Progress Monitoring & QC",
        owner: "Project Manager",
        version: "V1.0",
        purpose: "Monitors construction progress and ensures quality standards with regular site inspections.",
        kpis: { target: "100%", accuracy: "100%", sla: "Weekly" },
        flow: ["Daily Reports", "Progress Measurement", "Quality Inspections", "Issue Resolution", "Milestone Verification", "Stakeholder Updates", "Corrective Actions"]
      },
      {
        id: "SOP-DEV-004",
        title: "Design Management & Consultant Coordination",
        owner: "Design Manager",
        version: "V1.0",
        purpose: "Coordinates design consultants and manages design changes with value engineering.",
        kpis: { target: "100%", accuracy: "100%", sla: "<14 days" },
        flow: ["Brief Development", "Consultant Briefing", "Design Review", "Change Management", "Value Engineering", "Approval Workflow", "Documentation"]
      },
      {
        id: "SOP-DEV-005",
        title: "Regulatory Approvals & Permit Management",
        owner: "Development Manager",
        version: "V1.0",
        purpose: "Obtains all required regulatory approvals and permits with proactive authority management.",
        kpis: { target: "100%", accuracy: "100%", sla: "<60 days" },
        flow: ["Requirements Analysis", "Document Preparation", "Authority Submission", "Query Resolution", "Approval Receipt", "Permit Management", "Renewal Tracking"]
      }
    ]
  },
  {
    id: "HR",
    name: "Human Resources",
    icon: "👥",
    owner: "Head of HR",
    description: "Handles recruitment, onboarding, performance management, leave management, and employee separation with people-first approach.",
    kpis: [
      { value: "<30 days", label: "Time to Hire" },
      { value: ">90%", label: "Retention Rate" },
      { value: "100%", label: "Compliance" },
      { value: ">4.5/5", label: "Employee Sat" }
    ],
    responsible: ["Head of HR", "HR Manager", "Recruitment Specialist", "HR Coordinator", "Payroll Manager"],
    sops: [
      {
        id: "SOP-HR-001",
        title: "Recruitment & Selection Process",
        owner: "HR Manager",
        version: "V1.0",
        purpose: "Manages end-to-end recruitment from requisition to offer acceptance with quality hiring.",
        kpis: { target: "<30 days", accuracy: "100%", sla: "<21 days" },
        flow: ["Requisition Approval", "Job Posting", "Screening", "Interviews", "Assessment", "Reference Check", "Offer Letter", "Acceptance"]
      },
      {
        id: "SOP-HR-002",
        title: "Employee Onboarding & Orientation",
        owner: "HR Manager",
        version: "V1.0",
        purpose: "Ensures smooth onboarding for new employees with comprehensive orientation program.",
        kpis: { target: "100%", accuracy: "100%", sla: "<5 days" },
        flow: ["Pre-Joining", "Day 1 Setup", "Orientation Program", "Department Induction", "System Access", "Probation Goals", "Feedback Collection"]
      },
      {
        id: "SOP-HR-003",
        title: "Performance Management & Appraisal",
        owner: "HR Manager",
        version: "V1.0",
        purpose: "Manages performance reviews and development planning with continuous feedback.",
        kpis: { target: "100%", accuracy: "100%", sla: "Annual" },
        flow: ["Goal Setting", "Quarterly Review", "Mid-Year Check", "Annual Appraisal", "Rating Calibration", "Feedback Delivery", "Development Plan"]
      },
      {
        id: "SOP-HR-004",
        title: "Leave Management & Attendance",
        owner: "HR Coordinator",
        version: "V1.0",
        purpose: "Manages employee leave requests and attendance tracking with payroll integration.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Leave Request", "Balance Check", "Manager Approval", "System Update", "Payroll Integration", "Attendance Tracking", "Reports Generation"]
      },
      {
        id: "SOP-HR-005",
        title: "Employee Separation & Offboarding",
        owner: "HR Manager",
        version: "V1.0",
        purpose: "Manages employee exits and final settlements with knowledge transfer.",
        kpis: { target: "100%", accuracy: "100%", sla: "<14 days" },
        flow: ["Resignation Receipt", "Exit Interview", "Clearance Process", "Final Settlement", "Experience Letter", "Access Revocation", "Knowledge Transfer"]
      }
    ]
  },
  {
    id: "IT",
    name: "Information Technology",
    icon: "💻",
    owner: "IT Director",
    description: "Manages Salesforce configuration, user access, system integration, data backup, and IT service requests with enterprise security.",
    kpis: [
      { value: "99.9%", label: "Uptime" },
      { value: "<4h", label: "Response Time" },
      { value: "100%", label: "Security Score" },
      { value: "<24h", label: "Request SLA" }
    ],
    responsible: ["IT Director", "IT Manager", "System Administrator", "Database Administrator", "IT Support"],
    sops: [
      {
        id: "SOP-IT-001",
        title: "Salesforce Configuration Change Management",
        owner: "IT Manager",
        version: "V1.0",
        purpose: "Manages Salesforce configuration changes with proper governance and testing.",
        kpis: { target: "100%", accuracy: "100%", sla: "<48h" },
        flow: ["Change Request", "Impact Analysis", "Approval", "Sandbox Testing", "User Acceptance", "Production Deploy", "Post-Deploy Review"]
      },
      {
        id: "SOP-IT-002",
        title: "User Access Provisioning & De-provisioning",
        owner: "IT Manager",
        version: "V1.0",
        purpose: "Manages user access lifecycle across all systems with security compliance.",
        kpis: { target: "<24h", accuracy: "100%", sla: "<4h" },
        flow: ["Access Request", "Manager Approval", "Role Assignment", "Account Creation", "Access Grant", "Periodic Review", "Access Revocation"]
      },
      {
        id: "SOP-IT-003",
        title: "System Integration & API Management",
        owner: "IT Manager",
        version: "V1.0",
        purpose: "Manages system integrations and API connections with security and monitoring.",
        kpis: { target: "99.9%", accuracy: "100%", sla: "<4h" },
        flow: ["Integration Request", "Technical Design", "Development", "Testing", "Security Review", "Deployment", "Monitoring"]
      },
      {
        id: "SOP-IT-004",
        title: "Data Backup & Disaster Recovery",
        owner: "IT Director",
        version: "V1.0",
        purpose: "Ensures data protection and business continuity with tested recovery procedures.",
        kpis: { target: "100%", accuracy: "100%", sla: "<4h RTO" },
        flow: ["Backup Schedule", "Automated Backup", "Verification", "Offsite Storage", "DR Testing", "Recovery Procedure", "Documentation"]
      },
      {
        id: "SOP-IT-005",
        title: "IT Service Request Management",
        owner: "IT Manager",
        version: "V1.0",
        purpose: "Manages IT support requests and incidents with SLA tracking.",
        kpis: { target: ">95%", accuracy: "100%", sla: "<24h" },
        flow: ["Ticket Creation", "Categorization", "Priority Assignment", "Assignment", "Resolution", "User Confirmation", "Ticket Closure"]
      }
    ]
  },
  {
    id: "LEG",
    name: "Legal Department",
    icon: "⚖️",
    owner: "Legal Director",
    description: "Handles contract review, litigation management, corporate governance, and IP management with risk mitigation.",
    kpis: [
      { value: "<48h", label: "Contract Review" },
      { value: "100%", label: "Compliance" },
      { value: "<5%", label: "Dispute Rate" },
      { value: "100%", label: "IP Protected" }
    ],
    responsible: ["Legal Director", "Legal Manager", "Legal Coordinator", "Contracts Specialist", "Compliance Officer"],
    sops: [
      {
        id: "SOP-LEG-001",
        title: "Contract Review & Approval",
        owner: "Legal Manager",
        version: "V1.0",
        purpose: "Reviews and approves all commercial contracts with risk assessment and negotiation support.",
        kpis: { target: "<48h", accuracy: "100%", sla: "<24h" },
        flow: ["Contract Receipt", "Risk Assessment", "Legal Review", "Markup", "Negotiation", "Final Approval", "Execution", "Archive"]
      },
      {
        id: "SOP-LEG-002",
        title: "Litigation & Dispute Management",
        owner: "Legal Director",
        version: "V1.0",
        purpose: "Manages litigation and dispute resolution with strategic case management.",
        kpis: { target: "<5%", accuracy: "100%", sla: "<72h" },
        flow: ["Dispute Receipt", "Case Assessment", "Strategy Development", "Negotiation", "Mediation/Arbitration", "Court Proceedings", "Resolution", "Lessons Learned"]
      },
      {
        id: "SOP-LEG-003",
        title: "Corporate Governance & Compliance",
        owner: "Legal Director",
        version: "V1.0",
        purpose: "Ensures corporate governance compliance with regulatory monitoring.",
        kpis: { target: "100%", accuracy: "100%", sla: "Quarterly" },
        flow: ["Regulatory Monitoring", "Gap Analysis", "Policy Update", "Board Reporting", "Compliance Audit", "Remediation", "Documentation"]
      },
      {
        id: "SOP-LEG-004",
        title: "Real Estate Transaction Documentation",
        owner: "Legal Manager",
        version: "V1.0",
        purpose: "Prepares and reviews real estate transaction documents with DLD compliance.",
        kpis: { target: "100%", accuracy: "100%", sla: "<5 days" },
        flow: ["Document Request", "Template Selection", "Customization", "Review", "Customer Review", "Execution", "Registration", "Archive"]
      },
      {
        id: "SOP-LEG-005",
        title: "Intellectual Property Management",
        owner: "Legal Manager",
        version: "V1.0",
        purpose: "Protects and manages company intellectual property with enforcement.",
        kpis: { target: "100%", accuracy: "100%", sla: "<30 days" },
        flow: ["IP Identification", "Registration", "Renewal Tracking", "Infringement Monitoring", "Enforcement", "Licensing", "Portfolio Review"]
      }
    ]
  },
  {
    id: "MKT",
    name: "Marketing Department",
    icon: "📢",
    owner: "Chief Marketing Officer",
    description: "Handles campaign planning, brand management, digital marketing, events, and budget management for brand excellence.",
    kpis: [
      { value: ">3x", label: "ROAS" },
      { value: ">25%", label: "Lead Conv" },
      { value: "100%", label: "Brand Score" },
      { value: "<5%", label: "Budget Var" }
    ],
    responsible: ["Chief Marketing Officer", "Marketing Manager", "Digital Marketing Manager", "Brand Manager", "Events Manager"],
    sops: [
      {
        id: "SOP-MKT-001",
        title: "Campaign Planning & Execution",
        owner: "Marketing Manager",
        version: "V1.0",
        purpose: "Plans and executes integrated marketing campaigns with ROI optimization.",
        kpis: { target: ">3x", accuracy: "100%", sla: "<14 days" },
        flow: ["Brief Development", "Strategy", "Creative Development", "Channel Selection", "Budget Allocation", "Execution", "Performance Tracking", "Optimization"]
      },
      {
        id: "SOP-MKT-002",
        title: "Brand Management & Guidelines",
        owner: "Brand Manager",
        version: "V1.0",
        purpose: "Maintains brand consistency across all touchpoints with governance.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Guidelines Update", "Asset Management", "Review Process", "Approval Workflow", "Distribution", "Compliance Check", "Training"]
      },
      {
        id: "SOP-MKT-003",
        title: "Digital Marketing & Social Media",
        owner: "Digital Marketing Manager",
        version: "V1.0",
        purpose: "Manages digital marketing channels and social media with engagement optimization.",
        kpis: { target: ">5%", accuracy: "100%", sla: "Daily" },
        flow: ["Content Calendar", "Content Creation", "Approval", "Publishing", "Community Management", "Analytics", "Optimization"]
      },
      {
        id: "SOP-MKT-004",
        title: "Event Management & Exhibitions",
        owner: "Events Manager",
        version: "V1.0",
        purpose: "Plans and executes marketing events and exhibitions with lead capture.",
        kpis: { target: ">100", accuracy: "100%", sla: "<30 days" },
        flow: ["Event Brief", "Venue Selection", "Vendor Management", "Promotion", "Execution", "Lead Capture", "Post-Event Analysis"]
      },
      {
        id: "SOP-MKT-005",
        title: "Marketing Budget & ROI Management",
        owner: "CMO",
        version: "V1.0",
        purpose: "Manages marketing budget and measures ROI with optimization.",
        kpis: { target: "<5%", accuracy: "100%", sla: "Monthly" },
        flow: ["Budget Planning", "Allocation", "Spend Tracking", "Invoice Processing", "ROI Analysis", "Reallocation", "Board Reporting"]
      }
    ]
  },
  {
    id: "LAND",
    name: "Lands Department",
    icon: "🏝️",
    owner: "Head of Land Acquisition",
    description: "Handles land acquisition, due diligence, land bank optimization, JV structuring, and title management for strategic growth.",
    kpis: [
      { value: "<90 days", label: "Acquisition" },
      { value: "100%", label: "Due Diligence" },
      { value: ">15%", label: "IRR Target" },
      { value: "100%", label: "Title Clear" }
    ],
    responsible: ["Head of Land Acquisition", "Land Manager", "Business Development", "Legal Team", "Finance Team"],
    sops: [
      {
        id: "SOP-LAND-001",
        title: "Land Acquisition & Due Diligence",
        owner: "Land Manager",
        version: "V1.0",
        purpose: "Manages land acquisition with comprehensive due diligence and risk assessment.",
        kpis: { target: "<90 days", accuracy: "100%", sla: "<60 days" },
        flow: ["Opportunity Identification", "Initial Assessment", "Due Diligence", "Valuation", "Negotiation", "Board Approval", "Transaction Close", "Title Transfer"]
      },
      {
        id: "SOP-LAND-002",
        title: "Land Bank Management & Optimization",
        owner: "Land Manager",
        version: "V1.0",
        purpose: "Optimizes the land bank portfolio for maximum returns and strategic development.",
        kpis: { target: ">15%", accuracy: "100%", sla: "Quarterly" },
        flow: ["Portfolio Review", "Market Analysis", "Holding Cost", "Development Timing", "Optimization Strategy", "Board Report", "Action Plan"]
      },
      {
        id: "SOP-LAND-003",
        title: "Joint Venture & Partnership Structuring",
        owner: "Business Development",
        version: "V1.0",
        purpose: "Structures JV and partnership arrangements with aligned interests.",
        kpis: { target: "100%", accuracy: "100%", sla: "<45 days" },
        flow: ["Partner Identification", "Term Sheet", "Due Diligence", "Legal Review", "Negotiation", "Documentation", "Execution", "Governance Setup"]
      },
      {
        id: "SOP-LAND-004",
        title: "Government Land Allocation Applications",
        owner: "Land Manager",
        version: "V1.0",
        purpose: "Manages applications for government land allocations with relationship building.",
        kpis: { target: "100%", accuracy: "100%", sla: "<120 days" },
        flow: ["Opportunity Review", "Application Prep", "Document Compilation", "Submission", "Follow-up", "Presentation", "Allocation Receipt", "Development Commitment"]
      },
      {
        id: "SOP-LAND-005",
        title: "Land Registration & Title Management",
        owner: "Land Manager",
        version: "V1.0",
        purpose: "Manages land registration and title documentation with secure custody.",
        kpis: { target: "100%", accuracy: "100%", sla: "<30 days" },
        flow: ["Title Review", "Encumbrance Check", "Registration Prep", "DLD Submission", "Title Receipt", "Safe Storage", "Database Update"]
      }
    ]
  },
  {
    id: "MIS",
    name: "MIS Department",
    icon: "📊",
    owner: "Head of MIS",
    description: "Manages reporting, dashboards, data quality, business analytics, and master data management for data-driven decisions.",
    kpis: [
      { value: "100%", label: "Report Accuracy" },
      { value: "<24h", label: "Delivery SLA" },
      { value: ">99%", label: "Data Quality" },
      { value: "Real-time", label: "Dashboard" }
    ],
    responsible: ["Head of MIS", "MIS Manager", "Data Analysts", "Report Developers", "Data Quality Team"],
    sops: [
      {
        id: "SOP-MIS-001",
        title: "Management Reporting & Dashboards",
        owner: "MIS Manager",
        version: "V1.0",
        purpose: "Produces management reports and maintains dashboards with actionable insights.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Data Collection", "Validation", "Report Generation", "Quality Check", "Distribution", "Dashboard Update", "Feedback Integration"]
      },
      {
        id: "SOP-MIS-002",
        title: "Data Quality Management",
        owner: "MIS Manager",
        version: "V1.0",
        purpose: "Ensures data quality across all systems with automated monitoring.",
        kpis: { target: ">99%", accuracy: "100%", sla: "Daily" },
        flow: ["Quality Rules", "Automated Checks", "Exception Reports", "Root Cause", "Remediation", "Prevention", "Metrics Tracking"]
      },
      {
        id: "SOP-MIS-003",
        title: "Business Analytics & Insights",
        owner: "MIS Manager",
        version: "V1.0",
        purpose: "Provides business analytics and actionable insights for strategic decisions.",
        kpis: { target: "100%", accuracy: "100%", sla: "<48h" },
        flow: ["Request Receipt", "Data Analysis", "Pattern Detection", "Insight Generation", "Visualization", "Presentation", "Action Tracking"]
      },
      {
        id: "SOP-MIS-004",
        title: "System Integration & Data Flows",
        owner: "MIS Manager",
        version: "V1.0",
        purpose: "Manages data flows between integrated systems with reliability.",
        kpis: { target: "99.9%", accuracy: "100%", sla: "<4h" },
        flow: ["Flow Design", "Implementation", "Testing", "Deployment", "Monitoring", "Error Handling", "Performance Tuning"]
      },
      {
        id: "SOP-MIS-005",
        title: "Master Data Management",
        owner: "MIS Manager",
        version: "V1.0",
        purpose: "Manages master data across the organization with governance.",
        kpis: { target: "100%", accuracy: "100%", sla: "<24h" },
        flow: ["Data Definition", "Governance Rules", "Data Entry", "Validation", "Approval", "Distribution", "Change Management"]
      }
    ]
  },
  {
    id: "PROC",
    name: "Procurement",
    icon: "🛒",
    owner: "Head of Procurement",
    description: "Manages vendor selection, purchase orders, contract management, and vendor performance evaluation for cost optimization.",
    kpis: [
      { value: ">10%", label: "Cost Savings" },
      { value: "<7 days", label: "PO Cycle" },
      { value: "100%", label: "Compliance" },
      { value: ">90%", label: "On-Time Del" }
    ],
    responsible: ["Head of Procurement", "Procurement Manager", "Procurement Officer", "Vendor Manager", "Finance Team"],
    sops: [
      {
        id: "SOP-PROC-001",
        title: "Vendor Selection & Qualification",
        owner: "Procurement Manager",
        version: "V1.0",
        purpose: "Qualifies and selects vendors through rigorous evaluation and due diligence.",
        kpis: { target: "100%", accuracy: "100%", sla: "<14 days" },
        flow: ["Requirement Definition", "RFQ/RFP", "Bid Receipt", "Evaluation", "Due Diligence", "Selection", "Agreement", "Onboarding"]
      },
      {
        id: "SOP-PROC-002",
        title: "Purchase Order Creation & Approval",
        owner: "Procurement Manager",
        version: "V1.0",
        purpose: "Manages PO creation with proper approvals and budget controls.",
        kpis: { target: "<7 days", accuracy: "100%", sla: "<48h" },
        flow: ["PR Receipt", "Vendor Selection", "PO Creation", "Budget Check", "Approval Workflow", "PO Dispatch", "Confirmation", "Tracking"]
      },
      {
        id: "SOP-PROC-003",
        title: "Contract Management & Renewal",
        owner: "Procurement Manager",
        version: "V1.0",
        purpose: "Manages vendor contracts throughout lifecycle with renewal optimization.",
        kpis: { target: "100%", accuracy: "100%", sla: "<30 days" },
        flow: ["Contract Repository", "Expiry Tracking", "Performance Review", "Renewal Decision", "Negotiation", "Execution", "Archive"]
      },
      {
        id: "SOP-PROC-004",
        title: "Invoice Processing & Payment",
        owner: "Procurement Manager",
        version: "V1.0",
        purpose: "Processes vendor invoices for payment with three-way matching.",
        kpis: { target: "<7 days", accuracy: "100%", sla: "<5 days" },
        flow: ["Invoice Receipt", "Three-Way Match", "Discrepancy Resolution", "Approval", "Payment Queue", "Payment Execution", "Confirmation"]
      },
      {
        id: "SOP-PROC-005",
        title: "Vendor Performance Evaluation",
        owner: "Procurement Manager",
        version: "V1.0",
        purpose: "Evaluates vendor performance regularly with improvement plans.",
        kpis: { target: ">80%", accuracy: "100%", sla: "Quarterly" },
        flow: ["KPI Definition", "Data Collection", "Scoring", "Feedback Session", "Improvement Plan", "Follow-up", "Status Update"]
      }
    ]
  }
];

// Calculate totals
export const stats = {
  totalDepartments: departments.length,
  totalSOPs: departments.reduce((sum, d) => sum + d.sops.length, 0),
  totalFlows: departments.reduce((sum, d) => sum + d.sops.length, 0),
  compliance: "100%"
};
