import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = ['All Project Tasks', 'Create & Assign', 'Weekly Targets', 'In Progress', 'Blocked', 'Submitted', 'Verification', 'Completed', 'Overdue', 'Task Performance'];

export default function PMTasksPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Project Tasks');
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
    dueDate: '2024-09-15',
    description: ''
  });

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const myTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId));

  const handleVerify = (task) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: 'Verified' } });
    setTimeout(() => {
      dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: 'Completed' } });
    }, 100);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const id = 'TSK-' + (300 + state.tasks.length + 1);
    const emp = state.employees.find(e => e.id === newTask.assignedTo);
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        ...newTask,
        id,
        assignedToName: emp?.name || 'Rajesh K',
        actualQty: 0,
        status: 'Assigned',
        createdBy: 'Rahul Mehta'
      }
    });
    setShowModal(false);
  };

  const filteredTasks = myTasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.taskCode.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'In Progress') return matchSearch && t.status === 'In Progress';
    if (activeTab === 'Blocked') return matchSearch && t.status === 'Blocked';
    if (activeTab === 'Submitted' || activeTab === 'Verification') return matchSearch && t.status === 'Submitted';
    if (activeTab === 'Completed') return matchSearch && t.status === 'Completed';
    return matchSearch;
  });

  const columns = [
    { header: 'Task ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
    { header: 'Code', accessor: 'taskCode', cell: r => <span style={{ fontWeight: 600 }}>{r.taskCode}</span> },
    { header: 'Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
    { header: 'Site', accessor: 'siteId' },
    { header: 'Assigned To', accessor: 'assignedToName' },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Progress', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' / ' + r.plannedQty + ' ' + (r.unit || '') },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
  ];

  return (
    <>
      <PageHeader title="Task Management & Verification" subtitle="Assign work packages to Site Engineers, track blockers, and verify completed works." actionLabel="New Task" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks by code, title..." />
        
        {activeTab === 'Task Performance' ? (
          <DataTable
            columns={[
              { header: 'Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Planned Qty', accessor: 'plannedQty', cell: r => r.plannedQty + ' ' + r.unit },
              { header: 'Actual Qty', accessor: 'actualQty', cell: r => (r.actualQty || 0) + ' ' + r.unit },
              { header: 'Performance Ratio', accessor: 'ratio', cell: r => {
                const ratio = Math.round(((r.actualQty || 0) / (r.plannedQty || 1)) * 100);
                return (
                  <span style={{ fontWeight: 700, color: ratio >= 90 ? 'var(--color-green)' : ratio >= 70 ? 'var(--color-orange)' : 'var(--color-red)' }}>
                    {ratio}%
                  </span>
                );
              }},
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myTasks}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredTasks}
            actions={row => (
              <div style={{ display: 'flex', gap: '6px' }}>
                {row.status === 'Submitted' && (
                  <button className="btn btn-sm btn-primary" onClick={() => handleVerify(row)}>Verify & Complete</button>
                )}
              </div>
            )}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Work Package / Task">
        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Title</label>
            <input required type="text" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Code</label>
              <input type="text" value={newTask.taskCode} onChange={e => setNewTask({ ...newTask, taskCode: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assign Site Engineer</label>
              <select value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.employees.filter(e => e.role === 'Site Engineer').map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Planned Qty</label>
              <input type="number" value={newTask.plannedQty} onChange={e => setNewTask({ ...newTask, plannedQty: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit</label>
              <input type="text" value={newTask.unit} onChange={e => setNewTask({ ...newTask, unit: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Due Date</label>
            <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create & Assign</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
