import React from 'react';
import './KPICard.css';

export default function AdvancedKPICard({ title, value, icon, color, subBadges, circularProgress }) {
  return (
    <div className="card kpi-card hover-scale" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="kpi-content" style={{ alignItems: 'flex-start' }}>
        <div className={`kpi-icon-wrapper ${color}`}>
          {icon}
        </div>
        <div className="kpi-details" style={{ flex: 1 }}>
          <span className="kpi-title">{title}</span>
          <span className="kpi-value">{value}</span>
        </div>
        
        {circularProgress && (
          <div className="circular-progress" style={{ 
            width: '40px', height: '40px', 
            borderRadius: '50%', 
            background: `conic-gradient(var(--color-teal) ${circularProgress}%, var(--color-teal-light) 0)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: 'white', borderRadius: '50%' }}></div>
          </div>
        )}
      </div>
      
      <div className="kpi-sub-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto' }}>
        {subBadges && subBadges.map((badge, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: `var(--color-${badge.color})` }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
