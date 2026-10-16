import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';

// Layouts
import AdminLayout from './components/AdminLayout';
import RoleLayout from './components/RoleLayout';

// Auth
import Login from './pages/Login';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import ProjectsPage from './pages/admin/ProjectsPage';
import SitesPage from './pages/admin/SitesPage';
import TasksPage from './pages/admin/TasksPage';
import MaterialsPage from './pages/admin/MaterialsPage';
import InventoryPage from './pages/admin/InventoryPage';
import PurchasesPage from './pages/admin/PurchasesPage';
import ExpensesPage from './pages/admin/ExpensesPage';
import ProgressPage from './pages/admin/ProgressPage';
import IssuesPage from './pages/admin/IssuesPage';
import DocumentsPage from './pages/admin/DocumentsPage';
import ActivityPage from './pages/admin/ActivityPage';
import EmployeesPage from './pages/admin/EmployeesPage';
import RolesPage from './pages/admin/RolesPage';
import VendorsPage from './pages/admin/VendorsPage';
import ClientsPage from './pages/admin/ClientsPage';
import SettingsPage from './pages/admin/SettingsPage';
import GlossaryPage from './pages/admin/GlossaryPage';

// PM pages
import PMDashboard from './pages/pm/PMDashboard';
import PMProjectsPage from './pages/pm/PMProjectsPage';
import PMSitesPage from './pages/pm/PMSitesPage';
import PMTasksPage from './pages/pm/PMTasksPage';
import PMPhasesPage from './pages/pm/PMPhasesPage';
import PMMaterialsPage from './pages/pm/PMMaterialsPage';
import PMInventoryPage from './pages/pm/PMInventoryPage';
import PMMaterialRequestsPage from './pages/pm/PMMaterialRequestsPage';
import PMPurchasesPage from './pages/pm/PMPurchasesPage';
import PMExpensesPage from './pages/pm/PMExpensesPage';
import PMProgressPage from './pages/pm/PMProgressPage';
import PMDailyReportsPage from './pages/pm/PMDailyReportsPage';
import PMIssuesPage from './pages/pm/PMIssuesPage';
import PMDocumentsPage from './pages/pm/PMDocumentsPage';
import PMReportsPage from './pages/pm/PMReportsPage';
import PMActivityPage from './pages/pm/PMActivityPage';
import PMApprovalsPage from './pages/pm/PMApprovalsPage';
import PMCalendarPage from './pages/pm/PMCalendarPage';
import PMProfilePage from './pages/shared/ProfilePage';

// Site Engineer pages
import EngineerDashboard from './pages/engineer/EngineerDashboard';
import SEMySitesPage from './pages/engineer/SEMySitesPage';
import SETasksPage from './pages/engineer/SETasksPage';
import SEMaterialsPage from './pages/engineer/SEMaterialsPage';
import SEMaterialRequestsPage from './pages/engineer/SEMaterialRequestsPage';
import SEInventoryPage from './pages/engineer/SEInventoryPage';
import SEEquipmentPage from './pages/engineer/SEEquipmentPage';
import SEReceiptsPage from './pages/engineer/SEReceiptsPage';
import SEProgressPage from './pages/engineer/SEProgressPage';
import SEDailyReportsPage from './pages/engineer/SEDailyReportsPage';
import SEIssuesPage from './pages/engineer/SEIssuesPage';
import SEDocumentsPage from './pages/engineer/SEDocumentsPage';
import SEActivityPage from './pages/engineer/SEActivityPage';

// Procurement pages
import PODashboard from './pages/procurement/PODashboard';
import POMaterialRequestsPage from './pages/procurement/POMaterialRequestsPage';
import POApprovalsPage from './pages/procurement/POApprovalsPage';
import PORFQsPage from './pages/procurement/PORFQsPage';
import POQuotationsPage from './pages/procurement/POQuotationsPage';
import POPurchaseOrdersPage from './pages/procurement/POPurchaseOrdersPage';
import PODeliveriesPage from './pages/procurement/PODeliveriesPage';
import POReceiptsPage from './pages/procurement/POReceiptsPage';
import POInventoryPage from './pages/procurement/POInventoryPage';
import POEquipmentPage from './pages/procurement/POEquipmentPage';
import POVendorsPage from './pages/procurement/POVendorsPage';
import POContractsPage from './pages/procurement/POContractsPage';
import POReportsPage from './pages/procurement/POReportsPage';
import POIssuesPage from './pages/procurement/POIssuesPage';
import PODocumentsPage from './pages/procurement/PODocumentsPage';
import POActivityPage from './pages/procurement/POActivityPage';

