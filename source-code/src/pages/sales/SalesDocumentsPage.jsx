import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function SalesDocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.category === 'Contracts');

  return (
    <>
      <PageHeader title="Sales Collateral & Agreements" subtitle="Brochures, approved floor layout booklets, and signed agreement scans." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Document', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Upload Date', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
