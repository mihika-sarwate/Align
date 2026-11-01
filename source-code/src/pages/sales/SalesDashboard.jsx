import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { TrendingUp, UserCheck, FileCheck, CheckCircle2, Clock, AlertTriangle, Layers, ArrowUpRight, Plus, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SalesDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const totalLeads = state.leads?.length || 0;
  const activeBookings = state.bookings?.filter(b => b.status === 'Confirmed' || b.status === 'Agreement in Progress').length || 0;
  const pendingQuotations = state.salesQuotations?.filter(q => q.status === 'Sent' || q.status === 'Under Review').length || 0;
  const activeAgreements = state.agreements?.length || 0;

  // Project Completion Overview calculated from real tasks
  const projectSummaries = (state.projects || []).map(p => {
    const pTasks = (state.tasks || []).filter(t => t.projectId === p.id);
    const total = pTasks.length;
    const completed = pTasks.filter(t => t.status === 'Completed').length;
    const inProgress = pTasks.filter(t => t.status === 'In Progress').length;
    const blocked = pTasks.filter(t => t.status === 'Blocked').length;
    const pendingReview = pTasks.filter(t => t.status === 'Awaiting Verification' || t.status === 'Pending Review' || t.status === 'Assigned').length;
    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

    let computedStatus = 'On Track';
    if (blocked > 0) computedStatus = 'Delayed / At Risk';
    else if (completionPct === 100 && total > 0) computedStatus = 'Handover Ready';
    else if (completionPct >= 75) computedStatus = 'Finishing Phase';
    else if (completionPct >= 30) computedStatus = 'Active Execution';
    else computedStatus = 'Site Mobilisation';

    const assocSites = (state.sites || []).filter(s => s.projectId === p.id).map(s => s.name).join(', ') || 'Main Site';

    return {
      id: p.id,
      name: p.name,
      associatedSite: assocSites,
      location: p.location || 'Pune / Mumbai',
      total,
      completed,
      inProgress,
      blocked,
      pendingReview,
      completionPct,
      computedStatus,
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome Banner */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Riya Sharma! (Sales & CRM Executive)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Customer relationship pipeline, booking token agreements, sales quotations, and project completion milestones.
        </p>
      </div>

      {/* Quick Actions (Positioned at Top) */}
      <div className="card" style={{ padding: '16px 20px', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Quick Actions:</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instant operations for sales & customer inquiries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/sales/leads')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} />
              <span>New Lead Inquiry</span>
            </button>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales/quotations')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCheck size={14} />
              <span>Create Quotation</span>
            </button>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales/bookings')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={14} />
              <span>Record Booking</span>
            </button>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales/followups')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              <span>Schedule Follow-Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid (Operational, Non-Financial / Non-Revenue) */}
      <div className="kpi-grid">
        <KPICard title="Total Active Leads" value={totalLeads} icon={<TrendingUp size={22} />} color="blue" subtitle="Inquiries across portals & walk-ins" />
        <KPICard title="Pending Quotations" value={pendingQuotations} icon={<FileCheck size={22} />} color="orange" subtitle="Proposals awaiting client closure" />
        <KPICard title="Active Unit Bookings" value={activeBookings} icon={<UserCheck size={22} />} color="teal" subtitle="Confirmed token allotments" />
        <KPICard title="Executed Agreements" value={activeAgreements} icon={<Layers size={22} />} color="green" subtitle="Sale deeds and allotment letters" />
      </div>

      {/* Project Completion Overview (Derived from Task Workflow) */}
      <div className="card" style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="var(--color-primary)" />
              Project Completion Overview
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Live task execution progress across active projects to provide accurate buyer updates and handover dates.
            </p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales/reports')}>
            <span>Client Progress Reports</span>
          </button>
        </div>

        <DataTable
          columns={[
            { 
              header: 'Project / Site', 
              accessor: 'name',
              cell: r => (
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Site: {r.associatedSite} • {r.location}</div>
                </div>
              )
            },
            {
              header: 'Overall Progress',
              accessor: 'completionPct',
              cell: r => (
                <div style={{ minWidth: '130px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '3px' }}>
                    <span>{r.completionPct}% Done</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{r.completed}/{r.total} Tasks</span>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${r.completionPct}%`, 
                      background: r.completionPct >= 80 ? '#10b981' : r.completionPct >= 40 ? '#3b82f6' : '#f59e0b',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              )
            },
            { 
              header: 'In Progress', 
              accessor: 'inProgress',
              cell: r => <span style={{ fontWeight: 600, color: '#3b82f6' }}>{r.inProgress}</span>
            },
            { 
              header: 'Pending / Review', 
              accessor: 'pendingReview',
              cell: r => <span style={{ fontWeight: 600, color: '#8b5cf6' }}>{r.pendingReview}</span>
            },
            { 
              header: 'Blocked Tasks', 
              accessor: 'blocked',
              cell: r => (
                <span style={{ 
                  fontWeight: 600, 
                  color: r.blocked > 0 ? '#ef4444' : '#10b981'
                }}>
                  {r.blocked}
                </span>
              )
            },
            { 
              header: 'Current Status', 
              accessor: 'computedStatus',
              cell: r => (
                <span className={`badge ${
                  r.computedStatus.includes('Ready') || r.computedStatus.includes('Track') ? 'badge-success' :
                  r.computedStatus.includes('Delayed') ? 'badge-danger' : 'badge-primary'
                }`}>
                  {r.computedStatus}
                </span>
              )
            }
          ]}
          data={projectSummaries}
        />
      </div>

      {/* Active Client Inquiries Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Inquiries & Client Leads</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/sales/leads')}>Pipeline View</button>
        </div>
        <DataTable
          columns={[
            { header: 'Lead ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Client Name', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Requirements', accessor: 'requirements' },
            { header: 'Source', accessor: 'source' },
            { header: 'Next Follow-Up', accessor: 'nextFollowUp' },
            { header: 'Stage', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={(state.leads || []).slice(0, 6)}
        />
      </div>

    </div>
  );
}
