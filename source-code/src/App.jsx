import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ProjectManagerDashboard from './pages/ProjectManagerDashboard';
import SiteEngineerDashboard from './pages/SiteEngineerDashboard';
import ProcurementDashboard from './pages/ProcurementDashboard';
import AccountsDashboard from './pages/AccountsDashboard';
import SalesDashboard from './pages/SalesDashboard';
import Login from './pages/Login';

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
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

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