// Accounts pages
import AccountsDashboard from './pages/accounts/AccountsDashboard';
import AccountsPOPage from './pages/accounts/AccountsPOPage';
import AccountsReceiptsPage from './pages/accounts/AccountsReceiptsPage';
import AccountsInvoicesPage from './pages/accounts/AccountsInvoicesPage';
import AccountsInvoiceVerificationPage from './pages/accounts/AccountsInvoiceVerificationPage';
import AccountsPaymentsPage from './pages/accounts/AccountsPaymentsPage';
import AccountsPaymentSchedulePage from './pages/accounts/AccountsPaymentSchedulePage';
import AccountsExpensesPage from './pages/accounts/AccountsExpensesPage';
import AccountsVendorStatementsPage from './pages/accounts/AccountsVendorStatementsPage';
import AccountsBankAccountsPage from './pages/accounts/AccountsBankAccountsPage';
import AccountsTaxPage from './pages/accounts/AccountsTaxPage';
import AccountsAgingPage from './pages/accounts/AccountsAgingPage';
import AccountsReportsPage from './pages/accounts/AccountsReportsPage';
import AccountsReconciliationPage from './pages/accounts/AccountsReconciliationPage';
import AccountsDocumentsPage from './pages/accounts/AccountsDocumentsPage';
import AccountsActivityPage from './pages/accounts/AccountsActivityPage';

// Architect pages
import ArchitectDashboard from './pages/architect/ArchitectDashboard';
import ArchitectProjectsPage from './pages/architect/ArchitectProjectsPage';
import WorkingDrawingsPage from './pages/architect/WorkingDrawingsPage';
import DrawingRevisionsPage from './pages/architect/DrawingRevisionsPage';
import DesignDocsPage from './pages/architect/DesignDocsPage';
import TechSpecsPage from './pages/architect/TechSpecsPage';
import SiteQueriesPage from './pages/architect/SiteQueriesPage';
import ArchitectIssuesPage from './pages/architect/ArchitectIssuesPage';
import ReviewRequestsPage from './pages/architect/ReviewRequestsPage';
import ArchitectDocumentsPage from './pages/architect/ArchitectDocumentsPage';
import ArchitectActivityPage from './pages/architect/ArchitectActivityPage';

// Contractor pages
import ContractorDashboard from './pages/contractor/ContractorDashboard';
import ContractorProjectsPage from './pages/contractor/ContractorProjectsPage';
import AssignedWorkPage from './pages/contractor/AssignedWorkPage';
import WorkSchedulePage from './pages/contractor/WorkSchedulePage';
import LabourCrewPage from './pages/contractor/LabourCrewPage';
import WorkUpdatesPage from './pages/contractor/WorkUpdatesPage';
import ContractorMaterialsPage from './pages/contractor/ContractorMaterialsPage';
import ContractorEquipmentPage from './pages/contractor/ContractorEquipmentPage';
import ContractorIssuesPage from './pages/contractor/ContractorIssuesPage';
import ContractorDocumentsPage from './pages/contractor/ContractorDocumentsPage';
import ContractorReportsPage from './pages/contractor/ContractorReportsPage';
import ContractorActivityPage from './pages/contractor/ContractorActivityPage';

// Sales pages
import SalesDashboard from './pages/sales/SalesDashboard';
import SalesClientsPage from './pages/sales/SalesClientsPage';
import SalesLeadsPage from './pages/sales/SalesLeadsPage';
import SalesQuotationsPage from './pages/sales/SalesQuotationsPage';
import SalesBookingsPage from './pages/sales/SalesBookingsPage';
import SalesAgreementsPage from './pages/sales/SalesAgreementsPage';
import SalesPaymentSchedulePage from './pages/sales/SalesPaymentSchedulePage';
import SalesReceivablesPage from './pages/sales/SalesReceivablesPage';
import SalesFollowupsPage from './pages/sales/SalesFollowupsPage';
import SalesReportsPage from './pages/sales/SalesReportsPage';
import SalesDocumentsPage from './pages/sales/SalesDocumentsPage';
import SalesActivityPage from './pages/sales/SalesActivityPage';

// Shared
import ProfilePage from './pages/shared/ProfilePage';

const ROLE_PATH = {
  'Admin': '/admin',
  'Project Manager': '/pm',
  'Site Engineer': '/engineer',
  'Procurement Officer': '/procurement',
  'Accounts': '/accounts',
  'Architect': '/architect',
  'Contractor': '/contractor',
  'Sales Executive': '/sales',
};

