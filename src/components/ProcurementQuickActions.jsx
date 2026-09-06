import React from 'react';
import { FileCheck, ShoppingCart, FileQuestion, GitPullRequest, Truck, Box } from 'lucide-react';

export default function ProcurementQuickActions() {
  const actions = [
    { icon: <FileCheck size={16} />, label: 'Create Material Request', color: 'green' },
    { icon: <ShoppingCart size={16} />, label: 'Create Purchase Order', color: 'orange' },
    { icon: <FileQuestion size={16} />, label: 'Create Enquiry / RFQ', color: 'purple' },
    { icon: <GitPullRequest size={16} />, label: 'Compare Quotations', color: 'blue' },
    { icon: <Truck size={16} />, label: 'Track Delivery', color: 'teal' },
    { icon: <Box size={16} />, label: 'View Inventory', color: 'orange' },
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
