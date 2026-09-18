import React from 'react';
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
}