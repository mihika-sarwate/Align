import React from 'react';
import { IndianRupee, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import './ReceivablesSummary.css';

export default function ReceivablesSummary() {
  const data = [
    { label: 'Total Receivables', value: '₹ 5.78 Cr', icon: <IndianRupee size={16} />, color: 'blue' },
    { label: 'Overdue Amount', value: '₹ 1.12 Cr', icon: <AlertCircle size={16} />, color: 'red' },
    { label: 'Due This Month', value: '₹ 1.45 Cr', icon: <Clock size={16} />, color: 'orange' },
    { label: 'Collected This Month', value: '₹ 2.21 Cr', icon: <CheckCircle2 size={16} />, color: 'green' },
  ];

  return (
    <div className="card recv-summary-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Receivables Summary</h3>
        <a href="#" className="view-all-link">View full report</a>
      </div>
      
      <div className="recv-list">
        {data.map((item, idx) => (
          <div key={idx} className="recv-item">
            <div className={`recv-icon text-${item.color} bg-${item.color}-light`}>
              {item.icon}
            </div>
            <div className="recv-label font-medium">{item.label}</div>
            <div className="recv-value font-bold text-primary">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
