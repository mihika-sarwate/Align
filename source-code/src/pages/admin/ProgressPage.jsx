import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import LBMSProductivityTable from '../../components/LBMSProductivityTable';
import KPICard from '../../components/KPICard';
import { TrendingUp, Target, Clock, CheckCircle, BarChart2 } from 'lucide-react';

const TABS = [
  'Company Overview',
  'LBMS Productivity Control',
  'Project Progress',
  'Site Progress',
  'Task Performance',
  'Weekly Targets',
  'Delayed Work',
  'Daily Reports'
];

export default function ProgressPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Company Overview');
  const [filterSite, setFilterSite] = useState('');

  const delayedTasks = (state.tasks || []).filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date());

  return (
    <>
      <PageHeader
        title="Execution Progress & LBMS Productivity"
        subtitle="Planned vs actual output tracking, Location-Based Management System (LBMS) productivity controls, and milestone completion."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Company Overview' && (
          <div>
            <div className="kpi-grid" style={{ marginBottom: '24px' }}>
              <KPICard title="Active Projects" value={state.projects?.filter(p => p.status === 'Active')?.length || 0} icon={<TrendingUp size={24} />} color="blue" />
              <KPICard title="Active Sites" value={state.sites?.filter(s => s.status === 'Active')?.length || 0} icon={<Target size={24} />} color="teal" />
              <KPICard title="Delayed Tasks" value={delayedTasks.length} icon={<Clock size={24} />} color="red" />
              <KPICard title="Completed Tasks" value={state.tasks?.filter(t => t.status === 'Completed')?.length || 0} icon={<CheckCircle size={24} />} color="green" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Project Completion Derived from Task Workflows</h4>
              <button className="btn btn-sm btn-primary" onClick={() => setActiveTab('LBMS Productivity Control')}>
                <BarChart2 size={14} style={{ marginRight: '4px' }} /> View LBMS Table
              </button>
            </div>

            <DataTable
              columns={[
                {
                  header: 'Project ID',
                  accessor: 'id',
                  cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span>
                },
                {
                  header: 'Project Name',
                  accessor: 'name',
                  cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span>
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
                    const pTasks = state.tasks?.filter(t => t.projectId === r.id) || [];
                    const done = pTasks.filter(t => t.status === 'Completed').length;
                    return <span>{done} / {pTasks.length} tasks completed</span>;
                  }
                },
                {
                  header: 'Progress',
                  accessor: 'progress',
                  cell: r => {
                    const pTasks = state.tasks?.filter(t => t.projectId === r.id) || [];
                    const done = pTasks.filter(t => t.status === 'Completed').length;
                    const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : (r.progress || 0);
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
                          <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: pct + '%' }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{pct}%</span>
                      </div>
                    );
                  }
                },
                { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
              ]}
              data={state.projects || []}
            />
          </div>
        )}

        {/* Dedicated LBMS Tab (Part 8) */}
        {activeTab === 'LBMS Productivity Control' && (
          <LBMSProductivityTable role="admin" />
        )}

        {activeTab === 'Project Progress' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Project', accessor: 'name' },
              { header: 'Location', accessor: 'location' },
              { header: 'Start Date', accessor: 'startDate' },
              { header: 'Target End', accessor: 'endDate' },
              {
                header: 'Completion',
                accessor: 'progress',
                cell: r => {
                  const pTasks = state.tasks?.filter(t => t.projectId === r.id) || [];
                  const done = pTasks.filter(t => t.status === 'Completed').length;
                  const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : (r.progress || 0);
                  return <strong>{pct}%</strong>;
                }
              },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.projects || []}
          />
        )}

        {activeTab === 'Site Progress' && (
          <DataTable
            columns={[
              { header: 'Site ID', accessor: 'id' },
              { header: 'Site Name', accessor: 'name' },
              { header: 'Project', accessor: 'projectName' },
              { header: 'Location', accessor: 'location' },
              { header: 'Site Engineer', accessor: 'seName' },
              {
                header: 'Completion',
                accessor: 'progress',
                cell: r => {
                  const sTasks = state.tasks?.filter(t => t.siteId === r.id) || [];
                  const done = sTasks.filter(t => t.status === 'Completed').length;
                  const pct = sTasks.length > 0 ? Math.round((done / sTasks.length) * 100) : (r.progress || 0);
                  return <strong>{pct}%</strong>;
                }
              },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.sites || []}
          />
        )}

        {activeTab === 'Task Performance' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 700 }}>{r.taskCode}</span> },
              { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
              { header: 'Category', accessor: 'category', cell: r => <span className="badge blue">{r.category || 'Civil'}</span> },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => `${r.plannedQty} ${r.unit}` },
              { header: 'Actual Quantity', accessor: 'actualQty', cell: r => `${r.actualQty || 0} ${r.unit}` },
              {
                header: 'Performance Ratio',
                accessor: 'ratio',
                cell: r => {
                  const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
                  return (
                    <span style={{ fontWeight: 700, color: ratio >= 90 ? 'var(--color-green)' : ratio >= 70 ? 'var(--color-orange)' : 'var(--color-red)' }}>
                      {ratio}%
                    </span>
                  );
                }
              },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks || []}
          />
        )}

        {activeTab === 'Weekly Targets' && (
          <DataTable
            columns={[
              { header: 'Week', accessor: 'week', cell: r => <span style={{ fontWeight: 600 }}>{r.week}</span> },
              { header: 'Project ID', accessor: 'projectId' },
              { header: 'Milestone / Target Description', accessor: 'targetDescription' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.weeklyTargets || []}
          />
        )}

        {activeTab === 'Delayed Work' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Category', accessor: 'category' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Assigned To', accessor: 'assignedToName' },
              { header: 'Due Date', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={delayedTasks}
          />
        )}

        {activeTab === 'Daily Reports' && (
          <DataTable
            columns={[
              { header: 'DPR #', accessor: 'id' },
              { header: 'Date', accessor: 'date' },
              { header: 'Site ID', accessor: 'siteId' },
              { header: 'Work Executed', accessor: 'workPerformed' },
              { header: 'Manpower Present', accessor: 'manpowerCount', cell: r => `${r.manpowerCount} laborers` },
              { header: 'Submitted By', accessor: 'submittedBy' }
            ]}
            data={state.dailyReports || []}
          />
        )}
      </div>
    </>
  );
}
