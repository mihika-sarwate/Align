import React from 'react';
import { ArrowRight } from 'lucide-react';
import './ProcurementPendingApprovals.css';

export default function ProcurementPendingApprovals() {
  const approvals = [
    { type: 'MR', id: 'MR-054', desc: 'Project A / Site 01', amount: '₹8,45,000', date: 'Requested on 06 Sep' },
    { type: 'MR', id: 'MR-055', desc: 'Project B / Site 02', amount: '₹12,60,000', date: 'Requested on 06 Sep' },
    { type: 'PO', id: 'PO-1043', desc: 'Project A / Site 01', amount: '₹18,75,000', date: 'Raised on 05 Sep' },
    { type: 'PO', id: 'PO-1044', desc: 'Project C / Site 01', amount: '₹9,20,000', date: 'Raised on 05 Sep' },
    { type: 'MR', id: 'MR-056', desc: 'Project B / Site 01', amount: '₹5,80,000', date: 'Requested on 05 Sep' },
  ];

  const getTypeStyle = (type) => {
    return type === 'MR' ? 'bg-green-light text-green' : 'bg-orange-light text-orange';
  };

  return (
    <div className="card po-pending-approvals-card">
      <div className="card-header">
        <h3 className="card-title">PENDING APPROVALS</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="po-approvals-list">
        {approvals.map((app, idx) => (
          <div key={idx} className="po-approval-item">
            <div className={`po-approval-type ${getTypeStyle(app.type)}`}>
              {app.type}
            </div>
            
            <div className="po-approval-info">
              <span className="po-app-id">{app.id}</span>
              <span className="po-app-desc">{app.desc}</span>
            </div>
            
            <div className="po-approval-meta">
              <span className="po-app-amount">{app.amount}</span>
              <span className="po-app-date">{app.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all approvals <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
