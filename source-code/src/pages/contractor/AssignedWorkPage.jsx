import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Assignments', 'Scheduled', 'In Progress', 'Blocked', 'Submitted'];

export default function AssignedWorkPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Assignments');
  const [showModal, setShowModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [actualQty, setActualQty] = useState(0);
  const [note, setNote] = useState('');

  const assignments = state.workAssignments || [];

  const openLog = (w) => {
    setSelectedWork(w);
    setActualQty(w.actualQty || 0);
    setNote('');
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedWork) return;
    dispatch({
      type: 'UPDATE_CONTRACTOR_WORK',
      payload: { id: selectedWork.id, actualQty: Number(actualQty), note }
    });
    setShowModal(false);
    alert('Labor output logged for package ' + selectedWork.taskCode);
  };

  return (
    <>
      <PageHeader title="Contract Work Packages" subtitle="Manage assigned construction activities and record daily physical outputs." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.taskCode}</span> },
            { header: 'Scope of Work', accessor: 'scope', cell: r => <span style={{ fontWeight: 600 }}>{r.scope}</span> },
            { header: 'Planned Quantity', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
            { header: 'Actual Completed', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
            { header: 'Target Date', accessor: 'targetDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={assignments}
          actions={r => (
            <button className="btn btn-sm btn-primary" onClick={() => openLog(r)}>Log Progress</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={'Log Output — ' + (selectedWork?.scope || '')}>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Cumulative Output ({selectedWork?.unit})</label>
            <input required type="number" min="0" value={actualQty} onChange={e => setActualQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Daily Crew Notes</label>
            <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Laborers deployed, weather delays, equipment issues..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Output</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
