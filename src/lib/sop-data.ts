// SOP Data Structure - Generated from One Development's SOP folders

export interface SOPProcess {
  id: string;
  name: string;
  code: string;
  fileName: string;
  filePath: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  description: string;
  processes: SOPProcess[];
}

export const departments: Department[] = [
  {
    id: "channels",
    name: "Channels",
    code: "CHN",
    icon: "🤝",
    color: "#8B5CF6",
    description: "Broker management, commission processing, and partner events",
    processes: [
      { id: "chn-001", name: "Broker Commission Processing", code: "SOP-CHN-001", fileName: "SOP-CHN-001-Broker-Commission-Processing.docx", filePath: "Channels/Broker-Commission-Processing" },
      { id: "chn-002", name: "Broker Registration & Onboarding", code: "SOP-CHN-002", fileName: "SOP-CHN-001-Broker-Registration-Onboarding.docx", filePath: "Channels/Broker-Registration-Onboarding" },
      { id: "chn-003", name: "Roadshows & Events Management", code: "SOP-CHN-003", fileName: "SOP-CHN-001-Roadshows-Events-Management.docx", filePath: "Channels/Roadshows-and-Events-Management" },
    ]
  },
  {
    id: "crm",
    name: "CRM",
    code: "CRM",
    icon: "👥",
    color: "#EC4899",
    description: "Customer relationship management and service processes",
    processes: [
      { id: "crm-001", name: "Change of Contact Details", code: "SOP-CRM-001", fileName: "SOP-CRM-001-Change-of-Contact-Details_1.docx", filePath: "CRM/Change-of-Contact-Details-Process" },
      { id: "crm-002", name: "Complaint Logging & Survey", code: "SOP-CRM-002", fileName: "SOP-CRM-001-Complaint-Logging-and-Survey-Process.docx", filePath: "CRM/Complaint-Logging-and-Survey-Process" },
      { id: "crm-003", name: "Oqood Registration", code: "SOP-CRM-003", fileName: "SOP-CRM-001-Oqood-Registration.docx", filePath: "CRM/Oqood Registration" },
      { id: "crm-004", name: "Resale Process", code: "SOP-CRM-004", fileName: "SOP-CRM-001-Resale Process.docx", filePath: "CRM/Resale Process" },
      { id: "crm-005", name: "SPA Execution Process", code: "SOP-CRM-005", fileName: "SOP-CRM-001-SPA-Execution-Process.docx", filePath: "CRM/SPA Execution Process" },
    ]
  },
  {
    id: "development",
    name: "Development",
    code: "DEV",
    icon: "🏗️",
    color: "#F59E0B",
    description: "Project development, contractor management, and construction oversight",
    processes: [
      { id: "dev-001", name: "Award & Initiation (Contractor/Engineer)", code: "SOP-DEV-001", fileName: "SOP-DEV-001-Award-and-Initiation-Contractor-Engineer-Process.docx", filePath: "Development/Award-and-Initiation-Contractor-Engineer-" },
      { id: "dev-002", name: "Manage Contractor's Material Procurement", code: "SOP-DEV-002", fileName: "SOP-DEV-001-Manage-Contractors-Material-Procurement-Schedule.docx", filePath: "Development/Manage Contractor's Material Procurement Schedule" },
      { id: "dev-003", name: "Manage Look Ahead Plan", code: "SOP-DEV-003", fileName: "SOP-DEV-001-Manage-Look-Ahead-Plan-Process.docx", filePath: "Development/Manage Look Ahead" },
      { id: "dev-004", name: "Manage Project Initiation", code: "SOP-DEV-004", fileName: "SOP-DEV-001-Manage-Project-Initiation-Process.docx", filePath: "Development/Manage Project Initiation" },
      { id: "dev-005", name: "Mobilize Contractor", code: "SOP-DEV-005", fileName: "SOP-DEV-001-Mobilise-Contractor-Process.docx", filePath: "Development/Mobilize Contractor" },
    ]
  },
  {
    id: "external-affairs",
    name: "External Affairs",
    code: "EA",
    icon: "🏛️",
    color: "#10B981",
    description: "Government relations, regulatory compliance, and authority management",
    processes: [
      { id: "ea-001", name: "Authority Complaints Management", code: "SOP-EA-001", fileName: "SOP-EA-001-Regulatory-Authority-Complaints-Management.docx", filePath: "External Affairs/Authority-Complaints-Management" },
      { id: "ea-002", name: "Complaint Management", code: "SOP-EA-002", fileName: "SOP-EA-001-Complaint-Management.docx", filePath: "External Affairs/Complaint Management" },
      { id: "ea-003", name: "Project Registration in DLD", code: "SOP-EA-003", fileName: "SOP-EA-001-DLD-Project-Registration.docx", filePath: "External Affairs/Project Registration in DLD" },
      { id: "ea-004", name: "Project Registration in ADGM", code: "SOP-EA-004", fileName: "SOP-EA-001-Project-Registration-in-ADGM.docx", filePath: "External Affairs/Project-Registration-in-ADGM" },
    ]
  },
  {
    id: "hr",
    name: "HR",
    code: "HR",
    icon: "👔",
    color: "#6366F1",
    description: "Human resources, recruitment, training, and employee management",
    processes: [
      { id: "hr-001", name: "Onboarding & Orientation", code: "SOP-HR-001", fileName: "SOP-HR-001-Onboarding-Orientation.docx", filePath: "HR/Onboarding & Orientation" },
      { id: "hr-002", name: "Compensation & Benefits", code: "SOP-HR-002", fileName: "SOP-HR-002-Compensation-Benefits-Administration.docx", filePath: "HR/Compensation & Benefits Administration" },
      { id: "hr-003", name: "Leave Management", code: "SOP-HR-003", fileName: "SOP-HR-003-Leave-Management.docx", filePath: "HR/Leave Management Process" },
      { id: "hr-004", name: "Recruitment & Hiring", code: "SOP-HR-004", fileName: "SOP-HR-001-Recruitment-Hiring.docx", filePath: "HR/Recruitment & Hiring Process" },
      { id: "hr-005", name: "Disciplinary Action", code: "SOP-HR-005", fileName: "SOP-PC-002-Disciplinary-Process.docx", filePath: "HR/Disciplinary Action" },
      { id: "hr-006", name: "Grievance Handling", code: "SOP-HR-006", fileName: "SOP-PC-003-Grievance-Handling.docx", filePath: "HR/Grievance Handling Process" },
      { id: "hr-007", name: "Performance Management", code: "SOP-HR-007", fileName: "SOP-PC-005-Performance-Management-Appraisals.docx", filePath: "HR/Performance Management & Appraisals" },
      { id: "hr-008", name: "Social Media Policy", code: "SOP-HR-008", fileName: "SOP-PC-002-Social-Media-Communication-Policy.docx", filePath: "HR/Social-Media-Communication-Policy" },
      { id: "hr-009", name: "Termination & Exit", code: "SOP-HR-009", fileName: "SOP-PC-002-Termination-Exit-Formalities.docx", filePath: "HR/Termination-Exit-Formalities" },
      { id: "hr-010", name: "Training & Development", code: "SOP-HR-010", fileName: "SOP-PC-005-Training-and-Development.docx", filePath: "HR/Training & Development" },
    ]
  },
  {
    id: "inventory",
    name: "Inventory",
    code: "INV",
    icon: "📦",
    color: "#14B8A6",
    description: "Unit inventory management, pricing, and sales material preparation",
    processes: [
      { id: "inv-001", name: "Inventory Status & Availability Tracking", code: "SOP-INV-001", fileName: "SOP-INV-001-Inventory-Status-Availability-Tracking.docx", filePath: "Inventory/Inventory Status & Availability Tracking" },
      { id: "inv-002", name: "Pre-Launch & Launch Preparation", code: "SOP-INV-002", fileName: "SOP-INV-001-Pre-Launch-Inventory-Preparation-Validation.docx", filePath: "Inventory/Pre-Launch & Launch Inventory Preparation" },
      { id: "inv-003", name: "Pricing Setup & Discount Governance", code: "SOP-INV-003", fileName: "SOP-INV-001-Pricing-Setup-ROI-Alignment-Discount-Governance.docx", filePath: "Inventory/Pricing Setup – ROI Alignment & Discount Governance" },
      { id: "inv-004", name: "Sales Material Creation & Validation", code: "SOP-INV-004", fileName: "SOP-INV-001-Sales-Material-Creation-Validation.docx", filePath: "Inventory/Sales Material Creation & Validation" },
      { id: "inv-005", name: "System Inventory Creation & Validation", code: "SOP-INV-005", fileName: "SOP-INV-001-System-Inventory-Creation-Validation.docx", filePath: "Inventory/System Inventory Creation & Validation" },
    ]
  },
  {
    id: "lands",
    name: "Lands",
    code: "LND",
    icon: "🗺️",
    color: "#F97316",
    description: "Land acquisition, feasibility analysis, and opportunity management",
    processes: [
      { id: "lnd-001", name: "Concept, GFA & Technical Inputs", code: "SOP-LND-001", fileName: "SOP-LND-001-Concept-GFA-Technical-Inputs.docx", filePath: "Lands/Concept, GFA & Technical Inputs" },
      { id: "lnd-002", name: "Financial Feasibility Modelling", code: "SOP-LND-002", fileName: "SOP-LND-001-Financial-Feasibility-Modelling.docx", filePath: "Lands/Financial Feasibility Modelling" },
      { id: "lnd-003", name: "Initial Land Validation", code: "SOP-LND-003", fileName: "SOP-LND-001-Initial-Land-Validation.docx", filePath: "Lands/Initial Land Validation" },
      { id: "lnd-004", name: "LOI Drafting & Approval", code: "SOP-LND-004", fileName: "SOP-LND-001-LOI-Drafting-Review-Approval-Issuance.docx", filePath: "Lands/LOI Drafting, Review, Approval & Issuance" },
      { id: "lnd-005", name: "Market Research & Benchmarking", code: "SOP-LND-005", fileName: "SOP-LND-001-Market-Research-Benchmarking.docx", filePath: "Lands/Market Research & Benchmarking" },
      { id: "lnd-006", name: "Opportunity Intake & Registration", code: "SOP-LND-006", fileName: "SOP-LND-001-Opportunity-Intake-Registration.docx", filePath: "Lands/Opportunity Intake & Registration" },
    ]
  },
  {
    id: "leads",
    name: "Leads",
    code: "LDS",
    icon: "🎯",
    color: "#EF4444",
    description: "Lead management, qualification, conversion, and nurturing",
    processes: [
      { id: "lds-001", name: "Lead Closure, Reporting & Governance", code: "SOP-LDS-001", fileName: "SOP-LDS-001-Lead-Closure-Reporting-Governance.docx", filePath: "Leads/Lead Closure, Reporting & Governance" },
      { id: "lds-002", name: "Lead Conversion (Sales)", code: "SOP-LDS-002", fileName: "SOP-LDS-001-Lead-Conversion-Sales.docx", filePath: "Leads/Lead Conversion Sales" },
      { id: "lds-003", name: "Lead Intake & Validation", code: "SOP-LDS-003", fileName: "SOP-LDS-001-Lead-Intake-Validation.docx", filePath: "Leads/Lead Intake & Validation" },
      { id: "lds-004", name: "Lead Qualification (Telesales)", code: "SOP-LDS-004", fileName: "SOP-LDS-001-Lead-Qualification-Telesales.docx", filePath: "Leads/Lead Qualification Telesales" },
      { id: "lds-005", name: "Lead Nurturing & Recycling", code: "SOP-LDS-005", fileName: "SOP-LDS-001-Leads-Nurturing-Recycling.docx", filePath: "Leads/Leads Nurturing & Recycling Process" },
    ]
  },
  {
    id: "legal",
    name: "Legal",
    code: "LGL",
    icon: "⚖️",
    color: "#64748B",
    description: "Legal affairs, contracts, corporate governance, and compliance",
    processes: [
      { id: "lgl-001", name: "Contract Preparation & Review", code: "SOP-LGL-001", fileName: "SOP-LGL-001-Contract-Preparation-Review.docx", filePath: "Legal/Contract Preparation & Review" },
      { id: "lgl-002", name: "Corporate Agreements & Company Formation", code: "SOP-LGL-002", fileName: "SOP-LGL-001-Corporate-Agreements-Company-Formation.docx", filePath: "Legal/Corporate Agreements, Company Formation & AoA Amendments" },
      { id: "lgl-003", name: "Digital Contracting & E-Signatures", code: "SOP-LGL-003", fileName: "SOP-LGL-001-Digital-Contracting-E-Signatures.docx", filePath: "Legal/Digital Contracting & E Signatures" },
      { id: "lgl-004", name: "Land Plot Acquisition", code: "SOP-LGL-004", fileName: "SOP-LGL-001-Land-Plot-Acquisition.docx", filePath: "Legal/Land Plot Acquisition" },
      { id: "lgl-005", name: "Trademark Registration & Management", code: "SOP-LGL-005", fileName: "SOP-LGL-001-Trademark-Registration-Management.docx", filePath: "Legal/Trademark Registration & Management" },
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    code: "MKT",
    icon: "📢",
    color: "#A855F7",
    description: "Marketing campaigns, budget management, and lead generation",
    processes: [
      { id: "mkt-001", name: "Budget Planning & Approval", code: "SOP-MKT-001", fileName: "SOP-MKT-001-Budget-Planning-Management-Approval.docx", filePath: "Marketing/Budget-Planning-Management-Approval" },
      { id: "mkt-002", name: "Campaign Execution & Content Deployment", code: "SOP-MKT-002", fileName: "SOP-MKT-001-Campaign-Execution-Content-Deployment.docx", filePath: "Marketing/Campaign-Execution-Content-Deployment" },
      { id: "mkt-003", name: "Lead Tracking, Reporting & Optimization", code: "SOP-MKT-003", fileName: "SOP-MKT-001-Lead-Tracking-Reporting-Optimization.docx", filePath: "Marketing/Lead Tracking, Reporting & Optimization" },
      { id: "mkt-004", name: "Marketing Request & Project Brief", code: "SOP-MKT-004", fileName: "SOP-MKT-001-Marketing-Request-Project-Brief-Initiation.docx", filePath: "Marketing/Marketing-Request-Project-Brief-Initiation" },
    ]
  },
  {
    id: "mis",
    name: "MIS",
    code: "MIS",
    icon: "📊",
    color: "#06B6D4",
    description: "Management information systems, data governance, and pricing",
    processes: [
      { id: "mis-001", name: "Data Governance", code: "SOP-MIS-001", fileName: "SOP-MIS-001-Data-Governance.docx", filePath: "MIS/Data Governance" },
      { id: "mis-002", name: "Pricing & Repricing", code: "SOP-MIS-002", fileName: "SOP-MIS-001-Pricing-Repricing-Projects-Units.docx", filePath: "MIS/Pricing & Repricing of Projects-Units" },
    ]
  },
  {
    id: "procurement",
    name: "Procurement",
    code: "PRC",
    icon: "🛒",
    color: "#84CC16",
    description: "Procurement, tendering, and supplier management",
    processes: [
      { id: "prc-001", name: "Procurement Tendering", code: "SOP-PRC-001", fileName: "SOP-PRC-001-Procurement-Tendering.docx", filePath: "Procurement/Procurement Tendering" },
      { id: "prc-002", name: "Supplier Performance", code: "SOP-PRC-002", fileName: "SOP-PRC-001-Supplier-Performance.docx", filePath: "Procurement/Supplier Performance" },
      { id: "prc-003", name: "Supplier Registration", code: "SOP-PRC-003", fileName: "SOP-PRC-001-Supplier-Registration.docx", filePath: "Procurement/Supplier Registration" },
    ]
  },
  {
    id: "sales-operations",
    name: "Sales Operations",
    code: "SOP",
    icon: "💼",
    color: "#F43F5E",
    description: "Sales operations, offers, KYC, EOI, and refund processing",
    processes: [
      { id: "sop-001", name: "Client Refund Processing", code: "SOP-SOP-001", fileName: "SOP-SOP-001-Client-Refund-Processing.docx", filePath: "Sales Operations/Client-Refund-Processing" },
      { id: "sop-002", name: "EOI Process", code: "SOP-SOP-002", fileName: "SOP-SOP-001-EOI-Process.docx", filePath: "Sales Operations/EOI Process" },
      { id: "sop-003", name: "KYC Process", code: "SOP-SOP-003", fileName: "SOP-SOP-001-KYC-Process.docx", filePath: "Sales Operations/KYC Process" },
      { id: "sop-004", name: "Sales Offer Process", code: "SOP-SOP-004", fileName: "SOP-SOP-001-Sales-Offer-Process.docx", filePath: "Sales Operations/Sales Offer Process" },
    ]
  },
];

// Helper functions
export function getAllProcesses(): (SOPProcess & { department: Department })[] {
  return departments.flatMap(dept => 
    dept.processes.map(proc => ({ ...proc, department: dept }))
  );
}

export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id);
}

export function getProcessById(deptId: string, procId: string): SOPProcess | undefined {
  const dept = getDepartmentById(deptId);
  return dept?.processes.find(p => p.id === procId);
}

export function searchSOPs(query: string): (SOPProcess & { department: Department })[] {
  const q = query.toLowerCase();
  return getAllProcesses().filter(proc => 
    proc.name.toLowerCase().includes(q) ||
    proc.code.toLowerCase().includes(q) ||
    proc.department.name.toLowerCase().includes(q)
  );
}

export const stats = {
  totalDepartments: departments.length,
  totalProcesses: departments.reduce((sum, d) => sum + d.processes.length, 0),
  lastUpdated: "January 2026",
};
