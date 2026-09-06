import React from 'react';
import { ArrowRight } from 'lucide-react';
import './ProjectsTable.css';

const projectsData = [
  { name: 'Project A', sites: 2, progress: 72, status: 'On Track' },
  { name: 'Project B', sites: 3, progress: 48, status: 'At Risk' },
  { name: 'Project C', sites: 2, progress: 91, status: 'On Track' },
  { name: 'Project D', sites: 4, progress: 33, status: 'Delayed' },
  { name: 'Project E', sites: 3, progress: 60, status: 'On Track' },
  { name: 'Project F', sites: 2, progress: 25, status: 'Delayed' },
  { name: 'Project G', sites: 1, progress: 80, status: 'On Track' },
  { name: 'Project H', sites: 1, progress: 15, status: 'Delayed' },
];

export default function ProjectsTable() {
  const getStatusClass = (status) => {
    switch (status) {
      case 'On Track': return 'green';
      case 'At Risk': return 'orange';
      case 'Delayed': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div className="card projects-table-card">
      <div className="card-header">
        <h3 className="card-title">Projects Overview</h3>
      </div>
      
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Sites</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, idx) => (
              <tr key={idx}>
                <td className="font-medium">{project.name}</td>
                <td className="text-secondary">{project.sites}</td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
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
