// ============================================================
// ALIGN — Demo Seed Data
// All data here is clearly identified DEMO DATA for demonstration purposes.
// ============================================================

export const demoEmployees = [
  { id: 'EMP-001', name: 'Arjun Sharma', email: 'arjun.sharma@align.in', phone: '9876543210', role: 'Admin', department: 'Management', designation: 'Director', status: 'Active', projects: ['PRJ-101','PRJ-102'], sites: [], lastActive: '2024-09-07' },
  { id: 'EMP-002', name: 'Rahul Mehta', email: 'rahul.mehta@align.in', phone: '9876543211', role: 'Project Manager', department: 'Projects', designation: 'Senior PM', status: 'Active', projects: ['PRJ-101'], sites: ['SIT-201','SIT-202'], lastActive: '2024-09-07' },
  { id: 'EMP-003', name: 'Suresh Kumar', email: 'suresh.kumar@align.in', phone: '9876543212', role: 'Project Manager', department: 'Projects', designation: 'PM', status: 'Active', projects: ['PRJ-102'], sites: ['SIT-203'], lastActive: '2024-09-06' },
  { id: 'EMP-004', name: 'Rajesh K', email: 'rajesh.k@align.in', phone: '9876543213', role: 'Site Engineer', department: 'Engineering', designation: 'Senior SE', status: 'Active', projects: ['PRJ-101'], sites: ['SIT-201'], lastActive: '2024-09-07' },
  { id: 'EMP-005', name: 'Sunil Verma', email: 'sunil.verma@align.in', phone: '9876543214', role: 'Site Engineer', department: 'Engineering', designation: 'SE', status: 'Active', projects: ['PRJ-101'], sites: ['SIT-202'], lastActive: '2024-09-07' },
  { id: 'EMP-006', name: 'Priya M', email: 'priya.m@align.in', phone: '9876543215', role: 'Site Engineer', department: 'Engineering', designation: 'SE', status: 'Active', projects: ['PRJ-102'], sites: ['SIT-203'], lastActive: '2024-09-05' },
  { id: 'EMP-007', name: 'Priya Rao', email: 'priya.rao@align.in', phone: '9876543216', role: 'Procurement Officer', department: 'Procurement', designation: 'PO Manager', status: 'Active', projects: ['PRJ-101','PRJ-102'], sites: [], lastActive: '2024-09-07' },
  { id: 'EMP-008', name: 'Anjali Chauhan', email: 'anjali.chauhan@align.in', phone: '9876543217', role: 'Accounts', department: 'Finance', designation: 'Accounts Manager', status: 'Active', projects: [], sites: [], lastActive: '2024-09-07' },
  { id: 'EMP-009', name: 'Vikram Patel', email: 'vikram.patel@align.in', phone: '9876543218', role: 'Architect', department: 'Design', designation: 'Lead Architect', status: 'Active', projects: ['PRJ-101','PRJ-102'], sites: [], lastActive: '2024-09-06' },
  { id: 'EMP-010', name: 'Ramesh Contractor', email: 'ramesh.c@align.in', phone: '9876543219', role: 'Contractor', department: 'External', designation: 'Civil Contractor', status: 'Active', projects: ['PRJ-101'], sites: ['SIT-201'], lastActive: '2024-09-06' },
  { id: 'EMP-011', name: 'Riya Sharma', email: 'riya.sharma@align.in', phone: '9876543220', role: 'Sales Executive', department: 'Sales', designation: 'Senior Sales Executive', status: 'Active', projects: [], sites: [], lastActive: '2024-09-07' },
  { id: 'EMP-012', name: 'Anita Desai', email: 'anita.desai@align.in', phone: '9876543221', role: 'Project Manager', department: 'Projects', designation: 'PM', status: 'Inactive', projects: ['PRJ-103'], sites: ['SIT-204'], lastActive: '2024-08-15' },
];

export const demoProjects = [
  { id: 'PRJ-101', name: 'Alpha Residential Tower', client: 'CLI-001', clientName: 'Apex Corp', pm: 'EMP-002', pmName: 'Rahul Mehta', description: 'A premium 32-storey residential tower in Mumbai South.', startDate: '2024-01-12', endDate: '2025-12-15', budget: 452000000, status: 'Active', progress: 45 },
  { id: 'PRJ-102', name: 'Omega Tech Park', client: 'CLI-002', clientName: 'Omega Systems', pm: 'EMP-003', pmName: 'Suresh Kumar', description: 'IT campus with 5 blocks and parking podium.', startDate: '2024-03-05', endDate: '2025-08-30', budget: 1200000000, status: 'Active', progress: 28 },
  { id: 'PRJ-103', name: 'City Center Mall', client: 'CLI-003', clientName: 'City Group', pm: 'EMP-012', pmName: 'Anita Desai', description: 'Commercial mall in Delhi NCR.', startDate: '2023-11-10', endDate: '2025-05-01', budget: 850000000, status: 'Delayed', progress: 78 },
  { id: 'PRJ-104', name: 'Green Valley Villas', client: 'CLI-004', clientName: 'Green Homes', pm: 'EMP-003', pmName: 'Suresh Kumar', description: 'Low-rise villa community in Bangalore.', startDate: '2024-09-20', endDate: '2026-01-10', budget: 320000000, status: 'Planning', progress: 5 },
  { id: 'PRJ-105', name: 'Sunrise Apartments', client: 'CLI-005', clientName: 'Sunrise Buildcon', pm: 'EMP-002', pmName: 'Rahul Mehta', description: '18-storey apartments — completed.', startDate: '2023-02-01', endDate: '2024-08-15', budget: 220000000, status: 'Completed', progress: 100 },
];

export const demoSites = [
  { id: 'SIT-201', name: 'Tower A Foundation', projectId: 'PRJ-101', projectName: 'Alpha Residential Tower', location: 'Mumbai South', se: 'EMP-004', seName: 'Rajesh K', pm: 'EMP-002', pmName: 'Rahul Mehta', startDate: '2024-02-01', endDate: '2024-06-30', progress: 85, status: 'Active' },
  { id: 'SIT-202', name: 'Tower B Excavation', projectId: 'PRJ-101', projectName: 'Alpha Residential Tower', location: 'Mumbai South', se: 'EMP-005', seName: 'Sunil Verma', pm: 'EMP-002', pmName: 'Rahul Mehta', startDate: '2024-03-15', endDate: '2024-09-30', progress: 20, status: 'Delayed' },
  { id: 'SIT-203', name: 'IT Block 1', projectId: 'PRJ-102', projectName: 'Omega Tech Park', location: 'Pune Hinjewadi', se: 'EMP-006', seName: 'Priya M', pm: 'EMP-003', pmName: 'Suresh Kumar', startDate: '2024-04-01', endDate: '2025-03-31', progress: 45, status: 'Active' },
  { id: 'SIT-204', name: 'Main Atrium', projectId: 'PRJ-103', projectName: 'City Center Mall', location: 'Delhi NCR', se: 'EMP-004', seName: 'Rajesh K', pm: 'EMP-012', pmName: 'Anita Desai', startDate: '2024-01-01', endDate: '2025-02-28', progress: 95, status: 'Active' },
  { id: 'SIT-205', name: 'Phase 1 Layout', projectId: 'PRJ-104', projectName: 'Green Valley Villas', location: 'Bangalore East', se: 'EMP-005', seName: 'Sunil Verma', pm: 'EMP-003', pmName: 'Suresh Kumar', startDate: '2024-09-20', endDate: '2025-06-30', progress: 10, status: 'Active' },
];

