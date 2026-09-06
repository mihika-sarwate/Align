import React from 'react';
import './SiteProgressSummary.css';

const sites = [
  {
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=100&q=80',
    title: 'Project A - Site 01',
    subtitle: 'Residential Tower',
    progress: 78,
    tasks: 8,
    issues: 1
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=100&q=80',
    title: 'Project A - Site 02',
    subtitle: 'Residential Tower',
    progress: 65,
    tasks: 10,
    issues: 1
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&w=100&q=80',
    title: 'Project B - Site 01',
    subtitle: 'Commercial Complex',
    progress: 45,
    tasks: 12,
    issues: 2
  },
  {
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=100&q=80',
    title: 'Project B - Site 02',
    subtitle: 'Commercial Complex',
    progress: 52,
    tasks: 8,
    issues: 1
  },
  {
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=100&q=80',
    title: 'Project C - Site 01',
    subtitle: 'IT Park',
    progress: 63,
    tasks: 10,
    issues: 2
  }
];

export default function SiteProgressSummary() {
  return (
    <div className="card site-progress-card">
      <div className="card-header">
        <h3 className="card-title">SITE PROGRESS SUMMARY</h3>
        <a href="#" className="view-all-link text-sm">View all sites</a>
      </div>
      
      <div className="site-list">
        <div className="site-list-header">
          <div className="site-h-info"></div>
          <div className="site-h-progress"></div>
          <div className="site-h-tasks">Tasks</div>
          <div className="site-h-issues">Issues</div>
        </div>
        
        {sites.map((site, idx) => (
          <div key={idx} className="site-item">
            <div className="site-info">
              <img src={site.image} alt={site.title} className="site-img" />
              <div className="site-text">
                <span className="site-title">{site.title}</span>
                <span className="site-subtitle">{site.subtitle}</span>
              </div>
            </div>
            
            <div className="site-progress">
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${site.progress}%`, backgroundColor: 'var(--color-green)' }}
                ></div>
              </div>
              <span className="site-progress-val">{site.progress}%</span>
            </div>
            
            <div className="site-stats">
              <span className="site-stat-val">{site.tasks}</span>
            </div>
            
            <div className="site-stats">
              <span className="site-stat-val">{site.issues}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
