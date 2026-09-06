import React from 'react';
import './SalesPipelineFunnel.css';

export default function SalesPipelineFunnel() {
  const funnelData = [
    { label: 'Leads', count: '58 (100%)', color: '#8b5cf6', width: '100%' }, // purple
    { label: 'Enquiries', count: '34 (59%)', color: '#3b82f6', width: '85%' }, // blue
    { label: 'Quotations', count: '22 (38%)', color: '#0ea5e9', width: '70%' }, // light blue
    { label: 'Bookings', count: '12 (21%)', color: '#22c55e', width: '55%' }, // green
    { label: 'Agreements', count: '9 (16%)', color: '#f59e0b', width: '40%' }, // orange
    { label: 'Closed Won', count: '6 (10%)', color: '#ef4444', width: '25%' }, // red
  ];

  return (
    <div className="card pipeline-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Sales Pipeline</h3>
        <a href="#" className="view-all-link">View full report</a>
      </div>
      
      <div className="funnel-container">
        {funnelData.map((stage, idx) => (
          <div key={idx} className="funnel-stage-wrapper">
            <div className="funnel-stage-visual">
              <div 
                className="funnel-bar" 
                style={{ 
                  backgroundColor: stage.color, 
                  width: stage.width 
                }}
              >
                <span className="funnel-label">{stage.label}</span>
              </div>
            </div>
            <div className="funnel-count">
              <span className="font-bold">{stage.count.split(' ')[0]}</span>
              <span className="text-secondary" style={{ marginLeft: '4px' }}>{stage.count.split(' ')[1]}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="funnel-footer">
        <span className="text-secondary">Potential Revenue: </span>
        <span className="font-bold" style={{ color: 'var(--color-purple)' }}>₹ 8.45 Cr</span>
      </div>
    </div>
  );
}
