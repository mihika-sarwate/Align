import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import Modal from '../../components/Modal';
import { Zap, Plus, ArrowRight } from 'lucide-react';

const TABS = [
  'Task Allocation',
  'All Tasks',
  'Weekly Targets',
  'In Progress',
  'Blocked',
  'Verification Queue',
  'Completed',
  'Overdue'
];

export default function PMTasksPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Task Allocation');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterSite, setFilterSite] = useState('');

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const mySiteIds = mySites.map(s => s.id);

  const [newTask, setNewTask] = useState({
    title: '',
    taskCode: 'CV0102',
    category: 'Civil',
    projectId: myProjectIds[0] || 'PRJ-101',
    siteId: mySiteIds[0] || 'SIT-201',
    assignedTo: 'EMP-004',
    dateOfAssignment: new Date().toISOString().split('T')[0],
    dueDate: '2024-09-25',
    priority: 'High',
    plannedQty: 100,
    unit: 'sq.m',
    description: ''
  });

  const myTasks = (state.tasks || []).filter(t => myProjectIds.includes(t.projectId));
  const urgentTasks = myTasks.filter(t => (t.priority === 'Critical' || t.priority === 'High') && t.status !== 'Completed');

  const handleVerify = (task) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id, status: 'Completed' } });
    alert(`Task ${task.id} verified and marked Completed.`);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const id = 'TSK-' + (300 + (state.tasks?.length || 0) + 1);
    const emp = state.employees?.find(e => e.id === newTask.assignedTo);
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        ...newTask,
        id,
        assignedToName: emp?.name || 'Rajesh K',
        actualQty: 0,
        status: 'Assigned',
        createdBy: 'Rahul Mehta (PM)'
      }
    });
    setShowModal(false);
    alert(`Task ${id} created and assigned to ${emp?.name || 'Site Engineer'}.`);
  };

  const filteredTasks = myTasks.filter(t => {
    const matchSearch = !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.taskCode.toLowerCase().includes(search.toLowerCase()) ||
      (t.assignedToName || '').toLowerCase().includes(search.toLowerCase());

    const matchSite = !filterSite || t.siteId === filterSite;
    if (!matchSearch || !matchSite) return false;

    if (activeTab === 'Task Allocation' || activeTab === 'All Tasks') return true;
    if (activeTab === 'In Progress') return t.status === 'In Progress';
    if (activeTab === 'Blocked') return t.status === 'Blocked';
    if (activeTab === 'Verification Queue') return t.status === 'Submitted';
    if (activeTab === 'Completed') return t.status === 'Completed';
    if (activeTab === 'Overdue') return t.status !== 'Completed' && new Date(t.dueDate) < new Date();
    return true;
  });

  // PM Task Allocation Table Format:
  // Task ID | Task Title | Project/Site | Category | Assigned Site Engineer | Date of Assignment | Due Date | Priority | Status | Actions
  const columns = [
    {
      header: 'Task ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{r.id}</span>
    },
    {
      header: 'Task Title',
      accessor: 'title',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600 }}>{r.title}</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Code: {r.taskCode}</span>
        </div>
      )
    },
    {
      header: 'Project/Site',
      accessor: 'siteId',
      cell: r => {
        const site = mySites.find(s => s.id === r.siteId);
        const prj = myProjects.find(p => p.id === r.projectId);
        return (
          <div>
            <span style={{ fontWeight: 600 }}>{prj?.name || r.projectId}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {site ? `${site.name} (${site.id})` : r.siteId}
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
      header: 'Assigned Site Engineer',
      accessor: 'assignedToName',
      cell: r => <span>{r.assignedToName || 'Rajesh K'}</span>
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
      cell: r => (
        <span className={`badge ${r.priority === 'Critical' ? 'red' : r.priority === 'High' ? 'orange' : 'blue'}`}>
          {r.priority}
        </span>
      )
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
        title="Task Allocation & Engineer Supervision"
        subtitle="Create tasks, assign work packages to Site Engineers, track weekly targets, and verify submitted completions."
        actionLabel="Create Task"
        onAction={() => setShowModal(true)}
      />

      {/* PROMINENT PRIORITY PUSH FOR URGENT TASKS (Section 3.4) */}
      <div style={{
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        borderLeft: '5px solid var(--color-orange)',
        borderRadius: '8px',
        padding: '14px 18px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--color-orange)" />
            <strong style={{ fontSize: '0.9rem', color: '#9a3412' }}>
              PRIORITY PUSH: {urgentTasks.length} Urgent Tasks Require Action
            </strong>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#c2410c' }}>
            Critical / High Priority on active work packages
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {urgentTasks.map(t => (
            <div
              key={t.id}
              style={{
                background: 'white',
                border: '1px solid #fed7aa',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span className={`badge ${t.priority === 'Critical' ? 'red' : 'orange'}`} style={{ fontSize: '0.7rem' }}>
                {t.priority}
              </span>
              <span><strong>{t.title}</strong> ({t.assignedToName || 'SE'})</span>
              <span style={{ color: 'var(--text-secondary)' }}>Due: {t.dueDate}</span>
            </div>
          ))}
        </div>
      </div>

      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Site:</label>
            <ProjectSiteSelect
              value={filterSite}
              onChange={({ siteId }) => setFilterSite(siteId)}
              includeAllOption={true}
              allLabel="All Supervised Sites"
              filterProjectIds={myProjectIds}
            />
          </div>

          <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks by code, title, engineer..." />
        </div>

        {activeTab === 'Weekly Targets' ? (
          <DataTable
            columns={[
              { header: 'Target ID', accessor: 'id' },
              { header: 'Week', accessor: 'week', cell: r => <strong>{r.week}</strong> },
              { header: 'Project ID', accessor: 'projectId' },
              { header: 'Target Description', accessor: 'targetDescription' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={(state.weeklyTargets || []).filter(w => myProjectIds.includes(w.projectId))}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <DataTable
              columns={columns}
              data={filteredTasks}
              actions={row => (
                <div style={{ display: 'flex', gap: '6px' }}>
                  {row.status === 'Submitted' && (
                    <button className="btn btn-sm btn-primary" onClick={() => handleVerify(row)}>
                      Verify Work
                    </button>
                  )}
                  {row.status === 'Blocked' && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: row.id, status: 'In Progress' } })}
                    >
                      Unblock
                    </button>
                  )}
                </div>
              )}
            />
          </div>
        )}
      </div>

      {/* Modal for Creating Task */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create & Assign Work Package">
        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Task Title</label>
            <input
              required
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="e.g. Plinth Beam Casting"
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
                filterProjectIds={myProjectIds}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select
                value={newTask.category}
                onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="Civil">Civil</option>
                <option value="Procurement">Procurement</option>
                <option value="Reports">Reports</option>
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
                placeholder="e.g. CV0102"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Assign Site Engineer</label>
              <select
                value={newTask.assignedTo}
                onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {state.employees?.filter(e => e.role === 'Site Engineer').map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.id})</option>
                ))}
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
                <option value="Critical">Critical (Priority Push)</option>
                <option value="High">High (Priority Push)</option>
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Assign Task</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
