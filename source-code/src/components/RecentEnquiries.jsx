import React from 'react';
import './RecentEnquiries.css';

export default function RecentEnquiries() {
  const enquiries = [
    { initials: 'GD', color: 'purple', name: 'Greenfield Developers', project: 'Residential Project - Pune', enq: 'Enq-1042', date: '06 Sep 2024', status: 'New', statusColor: 'blue' },
    { initials: 'UB', color: 'blue', name: 'Urban Buildcon Pvt. Ltd.', project: 'Commercial Project - Mumbai', enq: 'Enq-1041', date: '05 Sep 2024', status: 'Contacted', statusColor: 'green' },
    { initials: 'SI', color: 'orange', name: 'Sunrise Infra', project: 'Residential Project - Nagpur', enq: 'Enq-1040', date: '04 Sep 2024', status: 'Proposal Sent', statusColor: 'orange' },
    { initials: 'SC', color: 'purple', name: 'Skyline Constructions', project: 'Mixed Use Project - Bengaluru', enq: 'Enq-1039', date: '03 Sep 2024', status: 'Follow Up', statusColor: 'purple' },
    { initials: 'MH', color: 'teal', name: 'Maple Homes', project: 'Residential Project - Ahmedabad', enq: 'Enq-1038', date: '02 Sep 2024', status: 'New', statusColor: 'blue' },
  ];

  return (
    <div className="card recent-enq-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Recent Enquiries</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="recent-enq-list">
        {enquiries.map((enq, idx) => (
          <div key={idx} className="recent-enq-item">
            <div className={`enq-avatar bg-${enq.color}-light text-${enq.color}`}>{enq.initials}</div>
            
            <div className="enq-info">
              <div className="enq-name">{enq.name}</div>
              <div className="enq-project">{enq.project}</div>
            </div>
            
            <div className="enq-meta">
              <div className="enq-id">{enq.enq}</div>
              <div className="enq-date">{enq.date}</div>
            </div>
            
            <div className="enq-status">
              <span className={`badge ${enq.statusColor}-outline`} style={{ padding: '2px 8px', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                {enq.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
