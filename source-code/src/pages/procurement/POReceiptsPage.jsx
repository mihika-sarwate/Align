import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function POReceiptsPage() {
  const { state } = useApp();

  return (
    <>
      <PageHeader title="Goods Receipt Verification (PO View)" subtitle="Verify accepted versus rejected quantities received on-site against supplier delivery challans." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'GRN ID', accessor: 'id' },
            { header: 'PO Ref', accessor: 'poId' },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Accepted Quantity', accessor: 'acceptedQty' },
            { header: 'Rejected Quantity', accessor: 'rejectedQty' },
            { header: 'Received By', accessor: 'receivedBy' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
          ]}
          data={state.receipts}
        />
      </div>
    </>
  );
}
