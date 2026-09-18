import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Users, UserCheck, UserMinus, Shield } from 'lucide-react';

const mockEmployees = [
  { id: 'EMP-001', name: 'Ramesh Singh', role: 'Project Manager', dept: 'Operations', assigned: 'Alpha Tower', status: 'Active', lastActive: '2 mins ago' },
  { id: 'EMP-002', name: 'Suresh Kumar', role: 'Project Manager', dept: 'Operations', assigned: 'Omega Tech Park', status: 'Active', lastActive: '1 hr ago' },
  { id: 'EMP-034', name: 'Rajesh K', role: 'Site Engineer', dept: 'Engineering', assigned: 'Tower A Foundation', status: 'Active', lastActive: '5 mins ago' },
  { id: 'EMP-045', name: 'Sunil Verma', role: 'Site Engineer', dept: 'Engineering', assigned: 'Tower B Excavation', status: 'On Leave', lastActive: '2 days ago' },
  { id: 'EMP-088', name: 'Priya M', role: 'Site Engineer', dept: 'Engineering', assigned: 'IT Block 1', status: 'Active', lastActive: '10 mins ago' },
  { id: 'EMP-112', name: 'Vikram Patel', role: 'Procurement Officer', dept: 'Procurement', assigned: 'HQ', status: 'Active', lastActive: 'Just now' },
];

export default function EmployeesPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--text-secondary)'}}>{row.id}</span> },
    { header: 'Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Role', accessor: 'role' },
    { header: 'Department', accessor: 'dept' },
    { header: 'Assigned To', accessor: 'assigned' },
    { header: 'Last Active', accessor: 'lastActive', cell: (row) => <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>{row.lastActive}</span> },
    { header: 'Status', accessor: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'On Leave' ? 'Delayed' : row.status} />
    )},
  ];

  return (
    <>
      <PageHeader 
        title="Employees" 
        subtitle="Manage company staff, roles, and site assignments."
        searchPlaceholder="Search employees..."
        actionLabel="Add Employee"
        onAction={() => alert('Add Employee modal')}
      />

      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Employees" value="156" icon={<Users size={24} />} color="blue" />
        <KPICard title="Active Today" value="142" icon={<UserCheck size={24} />} color="green" />
        <KPICard title="On Leave" value="12" icon={<UserMinus size={24} />} color="orange" />
        <KPICard title="Admins & PMs" value="18" icon={<Shield size={24} />} color="purple" />
      </div>

      <DataTable columns={columns} data={mockEmployees} />
    </>
  );
}
