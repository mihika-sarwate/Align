import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import LBMSProductivityTable from '../../components/LBMSProductivityTable';

const TABS = [
  'Site Overview',
  'LBMS Productivity Control',
  'Planned vs Actual',
  'Weekly Performance',
  'Delayed Activities'
];

export default function PMProgressPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Site Overview');
  const [filterSite, setFilterSite] = useState('');

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const mySiteIds = mySites.map(s => s.id);

  const myTasks = (state.tasks || []).filter(t => myProjectIds.includes(t.projectId));
  const filteredTasks = filterSite ? myTasks.filter(t => t.siteId === filterSite) : myTasks;

  return (
    <>
      <PageHeader
        title="Execution Progress & Performance"
        subtitle="Monitor planned vs actual quantities, task performance ratios, and Location-Based Management System productivity."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {activeTab !== 'LBMS Productivity Control' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Site:</label>
            <ProjectSiteSelect
              value={filterSite}
              onChange={({ siteId }) => setFilterSite(siteId)}
              includeAllOption={true}
              allLabel="All Supervised Sites"
              filterProjectIds={myProjectIds}
            />
          </div>
        )}

        {activeTab === 'LBMS Productivity Control' ? (
          <LBMSProductivityTable defaultSiteId={mySiteIds[0] || 'SIT-201'} role="pm" />
        ) : (
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
                    <span style={{ fontWeight: 700, color: ratio >= 80 ? 'var(--color-green)' : 'var(--color-orange)' }}>
                      {ratio}%
                    </span>
                  );
                }
              },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={filteredTasks}
          />
        )}
      </div>
    </>
  );
}
