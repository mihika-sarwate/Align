import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { HardHat, CheckSquare, Clock, AlertTriangle, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EngineerDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Rajesh K (EMP-004) - SIT-201
  const myTasks = state.tasks.filter(t => t.assignedTo === 'EMP-004' || t.siteId === 'SIT-201');
  const inProgress = myTasks.filter(t => t.status === 'In Progress').length;
  const blocked = myTasks.filter(t => t.status === 'Blocked').length;
  const deliveries = state.deliveries.filter(d => d.siteId === 'SIT-201' && d.status !== 'Delivered');
  const issues = state.issues.filter(i => i.siteId === 'SIT-201' && i.status !== 'Closed');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Rajesh K! (Site Engineer)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Site Tower A Foundation (SIT-201) — Alpha Residential Tower
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="My Assigned Tasks" value={myTasks.length} icon={<CheckSquare size={22} />} color="blue" subtitle="Under active execution" />
        <KPICard title="In Progress Tasks" value={inProgress} icon={<Clock size={22} />} color="teal" subtitle="Active on-site" />
        <KPICard title="Blocked Tasks" value={blocked} icon={<AlertTriangle size={22} />} color="red" subtitle="Requires PM or material support" />
        <KPICard title="Incoming Deliveries" value={deliveries.length} icon={<Truck size={22} />} color="orange" subtitle="Pending site GRN receipt" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Site Tasks (SIT-201)</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/engineer/tasks')}>Go to Tasks</button>
        </div>
        <DataTable
          columns={[
            { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.taskCode}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Planned Qty', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
            { header: 'Actual Completed', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={myTasks.slice(0, 6)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Expected Material Deliveries</h3>
            <span className="badge blue">{deliveries.length}</span>
          </div>
          {deliveries.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No incoming deliveries today.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {deliveries.map(d => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{d.vendorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PO: {d.poId} • Expected: {d.expectedDate}</div>
                  </div>
                  <button className="btn btn-sm btn-secondary" onClick={() => navigate('/engineer/receipts')}>Create GRN</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Site Issues & Hold-ups</h3>
            <span className="badge red">{issues.length}</span>
          </div>
          {issues.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No open issues for SIT-201.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {issues.map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{i.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Priority: {i.priority} • {i.category}</div>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
