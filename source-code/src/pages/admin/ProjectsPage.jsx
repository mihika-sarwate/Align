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
  'Materials & Purchases',
  'Issues',
  'Documents',
  'Activity'
];

export const PROJECT_LOCATIONS = [
  'Mumbai South',
  'Pune Hinjewadi',
  'Delhi NCR',
  'Bangalore East',
  'Hyderabad Gachibowli',
  'Chennai OMR',
  'Ahmedabad SG Highway',
  'Kolkata New Town'
];

export default function ProjectsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  const [projectForm, setProjectForm] = useState({
    name: '',
    clientName: 'Apex Corp',
    pm: 'EMP-002',
    location: PROJECT_LOCATIONS[0],
    description: '',
    startDate: '2024-09-01',
    endDate: '2026-03-31',
    budget: 500000000
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      clientName: 'Apex Corp',
      pm: 'EMP-002',
      location: PROJECT_LOCATIONS[0],
      description: '',
      startDate: '2024-09-01',
      endDate: '2026-03-31',
      budget: 500000000
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setProjectForm({
      name: p.name,
      clientName: p.clientName || 'Apex Corp',
      pm: p.pm || 'EMP-002',
      location: p.location || PROJECT_LOCATIONS[0],
      description: p.description || '',
      startDate: p.startDate,
      endDate: p.endDate,
      budget: p.budget
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pmObj = state.employees?.find(emp => emp.id === projectForm.pm);

    if (editingProject) {
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: {
          id: editingProject.id,
          ...projectForm,
          pmName: pmObj?.name || 'Rahul Mehta',
          budget: Number(projectForm.budget)
        }
      });
      alert(`Project ${editingProject.id} updated with location ${projectForm.location}.`);
    } else {
      const id = 'PRJ-' + (100 + (state.projects?.length || 0) + 1);
      dispatch({
        type: 'CREATE_PROJECT',
        payload: {
          ...projectForm,
          id,
          pmName: pmObj?.name || 'Rahul Mehta',
          budget: Number(projectForm.budget),
          progress: 0,
          status: 'Active'
        }
      });
      alert(`Project ${id} (${projectForm.name}) created in ${projectForm.location}.`);
    }
    setShowModal(false);
  };

  const filtered = (state.projects || []).filter(p => {
    const matchLocation = !locationFilter || p.location === locationFilter;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.pmName || '').toLowerCase().includes(search.toLowerCase());
    return matchLocation && matchSearch;
  });

  const columns = [
    {
      header: 'Project ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span>
    },
    {
      header: 'Project Name',
      accessor: 'name',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Client: {r.clientName}
          </span>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      cell: r => <span className="badge blue" style={{ fontSize: '0.8rem' }}>{r.location || 'Mumbai South'}</span>
    },
    {
      header: 'Project Manager',
      accessor: 'pmName'
    },
    {
      header: 'Associated Sites',
      accessor: 'sites',
      cell: r => {
        const sites = state.sites?.filter(s => s.projectId === r.id) || [];
        return (
          <span style={{ fontSize: '0.8rem' }}>
            <strong>{sites.length}</strong> site{sites.length === 1 ? '' : 's'}
          </span>
        );
      }
    },
    {
      header: 'Timeline',
      accessor: 'startDate',
      cell: r => `${r.startDate} to ${r.endDate}`
    },
    {
      header: 'Progress',
      accessor: 'progress',
      cell: r => {
        // Derive from actual tasks (Section 3.3, 7.1)
        const prjTasks = state.tasks?.filter(t => t.projectId === r.id) || [];
        const completed = prjTasks.filter(t => t.status === 'Completed').length;
        const pct = prjTasks.length > 0 ? Math.round((completed / prjTasks.length) * 100) : (r.progress || 0);

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, minWidth: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
              <div style={{ height: '100%', background: 'var(--color-blue)', borderRadius: '3px', width: `${pct}%` }}></div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{pct}%</span>
          </div>
        );
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  return (
    <>
      <PageHeader
        title="Projects & Development Portfolios"
        subtitle="Master oversight across real estate developments, project locations, phases, and construction progress."
        actionLabel="Create Project"
        onAction={handleOpenCreate}
      />

      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {/* Search & Location Filter Bar (Section 2.5) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Location:</label>
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
            >
              <option value="">All Locations</option>
              {PROJECT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <SearchFilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search projects by name, location, PM..."
          />
        </div>

        {activeTab === 'Overview' && (
          <DataTable
            columns={columns}
            data={filtered}
            actions={row => (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                  onClick={() => handleOpenEdit(row)}
                >
                  Edit Location
                </button>
              </div>
            )}
          />
        )}

        {activeTab === 'Sites' && (
          <DataTable
            columns={[
              { header: 'Site ID', accessor: 'id' },
              { header: 'Site Name', accessor: 'name' },
              { header: 'Project', accessor: 'projectName' },
              { header: 'Location / Zone', accessor: 'location' },
              { header: 'Engineer', accessor: 'seName' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.sites || []}
          />
        )}

        {activeTab === 'Tasks' && (
          <DataTable
            columns={[
              { header: 'Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Category', accessor: 'category', cell: r => <span className="badge blue">{r.category || 'Civil'}</span> },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Due Date', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks || []}
          />
        )}

        {activeTab === 'Progress' && (
          <DataTable
            columns={columns}
            data={filtered}
          />
        )}

        {activeTab === 'Materials & Purchases' && (
          <DataTable
            columns={[
              { header: 'PO ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Material / Item', accessor: 'materialName' },
              { header: 'Expected Delivery', accessor: 'expectedDelivery' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders || []}
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
            data={state.issues || []}
          />
        )}

        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Category', accessor: 'category' }
            ]}
            data={(state.documents || []).filter(d => Boolean(d.projectId))}
          />
        )}

        {activeTab === 'Activity' && (
          <DataTable
            columns={[
              { header: 'Timestamp', accessor: 'timestamp', cell: r => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{r.timestamp}</span> },
              { header: 'User', accessor: 'userName', cell: r => <span style={{ fontWeight: 600 }}>{r.userName}</span> },
              { header: 'Action', accessor: 'action', cell: r => <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{r.action}</span> },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Details', accessor: 'description' }
            ]}
            data={state.activity || []}
          />
        )}
      </div>

      {/* Modal for Project Creation / Location Edit */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProject ? `Edit Project — ${editingProject.name}` : 'Create New Development Project'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project Name</label>
            <input
              required
              type="text"
              value={projectForm.name}
              onChange={e => setProjectForm({ ...projectForm, name: e.target.value })}
              placeholder="e.g. Skyline Residency"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client Entity</label>
              <input
                required
                type="text"
                value={projectForm.clientName}
                onChange={e => setProjectForm({ ...projectForm, clientName: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project Location (Mandatory Dropdown)</label>
              <select
                value={projectForm.location}
                onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {PROJECT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assigned Project Manager</label>
              <select
                value={projectForm.pm}
                onChange={e => setProjectForm({ ...projectForm, pm: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.employees?.filter(e => e.role === 'Project Manager').map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Sanctioned Budget (₹)</label>
              <input
                required
                type="number"
                min="1000000"
                value={projectForm.budget}
                onChange={e => setProjectForm({ ...projectForm, budget: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Start Date</label>
              <input
                type="date"
                value={projectForm.startDate}
                onChange={e => setProjectForm({ ...projectForm, startDate: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Completion</label>
              <input
                type="date"
                value={projectForm.endDate}
                onChange={e => setProjectForm({ ...projectForm, endDate: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingProject ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
