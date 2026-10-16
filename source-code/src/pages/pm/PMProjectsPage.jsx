import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';

const TABS = ['Overview', 'Sites', 'Tasks', 'Phases', 'Weekly Targets', 'Progress', 'Materials', 'Inventory', 'Expenses', 'Issues', 'Documents', 'Activity'];

export default function PMProjectsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const myProjects = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);

  const mySites = state.sites.filter(s => myProjectIds.includes(s.projectId));
  const myTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId));
  const myIssues = state.issues.filter(i => myProjectIds.includes(i.projectId));
  const myDocs = state.documents.filter(d => myProjectIds.includes(d.projectId));

  const projectCols = [
    { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Budget', accessor: 'budget', cell: r => '₹' + (r.budget / 10000000).toFixed(1) + ' Cr' },
    { header: 'Timeline', accessor: 'startDate', cell: r => r.startDate + ' to ' + r.endDate },
    { header: 'Progress', accessor: 'progress', cell: r => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
          <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: r.progress + '%' }}></div>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  const siteCols = [
    { header: 'Site ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Site Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Project', accessor: 'projectName' },
    { header: 'Location', accessor: 'location' },
    { header: 'Site Engineer', accessor: 'seName' },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  const taskCols = [
    { header: 'Task ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
    { header: 'Code', accessor: 'taskCode' },
    { header: 'Site', accessor: 'siteId' },
    { header: 'Assigned To', accessor: 'assignedToName' },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader title="Project Details & Oversight" subtitle="Comprehensive view of assigned construction projects, sites, and execution metrics." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search..." />
        {activeTab === 'Overview' && <DataTable columns={projectCols} data={myProjects} />}
        {activeTab === 'Sites' && <DataTable columns={siteCols} data={mySites} />}
        {activeTab === 'Tasks' && <DataTable columns={taskCols} data={myTasks} />}
        {activeTab === 'Phases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {state.phases.filter(p => myProjectIds.includes(p.projectId)).map(p => (
              <div key={p.id} style={{ padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>[{p.code}]</span> {p.name} — Project: {p.projectId}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Issues' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Title', accessor: 'title' },
              { header: 'Category', accessor: 'category' },
              { header: 'Priority', accessor: 'priority' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myIssues}
          />
        )}
        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Date', accessor: 'uploadDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myDocs}
          />
        )}
        {!['Overview', 'Sites', 'Tasks', 'Phases', 'Issues', 'Documents'].includes(activeTab) && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Showing {activeTab} data for assigned projects ({myProjectIds.join(', ')}).
          </div>
        )}
      </div>
    </>
  );
}
