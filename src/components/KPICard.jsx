import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import './KPICard.css';

export default function KPICard({ title, value, icon, color, trendUp, trendValue, subtitle }) {
  return (
    <div className="card kpi-card hover-scale">
      <div className="kpi-content">
        <div className={`kpi-icon-wrapper ${color}`}>
          {icon}
        </div>
        <div className="kpi-details">
          <span className="kpi-title">{title}</span>
          <span className="kpi-value">{value}</span>
        </div>
      </div>
      <div className="kpi-trend">
        {trendUp !== undefined ? (
          <>
            <span className={`trend-indicator ${trendUp ? 'up' : 'down'}`}>
              {trendUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              {trendValue}
            </span>
            <span className="trend-text">from last week</span>
          </>
        ) : subtitle ? (
          <span className={`trend-text text-${color}`}>{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}
