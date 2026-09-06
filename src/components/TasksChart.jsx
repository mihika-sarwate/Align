import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';
import './TasksChart.css';

const data = [
  { name: 'Assigned', value: 24, percent: '17%', color: '#3b82f6' },
  { name: 'In Progress', value: 57, percent: '40%', color: '#22c55e' },
  { name: 'Submitted', value: 18, percent: '13%', color: '#f59e0b' },
  { name: 'Verified', value: 29, percent: '20%', color: '#8b5cf6' },
  { name: 'Completed', value: 14, percent: '10%', color: '#14b8a6' },
];

export default function TasksChart() {
  return (
    <div className="card tasks-chart-card">
      <div className="card-header">
        <h3 className="card-title">Tasks by Status</h3>
      </div>
      
      <div className="chart-content">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-center-text">
            <span className="total-number">142</span>
            <span className="total-label">Total</span>
          </div>
        </div>
        
        <div className="chart-legend">
          {data.map((item, idx) => (
            <div key={idx} className="legend-item">
              <div className="legend-left">
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.name}</span>
              </div>
              <div className="legend-right">
                <span className="legend-value">{item.value}</span>
                <span className="legend-percent">({item.percent})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link">
          View all tasks <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
