import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function SalesFollowupsPage() {
  const { state } = useApp();
  const leads = state.leads || [];

  return (
    <>
      <PageHeader title="Daily Follow-Up Reminders" subtitle="Scheduled calls, site visits, and feedback reviews with active prospects." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Lead Ref', accessor: 'id' },
            { header: 'Prospect Name', accessor: 'clientName' },
            { header: 'Requirements', accessor: 'requirements' },
            { header: 'Follow-Up Due', accessor: 'nextFollowUp' },
            { header: 'Pipeline Stage', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
          ]}
          data={leads}
        />
      </div>
    </>
  );
}
