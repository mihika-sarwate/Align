import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TABS = ['All Receipts', 'Awaiting Verification', 'Verified', 'Discrepancies'];

export default function AccountsReceiptsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Receipts');

  const handleVerify = (receipt) => {
    dispatch({ type: 'VERIFY_RECEIPT', payload: receipt.id });
    alert('Receipt ' + receipt.id + ' marked as verified.');
  };

  return (
    <>
      <PageHeader title="Site Goods Receipts (GRN Audit)" subtitle="Verify physical delivery acceptance by Site Engineers before releasing invoice payments." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'GRN ID', accessor: 'id' },
            { header: 'PO ID', accessor: 'poId' },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Accepted Qty', accessor: 'acceptedQty' },
            { header: 'Rejected Qty', accessor: 'rejectedQty' },
            { header: 'Received By', accessor: 'receivedBy' },
            { header: 'Audit Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
          ]}
          data={state.receipts}
          actions={r => r.status !== 'Verified' && (
            <button className="btn btn-sm btn-primary" onClick={() => handleVerify(r)}>Audit Pass</button>
          )}
        />
      </div>
    </>
  );
}
