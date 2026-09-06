import React from 'react';
import { ChevronDown, Briefcase, MapPin, CheckSquare, AlertTriangle, IndianRupee } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import PMProjectsTable from '../components/PMProjectsTable';
import PendingApprovals from '../components/PendingApprovals'; // Need to pass props to match PM style
import TasksChart from '../components/TasksChart';
import ActivityFeed from '../components/ActivityFeed';
import UpcomingEvents from '../components/UpcomingEvents';
import SiteProgressSummary from '../components/SiteProgressSummary';
import FinancialSummary from '../components/FinancialSummary';
import '../App.css';
import './ProjectManagerDashboard.css';

export default function ProjectManagerDashboard() {
  return (
    <div className="app-container">
      <Sidebar role="pm" />
      <div className="main-content">
        <Header role="pm" />
        
        <main className="dashboard-content pm-dashboard">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Welcome back, Rahul! 👋</h1>
              <p className="welcome-subtext">Here's the overview of your projects and sites.</p>
            </div>
            <div className="project-selector">
              <Briefcase size={16} />
              <span>All Projects</span>
              <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="kpi-grid">
            <KPICard 
              title="Total Projects" 
              value="3" 
              icon={<Briefcase size={24} />} 
              color="blue" 
              subtitle="Active Projects"
            />
            <KPICard 
              title="Total Sites" 
              value="5" 
              icon={<MapPin size={24} />} 
              color="green" 
              subtitle="Across Projects"
            />
            <KPICard 
              title="Tasks Overview" 
              value="48" 
              icon={<CheckSquare size={24} />} 
              color="purple" 
              subtitle="12 In Progress"
            />
            <KPICard 
              title="Issues" 
              value="7" 
              icon={<AlertTriangle size={24} />} 
              color="orange" 
              subtitle="Open Issues"
            />
            <KPICard 
              title="Budget vs Actual" 
              value="₹ 3.62 Cr / ₹ 4.50 Cr" 
              icon={<IndianRupee size={24} />} 
              color="teal" 
              subtitle="80% of Budget Used"
            />
          </div>
          
          <div className="dashboard-grid middle-section">
            <div className="col-span-2">
              <PMProjectsTable />
            </div>
            <div>
              <PendingApprovals />
            </div>
            <div>
              <TasksChart />
            </div>
          </div>

          <div className="dashboard-grid pm-bottom-section">
            <div className="col-span-2">
               <SiteProgressSummary />
            </div>
            <div>
               <UpcomingEvents />
            </div>
            <div>
               <ActivityFeed />
            </div>
          </div>

          <FinancialSummary />
          
        </main>
      </div>
    </div>
  );
}
