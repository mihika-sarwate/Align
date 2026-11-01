import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, Wallet, PlusSquare, CreditCard, FileSignature, BarChart2 } from 'lucide-react';

export default function AccountsQuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: <FileCheck size={16} />, label: 'Verify Invoice', color: 'green', path: '/accounts/invoice-verification' },
    { icon: <Wallet size={16} />, label: 'Record Payment', color: 'blue', path: '/accounts/payments' },
    { icon: <PlusSquare size={16} />, label: 'Add Expense', color: 'orange', path: '/accounts/expenses' },
    { icon: <CreditCard size={16} />, label: 'Vendor Payment', color: 'purple', path: '/accounts/payments' },
    { icon: <FileSignature size={16} />, label: 'Bank Reconciliation', color: 'teal', path: '/accounts/reconciliation' },
    { icon: <BarChart2 size={16} />, label: 'Generate Reports', color: 'red', path: '/accounts/reports' },
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
