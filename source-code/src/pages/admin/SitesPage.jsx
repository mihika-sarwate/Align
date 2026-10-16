import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'Overview',
  'Tasks',
  'Materials',
  'Material Requests',
  'Inventory',
  'Equipment',
  'Purchases',
  'Expenses',
  'Progress',
  'Daily Reports',
  'Issues',
  'Documents',
  'Activity'
];

export default function SitesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newSite, setNewSite] = useState({
    name: '',
    projectId: 'PRJ-101',
    location: '',
    se: 'EMP-004',
    pm: 'EMP-002',
    startDate: '2024-09-01',
    endDate: '2025-06-30'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'SIT-' + (200 + state.sites.length + 1);
    const seObj = state.employees.find(emp => emp.id === newSite.se);
    const pmObj = state.employees.find(emp => emp.id === newSite.pm);
    const prjObj = state.projects.find(p => p.id === newSite.projectId);
    dispatch({
      type: 'CREATE_SITE',
      payload: {
        ...newSite,
        id,
        seName: seObj?.name || 'Rajesh K',
        pmName: pmObj?.name || 'Rahul Mehta',
        projectName: prjObj?.name || 'Alpha Residential Tower',
        progress: 0,
        status: 'Active'
      }
    });
    setShowModal(false);
    alert('Site ' + id + ' (' + newSite.name + ') created.');
  };

  const filtered = state.sites.filter(s => {
    return !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.projectName.toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { header: 'Site ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Site Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Project', accessor: 'projectName' },
    { header: 'Location', accessor: 'location' },
    { header: 'Site Engineer', accessor: 'seName' },
    { header: 'Project Manager', accessor: 'pmName' },
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

  return (
    <>
      <PageHeader
        title="Construction Sites"
        subtitle="Manage execution zones, assigned field engineers, daily progress logs, and equipment deployment."
        actionLabel="Create Site"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search sites by name, project, location..." />

        {activeTab === 'Overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>TODAY</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>12 Active Tasks</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>4 Inbound Deliveries Scheduled</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>UPCOMING</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Podium Concrete Pour</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Structural audit on Thursday</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>HISTORY</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>34 Tasks Completed</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Excavation phase verified</div>
              </div>
            </div>
            <DataTable columns={columns} data={filtered} />
          </div>
        )}

        {activeTab === 'Tasks' && (
          <DataTable
            columns={[
              { header: 'Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Assigned To', accessor: 'assignedToName' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks}
          />
        )}

        {activeTab === 'Daily Reports' && (
          <DataTable
            columns={[
              { header: 'DPR #', accessor: 'id' },
              { header: 'Date', accessor: 'date' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Work Performed', accessor: 'workPerformed' },
              { header: 'Manpower', accessor: 'manpowerCount' }
            ]}
            data={state.dailyReports}
          />
        )}

        {activeTab === 'Issues' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Title', accessor: 'title' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Priority', accessor: 'priority' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.issues}
          />
        )}

        {activeTab === 'Materials' && (
          <DataTable
            columns={[
              { header: 'Material Code', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material Name', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Unit', accessor: 'unit' },
              { header: 'Standard Rate', accessor: 'standardRate', cell: r => `₹${r.standardRate || 0}` }
            ]}
            data={state.materials}
          />
        )}

        {activeTab === 'Material Requests' && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Quantity', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
              { header: 'Required By', accessor: 'requiredDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.materialRequests}
          />
        )}

        {activeTab === 'Inventory' && (
          <DataTable
            columns={[
              { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Usage Phase', accessor: 'usage' },
              { header: 'Required Qty', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
              { header: 'Present Qty', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
              { header: 'Stock Health', accessor: 'surplus', cell: r => {
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
            data={state.inventory}
          />
        )}

        {activeTab === 'Equipment' && (
          <DataTable
            columns={[
              { header: 'Equipment ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Equipment Name', accessor: 'name' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Operational Condition', accessor: 'condition' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.equipmentInventory}
          />
        )}

        {activeTab === 'Purchases' && (
          <DataTable
            columns={[
              { header: 'PO Number', accessor: 'poNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.poNumber}</span> },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Amount', accessor: 'totalAmount', cell: r => `₹${(r.totalAmount || 0).toLocaleString('en-IN')}` },
              { header: 'Delivery Due', accessor: 'expectedDelivery' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders}
          />
        )}

        {activeTab === 'Expenses' && (
          <DataTable
            columns={[
              { header: 'Expense ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Date', accessor: 'date' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Category', accessor: 'category' },
              { header: 'Description', accessor: 'description' },
              { header: 'Amount', accessor: 'amount', cell: r => `₹${(r.amount || 0).toLocaleString('en-IN')}` },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.expenses}
          />
        )}

        {activeTab === 'Progress' && (
          <DataTable
            columns={[
              { header: 'Site ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Site Name', accessor: 'name' },
              { header: 'Project', accessor: 'projectName' },
              { header: 'Progress', accessor: 'progress', cell: r => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: 'var(--color-teal)', borderRadius: '3px', width: `${r.progress}%` }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
                </div>
              )},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={filtered}
          />
        )}

        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Category', accessor: 'category' },
              { header: 'Uploaded', accessor: 'uploadDate' }
            ]}
            data={state.documents.filter(d => Boolean(d.siteId))}
          />
        )}

        {activeTab === 'Activity' && (
          <DataTable
            columns={[
              { header: 'Timestamp', accessor: 'timestamp', cell: r => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{r.timestamp}</span> },
              { header: 'User', accessor: 'userName', cell: r => <span style={{ fontWeight: 600 }}>{r.userName}</span> },
              { header: 'Action', accessor: 'action', cell: r => <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{r.action}</span> },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Details', accessor: 'description' }
            ]}
            data={state.activity.filter(a => Boolean(a.siteId))}
          />
        )}

      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Construction Site">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site Name</label>
            <input required type="text" value={newSite.name} onChange={e => setNewSite({ ...newSite, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project</label>
            <select value={newSite.projectId} onChange={e => setNewSite({ ...newSite, projectId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.projects.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Location / Zone</label>
            <input required type="text" value={newSite.location} onChange={e => setNewSite({ ...newSite, location: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site Engineer</label>
              <select value={newSite.se} onChange={e => setNewSite({ ...newSite, se: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.employees.filter(e => e.role === 'Site Engineer').map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project Manager</label>
              <select value={newSite.pm} onChange={e => setNewSite({ ...newSite, pm: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.employees.filter(e => e.role === 'Project Manager').map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Site</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
