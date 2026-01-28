// SOP File Mapping - Maps SOP IDs to actual Word document file paths
// Base path for SOP files (Windows folder accessible via WSL)
export const SOP_BASE_PATH = '/mnt/c/Users/Jason D Costa/Documents/SOPs and Process Flows';

// Mapping of SOP IDs to their actual file paths relative to the base path
export const sopFileMapping: Record<string, string> = {
  // ===== SALES OPERATIONS =====
  'SOP-SALES-001': 'Sales Operations/Client-Refund-Processing/SOP-SAL-001-Client-Refund-Processing.docx',
  'SOP-SALES-002': 'Sales Operations/Sales Offer Process/SOP-SAL-002-Sales-Offer-Generation.docx',
  'SOP-SALES-003': 'Sales Operations/Sales Offer Process/SOP-SAL-002-Sales-Offer-Generation.docx',
  'SOP-SALES-004': 'Sales Operations/EOI Process/SOP-SALES-EOI-001-Expression-of-Interest.docx',
  'SOP-SALES-005': 'Sales Operations/KYC Process/SOP-SAL-001-Client-KYC.docx',

  // ===== BROKER MANAGEMENT (CHANNELS) =====
  'SOP-BROK-001': 'Channels/Broker-Commission-Processing/SOP-CHN-001-Broker-Commission-Processing.docx',
  'SOP-BROK-002': 'Channels/Broker-Registration-Onboarding/SOP-CHN-001-Broker-Registration-Onboarding.docx',
  'SOP-BROK-003': 'Channels/Roadshows-and-Events-Management/SOP-CHN-001-Roadshows-Events-Management.docx',
  'SOP-BROK-004': 'Channels/Roadshows-and-Events-Management/SOP-CHN-001-Roadshows-Events-Management.docx',
  'SOP-BROK-005': 'Channels/Broker-Registration-Onboarding/SOP-CHN-001-Broker-Registration-Onboarding.docx',

  // ===== COLLECTIONS / CRM =====
  'SOP-COLL-001': 'CRM/SPA Execution Process/SOP-CRM-001-SPA-Execution-Process.docx',
  'SOP-COLL-002': 'CRM/Oqood Registration/SOP-CRM-001-Oqood-Registration.docx',
  'SOP-COLL-003': 'CRM/Resale Process/SOP-CRM-001-Resale Process.docx',
  'SOP-COLL-004': 'CRM/Change-of-Contact-Details-Process/SOP-CRM-001-Change-of-Contact-Details_1.docx',
  'SOP-COLL-005': 'CRM/Complaint-Logging-and-Survey-Process/SOP-CRM-001-Complaint-Logging-and-Survey-Process.docx',

  // ===== LEGAL =====
  'SOP-LEG-001': 'Legal/Contract Preparation & Review/SOP-LEG-001-Contract-Preparation-Review-Process.docx',
  'SOP-LEG-002': 'Legal/Land Plot Acquisition/SOP-LEG-001-Land-Plot-Acquisition-Process.docx',
  'SOP-LEG-003': 'Legal/Corporate Agreements, Company Formation & AoA Amendments/SOP-LEG-001-Corporate-Agreements-Company-Formation-AoA-Amendments.docx',
  'SOP-LEG-004': 'Legal/Digital Contracting & E Signatures/SOP-LEG-001-Digital-Contracting-E-Signatures.docx',
  'SOP-LEG-005': 'Legal/Trademark Registration & Management/SOP-LEG-001-Trademark-Registration-Management.docx',

  // ===== FINANCE (MIS) =====
  'SOP-FIN-001': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-FIN-002': 'MIS/Pricing & Repricing of Projects-Units/SOP-MIS-001-Pricing-Repricing-Projects-Units.docx',
  'SOP-FIN-003': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-FIN-004': 'MIS/Pricing & Repricing of Projects-Units/SOP-MIS-001-Pricing-Repricing-Projects-Units.docx',
  'SOP-FIN-005': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',

  // ===== MARKETING =====
  'SOP-MKT-001': 'Marketing/Marketing-Request-Project-Brief-Initiation/SOP-MKT-001-Marketing-Request-Project-Brief-Initiation.docx',
  'SOP-MKT-002': 'Marketing/Campaign-Execution-Content-Deployment/SOP-MKT-001-Campaign-Execution-Content-Deployment.docx',
  'SOP-MKT-003': 'Marketing/Budget-Planning-Management-Approval/SOP-MKT-001-Budget-Planning-Management-Approval.docx',
  'SOP-MKT-004': 'Marketing/Lead Tracking, Reporting & Optimization/SOP-MKT-001-Lead-Tracking-Reporting-Optimization.docx',
  'SOP-MKT-005': 'Marketing/Campaign-Execution-Content-Deployment/SOP-MKT-001-Campaign-Execution-Content-Deployment.docx',

  // ===== CUSTOMER RELATIONS (CRM) =====
  'SOP-CS-001': 'CRM/Complaint-Logging-and-Survey-Process/SOP-CRM-001-Complaint-Logging-and-Survey-Process.docx',
  'SOP-CS-002': 'CRM/Change-of-Contact-Details-Process/SOP-CS-001-Change-of-Contact-Details-Process.docx',
  'SOP-CS-003': 'CRM/SPA Execution Process/SOP-CRM-001-SPA-Execution-Process.docx',
  'SOP-CS-004': 'CRM/Oqood Registration/SOP-CRM-001-Oqood-Registration.docx',
  'SOP-CS-005': 'CRM/Resale Process/SOP-CRM-001-Resale Process.docx',

  // ===== HR =====
  'SOP-HR-001': 'HR/Onboarding & Orientation/SOP-HR-001-Onboarding-Orientation.docx',
  'SOP-HR-002': 'HR/Recruitment & Hiring Process/SOP-HR-001-Onboarding-Orientation.docx',
  'SOP-HR-003': 'HR/Performance Management & Appraisals/SOP-PC-005-Performance-Management-Appraisals.docx',
  'SOP-HR-004': 'HR/Compensation & Benefits Administration/SOP-HR-002-Compensation-Benefits-Administration.docx',
  'SOP-HR-005': 'HR/Termination-Exit-Formalities/SOP-PC-002-Termination-Exit-Formalities.docx',

  // ===== DEVELOPMENT =====
  'SOP-DEV-001': 'Development/Manage Project Initiation/SOP-DEV-001-Manage-Project-Initiation-Process.docx',
  'SOP-DEV-002': 'Development/Award-and-Initiation-Contractor-Engineer-/SOP-DEV-001-Award-and-Initiation-Contractor-Engineer-Process.docx',
  'SOP-DEV-003': 'Development/Mobilize Contractor/SOP-DEV-001-Mobilise-Contractor-Process.docx',
  'SOP-DEV-004': 'Development/Manage Look Ahead/SOP-DEV-001-Manage-Look-Ahead-Plan-Process.docx',
  'SOP-DEV-005': "Development/Manage Contractor's Material Procurement Schedule/SOP-DEV-001-Manage-Contractors-Material-Procurement-Schedule.docx",

  // ===== PROCUREMENT =====
  'SOP-PRO-001': 'Procurement/Supplier Registration/SOP-PRO-001-Supplier-Registration-Process_1.docx',
  'SOP-PRO-002': 'Procurement/Procurement Tendering/SOP-PRO-001-Procurement-Tendering-Process.docx',
  'SOP-PRO-003': 'Procurement/Supplier Performance/SOP-PRO-001-Supplier-Performance-Process.docx',
  'SOP-PRO-004': 'Procurement/Procurement Tendering/SOP-PRO-001-Procurement-Tendering-Process.docx',
  'SOP-PRO-005': 'Procurement/Supplier Performance/SOP-PRO-001-Supplier-Performance-Process.docx',

  // ===== EXTERNAL AFFAIRS =====
  'SOP-EA-001': 'External Affairs/Project Registration in DLD/SOP-EA-001-DLD-Project-Registration.docx',
  'SOP-EA-002': 'External Affairs/Complaint Management/SOP-EA-001-Complaint-Management.docx',
  'SOP-EA-003': 'External Affairs/Authority-Complaints-Management/SOP-EA-001-Regulatory-Authority-Complaints-Management.docx',
  'SOP-EA-004': 'External Affairs/Project-Registration-in-ADGM/SOP-EA-001-Project-Registration-in-ADGM.docx',
  'SOP-EA-005': 'External Affairs/Complaint Management/SOP-EA-001-Complaint-Management.docx',

  // ===== IT =====
  'SOP-IT-001': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-IT-002': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-IT-003': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-IT-004': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',
  'SOP-IT-005': 'MIS/Data Governance/SOP-IT-001-Data-Governance-Process.docx',

  // ===== LANDS (FEASIBILITY) =====
  'SOP-LAND-001': 'Lands/Opportunity Intake & Registration/SOP-FMR-001-Opportunity-Intake-Registration.docx',
  'SOP-LAND-002': 'Lands/Initial Land Validation/SOP-FMR-001-Initial-Land-Validation-Process.docx',
  'SOP-LAND-003': 'Lands/Market Research & Benchmarking/SOP-FMR-001-Market-Research-Benchmarking.docx',
  'SOP-LAND-004': 'Lands/Financial Feasibility Modelling/SOP-FMR-001-Financial-Feasibility-Modeling_1.docx',
  'SOP-LAND-005': 'Lands/LOI Drafting, Review, Approval & Issuance/SOP-FMR-001-LOI-Drafting-Review-Approval-Issuance.docx',

  // ===== INVENTORY =====
  'SOP-INV-001': 'Inventory/System Inventory Creation & Validation/SOP-INV-001-System-Inventory-Creation-Validation.docx',
  'SOP-INV-002': 'Inventory/Pre-Launch & Launch Inventory Preparation/SOP-INV-001-Pre-Launch-Inventory-Preparation-Validation.docx',
  'SOP-INV-003': "Inventory/Pricing Setup – ROI Alignment & Discount Governance/SOP-INV-001-Pricing-Setup-ROI-Alignment-Discount-Governance.docx",
  'SOP-INV-004': 'Inventory/Sales Material Creation & Validation/SOP-INV-001-Sales-Material-Creation-Validation-Process.docx',
  'SOP-INV-005': 'Inventory/Inventory Status & Availability Tracking/SOP-INV-001-Inventory-Status-Availability-Tracking.docx',

  // ===== LEADS =====
  'SOP-LED-001': 'Leads/Lead Intake & Validation/SOP-SAL-001-Lead-Intake-Validation.docx',
  'SOP-LED-002': 'Leads/Lead Qualification Telesales/SOP-LED-001-Lead-Qualification-TeleSales.docx',
  'SOP-LED-003': 'Leads/Lead Conversion Sales/SOP-LED-001-Lead-Conversion-Sales-Engagement.docx',
  'SOP-LED-004': 'Leads/Leads Nurturing & Recycling Process/SOP-LED-001-Lead-Nurturing-Recycling-Process.docx',
  'SOP-LED-005': 'Leads/Lead Closure, Reporting & Governance/SOP-SAL-006-Lead-Closure-Reporting-Governance.docx',

  // ===== COMPLIANCE =====
  'SOP-COMP-001': 'Legal/Contract Preparation & Review/SOP-LEG-001-Contract-Preparation-Review-Process.docx',
  'SOP-COMP-002': 'Legal/Corporate Agreements, Company Formation & AoA Amendments/SOP-LEG-001-Corporate-Agreements-Company-Formation-AoA-Amendments.docx',
  'SOP-COMP-003': 'External Affairs/Project Registration in DLD/SOP-EA-001-DLD-Project-Registration.docx',
  'SOP-COMP-004': 'External Affairs/Authority-Complaints-Management/SOP-EA-001-Regulatory-Authority-Complaints-Management.docx',
  'SOP-COMP-005': 'Legal/Trademark Registration & Management/SOP-LEG-001-Trademark-Registration-Management.docx',
};

// Get the full file path for a SOP ID
export function getSOPFilePath(sopId: string): string | null {
  const relativePath = sopFileMapping[sopId];
  if (!relativePath) return null;
  return `${SOP_BASE_PATH}/${relativePath}`;
}

// Check if a file exists for a given SOP ID
export function hasSOPFile(sopId: string): boolean {
  return sopId in sopFileMapping;
}
