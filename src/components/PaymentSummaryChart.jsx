import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function PaymentSummaryChart() {
  const data = [
    { name: 'Paid', value: 52, color: '#22c55e', label: '₹ 1.28 Cr (52%)' }, // green
    { name: 'Pending', value: 31, color: '#3b82f6', label: '₹ 76.30 L (31%)' }, // blue
    { name: 'Due This Week', value: 10, color: '#f59e0b', label: '₹ 24.75 L (10%)' }, // yellow
    { name: 'Overdue', value: 7, color: '#ef4444', label: '₹ 15.20 L (7%)' }, // red
  ];

  return (
    <div className="card del-overview-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Payment Summary</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="del-chart-container" style={{ flex: 1 }}>
        <div className="del-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="del-chart-center">
            <span className="del-total-val" style={{ fontSize: '1.25rem' }}>₹ 2.45 Cr</span>
            <span className="del-total-lbl">Total Payments</span>
          </div>
        </div>
        
        <div className="del-legend">
          {data.map((item, idx) => (
            <div key={idx} className="del-legend-item">
              <div className="del-legend-left">
                <span className="del-legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="del-legend-name">{item.name}</span>
              </div>
              <div className="del-legend-right">
                <span className="del-legend-pct" style={{ width: 'auto', color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="del-alert" style={{ backgroundColor: 'var(--color-orange-light)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
        <div className="del-alert-icon" style={{ color: 'var(--color-orange)' }}><AlertTriangle size={16} /></div>
        <div className="del-alert-text" style={{ color: 'var(--color-orange)' }}>₹ 15.20 L payments are overdue</div>
        <a href="#" className="del-alert-link" style={{ color: 'var(--color-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Take Action <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
