import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  MapPin, 
  CheckSquare, 
  Package, 
  Box, 
  ShoppingCart, 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Activity, 
  Users, 
  Shield, 
  Truck, 
  UserCircle, 
  Settings,
  ChevronDown,
  FileCheck,
  Calendar,
  PlusCircle,
  FilePlus,
  ClipboardList,
  GitPullRequest,
  BarChart2,
  FileSignature,
  FileQuestion,
  UserPlus,
  CreditCard,
  Tag
} from 'lucide-react';
import './Sidebar.css';

const navItemsAdmin = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <Briefcase size={18} />, label: 'Projects', hasSub: true },
  { icon: <MapPin size={18} />, label: 'Sites' },
  { icon: <CheckSquare size={18} />, label: 'Tasks' },
  { icon: <Package size={18} />, label: 'Materials' },
  { icon: <Box size={18} />, label: 'Inventory' },
  { icon: <ShoppingCart size={18} />, label: 'Purchases' },
  { icon: <IndianRupee size={18} />, label: 'Expenses' },
  { icon: <TrendingUp size={18} />, label: 'Progress' },
  { icon: <AlertTriangle size={18} />, label: 'Issues' },
  { icon: <FileText size={18} />, label: 'Documents' },
  { icon: <Activity size={18} />, label: 'Activity' },
];

const orgItemsAdmin = [
  { icon: <Users size={18} />, label: 'Employees' },
  { icon: <Shield size={18} />, label: 'Roles & Permissions' },
  { icon: <Truck size={18} />, label: 'Vendors' },
  { icon: <UserCircle size={18} />, label: 'Clients' },
  { icon: <Settings size={18} />, label: 'Settings' },
];

const navItemsPM = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <Briefcase size={18} />, label: 'Projects', hasSub: true },
  { icon: <MapPin size={18} />, label: 'Sites' },
  { icon: <CheckSquare size={18} />, label: 'Tasks' },
  { icon: <Package size={18} />, label: 'Materials' },
  { icon: <ShoppingCart size={18} />, label: 'Purchases' },
  { icon: <Box size={18} />, label: 'Inventory' },
  { icon: <IndianRupee size={18} />, label: 'Expenses' },
  { icon: <TrendingUp size={18} />, label: 'Progress' },
  { icon: <AlertTriangle size={18} />, label: 'Issues' },
  { icon: <FileText size={18} />, label: 'Documents' },
  { icon: <FileText size={18} />, label: 'Reports' },
  { icon: <Activity size={18} />, label: 'Activity' },
];

const shortcutsPM = [
  { icon: <FileCheck size={18} />, label: 'Approvals', badge: '6' },
  { icon: <CheckSquare size={18} />, label: 'My Tasks', badge: '12', badgeColor: 'blue' },
  { icon: <Calendar size={18} />, label: 'Calendar' },
];

const navItemsSE = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <MapPin size={18} />, label: 'My Sites' },
  { icon: <CheckSquare size={18} />, label: 'Tasks' },
  { icon: <Package size={18} />, label: 'Materials', hasSub: true },
  { icon: <Box size={18} />, label: 'Inventory' },
  { icon: <FileCheck size={18} />, label: 'Material Requests' },
  { icon: <TrendingUp size={18} />, label: 'Progress' },
  { icon: <AlertTriangle size={18} />, label: 'Issues' },
  { icon: <FileText size={18} />, label: 'Documents' },
  { icon: <Activity size={18} />, label: 'Activity' },
];

const shortcutsSE = [
  { icon: <PlusCircle size={18} />, label: 'Create Task' },
  { icon: <PlusCircle size={18} />, label: 'Material Request' },
  { icon: <FilePlus size={18} />, label: 'Report Receipt' },
  { icon: <ClipboardList size={18} />, label: 'Daily Report' },
];

