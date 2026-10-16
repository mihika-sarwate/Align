import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ContractorActivityPage() {
  const { state } = useApp();
  const acts = state.activity.filter(a => a.siteId === 'SIT-201');

  return (
    <>
      <PageHeader title="Contractor Activity Log" subtitle="Log of task updates, material indents, and attendance logs." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Description', accessor: 'description' }
          ]}
          data={acts}
        />
      </div>
    </>
  );
}
