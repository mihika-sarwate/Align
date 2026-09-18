import React from 'react';
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
          <div style={{height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: `${row.progress}%`}}></div>
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
}