export const demoPhases = [
  { id: 'PHS-001', projectId: 'PRJ-101', code: 'PC', name: 'Preconstruction', order: 1 },
  { id: 'PHS-002', projectId: 'PRJ-101', code: 'SP', name: 'Superstructure I', order: 2 },
  { id: 'PHS-003', projectId: 'PRJ-101', code: 'SS', name: 'Superstructure II', order: 3 },
  { id: 'PHS-004', projectId: 'PRJ-101', code: 'BS', name: 'Building Services', order: 4 },
  { id: 'PHS-005', projectId: 'PRJ-101', code: 'FS', name: 'Fire Safety', order: 5 },
  { id: 'PHS-006', projectId: 'PRJ-102', code: 'PC', name: 'Preconstruction', order: 1 },
  { id: 'PHS-007', projectId: 'PRJ-102', code: 'SP', name: 'Superstructure I', order: 2 },
];

export const demoPhaseActivities = [
  { id: 'PAC-001', phaseId: 'PHS-001', code: 'PC01', name: 'Demarcation of site boundaries' },
  { id: 'PAC-002', phaseId: 'PHS-001', code: 'PC02', name: 'Soil testing' },
  { id: 'PAC-003', phaseId: 'PHS-001', code: 'PC03', name: 'Piling' },
  { id: 'PAC-004', phaseId: 'PHS-002', code: 'SP01', name: 'Plinth beam' },
  { id: 'PAC-005', phaseId: 'PHS-002', code: 'SP02', name: 'Podium construction' },
  { id: 'PAC-006', phaseId: 'PHS-002', code: 'SP03', name: 'Column casting' },
  { id: 'PAC-007', phaseId: 'PHS-004', code: 'BS01', name: 'Masonry' },
  { id: 'PAC-008', phaseId: 'PHS-004', code: 'BS02', name: 'Carpentry' },
  { id: 'PAC-009', phaseId: 'PHS-004', code: 'BS03', name: 'Lifts' },
  { id: 'PAC-010', phaseId: 'PHS-004', code: 'BS04', name: 'Waterproofing' },
  { id: 'PAC-011', phaseId: 'PHS-004', code: 'BS05', name: 'Plastering' },
  { id: 'PAC-012', phaseId: 'PHS-004', code: 'BS06', name: 'Electricals' },
  { id: 'PAC-013', phaseId: 'PHS-004', code: 'BS07', name: 'Plumbing' },
  { id: 'PAC-014', phaseId: 'PHS-004', code: 'BS08', name: 'Tiling' },
  { id: 'PAC-015', phaseId: 'PHS-004', code: 'BS09', name: 'Other amenities' },
];

export const demoTasks = [
  { id: 'TSK-001', taskCode: 'PC0301', title: 'Piling — Week 1', description: 'Drive piles for Tower A foundation zone 1.', createdBy: 'EMP-002', assignedTo: 'EMP-004', assignedName: 'Rajesh K', projectId: 'PRJ-101', siteId: 'SIT-201', phase: 'PC', phaseActivity: 'PC03', priority: 'High', plannedStart: '2024-02-05', plannedEnd: '2024-02-09', dueDate: '2024-02-09', plannedQty: 5, actualQty: 4.25, unit: 'metres', status: 'Completed', attachments: [], updates: [], completionNote: 'Completed with minor delay due to equipment.' },
  { id: 'TSK-002', taskCode: 'PC0302', title: 'Piling — Week 2', description: 'Drive piles for Tower A foundation zone 2.', createdBy: 'EMP-002', assignedTo: 'EMP-004', assignedName: 'Rajesh K', projectId: 'PRJ-101', siteId: 'SIT-201', phase: 'PC', phaseActivity: 'PC03', priority: 'High', plannedStart: '2024-02-12', plannedEnd: '2024-02-16', dueDate: '2024-02-16', plannedQty: 5, actualQty: 5, unit: 'metres', status: 'Completed', attachments: [], updates: [] },
  { id: 'TSK-003', taskCode: 'SP0101', title: 'Plinth Beam — Zone A', description: 'Cast plinth beam for Tower A.', createdBy: 'EMP-002', assignedTo: 'EMP-004', assignedName: 'Rajesh K', projectId: 'PRJ-101', siteId: 'SIT-201', phase: 'SP', phaseActivity: 'SP01', priority: 'High', plannedStart: '2024-03-01', plannedEnd: '2024-03-15', dueDate: '2024-03-15', plannedQty: 120, actualQty: 110, unit: 'cubic metres', status: 'In Progress', attachments: [], updates: [{ by: 'EMP-004', date: '2024-03-10', note: 'On track, 110 cubic metres done.' }] },
  { id: 'TSK-004', taskCode: 'SP0301', title: 'Column Casting — Level 1', description: 'Cast columns for Level 1 Tower A.', createdBy: 'EMP-002', assignedTo: 'EMP-004', assignedName: 'Rajesh K', projectId: 'PRJ-101', siteId: 'SIT-201', phase: 'SP', phaseActivity: 'SP03', priority: 'Critical', plannedStart: '2024-04-01', plannedEnd: '2024-04-30', dueDate: '2024-04-30', plannedQty: 48, actualQty: 0, unit: 'columns', status: 'Assigned', attachments: [], updates: [] },
  { id: 'TSK-005', taskCode: 'PC0101', title: 'Site Demarcation — Tower B', description: 'Mark site boundaries for Tower B excavation.', createdBy: 'EMP-002', assignedTo: 'EMP-005', assignedName: 'Sunil Verma', projectId: 'PRJ-101', siteId: 'SIT-202', phase: 'PC', phaseActivity: 'PC01', priority: 'Medium', plannedStart: '2024-03-15', plannedEnd: '2024-03-17', dueDate: '2024-03-17', plannedQty: 1, actualQty: 0, unit: 'lot', status: 'Blocked', attachments: [], updates: [{ by: 'EMP-005', date: '2024-03-16', note: 'Blocked - neighbour dispute on eastern boundary.' }] },
  { id: 'TSK-006', taskCode: 'SP0101', title: 'IT Block 1 — Plinth Beam', description: 'Cast plinth beam for IT Block 1.', createdBy: 'EMP-003', assignedTo: 'EMP-006', assignedName: 'Priya M', projectId: 'PRJ-102', siteId: 'SIT-203', phase: 'SP', phaseActivity: 'SP01', priority: 'High', plannedStart: '2024-05-01', plannedEnd: '2024-05-20', dueDate: '2024-05-20', plannedQty: 200, actualQty: 200, unit: 'cubic metres', status: 'Submitted', attachments: [], updates: [] },
  { id: 'TSK-007', taskCode: 'BS0601', title: 'Electricals — Ground Floor', description: 'Electrical conduit installation ground floor.', createdBy: 'EMP-003', assignedTo: 'EMP-006', assignedName: 'Priya M', projectId: 'PRJ-102', siteId: 'SIT-203', phase: 'BS', phaseActivity: 'BS06', priority: 'Medium', plannedStart: '2024-08-01', plannedEnd: '2024-08-31', dueDate: '2024-08-31', plannedQty: 500, actualQty: 0, unit: 'metres', status: 'Assigned', attachments: [], updates: [] },
];

