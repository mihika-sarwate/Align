import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Drawings', 'Draft', 'Submitted for Review', 'Approved', 'Revision Required', 'Superseded'];

export default function WorkingDrawingsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Drawings');
  const [showModal, setShowModal] = useState(false);
  const [drawing, setDrawing] = useState({ drawingId: '', title: '', projectId: 'PRJ-101', siteId: 'SIT-201', discipline: 'Architectural' });

  const drawings = state.drawings || [];

  const filtered = drawings.filter(d => {
    if (activeTab === 'All Drawings') return true;
    return d.status === activeTab;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_DRAWING',
      payload: {
        ...drawing,
        id: 'DRW-' + (drawings.length + 1),
        revisionNumber: 0,
        author: 'Vikram Patel',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
        previousRevisions: []
      }
    });
    setShowModal(false);
    alert('New drawing sheet registered.');
  };

  const handleApprove = (d) => {
    dispatch({ type: 'APPROVE_DRAWING', payload: d.id });
    alert('Drawing ' + d.drawingId + ' approved for construction.');
  };

  return (
    <>
      <PageHeader title="Working Drawings Register" subtitle="Architectural, structural, electrical, and plumbing working drawings with revision tracking." actionLabel="New Drawing" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Drawing #', accessor: 'drawingId', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.drawingId}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Discipline', accessor: 'discipline' },
            { header: 'Site / Location', accessor: 'siteId' },
            { header: 'Revision', accessor: 'revisionNumber', cell: r => <span className="badge blue">Rev {r.revisionNumber}</span> },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={r => r.status !== 'Approved' && (
            <button className="btn btn-sm btn-primary" onClick={() => handleApprove(r)}>Approve Drawing</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Engineering Drawing">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Drawing Number</label>
            <input required type="text" value={drawing.drawingId} onChange={e => setDrawing({ ...drawing, drawingId: e.target.value })} placeholder="e.g. AR-101-04" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Drawing Title</label>
            <input required type="text" value={drawing.title} onChange={e => setDrawing({ ...drawing, title: e.target.value })} placeholder="e.g. Tower A Podium Floor Plan" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Discipline</label>
              <select value={drawing.discipline} onChange={e => setDrawing({ ...drawing, discipline: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Architectural">Architectural</option>
                <option value="Structural">Structural</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="HVAC">HVAC</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Target Site</label>
              <input type="text" value={drawing.siteId} onChange={e => setDrawing({ ...drawing, siteId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Register Drawing</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
