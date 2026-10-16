import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

export default function ContractorIssuesPage() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState({ title: '', description: '', priority: 'High' });

  const issues = state.issues.filter(i => i.siteId === 'SIT-201');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'ISS-' + (state.issues.length + 1);
    dispatch({
      type: 'CREATE_ISSUE',
      payload: {
        ...issue,
        id,
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        raisedBy: 'Ramesh Contractor',
        category: 'Material',
        status: 'Open'
      }
    });
    setShowModal(false);
    alert('Site issue submitted.');
  };

  return (
    <>
      <PageHeader title="Contractor Bottlenecks & Issues" subtitle="Report site obstacles, missing drawings, or delayed material deliveries." actionLabel="Report Bottleneck" onAction={() => setShowModal(true)} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Title', accessor: 'title' },
            { header: 'Category', accessor: 'category' },
            { header: 'Priority', accessor: 'priority' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={issues}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Report Field Bottleneck">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Bottleneck Title</label>
            <input required type="text" value={issue.title} onChange={e => setIssue({ ...issue, title: e.target.value })} placeholder="e.g. Reinforcement steel stock exhausted" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Description</label>
            <textarea rows={3} required value={issue.description} onChange={e => setIssue({ ...issue, description: e.target.value })} placeholder="Provide detail regarding crew impact..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
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
