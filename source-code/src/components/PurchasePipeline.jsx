import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import './PurchasePipeline.css';

export default function PurchasePipeline() {
  const stages = [
    { label: 'Material Request', count: 9, color: 'blue', value: '48,25,000' },
    { label: 'Approved', count: 5, color: 'blue', value: '36,10,000' },
    { label: 'PO Raised', count: 7, color: 'purple', value: '1,02,75,000' },
    { label: 'In Transit', count: 8, color: 'blue', value: '65,30,000' },
    { label: 'Received', count: 12, color: 'green', value: '1,18,40,000' },
    { label: 'Invoiced', count: 10, color: 'green', value: '89,60,000' },
  ];

  return (
    <div className="card pipeline-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Purchase Pipeline</h3>
      </div>
      
      <div className="pipeline-visual">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className={`pipeline-node bg-${stage.color}-light`}>
              <span className={`node-label text-${stage.color}`}>{stage.label.replace(' ', '\n')}</span>
              <div className={`node-count text-white bg-${stage.color}`}>
                {stage.count}
              </div>
            </div>
            {idx < stages.length - 1 && (
              <div className="pipeline-connector">
                <ArrowRight size={16} className="text-secondary" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="pipeline-table-container">
        <table className="pipeline-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th className="text-center">Count</th>
              <th className="text-right">Value (₹)</th>
              <th className="text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage, idx) => (
              <tr key={idx}>
                <td className="font-medium">{stage.label}</td>
                <td className="text-center">{stage.count}</td>
                <td className="text-right">{stage.value}</td>
                <td className="text-center">
                  <button className="icon-btn" style={{ margin: '0 auto' }}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View full pipeline <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