const navItemsPO = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <ShoppingCart size={18} />, label: 'Purchase Orders' },
  { icon: <FileCheck size={18} />, label: 'Material Requests' },
  { icon: <Truck size={18} />, label: 'Vendors' },
  { icon: <FileQuestion size={18} />, label: 'Enquiries / RFQ' },
  { icon: <GitPullRequest size={18} />, label: 'Comparisons' },
  { icon: <FileSignature size={18} />, label: 'Contracts' },
  { icon: <Package size={18} />, label: 'Deliveries' },
  { icon: <Box size={18} />, label: 'Inventory' },
  { icon: <BarChart2 size={18} />, label: 'Reports' },
  { icon: <AlertTriangle size={18} />, label: 'Issues' },
  { icon: <FileText size={18} />, label: 'Documents' },
  { icon: <Activity size={18} />, label: 'Activity' },
];

const shortcutsPO = [
  { icon: <PlusCircle size={18} />, label: 'Create PO' },
  { icon: <PlusCircle size={18} />, label: 'Create Enquiry' },
  { icon: <FileCheck size={18} />, label: 'Pending Approvals', badge: '6', badgeColor: 'blue' },
  { icon: <CheckSquare size={18} />, label: 'My Tasks', badge: '8', badgeColor: 'blue' },
];

const navItemsAccounts = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true, section: 'TRANSACTIONS' },
  { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', section: 'TRANSACTIONS' },
  { icon: <Package size={18} />, label: 'Material Receipts', section: 'TRANSACTIONS' },
  { icon: <FileText size={18} />, label: 'Invoices', section: 'TRANSACTIONS' },
  { icon: <IndianRupee size={18} />, label: 'Payments', section: 'TRANSACTIONS' },
  { icon: <Activity size={18} />, label: 'Expenses', section: 'TRANSACTIONS' },
  { icon: <BarChart2 size={18} />, label: 'Aging Report', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Vendor Statement', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Payment Report', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Expense Report', section: 'REPORTS' },
  { icon: <Truck size={18} />, label: 'Vendors', section: 'MASTERS' },
  { icon: <Shield size={18} />, label: 'Bank Accounts', section: 'MASTERS' },
  { icon: <AlertTriangle size={18} />, label: 'Tax & Compliance', section: 'MASTERS' },
  { icon: <FileText size={18} />, label: 'Documents', section: 'OTHER' },
  { icon: <Activity size={18} />, label: 'Activity', section: 'OTHER' },
];

const navItemsSales = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true, section: 'SALES' },
  { icon: <Users size={18} />, label: 'Clients', section: 'SALES' },
  { icon: <UserPlus size={18} />, label: 'Leads / Enquiries', section: 'SALES' },
  { icon: <Calendar size={18} />, label: 'Bookings', section: 'SALES' },
  { icon: <FileSignature size={18} />, label: 'Agreements', section: 'SALES' },
  { icon: <CreditCard size={18} />, label: 'Payment Schedule', section: 'SALES' },
  { icon: <IndianRupee size={18} />, label: 'Receivables', section: 'SALES' },
  { icon: <FileText size={18} />, label: 'Quotations', section: 'SALES' },
  { icon: <BarChart2 size={18} />, label: 'Sales Pipeline', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Receivables Report', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Collection Report', section: 'REPORTS' },
  { icon: <FileText size={18} />, label: 'Lead Report', section: 'REPORTS' },
  { icon: <Briefcase size={18} />, label: 'Projects', section: 'MASTERS' },
  { icon: <Box size={18} />, label: 'Units / Inventory', section: 'MASTERS' },
  { icon: <Tag size={18} />, label: 'Price List', section: 'MASTERS' },
  { icon: <FileText size={18} />, label: 'Documents', section: 'OTHER' },
  { icon: <Activity size={18} />, label: 'Activity', section: 'OTHER' },
];

