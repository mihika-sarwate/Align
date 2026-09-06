import React from 'react';
import { ChevronDown, CheckCircle, Package, AlertTriangle, FileCheck, ArrowRight } from 'lucide-react';
import './SESiteProgressToday.css';

export default function SESiteProgressToday() {
  const stats = [
    { icon: <CheckCircle size={20} />, label: 'Tasks in Progress', value: '3', color: 'green' },
    { icon: <Package size={20} />, label: 'Cement Bags Received', value: '500', color: 'blue' },
    { icon: <AlertTriangle size={20} />, label: 'Issues Open', value: '2', color: 'orange' },
    { icon: <FileCheck size={20} />, label: 'Daily Report Submitted', value: '✓', color: 'purple' },
  ];

  const activities = [
    { date: '04 SEP', title: 'Steel delivery', time: '09:00 AM' },
    { date: '05 SEP', title: 'Concrete pour', time: '08:00 AM' },
    { date: '06 SEP', title: 'Consultant inspection', time: '11:00 AM' },
  ];

  return (
    <div className="card se-progress-today-card">
      <div className="card-header">
        <h3 className="card-title">SITE PROGRESS TODAY</h3>
        <a href="#" className="view-all-link">View full progress</a>
      </div>
      
      <div className="se-site-selector-dropdown">
        <span>Project A / Site 01</span>
        <ChevronDown size={16} />
      </div>
      
      <div className="se-stats-row">
        {stats.map((stat, idx) => (
          <div key={idx} className="se-stat-item">
            <div className={`se-stat-icon ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="se-stat-val">{stat.value}</div>
            <div className="se-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="se-upcoming-section">
        <h4 className="se-upcoming-title">UPCOMING ACTIVITIES</h4>
        <div className="se-upcoming-list">
          {activities.map((act, idx) => (
            <div key={idx} className="se-upcoming-item">
              <div className="se-upcoming-date">
                <span className="se-date-day">{act.date.split(' ')[0]}</span>
                <span className="se-date-month">{act.date.split(' ')[1]}</span>
              </div>
              <div className="se-upcoming-text">{act.title}</div>
              <div className="se-upcoming-time">{act.time}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all schedule <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
