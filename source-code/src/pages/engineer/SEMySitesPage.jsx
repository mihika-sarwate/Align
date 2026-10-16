import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Overview', 'Tasks', 'Materials', 'Inventory', 'Equipment', 'Receipts', 'Progress', 'Daily Reports', 'Issues', 'Documents', 'History'];

export default function SEMySitesPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');

  const mySite = state.sites.find(s => s.id === 'SIT-201') || state.sites[0];
  const myTasks = state.tasks.filter(t => t.siteId === mySite.id);

  return (
    <>
      <PageHeader title={mySite.name + ' (' + mySite.id + ')'} subtitle={'Location: ' + mySite.location + ' • Project: ' + mySite.projectName} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>TODAY</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Piling Rig Active</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cement deliveries expected: 200 bags</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>UPCOMING</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Reinforcement Check</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Slump testing scheduled 14:00</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>HISTORY</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Site Excavation 100%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PCC poured and cured</div>
              </div>
            </div>
            <DataTable
              columns={[
                { header: 'Task Code', accessor: 'taskCode' },
                { header: 'Title', accessor: 'title' },
                { header: 'Progress', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' / ' + r.plannedQty + ' ' + r.unit },
                { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
              ]}
              data={myTasks}
            />
          </div>
        )}
        {activeTab !== 'Overview' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Showing {activeTab} for site {mySite.name}.
          </div>
        )}
      </div>
    </>
  );
}