export default function Sidebar({ role = 'admin' }) {
  const isPM = role === 'pm';
  const isSE = role === 'se';
  const isPO = role === 'po';
  const isAccounts = role === 'accounts';
  const isSales = role === 'sales';
  
  const navItems = isSE ? navItemsSE : isPM ? navItemsPM : isPO ? navItemsPO : isAccounts ? navItemsAccounts : isSales ? navItemsSales : navItemsAdmin;
  const shortcuts = isSE ? shortcutsSE : isPM ? shortcutsPM : isPO ? shortcutsPO : [];

  // Helper to render sectioned nav items for accounts
  const renderNavList = (items, filterSection) => {
    return items.filter(item => item.section === filterSection || (!filterSection && !item.section)).map((item, idx) => (
      <li key={idx} className={`nav-item ${item.active ? 'active' : ''}`}>
        <div className="nav-item-content">
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
        {item.hasSub && <ChevronDown size={16} className="nav-chevron" />}
      </li>
    ));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
          <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="white"/>
        </svg>
        <span className="logo-text">ALIGN</span>
      </div>
      
      <div className="sidebar-scroll">
        {(isAccounts || isSales) ? (
          <>
            <div className="nav-section" style={{ marginTop: 0 }}>
              <span className="section-title">{isSales ? 'SALES' : 'TRANSACTIONS'}</span>
              <ul className="nav-list">
                {renderNavList(navItems, isSales ? 'SALES' : 'TRANSACTIONS')}
              </ul>
            </div>
            <div className="nav-section">
              <span className="section-title">REPORTS</span>
              <ul className="nav-list">
                {renderNavList(navItems, 'REPORTS')}
              </ul>
            </div>
            <div className="nav-section">
              <span className="section-title">MASTERS</span>
              <ul className="nav-list">
                {renderNavList(navItems, 'MASTERS')}
              </ul>
            </div>
            <div className="nav-section">
              <span className="section-title">OTHER</span>
              <ul className="nav-list">
                {renderNavList(navItems, 'OTHER')}
              </ul>
            </div>
          </>
        ) : (
          <ul className="nav-list">
            {navItems.map((item, idx) => (
              <li key={idx} className={`nav-item ${item.active ? 'active' : ''}`}>
                <div className="nav-item-content">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </div>
                {item.hasSub && <ChevronDown size={16} className="nav-chevron" />}
              </li>
            ))}
          </ul>
        )}
        
        {!isPM && !isSE && !isPO && !isAccounts && !isSales && (
          <div className="nav-section">
            <span className="section-title">ORGANIZATION</span>
            <ul className="nav-list">
              {orgItemsAdmin.map((item, idx) => (
                <li key={idx} className="nav-item">
                  <div className="nav-item-content">
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {shortcuts.length > 0 && (
          <div className="nav-section">
            <span className="section-title">{isSE ? 'QUICK LINKS' : 'SHORTCUTS'}</span>
            <ul className="nav-list">
              {shortcuts.map((item, idx) => (
                <li key={idx} className="nav-item">
                  <div className="nav-item-content">
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`nav-badge ${item.badgeColor === 'blue' ? 'bg-blue' : ''}`}>{item.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {(isPM || isSE || isPO || isAccounts || isSales) && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className={`sidebar-avatar ${isPO || isAccounts || isSales ? 'bg-purple' : ''}`}>
              {isSE ? 'SE' : isPM ? 'PM' : isPO ? 'PR' : isAccounts ? 'AC' : 'RS'}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {isSE ? 'XYZ' : isPM ? 'Rahul Mehta' : isPO ? 'Priya Rao' : isAccounts ? 'Anjali Chauhan' : 'Riya Sharma'}
              </span>
              <span className="sidebar-user-role">
                {isSE ? 'Site Engineer' : isPM ? 'Project Manager' : isPO ? 'Procurement Officer' : isAccounts ? 'Accounts Executive' : 'Sales Executive'}
              </span>
              {(isSE || isPO || isSales) && (
                <span className="sidebar-user-role" style={{fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  {isSE ? 'EMP-0047' : isPO ? 'PROC-0031' : <><span className="status-dot green"></span>Online</>}
                </span>
              )}
            </div>
            <ChevronDown size={16} className="nav-chevron" />
          </div>
        </div>
      )}
    </aside>
  );
}
