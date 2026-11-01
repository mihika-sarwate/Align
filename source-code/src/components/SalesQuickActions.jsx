import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, MessageSquare, FileText, Briefcase } from 'lucide-react';

export default function SalesQuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: <UserPlus size={16} />, label: 'Add Lead', color: 'purple', path: '/sales/leads' },
    { icon: <MessageSquare size={16} />, label: 'Create Enquiry', color: 'blue', path: '/sales/leads' },
    { icon: <FileText size={16} />, label: 'Create Quotation', color: 'orange', path: '/sales/quotations' },
    { icon: <Briefcase size={16} />, label: 'New Booking', color: 'green', path: '/sales/bookings' },
  ];

  return (
    <div className="quick-actions-bar" style={{ marginTop: 0 }}>
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
