import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function PMActivityPage() {
  const { state } = useApp();
  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const activities = state.activity.filter(a => !a.projectId || myProjectIds.includes(a.projectId));

  return (
    <>
      <PageHeader title="Project Activity Log" subtitle="Audit trail of task status transitions, material requisitions, and engineer submissions." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'User', accessor: 'user' },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Module', accessor: 'module' },
            { header: 'Description', accessor: 'description' }
          ]}
          data={activities}
        />
      </div>
    </>
  );
}
