import React from 'react';
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
}