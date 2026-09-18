import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../App.css';

export default function AdminLayout({ role = 'admin' }) {
  return (
    <div className="app-container">
      <Sidebar role={role} />
      <div className="main-content">
        <Header role={role} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
