import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = ['Assigned', 'Accepted', 'In Progress', 'Blocked', 'Submitted', 'Returned for Correction', 'Completed'];

export default function SETasksPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('In Progress');
  const [search, setSearch] = useState('');
  
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progressQty, setProgressQty] = useState(0);
  const [note, setNote] = useState('');

  const myTasks = state.tasks.filter(t => t.assignedTo === 'EMP-004' || t.siteId === 'SIT-201');

  const filtered = myTasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.taskCode.toLowerCase().includes(search.toLowerCase());
    return matchSearch && t.status === activeTab;
  });

  const handleStatusChange = (task, newStatus) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: newStatus } });
  };

  const openUpdate = (task) => {
    setSelectedTask(task);
    setProgressQty(task.actualQty || 0);
    setNote('');
    setUpdateModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;
    dispatch({
      type: 'UPDATE_TASK_PROGRESS',
      payload: { id: selectedTask.id, actualQty: Number(progressQty), note }
    });
    setUpdateModal(false);
  };

  return (
    <>
      <PageHeader title="Execution Tasks & Progress Logging" subtitle="Accept work packages, record daily physical completion, report blockers, or submit for PM verification." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks..." />
        <DataTable
          columns={[
            { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.taskCode}</span> },
            { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Planned Qty', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
            { header: 'Actual Qty', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={row => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {row.status === 'Assigned' && (
                <button className="btn btn-sm btn-primary" onClick={() => handleStatusChange(row, 'Accepted')}>Accept</button>
              )}
              {row.status === 'Accepted' && (
                <button className="btn btn-sm btn-primary" onClick={() => handleStatusChange(row, 'In Progress')}>Start Work</button>
              )}
              {row.status === 'In Progress' && (
                <>
                  <button className="btn btn-sm btn-secondary" onClick={() => openUpdate(row)}>Log Output</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleStatusChange(row, 'Blocked')}>Report Blocked</button>
                  <button className="btn btn-sm btn-primary" onClick={() => handleStatusChange(row, 'Submitted')}>Submit for Review</button>
                </>
              )}
              {row.status === 'Blocked' && (
                <button className="btn btn-sm btn-secondary" onClick={() => handleStatusChange(row, 'In Progress')}>Resume Work</button>
              )}
            </div>
          )}
        />
      </div>

      <Modal isOpen={updateModal} onClose={() => setUpdateModal(false)} title={'Log Output — ' + (selectedTask?.title || '')}>
        <form onSubmit={handleUpdateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Cumulative Completed Quantity ({selectedTask?.unit || 'units'})
            </label>
            <input required type="number" min="0" max={selectedTask?.plannedQty || 1000} value={progressQty} onChange={e => setProgressQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Daily Progress Note / Observations</label>
            <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Completed grid lines 1-6 column reinforcement." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setUpdateModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Progress</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
