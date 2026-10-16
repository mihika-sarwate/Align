import React, { createContext, useContext, useReducer } from 'react';
import {
  demoProjects, demoSites, demoTasks, demoEmployees, demoMaterials,
  demoInventory, demoEquipmentInventory, demoStockMovements, demoMaterialRequests,
  demoVendors, demoRFQs, demoQuotations, demoPurchaseOrders, demoDeliveries,
  demoReceipts, demoInvoices, demoPayments, demoExpenses, demoIssues,
  demoDocuments, demoDrawings, demoSiteQueries, demoClients, demoLeads,
  demoSalesQuotations, demoBookings, demoAgreements, demoPaymentSchedules,
  demoReceivables, demoDailyReports, demoNotifications, demoActivity,
  demoPhases, demoPhaseActivities, demoWeeklyTargets, demoGlossary,
  demoWorkAssignments, demoLabourLogs,
} from './demoData';

const AppContext = createContext(null);

const initialState = {
  projects: demoProjects,
  sites: demoSites,
  tasks: demoTasks,
  employees: demoEmployees,
  materials: demoMaterials,
  inventory: demoInventory,
  equipmentInventory: demoEquipmentInventory,
  stockMovements: demoStockMovements,
  materialRequests: demoMaterialRequests,
  vendors: demoVendors,
  rfqs: demoRFQs,
  quotations: demoQuotations,
  purchaseOrders: demoPurchaseOrders,
  deliveries: demoDeliveries,
  receipts: demoReceipts,
  invoices: demoInvoices,
  payments: demoPayments,
  expenses: demoExpenses,
  issues: demoIssues,
  documents: demoDocuments,
  drawings: demoDrawings,
  siteQueries: demoSiteQueries,
  clients: demoClients,
  leads: demoLeads,
  salesQuotations: demoSalesQuotations,
  bookings: demoBookings,
  agreements: demoAgreements,
  paymentSchedules: demoPaymentSchedules,
  receivables: demoReceivables,
  dailyReports: demoDailyReports,
  notifications: demoNotifications,
  activity: demoActivity,
  phases: demoPhases,
  phaseActivities: demoPhaseActivities,
  weeklyTargets: demoWeeklyTargets,
  glossary: demoGlossary,
  workAssignments: demoWorkAssignments,
  labourLogs: demoLabourLogs,
};

let nextId = 1000;
const genId = (prefix) => `${prefix}-${++nextId}`;

function addActivity(state, action, user, module, record, project, site, description) {
  const entry = {
    id: genId('ACT'),
    timestamp: new Date().toLocaleString('en-IN'),
    user,
    userName: state.employees.find(e => e.id === user)?.name || user,
    action,
    module,
    record,
    project: project || '',
    site: site || '',
    description,
  };
  return [entry, ...state.activity];
}

function addNotification(state, userId, type, title, message, link) {
  const notif = {
    id: genId('NTF'),
    userId,
    type,
    title,
    message,
    link,
    read: false,
    date: new Date().toLocaleString('en-IN'),
  };
  return [notif, ...state.notifications];
}

function recalcInventory(inventory) {
  return inventory;
}

