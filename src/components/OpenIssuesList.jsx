import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import './OpenIssuesList.css';

export default function OpenIssuesList() {
  const issues = [
    { id: 'ISS-024', title: '12mm reinforcement does not match specification', site: 'Project A / Site 01', raised: '01 Sep', status: 'Open', priority: 'High' },
    { id: 'ISS-031', title: 'Delay in plumbing material delivery', site: 'Project B / Site 02', raised: '31 Aug', status: 'Open', priority: 'Medium' },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'text-red';
      case 'Medium': return 'text-orange';
      default: return 'text-primary';
    }
  };

  return (
    <div className="card open-issues-card">
      <div className="card-header">
        <h3 className="card-title">OPEN ISSUES</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="issues-list">
        {issues.map((issue, idx) => (
          <div key={idx} className="issue-item">
            <div className="issue-icon text-red bg-red-light">
              <AlertTriangle size={18} />
            </div>
            <div className="issue-content">
              <div className="issue-header-row">
                <span className="issue-id">{issue.id}</span>
                <span className="badge red-outline">{issue.status}</span>
              </div>
              <div className="issue-title">{issue.title}</div>
              <div className="issue-meta">
                <span>{issue.site}</span>
                <span>Raised on {issue.raised}</span>
              </div>
            </div>
            <div className="issue-action">
              <span className={`issue-priority ${getPriorityClass(issue.priority)}`}>{issue.priority}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Create Issue <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
