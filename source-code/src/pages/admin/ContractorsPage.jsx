import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'All Contractors',
  'Active Assignments',
  'Trade Wise',
  'Performance Ratings'
];

export default function ContractorsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Contractors');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContractor, setEditingContractor] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: 'Civil Contractor',
    siteAllotted: 'SIT-201',
    phone: '',
    email: '',
    trade: 'Civil & Masonry',
    status: 'Active'
  });

  const contractors = state.contractors || [];

  const handleOpenAdd = () => {
    setEditingContractor(null);
    setFormData({
      name: '',
      designation: 'Civil Contractor',
      siteAllotted: state.sites[0]?.id || 'SIT-201',
      phone: '',
      email: '',
      trade: 'Civil & Masonry',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (c) => {
    setEditingContractor(c);
    setFormData({
      name: c.name || '',
      designation: c.designation || 'Civil Contractor',
      siteAllotted: c.siteAllotted || c.siteId || 'SIT-201',
      phone: c.phone || '',
      email: c.email || '',
      trade: c.trade || 'Civil & Masonry',
      status: c.status || 'Active'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContractor) {
      dispatch({
        type: 'UPDATE_CONTRACTOR',
        payload: {
          id: editingContractor.id,
          ...formData
        }
      });
      alert(`Contractor ${formData.name} updated.`);
    } else {
      const id = 'CON-' + String(contractors.length + 1).padStart(3, '0');
      dispatch({
        type: 'CREATE_CONTRACTOR',
        payload: {
          id,
          ...formData
        }
      });
      alert(`Contractor ${formData.name} (${id}) registered.`);
    }
    setShowModal(false);
  };

  const filtered = contractors.filter(c => {
    const siteObj = state.sites.find(s => s.id === c.siteAllotted || s.id === c.siteId);
    const siteName = siteObj ? `${siteObj.name} (${siteObj.id})` : (c.siteAllotted || '');
    const matchSearch = !search ||
      (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.designation || '').toLowerCase().includes(search.toLowerCase()) ||
      siteName.toLowerCase().includes(search.toLowerCase()) ||
      (c.trade || '').toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'Active Assignments') return matchSearch && c.status === 'Active';
    if (activeTab === 'Trade Wise') return matchSearch;
    if (activeTab === 'Performance Ratings') return matchSearch;
    return matchSearch;
  });

  const columns = [
    {
      header: 'Contractor Name',
      accessor: 'name',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{r.name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.id} • {r.trade || 'General'}</span>
        </div>
      )
    },
    {
      header: 'Designation',
      accessor: 'designation',
      cell: r => <span style={{ fontWeight: 500 }}>{r.designation}</span>
    },
    {
      header: 'Site Allotted',
      accessor: 'siteAllotted',
      cell: r => {
        const siteObj = state.sites.find(s => s.id === r.siteAllotted || s.id === r.siteId);
        const prjObj = siteObj ? state.projects.find(p => p.id === siteObj.projectId) : null;
        return (
          <div>
            <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{siteObj ? siteObj.name : (r.siteAllotted || 'Unassigned')}</span>
            {siteObj && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{siteObj.id} • {prjObj?.name || siteObj.projectName}</span>}
          </div>
        );
      }
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: r => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {r.phone || 'N/A'}<br />{r.email || ''}
        </span>
      )
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
        title="Contractor Directory & Management"
        subtitle="Manage licensed civil and trade contractors, designations, and on-site project allocations."
        actionLabel="Add Contractor"
        onAction={handleOpenAdd}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search contractors by name, designation, site..."
        />

        <DataTable
          columns={columns}
          data={filtered}
          actions={row => (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                onClick={() => handleOpenEdit(row)}
              >
                Edit
              </button>
            </div>
          )}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingContractor ? `Edit Contractor — ${editingContractor.name}` : 'Register New Contractor'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Contractor Name / Firm</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Civil Works"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Designation</label>
              <input
                required
                type="text"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Civil Contractor"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Trade / Specialization</label>
              <select
                value={formData.trade}
                onChange={e => setFormData({ ...formData, trade: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="Civil & Masonry">Civil & Masonry</option>
                <option value="Electrical Works">Electrical Works</option>
                <option value="Plumbing & Sanitation">Plumbing & Sanitation</option>
                <option value="Finishing & Tiling">Finishing & Tiling</option>
                <option value="HVAC & Ducting">HVAC & Ducting</option>
                <option value="Waterproofing">Waterproofing</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site Allotted</label>
              <select
                value={formData.siteAllotted}
                onChange={e => setFormData({ ...formData, siteAllotted: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.sites.map(s => {
                  const p = state.projects.find(prj => prj.id === s.projectId);
                  return (
                    <option key={s.id} value={s.id}>
                      {p ? `${p.name} — ${s.name}` : s.name} ({s.id})
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9876543219"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. ramesh@align.in"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingContractor ? 'Save Changes' : 'Register Contractor'}</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