export const demoMaterials = [
  { id: 'MAT-001', name: 'Cement (OPC 53 Grade)', category: 'Cement', unit: 'Bags (50kg)', unitCost: 380, description: 'Ordinary Portland Cement 53 grade.' },
  { id: 'MAT-002', name: 'Aggregate (20mm)', category: 'Aggregate', unit: 'Cubic Metres', unitCost: 1800, description: 'Coarse aggregate 20mm graded.' },
  { id: 'MAT-003', name: 'Aggregate (Fine/Sand)', category: 'Aggregate', unit: 'Cubic Metres', unitCost: 1400, description: 'River sand / M-sand.' },
  { id: 'MAT-004', name: 'Steel Rebars (12mm)', category: 'Steel', unit: 'MT', unitCost: 62000, description: 'Fe500 TMT rebars 12mm dia.' },
  { id: 'MAT-005', name: 'Steel Rebars (16mm)', category: 'Steel', unit: 'MT', unitCost: 61500, description: 'Fe500 TMT rebars 16mm dia.' },
  { id: 'MAT-006', name: 'Bricks (Red Clay)', category: 'Masonry', unit: 'Thousands', unitCost: 7000, description: 'Standard red clay bricks.' },
  { id: 'MAT-007', name: 'Concrete Mix (M25)', category: 'Concrete', unit: 'Cubic Metres', unitCost: 6500, description: 'Ready-mix concrete M25 grade.' },
  { id: 'MAT-008', name: 'Plywood (18mm)', category: 'Shuttering', unit: 'Sheets', unitCost: 1200, description: 'Shuttering plywood 18mm thick.' },
];

export const demoInventory = [
  { id: 'MAT-CEM-001', orderId: 'PO-2024-001', material: 'Cement (OPC 53 Grade)', materialId: 'MAT-001', usage: 'In-use', taskId: 'TSK-003', siteId: 'SIT-201', location: 'Site A', qtyRequired: 400, qtyPresent: 350, forthcomingDates: '', type: 'material' },
  { id: 'MAT-CEM-002', orderId: '', material: 'Cement (OPC 53 Grade)', materialId: 'MAT-001', usage: 'Not in-use', taskId: '', siteId: 'SIT-202', location: 'Site B', qtyRequired: 340, qtyPresent: 340, forthcomingDates: '', type: 'material' },
  { id: 'MAT-AGG-001', orderId: 'PO-2024-002', material: 'Aggregate (20mm)', materialId: 'MAT-002', usage: 'In-use', taskId: 'TSK-003', siteId: 'SIT-201', location: 'Site A', qtyRequired: 100, qtyPresent: 95, forthcomingDates: '12 Sep 2024', type: 'material' },
  { id: 'MAT-REB-001', orderId: '', material: 'Steel Rebars (12mm)', materialId: 'MAT-004', usage: 'Not in-use', taskId: '', siteId: 'SIT-201', location: 'Site A', qtyRequired: 180, qtyPresent: 189, forthcomingDates: '', type: 'material' },
  { id: 'MAT-REB-002', orderId: 'PO-2024-003', material: 'Steel Rebars (16mm)', materialId: 'MAT-005', usage: 'In-transit', taskId: '', siteId: 'SIT-202', location: 'Site B', qtyRequired: 200, qtyPresent: 200, forthcomingDates: '15 Sep 2024', type: 'material' },
  { id: 'MAT-BRK-001', orderId: '', material: 'Bricks (Red Clay)', materialId: 'MAT-006', usage: 'Not in-use', taskId: '', siteId: 'SIT-202', location: 'Site B', qtyRequired: 100, qtyPresent: 70, forthcomingDates: '', type: 'material' },
  { id: 'MAT-AGG-002', orderId: '', material: 'Aggregate (Fine/Sand)', materialId: 'MAT-003', usage: 'In-use', taskId: 'TSK-006', siteId: 'SIT-203', location: 'Site C', qtyRequired: 150, qtyPresent: 120, forthcomingDates: '20 Sep 2024', type: 'material' },
];

export const demoEquipmentInventory = [
  { id: 'EQP-EXC-001', orderId: '', equipment: 'Excavator EX-200', usage: 'In Use', taskId: 'TSK-005', siteId: 'SIT-202', location: 'Site B', qtyRequired: 1, qtyPresent: 1, forthcomingDates: '', type: 'equipment', condition: 'Good' },
  { id: 'EQP-MIX-001', orderId: '', equipment: 'Concrete Mixer 350L', usage: 'In Use', taskId: 'TSK-003', siteId: 'SIT-201', location: 'Site A', qtyRequired: 2, qtyPresent: 1, forthcomingDates: '10 Sep 2024', type: 'equipment', condition: 'Good' },
  { id: 'EQP-CRN-001', orderId: '', equipment: 'Tower Crane TC-48', usage: 'Maintenance Required', taskId: '', siteId: 'SIT-201', location: 'Site A', qtyRequired: 1, qtyPresent: 0, forthcomingDates: '', type: 'equipment', condition: 'Under Maintenance' },
  { id: 'EQP-VIB-001', orderId: '', equipment: 'Concrete Vibrator (Needle)', usage: 'Not in Use', taskId: '', siteId: 'SIT-201', location: 'Site A', qtyRequired: 4, qtyPresent: 4, forthcomingDates: '', type: 'equipment', condition: 'Good' },
  { id: 'EQP-GEN-001', orderId: '', equipment: 'Diesel Generator 25KVA', usage: 'In Use', taskId: '', siteId: 'SIT-203', location: 'Site C', qtyRequired: 1, qtyPresent: 1, forthcomingDates: '', type: 'equipment', condition: 'Good' },
];

export const demoStockMovements = [
  { id: 'SMV-001', inventoryId: 'MAT-CEM-001', type: 'Receipt', qty: 350, date: '2024-08-15', reference: 'GRN-001', by: 'EMP-004', note: 'First delivery from Vendor ACC-001' },
  { id: 'SMV-002', inventoryId: 'MAT-AGG-001', type: 'Receipt', qty: 95, date: '2024-08-20', reference: 'GRN-002', by: 'EMP-004', note: 'Aggregate delivery' },
  { id: 'SMV-003', inventoryId: 'MAT-REB-001', type: 'Receipt', qty: 189, date: '2024-08-22', reference: 'GRN-003', by: 'EMP-004', note: 'Rebar batch 1' },
  { id: 'SMV-004', inventoryId: 'MAT-BRK-001', type: 'Receipt', qty: 70, date: '2024-08-25', reference: 'GRN-004', by: 'EMP-005', note: 'Partial delivery' },
];

