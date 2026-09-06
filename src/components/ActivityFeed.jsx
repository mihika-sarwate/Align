import React from 'react';
import { Package, FileText, AlertCircle, CheckSquare } from 'lucide-react';
import './ActivityFeed.css';

const activities = [
  {
    icon: <Package size={16} />,
    color: 'green',
    title: 'Material received at Site 01 (Project A)',
    desc: 'GRN-087 • 07 Sep 2024, 10:30 AM',
    tag: 'Material Receipt'
  },
  {
    icon: <FileText size={16} />,
    color: 'blue',
    title: 'Invoice INV-284 verified',
    desc: 'Project A • 07 Sep 2024, 09:15 AM',
    tag: 'Invoice'
  },
  {
    icon: <AlertCircle size={16} />,
    color: 'purple', // Mockup has it purple but tag is Issue
    title: 'Issue ISS-024 raised at Site 02',
    desc: 'Project B • 07 Sep 2024, 08:45 AM',
    tag: 'Issue',
    tagColor: 'red'
  },
  {
    icon: <CheckSquare size={16} />,
    color: 'orange',
    title: 'Task TSK-102 submitted for verification',
    desc: 'Site 01 • 07 Sep 2024, 08:10 AM',
    tag: 'Task',
    tagColor: 'orange'
  }
];

export default function ActivityFeed({ title = 'RECENT ACTIVITY' }) {
  return (
    <div className="card activity-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <a href="#" className="view-all-link text-sm">View all</a>
      </div>
      
      <div className="activity-list">
        {activities.map((item, idx) => (
          <div key={idx} className="activity-item hover-scale">
            <div className={`activity-icon ${item.color}`}>
              {item.icon}
            </div>
            <div className="activity-content">
              <span className="activity-title">{item.title}</span>
              <span className="activity-desc">{item.desc}</span>
            </div>
            <div className="activity-tag">
              <span className={`badge ${item.tagColor || item.color}`}>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
