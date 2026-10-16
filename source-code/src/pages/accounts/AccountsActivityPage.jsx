import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsActivityPage() {
  const { state } = useApp();
  const acts = state.activity.filter(a => a.module === 'Finance' || a.module === 'Accounts' || !a.module);

  return (
    <>
      <PageHeader title="Accounts Audit Trail" subtitle="Comprehensive record of invoice verifications, payment disbursements, and expense approvals." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'User', accessor: 'user' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge green">{r.action}</span> },
            { header: 'Description', accessor: 'description' }
          ]}
          data={acts}
        />
      </div>
    </>
  );
}
