import React from 'react';
import { ArrowRight } from 'lucide-react';
import './ProjectsTable.css';

const projectsData = [
  { 
    name: 'Project A', subtitle: 'Residential Tower', sites: 2, 
    progress: 72, tasks: 18, issues: 2, 
    budgetActual: '1.45 Cr', budgetTotal: '2.00 Cr', budgetPercent: 72, status: 'green' 
  },
  { 
    name: 'Project B', subtitle: 'Commercial Complex', sites: 2, 
    progress: 48, tasks: 20, issues: 3, 
    budgetActual: '1.10 Cr', budgetTotal: '2.50 Cr', budgetPercent: 44, status: 'orange' 
  },
  { 
    name: 'Project C', subtitle: 'IT Park', sites: 1, 
    progress: 63, tasks: 10, issues: 2, 
    budgetActual: '1.07 Cr', budgetTotal: '2.00 Cr', budgetPercent: 54, status: 'orange' 
  },
];

export default function PMProjectsTable() {
  return (
    <div className="card projects-table-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Projects Overview</h3>
      </div>
      
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Sites</th>
              <th>Progress</th>
              <th>Tasks</th>
              <th>Issues</th>
              <th>Budget Status</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, idx) => (
              <tr key={idx}>
                <td>
                  <div className="font-medium text-primary">{project.name}</div>
                  <div className="text-xs text-secondary">{project.subtitle}</div>
                </td>
                <td className="text-secondary font-medium">{project.sites}</td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar-bg" style={{ width: '60px' }}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
                <td className="font-medium">{project.tasks}</td>
                <td className="font-medium">{project.issues}</td>
                <td>
                  <div className="text-xs font-medium text-primary">₹ {project.budgetActual} / ₹ {project.budgetTotal}</div>
                  <div className={`text-xs font-semibold text-${project.status}`}>{project.budgetPercent}%</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link">
          View all projects <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
