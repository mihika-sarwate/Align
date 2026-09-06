import React from 'react';
import { ArrowRight } from 'lucide-react';
import './AccountsKPICard.css';

export default function AccountsKPICard({ title, count, amount, icon, color, trend, trendColor, linkText }) {
  return (
    <div className="card accounts-kpi-card hover-scale">
      <div className="accounts-kpi-content">
        <div className={`kpi-icon-wrapper ${color}`}>
          {icon}
        </div>
        <div className="accounts-kpi-info">
          <h3 className="kpi-title">{title}</h3>
          <div className="accounts-kpi-values">
            {count && <span className="accounts-kpi-count">{count}</span>}
            <span className={`accounts-kpi-amount ${!count ? 'accounts-kpi-amount-large' : ''}`}>{amount}</span>
          </div>
          {trend && (
            <div className={`accounts-kpi-trend text-${trendColor}`}>
              {trend}
            </div>
          )}
        </div>
      </div>
      <div className="accounts-kpi-footer">
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {linkText} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
