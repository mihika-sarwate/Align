import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const mockSites = [
  { id: 'SIT-201', name: 'Tower A Foundation', project: 'Alpha Residential Tower', location: 'Mumbai South', se: 'Rajesh K', pm: 'Ramesh Singh', progress: 85, activeTasks: 12, issues: 0, status: 'Active' },
  { id: 'SIT-202', name: 'Tower B Excavation', project: 'Alpha Residential Tower', location: 'Mumbai South', se: 'Sunil Verma', pm: 'Ramesh Singh', progress: 20, activeTasks: 8, issues: 2, status: 'Delayed' },
  { id: 'SIT-203', name: 'IT Block 1', project: 'Omega Tech Park', location: 'Pune Hinjewadi', se: 'Priya M', pm: 'Suresh Kumar', progress: 45, activeTasks: 24, issues: 1, status: 'Active' },
  { id: 'SIT-204', name: 'Main Atrium', project: 'City Center Mall', location: 'Delhi NCR', se: 'Amit Shah', pm: 'Anita Desai', progress: 95, activeTasks: 3, issues: 0, status: 'Active' },
  { id: 'SIT-205', name: 'Phase 1 Layout', project: 'Green Valley Villas', location: 'Bangalore East', se: 'Nitin Rao', pm: 'Vikram Patel', progress: 100, activeTasks: 0, issues: 0, status: 'Completed' },
];

export default function SitesPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Site Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Location', accessor: 'location' },
    { header: 'Site Engineer', accessor: 'se' },
    { header: 'Progress', accessor: 'progress', cell: (row) => (
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px'}}>
          <div style={{height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: `${row.progress}%`}}></div>
        </div>
        <span style={{fontSize: '0.75rem', fontWeight: 600}}>{row.progress}%</span>
      </div>
    )},
    { header: 'Tasks', accessor: 'activeTasks' },
    { header: 'Issues', accessor: 'issues', cell: (row) => (
      <span style={{ color: row.issues > 0 ? 'var(--color-red)' : 'var(--text-secondary)'}}>
        {row.issues > 0 ? `${row.issues} Open` : 'None'}
      </span>
    )},
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <PageHeader 
        title="Sites" 
        subtitle="Manage individual construction sites and zones."
        searchPlaceholder="Search sites..."
        actionLabel="Create Site"
        onAction={() => alert('Create Site modal')}
      />

      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Sites" value="48" icon={<MapPin size={24} />} color="blue" />
        <KPICard title="Active Sites" value="32" icon={<Clock size={24} />} color="teal" />
        <KPICard title="Completed Sites" value="12" icon={<CheckCircle size={24} />} color="green" />
        <KPICard title="Sites with Issues" value="4" icon={<AlertTriangle size={24} />} color="red" />
      </div>

      <DataTable columns={columns} data={mockSites} />
    </>
  );
}
