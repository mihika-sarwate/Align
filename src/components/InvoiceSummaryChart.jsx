import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function InvoiceSummaryChart() {
  const data = [
    { name: 'Pending', value: 24, color: '#3b82f6', percent: '43%' }, // blue
    { name: 'Verified', value: 8, color: '#22c55e', percent: '14%' }, // green
    { name: 'Partially Paid', value: 10, color: '#f59e0b', percent: '18%' }, // yellow
    { name: 'Overdue', value: 14, color: '#ef4444', percent: '25%' }, // red
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card del-overview-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Invoice Summary</h3>
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
            <span className="del-total-val">{total}</span>
            <span className="del-total-lbl">Total Invoices</span>
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
                <span className="del-legend-val">{item.value}</span>
                <span className="del-legend-pct">({item.percent})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="del-alert">
        <div className="del-alert-icon"><AlertTriangle size={16} /></div>
        <div className="del-alert-text text-red">14 invoices are overdue</div>
        <a href="#" className="del-alert-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          View Overdue <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
