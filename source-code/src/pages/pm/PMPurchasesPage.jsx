import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Purchase Orders', 'Deliveries', 'Material Receipts'];

export default function PMPurchasesPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Purchase Orders');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const pos = state.purchaseOrders.filter(p => myProjectIds.includes(p.projectId));

  return (
    <>
      <PageHeader title="Procurement & Deliveries" subtitle="Read-only view of purchase orders dispatched for assigned projects." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'PO Number', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Total Amount', accessor: 'totalAmount', cell: r => `₹${Number(r.totalAmount).toLocaleString('en-IN')}` },
            { header: 'Expected Delivery', accessor: 'expectedDelivery' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={pos}
        />
      </div>
    </>
  );
}
