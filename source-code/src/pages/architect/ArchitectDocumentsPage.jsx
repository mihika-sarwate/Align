import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ArchitectDocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.category === 'Drawings');

  return (
    <>
      <PageHeader title="Architectural Documents Repository" subtitle="PDF blueprints, CAD files, and BIM model archives." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Document', accessor: 'name' },
            { header: 'Project', accessor: 'projectId' },
            { header: 'Uploaded', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
