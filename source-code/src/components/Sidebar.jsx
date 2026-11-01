import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, MapPin, CheckSquare, Package, Box,
  ShoppingCart, TrendingUp, AlertTriangle, FileText,
  Activity, Users, Shield, Truck, UserCircle, Settings, ChevronDown,
  FileCheck, Calendar, FilePlus, ClipboardList,
  GitPullRequest, BarChart2, FileSignature, FileQuestion, UserPlus,
  CreditCard, Wrench, HardHat
} from 'lucide-react';
import './Sidebar.css';

// Admin Navigation
const navAdmin = [
  { section: 'DASHBOARD', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin' },
  ]},
  { section: 'PROJECT OPERATIONS', items: [
    { icon: <Briefcase size={18} />, label: 'Projects', path: '/admin/projects' },
    { icon: <MapPin size={18} />, label: 'Sites', path: '/admin/sites' },
    { icon: <CheckSquare size={18} />, label: 'Tasks', path: '/admin/tasks' },
    { icon: <Package size={18} />, label: 'Materials', path: '/admin/materials' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/admin/inventory' },
    { icon: <ShoppingCart size={18} />, label: 'Purchases', path: '/admin/purchases' },
    { icon: <TrendingUp size={18} />, label: 'Progress', path: '/admin/progress' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/admin/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/admin/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/admin/activity' },
  ]},
  { section: 'ORGANIZATION', items: [
    { icon: <Users size={18} />, label: 'Employees', path: '/admin/employees' },
    { icon: <Shield size={18} />, label: 'Roles & Permissions', path: '/admin/roles' },
    { icon: <Truck size={18} />, label: 'Vendors', path: '/admin/vendors' },
    { icon: <HardHat size={18} />, label: 'Contractors', path: '/admin/contractors' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/admin/settings' },
  ]},
];

// PM Navigation
const navPM = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/pm' },
    { icon: <Briefcase size={18} />, label: 'My Projects', path: '/pm/projects' },
    { icon: <MapPin size={18} />, label: 'Sites', path: '/pm/sites' },
    { icon: <CheckSquare size={18} />, label: 'Tasks', path: '/pm/tasks' },
    { icon: <Package size={18} />, label: 'Materials', path: '/pm/materials' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/pm/inventory' },
    { icon: <FileCheck size={18} />, label: 'Material Requests', path: '/pm/material-requests' },
    { icon: <TrendingUp size={18} />, label: 'Progress', path: '/pm/progress' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/pm/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/pm/documents' },
    { icon: <BarChart2 size={18} />, label: 'Reports', path: '/pm/reports' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/pm/activity' },
    { icon: <FileCheck size={18} />, label: 'Approvals', path: '/pm/approvals', badge: '4' },
    { icon: <Calendar size={18} />, label: 'Calendar', path: '/pm/calendar' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/pm/profile' },
  ]},
];

// Site Engineer Navigation
const navSE = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/engineer' },
    { icon: <MapPin size={18} />, label: 'My Sites', path: '/engineer/sites' },
    { icon: <CheckSquare size={18} />, label: 'My Tasks', path: '/engineer/tasks' },
    { icon: <Package size={18} />, label: 'Materials', path: '/engineer/materials' },
    { icon: <FileCheck size={18} />, label: 'Material Requests', path: '/engineer/material-requests' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/engineer/inventory' },
    { icon: <Wrench size={18} />, label: 'Equipment', path: '/engineer/equipment' },
    { icon: <FilePlus size={18} />, label: 'Material Receipts', path: '/engineer/receipts' },
    { icon: <TrendingUp size={18} />, label: 'Progress', path: '/engineer/progress' },
    { icon: <ClipboardList size={18} />, label: 'Daily Reports', path: '/engineer/daily-reports' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/engineer/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/engineer/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/engineer/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/engineer/profile' },
  ]},
];

// Procurement Navigation
const navPO = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/procurement' },
    { icon: <FileCheck size={18} />, label: 'Material Requests', path: '/procurement/material-requests' },
    { icon: <FileCheck size={18} />, label: 'Approvals', path: '/procurement/approvals', badge: '3' },
    { icon: <FileQuestion size={18} />, label: 'Enquiries / RFQs', path: '/procurement/rfqs' },
    { icon: <GitPullRequest size={18} />, label: 'Quotation Comparison', path: '/procurement/quotations' },
    { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', path: '/procurement/purchase-orders' },
    { icon: <Truck size={18} />, label: 'Deliveries', path: '/procurement/deliveries' },
    { icon: <Shield size={18} />, label: 'Quality Inspection', path: '/procurement/inspections' },
    { icon: <FilePlus size={18} />, label: 'Material Receipts', path: '/procurement/receipts' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/procurement/inventory' },
    { icon: <Wrench size={18} />, label: 'Equipment Procurement', path: '/procurement/equipment' },
    { icon: <UserCircle size={18} />, label: 'Vendors', path: '/procurement/vendors' },
    { icon: <FileSignature size={18} />, label: 'Contracts', path: '/procurement/contracts' },
    { icon: <BarChart2 size={18} />, label: 'Reports', path: '/procurement/reports' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/procurement/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/procurement/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/procurement/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/procurement/profile' },
  ]},
];

// Accounts Navigation
const navAccounts = [
  { section: 'TRANSACTIONS', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/accounts' },
    { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', path: '/accounts/purchase-orders' },
    { icon: <FilePlus size={18} />, label: 'Material Receipts', path: '/accounts/receipts' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/accounts/inventory' },
    { icon: <FileText size={18} />, label: 'Invoices', path: '/accounts/invoices' },
    { icon: <FileCheck size={18} />, label: 'Invoice Verification', path: '/accounts/invoice-verification' },
    { icon: <CreditCard size={18} />, label: 'Payments', path: '/accounts/payments' },
    { icon: <Calendar size={18} />, label: 'Payment Schedule', path: '/accounts/payment-schedule' },
    { icon: <Activity size={18} />, label: 'Expenses', path: '/accounts/expenses' },
  ]},
  { section: 'REPORTS', items: [
    { icon: <UserCircle size={18} />, label: 'Vendor Statements', path: '/accounts/vendor-statements' },
    { icon: <Shield size={18} />, label: 'Bank Accounts', path: '/accounts/bank-accounts' },
    { icon: <AlertTriangle size={18} />, label: 'Tax & Compliance', path: '/accounts/tax' },
    { icon: <BarChart2 size={18} />, label: 'Aging Report', path: '/accounts/aging' },
    { icon: <BarChart2 size={18} />, label: 'Financial Reports', path: '/accounts/reports' },
    { icon: <FileText size={18} />, label: 'Reconciliation', path: '/accounts/reconciliation' },
  ]},
  { section: 'OTHER', items: [
    { icon: <FileText size={18} />, label: 'Documents', path: '/accounts/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/accounts/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/accounts/profile' },
  ]},
];

// Sales Navigation
const navSales = [
  { section: 'SALES', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/sales' },
    { icon: <Users size={18} />, label: 'Clients', path: '/sales/clients' },
    { icon: <UserPlus size={18} />, label: 'Leads / Enquiries', path: '/sales/leads' },
    { icon: <FileText size={18} />, label: 'Quotations', path: '/sales/quotations' },
    { icon: <Calendar size={18} />, label: 'Bookings', path: '/sales/bookings' },
    { icon: <FileSignature size={18} />, label: 'Agreements', path: '/sales/agreements' },
    { icon: <CreditCard size={18} />, label: 'Payment Schedule', path: '/sales/payment-schedule' },
    { icon: <CreditCard size={18} />, label: 'Receivables', path: '/sales/receivables' },
    { icon: <Calendar size={18} />, label: 'Follow-ups', path: '/sales/followups' },
  ]},
  { section: 'REPORTS', items: [
    { icon: <BarChart2 size={18} />, label: 'Reports', path: '/sales/reports' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/sales/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/sales/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/sales/profile' },
  ]},
];

const roleNavMap = {
  admin: navAdmin,
  pm: navPM,
  engineer: navSE,
  se: navSE,
  procurement: navPO,
  po: navPO,
  accounts: navAccounts,
  sales: navSales,
};

const roleUserMap = {
  admin: { initials: 'AS', name: 'Arjun Sharma', role: 'Admin' },
  pm: { initials: 'RM', name: 'Rahul Mehta', role: 'Project Manager' },
  engineer: { initials: 'RK', name: 'Rajesh K', role: 'Site Engineer' },
  se: { initials: 'RK', name: 'Rajesh K', role: 'Site Engineer' },
  procurement: { initials: 'PR', name: 'Priya Rao', role: 'Procurement Officer' },
  po: { initials: 'PR', name: 'Priya Rao', role: 'Procurement Officer' },
  accounts: { initials: 'AC', name: 'Anjali Chauhan', role: 'Accounts' },
  sales: { initials: 'RS', name: 'Riya Sharma', role: 'Sales Executive' },
};

export default function Sidebar({ role = 'admin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = roleNavMap[role] || navAdmin;
  const user = roleUserMap[role] || roleUserMap.admin;

  const isActive = (itemPath) => {
    if (!itemPath) return false;
    if (itemPath === '/admin' || itemPath === '/pm' || itemPath === '/engineer' ||
        itemPath === '/procurement' || itemPath === '/accounts' || itemPath === '/sales') {
      return location.pathname === itemPath;
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon-wrapper" onClick={() => navigate(navSections[0]?.items[0]?.path || '/')}>
          <div className="logo-icon-svg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="var(--color-blue)" />
            </svg>
          </div>
          {!collapsed && <span className="logo-text">ALIGN</span>}
        </div>
      </div>

      <div className="nav-container">
        {navSections.map((section) => (
          <div className="nav-section" key={section.section} style={{ marginTop: section.section === 'DASHBOARD' || section.section === 'MAIN' || section.section === 'SALES' || section.section === 'TRANSACTIONS' ? 0 : undefined }}>
            {!collapsed && <div className="nav-section-title">{section.section}</div>}
            <ul className="nav-list">
              {section.items.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => item.path && navigate(item.path)}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="nav-item-content">
                    <span className="nav-icon">{item.icon}</span>
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="nav-badge bg-blue">{item.badge}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-profile">
        <div className="profile-container">
          <div
            className="avatar-sm"
            style={{
              background: role === 'admin' ? 'var(--color-blue)' :
                         role === 'pm' ? 'var(--color-teal)' :
                         role === 'se' ? 'var(--color-slate)' :
                         role === 'po' ? 'var(--color-purple)' :
                         role === 'accounts' ? '#0d9488' :
                         'var(--color-orange)',
            }}
          >
            {user.initials}
          </div>
          {!collapsed && (
            <div className="profile-info">
              <span className="profile-name">{user.name}</span>
              <span className="profile-role">{user.role}</span>
            </div>
          )}
          {!collapsed && <ChevronDown size={16} className="nav-chevron" />}
        </div>
      </div>
    </aside>
  );
}
