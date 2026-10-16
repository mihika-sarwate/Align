import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

const TABS = ['Revision Requests', 'Revision History'];

export default function DrawingRevisionsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Revision Requests');
  const [showModal, setShowModal] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [notes, setNotes] = useState('');

  const drawings = state.drawings || [];

  const openRevise = (d) => {
    setSelectedDrawing(d);
    setNotes('');
    setShowModal(true);
  };

  const handleReviseSubmit = (e) => {
    e.preventDefault();
    if (!selectedDrawing) return;
    dispatch({
      type: 'REVISE_DRAWING',
      payload: {
        id: selectedDrawing.id,
        notes,
        revisedBy: 'Vikram Patel'
      }
    });
    setShowModal(false);
    alert('New revision created for ' + selectedDrawing.drawingId + '. Prior approved version archived to revision history.');
  };

  return (
    <>
      <PageHeader title="Drawing Revision Control" subtitle="Maintain immutable historical records of design iterations. Approved versions are never deleted." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Drawing #', accessor: 'drawingId', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.drawingId}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Discipline', accessor: 'discipline' },
            { header: 'Current Revision', accessor: 'revisionNumber', cell: r => 'Rev ' + r.revisionNumber },
            { header: 'Previous Versions Archived', accessor: 'prev', cell: r => (r.previousRevisions || []).length + ' versions' }
          ]}
          data={drawings}
          actions={r => (
            <button className="btn btn-sm btn-primary" onClick={() => openRevise(r)}>Create Revision</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={'Issue Revision — ' + (selectedDrawing?.drawingId || '')}>
        <form onSubmit={handleReviseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Next Revision Number</label>
            <input disabled type="text" value={'Rev ' + ((selectedDrawing?.revisionNumber || 0) + 1)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Revision Reason / Modifications Made</label>
            <textarea rows={3} required value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Revised column dimensions along Grid B to accommodate HVAC ducting." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Archive Old & Publish Rev</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
