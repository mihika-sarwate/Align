import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import SurplusDeficitBadge from '../../components/SurplusDeficitBadge';

const TABS = ['Materials Inventory', 'Equipment Inventory', 'Stock Movements', 'Low Stock & Shortages'];

export default function PMInventoryPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Materials Inventory');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const mySites = state.sites.filter(s => myProjectIds.includes(s.projectId)).map(s => s.id);
  const myInventory = state.inventory.filter(i => mySites.includes(i.location) || i.location === 'Central Yard');

  const columns = [
    { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem' }}>{r.id}</span> },
    { header: 'Order ID', accessor: 'orderId', cell: r => <span style={{ fontSize: '0.8rem' }}>{r.orderId || '-'}</span> },
    { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
    { header: 'Usage', accessor: 'usage' },
    { header: 'Task ID', accessor: 'taskId', cell: r => <span style={{ fontSize: '0.8rem', color: 'var(--color-purple)' }}>{r.taskId || '-'}</span> },
    { header: 'Location', accessor: 'location' },
    { header: 'Quantity Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
    { header: 'Quantity Present', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
    { header: 'Forthcoming Dates', accessor: 'forthcomingDates', cell: r => <span style={{ fontSize: '0.75rem' }}>{r.forthcomingDates || '-'}</span> },
    { header: 'Surplus/Deficit', accessor: 'surplus', cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} /> }
  ];

  return (
    <>
      <PageHeader title="Project Inventory" subtitle="Track on-site stock levels against planned task quantities." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable columns={columns} data={activeTab === 'Low Stock & Shortages' ? myInventory.filter(i => (i.qtyPresent / (i.qtyRequired || 1)) < 1) : myInventory} />
      </div>
    </>
  );
}
