import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'All Tasks',
  'Assigned',
  'Accepted',
  'In Progress',
  'Blocked',
  'Submitted',
  'Awaiting Verification',
  'Completed',
  'Overdue',
  'Task Reports'
];

export default function TasksPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Tasks');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    taskCode: 'PC0301',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    assignedTo: 'EMP-004',
    priority: 'High',
    plannedQty: 100,
    unit: 'sq.m',
    plannedStart: '2024-09-01',
    plannedEnd: '2024-09-15',
    dueDate: '2024-09-15',
    description: ''
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'Critical': return 'var(--color-red)';
      case 'High': return 'var(--color-orange)';
      case 'Medium': return 'var(--color-blue)';
      default: return 'var(--color-green)';
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'TSK-' + (1000 + state.tasks.length + 1);
    const emp = state.employees.find(e => e.id === newTask.assignedTo);
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        ...newTask,
        id,
        assignedToName: emp?.name || 'Rajesh K',
        actualQty: 0,
        status: 'Assigned',
        createdBy: 'Arjun Sharma (Admin)'
      }
    });
    setShowModal(false);
    alert('Task ' + id + ' (' + newTask.taskCode + ') created and assigned.');
  };

  const handleStatusChange = (task, newStatus) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: newStatus } });
  };

  const filtered = state.tasks.filter(t => {
    const matchSearch = !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.taskCode.toLowerCase().includes(search.toLowerCase()) ||
      (t.assignedToName || '').toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'All Tasks') return matchSearch;
    if (activeTab === 'Awaiting Verification') return matchSearch && t.status === 'Submitted';
    return matchSearch && t.status === activeTab;
  });

  const columns = [
    { header: 'ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Task Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 700 }}>{r.taskCode}</span> },
    { header: 'Task Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
    { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
    { header: 'Assigned Engineer', accessor: 'assignedToName' },
    { header: 'Priority', accessor: 'priority', cell: r => <span style={{ fontWeight: 700, color: getPriorityColor(r.priority) }}>{r.priority}</span> },
    { header: 'Quantity Output', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' / ' + r.plannedQty + ' ' + (r.unit || '') },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle="Manage end-to-end task workflow: Assigned → Accepted → In Progress → Blocked → Submitted → Verified → Completed."
        actionLabel="Create Task"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks by title, code, engineer..." />
        
        {activeTab === 'Task Reports' ? (
          <DataTable
            columns={[
              { header: 'Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Planned Qty', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
              { header: 'Actual Output', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
              { header: 'Performance Ratio', accessor: 'ratio', cell: r => {
                const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
                return <strong style={{ color: ratio >= 80 ? 'var(--color-green)' : 'var(--color-orange)' }}>{ratio}%</strong>;
              }},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.tasks}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            actions={row => (
              <div style={{ display: 'flex', gap: '6px' }}>
                {row.status === 'Submitted' && (
                  <button className="btn btn-sm btn-primary" onClick={() => handleStatusChange(row, 'Completed')}>Verify & Complete</button>
                )}
                {row.status === 'Blocked' && (
                  <button className="btn btn-sm btn-secondary" onClick={() => handleStatusChange(row, 'In Progress')}>Unblock</button>
                )}
              </div>
            )}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Work Package / Task">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Title</label>
            <input required type="text" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Code (e.g. PC0301)</label>
              <input required type="text" value={newTask.taskCode} onChange={e => setNewTask({ ...newTask, taskCode: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assigned Site Engineer</label>
              <select value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.employees.filter(e => e.role === 'Site Engineer').map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Planned Qty</label>
              <input required type="number" min="1" value={newTask.plannedQty} onChange={e => setNewTask({ ...newTask, plannedQty: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit</label>
              <input required type="text" value={newTask.unit} onChange={e => setNewTask({ ...newTask, unit: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
              <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Planned Start</label>
              <input type="date" value={newTask.plannedStart} onChange={e => setNewTask({ ...newTask, plannedStart: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Due Date</label>
              <input required type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
