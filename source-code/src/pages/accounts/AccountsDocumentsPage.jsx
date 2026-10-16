import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsDocumentsPage() {
  const { state } = useApp();
  const docs = state.documents.filter(d => d.category === 'Invoices' || d.category === 'Contracts');

  return (
    <>
      <PageHeader title="Financial Documents & Audit Archive" subtitle="Tax invoice scans, signed contracts, and payment vouchers." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Document', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Date', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
