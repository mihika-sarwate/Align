import React from 'react';
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
}