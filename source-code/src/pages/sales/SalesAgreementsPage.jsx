import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function SalesAgreementsPage() {
  const { state } = useApp();
  const agreements = state.agreements || [];

  return (
    <>
      <PageHeader title="Sale & Allotment Agreements (BBA)" subtitle="Formal Builder-Buyer Agreements, RERA registration deeds, and stamp duty stamping." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Agreement #', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Buyer', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Total Value', accessor: 'totalValue', cell: r => '₹' + (r.totalValue / 10000000).toFixed(2) + ' Cr' },
            { header: 'Execution Date', accessor: 'signedDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={agreements}
        />
      </div>
    </>
  );
}
