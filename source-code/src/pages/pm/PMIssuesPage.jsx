import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = ['All Project Issues', 'Supply Chain & Material', 'Open', 'In Review', 'Resolved', 'Closed'];

export default function PMIssuesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Project Issues');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newIssue, setNewIssue] = useState({
    title: '',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    category: 'Material',
    priority: 'High',
    description: ''
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'var(--color-red)';
      case 'High': return 'var(--color-orange)';
      case 'Medium': return 'var(--color-blue)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'ISS-' + (100 + state.issues.length + 1);
    dispatch({
      type: 'CREATE_ISSUE',
      payload: {
        ...newIssue,
        id,
        raisedBy: 'Rahul Mehta (PM)',
        status: 'Open'
      }
    });
    setShowModal(false);
    alert('Project issue ' + id + ' created.');
  };

  const handleStatusChange = (issue, status) => {
    dispatch({ type: 'UPDATE_ISSUE_STATUS', payload: { id: issue.id, status } });
  };

  const myProjectIds = state.projects
    .filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta')
    .map(p => p.id);

  // Issues belonging to PM's projects or general project issues
  const projectIssues = (state.issues || []).filter(i =>
    !i.projectId || myProjectIds.length === 0 || myProjectIds.includes(i.projectId)
  );

  const filtered = projectIssues.filter(i => {
    const matchSearch = !search ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      (i.category || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.siteId || '').toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (activeTab === 'All Project Issues') return true;
    if (activeTab === 'Supply Chain & Material') {
      return i.category === 'Material' || i.category === 'Vendor' || i.category === 'Procurement';
    }
    return i.status === activeTab;
  });

  const columns = [
    { header: 'ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Title', accessor: 'title', cell: r => (
      <div>
        <div style={{ fontWeight: 600 }}>{r.title}</div>
        {r.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.description}</div>}
      </div>
    )},
    { header: 'Project / Site', accessor: 'siteId', cell: r => `${r.projectId || 'PRJ'} / ${r.siteId || 'SIT'}` },
    { header: 'Category', accessor: 'category', cell: r => (
      <span className={`badge ${r.category === 'Material' || r.category === 'Vendor' ? 'blue' : 'gray'}`}>
        {r.category}
      </span>
    )},
    { header: 'Priority', accessor: 'priority', cell: r => (
      <span style={{ fontWeight: 700, color: getPriorityColor(r.priority) }}>{r.priority}</span>
    )},
    { header: 'Raised By', accessor: 'raisedBy', cell: r => r.raisedByName || r.raisedBy },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader
        title="Project Issues & Bottlenecks"
        subtitle="Coordinate resolution of on-site technical clashes, contractor delays, and material shortages."
        actionLabel="Raise Project Issue"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search project issues by title, category, site..."
        />
        <DataTable
          columns={columns}
          data={filtered}
          actions={row => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {row.status === 'Open' && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleStatusChange(row, 'In Review')}
                >
                  Review
                </button>
              )}
              {['Open', 'In Review', 'Assigned'].includes(row.status) && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleStatusChange(row, 'Resolved')}
                >
                  Resolve
                </button>
              )}
              {row.status === 'Resolved' && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleStatusChange(row, 'Closed')}
                >
                  Close
                </button>
              )}
            </div>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Report Project Issue or Roadblock">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Issue Summary</label>
            <input
              required
              type="text"
              placeholder="e.g. Scaffolding vendor delayed setup"
              value={newIssue.title}
              onChange={e => setNewIssue({ ...newIssue, title: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select
                value={newIssue.category}
                onChange={e => setNewIssue({ ...newIssue, category: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="Material">Material (Procurement)</option>
                <option value="Vendor">Vendor (Procurement)</option>
                <option value="Technical">Technical</option>
                <option value="Civil">Civil</option>
                <option value="Safety">Safety</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
              <select
                value={newIssue.priority}
                onChange={e => setNewIssue({ ...newIssue, priority: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project</label>
              <select
                value={newIssue.projectId}
                onChange={e => setNewIssue({ ...newIssue, projectId: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.projects.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site</label>
              <select
                value={newIssue.siteId}
                onChange={e => setNewIssue({ ...newIssue, siteId: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.sites.map(s => (
                  <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Detailed Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe what is blocked and which teams (Site, Procurement, Vendor) need to take action..."
              value={newIssue.description}
              onChange={e => setNewIssue({ ...newIssue, description: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">File Issue</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
