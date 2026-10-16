import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, MapPin, CheckSquare, Package, Box,
  ShoppingCart, IndianRupee, TrendingUp, AlertTriangle, FileText,
  Activity, Users, Shield, Truck, UserCircle, Settings, ChevronDown,
  FileCheck, Calendar, PlusCircle, FilePlus, ClipboardList,
  GitPullRequest, BarChart2, FileSignature, FileQuestion, UserPlus,
  CreditCard, Tag, Wrench, HardHat, PenTool, Layers, Building2,
  BookOpen, Bell
} from 'lucide-react';
import './Sidebar.css';

// ─── Admin ───────────────────────────────────────────────
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
    { icon: <IndianRupee size={18} />, label: 'Expenses', path: '/admin/expenses' },
    { icon: <TrendingUp size={18} />, label: 'Progress', path: '/admin/progress' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/admin/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/admin/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/admin/activity' },
  ]},
  { section: 'ORGANIZATION', items: [
    { icon: <Users size={18} />, label: 'Employees', path: '/admin/employees' },
    { icon: <Shield size={18} />, label: 'Roles & Permissions', path: '/admin/roles' },
    { icon: <Truck size={18} />, label: 'Vendors', path: '/admin/vendors' },
    { icon: <UserCircle size={18} />, label: 'Clients', path: '/admin/clients' },
    { icon: <BookOpen size={18} />, label: 'Glossary', path: '/admin/glossary' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/admin/settings' },
  ]},
];

// ─── PM ───────────────────────────────────────────────────
const navPM = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/pm' },
    { icon: <Briefcase size={18} />, label: 'My Projects', path: '/pm/projects' },
    { icon: <MapPin size={18} />, label: 'Sites', path: '/pm/sites' },
    { icon: <CheckSquare size={18} />, label: 'Tasks', path: '/pm/tasks' },
    { icon: <Layers size={18} />, label: 'Project Phases', path: '/pm/phases' },
    { icon: <Package size={18} />, label: 'Materials', path: '/pm/materials' },
    { icon: <Box size={18} />, label: 'Inventory', path: '/pm/inventory' },
    { icon: <FileCheck size={18} />, label: 'Material Requests', path: '/pm/material-requests' },
    { icon: <ShoppingCart size={18} />, label: 'Purchases', path: '/pm/purchases' },
    { icon: <IndianRupee size={18} />, label: 'Expenses', path: '/pm/expenses' },
    { icon: <TrendingUp size={18} />, label: 'Progress', path: '/pm/progress' },
    { icon: <ClipboardList size={18} />, label: 'Daily Reports', path: '/pm/daily-reports' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/pm/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/pm/documents' },
    { icon: <BarChart2 size={18} />, label: 'Reports', path: '/pm/reports' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/pm/activity' },
    { icon: <FileCheck size={18} />, label: 'Approvals', path: '/pm/approvals', badge: '4' },
    { icon: <Calendar size={18} />, label: 'Calendar', path: '/pm/calendar' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/pm/profile' },
  ]},
];

// ─── Site Engineer ─────────────────────────────────────────
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

