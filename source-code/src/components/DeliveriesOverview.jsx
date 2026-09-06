import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import './DeliveriesOverview.css';

export default function DeliveriesOverview() {
  const data = [
    { name: 'Delivered', value: 8, color: '#3b82f6' }, // blue
    { name: 'In Transit', value: 8, color: '#22c55e' }, // green
    { name: 'Delayed', value: 2, color: '#f97316' }, // orange
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card del-overview-card">
      <div className="card-header">
        <h3 className="card-title">DELIVERIES OVERVIEW</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="del-chart-container">
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
            <span className="del-total-lbl">Total</span>
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
                <span className="del-legend-pct">({Math.round((item.value / total) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="del-alert">
        <div className="del-alert-icon"><AlertTriangle size={16} /></div>
        <div className="del-alert-text">2 deliveries are delayed</div>
        <a href="#" className="del-alert-link">View Details</a>
      </div>
    </div>
  );
}
