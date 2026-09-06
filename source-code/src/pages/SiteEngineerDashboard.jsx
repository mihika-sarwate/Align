import React from 'react';
import { CheckSquare, FileCheck, PackageCheck, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AdvancedKPICard from '../components/AdvancedKPICard';
import SETasksList from '../components/SETasksList';
import MaterialsAtAGlance from '../components/MaterialsAtAGlance';
import SESiteProgressToday from '../components/SESiteProgressToday';
import SiteProgressSummary from '../components/SiteProgressSummary'; // Reusing this but adapting styling slightly if needed
import ActivityFeed from '../components/ActivityFeed';
import OpenIssuesList from '../components/OpenIssuesList';
import QuickActionsBar from '../components/QuickActionsBar';
import '../App.css';
import './SiteEngineerDashboard.css';

export default function SiteEngineerDashboard() {
  return (
    <div className="app-container">
      <Sidebar role="se" />
      <div className="main-content">
        <Header role="se" />
        
        <main className="dashboard-content se-dashboard">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Good morning, XYZ! 👋</h1>
              <p className="welcome-subtext">Here's what's happening at your sites today.</p>
            </div>
          </div>
          
          <div className="kpi-grid">
            <AdvancedKPICard 
              title="My Tasks" 
              value="14" 
              icon={<CheckSquare size={24} />} 
              color="blue" 
              subBadges={[
                { color: 'blue', text: '8 In Progress' },
                { color: 'orange', text: '4 Pending' },
                { color: 'purple', text: '2 Submitted' }
              ]}
            />
            <AdvancedKPICard 
              title="Material Requests" 
              value="3" 
              icon={<FileCheck size={24} />} 
              color="green" 
              subBadges={[
                { color: 'orange', text: '2 Pending Approval' },
                { color: 'green', text: '1 Approved' }
              ]}
            />
            <AdvancedKPICard 
              title="Pending Receipts" 
              value="2" 
              icon={<PackageCheck size={24} />} 
              color="purple" 
              subBadges={[
                { color: 'blue', text: '1 At Site' },
                { color: 'orange', text: '1 In Transit' }
              ]}
            />
            <AdvancedKPICard 
              title="Issues" 
              value="2" 
              icon={<AlertTriangle size={24} />} 
              color="orange" 
              subBadges={[
                { color: 'red', text: '2 Open' }
              ]}
            />
            <AdvancedKPICard 
              title="Site Progress (Avg)" 
              value="65%" 
              color="teal" 
              circularProgress={65}
              subBadges={[
                { color: 'teal', text: 'Across 2 Sites' }
              ]}
            />
          </div>
          
          <div className="dashboard-grid se-middle-section">
            <div className="col-span-2">
              <SETasksList />
            </div>
            <div>
              <MaterialsAtAGlance />
            </div>
            <div>
              <SESiteProgressToday />
            </div>
          </div>

          <div className="dashboard-grid se-bottom-section">
            <div className="col-span-2">
               {/* Reusing SiteProgressSummary for "My Sites" as it fits perfectly */}
               <SiteProgressSummary />
            </div>
            <div>
               <ActivityFeed />
            </div>
            <div>
               <OpenIssuesList />
            </div>
          </div>

          <QuickActionsBar />
          
        </main>
      </div>
    </div>
  );
}
