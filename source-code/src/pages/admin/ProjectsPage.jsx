import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Building2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const mockProjects = [
  { id: 'PRJ-101', name: 'Alpha Residential Tower', client: 'Apex Corp', pm: 'Ramesh Singh', sites: 3, start: '12 Jan 2024', end: '15 Dec 2025', progress: 45, budget: '₹ 45.2 Cr', status: 'Active' },
  { id: 'PRJ-102', name: 'Omega Tech Park', client: 'Omega Systems', pm: 'Suresh Kumar', sites: 1, start: '05 Mar 2024', end: '30 Aug 2025', progress: 28, budget: '₹ 120 Cr', status: 'Active' },
  { id: 'PRJ-103', name: 'City Center Mall', client: 'City Group', pm: 'Anita Desai', sites: 2, start: '10 Nov 2023', end: '01 May 2025', progress: 78, budget: '₹ 85 Cr', status: 'Delayed' },
  { id: 'PRJ-104', name: 'Green Valley Villas', client: 'Green Homes', pm: 'Vikram Patel', sites: 4, start: '20 Sep 2024', end: '10 Jan 2026', progress: 5, budget: '₹ 32 Cr', status: 'Planning' },
  { id: 'PRJ-105', name: 'Sunrise Apartments', client: 'Sunrise Buildcon', pm: 'Neha Sharma', sites: 2, start: '01 Feb 2023', end: '15 Aug 2024', progress: 100, budget: '₹ 22 Cr', status: 'Completed' },
];

export default function ProjectsPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Project Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Client', accessor: 'client' },
    { header: 'Project Manager', accessor: 'pm' },
    { header: 'Sites', accessor: 'sites' },
    { header: 'Timeline', accessor: 'timeline', cell: (row) => <span style={{fontSize: '0.75rem'}}>{row.start} - {row.end}</span> },
    { header: 'Progress', accessor: 'progress', cell: (row) => (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px'}}>
          <div style={{height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: `${row.progress}%`}}></div>
        </div>
        <span style={{fontSize: '0.75rem', fontWeight: 600}}>{row.progress}%</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <PageHeader 
        title="Projects" 
        subtitle="Manage all company projects and their sites."
        searchPlaceholder="Search projects..."
        actionLabel="Create Project"
        onAction={() => alert('Create Project modal')}
      />

      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Projects" value="24" icon={<Building2 size={24} />} color="blue" />
        <KPICard title="Active Projects" value="16" icon={<Clock size={24} />} color="teal" />
        <KPICard title="Completed Projects" value="7" icon={<CheckCircle size={24} />} color="green" />
        <KPICard title="Projects At Risk" value="1" icon={<AlertTriangle size={24} />} color="red" />
      </div>

      <DataTable columns={columns} data={mockProjects} />
    </>
  );
}
