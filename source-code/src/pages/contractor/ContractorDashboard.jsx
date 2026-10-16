import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { Briefcase, Users, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContractorDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Ramesh Contractor (EMP-010) - SIT-201
  const assignments = state.workAssignments || [];
  const activeWork = assignments.filter(a => a.status === 'In Progress');
  const blockedWork = assignments.filter(a => a.status === 'Blocked');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Ramesh Contractor! (Civil Contractor)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Contractor Portal — Manage field labor crews, log completed work packages, and report on-site bottlenecks.
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="Assigned Work Packages" value={assignments.length} icon={<Briefcase size={22} />} color="blue" subtitle="Under contract execution" />
        <KPICard title="Active Crew Size" value="28 Workers" icon={<Users size={22} />} color="teal" subtitle="Masons, steel fixers, carpenters" />
        <KPICard title="In Progress Tasks" value={activeWork.length} icon={<Calendar size={22} />} color="green" subtitle="Active on SIT-201" />
        <KPICard title="Blocked Packages" value={blockedWork.length} icon={<AlertTriangle size={22} />} color="red" subtitle="Awaiting material delivery" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Current Work Packages (Tower A)</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/contractor/work')}>Update Progress</button>
        </div>
        <DataTable
          columns={[
            { header: 'Package Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.taskCode}</span> },
            { header: 'Scope / Description', accessor: 'scope', cell: r => <span style={{ fontWeight: 600 }}>{r.scope}</span> },
            { header: 'Target Date', accessor: 'targetDate' },
            { header: 'Planned Qty', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
            { header: 'Completed', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={assignments}
        />
      </div>
    </div>
  );
}
