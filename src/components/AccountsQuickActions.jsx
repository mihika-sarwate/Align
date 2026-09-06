import React from 'react';
import { FileCheck, Wallet, PlusSquare, CreditCard, FileSignature, BarChart2 } from 'lucide-react';

export default function AccountsQuickActions() {
  const actions = [
    { icon: <FileCheck size={16} />, label: 'Verify Invoice', color: 'green' },
    { icon: <Wallet size={16} />, label: 'Record Payment', color: 'blue' },
    { icon: <PlusSquare size={16} />, label: 'Add Expense', color: 'orange' },
    { icon: <CreditCard size={16} />, label: 'Vendor Payment', color: 'purple' },
    { icon: <FileSignature size={16} />, label: 'Bank Reconciliation', color: 'teal' },
    { icon: <BarChart2 size={16} />, label: 'Generate Reports', color: 'red' },
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
