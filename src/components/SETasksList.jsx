import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './SETasksList.css';

const tasks = [
  { id: 'TSK-102', title: 'Complete slab reinforcement', site: 'Project A / Site 01', priority: 'High', status: 'In Progress', due: '02 Sep' },
  { id: 'TSK-103', title: 'Check material receipt - Cement', site: 'Project A / Site 01', priority: 'Medium', status: 'In Progress', due: '03 Sep' },
  { id: 'TSK-104', title: 'Electrical conduit installation', site: 'Project A / Site 01', priority: 'Medium', status: 'Pending', due: '04 Sep' },
  { id: 'TSK-105', title: 'Formwork for beam level 2', site: 'Project B / Site 02', priority: 'High', status: 'In Progress', due: '04 Sep' },
  { id: 'TSK-106', title: 'Daily site cleaning', site: 'Project B / Site 02', priority: 'Low', status: 'Submitted', due: '01 Sep' },
];

export default function SETasksList() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { label: 'All', count: 14 },
    { label: 'In Progress', count: 8 },
    { label: 'Pending', count: 4 },
    { label: 'Submitted', count: 2 },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Progress': return 'badge blue';
      case 'Pending': return 'badge orange';
      case 'Submitted': return 'badge purple';
      default: return 'badge';
    }
  };

  return (
    <div className="card tasks-list-card">
      <div className="card-header">
        <h3 className="card-title">MY TASKS</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="tasks-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.label}
            className={`task-tab ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
      
      <div className="tasks-container">
        {tasks.map(task => (
          <div key={task.id} className="task-row">
            <div className="task-id">{task.id}</div>
            <div className="task-main">
              <div className="task-title">{task.title}</div>
              <div className="task-site">{task.site}</div>
            </div>
            <div className="task-priority">
              <span className={`priority-badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>
            </div>
            <div className="task-status">
              <span className={getStatusClass(task.status)}>{task.status}</span>
            </div>
            <div className="task-due">
              Due: {task.due}
            </div>
          </div>
        ))}
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all tasks <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