export const demoMaterialRequests = [
  { id: 'MRQ-001', materialId: 'MAT-001', materialName: 'Cement (OPC 53 Grade)', qty: 200, unit: 'Bags', projectId: 'PRJ-101', siteId: 'SIT-201', taskId: 'TSK-003', requiredDate: '2024-09-15', reason: 'Plinth beam casting requires additional cement.', submittedBy: 'EMP-004', submittedDate: '2024-09-01', status: 'Approved', approvedBy: 'EMP-002', approvedDate: '2024-09-02', attachments: [] },
  { id: 'MRQ-002', materialId: 'MAT-002', materialName: 'Aggregate (20mm)', qty: 50, unit: 'Cubic Metres', projectId: 'PRJ-101', siteId: 'SIT-202', taskId: '', requiredDate: '2024-09-20', reason: 'Foundation backfill required.', submittedBy: 'EMP-005', submittedDate: '2024-09-03', status: 'Pending', approvedBy: '', approvedDate: '', attachments: [] },
  { id: 'MRQ-003', materialId: 'MAT-006', materialName: 'Bricks (Red Clay)', qty: 50, unit: 'Thousands', projectId: 'PRJ-101', siteId: 'SIT-202', taskId: '', requiredDate: '2024-09-25', reason: 'Masonry work starting next phase.', submittedBy: 'EMP-005', submittedDate: '2024-09-05', status: 'Pending', approvedBy: '', approvedDate: '', attachments: [] },
  { id: 'MRQ-004', materialId: 'MAT-004', materialName: 'Steel Rebars (12mm)', qty: 10, unit: 'MT', projectId: 'PRJ-102', siteId: 'SIT-203', taskId: 'TSK-006', requiredDate: '2024-09-18', reason: 'Column reinforcement.', submittedBy: 'EMP-006', submittedDate: '2024-09-04', status: 'Rejected', approvedBy: 'EMP-003', approvedDate: '2024-09-05', rejectionReason: 'Sufficient stock available on site.' },
];

export const demoVendors = [
  { id: 'VND-001', name: 'ACC Cement Ltd', category: 'Supplier', contactPerson: 'Mohan Lal', phone: '9811234567', email: 'mohan@accement.in', address: 'Mumbai Industrial Area', taxNo: 'GST27AAAC0001A1Z1', status: 'Active', notes: 'Primary cement supplier.' },
  { id: 'VND-002', name: 'Tata Steel Sales', category: 'Supplier', contactPerson: 'Arun Singh', phone: '9811234568', email: 'arun@tatasales.in', address: 'Thane, Maharashtra', taxNo: 'GST27AAAB0001B1Z1', status: 'Active', notes: 'Approved steel supplier.' },
  { id: 'VND-003', name: 'Mumbai Aggregates', category: 'Supplier', contactPerson: 'Suresh Patil', phone: '9811234569', email: 'suresh@mumaggregate.in', address: 'Navi Mumbai', taxNo: 'GST27AAAB0002C1Z1', status: 'Active', notes: 'Sand and aggregate supplier.' },
  { id: 'VND-004', name: 'SpectraBuilt Civil', category: 'Contractor', contactPerson: 'Rajesh Gupta', phone: '9811234570', email: 'rajesh@spectrabuilt.in', address: 'Pune', taxNo: 'GST27AAAC0002D1Z1', status: 'Active', notes: 'Civil works contractor.' },
  { id: 'VND-005', name: 'PowerLine Electricals', category: 'Contractor', contactPerson: 'Anil Mehta', phone: '9811234571', email: 'anil@powerline.in', address: 'Delhi', taxNo: 'GST07AAAC0003E1Z1', status: 'Inactive', notes: 'Electrical contractor — contract expired.' },
];

export const demoRFQs = [
  { id: 'RFQ-001', materialRequestId: 'MRQ-001', title: 'Cement Supply RFQ', description: 'Request for quotation — 200 bags OPC 53 grade cement.', projectId: 'PRJ-101', siteId: 'SIT-201', createdBy: 'EMP-007', createdDate: '2024-09-03', vendors: ['VND-001'], status: 'Closed' },
  { id: 'RFQ-002', materialRequestId: 'MRQ-002', title: 'Aggregate Supply RFQ', description: 'Request for quotation — 50 cubic metres coarse aggregate.', projectId: 'PRJ-101', siteId: 'SIT-202', createdBy: 'EMP-007', createdDate: '2024-09-05', vendors: ['VND-003'], status: 'Open' },
];

