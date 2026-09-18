import React from 'react';
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
}