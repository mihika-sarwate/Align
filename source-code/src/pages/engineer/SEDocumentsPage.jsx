import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function SEDocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.siteId === 'SIT-201' || d.projectId === 'PRJ-101');

  return (
    <>
      <PageHeader title="Working Drawings & Site Docs" subtitle="Approved architectural, structural, and MEP engineering drawings for field reference." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Drawing / Document', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Category', accessor: 'category' },
            { header: 'Revision', accessor: 'version', cell: r => r.version || 'Rev 1.0' },
            { header: 'Upload Date', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
