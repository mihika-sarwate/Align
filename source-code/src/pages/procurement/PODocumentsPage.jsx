import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function PODocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.category === 'Purchases' || d.category === 'Invoices');

  return (
    <>
      <PageHeader title="Purchase Documents Archive" subtitle="Centralized storage of PO copies, signed quotation sheets, and vendor catalogues." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Document', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Date', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
