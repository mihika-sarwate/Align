import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Vendor Directory', 'Suppliers', 'Sub-Contractors', 'Performance Ratings'];

export default function POVendorsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Vendor Directory');

  return (
    <>
      <PageHeader title="Vendor Management" subtitle="Registered suppliers, contractors, tax GSTIN credentials, and quality ratings." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Vendor ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Company Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Category', accessor: 'category' },
            { header: 'Contact Person', accessor: 'contactPerson' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Rating', accessor: 'rating', cell: r => '★ ' + (r.rating || 4.5) },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={state.vendors}
        />
      </div>
    </>
  );
}
