import React from 'react';
import { ArrowRight, FileCheck, Truck, PackageCheck, AlertCircle, Box } from 'lucide-react';
import './MaterialsAtAGlance.css';

export default function MaterialsAtAGlance() {
  const items = [
    { icon: <FileCheck size={18} />, color: 'green', title: 'Material Requests', subtitle: '2 pending approval', count: 2, badgeColor: 'orange' },
    { icon: <Truck size={18} />, color: 'purple', title: 'Deliveries Upcoming', subtitle: 'Next 7 days', count: 2, badgeColor: 'blue' },
    { icon: <PackageCheck size={18} />, color: 'blue', title: 'Pending Receipts', subtitle: 'Report material receipt', count: 2, badgeColor: 'blue' },
    { icon: <AlertCircle size={18} />, color: 'orange', title: 'Low Stock Items', subtitle: 'Below minimum level', count: 3, badgeColor: 'orange' },
  ];

  return (
    <div className="card materials-glance-card">
      <div className="card-header">
        <h3 className="card-title">MATERIALS AT A GLANCE</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="materials-list">
        {items.map((item, idx) => (
          <div key={idx} className="material-item">
            <div className={`material-icon ${item.color}`}>
              {item.icon}
            </div>
            <div className="material-text">
              <span className="material-title">{item.title}</span>
              <span className="material-subtitle">{item.subtitle}</span>
            </div>
            <div className={`material-badge bg-${item.badgeColor}`}>
              {item.count}
            </div>
          </div>
        ))}
        
        <div className="material-total">
          <div className="material-icon teal">
            <Box size={18} />
          </div>
          <div className="material-text">
            <span className="material-title">Total Items in Inventory</span>
            <span className="material-subtitle">Across all sites</span>
          </div>
          <div className="material-total-val">
            128
          </div>
        </div>
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Go to Materials <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
