import React from 'react';
import { Briefcase, Truck, Box, User, CreditCard } from 'lucide-react';
import './ExpenseOverview.css';

export default function ExpenseOverview() {
  const expenses = [
    { icon: <Briefcase size={16} />, color: 'green', label: 'Site Expenses', amount: '₹ 8,45,200', pct: '(45%)' },
    { icon: <Truck size={16} />, color: 'green', label: 'Logistics', amount: '₹ 4,25,300', pct: '(23%)' },
    { icon: <Box size={16} />, color: 'blue', label: 'Office Expenses', amount: '₹ 3,10,500', pct: '(17%)' },
    { icon: <User size={16} />, color: 'blue', label: 'Professional Fees', amount: '₹ 1,95,600', pct: '(10%)' },
    { icon: <CreditCard size={16} />, color: 'purple', label: 'Other Expenses', amount: '₹ 99,000', pct: '(5%)' },
  ];

  return (
    <div className="card expense-overview-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Expense Overview</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="expense-header">
        <div className="expense-lbl">This Month</div>
        <div className="expense-val-row">
          <span className="expense-total">₹ 18,75,600</span>
          <span className="expense-trend text-red">↑ 8% <span className="text-secondary" style={{ fontWeight: 500 }}>vs last month</span></span>
        </div>
      </div>
      
      <div className="expense-list">
        {expenses.map((exp, idx) => (
          <div key={idx} className="expense-item">
            <div className={`expense-icon bg-${exp.color}-light text-${exp.color}`}>
              {exp.icon}
            </div>
            <div className="expense-label font-medium">{exp.label}</div>
            <div className="expense-amount-row">
              <span className="expense-amount font-medium">{exp.amount}</span>
              <span className="expense-pct text-secondary">{exp.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
