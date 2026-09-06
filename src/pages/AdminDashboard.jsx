import React from 'react';
import { Calendar } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import KPICard from '../components/KPICard';
import ProjectsTable from '../components/ProjectsTable';
import PendingApprovals from '../components/PendingApprovals';
import TasksChart from '../components/TasksChart';
import ActivityFeed from '../components/ActivityFeed';
import UpcomingEvents from '../components/UpcomingEvents';
import { Building2, MapPin, CheckSquare, AlertTriangle, IndianRupee } from 'lucide-react';
import '../App.css';

export default function AdminDashboard() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <main className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Welcome back, Admin! 👋</h1>
              <p className="welcome-subtext">Here's what's happening across all projects and sites.</p>
            </div>
            <div className="date-picker">
              <Calendar size={16} />
              <span>01 Sep 2024 - 07 Sep 2024</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          
          <div className="kpi-grid">
            <KPICard 
              title="Total Projects" 
              value="8" 
              icon={<Building2 size={24} />} 
              color="blue" 
              trendUp={true} 
              trendValue="2" 
            />
            <KPICard 
              title="Active Sites" 
              value="16" 
              icon={<MapPin size={24} />} 
              color="green" 
              trendUp={true} 
              trendValue="3" 
            />
            <KPICard 
              title="Tasks" 
              value="142" 
              icon={<CheckSquare size={24} />} 
              color="purple" 
              trendUp={true} 
              trendValue="18" 
            />
            <KPICard 
              title="Open Issues" 
              value="27" 
              icon={<AlertTriangle size={24} />} 
              color="orange" 
              trendUp={false} 
              trendValue="5" 
            />
            <KPICard 
              title="Total Expenses" 
              value="₹2.45 Cr" 
              icon={<IndianRupee size={24} />} 
              color="teal" 
              trendUp={true} 
              trendValue="8.5%" 
            />
          </div>
          
          <div className="dashboard-grid middle-section">
            <div className="col-span-2">
              <ProjectsTable />
            </div>
            <div>
              <PendingApprovals />
            </div>
            <div>
              <TasksChart />
            </div>
          </div>
          
          <div className="dashboard-grid bottom-section">
            <div className="col-span-2">
              <ActivityFeed />
            </div>
            <div className="col-span-2">
              <UpcomingEvents />
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
