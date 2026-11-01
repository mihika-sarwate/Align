import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, ShoppingCart, FileQuestion, GitPullRequest, Truck, Box } from 'lucide-react';

export default function ProcurementQuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: <FileCheck size={16} />, label: 'Create Material Request', color: 'green', path: '/procurement/material-requests' },
    { icon: <ShoppingCart size={16} />, label: 'Create Purchase Order', color: 'orange', path: '/procurement/purchase-orders' },
    { icon: <FileQuestion size={16} />, label: 'Create Enquiry / RFQ', color: 'purple', path: '/procurement/rfqs' },
    { icon: <GitPullRequest size={16} />, label: 'Compare Quotations', color: 'blue', path: '/procurement/quotations' },
    { icon: <Truck size={16} />, label: 'Track Delivery', color: 'teal', path: '/procurement/deliveries' },
    { icon: <Box size={16} />, label: 'View Inventory', color: 'orange', path: '/procurement/inventory' },
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
