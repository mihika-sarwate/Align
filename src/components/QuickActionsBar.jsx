import React from 'react';
import { CheckSquare, FilePlus, FileCheck, ClipboardList, AlertTriangle } from 'lucide-react';
import './QuickActionsBar.css';

export default function QuickActionsBar() {
  const actions = [
    { icon: <CheckSquare size={16} />, label: 'Create Task', color: 'blue' },
    { icon: <FileCheck size={16} />, label: 'Material Request', color: 'green' },
    { icon: <FilePlus size={16} />, label: 'Report Material Receipt', color: 'purple' },
    { icon: <ClipboardList size={16} />, label: 'Submit Daily Report', color: 'orange' },
    { icon: <AlertTriangle size={16} />, label: 'Create Issue', color: 'red' },
  ];

  return (
    <div className="quick-actions-bar">
      <div className="qa-title">QUICK ACTIONS</div>
      <div className="qa-buttons">
        {actions.map((act, idx) => (
          <button key={idx} className="qa-btn">
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