export const demoQuotations = [
  { id: 'QTN-001', rfqId: 'RFQ-001', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', materialName: 'Cement (OPC 53 Grade)', qty: 200, unit: 'Bags', unitRate: 370, tax: 8, deliveryCharge: 2000, totalCost: 71520, deliveryDays: 3, paymentTerms: '30 days credit', reliability: 'High', status: 'Accepted', receivedDate: '2024-09-04' },
  { id: 'QTN-002', rfqId: 'RFQ-002', vendorId: 'VND-003', vendorName: 'Mumbai Aggregates', materialName: 'Aggregate (20mm)', qty: 50, unit: 'Cubic Metres', unitRate: 1750, tax: 18, deliveryCharge: 5000, totalCost: 108250, deliveryDays: 5, paymentTerms: '15 days credit', reliability: 'Medium', status: 'Pending', receivedDate: '2024-09-06' },
];

export const demoPurchaseOrders = [
  { id: 'PO-2024-001', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', projectId: 'PRJ-101', siteId: 'SIT-201', items: [{ materialId: 'MAT-001', name: 'Cement (OPC 53 Grade)', qty: 200, unit: 'Bags', rate: 370, tax: 8, total: 71520 }], totalAmount: 71520, expectedDelivery: '2024-09-10', linkedMRQ: 'MRQ-001', status: 'Received', approvedBy: 'EMP-002', approvalDate: '2024-09-05', createdBy: 'EMP-007', createdDate: '2024-09-05' },
  { id: 'PO-2024-002', vendorId: 'VND-003', vendorName: 'Mumbai Aggregates', projectId: 'PRJ-101', siteId: 'SIT-201', items: [{ materialId: 'MAT-002', name: 'Aggregate (20mm)', qty: 100, unit: 'Cubic Metres', rate: 1750, tax: 18, total: 206500 }], totalAmount: 206500, expectedDelivery: '2024-09-12', linkedMRQ: '', status: 'Dispatched', approvedBy: 'EMP-002', approvalDate: '2024-08-28', createdBy: 'EMP-007', createdDate: '2024-08-27' },
  { id: 'PO-2024-003', vendorId: 'VND-002', vendorName: 'Tata Steel Sales', projectId: 'PRJ-101', siteId: 'SIT-202', items: [{ materialId: 'MAT-005', name: 'Steel Rebars (16mm)', qty: 10, unit: 'MT', rate: 61500, tax: 18, total: 725700 }], totalAmount: 725700, expectedDelivery: '2024-09-15', linkedMRQ: '', status: 'Approved', approvedBy: 'EMP-002', approvalDate: '2024-09-06', createdBy: 'EMP-007', createdDate: '2024-09-06' },
  { id: 'PO-2024-004', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', projectId: 'PRJ-102', siteId: 'SIT-203', items: [{ materialId: 'MAT-001', name: 'Cement (OPC 53 Grade)', qty: 300, unit: 'Bags', rate: 375, tax: 8, total: 121500 }], totalAmount: 121500, expectedDelivery: '2024-09-20', linkedMRQ: '', status: 'Draft', approvedBy: '', approvalDate: '', createdBy: 'EMP-007', createdDate: '2024-09-07' },
];

export const demoDeliveries = [
  { id: 'DLV-001', poId: 'PO-2024-001', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', siteId: 'SIT-201', expectedDate: '2024-09-10', actualDate: '2024-09-10', status: 'Delivered', items: [{ materialId: 'MAT-001', name: 'Cement', orderedQty: 200, deliveredQty: 200 }] },
  { id: 'DLV-002', poId: 'PO-2024-002', vendorId: 'VND-003', vendorName: 'Mumbai Aggregates', siteId: 'SIT-201', expectedDate: '2024-09-12', actualDate: '', status: 'In Transit', items: [{ materialId: 'MAT-002', name: 'Aggregate', orderedQty: 100, deliveredQty: 0 }] },
];

export const demoReceipts = [
  { id: 'GRN-001', deliveryId: 'DLV-001', poId: 'PO-2024-001', vendorId: 'VND-001', siteId: 'SIT-201', receivedBy: 'EMP-004', receivedDate: '2024-09-10', items: [{ materialId: 'MAT-001', inventoryId: 'MAT-CEM-001', name: 'Cement', orderedQty: 200, deliveredQty: 200, acceptedQty: 200, rejectedQty: 0, discrepancy: false }], status: 'Verified', verifiedBy: 'EMP-002', verificationDate: '2024-09-11', notes: '' },
];

export const demoInvoices = [
  { id: 'INV-001', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', poId: 'PO-2024-001', deliveryId: 'DLV-001', receiptId: 'GRN-001', projectId: 'PRJ-101', siteId: 'SIT-201', invoiceNo: 'ACC/2024/1178', invoiceDate: '2024-09-11', items: [{ name: 'Cement', qty: 200, unitRate: 370, tax: 8, total: 71520 }], totalAmount: 71520, status: 'Verified', verifiedBy: 'EMP-008', verificationDate: '2024-09-13', paymentStatus: 'Partially Paid', paidAmount: 35760, dueDate: '2024-10-11' },
  { id: 'INV-002', vendorId: 'VND-002', vendorName: 'Tata Steel Sales', poId: 'PO-2024-003', deliveryId: '', receiptId: '', projectId: 'PRJ-101', siteId: 'SIT-202', invoiceNo: 'TS/2024/4521', invoiceDate: '2024-09-07', items: [{ name: 'Steel Rebars 16mm', qty: 10, unitRate: 61500, tax: 18, total: 725700 }], totalAmount: 725700, status: 'Pending Verification', verifiedBy: '', verificationDate: '', paymentStatus: 'Unpaid', paidAmount: 0, dueDate: '2024-10-07' },
];

export const demoPayments = [
  { id: 'PAY-001', invoiceId: 'INV-001', vendorId: 'VND-001', vendorName: 'ACC Cement Ltd', amount: 35760, date: '2024-09-15', method: 'NEFT', reference: 'NEFT20240915001', status: 'Paid', recordedBy: 'EMP-008', notes: 'Partial payment — 50%.' },
];

export const demoExpenses = [
  { id: 'EXP-001', date: '2024-09-01', projectId: 'PRJ-101', siteId: 'SIT-201', category: 'Labour', description: 'Daily wage workers for piling.', amount: 45000, submittedBy: 'EMP-004', approvedBy: 'EMP-002', status: 'Approved', receipt: '' },
  { id: 'EXP-002', date: '2024-09-03', projectId: 'PRJ-101', siteId: 'SIT-202', category: 'Equipment', description: 'Diesel for excavator.', amount: 8500, submittedBy: 'EMP-005', approvedBy: '', status: 'Pending', receipt: '' },
  { id: 'EXP-003', date: '2024-09-05', projectId: 'PRJ-102', siteId: 'SIT-203', category: 'Labour', description: 'Skilled masons for plinth beam.', amount: 62000, submittedBy: 'EMP-006', approvedBy: 'EMP-003', status: 'Approved', receipt: '' },
  { id: 'EXP-004', date: '2024-09-06', projectId: 'PRJ-101', siteId: 'SIT-201', category: 'Miscellaneous', description: 'Safety equipment purchase.', amount: 12500, submittedBy: 'EMP-004', approvedBy: '', status: 'Rejected', receipt: '' },
];

export const demoIssues = [
  { id: 'ISS-001', projectId: 'PRJ-101', siteId: 'SIT-202', category: 'Technical', description: 'Neighbour dispute delaying Tower B site demarcation. Eastern boundary contested.', raisedBy: 'EMP-005', raisedByName: 'Sunil Verma', date: '2024-03-16', priority: 'High', assignedTo: 'EMP-002', status: 'Assigned', resolution: '', comments: [{ by: 'EMP-002', date: '2024-03-17', text: 'Legal team notified. Awaiting survey report.' }], attachments: [], tagged: ['EMP-002','EMP-001'] },
  { id: 'ISS-002', projectId: 'PRJ-101', siteId: 'SIT-201', category: 'Material', description: 'Aggregate delivery short by 5 cubic metres. Vendor claims correct quantity dispatched.', raisedBy: 'EMP-004', raisedByName: 'Rajesh K', date: '2024-09-01', priority: 'Medium', assignedTo: 'EMP-007', status: 'Open', resolution: '', comments: [], attachments: [], tagged: ['EMP-007'] },
  { id: 'ISS-003', projectId: 'PRJ-102', siteId: 'SIT-203', category: 'Vendor', description: 'Concrete mixer delivery delayed by vendor SpectraBuilt. Equipment still not received.', raisedBy: 'EMP-006', raisedByName: 'Priya M', date: '2024-08-28', priority: 'High', assignedTo: 'EMP-007', status: 'In Review', resolution: '', comments: [{ by: 'EMP-007', date: '2024-08-29', text: 'Chased vendor. Committing to deliver by Sep 10.' }], attachments: [], tagged: ['EMP-003','EMP-007'] },
  { id: 'ISS-004', projectId: 'PRJ-103', siteId: 'SIT-204', category: 'Other', description: 'Scaffolding partially collapsed during de-shuttering. No injuries. Safety review required.', raisedBy: 'EMP-004', raisedByName: 'Rajesh K', date: '2024-09-04', priority: 'Critical', assignedTo: 'EMP-001', status: 'Escalated', resolution: '', comments: [], attachments: [], tagged: ['EMP-001','EMP-002'] },
];

export const demoDocuments = [
  { id: 'DOC-001', name: 'Alpha Tower - Foundation Drawing Rev 3', category: 'Drawings', projectId: 'PRJ-101', siteId: 'SIT-201', uploadedBy: 'EMP-009', uploadDate: '2024-02-10', version: 3, status: 'Approved', fileType: 'PDF', fileSize: '4.2 MB', url: '#' },
  { id: 'DOC-002', name: 'Soil Test Report - Site A', category: 'Reports', projectId: 'PRJ-101', siteId: 'SIT-201', uploadedBy: 'EMP-009', uploadDate: '2024-01-20', version: 1, status: 'Approved', fileType: 'PDF', fileSize: '1.8 MB', url: '#' },
  { id: 'DOC-003', name: 'PO-2024-001 Purchase Order', category: 'Purchase Documents', projectId: 'PRJ-101', siteId: 'SIT-201', uploadedBy: 'EMP-007', uploadDate: '2024-09-05', version: 1, status: 'Active', fileType: 'PDF', fileSize: '0.3 MB', url: '#' },
  { id: 'DOC-004', name: 'Omega Tech Park - Structural Specification', category: 'Contracts', projectId: 'PRJ-102', siteId: '', uploadedBy: 'EMP-009', uploadDate: '2024-03-01', version: 2, status: 'Approved', fileType: 'DOCX', fileSize: '2.1 MB', url: '#' },
];

export const demoDrawings = [
  { id: 'DRW-001', drawingId: 'A-FDN-001', title: 'Foundation Layout Plan', projectId: 'PRJ-101', siteId: 'SIT-201', discipline: 'Structural', revision: 3, author: 'EMP-009', authorName: 'Vikram Patel', date: '2024-02-10', status: 'Approved', linkedDocId: 'DOC-001', previousRevisions: ['A-FDN-001 Rev1', 'A-FDN-001 Rev2'] },
  { id: 'DRW-002', drawingId: 'A-COL-001', title: 'Column Schedule Level 1-10', projectId: 'PRJ-101', siteId: 'SIT-201', discipline: 'Structural', revision: 1, author: 'EMP-009', authorName: 'Vikram Patel', date: '2024-03-05', status: 'Submitted for Review', linkedDocId: '', previousRevisions: [] },
  { id: 'DRW-003', drawingId: 'A-ELEC-001', title: 'Electrical Layout Ground Floor', projectId: 'PRJ-102', siteId: 'SIT-203', discipline: 'Electrical', revision: 2, author: 'EMP-009', authorName: 'Vikram Patel', date: '2024-07-01', status: 'Revision Required', linkedDocId: '', previousRevisions: ['A-ELEC-001 Rev1'] },
];

export const demoSiteQueries = [
  { id: 'SQR-001', projectId: 'PRJ-101', siteId: 'SIT-201', query: 'Confirm rebar spacing for column C-12 at Level 3. Working drawing shows 150mm but structural spec says 125mm.', raisedBy: 'EMP-004', date: '2024-09-02', linkedDrawing: 'A-COL-001', status: 'Assigned', assignedTo: 'EMP-009', response: '', responseDate: '' },
  { id: 'SQR-002', projectId: 'PRJ-101', siteId: 'SIT-201', query: 'Wall thickness for internal partition walls — spec not clear on Block B.', raisedBy: 'EMP-004', date: '2024-09-05', linkedDrawing: '', status: 'Responded', assignedTo: 'EMP-009', response: 'Internal partitions in Block B are 115mm single brick. Refer drawing A-PLAN-003 Rev2.', responseDate: '2024-09-06' },
];

export const demoClients = [
  { id: 'CLI-001', name: 'Apex Corp', contactPerson: 'Sanjay Gupta', phone: '9922334455', email: 'sanjay@apexcorp.in', address: 'Nariman Point, Mumbai', status: 'Active', projects: ['PRJ-101'], notes: 'Key account — flagship tower.' },
  { id: 'CLI-002', name: 'Omega Systems', contactPerson: 'Kavita Reddy', phone: '9922334456', email: 'kavita@omegasystems.in', address: 'Baner, Pune', status: 'Active', projects: ['PRJ-102'], notes: '' },
  { id: 'CLI-003', name: 'City Group', contactPerson: 'Arun Khanna', phone: '9922334457', email: 'arun@citygroup.in', address: 'Connaught Place, Delhi', status: 'Active', projects: ['PRJ-103'], notes: '' },
  { id: 'CLI-004', name: 'Green Homes Developers', contactPerson: 'Meera Nair', phone: '9922334458', email: 'meera@greenhomes.in', address: 'Koramangala, Bangalore', status: 'Active', projects: ['PRJ-104'], notes: '' },
  { id: 'CLI-005', name: 'Sunrise Buildcon', contactPerson: 'Devesh Shah', phone: '9922334459', email: 'devesh@sunrisebuildcon.in', address: 'Andheri, Mumbai', status: 'Active', projects: ['PRJ-105'], notes: '' },
  { id: 'CLI-006', name: 'Priya Kapoor', contactPerson: 'Priya Kapoor', phone: '9811567890', email: 'priya.kapoor@gmail.com', address: 'Juhu, Mumbai', status: 'Prospect', projects: [], notes: 'Interested in 3BHK Alpha Tower.' },
  { id: 'CLI-007', name: 'Rajiv Malhotra', contactPerson: 'Rajiv Malhotra', phone: '9811567891', email: 'rajiv.m@malhotracorp.com', address: 'Bandra, Mumbai', status: 'Prospect', projects: [], notes: 'Looking for commercial space.' },
];

export const demoLeads = [
  { id: 'LED-001', clientId: 'CLI-006', clientName: 'Priya Kapoor', source: 'Website', requirements: '3BHK apartment, Alpha Tower', assignedTo: 'EMP-011', status: 'Qualified', nextFollowUp: '2024-09-10', createdDate: '2024-08-20', activity: [{ date: '2024-08-20', action: 'Lead created' }, { date: '2024-08-22', action: 'Initial call done. Client interested.' }] },
  { id: 'LED-002', clientId: 'CLI-007', clientName: 'Rajiv Malhotra', source: 'Referral', requirements: 'Commercial office space — Omega Tech Park', assignedTo: 'EMP-011', status: 'Proposal Sent', nextFollowUp: '2024-09-12', createdDate: '2024-08-28', activity: [{ date: '2024-08-28', action: 'Lead created' }, { date: '2024-09-01', action: 'Site visit conducted.' }, { date: '2024-09-05', action: 'Proposal sent.' }] },
  { id: 'LED-003', clientId: '', clientName: 'Ananya Iyer', source: 'Walk-in', requirements: '2BHK, Green Valley Villas', assignedTo: 'EMP-011', status: 'New', nextFollowUp: '2024-09-08', createdDate: '2024-09-07', activity: [{ date: '2024-09-07', action: 'Lead created.' }] },
];

export const demoSalesQuotations = [
  { id: 'SQT-001', clientId: 'CLI-006', clientName: 'Priya Kapoor', projectId: 'PRJ-101', unit: 'A-1204', description: '3BHK — 1450 sqft — Alpha Tower', amount: 14500000, createdDate: '2024-09-03', validTill: '2024-10-03', status: 'Awaiting Response', createdBy: 'EMP-011' },
  { id: 'SQT-002', clientId: 'CLI-007', clientName: 'Rajiv Malhotra', projectId: 'PRJ-102', unit: 'OT-301', description: 'Commercial office — 2200 sqft — Omega Tech Park Block 3', amount: 33000000, createdDate: '2024-09-05', validTill: '2024-10-05', status: 'Sent', createdBy: 'EMP-011' },
];

export const demoBookings = [
  { id: 'BKG-001', clientId: 'CLI-001', clientName: 'Apex Corp', projectId: 'PRJ-101', unit: 'A-Full-Block', quotationId: '', bookingAmount: 1000000, bookingDate: '2024-01-15', status: 'Confirmed', notes: 'Corporate booking for entire residential block.' },
];

export const demoAgreements = [
  { id: 'AGR-001', clientId: 'CLI-001', clientName: 'Apex Corp', projectId: 'PRJ-101', bookingId: 'BKG-001', totalValue: 452000000, signedDate: '2024-02-01', status: 'Signed', documents: ['DOC-001'] },
];

export const demoPaymentSchedules = [
  { id: 'PSC-001', agreementId: 'AGR-001', clientId: 'CLI-001', clientName: 'Apex Corp', projectId: 'PRJ-101', installments: [
    { no: 1, description: 'Booking advance', dueDate: '2024-02-01', amount: 45200000, status: 'Paid', paidDate: '2024-02-01' },
    { no: 2, description: 'On foundation completion', dueDate: '2024-06-30', amount: 90400000, status: 'Paid', paidDate: '2024-07-02' },
    { no: 3, description: 'On plinth completion', dueDate: '2024-10-31', amount: 90400000, status: 'Upcoming', paidDate: '' },
    { no: 4, description: 'On 5th floor slab', dueDate: '2025-02-28', amount: 90400000, status: 'Upcoming', paidDate: '' },
    { no: 5, description: 'Final payment on possession', dueDate: '2025-12-15', amount: 135600000, status: 'Upcoming', paidDate: '' },
  ]},
];

export const demoReceivables = [
  { id: 'RCV-001', scheduleId: 'PSC-001', clientId: 'CLI-001', clientName: 'Apex Corp', projectId: 'PRJ-101', installment: 3, description: 'On plinth completion', dueDate: '2024-10-31', amount: 90400000, status: 'Outstanding' },
];

export const demoDailyReports = [
  { id: 'RPT-001', projectId: 'PRJ-101', siteId: 'SIT-201', date: '2024-09-06', workPerformed: 'Plinth beam casting Zone A continued. 40 cubic metres poured.', plannedQty: 50, actualQty: 40, unit: 'cubic metres', tasksCompleted: ['TSK-003 progress'], materialsReceived: 'Nil', equipmentStatus: 'All equipment operational', issues: 'None', upcomingWork: 'Continue plinth beam Zone B tomorrow.', submittedBy: 'EMP-004', reviewStatus: 'Reviewed' },
  { id: 'RPT-002', projectId: 'PRJ-101', siteId: 'SIT-202', date: '2024-09-06', workPerformed: 'Boundary demarcation blocked. Meeting with neighbour scheduled.', plannedQty: 1, actualQty: 0, unit: 'lot', tasksCompleted: [], materialsReceived: 'Nil', equipmentStatus: 'Excavator idle due to blocked task.', issues: 'ISS-001 — neighbour dispute ongoing.', upcomingWork: 'Await legal clearance.', submittedBy: 'EMP-005', reviewStatus: 'Pending' },
];

export const demoNotifications = [
  { id: 'NTF-001', userId: 'EMP-002', type: 'task', title: 'Task Submitted for Verification', message: 'TSK-006 — IT Block 1 Plinth Beam submitted by Priya M.', link: '/pm/tasks', read: false, date: '2024-09-06 14:30' },
  { id: 'NTF-002', userId: 'EMP-002', type: 'material', title: 'Material Request Pending Approval', message: 'MRQ-002 — Aggregate 50 cum requested by Sunil Verma.', link: '/pm/materials', read: false, date: '2024-09-03 10:15' },
  { id: 'NTF-003', userId: 'EMP-007', type: 'purchase', title: 'PO Approved — Ready to Process', message: 'PO-2024-001 approved. Proceed with vendor coordination.', link: '/procurement/purchase-orders', read: true, date: '2024-09-05 09:00' },
  { id: 'NTF-004', userId: 'EMP-008', type: 'invoice', title: 'Invoice Pending Verification', message: 'INV-002 from Tata Steel Sales — ₹7,25,700 awaiting verification.', link: '/accounts/invoices', read: false, date: '2024-09-07 11:00' },
  { id: 'NTF-005', userId: 'EMP-004', type: 'task', title: 'New Task Assigned', message: 'TSK-004 — Column Casting Level 1 assigned to you.', link: '/engineer/tasks', read: true, date: '2024-09-01 08:00' },
];

export const demoActivity = [
  { id: 'ACT-001', timestamp: '2024-09-07 09:15', user: 'EMP-004', userName: 'Rajesh K', action: 'Submitted', module: 'Tasks', record: 'TSK-006', project: 'PRJ-102', site: 'SIT-203', description: 'Submitted task TSK-006 for verification.' },
  { id: 'ACT-002', timestamp: '2024-09-07 08:45', user: 'EMP-007', userName: 'Priya Rao', action: 'Created', module: 'Purchase Orders', record: 'PO-2024-004', project: 'PRJ-102', site: 'SIT-203', description: 'Created draft PO for cement supply.' },
  { id: 'ACT-003', timestamp: '2024-09-06 17:30', user: 'EMP-008', userName: 'Anjali Chauhan', action: 'Verified', module: 'Invoices', record: 'INV-001', project: 'PRJ-101', site: 'SIT-201', description: 'Verified invoice INV-001 — ₹71,520.' },
  { id: 'ACT-004', timestamp: '2024-09-06 14:00', user: 'EMP-002', userName: 'Rahul Mehta', action: 'Approved', module: 'Material Requests', record: 'MRQ-001', project: 'PRJ-101', site: 'SIT-201', description: 'Approved material request for cement.' },
  { id: 'ACT-005', timestamp: '2024-09-05 11:00', user: 'EMP-009', userName: 'Vikram Patel', action: 'Uploaded', module: 'Documents', record: 'DOC-001', project: 'PRJ-101', site: 'SIT-201', description: 'Uploaded revised foundation drawing Rev 3.' },
  { id: 'ACT-006', timestamp: '2024-09-05 10:30', user: 'EMP-002', userName: 'Rahul Mehta', action: 'Approved', module: 'Purchase Orders', record: 'PO-2024-001', project: 'PRJ-101', site: 'SIT-201', description: 'Approved purchase order for cement.' },
];

export const demoWeeklyTargets = [
  { id: 'WKT-001', taskId: 'TSK-001', taskCode: 'PC0301', week: 1, weekLabel: 'Week 1 (05 Feb - 09 Feb)', plannedQty: 5, actualQty: 4.25, unit: 'metres', status: 'Completed' },
  { id: 'WKT-002', taskId: 'TSK-002', taskCode: 'PC0302', week: 2, weekLabel: 'Week 2 (12 Feb - 16 Feb)', plannedQty: 5, actualQty: 5, unit: 'metres', status: 'Completed' },
  { id: 'WKT-003', taskId: 'TSK-003', taskCode: 'SP0101', week: 1, weekLabel: 'Week 1 (01 Mar - 07 Mar)', plannedQty: 50, actualQty: 45, unit: 'cubic metres', status: 'Completed' },
  { id: 'WKT-004', taskId: 'TSK-003', taskCode: 'SP0102', week: 2, weekLabel: 'Week 2 (08 Mar - 15 Mar)', plannedQty: 70, actualQty: 65, unit: 'cubic metres', status: 'In Progress' },
];

export const demoGlossary = [
  { id: 'GLO-001', term: 'Aggregate', definition: 'Sand particles, gravel, or finely crushed stone mixed with cement and water to prepare concrete.', relatedPhases: ['PC', 'SP'], relatedMaterials: ['MAT-002', 'MAT-003'] },
  { id: 'GLO-002', term: 'Balcony', definition: 'An external projection of a slab that can maximise floor area, improve aesthetics, and provide civil or social functions.', relatedPhases: ['SS'], relatedMaterials: [] },
  { id: 'GLO-003', term: 'Beam', definition: 'A horizontal structural member that bears load and connects columns.', relatedPhases: ['SP'], relatedMaterials: [] },
  { id: 'GLO-004', term: 'Building Services', definition: 'Operational and safety features in a building, including lifts, plumbing, HVAC, and electrical systems.', relatedPhases: ['BS'], relatedMaterials: [] },
  { id: 'GLO-005', term: 'Cantilever', definition: 'A horizontal member with rigid support at only one end.', relatedPhases: [], relatedMaterials: [] },
  { id: 'GLO-006', term: 'Casting', definition: 'Pouring concrete to create a column, beam, or slab.', relatedPhases: ['SP', 'SS'], relatedMaterials: [] },
  { id: 'GLO-007', term: 'Cement', definition: 'A raw material made from limestone, clay, shale, silicates, and other trace minerals, used to make concrete.', relatedPhases: ['SP', 'SS', 'BS'], relatedMaterials: ['MAT-001'] },
  { id: 'GLO-008', term: 'Cement Mixer', definition: 'A device used for mixing cement.', relatedPhases: [], relatedMaterials: [] },
  { id: 'GLO-009', term: 'Column', definition: 'A vertical load-bearing member typically placed to support slabs.', relatedPhases: ['SP'], relatedMaterials: [] },
  { id: 'GLO-010', term: 'Crane', definition: 'A machine that uses pulleys to lift and transport heavy loads.', relatedPhases: [], relatedMaterials: [] },
  { id: 'GLO-011', term: 'Curing Period', definition: 'The time taken by concrete to achieve its maximum strength after casting, typically 28 days.', relatedPhases: ['SP', 'SS'], relatedMaterials: [] },
  { id: 'GLO-012', term: 'Foundation/Footing', definition: 'The underground base of a structure that transfers load to the soil.', relatedPhases: ['PC'], relatedMaterials: [] },
  { id: 'GLO-013', term: 'Framing', definition: 'The structural system of columns and beams that transfers structural loads to the earth, such as RCC or steel framing.', relatedPhases: ['SP'], relatedMaterials: [] },
  { id: 'GLO-014', term: 'HVAC', definition: 'Heating, Ventilation, and Air Conditioning.', relatedPhases: ['BS'], relatedMaterials: [] },
  { id: 'GLO-015', term: 'Load', definition: 'Forces experienced by a structure due to its own weight, wind, seismic activity, furniture, internal components, people, and other imposed loads.', relatedPhases: [], relatedMaterials: [] },
  { id: 'GLO-016', term: 'Masonry', definition: 'The craft and science of placing bricks, stone, adobe blocks, concrete blocks, and similar units to create a structure.', relatedPhases: ['BS'], relatedMaterials: ['MAT-006'] },
  { id: 'GLO-017', term: 'MEP', definition: 'Mechanicals, Electricals, and Plumbing — the key building services systems.', relatedPhases: ['BS'], relatedMaterials: [] },
  { id: 'GLO-018', term: 'Piles', definition: 'Deep steel rod-like members drilled underground to transfer loads to stronger soil strata, typically used for large structures with high loads.', relatedPhases: ['PC'], relatedMaterials: [] },
  { id: 'GLO-019', term: 'Plumbing', definition: 'The branch of construction and building sciences concerned with sanitary infrastructure and systematic removal of human waste.', relatedPhases: ['BS'], relatedMaterials: [] },
  { id: 'GLO-020', term: 'Plinth', definition: 'The part of the structure that transfers load from the main structure to the foundation.', relatedPhases: ['SP'], relatedMaterials: [] },
  { id: 'GLO-021', term: 'Podium', definition: 'A system of multiple storeys stacked on top of one another, such as multistorey parking facilities.', relatedPhases: ['SP'], relatedMaterials: [] },
  { id: 'GLO-022', term: 'Pre-construction', definition: 'The phase before the main construction work, including site surveying, defining foundation placement, and foundation construction.', relatedPhases: ['PC'], relatedMaterials: [] },
  { id: 'GLO-023', term: 'Rebars', definition: 'Reinforcement bars, typically ranging from 8 mm to 60 mm in diameter, used to reinforce concrete.', relatedPhases: ['SP', 'SS'], relatedMaterials: ['MAT-004', 'MAT-005'] },
  { id: 'GLO-024', term: 'RCC (Reinforced Cement Concrete)', definition: 'Concrete reinforced with steel rebars to combine concrete\'s compressive strength with steel\'s tensile strength.', relatedPhases: ['SP', 'SS'], relatedMaterials: [] },
  { id: 'GLO-025', term: 'Scaffolding/Shuttering', definition: 'Temporary wooden or steel shutters used to mould wet concrete into columns, beams, or slabs. Their removal after hardening is called de-shuttering.', relatedPhases: ['SP', 'SS'], relatedMaterials: ['MAT-008'] },
  { id: 'GLO-026', term: 'Slab', definition: 'A thin horizontal structural member that defines a space, provides overhead cover and flooring, and is supported by beams and columns.', relatedPhases: ['SS'], relatedMaterials: [] },
  { id: 'GLO-027', term: 'Soil Testing', definition: 'Testing the stability and strength of the soil on which a structure will be built.', relatedPhases: ['PC'], relatedMaterials: [] },
  { id: 'GLO-028', term: 'Steel', definition: 'An alloy of iron and carbon, potentially containing elements such as nickel, with versatile construction applications.', relatedPhases: ['SP', 'SS'], relatedMaterials: ['MAT-004', 'MAT-005'] },
  { id: 'GLO-029', term: 'Substructure', definition: 'The part of the structure below ground level, consisting of the foundation/footing and plinth.', relatedPhases: ['PC', 'SP'], relatedMaterials: [] },
  { id: 'GLO-030', term: 'Superstructure', definition: 'The main part of the structure above ground level, consisting of inhabitable space.', relatedPhases: ['SP', 'SS'], relatedMaterials: [] },
  { id: 'GLO-031', term: 'Trowel', definition: 'A tool used by masons to work with concrete, plaster, mud, and similar materials.', relatedPhases: ['BS'], relatedMaterials: [] },
  { id: 'GLO-032', term: 'Vibrator', definition: 'A vibrating platform on which moulds of wet cement are placed to make the mixture more compact.', relatedPhases: ['SP', 'SS'], relatedMaterials: [] },
  { id: 'GLO-033', term: 'Working Drawing (WD)', definition: 'A detailed, scaled compilation of drawings prepared by architects that provides design details and serves as a reference for construction or manufacturing.', relatedPhases: [], relatedMaterials: [] },
];

export const demoWorkAssignments = [
  { id: 'WAS-001', contractorId: 'EMP-010', projectId: 'PRJ-101', siteId: 'SIT-201', taskId: 'TSK-003', scope: 'Plinth beam casting — Zone A', plannedQty: 120, unit: 'cubic metres', targetDate: '2024-03-15', status: 'In Progress', supervisingPM: 'EMP-002' },
];

export const demoLabourLogs = [
  { id: 'LBL-001', assignmentId: 'WAS-001', date: '2024-03-10', workers: 12, hoursWorked: 8, workDone: '40 cubic metres poured', reportedBy: 'EMP-010' },
];

// Role-to-credential mapping (client-side demo auth only)
export const demoCredentials = {
  'Admin': { username: 'admin', password: 'password', employeeId: 'EMP-001', name: 'Arjun Sharma' },
  'Project Manager': { username: 'pm', password: 'password', employeeId: 'EMP-002', name: 'Rahul Mehta' },
  'Site Engineer': { username: 'engineer', password: 'password', employeeId: 'EMP-004', name: 'Rajesh K' },
  'Procurement Officer': { username: 'procurement', password: 'password', employeeId: 'EMP-007', name: 'Priya Rao' },
  'Accounts': { username: 'accounts', password: 'password', employeeId: 'EMP-008', name: 'Anjali Chauhan' },
  'Architect': { username: 'architect', password: 'password', employeeId: 'EMP-009', name: 'Vikram Patel' },
  'Contractor': { username: 'contractor', password: 'password', employeeId: 'EMP-010', name: 'Ramesh Contractor' },
  'Sales Executive': { username: 'sales', password: 'password', employeeId: 'EMP-011', name: 'Riya Sharma' },
};
