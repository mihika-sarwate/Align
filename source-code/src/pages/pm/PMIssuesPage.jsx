import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['All Project Issues', 'Open', 'In Review', 'Resolved', 'Closed'];

export default function PMIssuesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Project Issues');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const issues = state.issues.filter(i => myProjectIds.includes(i.projectId));

  const filtered = issues.filter(i => {
    if (activeTab === 'Open') return i.status === 'Open';
    if (activeTab === 'In Review') return i.status === 'In Review';
    if (activeTab === 'Resolved') return i.status === 'Resolved';
    if (activeTab === 'Closed') return i.status === 'Closed';
    return true;
  });

  return (
    <>
      <PageHeader title="Project Issues & Bottlenecks" subtitle="Coordinate resolution of on-site technical and material issues." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Title', accessor: 'title' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Category', accessor: 'category' },
            { header: 'Priority', accessor: 'priority' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={r => r.status === 'Open' && (
            <button className="btn btn-sm btn-primary" onClick={() => dispatch({ type: 'UPDATE_ISSUE_STATUS', payload: { id: r.id, status: 'Resolved' } })}>Resolve</button>
          )}
        />
      </div>
    </>
  );
}
