const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'admin');

const pages = {
  'MaterialsPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Package, AlertTriangle, Truck, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'MAT-001', name: 'Cement (Grade 53)', project: 'Alpha Tower', site: 'Tower A', quantity: '500', unit: 'Bags', status: 'In Stock' },
  { id: 'MAT-002', name: 'Steel TMT Bars', project: 'Omega Park', site: 'IT Block 1', quantity: '50', unit: 'Tons', status: 'Low Stock' },
  { id: 'MAT-003', name: 'Bricks', project: 'City Mall', site: 'Main Atrium', quantity: '10000', unit: 'Pcs', status: 'Delayed' },
];

export default function MaterialsPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Material', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Site', accessor: 'site' },
    { header: 'Qty', accessor: 'quantity', cell: (row) => \`\${row.quantity} \${row.unit}\` },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Materials" subtitle="Track material requisitions and site-level stock." actionLabel="Request Material" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Requests" value="1,284" icon={<Package size={24} />} color="blue" />
        <KPICard title="Pending Delivery" value="45" icon={<Truck size={24} />} color="orange" />
        <KPICard title="Low Stock" value="12" icon={<AlertTriangle size={24} />} color="red" />
        <KPICard title="Delivered Today" value="8" icon={<CheckCircle size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'InventoryPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Box, Layers, AlertCircle, CheckSquare } from 'lucide-react';

const mockData = [
  { code: 'INV-100', name: 'Excavator EX-200', category: 'Heavy Machinery', location: 'Central Yard', stock: 2, status: 'Active' },
  { code: 'INV-101', name: 'Safety Helmets', category: 'PPE', location: 'Site A Store', stock: 150, status: 'In Stock' },
  { code: 'INV-102', name: 'Concrete Mixer', category: 'Equipment', location: 'Site B Store', stock: 0, status: 'Out of Stock' },
];

export default function InventoryPage() {
  const columns = [
    { header: 'Item Code', accessor: 'code', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.code}</span> },
    { header: 'Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Location', accessor: 'location' },
    { header: 'Stock', accessor: 'stock', cell: (row) => <span style={{color: row.stock === 0 ? 'var(--color-red)' : 'inherit', fontWeight: 600}}>{row.stock}</span> },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Inventory" subtitle="Manage global tools, equipment, and PPE inventory." actionLabel="Add Item" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Items" value="4,521" icon={<Box size={24} />} color="blue" />
        <KPICard title="Categories" value="18" icon={<Layers size={24} />} color="teal" />
        <KPICard title="Low Stock" value="34" icon={<AlertCircle size={24} />} color="orange" />
        <KPICard title="In Use" value="2,105" icon={<CheckSquare size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'PurchasesPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { ShoppingCart, FileText, Clock, IndianRupee } from 'lucide-react';

const mockData = [
  { po: 'PO-2024-001', vendor: 'UltraTech Cements', amount: '₹ 2,45,000', date: '10 Sep 2024', status: 'Approved' },
  { po: 'PO-2024-002', vendor: 'Tata Steel', amount: '₹ 8,90,000', date: '12 Sep 2024', status: 'Pending' },
  { po: 'PO-2024-003', vendor: 'Local Hardware Co', amount: '₹ 45,000', date: '14 Sep 2024', status: 'Rejected' },
];

export default function PurchasesPage() {
  const columns = [
    { header: 'PO Number', accessor: 'po', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.po}</span> },
    { header: 'Vendor', accessor: 'vendor', cell: (row) => <span style={{fontWeight: 600}}>{row.vendor}</span> },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Purchases" subtitle="Track Purchase Orders and vendor invoices." actionLabel="Create PO" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total POs" value="156" icon={<ShoppingCart size={24} />} color="blue" />
        <KPICard title="Pending Approval" value="12" icon={<Clock size={24} />} color="orange" />
        <KPICard title="Approved (This Month)" value="45" icon={<FileText size={24} />} color="green" />
        <KPICard title="Total Spend" value="₹ 1.2 Cr" icon={<IndianRupee size={24} />} color="teal" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'ExpensesPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { IndianRupee, TrendingDown, CheckSquare, XCircle } from 'lucide-react';

const mockData = [
  { id: 'EXP-901', category: 'Travel', project: 'Alpha Tower', amount: '₹ 12,500', date: '15 Sep 2024', status: 'Approved' },
  { id: 'EXP-902', category: 'Site Maintenance', project: 'Omega Park', amount: '₹ 45,000', date: '16 Sep 2024', status: 'Pending' },
  { id: 'EXP-903', category: 'Office Supplies', project: 'HQ', amount: '₹ 8,200', date: '17 Sep 2024', status: 'Rejected' },
];

export default function ExpensesPage() {
  const columns = [
    { header: 'Expense ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Category', accessor: 'category', cell: (row) => <span style={{fontWeight: 600}}>{row.category}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Expenses" subtitle="Manage petty cash, reimbursements, and overheads." actionLabel="Log Expense" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Expenses" value="₹ 8.5L" icon={<IndianRupee size={24} />} color="blue" />
        <KPICard title="Average Daily" value="₹ 25K" icon={<TrendingDown size={24} />} color="teal" />
        <KPICard title="Pending Claims" value="24" icon={<CheckSquare size={24} />} color="orange" />
        <KPICard title="Rejected" value="3" icon={<XCircle size={24} />} color="red" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'ProgressPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';

const mockData = [
  { project: 'Alpha Tower', site: 'Tower A', milestone: 'Foundation Check', progress: 100, status: 'Completed' },
  { project: 'Omega Park', site: 'IT Block 1', milestone: 'Level 2 Slab', progress: 45, status: 'In Progress' },
  { project: 'City Mall', site: 'Main Atrium', milestone: 'Roofing', progress: 10, status: 'Delayed' },
];

export default function ProgressPage() {
  const columns = [
    { header: 'Project', accessor: 'project', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.project}</span> },
    { header: 'Site', accessor: 'site' },
    { header: 'Milestone', accessor: 'milestone', cell: (row) => <span style={{fontWeight: 600}}>{row.milestone}</span> },
    { header: 'Completion', accessor: 'progress', cell: (row) => (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', minWidth: '100px'}}>
          <div style={{height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: \`\${row.progress}%\`}}></div>
        </div>
        <span style={{fontSize: '0.75rem', fontWeight: 600}}>{row.progress}%</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Progress Reports" subtitle="High-level milestones and completion tracking." actionLabel="Export Report" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Overall Progress" value="68%" icon={<TrendingUp size={24} />} color="blue" />
        <KPICard title="Milestones Met" value="142" icon={<Target size={24} />} color="green" />
        <KPICard title="Behind Schedule" value="4" icon={<Clock size={24} />} color="orange" />
        <KPICard title="Projects Completed" value="7" icon={<CheckCircle size={24} />} color="teal" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'IssuesPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { AlertTriangle, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'ISS-001', title: 'Waterlogging in basement', project: 'Alpha Tower', priority: 'Critical', assignee: 'Rajesh K', status: 'Blocked' },
  { id: 'ISS-002', title: 'Delay in cement delivery', project: 'Omega Park', priority: 'High', assignee: 'Vikram Patel', status: 'In Progress' },
  { id: 'ISS-003', title: 'Design revision pending', project: 'City Mall', priority: 'Medium', assignee: 'Anita Desai', status: 'Resolved' },
];

export default function IssuesPage() {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'var(--color-red)';
      case 'High': return 'var(--color-orange)';
      case 'Medium': return 'var(--color-blue)';
      default: return 'var(--text-secondary)';
    }
  };

  const columns = [
    { header: 'Issue ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Title', accessor: 'title', cell: (row) => <span style={{fontWeight: 600}}>{row.title}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Priority', accessor: 'priority', cell: (row) => (
      <span style={{ fontWeight: 600, color: getPriorityColor(row.priority) }}>{row.priority}</span>
    )},
    { header: 'Assignee', accessor: 'assignee' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Issues & Blockers" subtitle="Track and resolve site incidents." actionLabel="Report Issue" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Open" value="27" icon={<AlertTriangle size={24} />} color="orange" />
        <KPICard title="Critical Issues" value="3" icon={<AlertCircle size={24} />} color="red" />
        <KPICard title="Avg Resolution Time" value="2.4 Days" icon={<Clock size={24} />} color="blue" />
        <KPICard title="Resolved This Week" value="18" icon={<CheckCircle size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'DocumentsPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { FileText, File, Folder, Download } from 'lucide-react';

const mockData = [
  { id: 'DOC-101', name: 'Alpha_Tower_Blueprints_v2.pdf', type: 'Design', project: 'Alpha Tower', uploader: 'Amit Shah', date: '10 Sep 2024' },
  { id: 'DOC-102', name: 'Vendor_Contract_Tata.docx', type: 'Contract', project: 'Omega Park', uploader: 'Neha Sharma', date: '12 Sep 2024' },
  { id: 'DOC-103', name: 'Site_Safety_Guidelines.pdf', type: 'Policy', project: 'Global', uploader: 'Admin', date: '01 Jan 2024' },
];

export default function DocumentsPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Document Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Type', accessor: 'type' },
    { header: 'Project', accessor: 'project' },
    { header: 'Uploaded By', accessor: 'uploader' },
    { header: 'Date', accessor: 'date' },
    { header: 'Action', accessor: 'action', cell: () => <button style={{background: 'none', border: 'none', color: 'var(--color-blue)', cursor: 'pointer'}}><Download size={16} /></button> },
  ];
  return (
    <>
      <PageHeader title="Documents" subtitle="Centralized blueprint, contract, and policy storage." actionLabel="Upload File" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Files" value="842" icon={<FileText size={24} />} color="blue" />
        <KPICard title="Blueprints" value="156" icon={<Folder size={24} />} color="teal" />
        <KPICard title="Contracts" value="45" icon={<File size={24} />} color="orange" />
        <KPICard title="Storage Used" value="12.4 GB" icon={<Download size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'ActivityPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Activity, User, Clock, CheckCircle } from 'lucide-react';

const mockData = [
  { log: 'LOG-9001', user: 'Ramesh Singh', action: 'Approved PO-2024-001', module: 'Purchases', time: '10 mins ago' },
  { log: 'LOG-9002', user: 'Sunil Verma', action: 'Updated Progress - Tower B', module: 'Sites', time: '1 hour ago' },
  { log: 'LOG-9003', user: 'System', action: 'Daily Backup Completed', module: 'System', time: '3 hours ago' },
];

export default function ActivityPage() {
  const columns = [
    { header: 'Log ID', accessor: 'log', cell: (row) => <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>{row.log}</span> },
    { header: 'User', accessor: 'user', cell: (row) => <span style={{fontWeight: 600}}>{row.user}</span> },
    { header: 'Action', accessor: 'action' },
    { header: 'Module', accessor: 'module', cell: (row) => <StatusBadge status="Info" /> },
    { header: 'Timestamp', accessor: 'time' },
  ];
  return (
    <>
      <PageHeader title="Activity Logs" subtitle="Audit trail and recent system activities." />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Events Today" value="1,204" icon={<Activity size={24} />} color="blue" />
        <KPICard title="Active Users" value="86" icon={<User size={24} />} color="teal" />
        <KPICard title="Peak Time" value="10:30 AM" icon={<Clock size={24} />} color="orange" />
        <KPICard title="System Health" value="100%" icon={<CheckCircle size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'RolesPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Shield, Users, Lock, CheckCircle } from 'lucide-react';

const mockData = [
  { role: 'Admin', dept: 'Management', users: 3, access: 'Full Access', status: 'Active' },
  { role: 'Project Manager', dept: 'Operations', users: 12, access: 'Project Level', status: 'Active' },
  { role: 'Site Engineer', dept: 'Engineering', users: 45, access: 'Site Level', status: 'Active' },
  { role: 'Guest', dept: 'External', users: 0, access: 'Read Only', status: 'Inactive' },
];

export default function RolesPage() {
  const columns = [
    { header: 'Role', accessor: 'role', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.role}</span> },
    { header: 'Department', accessor: 'dept' },
    { header: 'Assigned Users', accessor: 'users', cell: (row) => <span style={{fontWeight: 600}}>{row.users}</span> },
    { header: 'Access Level', accessor: 'access' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status === 'Inactive' ? 'Delayed' : row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Roles & Permissions" subtitle="Manage access control and organizational hierarchy." actionLabel="Create Role" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Roles" value="8" icon={<Shield size={24} />} color="blue" />
        <KPICard title="Custom Roles" value="3" icon={<Lock size={24} />} color="teal" />
        <KPICard title="Active Users" value="142" icon={<Users size={24} />} color="green" />
        <KPICard title="Policies Enforced" value="24" icon={<CheckCircle size={24} />} color="orange" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'VendorsPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Truck, Building, Star, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'VEN-001', name: 'UltraTech Cements', category: 'Materials', contact: 'sales@ultratech.com', rating: '4.8/5', status: 'Active' },
  { id: 'VEN-002', name: 'Tata Steel', category: 'Materials', contact: 'orders@tatasteel.com', rating: '4.9/5', status: 'Active' },
  { id: 'VEN-003', name: 'FastLogistics', category: 'Transport', contact: 'help@fastlog.in', rating: '3.2/5', status: 'On Hold' },
];

export default function VendorsPage() {
  const columns = [
    { header: 'Vendor ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--text-secondary)'}}>{row.id}</span> },
    { header: 'Vendor Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.name}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Rating', accessor: 'rating', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-orange)'}}>★ {row.rating}</span> },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Vendors" subtitle="Manage suppliers, contractors, and service providers." actionLabel="Add Vendor" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Vendors" value="45" icon={<Building size={24} />} color="blue" />
        <KPICard title="Active Contracts" value="38" icon={<CheckCircle size={24} />} color="green" />
        <KPICard title="Deliveries Today" value="12" icon={<Truck size={24} />} color="teal" />
        <KPICard title="Top Rated" value="15" icon={<Star size={24} />} color="orange" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'ClientsPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { UserCircle, Briefcase, Building, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'CLI-001', name: 'Apex Corp', industry: 'Real Estate', projects: 2, revenue: '₹ 85 Cr', status: 'Active' },
  { id: 'CLI-002', name: 'Omega Systems', industry: 'IT Parks', projects: 1, revenue: '₹ 120 Cr', status: 'Active' },
  { id: 'CLI-003', name: 'Sunrise Buildcon', industry: 'Residential', projects: 0, revenue: '₹ 22 Cr', status: 'Completed' },
];

export default function ClientsPage() {
  const columns = [
    { header: 'Client ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--text-secondary)'}}>{row.id}</span> },
    { header: 'Client Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.name}</span> },
    { header: 'Industry', accessor: 'industry' },
    { header: 'Active Projects', accessor: 'projects', cell: (row) => <span style={{fontWeight: 600}}>{row.projects}</span> },
    { header: 'Total Contract Value', accessor: 'revenue' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Clients" subtitle="Manage client relationships and project portfolios." actionLabel="Add Client" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Clients" value="18" icon={<UserCircle size={24} />} color="blue" />
        <KPICard title="Active Clients" value="12" icon={<Briefcase size={24} />} color="teal" />
        <KPICard title="Total Projects" value="24" icon={<Building size={24} />} color="orange" />
        <KPICard title="Satisfied" value="98%" icon={<CheckCircle size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}`,

  'SettingsPage.jsx': `import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="System configurations and preferences." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Preferences</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: '6px', fontWeight: 500, color: 'var(--color-blue)' }}>General</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Notifications</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Security</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Integrations</li>
          </ul>
        </div>
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>General Settings</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Company Name</label>
              <input type="text" defaultValue="Align Construction Co." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Support Email</label>
              <input type="email" defaultValue="admin@align.com" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Timezone</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }}>
                <option>Asia/Kolkata (IST)</option>
                <option>UTC</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <input type="checkbox" id="maintenance" />
              <label htmlFor="maintenance" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Enable Maintenance Mode</label>
            </div>
            <button type="button" onClick={() => alert('Settings Saved!')} style={{ marginTop: '16px', padding: '10px 24px', background: 'var(--color-blue)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', alignSelf: 'flex-start', fontWeight: 500 }}>Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
}`
};

for (const [name, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(dir, name), content);
  console.log('Generated ' + name);
}
