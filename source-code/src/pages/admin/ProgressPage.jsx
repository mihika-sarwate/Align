import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';

const TABS = [
  'Company Overview',
  'Project Progress',
  'Site Progress',
  'Task Performance',
  'Weekly Targets',
  'Delayed Work',
  'Daily Reports',
  'Progress Reports'
];

export default function ProgressPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Company Overview');

  const delayedTasks = state.tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date('2024-09-08'));

  return (
    <>
      <PageHeader
        title="Execution Progress & Performance"
        subtitle="Planned vs actual output tracking, weekly performance targets, and milestone completion trends."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Company Overview' && (
          <div>
            <div className="kpi-grid" style={{ marginBottom: '24px' }}>
              <KPICard title="Active Projects" value={state.projects.filter(p => p.status === 'Active').length} icon={<TrendingUp size={24} />} color="blue" />
              <KPICard title="Active Sites" value={state.sites.filter(s => s.status === 'Active').length} icon={<Target size={24} />} color="teal" />
              <KPICard title="Delayed Tasks" value={delayedTasks.length} icon={<Clock size={24} />} color="red" />
              <KPICard title="Completed Tasks" value={state.tasks.filter(t => t.status === 'Completed').length} icon={<CheckCircle size={24} />} color="green" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Project Completion Summary</h4>
            <DataTable
              columns={[
                { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
                { header: 'Project Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
                { header: 'Client', accessor: 'clientName' },
                { header: 'Progress', accessor: 'progress', cell: r => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
                      <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: r.progress + '%' }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
                  </div>
                )},
                { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
              ]}
              data={state.projects}
            />
          </div>
        )}

        {activeTab === 'Project Progress' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Project', accessor: 'name' },
              { header: 'Start Date', accessor: 'startDate' },
              { header: 'Target End', accessor: 'endDate' },
              { header: 'Completion', accessor: 'progress', cell: r => r.progress + '%' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.projects}
          />
        )}

        {activeTab === 'Site Progress' && (
          <DataTable
            columns={[
              { header: 'Site ID', accessor: 'id' },
              { header: 'Site Name', accessor: 'name' },
              { header: 'Project', accessor: 'projectName' },
              { header: 'Site Engineer', accessor: 'seName' },
              { header: 'Completion', accessor: 'progress', cell: r => r.progress + '%' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.sites}
          />
        )}

        {activeTab === 'Task Performance' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 700 }}>{r.taskCode}</span> },
              { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
              { header: 'Actual Quantity', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
              { header: 'Performance Ratio (actual / planned)', accessor: 'ratio', cell: r => {
                const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
                return (
                  <span style={{ fontWeight: 700, color: ratio >= 90 ? 'var(--color-green)' : ratio >= 70 ? 'var(--color-orange)' : 'var(--color-red)' }}>
                    {ratio}%
                  </span>
                );
              }},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks}
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
            data={state.weeklyTargets}
          />
        )}

        {activeTab === 'Delayed Work' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
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
              { header: 'Manpower Present', accessor: 'manpowerCount', cell: r => r.manpowerCount + ' laborers' },
              { header: 'Submitted By', accessor: 'submittedBy' }
            ]}
            data={state.dailyReports}
          />
        )}

        {activeTab === 'Progress Reports' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Consolidated project progress curves (S-Curves) and milestone completion forecasts.
          </div>
        )}
      </div>
    </>
  );
}