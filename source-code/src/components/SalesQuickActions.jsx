import React from 'react';
import { UserPlus, MessageSquare, FileText, Briefcase } from 'lucide-react';

export default function SalesQuickActions() {
  const actions = [
    { icon: <UserPlus size={16} />, label: 'Add Lead', color: 'purple' },
    { icon: <MessageSquare size={16} />, label: 'Create Enquiry', color: 'blue' },
    { icon: <FileText size={16} />, label: 'Create Quotation', color: 'orange' },
    { icon: <Briefcase size={16} />, label: 'New Booking', color: 'green' },
  ];

  return (
    <div className="quick-actions-bar" style={{ marginTop: 0 }}>
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
