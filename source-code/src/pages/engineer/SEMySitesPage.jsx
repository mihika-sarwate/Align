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
        {activeTab === 'Tasks' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.taskCode}</span> },
              { header: 'Title', accessor: 'title' },
              { header: 'Planned Qty', accessor: 'plannedQty', cell: r => `${r.plannedQty} ${r.unit}` },
              { header: 'Actual Qty', accessor: 'actualQty', cell: r => `${r.actualQty || 0} ${r.unit}` },
              { header: 'Target End', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myTasks}
          />
        )}
        {activeTab === 'Materials' && (
          <DataTable
            columns={[
              { header: 'Material Code', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Name', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Unit', accessor: 'unit' },
              { header: 'Standard Rate', accessor: 'standardRate', cell: r => `₹${r.standardRate || 0}` }
            ]}
            data={state.materials}
          />
        )}
        {activeTab === 'Inventory' && (
          <DataTable
            columns={[
              { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Usage Phase', accessor: 'usage' },
              { header: 'Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
              { header: 'Present on Site', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
              { header: 'Stock Status', accessor: 'surplus', cell: r => {
                const ratio = Math.round((r.qtyPresent / (r.qtyRequired || 1)) * 100);
                return (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: ratio >= 100 ? 'var(--color-green-light)' : ratio >= 71 ? 'var(--color-orange-light)' : 'var(--color-red-light)',
                    color: ratio >= 100 ? '#166534' : ratio >= 71 ? '#9a3412' : '#991b1b'
                  }}>
                    {ratio}%
                  </span>
                );
              }}
            ]}
            data={state.inventory.filter(i => i.siteId === mySite.id)}
          />
        )}
        {activeTab === 'Equipment' && (
          <DataTable
            columns={[
              { header: 'Equipment ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Name', accessor: 'name' },
              { header: 'Operational Condition', accessor: 'condition' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.equipmentInventory.filter(e => e.siteId === mySite.id)}
          />
        )}
        {activeTab === 'Receipts' && (
          <DataTable
            columns={[
              { header: 'GRN Number', accessor: 'receiptNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.receiptNumber}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Accepted Qty', accessor: 'acceptedQty', cell: r => `${r.acceptedQty} ${r.unit}` },
              { header: 'Rejected Qty', accessor: 'rejectedQty', cell: r => `${r.rejectedQty} ${r.unit}` },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.receipts.filter(rc => rc.siteId === mySite.id)}
          />
        )}
        {activeTab === 'Progress' && (
          <DataTable
            columns={[
              { header: 'Site Task', accessor: 'title' },
              { header: 'Phase', accessor: 'phase' },
              { header: 'Completion Ratio', accessor: 'actualQty', cell: r => {
                const pct = Math.min(100, Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100));
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
                      <div style={{ height: '100%', background: 'var(--color-teal)', borderRadius: '3px', width: `${pct}%` }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{pct}%</span>
                  </div>
                );
              }},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myTasks}
          />
        )}
        {activeTab === 'Daily Reports' && (
          <DataTable
            columns={[
              { header: 'DPR #', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Date', accessor: 'date' },
              { header: 'Work Log', accessor: 'workPerformed' },
              { header: 'Workers Present', accessor: 'manpowerCount' }
            ]}
            data={state.dailyReports.filter(d => d.siteId === mySite.id)}
          />
        )}
        {activeTab === 'Issues' && (
          <DataTable
            columns={[
              { header: 'Issue ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Title', accessor: 'title' },
              { header: 'Priority', accessor: 'priority' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.issues.filter(i => i.siteId === mySite.id)}
          />
        )}
        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Date', accessor: 'uploadDate' }
            ]}
            data={state.documents.filter(d => d.siteId === mySite.id)}
          />
        )}
        {activeTab === 'History' && (
          <DataTable
            columns={[
              { header: 'Timestamp', accessor: 'timestamp', cell: r => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{r.timestamp}</span> },
              { header: 'User', accessor: 'userName' },
              { header: 'Action', accessor: 'action', cell: r => <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{r.action}</span> },
              { header: 'Details', accessor: 'description' }
            ]}
            data={state.activity.filter(a => a.siteId === mySite.id)}
          />
        )}
      </div>
    </>
  );
}
