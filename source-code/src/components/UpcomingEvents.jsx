import React from 'react';
import './UpcomingEvents.css';

const events = [
  {
    date: '04',
    month: 'SEP',
    title: 'Steel delivery',
    subtitle: 'Project A - Site 01',
    time: '09:00 AM',
    dotColor: '#8b5cf6' // Purple
  },
  {
    date: '05',
    month: 'SEP',
    title: 'Concrete pour',
    subtitle: 'Project A - Site 01',
    time: '08:00 AM',
    dotColor: '#f59e0b' // Orange
  },
  {
    date: '06',
    month: 'SEP',
    title: 'Consultant inspection',
    subtitle: 'Project B - Site 02',
    time: '11:00 AM',
    dotColor: '#22c55e' // Green
  },
  {
    date: '07',
    month: 'SEP',
    title: 'Safety audit',
    subtitle: 'Project C - Site 03',
    time: '02:00 PM',
    dotColor: '#3b82f6' // Blue
  }
];

export default function UpcomingEvents() {
  return (
    <div className="card events-card">
      <div className="card-header">
        <h3 className="card-title">Upcoming Events</h3>
        <a href="#" className="view-all-link text-sm">View calendar</a>
      </div>
      
      <div className="events-list">
        {events.map((event, idx) => (
          <div key={idx} className="event-item hover-scale">
            <div className="event-date">
              <span className="event-day">{event.date}</span>
              <span className="event-month">{event.month}</span>
            </div>
            
            <div className="event-details">
              <span className="event-title">{event.title}</span>
              <span className="event-subtitle">{event.subtitle}</span>
            </div>
            
            <div className="event-time-container">
              <span className="event-time">{event.time}</span>
              <span className="event-dot" style={{ backgroundColor: event.dotColor }}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