function ProtectedRoute({ auth, requiredRole, children }) {
  if (!auth || auth.role !== requiredRole) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<Login onLogin={setAuth} />} />

        {/* ── ADMIN ─────────────────────────────────── */}
        <Route path="/admin" element={<ProtectedRoute auth={auth} requiredRole="Admin"><AdminLayout role="admin" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="sites" element={<SitesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="issues" element={<IssuesPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<AdminDashboard />} />
        </Route>

        {/* ── PROJECT MANAGER ──────────────────────── */}
        <Route path="/pm" element={<ProtectedRoute auth={auth} requiredRole="Project Manager"><RoleLayout role="pm" /></ProtectedRoute>}>
          <Route index element={<PMDashboard />} />
          <Route path="projects" element={<PMProjectsPage />} />
          <Route path="sites" element={<PMSitesPage />} />
          <Route path="tasks" element={<PMTasksPage />} />
          <Route path="phases" element={<PMPhasesPage />} />
          <Route path="materials" element={<PMMaterialsPage />} />
          <Route path="inventory" element={<PMInventoryPage />} />
          <Route path="material-requests" element={<PMMaterialRequestsPage />} />
          <Route path="purchases" element={<PMPurchasesPage />} />
          <Route path="expenses" element={<PMExpensesPage />} />
          <Route path="progress" element={<PMProgressPage />} />
          <Route path="daily-reports" element={<PMDailyReportsPage />} />
          <Route path="issues" element={<PMIssuesPage />} />
          <Route path="documents" element={<PMDocumentsPage />} />
          <Route path="reports" element={<PMReportsPage />} />
          <Route path="activity" element={<PMActivityPage />} />
          <Route path="approvals" element={<PMApprovalsPage />} />
          <Route path="calendar" element={<PMCalendarPage />} />
          <Route path="profile" element={<PMProfilePage role="pm" name="Rahul Mehta" />} />
        </Route>

        {/* ── SITE ENGINEER ─────────────────────────── */}
        <Route path="/engineer" element={<ProtectedRoute auth={auth} requiredRole="Site Engineer"><RoleLayout role="se" /></ProtectedRoute>}>
          <Route index element={<EngineerDashboard />} />
          <Route path="sites" element={<SEMySitesPage />} />
          <Route path="tasks" element={<SETasksPage />} />
          <Route path="materials" element={<SEMaterialsPage />} />
          <Route path="material-requests" element={<SEMaterialRequestsPage />} />
          <Route path="inventory" element={<SEInventoryPage />} />
          <Route path="equipment" element={<SEEquipmentPage />} />
          <Route path="receipts" element={<SEReceiptsPage />} />
          <Route path="progress" element={<SEProgressPage />} />
          <Route path="daily-reports" element={<SEDailyReportsPage />} />
          <Route path="issues" element={<SEIssuesPage />} />
          <Route path="documents" element={<SEDocumentsPage />} />
          <Route path="activity" element={<SEActivityPage />} />
          <Route path="profile" element={<ProfilePage role="se" name="Rajesh K" />} />
        </Route>

        {/* ── PROCUREMENT ───────────────────────────── */}
        <Route path="/procurement" element={<ProtectedRoute auth={auth} requiredRole="Procurement Officer"><RoleLayout role="po" /></ProtectedRoute>}>
          <Route index element={<PODashboard />} />
          <Route path="material-requests" element={<POMaterialRequestsPage />} />
          <Route path="approvals" element={<POApprovalsPage />} />
          <Route path="rfqs" element={<PORFQsPage />} />
          <Route path="quotations" element={<POQuotationsPage />} />
          <Route path="purchase-orders" element={<POPurchaseOrdersPage />} />
          <Route path="deliveries" element={<PODeliveriesPage />} />
          <Route path="receipts" element={<POReceiptsPage />} />
          <Route path="inventory" element={<POInventoryPage />} />
          <Route path="equipment" element={<POEquipmentPage />} />
          <Route path="vendors" element={<POVendorsPage />} />
          <Route path="contracts" element={<POContractsPage />} />
          <Route path="reports" element={<POReportsPage />} />
          <Route path="issues" element={<POIssuesPage />} />
          <Route path="documents" element={<PODocumentsPage />} />
          <Route path="activity" element={<POActivityPage />} />
          <Route path="profile" element={<ProfilePage role="po" name="Priya Rao" />} />
        </Route>

        {/* ── ACCOUNTS ──────────────────────────────── */}
        <Route path="/accounts" element={<ProtectedRoute auth={auth} requiredRole="Accounts"><RoleLayout role="accounts" /></ProtectedRoute>}>
          <Route index element={<AccountsDashboard />} />
          <Route path="purchase-orders" element={<AccountsPOPage />} />
          <Route path="receipts" element={<AccountsReceiptsPage />} />
          <Route path="invoices" element={<AccountsInvoicesPage />} />
          <Route path="invoice-verification" element={<AccountsInvoiceVerificationPage />} />
          <Route path="payments" element={<AccountsPaymentsPage />} />
          <Route path="payment-schedule" element={<AccountsPaymentSchedulePage />} />
          <Route path="expenses" element={<AccountsExpensesPage />} />
          <Route path="vendor-statements" element={<AccountsVendorStatementsPage />} />
          <Route path="bank-accounts" element={<AccountsBankAccountsPage />} />
          <Route path="tax" element={<AccountsTaxPage />} />
          <Route path="aging" element={<AccountsAgingPage />} />
          <Route path="reports" element={<AccountsReportsPage />} />
          <Route path="reconciliation" element={<AccountsReconciliationPage />} />
          <Route path="documents" element={<AccountsDocumentsPage />} />
          <Route path="activity" element={<AccountsActivityPage />} />
          <Route path="profile" element={<ProfilePage role="accounts" name="Anjali Chauhan" />} />
        </Route>

        {/* ── ARCHITECT ─────────────────────────────── */}
        <Route path="/architect" element={<ProtectedRoute auth={auth} requiredRole="Architect"><RoleLayout role="architect" /></ProtectedRoute>}>
          <Route index element={<ArchitectDashboard />} />
          <Route path="projects" element={<ArchitectProjectsPage />} />
          <Route path="drawings" element={<WorkingDrawingsPage />} />
          <Route path="revisions" element={<DrawingRevisionsPage />} />
          <Route path="design-docs" element={<DesignDocsPage />} />
          <Route path="tech-specs" element={<TechSpecsPage />} />
          <Route path="site-queries" element={<SiteQueriesPage />} />
          <Route path="issues" element={<ArchitectIssuesPage />} />
          <Route path="review-requests" element={<ReviewRequestsPage />} />
          <Route path="documents" element={<ArchitectDocumentsPage />} />
          <Route path="activity" element={<ArchitectActivityPage />} />
          <Route path="profile" element={<ProfilePage role="architect" name="Vikram Patel" />} />
        </Route>

        {/* ── CONTRACTOR ────────────────────────────── */}
        <Route path="/contractor" element={<ProtectedRoute auth={auth} requiredRole="Contractor"><RoleLayout role="contractor" /></ProtectedRoute>}>
          <Route index element={<ContractorDashboard />} />
          <Route path="projects" element={<ContractorProjectsPage />} />
          <Route path="work" element={<AssignedWorkPage />} />
          <Route path="schedule" element={<WorkSchedulePage />} />
          <Route path="crew" element={<LabourCrewPage />} />
          <Route path="updates" element={<WorkUpdatesPage />} />
          <Route path="materials" element={<ContractorMaterialsPage />} />
          <Route path="equipment" element={<ContractorEquipmentPage />} />
          <Route path="issues" element={<ContractorIssuesPage />} />
          <Route path="documents" element={<ContractorDocumentsPage />} />
          <Route path="reports" element={<ContractorReportsPage />} />
          <Route path="activity" element={<ContractorActivityPage />} />
          <Route path="profile" element={<ProfilePage role="contractor" name="Ramesh Contractor" />} />
        </Route>

        {/* ── SALES ─────────────────────────────────── */}
        <Route path="/sales" element={<ProtectedRoute auth={auth} requiredRole="Sales Executive"><RoleLayout role="sales" /></ProtectedRoute>}>
          <Route index element={<SalesDashboard />} />
          <Route path="clients" element={<SalesClientsPage />} />
          <Route path="leads" element={<SalesLeadsPage />} />
          <Route path="quotations" element={<SalesQuotationsPage />} />
          <Route path="bookings" element={<SalesBookingsPage />} />
          <Route path="agreements" element={<SalesAgreementsPage />} />
          <Route path="payment-schedule" element={<SalesPaymentSchedulePage />} />
          <Route path="receivables" element={<SalesReceivablesPage />} />
          <Route path="followups" element={<SalesFollowupsPage />} />
          <Route path="reports" element={<SalesReportsPage />} />
          <Route path="documents" element={<SalesDocumentsPage />} />
          <Route path="activity" element={<SalesActivityPage />} />
          <Route path="profile" element={<ProfilePage role="sales" name="Riya Sharma" />} />
        </Route>

        {/* ── DEFAULT REDIRECT ──────────────────────── */}
        <Route path="*" element={
          <Navigate to={auth ? (ROLE_PATH[auth.role] || '/login') : '/login'} replace />
        } />
      </Routes>
    </AppProvider>
  );
}

export default App;
