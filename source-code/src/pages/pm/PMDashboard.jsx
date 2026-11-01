import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { FolderGit2, HardHat, Clock, AlertOctagon, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * PM Dashboard (Part 3.1)
 *
 * Requirements:
 * - NO fiscal or financial information (No Budget cards, purchase values, expenses, financial reports).
 * - Add a prominent Priority Push for urgent tasks (Critical & High priority).
 * - Project and Site identification displayed together.
 * - Project status calculated from actual task workflow.
 */
export default function PMDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const myTasks = (state.tasks || []).filter(t => myProjectIds.includes(t.projectId));

  // Urgent tasks for Priority Push
  const urgentTasks = myTasks.filter(t => (t.priority === 'Critical' || t.priority === 'High') && t.status !== 'Completed');

  const inProgressTasks = myTasks.filter(t => t.status === 'In Progress').length;
  const blockedTasks = myTasks.filter(t => t.status === 'Blocked').length;
  const awaitingVerification = myTasks.filter(t => t.status === 'Submitted');
  const pendingApprovals = (state.materialRequests || []).filter(m => myProjectIds.includes(m.projectId) && m.status === 'Pending').length;
  const openIssues = (state.issues || []).filter(i => myProjectIds.includes(i.projectId) && i.status !== 'Closed');

  // Project Table Columns (NO Clients column, NO Timeline column, Combined Project/Site, Task-derived status)
  const projectCols = [
    {
      header: 'Project & Primary Site',
      accessor: 'name',
      cell: r => {
        const pSites = mySites.filter(s => s.projectId === r.id);
        return (
          <div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{r.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)' }}>
              {pSites.map(s => `${s.name} (${s.id})`).join(', ') || 'Sites in setup'}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Task Completion Summary',
      accessor: 'tasks',
      cell: r => {
        const prjTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = prjTasks.filter(t => t.status === 'Completed').length;
        const inProg = prjTasks.filter(t => t.status === 'In Progress').length;
        const blocked = prjTasks.filter(t => t.status === 'Blocked').length;
        const submitted = prjTasks.filter(t => t.status === 'Submitted').length;

        return (
          <div style={{ fontSize: '0.8rem' }}>
            <strong>{completed}</strong> completed • <strong>{inProg}</strong> in progress
            {(blocked > 0 || submitted > 0) && (
              <span style={{ display: 'block', fontSize: '0.75rem', color: blocked > 0 ? 'var(--color-red)' : 'var(--color-orange)' }}>
                {blocked > 0 ? `${blocked} blocked ` : ''}
                {submitted > 0 ? `${submitted} awaiting review` : ''}
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Overall Completion',
      accessor: 'progress',
      cell: r => {
        const prjTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = prjTasks.filter(t => t.status === 'Completed').length;
        const pct = prjTasks.length > 0 ? Math.round((completed / prjTasks.length) * 100) : (r.progress || 0);

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, minWidth: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
              <div
                style={{
                  height: '100%',
                  background: pct === 100 ? 'var(--color-green)' : 'var(--color-blue)',
                  borderRadius: '3px',
                  width: `${pct}%`
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{pct}%</span>
          </div>
        );
      }
    },
    {
      header: 'Current Status',
      accessor: 'status',
      cell: r => {
        const prjTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = prjTasks.filter(t => t.status === 'Completed').length;
        const blocked = prjTasks.filter(t => t.status === 'Blocked').length;
        const unverified = prjTasks.filter(t => t.status === 'Submitted').length;

        // Requirement 3.3: A project must not be marked Completed while required tasks remain incomplete or unverified
        let derivedStatus = 'Active';
        if (blocked > 0) {
          derivedStatus = 'Delayed';
        } else if (prjTasks.length > 0 && completed === prjTasks.length && unverified === 0) {
          derivedStatus = 'Completed';
        } else if (prjTasks.some(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date())) {
          derivedStatus = 'Delayed';
        }
        return <StatusBadge status={derivedStatus} />;
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Manager Workspace — Rahul Mehta
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Real-time oversight of site execution, urgent task push, verification queue, and material requisition approvals.
        </p>
      </div>

      {/* PROMINENT PRIORITY PUSH FOR URGENT TASKS (Section 3.1 & 3.4) */}
      <div style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
        border: '1px solid #fed7aa',
        borderLeft: '5px solid var(--color-orange)',
        borderRadius: '8px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'var(--color-orange)',
              color: 'white',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={15} />
            </span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9a3412', margin: 0 }}>
              PRIORITY PUSH — URGENT ON-SITE TASKS ({urgentTasks.length})
            </h3>
          </div>
          <button
            className="btn btn-sm btn-primary"
            style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#ea580c', borderColor: '#ea580c' }}
            onClick={() => navigate('/pm/tasks')}
          >
            Manage Task Allocation <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#7c2d12', margin: '0 0 12px 0' }}>
          Critical path activities requiring immediate field supervision, material coordination, or blocker resolution:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {urgentTasks.slice(0, 4).map(t => {
            const siteObj = mySites.find(s => s.id === t.siteId);
            return (
              <div
                key={t.id}
                style={{
                  background: 'white',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  border: '1px solid #fed7aa',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t.taskCode} • {siteObj?.name || t.siteId} • Assigned: {t.assignedToName || 'Site Engineer'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#c2410c', marginTop: '2px' }}>
                    Due: <strong>{t.dueDate}</strong> • Output: {t.actualQty || 0} / {t.plannedQty} {t.unit}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${t.priority === 'Critical' ? 'red' : 'orange'}`} style={{ display: 'inline-block', marginBottom: '4px' }}>
                    {t.priority}
                  </span>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Non-financial KPIs (Strictly No Budget or Expenses) */}
      <div className="kpi-grid">
        <KPICard
          title="Assigned Projects"
          value={myProjects.length}
          icon={<FolderGit2 size={22} />}
          color="blue"
          subtitle="Supervised development portfolio"
        />
        <KPICard
          title="Active Project Sites"
          value={mySites.length}
          icon={<HardHat size={22} />}
          color="teal"
          subtitle="Sites in active execution"
        />
        <KPICard
          title="Tasks in Progress"
          value={inProgressTasks}
          icon={<Clock size={22} />}
          color="orange"
          subtitle={`${blockedTasks} blocked task${blockedTasks === 1 ? '' : 's'}`}
        />
        <KPICard
          title="Tasks Awaiting Verification"
          value={awaitingVerification.length}
          icon={<AlertOctagon size={22} />}
          color="purple"
          subtitle="Requires field completion sign-off"
        />
      </div>

      {/* My Projects (Combined Project and Site, No Clients, No Timeline) */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Supervised Projects & Sites</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Status derived from real task workflow metrics
            </span>
          </div>
          <button className="btn btn-sm btn-secondary" onClick={() => navigate('/pm/projects')}>
            Full Portfolio <ArrowRight size={14} style={{ marginLeft: 4 }} />
          </button>
        </div>
        <DataTable columns={projectCols} data={myProjects} />
      </div>

      {/* Verification Queue & Open Issues */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Tasks Awaiting Verification</h3>
            <span className="badge blue">{awaitingVerification.length}</span>
          </div>
          {awaitingVerification.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No tasks awaiting PM verification.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {awaitingVerification.slice(0, 5).map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.taskCode} • {t.siteId} • Assigned: {t.assignedToName}</div>
                  </div>
                  <button className="btn btn-sm btn-primary" onClick={() => navigate('/pm/tasks')}>Verify Work</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Active Site Issues</h3>
            <span className="badge red">{openIssues.length}</span>
          </div>
          {openIssues.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No active roadblocks or issues.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {openIssues.slice(0, 5).map(i => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-main)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{i.title || i.description?.substring(0, 40)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{i.category} • Site: {i.siteId} • Priority: <strong>{i.priority}</strong></div>
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
