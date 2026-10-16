import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['My Site Issues', 'Create Issue', 'Resolved'];

export default function SEIssuesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('My Site Issues');
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState({ title: '', category: 'Technical', priority: 'High', description: '' });

  const issues = state.issues.filter(i => i.siteId === 'SIT-201');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'ISS-' + (100 + state.issues.length + 1);
    dispatch({
      type: 'CREATE_ISSUE',
      payload: {
        ...issue,
        id,
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        raisedBy: 'Rajesh K (SE)',
        status: 'Open'
      }
    });
    setShowModal(false);
    alert('Site issue submitted to Project Manager.');
  };

  return (
    <>
      <PageHeader title="Site Issues & Snags" subtitle="Report technical clashes, drawing discrepancies, or material shortages." actionLabel="Report Issue" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Issue ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Category', accessor: 'category' },
            { header: 'Priority', accessor: 'priority' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={issues}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Report Site Issue or Blockage">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Issue Summary</label>
            <input required type="text" value={issue.title} onChange={e => setIssue({ ...issue, title: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select value={issue.category} onChange={e => setIssue({ ...issue, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Technical">Technical</option>
                <option value="Material">Material</option>
                <option value="Vendor">Vendor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
              <select value={issue.priority} onChange={e => setIssue({ ...issue, priority: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Detailed Description</label>
            <textarea rows={3} required value={issue.description} onChange={e => setIssue({ ...issue, description: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
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
