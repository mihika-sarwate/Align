import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['All Documents', 'Drawings', 'Contracts', 'Reports'];

export default function PMDocumentsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('All Documents');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const docs = state.documents.filter(d => myProjectIds.includes(d.projectId));

  return (
    <>
      <PageHeader title="Project Documents & Drawings" subtitle="Centralized blueprints, approvals, contracts, and progress archives." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Document Name', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Project', accessor: 'projectId' },
            { header: 'Upload Date', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={docs}
        />
      </div>
    </>
  );
}
