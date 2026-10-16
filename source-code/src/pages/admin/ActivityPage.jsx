import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import SearchFilterBar from '../../components/SearchFilterBar';

const TABS = [
  'All Activity',
  'User Activity',
  'Project Activity',
  'Site Activity',
  'Approvals',
  'Audit Log'
];

export default function ActivityPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('All Activity');
  const [search, setSearch] = useState('');

  const filtered = state.activity.filter(a => {
    const matchSearch = !search ||
      (a.user || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.action || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.description || '').toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'All Activity') return matchSearch;
    if (activeTab === 'Project Activity') return matchSearch && Boolean(a.projectId);
    if (activeTab === 'Site Activity') return matchSearch && Boolean(a.siteId);
    if (activeTab === 'Approvals') return matchSearch && (a.action === 'Approved' || a.action === 'Verified');
    return matchSearch;
  });

  return (
    <>
      <PageHeader
        title="Enterprise Activity & Audit Trail"
        subtitle="Immutable audit log of all system actions: Created, Assigned, Approved, Dispatched, Received, and Verified."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search audit trail by user, action, description..." />
        <DataTable
          columns={[
            { header: 'Timestamp', accessor: 'timestamp', cell: r => <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.timestamp}</span> },
            { header: 'User', accessor: 'user', cell: r => <span style={{ fontWeight: 600 }}>{r.user}</span> },
            { header: 'Action', accessor: 'action', cell: r => <span className="badge blue">{r.action}</span> },
            { header: 'Module', accessor: 'module' },
            { header: 'Project / Site', accessor: 'siteId', cell: r => (r.projectId || '-') + (r.siteId ? ' / ' + r.siteId : '') },
            { header: 'Event Description', accessor: 'description' }
          ]}
          data={filtered}
        />
      </div>
    </>
  );
}