// ─── Procurement ───────────────────────────────────────────
const navPO = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/procurement' },
    { icon: <FileCheck size={18} />, label: 'Material Requests', path: '/procurement/material-requests' },
    { icon: <FileCheck size={18} />, label: 'Approvals', path: '/procurement/approvals', badge: '3' },
    { icon: <FileQuestion size={18} />, label: 'Enquiries / RFQs', path: '/procurement/rfqs' },
    { icon: <GitPullRequest size={18} />, label: 'Quotation Comparison', path: '/procurement/quotations' },
    { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', path: '/procurement/purchase-orders' },
    { icon: <Truck size={18} />, label: 'Deliveries', path: '/procurement/deliveries' },
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

// ─── Accounts ─────────────────────────────────────────────
const navAccounts = [
  { section: 'TRANSACTIONS', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/accounts' },
    { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', path: '/accounts/purchase-orders' },
    { icon: <FilePlus size={18} />, label: 'Material Receipts', path: '/accounts/receipts' },
    { icon: <FileText size={18} />, label: 'Invoices', path: '/accounts/invoices' },
    { icon: <FileCheck size={18} />, label: 'Invoice Verification', path: '/accounts/invoice-verification' },
    { icon: <IndianRupee size={18} />, label: 'Payments', path: '/accounts/payments' },
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

// ─── Architect ─────────────────────────────────────────────
const navArchitect = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/architect' },
    { icon: <Briefcase size={18} />, label: 'My Projects', path: '/architect/projects' },
    { icon: <PenTool size={18} />, label: 'Working Drawings', path: '/architect/drawings' },
    { icon: <GitPullRequest size={18} />, label: 'Drawing Revisions', path: '/architect/revisions' },
    { icon: <FileText size={18} />, label: 'Design Documents', path: '/architect/design-docs' },
    { icon: <Layers size={18} />, label: 'Technical Specs', path: '/architect/tech-specs' },
    { icon: <FileQuestion size={18} />, label: 'Site Queries', path: '/architect/site-queries' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/architect/issues' },
    { icon: <FileCheck size={18} />, label: 'Review Requests', path: '/architect/review-requests' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/architect/documents' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/architect/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/architect/profile' },
  ]},
];

// ─── Contractor ────────────────────────────────────────────
const navContractor = [
  { section: 'MAIN', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/contractor' },
    { icon: <Building2 size={18} />, label: 'My Projects / Sites', path: '/contractor/projects' },
    { icon: <CheckSquare size={18} />, label: 'Assigned Work', path: '/contractor/work' },
    { icon: <Calendar size={18} />, label: 'Work Schedule', path: '/contractor/schedule' },
    { icon: <HardHat size={18} />, label: 'Labour & Crew', path: '/contractor/crew' },
    { icon: <ClipboardList size={18} />, label: 'Work Updates', path: '/contractor/updates' },
    { icon: <Package size={18} />, label: 'Material Requests', path: '/contractor/materials' },
    { icon: <Wrench size={18} />, label: 'Equipment', path: '/contractor/equipment' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/contractor/issues' },
    { icon: <FileText size={18} />, label: 'Documents', path: '/contractor/documents' },
    { icon: <BarChart2 size={18} />, label: 'Reports', path: '/contractor/reports' },
    { icon: <Activity size={18} />, label: 'Activity', path: '/contractor/activity' },
    { icon: <UserCircle size={18} />, label: 'My Profile', path: '/contractor/profile' },
  ]},
];

// ─── Sales ─────────────────────────────────────────────────
const navSales = [
  { section: 'SALES', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/sales' },
    { icon: <Users size={18} />, label: 'Clients', path: '/sales/clients' },
    { icon: <UserPlus size={18} />, label: 'Leads / Enquiries', path: '/sales/leads' },
    { icon: <FileText size={18} />, label: 'Quotations', path: '/sales/quotations' },
    { icon: <Calendar size={18} />, label: 'Bookings', path: '/sales/bookings' },
    { icon: <FileSignature size={18} />, label: 'Agreements', path: '/sales/agreements' },
    { icon: <CreditCard size={18} />, label: 'Payment Schedule', path: '/sales/payment-schedule' },
    { icon: <IndianRupee size={18} />, label: 'Receivables', path: '/sales/receivables' },
    { icon: <Bell size={18} />, label: 'Follow-ups', path: '/sales/followups' },
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
  se: navSE,
  po: navPO,
  accounts: navAccounts,
  architect: navArchitect,
  contractor: navContractor,
  sales: navSales,
};

const roleUserMap = {
  admin: { initials: 'AS', name: 'Arjun Sharma', role: 'Admin' },
  pm: { initials: 'RM', name: 'Rahul Mehta', role: 'Project Manager' },
  se: { initials: 'RK', name: 'Rajesh K', role: 'Site Engineer' },
  po: { initials: 'PR', name: 'Priya Rao', role: 'Procurement Officer' },
  accounts: { initials: 'AC', name: 'Anjali Chauhan', role: 'Accounts' },
  architect: { initials: 'VP', name: 'Vikram Patel', role: 'Architect' },
  contractor: { initials: 'RC', name: 'Ramesh Contractor', role: 'Contractor' },
  sales: { initials: 'RS', name: 'Riya Sharma', role: 'Sales Executive' },
};

export default function Sidebar({ role = 'admin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = roleNavMap[role] || navAdmin;
  const user = roleUserMap[role] || roleUserMap.admin;

  const isActive = (path) => {
    if (!path) return false;
    const roots = ['/admin', '/pm', '/engineer', '/procurement', '/accounts', '/architect', '/contractor', '/sales'];
    const isRoot = roots.includes(path);
    if (isRoot) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-logo" onClick={() => setCollapsed(c => !c)} style={{ cursor: 'pointer' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: collapsed ? 0 : '8px', flexShrink: 0 }}>
          <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="white" />
        </svg>
        {!collapsed && <span className="logo-text">ALIGN</span>}
      </div>

      <div className="sidebar-scroll">
        {navSections.map((section) => (
          <div className="nav-section" key={section.section} style={{ marginTop: section.section === 'DASHBOARD' || section.section === 'MAIN' || section.section === 'SALES' || section.section === 'TRANSACTIONS' ? 0 : undefined }}>
            {!collapsed && <span className="section-title">{section.section}</span>}
            <ul className="nav-list">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => item.path && navigate(item.path)}
                  title={collapsed ? item.label : ''}
                >
                  <div className="nav-item-content">
                    <span className="nav-icon">{item.icon}</span>
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="nav-badge bg-blue">{item.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{ background: 'var(--bg-sidebar-active)' }}>
            {user.initials}
          </div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name}</span>
              <span className="sidebar-user-role">{user.role}</span>
            </div>
          )}
          {!collapsed && <ChevronDown size={16} className="nav-chevron" />}
        </div>
      </div>
    </aside>
  );
}
