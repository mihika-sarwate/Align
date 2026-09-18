import React from 'react';
import { MoreHorizontal, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import './ProjectTimeline.css';

const timelineEvents = [
  { id: 1, title: 'Project Launch', date: 'Jan 15, 2024', status: 'completed', desc: 'Pre-sales and marketing push.' },
  { id: 2, title: 'Foundation Completed', date: 'Mar 10, 2024', status: 'completed', desc: 'Basement and parking levels.' },
  { id: 3, title: 'Structure 50%', date: 'Jun 20, 2024', status: 'completed', desc: 'Slab casting up to 10th floor.' },
  { id: 4, title: 'Structure Topped Out', date: 'Sep 05, 2024', status: 'in-progress', desc: 'Final roof slab casting.' },
  { id: 5, title: 'MEP & Finishes', date: 'Dec 15, 2024', status: 'pending', desc: 'Electrical, plumbing, and interiors.' },
  { id: 6, title: 'Handover Initiated', date: 'Mar 01, 2025', status: 'pending', desc: 'Possession given to clients.' }
];

export default function ProjectTimeline() {
  return (
    <div className="card project-timeline-card">
      <div className="card-header">
        <h3>Project Timeline (Alpha Tower)</h3>
        <button className="icon-btn"><MoreHorizontal size={18} /></button>
      </div>
      
      <div className="timeline-container">
        {timelineEvents.map((event, idx) => (
          <div key={event.id} className={`timeline-item ${event.status}`}>
            <div className="timeline-marker">
              {event.status === 'completed' && <CheckCircle2 size={18} className="icon-completed" />}
              {event.status === 'in-progress' && <Clock size={18} className="icon-in-progress" />}
              {event.status === 'pending' && <Circle size={18} className="icon-pending" />}
              {idx !== timelineEvents.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <h4 className="timeline-title">{event.title}</h4>
              <div className="timeline-date">
                <Calendar size={12} />
                <span>{event.date}</span>
              </div>
              <p className="timeline-desc">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
