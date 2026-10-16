import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = [
  'All Documents',
  'Project Documents',
  'Site Documents',
  'Drawings',
  'Contracts',
  'Purchase Documents',
  'Invoices',
  'Reports',
  'Photos',
  'Archived Documents'
];

export default function DocumentsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Documents');
  const [showModal, setShowModal] = useState(false);
  const [doc, setDoc] = useState({ name: '', category: 'Drawings', projectId: 'PRJ-101', siteId: 'SIT-201' });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'DOC-' + (100 + state.documents.length + 1);
    dispatch({
      type: 'CREATE_DOCUMENT',
      payload: {
        ...doc,
        id,
        version: 'v1.0',
        uploadedBy: 'Arjun Sharma (Admin)',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      }
    });
    setShowModal(false);
    alert('Document ' + id + ' uploaded.');
  };

  const filtered = state.documents.filter(d => {
    if (activeTab === 'All Documents') return true;
    if (activeTab === 'Project Documents') return Boolean(d.projectId);
    if (activeTab === 'Site Documents') return Boolean(d.siteId);
    if (activeTab === 'Drawings') return d.category === 'Drawings';
    if (activeTab === 'Contracts') return d.category === 'Contracts';
    if (activeTab === 'Invoices') return d.category === 'Invoices';
    if (activeTab === 'Reports') return d.category === 'Reports';
    return true;
  });

  return (
    <>
      <PageHeader
        title="Documents & Blueprints"
        subtitle="Secure enterprise storage for working drawings, contracts, regulatory approvals, and QA inspection photos."
        actionLabel="Upload Document"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Doc ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Document Title', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Category', accessor: 'category' },
            { header: 'Project / Site', accessor: 'siteId', cell: r => (r.projectId || 'General') + (r.siteId ? ' / ' + r.siteId : '') },
            { header: 'Revision', accessor: 'version', cell: r => <span className="badge blue">{r.version || 'v1.0'}</span> },
            { header: 'Uploaded', accessor: 'uploadDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Enterprise Document">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Document Name</label>
            <input required type="text" value={doc.name} onChange={e => setDoc({ ...doc, name: e.target.value })} placeholder="e.g. Tower A - Soil Investigation Report.pdf" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select value={doc.category} onChange={e => setDoc({ ...doc, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Drawings">Drawings</option>
                <option value="Contracts">Contracts</option>
                <option value="Invoices">Invoices</option>
                <option value="Reports">Reports</option>
                <option value="Purchases">Purchases</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project</label>
              <select value={doc.projectId} onChange={e => setDoc({ ...doc, projectId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.projects.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Upload</button>
          </div>
        </form>
      </Modal>
    </>
  );
}