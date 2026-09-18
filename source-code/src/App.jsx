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
