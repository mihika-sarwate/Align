import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['All POs', 'Approved POs', 'Received Orders', 'Orders Awaiting Invoice'];

export default function AccountsPOPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('All POs');

  return (
    <>
      <PageHeader title="Purchase Orders (Finance View)" subtitle="Approved purchase commitments against which vendor invoices are matched." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'PO Number', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
            { header: 'Committed Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={state.purchaseOrders}
        />
      </div>
    </>
  );
}
