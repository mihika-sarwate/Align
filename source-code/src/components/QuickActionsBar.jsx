import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, FilePlus, FileCheck, ClipboardList, AlertTriangle } from 'lucide-react';
import './QuickActionsBar.css';

export default function QuickActionsBar() {
  const navigate = useNavigate();

  const actions = [
    { icon: <CheckSquare size={16} />, label: 'Create Task', color: 'blue', path: '/engineer/tasks' },
    { icon: <FileCheck size={16} />, label: 'Material Request', color: 'green', path: '/engineer/material-requests' },
    { icon: <FilePlus size={16} />, label: 'Report Material Receipt', color: 'purple', path: '/engineer/receipts' },
    { icon: <ClipboardList size={16} />, label: 'Submit Daily Report', color: 'orange', path: '/engineer/daily-reports' },
    { icon: <AlertTriangle size={16} />, label: 'Create Issue', color: 'red', path: '/engineer/issues' },
  ];

  return (
    <div className="quick-actions-bar">
      <div className="qa-title">QUICK ACTIONS</div>
      <div className="qa-buttons">
        {actions.map((act, idx) => (
          <button
            key={idx}
            className="qa-btn"
            onClick={() => act.path && navigate(act.path)}
            title={act.label}
          >
            <span className={`qa-icon ${act.color}`}>
              {act.icon}
            </span>
            <span className="qa-label">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
