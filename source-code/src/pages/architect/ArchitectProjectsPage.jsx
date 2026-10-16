import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function ArchitectProjectsPage() {
  const { state } = useApp();
  const projects = state.projects.filter(p => p.id === 'PRJ-101' || p.id === 'PRJ-102');

  return (
    <>
      <PageHeader title="Assigned Architectural Projects" subtitle="Projects under design supervision, detailing, and technical sanctioning." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Client', accessor: 'clientName' },
            { header: 'Project Manager', accessor: 'pmName' },
            { header: 'Progress', accessor: 'progress', cell: r => r.progress + '%' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={projects}
        />
      </div>
    </>
  );
}
