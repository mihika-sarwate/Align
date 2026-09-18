import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ProjectManagerDashboard from './pages/ProjectManagerDashboard';
import SiteEngineerDashboard from './pages/SiteEngineerDashboard';
import ProcurementDashboard from './pages/ProcurementDashboard';
import AccountsDashboard from './pages/AccountsDashboard';
import SalesDashboard from './pages/SalesDashboard';
import Login from './pages/Login';
import ProjectsPage from './pages/admin/ProjectsPage';
import SitesPage from './pages/admin/SitesPage';
import TasksPage from './pages/admin/TasksPage';
import EmployeesPage from './pages/admin/EmployeesPage';
import MaterialsPage from './pages/admin/MaterialsPage';
import InventoryPage from './pages/admin/InventoryPage';
import PurchasesPage from './pages/admin/PurchasesPage';
import ExpensesPage from './pages/admin/ExpensesPage';
import ProgressPage from './pages/admin/ProgressPage';
import IssuesPage from './pages/admin/IssuesPage';
import DocumentsPage from './pages/admin/DocumentsPage';
import ActivityPage from './pages/admin/ActivityPage';
import RolesPage from './pages/admin/RolesPage';
import VendorsPage from './pages/admin/VendorsPage';
import ClientsPage from './pages/admin/ClientsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  const [auth, setAuth] = useState(null); // { role: 'Admin' | 'Project Manager' | 'Site Engineer' | 'Procurement Officer' }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login onLogin={setAuth} />} 
      />
      
      <Route 
        path="/admin" 
        element={
          auth?.role === 'Admin' ? (
            <AdminLayout role="admin" />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="sites" element={<SitesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="issues" element={<IssuesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="vendors" element={<VendorsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<AdminDashboard />} />
      </Route>

      <Route 
        path="/pm" 
        element={
          auth?.role === 'Project Manager' ? (
            <ProjectManagerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      <Route 
        path="/engineer" 
        element={
          auth?.role === 'Site Engineer' ? (
            <SiteEngineerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      <Route 
        path="/procurement" 
        element={
          auth?.role === 'Procurement Officer' ? (
            <ProcurementDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      <Route 
        path="/accounts" 
        element={
          auth?.role === 'Accounts Executive' ? (
            <AccountsDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      <Route 
        path="/sales" 
        element={
          auth?.role === 'Sales Executive' ? (
            <SalesDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      <Route 
        path="*" 
        element={
          <Navigate 
            to={
              auth?.role === 'Admin' ? "/admin" : 
              auth?.role === 'Project Manager' ? "/pm" : 
              auth?.role === 'Site Engineer' ? "/engineer" : 
              auth?.role === 'Procurement Officer' ? "/procurement" : 
              auth?.role === 'Accounts Executive' ? "/accounts" : 
              auth?.role === 'Sales Executive' ? "/sales" : "/login"
            } 
            replace 
          />
        } 
      />
    </Routes>
  );
}

export default App;
