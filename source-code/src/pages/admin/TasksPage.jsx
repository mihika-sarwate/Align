import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import Modal from '../../components/Modal';
import { ChevronRight, ChevronDown, Clock, Calendar, CheckSquare } from 'lucide-react';

const TABS = [
  'Task Allocation',
  'All Tasks',
  'Procurement',
  'Reports',
  'Civil',
  'Awaiting Verification',
  'Completed',
  'Overdue'
];

export const TASK_CATEGORIES = ['Civil', 'Procurement', 'Reports'];

export default function TasksPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Task Allocation');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedTaskIds, setExpandedTaskIds] = useState(new Set());

  // Filters (Section 2.3)
  const [filterSite, setFilterSite] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignDate, setFilterAssignDate] = useState('');

  const [newTask, setNewTask] = useState({
    title: '',
    taskCode: 'CV0101',
    category: 'Civil',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    assignedTo: 'EMP-004',
    dateOfAssignment: new Date().toISOString().split('T')[0],
    dueDate: '2024-09-25',
    priority: 'High',
    plannedQty: 100,
    unit: 'sq.m',
    description: ''
  });

  const toggleExpand = (id) => {
    setExpandedTaskIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
    const id = 'TSK-' + (1000 + (state.tasks?.length || 0) + 1);
    const emp = state.employees?.find(e => e.id === newTask.assignedTo);
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
    alert(`Task ${id} created and assigned.`);
  };

  const handleStatusChange = (task, newStatus) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: newStatus } });
  };

  const filtered = (state.tasks || []).filter(t => {
    const matchSearch = !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.taskCode || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.assignedToName || '').toLowerCase().includes(search.toLowerCase());

    const matchSite = !filterSite || t.siteId === filterSite;
    const matchEmployee = !filterEmployee || t.assignedTo === filterEmployee;
    const matchCategory = !filterCategory || (t.category || 'Civil') === filterCategory;
    const matchPriority = !filterPriority || t.priority === filterPriority;
    const matchStatus = !filterStatus || t.status === filterStatus;
    const matchAssignDate = !filterAssignDate || (t.dateOfAssignment || t.plannedStart || '').startsWith(filterAssignDate);

    if (!matchSearch || !matchSite || !matchEmployee || !matchCategory || !matchPriority || !matchStatus || !matchAssignDate) {
      return false;
    }

    if (activeTab === 'Task Allocation' || activeTab === 'All Tasks') return true;
    if (activeTab === 'Procurement') return (t.category || '') === 'Procurement';
    if (activeTab === 'Reports') return (t.category || '') === 'Reports';
    if (activeTab === 'Civil') return (t.category || 'Civil') === 'Civil';
    if (activeTab === 'Awaiting Verification') return t.status === 'Submitted';
    if (activeTab === 'Completed') return t.status === 'Completed';
    if (activeTab === 'Overdue') {
      return t.status !== 'Completed' && new Date(t.dueDate) < new Date();
    }
    return true;
  });

  // Mandatory Table Format:
  // Task ID | Task Title | Project/Site | Category | Assigned Employee | Date of Assignment | Due Date | Priority | Status | Actions
  const columns = [
    {
      header: 'Task ID',
      accessor: 'id',
      cell: r => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => toggleExpand(r.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              color: 'var(--text-secondary)'
            }}
            title="Expand task details"
          >
            {expandedTaskIds.has(r.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            {r.id}
          </span>
        </div>
      )
    },
    {
      header: 'Task Title',
      accessor: 'title',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{r.title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Code: {r.taskCode}</span>
        </div>
      )
    },
    {
      header: 'Project/Site',
      accessor: 'siteId',
      cell: r => {
        const siteObj = state.sites?.find(s => s.id === r.siteId);
        const prjObj = state.projects?.find(p => p.id === (r.projectId || siteObj?.projectId));
        return (
          <div>
            <span style={{ fontWeight: 600 }}>{prjObj?.name || r.projectId}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {siteObj ? `${siteObj.name} (${siteObj.id})` : r.siteId}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: r => {
        const cat = r.category || 'Civil';
        const color = cat === 'Procurement' ? 'orange' : cat === 'Reports' ? 'teal' : 'blue';
        return <span className={`badge ${color}`}>{cat}</span>;
      }
    },
    {
      header: 'Assigned Employee',
      accessor: 'assignedToName',
      cell: r => <span>{r.assignedToName || r.assignedName || 'Rajesh K'}</span>
    },
    {
      header: 'Date of Assignment',
      accessor: 'dateOfAssignment',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.dateOfAssignment || r.plannedStart || '2024-09-01'}</span>
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.dueDate}</span>
    },
    {
      header: 'Priority',
      accessor: 'priority',
      cell: r => <span style={{ fontWeight: 700, color: getPriorityColor(r.priority) }}>{r.priority}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  return (
    <>
      <PageHeader
        title="Task Allocation & Operations"
        subtitle="Manage end-to-end task allocations across Civil, Procurement, and Reports with assignment date tracking and expandable history."
        actionLabel="Create Task"
        onAction={() => setShowModal(true)}
      />

      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {/* Comprehensive Filters Bar (Section 2.3) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          padding: '12px',
          background: 'var(--bg-main)',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Project / Site</label>
            <ProjectSiteSelect
              value={filterSite}
              onChange={({ siteId }) => setFilterSite(siteId)}
              includeAllOption={true}
              allLabel="All Projects / Sites"
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Assigned Employee</label>
            <select
              value={filterEmployee}
              onChange={e => setFilterEmployee(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Employees</option>
              {state.employees?.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role})</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Categories</option>
              {TASK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Status</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Statuses</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Blocked">Blocked</option>
              <option value="Submitted">Submitted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Assignment Date</label>
            <input
              type="date"
              value={filterAssignDate}
              onChange={e => setFilterAssignDate(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>
        </div>

        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks by title, code, engineer..." />

        {/* Expandable Task Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col.header}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                    No matching task allocation records found.
                  </td>
                </tr>
              ) : filtered.map(task => {
                const isExpanded = expandedTaskIds.has(task.id);
                return (
                  <React.Fragment key={task.id}>
                    <tr>
                      {columns.map((col, cIdx) => (
                        <td key={cIdx}>
                          {col.cell ? col.cell(task) : task[col.accessor]}
                        </td>
                      ))}
                      <td className="actions-cell">
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {task.status === 'Submitted' && (
                            <button className="btn btn-sm btn-primary" onClick={() => handleStatusChange(task, 'Completed')}>Verify</button>
                          )}
                          {task.status === 'Blocked' && (
                            <button className="btn btn-sm btn-secondary" onClick={() => handleStatusChange(task, 'In Progress')}>Unblock</button>
                          )}
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => toggleExpand(task.id)}
                            style={{ fontSize: '0.75rem', padding: '2px 6px' }}
                          >
                            {isExpanded ? 'Hide' : 'Details'}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Row for Task History & Detail (Section 2.6) */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={columns.length + 1} style={{ background: '#f8fafc', padding: '16px 24px', borderLeft: '4px solid var(--color-blue)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '0.85rem' }}>
                            <div>
                              <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>Scope & Description</strong>
                              <p style={{ margin: 0, color: 'var(--text-primary)' }}>{task.description || 'Standard execution work package.'}</p>
                            </div>
                            <div>
                              <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>Output Progress</strong>
                              <span>Actual: <strong>{task.actualQty || 0}</strong> / Planned: <strong>{task.plannedQty} {task.unit}</strong></span>
                              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '6px' }}>
                                <div style={{
                                  height: '100%',
                                  background: 'var(--color-blue)',
                                  borderRadius: '3px',
                                  width: `${Math.min(100, Math.round(((task.actualQty || 0) / (task.plannedQty || 1)) * 100))}%`
                                }} />
                              </div>
                            </div>
                            <div>
                              <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>Timeline & Audit</strong>
                              <span>Assigned: <strong>{task.dateOfAssignment || task.plannedStart || '2024-09-01'}</strong></span><br />
                              <span>Due: <strong>{task.dueDate}</strong></span><br />
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Created By: {task.createdBy || 'Admin'}</span>
                            </div>
                            <div>
                              <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>Activity & History</strong>
                              {(task.updates && task.updates.length > 0) ? (
                                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  {task.updates.map((u, uIdx) => (
                                    <li key={uIdx}>{u.date} ({u.by}): {u.note}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>No status updates logged yet.</span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating Task */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Work Package / Task">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Title</label>
            <input
              required
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="e.g. Electrical Conduit Installation"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project & Site</label>
              <ProjectSiteSelect
                value={newTask.siteId}
                onChange={({ siteId, projectId }) => setNewTask({ ...newTask, siteId, projectId })}
                required={true}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Category</label>
              <select
                value={newTask.category}
                onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {TASK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Code</label>
              <input
                required
                type="text"
                value={newTask.taskCode}
                onChange={e => setNewTask({ ...newTask, taskCode: e.target.value })}
                placeholder="e.g. CV0101"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assigned Employee</label>
              <select
                value={newTask.assignedTo}
                onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.employees?.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role})</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Planned Qty</label>
              <input
                required
                type="number"
                min="1"
                value={newTask.plannedQty}
                onChange={e => setNewTask({ ...newTask, plannedQty: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit</label>
              <input
                required
                type="text"
                value={newTask.unit}
                onChange={e => setNewTask({ ...newTask, unit: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
              <select
                value={newTask.priority}
                onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
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
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Date of Assignment</label>
              <input
                required
                type="date"
                value={newTask.dateOfAssignment}
                onChange={e => setNewTask({ ...newTask, dateOfAssignment: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Due Date</label>
              <input
                required
                type="date"
                value={newTask.dueDate}
                onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Scope Description</label>
            <textarea
              rows={2}
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Detailed instructions or specifications..."
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Allocate Task</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
