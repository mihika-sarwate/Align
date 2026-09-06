import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function BookingsOverview() {
  const data = [
    { name: 'Booking Confirmed', value: 6, color: '#22c55e', percent: '50%' }, // green
    { name: 'Agreement In Process', value: 3, color: '#3b82f6', percent: '25%' }, // blue
    { name: 'Payment Pending', value: 2, color: '#f59e0b', percent: '17%' }, // orange
    { name: 'On Hold', value: 1, color: '#8b5cf6', percent: '8%' }, // purple
  ];

  return (
    <div className="card del-overview-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Bookings Overview</h3>
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
                innerRadius={55}
                outerRadius={75}
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
            <span className="del-total-val">12</span>
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
                <span className="del-legend-pct" style={{ width: 'auto' }}>({item.percent})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
        <div className="bg-green-light" style={{ padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-green)' }}>Total Booking Value</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹ 4.28 Cr</span>
          </div>
          <div className="text-green" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            ↑ 14% vs last month
          </div>
        </div>
      </div>
    </div>
  );
}
