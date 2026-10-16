import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = ['Overview', 'Tasks', 'Materials', 'Material Requests', 'Inventory', 'Equipment', 'Daily Reports', 'Issues', 'Documents', 'Activity'];

export default function PMSitesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newSite, setNewSite] = useState({ name: '', projectId: 'PRJ-101', location: '', se: 'EMP-004', startDate: '', endDate: '' });

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const mySites = state.sites.filter(s => myProjectIds.includes(s.projectId));

  const handleCreateSite = (e) => {
    e.preventDefault();
    const id = 'SIT-' + (200 + state.sites.length + 1);
    const seObj = state.employees.find(emp => emp.id === newSite.se);
    const prjObj = state.projects.find(p => p.id === newSite.projectId);
    dispatch({
      type: 'CREATE_SITE',
      payload: {
        ...newSite,
        id,
        seName: seObj?.name || 'Rajesh K',
        projectName: prjObj?.name || 'Alpha Residential Tower',
        pm: 'EMP-002',
        pmName: 'Rahul Mehta',
        progress: 0,
        status: 'Active'
      }
    });
    setShowModal(false);
  };

  const columns = [
    { header: 'Site ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Site Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { header: 'Project', accessor: 'projectName' },
    { header: 'Location', accessor: 'location' },
    { header: 'Site Engineer', accessor: 'seName' },
    { header: 'Timeline', accessor: 'startDate', cell: r => r.startDate + ' to ' + r.endDate },
    { header: 'Progress', accessor: 'progress', cell: r => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
          <div style={{ height: '100%', background: 'var(--color-teal)', borderRadius: '3px', width: r.progress + '%' }}></div>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.progress}%</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader title="Site Supervision" subtitle="Monitor active construction sites, on-site personnel, and daily progress." actionLabel="Create Site" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search site or location..." />
        {activeTab === 'Overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>TODAY</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>4 Tasks Active</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>2 Material Deliveries Scheduled</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>UPCOMING</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Concrete Pour (SIT-201)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>QA Inspection on Friday</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>HISTORY</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>18 Tasks Completed</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Foundation Phase Verified</div>
              </div>
            </div>
            <DataTable columns={columns} data={mySites} />
          </div>
        )}
        {activeTab !== 'Overview' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Viewing site {activeTab} across assigned sites ({mySites.map(s => s.id).join(', ')}).
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Construction Site">
        <form onSubmit={handleCreateSite} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site Name</label>
            <input required type="text" value={newSite.name} onChange={e => setNewSite({ ...newSite, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project</label>
            <select value={newSite.projectId} onChange={e => setNewSite({ ...newSite, projectId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {myProjectIds.map(pid => <option key={pid} value={pid}>{pid}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Location / Section</label>
            <input required type="text" value={newSite.location} onChange={e => setNewSite({ ...newSite, location: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Start Date</label>
              <input type="date" value={newSite.startDate} onChange={e => setNewSite({ ...newSite, startDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>End Date</label>
              <input type="date" value={newSite.endDate} onChange={e => setNewSite({ ...newSite, endDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
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
