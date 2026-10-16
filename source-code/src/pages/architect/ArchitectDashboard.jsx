import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { Compass, FileText, RefreshCw, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ArchitectDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const myProjects = state.projects.filter(p => p.id === 'PRJ-101' || p.id === 'PRJ-102');
  const myDrawings = state.drawings || [];
  const pendingReview = myDrawings.filter(d => d.status === 'Submitted for Review' || d.status === 'Under Review');
  const revisionReqs = myDrawings.filter(d => d.status === 'Revision Required');
  const queries = state.siteQueries || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Vikram Patel! (Lead Architect)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Review technical drawings, issue revisions, resolve structural clashes, and respond to site engineering RFIs.
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="Assigned Projects" value={myProjects.length} icon={<Compass size={22} />} color="blue" subtitle="Under active design supervision" />
        <KPICard title="Drawings Pending Review" value={pendingReview.length} icon={<FileText size={22} />} color="orange" subtitle="Submitted by MEP & Structural teams" />
        <KPICard title="Revision Requests" value={revisionReqs.length} icon={<RefreshCw size={22} />} color="red" subtitle="Requires architectural updates" />
        <KPICard title="Open Site Queries (RFIs)" value={queries.length} icon={<MessageSquare size={22} />} color="teal" subtitle="Technical inquiries from Site Engineers" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Working Drawings</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/architect/drawings')}>View All Drawings</button>
        </div>
        <DataTable
          columns={[
            { header: 'Drawing ID', accessor: 'drawingId', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.drawingId}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Discipline', accessor: 'discipline' },
            { header: 'Revision', accessor: 'revisionNumber', cell: r => 'Rev ' + r.revisionNumber },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={myDrawings.slice(0, 6)}
        />
      </div>
    </div>
  );
}
