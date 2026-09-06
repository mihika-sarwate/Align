import React from 'react';
import { PhoneCall, FileText, Users, FileSignature, IndianRupee } from 'lucide-react';
import './TodaysActivities.css';

export default function TodaysActivities() {
  const activities = [
    { icon: <PhoneCall size={16} />, color: 'green', title: 'Follow up with', sub: 'Greenfield Developers', time: '10:00 AM' },
    { icon: <FileText size={16} />, color: 'blue', title: 'Send Quotation', sub: 'Urban Buildcon Pvt. Ltd.', time: '11:30 AM' },
    { icon: <Users size={16} />, color: 'purple', title: 'Meeting with', sub: 'Sunrise Infra', time: '02:30 PM' },
    { icon: <FileSignature size={16} />, color: 'orange', title: 'Prepare Agreement', sub: 'Skyline Constructions', time: '04:00 PM' },
    { icon: <IndianRupee size={16} />, color: 'teal', title: 'Payment Follow up', sub: 'Maple Homes', time: '05:00 PM' },
  ];

  return (
    <div className="card activities-card">
      <div className="card-header border-none padding-b-none">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Today's Activities</h3>
      </div>
      
      <div className="activities-list-horizontal">
        {activities.map((act, idx) => (
          <div key={idx} className="activity-item-h">
            <div className={`act-icon-bg bg-${act.color}-light text-${act.color}`}>
              {act.icon}
            </div>
            <div className="act-info">
              <div className="act-title font-medium">{act.title}</div>
              <div className="act-sub">{act.sub}</div>
              <div className="act-time">{act.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