function reducer(state, action) {
  switch (action.type) {

    // ——— PROJECTS ———
    case 'CREATE_PROJECT': {
      const project = { ...action.payload, id: genId('PRJ') };
      return { ...state, projects: [project, ...state.projects], activity: addActivity(state, 'Created', 'EMP-001', 'Projects', project.id, project.id, '', `Created project ${project.name}`) };
    }
    case 'UPDATE_PROJECT': {
      return { ...state, projects: state.projects.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p) };
    }
    case 'DELETE_PROJECT': {
      return { ...state, projects: state.projects.filter(p => p.id !== action.payload) };
    }

    // ——— SITES ———
    case 'CREATE_SITE': {
      const site = { ...action.payload, id: genId('SIT') };
      return { ...state, sites: [site, ...state.sites] };
    }
    case 'UPDATE_SITE': {
      return { ...state, sites: state.sites.map(s => s.id === action.payload.id ? { ...s, ...action.payload } : s) };
    }

    // ——— TASKS ———
    case 'CREATE_TASK': {
      const task = { ...action.payload, id: genId('TSK'), updates: [], attachments: [] };
      const newActivity = addActivity(state, 'Created', action.payload.createdBy || 'EMP-001', 'Tasks', task.id, task.projectId, task.siteId, `Created task ${task.title}`);
      const updatedNotifs = addNotification(state, task.assignedTo, 'task', 'New Task Assigned', `${task.title} assigned to you.`, '/engineer/tasks');
      return { ...state, tasks: [task, ...state.tasks], activity: newActivity, notifications: updatedNotifs };
    }
    case 'UPDATE_TASK': {
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t) };
    }
    case 'TASK_STATUS_CHANGE': {
      const { taskId, newStatus, note, by } = action.payload;
      const tasks = state.tasks.map(t => {
        if (t.id !== taskId) return t;
        const update = { by, date: new Date().toLocaleDateString('en-IN'), note: note || `Status changed to ${newStatus}` };
        return { ...t, status: newStatus, updates: [...(t.updates || []), update] };
      });
      const task = tasks.find(t => t.id === taskId);
      const newActivity = addActivity({ ...state, tasks }, 'Updated', by, 'Tasks', taskId, task?.projectId, task?.siteId, `Task ${taskId} status changed to ${newStatus}`);
      return { ...state, tasks, activity: newActivity };
    }
    case 'ADD_TASK_UPDATE': {
      const { taskId, update } = action.payload;
      return { ...state, tasks: state.tasks.map(t => t.id === taskId ? { ...t, updates: [...(t.updates || []), update] } : t) };
    }

    // ——— EMPLOYEES ———
    case 'CREATE_EMPLOYEE': {
      const emp = { ...action.payload, id: genId('EMP') };
      return { ...state, employees: [emp, ...state.employees] };
    }
    case 'UPDATE_EMPLOYEE': {
      return { ...state, employees: state.employees.map(e => e.id === action.payload.id ? { ...e, ...action.payload } : e) };
    }

    // ——— MATERIAL REQUESTS ———
    case 'CREATE_MATERIAL_REQUEST': {
      const mrq = { ...action.payload, id: genId('MRQ'), status: 'Pending', attachments: [] };
      const newActivity = addActivity(state, 'Created', mrq.submittedBy, 'Material Requests', mrq.id, mrq.projectId, mrq.siteId, `Material request for ${mrq.materialName} submitted`);
      const pm = state.sites.find(s => s.id === mrq.siteId)?.pm;
      const notifs = pm ? addNotification({ ...state, activity: newActivity }, pm, 'material', 'Material Request Pending', `${mrq.materialName} — ${mrq.qty} ${mrq.unit} requested.`, '/pm/materials') : [...state, activity];
      return { ...state, materialRequests: [mrq, ...state.materialRequests], activity: newActivity, notifications: Array.isArray(notifs) ? notifs : state.notifications };
    }
    case 'UPDATE_MATERIAL_REQUEST': {
      return { ...state, materialRequests: state.materialRequests.map(m => m.id === action.payload.id ? { ...m, ...action.payload } : m) };
    }
    case 'APPROVE_MATERIAL_REQUEST': {
      const { id, approvedBy, approvedDate } = action.payload;
      const updated = state.materialRequests.map(m => m.id === id ? { ...m, status: 'Approved', approvedBy, approvedDate } : m);
      const newActivity = addActivity({ ...state, materialRequests: updated }, 'Approved', approvedBy, 'Material Requests', id, '', '', `Material request ${id} approved`);
      return { ...state, materialRequests: updated, activity: newActivity };
    }
    case 'REJECT_MATERIAL_REQUEST': {
      const { id, approvedBy, rejectionReason } = action.payload;
      const updated = state.materialRequests.map(m => m.id === id ? { ...m, status: 'Rejected', approvedBy, rejectionReason } : m);
      return { ...state, materialRequests: updated };
    }

    // ——— VENDORS ———
    case 'CREATE_VENDOR': {
      const vendor = { ...action.payload, id: genId('VND') };
      return { ...state, vendors: [vendor, ...state.vendors] };
    }
    case 'UPDATE_VENDOR': {
      return { ...state, vendors: state.vendors.map(v => v.id === action.payload.id ? { ...v, ...action.payload } : v) };
    }

    // ——— PURCHASE ORDERS ———
    case 'CREATE_PURCHASE_ORDER': {
      const po = { ...action.payload, id: genId('PO'), status: 'Draft', createdDate: new Date().toLocaleDateString('en-IN') };
      const newActivity = addActivity(state, 'Created', po.createdBy, 'Purchase Orders', po.id, po.projectId, po.siteId, `Created PO for ${po.vendorName}`);
      return { ...state, purchaseOrders: [po, ...state.purchaseOrders], activity: newActivity };
    }
    case 'UPDATE_PURCHASE_ORDER': {
      return { ...state, purchaseOrders: state.purchaseOrders.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p) };
    }
    case 'APPROVE_PURCHASE_ORDER': {
      const { id, approvedBy } = action.payload;
      const updated = state.purchaseOrders.map(p => p.id === id ? { ...p, status: 'Approved', approvedBy, approvalDate: new Date().toLocaleDateString('en-IN') } : p);
      const newActivity = addActivity({ ...state, purchaseOrders: updated }, 'Approved', approvedBy, 'Purchase Orders', id, '', '', `PO ${id} approved`);
      return { ...state, purchaseOrders: updated, activity: newActivity };
    }

    // ——— DELIVERIES ———
    case 'CREATE_DELIVERY': {
      const dlv = { ...action.payload, id: genId('DLV') };
      return { ...state, deliveries: [dlv, ...state.deliveries] };
    }
    case 'UPDATE_DELIVERY': {
      return { ...state, deliveries: state.deliveries.map(d => d.id === action.payload.id ? { ...d, ...action.payload } : d) };
    }

    // ——— RECEIPTS / GRN ———
    case 'CREATE_RECEIPT': {
      const grn = { ...action.payload, id: genId('GRN'), status: 'Pending Verification' };
      // Update inventory for accepted quantities (idempotent: only if no existing GRN for same delivery)
      const alreadyReceived = state.receipts.some(r => r.deliveryId === grn.deliveryId);
      let inventory = state.inventory;
      let stockMovements = state.stockMovements;
      if (!alreadyReceived) {
        grn.items.forEach(item => {
          const idx = inventory.findIndex(inv => inv.id === item.inventoryId);
          if (idx >= 0) {
            inventory = inventory.map((inv, i) => i === idx ? { ...inv, qtyPresent: inv.qtyPresent + item.acceptedQty } : inv);
          }
          stockMovements = [...stockMovements, { id: genId('SMV'), inventoryId: item.inventoryId, type: 'Receipt', qty: item.acceptedQty, date: new Date().toLocaleDateString('en-IN'), reference: grn.id, by: grn.receivedBy, note: `GRN created` }];
        });
      }
      const newActivity = addActivity({ ...state, inventory, stockMovements }, 'Received', grn.receivedBy, 'Material Receipts', grn.id, '', grn.siteId, `GRN ${grn.id} created`);
      return { ...state, receipts: [grn, ...state.receipts], inventory, stockMovements, activity: newActivity };
    }
    case 'UPDATE_RECEIPT': {
      return { ...state, receipts: state.receipts.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r) };
    }
    case 'VERIFY_RECEIPT': {
      const { id, verifiedBy } = action.payload;
      return { ...state, receipts: state.receipts.map(r => r.id === id ? { ...r, status: 'Verified', verifiedBy, verificationDate: new Date().toLocaleDateString('en-IN') } : r) };
    }

    // ——— INVOICES ———
    case 'CREATE_INVOICE': {
      const inv = { ...action.payload, id: genId('INV'), status: 'Pending Verification', paymentStatus: 'Unpaid', paidAmount: 0 };
      const newActivity = addActivity(state, 'Created', 'EMP-007', 'Invoices', inv.id, inv.projectId, inv.siteId, `Invoice ${inv.invoiceNo} recorded`);
      return { ...state, invoices: [inv, ...state.invoices], activity: newActivity };
    }
    case 'UPDATE_INVOICE': {
      return { ...state, invoices: state.invoices.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i) };
    }
    case 'VERIFY_INVOICE': {
      const { id, verifiedBy } = action.payload;
      const updated = state.invoices.map(i => i.id === id ? { ...i, status: 'Verified', verifiedBy, verificationDate: new Date().toLocaleDateString('en-IN') } : i);
      const newActivity = addActivity({ ...state, invoices: updated }, 'Verified', verifiedBy, 'Invoices', id, '', '', `Invoice ${id} verified`);
      return { ...state, invoices: updated, activity: newActivity };
    }

    // ——— PAYMENTS ———
    case 'CREATE_PAYMENT': {
      const pmt = { ...action.payload, id: genId('PAY'), status: 'Paid' };
      // Update invoice paid amount
      let invoices = state.invoices.map(inv => {
        if (inv.id !== pmt.invoiceId) return inv;
        const newPaid = (inv.paidAmount || 0) + pmt.amount;
        const newStatus = newPaid >= inv.totalAmount ? 'Paid' : 'Partially Paid';
        return { ...inv, paidAmount: newPaid, paymentStatus: newStatus };
      });
      const newActivity = addActivity({ ...state, invoices }, 'Paid', pmt.recordedBy, 'Payments', pmt.id, '', '', `Payment ${pmt.id} recorded — ₹${pmt.amount.toLocaleString('en-IN')}`);
      return { ...state, payments: [pmt, ...state.payments], invoices, activity: newActivity };
    }

    // ——— EXPENSES ———
    case 'CREATE_EXPENSE': {
      const exp = { ...action.payload, id: genId('EXP'), status: 'Pending' };
      return { ...state, expenses: [exp, ...state.expenses] };
    }
    case 'UPDATE_EXPENSE': {
      return { ...state, expenses: state.expenses.map(e => e.id === action.payload.id ? { ...e, ...action.payload } : e) };
    }
    case 'APPROVE_EXPENSE': {
      const { id, approvedBy } = action.payload;
      return { ...state, expenses: state.expenses.map(e => e.id === id ? { ...e, status: 'Approved', approvedBy } : e) };
    }
    case 'REJECT_EXPENSE': {
      const { id, approvedBy } = action.payload;
      return { ...state, expenses: state.expenses.map(e => e.id === id ? { ...e, status: 'Rejected', approvedBy } : e) };
    }

    // ——— ISSUES ———
    case 'CREATE_ISSUE': {
      const issue = { ...action.payload, id: genId('ISS'), status: 'Open', comments: [], attachments: [] };
      const newActivity = addActivity(state, 'Created', issue.raisedBy, 'Issues', issue.id, issue.projectId, issue.siteId, `Issue raised: ${issue.description.substring(0, 60)}`);
      return { ...state, issues: [issue, ...state.issues], activity: newActivity };
    }
    case 'UPDATE_ISSUE': {
      return { ...state, issues: state.issues.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i) };
    }
    case 'ADD_ISSUE_COMMENT': {
      const { issueId, comment } = action.payload;
      return { ...state, issues: state.issues.map(i => i.id === issueId ? { ...i, comments: [...(i.comments || []), comment] } : i) };
    }
    case 'ISSUE_STATUS_CHANGE': {
      const { issueId, newStatus, resolution, by } = action.payload;
      return { ...state, issues: state.issues.map(i => i.id === issueId ? { ...i, status: newStatus, resolution: resolution || i.resolution } : i) };
    }

    // ——— DOCUMENTS ———
    case 'CREATE_DOCUMENT': {
      const doc = { ...action.payload, id: genId('DOC'), version: 1, status: 'Active', uploadDate: new Date().toLocaleDateString('en-IN') };
      return { ...state, documents: [doc, ...state.documents] };
    }
    case 'UPDATE_DOCUMENT': {
      return { ...state, documents: state.documents.map(d => d.id === action.payload.id ? { ...d, ...action.payload } : d) };
    }

    // ——— DRAWINGS ———
    case 'CREATE_DRAWING': {
      const drawing = { ...action.payload, id: genId('DRW'), revision: 1, status: 'Draft', previousRevisions: [] };
      return { ...state, drawings: [drawing, ...state.drawings] };
    }
    case 'UPDATE_DRAWING': {
      return { ...state, drawings: state.drawings.map(d => d.id === action.payload.id ? { ...d, ...action.payload } : d) };
    }
    case 'REVISE_DRAWING': {
      const { id, newRevision, by } = action.payload;
      const existing = state.drawings.find(d => d.id === id);
      if (!existing) return state;
      const updated = state.drawings.map(d => d.id === id ? {
        ...d, ...newRevision,
        revision: d.revision + 1,
        previousRevisions: [...(d.previousRevisions || []), `${d.drawingId} Rev${d.revision} — ${d.date}`],
        status: 'Draft',
        date: new Date().toLocaleDateString('en-IN'),
      } : d);
      return { ...state, drawings: updated };
    }

    // ——— CLIENTS ———
    case 'CREATE_CLIENT': {
      const client = { ...action.payload, id: genId('CLI') };
      return { ...state, clients: [client, ...state.clients] };
    }
    case 'UPDATE_CLIENT': {
      return { ...state, clients: state.clients.map(c => c.id === action.payload.id ? { ...c, ...action.payload } : c) };
    }

    // ——— LEADS ———
    case 'CREATE_LEAD': {
      const lead = { ...action.payload, id: genId('LED'), status: 'New', activity: [{ date: new Date().toLocaleDateString('en-IN'), action: 'Lead created' }] };
      return { ...state, leads: [lead, ...state.leads] };
    }
    case 'UPDATE_LEAD': {
      return { ...state, leads: state.leads.map(l => l.id === action.payload.id ? { ...l, ...action.payload } : l) };
    }

    // ——— SALES QUOTATIONS ———
    case 'CREATE_SALES_QUOTATION': {
      const q = { ...action.payload, id: genId('SQT'), status: 'Draft', createdDate: new Date().toLocaleDateString('en-IN') };
      return { ...state, salesQuotations: [q, ...state.salesQuotations] };
    }
    case 'UPDATE_SALES_QUOTATION': {
      return { ...state, salesQuotations: state.salesQuotations.map(q => q.id === action.payload.id ? { ...q, ...action.payload } : q) };
    }

    // ——— BOOKINGS ———
    case 'CREATE_BOOKING': {
      const bkg = { ...action.payload, id: genId('BKG'), status: 'Pending Confirmation', bookingDate: new Date().toLocaleDateString('en-IN') };
      return { ...state, bookings: [bkg, ...state.bookings] };
    }
    case 'UPDATE_BOOKING': {
      return { ...state, bookings: state.bookings.map(b => b.id === action.payload.id ? { ...b, ...action.payload } : b) };
    }

    // ——— AGREEMENTS ———
    case 'CREATE_AGREEMENT': {
      const agr = { ...action.payload, id: genId('AGR'), status: 'Draft', documents: [] };
      return { ...state, agreements: [agr, ...state.agreements] };
    }
    case 'UPDATE_AGREEMENT': {
      return { ...state, agreements: state.agreements.map(a => a.id === action.payload.id ? { ...a, ...action.payload } : a) };
    }

    // ——— PAYMENT SCHEDULES ———
    case 'CREATE_PAYMENT_SCHEDULE': {
      const ps = { ...action.payload, id: genId('PSC') };
      return { ...state, paymentSchedules: [ps, ...state.paymentSchedules] };
    }
    case 'UPDATE_PAYMENT_SCHEDULE_INSTALLMENT': {
      const { scheduleId, installmentNo, updates } = action.payload;
      return {
        ...state,
        paymentSchedules: state.paymentSchedules.map(ps => ps.id !== scheduleId ? ps : {
          ...ps,
          installments: ps.installments.map(inst => inst.no === installmentNo ? { ...inst, ...updates } : inst)
        })
      };
    }

    // ——— DAILY REPORTS ———
    case 'CREATE_DAILY_REPORT': {
      const rpt = { ...action.payload, id: genId('RPT'), reviewStatus: 'Pending' };
      return { ...state, dailyReports: [rpt, ...state.dailyReports] };
    }
    case 'UPDATE_DAILY_REPORT': {
      return { ...state, dailyReports: state.dailyReports.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r) };
    }

    // ——— NOTIFICATIONS ———
    case 'MARK_NOTIFICATION_READ': {
      return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    }
    case 'MARK_ALL_NOTIFICATIONS_READ': {
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    }

    // ——— INVENTORY ———
    case 'UPDATE_INVENTORY': {
      return { ...state, inventory: state.inventory.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i) };
    }
    case 'CREATE_INVENTORY_ITEM': {
      const item = { ...action.payload, id: action.payload.id || genId('MAT') };
      return { ...state, inventory: [item, ...state.inventory] };
    }
    case 'STOCK_MOVEMENT': {
      const { inventoryId, movementType, qty, reference, by, note } = action.payload;
      const movement = { id: genId('SMV'), inventoryId, type: movementType, qty, date: new Date().toLocaleDateString('en-IN'), reference, by, note };
      let inventory = state.inventory.map(inv => {
        if (inv.id !== inventoryId) return inv;
        const delta = (movementType === 'Issue' || movementType === 'Transfer Out') ? -qty : qty;
        return { ...inv, qtyPresent: Math.max(0, inv.qtyPresent + delta) };
      });
      return { ...state, inventory, stockMovements: [movement, ...state.stockMovements] };
    }

    // ——— RFQS ———
    case 'CREATE_RFQ': {
      const rfq = { ...action.payload, id: genId('RFQ'), status: 'Open', createdDate: new Date().toLocaleDateString('en-IN') };
      return { ...state, rfqs: [rfq, ...state.rfqs] };
    }

    // ——— QUOTATIONS ———
    case 'CREATE_QUOTATION': {
      const q = { ...action.payload, id: genId('QTN'), status: 'Pending', receivedDate: new Date().toLocaleDateString('en-IN') };
      return { ...state, quotations: [q, ...state.quotations] };
    }

    // ——— SITE QUERIES ———
    case 'CREATE_SITE_QUERY': {
      const sq = { ...action.payload, id: genId('SQR'), status: 'New', response: '', responseDate: '' };
      return { ...state, siteQueries: [sq, ...state.siteQueries] };
    }
    case 'RESPOND_SITE_QUERY': {
      const { id, response, by } = action.payload;
      return { ...state, siteQueries: state.siteQueries.map(sq => sq.id === id ? { ...sq, status: 'Responded', response, responseDate: new Date().toLocaleDateString('en-IN'), assignedTo: by } : sq) };
    }

    // ——— WORK ASSIGNMENTS (Contractor) ———
    case 'CREATE_WORK_ASSIGNMENT': {
      const wa = { ...action.payload, id: genId('WAS') };
      return { ...state, workAssignments: [wa, ...state.workAssignments] };
    }
    case 'UPDATE_WORK_ASSIGNMENT': {
      return { ...state, workAssignments: state.workAssignments.map(w => w.id === action.payload.id ? { ...w, ...action.payload } : w) };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

// Convenience selector: surplus/deficit %
export function surplusDeficit(qtyPresent, qtyRequired) {
  if (!qtyRequired || qtyRequired === 0) return null;
  return Math.round((qtyPresent / qtyRequired) * 100);
}
