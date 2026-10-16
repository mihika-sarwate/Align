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
  'Sites',
  'Tasks',
  'Project Phases',
  'Progress',
  'Budget & Expenses',
  'Materials & Purchases',
  'Issues',
  'Documents',
  'Activity'
];

export default function ProjectsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    clientName: 'Apex Corp',
    pm: 'EMP-002',
    description: '',
    startDate: '2024-09-01',
    endDate: '2026-03-31',
    budget: 500000000
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'PRJ-' + (100 + state.projects.length + 1);
    const pmObj = state.employees.find(emp => emp.id === newProject.pm);
    dispatch({
      type: 'CREATE_PROJECT',
      payload: {
        ...newProject,
        id,
        pmName: pmObj?.name || 'Rahul Mehta',
        budget: Number(newProject.budget),
        progress: 0,
        status: 'Active'
      }
    });
    setShowModal(false);
    alert('Project ' + id + ' (' + newProject.name + ') initialized.');
  };

  const filtered = state.projects.filter(p => {
    return !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.pmName || '').toLowerCase().includes(search.toLowerCase());
  });

  const columns = [
    { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Project Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Project Manager', accessor: 'pmName' },
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

  return (
    <>
      <PageHeader
        title="Projects & Development Portfolios"
        subtitle="Master oversight across real estate developments, project budgets, phases, and construction timelines."
        actionLabel="Create Project"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search projects by name, client, PM..." />

        {activeTab === 'Overview' && <DataTable columns={columns} data={filtered} />}

        {activeTab === 'Sites' && (
          <DataTable
            columns={[
              { header: 'Site ID', accessor: 'id' },
              { header: 'Site Name', accessor: 'name' },
              { header: 'Project', accessor: 'projectName' },
              { header: 'Engineer', accessor: 'seName' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.sites}
          />
        )}

        {activeTab === 'Tasks' && (
          <DataTable
            columns={[
              { header: 'Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Due Date', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks}
          />
        )}

        {activeTab === 'Project Phases' && (
          <DataTable
            columns={[
              { header: 'Order', accessor: 'order' },
              { header: 'Phase Code', accessor: 'code', cell: r => <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>{r.code}</span> },
              { header: 'Phase Description', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Target Project', accessor: 'projectId' }
            ]}
            data={state.phases}
          />
        )}

        {activeTab === 'Budget & Expenses' && (
          <DataTable
            columns={[
              { header: 'Project ID', accessor: 'id' },
              { header: 'Project Name', accessor: 'name' },
              { header: 'Total Sanctioned Budget', accessor: 'budget', cell: r => '₹' + (r.budget / 10000000).toFixed(2) + ' Cr' },
              { header: 'Disbursed Invoices', accessor: 'disbursed', cell: r => {
                const total = state.invoices.filter(i => i.projectId === r.id).reduce((a, b) => a + (b.totalAmount || 0), 0);
                return '₹' + (total / 10000000).toFixed(2) + ' Cr';
              }}
            ]}
            data={state.projects}
          />
        )}

        {activeTab === 'Issues' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Title', accessor: 'title' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Priority', accessor: 'priority' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.issues}
          />
        )}

        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Category', accessor: 'category' }
            ]}
            data={state.documents.filter(d => Boolean(d.projectId))}
          />
        )}

        {activeTab === 'Progress' && (
          <DataTable
            columns={[
              { header: 'Project ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Project Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Project Manager', accessor: 'pmName' },
              { header: 'Timeline', accessor: 'startDate', cell: r => `${r.startDate} to ${r.endDate}` },
              { header: 'Overall Progress', accessor: 'progress', cell: r => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: `${r.progress}%` }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
                </div>
              )},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={filtered}
          />
        )}

        {activeTab === 'Materials & Purchases' && (
          <DataTable
            columns={[
              { header: 'PO Number', accessor: 'poNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.poNumber}</span> },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Items Ordered', accessor: 'items', cell: r => r.items?.map(i => `${i.materialName} (${i.qty} ${i.unit})`).join(', ') || 'N/A' },
              { header: 'Total Value', accessor: 'totalAmount', cell: r => `₹${(r.totalAmount || 0).toLocaleString('en-IN')}` },
              { header: 'Expected Delivery', accessor: 'expectedDelivery' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders}
          />
        )}

        {activeTab === 'Activity' && (
          <DataTable
            columns={[
              { header: 'Timestamp', accessor: 'timestamp', cell: r => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{r.timestamp}</span> },
              { header: 'User', accessor: 'userName', cell: r => <span style={{ fontWeight: 600 }}>{r.userName}</span> },
              { header: 'Role', accessor: 'userRole' },
              { header: 'Action', accessor: 'action', cell: r => <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{r.action}</span> },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Details', accessor: 'description' }
            ]}
            data={state.activity}
          />
        )}

      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Development Project">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project Name</label>
            <input required type="text" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} placeholder="e.g. Skyline Residency" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client Entity</label>
              <input required type="text" value={newProject.clientName} onChange={e => setNewProject({ ...newProject, clientName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assigned Project Manager</label>
              <select value={newProject.pm} onChange={e => setNewProject({ ...newProject, pm: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.employees.filter(e => e.role === 'Project Manager').map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Sanctioned Budget (₹)</label>
            <input required type="number" min="1000000" value={newProject.budget} onChange={e => setNewProject({ ...newProject, budget: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Start Date</label>
              <input type="date" value={newProject.startDate} onChange={e => setNewProject({ ...newProject, startDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Completion</label>
              <input type="date" value={newProject.endDate} onChange={e => setNewProject({ ...newProject, endDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Project</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
