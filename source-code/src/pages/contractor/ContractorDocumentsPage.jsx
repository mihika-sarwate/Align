import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ContractorDocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.siteId === 'SIT-201');

  return (
    <>
      <PageHeader title="Approved Working Drawings & Bar Bending Schedules" subtitle="Approved blueprints and structural drawings released to contractor." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Drawing / Document', accessor: 'name' },
            { header: 'Discipline', accessor: 'category' },
            { header: 'Revision', accessor: 'version', cell: r => r.version || 'Rev 1.0' },
            { header: 'Approved Date', accessor: 'uploadDate' }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
