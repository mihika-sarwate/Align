import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TABS = ["Today's Progress", 'Weekly Progress', 'Task Performance', 'History'];

export default function SEProgressPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("Today's Progress");
  const myTasks = state.tasks.filter(t => t.siteId === 'SIT-201');

  return (
    <>
      <PageHeader title="Daily Site Progress" subtitle="Monitor physical completion metrics for Tower A Foundation." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Task Code', accessor: 'taskCode' },
            { header: 'Title', accessor: 'title' },
            { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
            { header: 'Actual Quantity', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
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
