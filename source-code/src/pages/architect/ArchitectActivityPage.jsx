import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ArchitectActivityPage() {
  const { state } = useApp();
  const acts = state.activity.filter(a => a.module === 'Design' || a.module === 'Drawings' || !a.module);

  return (
    <>
      <PageHeader title="Architectural Activity Trail" subtitle="Log of drawing approvals, revisions issued, and site query responses." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'User', accessor: 'user' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Description', accessor: 'description' }
          ]}
          data={acts}
        />
      </div>
    </>
  );
}
