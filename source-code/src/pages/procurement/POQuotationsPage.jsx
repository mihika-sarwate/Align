import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Quotation Comparison', 'Pending Review', 'Accepted', 'Rejected'];

export default function POQuotationsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Quotation Comparison');

  const handleAccept = (q) => {
    dispatch({ type: 'UPDATE_QUOTATION_STATUS', payload: { id: q.id, status: 'Accepted' } });
    alert('Quotation ' + q.id + ' accepted. Proceed to PO generation.');
  };

  return (
    <>
      <PageHeader title="Quotation Comparison & Analysis" subtitle="Comparative analysis of vendor pricing, delivery timelines, payment terms, and ratings." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Quote ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Vendor', accessor: 'vendorName', cell: r => <span style={{ fontWeight: 600 }}>{r.vendorName}</span> },
            { header: 'Material / Item', accessor: 'materialName' },
            { header: 'Unit Rate', accessor: 'unitRate', cell: r => '₹' + r.unitRate },
            { header: 'Total Cost', accessor: 'totalAmount', cell: r => <strong style={{ color: 'var(--color-teal)' }}>₹{Number(r.totalAmount).toLocaleString('en-IN')}</strong> },
            { header: 'Lead Time', accessor: 'leadDays', cell: r => (r.leadDays || 4) + ' Days' },
            { header: 'Terms', accessor: 'paymentTerms' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={state.quotations}
          actions={r => r.status !== 'Accepted' && (
            <button className="btn btn-sm btn-primary" onClick={() => handleAccept(r)}>Accept Quote</button>
          )}
        />
      </div>
    </>
  );
}
