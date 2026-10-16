import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function POActivityPage() {
  const { state } = useApp();
  const acts = state.activity.filter(a => a.module === 'Procurement' || a.module === 'Inventory' || !a.module);

  return (
    <>
      <PageHeader title="Procurement Activity Trail" subtitle="Chronological history of purchase requisitions, RFQs floated, and POs dispatched." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'User', accessor: 'user' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Description', accessor: 'description' }
          ]}
          data={acts}
        />
      </div>
    </>
  );
}
