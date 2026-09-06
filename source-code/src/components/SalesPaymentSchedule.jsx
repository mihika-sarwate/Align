import React from 'react';
import { Calendar } from 'lucide-react';
import './SalesPaymentSchedule.css';

export default function SalesPaymentSchedule() {
  const schedule = [
    { project: 'Project A - Site 01', due: '16 Sep 2024', amount: '₹ 45,00,000', status: 'Overdue', statusColor: 'red' },
    { project: 'Project B - Site 02', due: '18 Sep 2024', amount: '₹ 32,50,000', status: 'Due Soon', statusColor: 'orange' },
    { project: 'Project C - Site 01', due: '25 Sep 2024', amount: '₹ 28,00,000', status: 'Upcoming', statusColor: 'blue' },
    { project: 'Project A - Site 02', due: '28 Sep 2024', amount: '₹ 22,00,000', status: 'Upcoming', statusColor: 'blue' },
  ];

  return (
    <div className="card sales-pay-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Payment Schedule Due</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="sales-pay-list">
        {schedule.map((item, idx) => (
          <div key={idx} className="sales-pay-item">
            <div className={`pay-icon-bg bg-red-light text-red`}>
              <Calendar size={18} />
            </div>
            
            <div className="pay-info">
              <div className="pay-project font-bold">{item.project}</div>
              <div className="pay-due text-secondary">Due Date: {item.due}</div>
            </div>
            
            <div className="pay-meta text-right">
              <div className="pay-amount font-bold text-primary">{item.amount}</div>
              <div className={`pay-status text-${item.statusColor}`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
