import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import LBMSProductivityTable from '../../components/LBMSProductivityTable';
import InventoryMasterView from '../../components/InventoryMasterView';

// NO Purchases, NO Expenses tabs for PM
const TABS = [
  'Overview',
  'Sites',
  'Tasks',
  'LBMS Productivity Control',
  'Inventory',
  'Progress',
  'Issues',
  'Documents',
  'Activity'
];

export default function PMProjectsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);

  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const mySiteIds = mySites.map(s => s.id);
  const myTasks = (state.tasks || []).filter(t => myProjectIds.includes(t.projectId));
  const myIssues = (state.issues || []).filter(i => myProjectIds.includes(i.projectId));
  const myDocs = (state.documents || []).filter(d => myProjectIds.includes(d.projectId));

  // Projects Overview:
  // Requirements: Remove Clients column, Remove Timeline column, Combine Project and Site identification,
  // Project status calculated from tasks (Section 3.2, 3.3). NO fiscal information.
  const projectCols = [
    {
      header: 'Project & Sites',
      accessor: 'name',
      cell: r => {
        const associatedSites = mySites.filter(s => s.projectId === r.id);
        return (
          <div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{r.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)' }}>
              {associatedSites.map(s => `${s.name} (${s.id})`).join(', ') || 'In setup'}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Location',
      accessor: 'location',
      cell: r => <span className="badge blue">{r.location || 'Mumbai'}</span>
    },
    {
      header: 'Task Completion Summary',
      accessor: 'tasks',
      cell: r => {
        const pTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = pTasks.filter(t => t.status === 'Completed').length;
        const inProg = pTasks.filter(t => t.status === 'In Progress').length;
        const blocked = pTasks.filter(t => t.status === 'Blocked').length;
        const submitted = pTasks.filter(t => t.status === 'Submitted').length;

        return (
          <div style={{ fontSize: '0.8rem' }}>
            <span>{completed} / {pTasks.length} tasks completed</span>
            {(blocked > 0 || submitted > 0) && (
              <span style={{ display: 'block', fontSize: '0.72rem', color: blocked > 0 ? 'var(--color-red)' : 'var(--color-orange)' }}>
                {blocked > 0 ? `${blocked} blocked • ` : ''}
                {submitted > 0 ? `${submitted} awaiting verification` : ''}
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Overall Completion',
      accessor: 'progress',
      cell: r => {
        const pTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = pTasks.filter(t => t.status === 'Completed').length;
        const pct = pTasks.length > 0 ? Math.round((completed / pTasks.length) * 100) : (r.progress || 0);

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, minWidth: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
              <div
                style={{
                  height: '100%',
                  background: pct === 100 ? 'var(--color-green)' : 'var(--color-blue)',
                  borderRadius: '3px',
                  width: `${pct}%`
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{pct}%</span>
          </div>
        );
      }
    },
    {
      header: 'Current Status',
      accessor: 'status',
      cell: r => {
        const pTasks = myTasks.filter(t => t.projectId === r.id);
        const completed = pTasks.filter(t => t.status === 'Completed').length;
        const blocked = pTasks.filter(t => t.status === 'Blocked').length;
        const unverified = pTasks.filter(t => t.status === 'Submitted').length;

        let derivedStatus = 'Active';
        if (blocked > 0) {
          derivedStatus = 'Delayed';
        } else if (pTasks.length > 0 && completed === pTasks.length && unverified === 0) {
          derivedStatus = 'Completed';
        } else if (pTasks.some(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date())) {
          derivedStatus = 'Delayed';
        }
        return <StatusBadge status={derivedStatus} />;
      }
    }
  ];

  const siteCols = [
    {
      header: 'Project / Site',
      accessor: 'name',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Project: {r.projectName} ({r.projectId}) • {r.id}
          </span>
        </div>
      )
    },
    { header: 'Location / Zone', accessor: 'location' },
    { header: 'Site Engineer', accessor: 'seName' },
    {
      header: 'Task Completion',
      accessor: 'tasks',
      cell: r => {
        const sTasks = myTasks.filter(t => t.siteId === r.id);
        const done = sTasks.filter(t => t.status === 'Completed').length;
        return <span>{done} / {sTasks.length} tasks done</span>;
      }
    },
    {
      header: 'Completion %',
      accessor: 'progress',
      cell: r => {
        const sTasks = myTasks.filter(t => t.siteId === r.id);
        const done = sTasks.filter(t => t.status === 'Completed').length;
        const pct = sTasks.length > 0 ? Math.round((done / sTasks.length) * 100) : (r.progress || 0);
        return <strong>{pct}%</strong>;
      }
    },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  const taskCols = [
    {
      header: 'Task ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span>
    },
    { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
    { header: 'Category', accessor: 'category', cell: r => <span className="badge blue">{r.category || 'Civil'}</span> },
    { header: 'Code', accessor: 'taskCode' },
    {
      header: 'Project / Site',
      accessor: 'siteId',
      cell: r => {
        const site = mySites.find(s => s.id === r.siteId);
        return <span>{site?.name || r.siteId}</span>;
      }
    },
    { header: 'Assigned Site Engineer', accessor: 'assignedToName' },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader
        title="Project Management & Site Oversight"
        subtitle="Supervise active projects and sites with task-derived status tracking and LBMS productivity controls. (Fiscal data restricted)"
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search projects, sites, tasks..." />

        {activeTab === 'Overview' && <DataTable columns={projectCols} data={myProjects} />}
        {activeTab === 'Sites' && <DataTable columns={siteCols} data={mySites} />}
        {activeTab === 'Tasks' && <DataTable columns={taskCols} data={myTasks} />}

        {activeTab === 'LBMS Productivity Control' && (
          <LBMSProductivityTable defaultSiteId={mySiteIds[0] || 'SIT-201'} role="pm" />
        )}

        {activeTab === 'Inventory' && (
          <InventoryMasterView
            allowedProjectIds={myProjectIds}
            allowedSiteIds={mySiteIds}
            role="pm"
            canPlaceOrder={false}
            canRaiseIssue={true}
            canAdjustStock={false}
            showTransactionHistory={true}
            title="Assigned Site Inventory"
            subtitle="View physical stock levels and forthcoming material requirements for assigned projects."
          />
        )}

        {activeTab === 'Progress' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => `${r.plannedQty} ${r.unit}` },
              { header: 'Actual Quantity', accessor: 'actualQty', cell: r => `${r.actualQty || 0} ${r.unit}` },
              {
                header: 'Performance Ratio',
                accessor: 'ratio',
                cell: r => {
                  const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
                  return <span style={{ fontWeight: 700, color: ratio >= 80 ? 'var(--color-green)' : 'var(--color-orange)' }}>{ratio}%</span>;
                }
              },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myTasks}
          />
        )}

        {activeTab === 'Issues' && (
          <DataTable
            columns={[
              { header: 'Issue ID', accessor: 'id' },
              { header: 'Title', accessor: 'title' },
              { header: 'Priority', accessor: 'priority' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myIssues}
          />
        )}

        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Category', accessor: 'category' }
            ]}
            data={myDocs}
          />
        )}

        {activeTab === 'Activity' && (
          <DataTable
            columns={[
              { header: 'Timestamp', accessor: 'timestamp' },
              { header: 'User', accessor: 'userName' },
              { header: 'Action', accessor: 'action' },
              { header: 'Description', accessor: 'description' }
            ]}
            data={(state.activity || []).filter(a => myProjectIds.includes(a.project))}
          />
        )}
      </div>
    </>
  );
}
