import React from 'react';
import { Package, ShoppingCart, FileText, CheckSquare, AlertTriangle, ChevronRight } from 'lucide-react';
import './PendingApprovals.css';

const approvalsData = [
  { icon: <Package size={18} />, label: 'Material Requests', count: 7, color: 'blue' },
  { icon: <ShoppingCart size={18} />, label: 'Purchase Orders', count: 4, color: 'purple' },
  { icon: <FileText size={18} />, label: 'Invoices', count: 6, color: 'green' },
  { icon: <CheckSquare size={18} />, label: 'Material Receipts', count: 5, color: 'orange' },
  { icon: <AlertTriangle size={18} />, label: 'Issue Escalations', count: 3, color: 'red' },
];

export default function PendingApprovals() {
  return (
    <div className="card pending-card">
      <div className="card-header">
        <h3 className="card-title">Pending Approvals</h3>
        <a href="#" className="view-all-link text-sm">View all</a>
      </div>
      
      <div className="approvals-list">
        {approvalsData.map((item, idx) => (
          <div key={idx} className="approval-item hover-scale">
            <div className="approval-left">
              <div className={`approval-icon ${item.color}`}>
                {item.icon}
              </div>
              <span className="approval-label">{item.label}</span>
            </div>
            <div className="approval-right">
              <span className="approval-count">{item.count}</span>
              <ChevronRight size={16} className="text-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
