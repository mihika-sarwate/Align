import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TABS = ['Project Overview', 'Site Progress', 'Planned vs Actual', 'Weekly Performance', 'Delayed Activities'];

export default function PMProgressPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Project Overview');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const myTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId));

  return (
    <>
      <PageHeader title="Execution Progress" subtitle="Monitor planned vs actual quantities and task performance ratios." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Task Code', accessor: 'taskCode' },
            { header: 'Title', accessor: 'title' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => `${r.plannedQty} ${r.unit}` },
            { header: 'Actual Quantity', accessor: 'actualQty', cell: r => `${r.actualQty || 0} ${r.unit}` },
            { header: 'Performance Ratio', accessor: 'ratio', cell: r => {
              const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
              return <span style={{ fontWeight: 700, color: ratio >= 80 ? 'var(--color-green)' : 'var(--color-orange)' }}>{ratio}%</span>;
            }}
          ]}
          data={myTasks}
        />
      </div>
    </>
  );
}
