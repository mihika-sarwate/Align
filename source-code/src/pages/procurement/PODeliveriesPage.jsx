import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function PODeliveriesPage() {
  const { state } = useApp();

  return (
    <>
      <PageHeader title="Inbound Deliveries & Tracking" subtitle="Real-time transit status of dispatched supplier purchase orders." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Delivery ID', accessor: 'id' },
            { header: 'PO Reference', accessor: 'poId' },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Destination Site', accessor: 'siteId' },
            { header: 'Expected Delivery', accessor: 'expectedDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Delivered' ? 'green' : 'blue')}>{r.status}</span> }
          ]}
          data={state.deliveries}
        />
      </div>
    </>
  );
}
