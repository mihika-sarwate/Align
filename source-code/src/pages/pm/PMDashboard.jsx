import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { FolderGit2, HardHat, CheckCircle2, AlertOctagon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PMDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const myProjects = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = state.sites.filter(s => myProjectIds.includes(s.projectId));
  const myTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId));
  
  const inProgressTasks = myTasks.filter(t => t.status === 'In Progress').length;
  const blockedTasks = myTasks.filter(t => t.status === 'Blocked').length;
  const pendingApprovals = state.materialRequests.filter(m => myProjectIds.includes(m.projectId) && m.status === 'Pending').length;

  const awaitingVerification = myTasks.filter(t => t.status === 'Submitted');
  const openIssues = state.issues.filter(i => myProjectIds.includes(i.projectId) && i.status !== 'Closed');

  const projectCols = [
    { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Timeline', accessor: 'startDate', cell: r => r.startDate + ' to ' + r.endDate },
    { header: 'Progress', accessor: 'progress', cell: r => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
          <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: r.progress + '%' }}></div>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome back, Rahul Mehta! (Project Manager)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Monitor your projects, track task verification, approvals, and on-site engineering progress.
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="Assigned Projects" value={myProjects.length} icon={<FolderGit2 size={22} />} color="blue" subtitle="Under your direct supervision" />
        <KPICard title="Active Sites" value={mySites.length} icon={<HardHat size={22} />} color="teal" subtitle="Sites in execution" />
        <KPICard title="In Progress Tasks" value={inProgressTasks} icon={<Clock size={22} />} color="orange" subtitle={blockedTasks + " tasks blocked"} />
        <KPICard title="Pending Approvals" value={pendingApprovals} icon={<AlertOctagon size={22} />} color="red" subtitle="Material requests requiring action" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>My Assigned Projects</h3>
          <button className="btn btn-sm btn-secondary" onClick={() => navigate('/pm/projects')}>View All</button>
        </div>
        <DataTable columns={projectCols} data={myProjects} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Tasks Awaiting Verification</h3>
            <span className="badge blue">{awaitingVerification.length}</span>
          </div>
          {awaitingVerification.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No tasks awaiting verification.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {awaitingVerification.slice(0, 5).map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.taskCode} • {t.siteId}</div>
                  </div>
                  <button className="btn btn-sm btn-primary" onClick={() => navigate('/pm/tasks')}>Verify</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Open Project Issues</h3>
            <span className="badge red">{openIssues.length}</span>
          </div>
          {openIssues.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No open issues on your projects.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {openIssues.slice(0, 5).map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{i.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{i.category} • Priority: <strong>{i.priority}</strong></div>
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
