import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { CheckSquare, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const mockTasks = [
  { id: 'TSK-1024', title: 'Complete slab reinforcement', project: 'Alpha Tower', site: 'Tower A Foundation', assignedTo: 'Rajesh K', priority: 'High', date: '01 Sep 2024', due: '05 Sep 2024', status: 'In Progress' },
  { id: 'TSK-1025', title: 'Check material receipt - Cement', project: 'Alpha Tower', site: 'Tower B Excavation', assignedTo: 'Sunil Verma', priority: 'Medium', date: '02 Sep 2024', due: '03 Sep 2024', status: 'Submitted' },
  { id: 'TSK-1026', title: 'Electrical conduit installation', project: 'Omega Tech Park', site: 'IT Block 1', assignedTo: 'Priya M', priority: 'Medium', date: '03 Sep 2024', due: '10 Sep 2024', status: 'Assigned' },
  { id: 'TSK-1027', title: 'Formwork for beam level 2', project: 'City Center Mall', site: 'Main Atrium', assignedTo: 'Amit Shah', priority: 'High', date: '28 Aug 2024', due: '30 Aug 2024', status: 'Blocked' },
  { id: 'TSK-1028', title: 'Quality inspection - Pillar 4', project: 'Green Valley Villas', site: 'Phase 1 Layout', assignedTo: 'Nitin Rao', priority: 'Critical', date: '25 Aug 2024', due: '26 Aug 2024', status: 'Completed' },
];

export default function TasksPage() {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'var(--color-red)';
      case 'High': return 'var(--color-orange)';
      case 'Medium': return 'var(--color-blue)';
      default: return 'var(--color-green)';
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--text-secondary)'}}>{row.id}</span> },
    { header: 'Task', accessor: 'title', cell: (row) => <span style={{fontWeight: 600}}>{row.title}</span> },
    { header: 'Project & Site', accessor: 'project', cell: (row) => (
      <div>
        <div style={{fontWeight: 500}}>{row.project}</div>
        <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>{row.site}</div>
      </div>
    )},
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Priority', accessor: 'priority', cell: (row) => (
      <span style={{ fontWeight: 600, color: getPriorityColor(row.priority) }}>{row.priority}</span>
    )},
    { header: 'Due Date', accessor: 'due' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <PageHeader 
        title="Tasks" 
        subtitle="Track organization-wide task assignments and completions."
        searchPlaceholder="Search tasks..."
        actionLabel="Create Task"
        onAction={() => alert('Create Task modal')}
      />

      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Tasks" value="842" icon={<CheckSquare size={24} />} color="blue" />
        <KPICard title="In Progress" value="312" icon={<Clock size={24} />} color="teal" />
        <KPICard title="Blocked" value="18" icon={<AlertTriangle size={24} />} color="red" />
        <KPICard title="Completed (This Week)" value="156" icon={<CheckCircle size={24} />} color="green" />
      </div>

      <DataTable columns={columns} data={mockTasks} />
    </>
  );
}
