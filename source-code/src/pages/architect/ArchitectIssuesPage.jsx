import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function ArchitectIssuesPage() {
  const { state } = useApp();
  const issues = state.issues.filter(i => i.category === 'Technical' || i.category === 'Structural');

  return (
    <>
      <PageHeader title="Design & Technical Clashes" subtitle="Technical clashes requiring drawing amendments or structural engineering consultation." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Title', accessor: 'title' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Priority', accessor: 'priority' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={issues}
        />
      </div>
    </>
  );
}
