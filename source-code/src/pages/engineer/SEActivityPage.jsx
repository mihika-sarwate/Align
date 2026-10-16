import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function SEActivityPage() {
  const { state } = useApp();
  const activities = state.activity.filter(a => a.siteId === 'SIT-201' || !a.siteId);

  return (
    <>
      <PageHeader title="Site Activity Log" subtitle="Log of task updates, material deliveries, and inspections for SIT-201." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'User', accessor: 'user' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Description', accessor: 'description' }
          ]}
          data={activities}
        />
      </div>
    </>
  );
}
