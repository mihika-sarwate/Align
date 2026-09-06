import React from 'react';
import { ShoppingCart, FileCheck, Truck, Package, IndianRupee, Box } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AdvancedKPICard from '../components/AdvancedKPICard';
import PurchasePipeline from '../components/PurchasePipeline';
import ProcurementPendingApprovals from '../components/ProcurementPendingApprovals';
import DeliveriesOverview from '../components/DeliveriesOverview';
import RecentPurchaseOrders from '../components/RecentPurchaseOrders';
import TopVendors from '../components/TopVendors';
import ActivityFeed from '../components/ActivityFeed';
import ProcurementQuickActions from '../components/ProcurementQuickActions';
import '../App.css';
import './ProcurementDashboard.css';

export default function ProcurementDashboard() {
  return (
    <div className="app-container">
      <Sidebar role="po" />
      <div className="main-content">
        <Header role="po" />
        
        <main className="dashboard-content po-dashboard">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Good morning, Priya! 👋</h1>
              <p className="welcome-subtext">Here's the status of procurement activities.</p>
            </div>
          </div>
          
          <div className="po-kpi-grid">
            <AdvancedKPICard 
              title="Total POs" 
              value="24" 
              icon={<ShoppingCart size={24} />} 
              color="blue" 
              subBadges={[
                { color: 'blue', text: '12 Active' },
                { color: 'blue', text: '12 Completed' }
              ]}
            />
            <AdvancedKPICard 
              title="Pending Approvals" 
              value="6" 
              icon={<FileCheck size={24} />} 
              color="green" 
              subBadges={[
                { color: 'green', text: '3 MR' },
                { color: 'green', text: '3 PO' }
              ]}
            />
            <AdvancedKPICard 
              title="Deliveries in Transit" 
              value="8" 
              icon={<Truck size={24} />} 
              color="purple" 
              subBadges={[
                { color: 'blue', text: '7 On Time' },
                { color: 'red', text: '1 Delayed' }
              ]}
            />
            <AdvancedKPICard 
              title="Overdue Deliveries" 
              value="2" 
              icon={<Package size={24} />} 
              color="orange" 
              subBadges={[
                { color: 'red', text: 'Requires Attention' }
              ]}
            />
            <AdvancedKPICard 
              title="PO Value (This Month)" 
              value="₹2.48 Cr" 
              icon={<IndianRupee size={24} />} 
              color="teal" 
              subBadges={[
                { color: 'green', text: 'vs Last Month ↑ 15%' }
              ]}
            />
            <AdvancedKPICard 
              title="Inventory Value" 
              value="₹1.36 Cr" 
              icon={<Box size={24} />} 
              color="green" 
              subBadges={[
                { color: 'green', text: 'Across All Sites' }
              ]}
            />
          </div>
          
          <div className="dashboard-grid po-middle-section">
            <div className="col-span-2 po-pipeline-col">
              <PurchasePipeline />
            </div>
            <div>
              <ProcurementPendingApprovals />
            </div>
            <div>
              <DeliveriesOverview />
            </div>
          </div>

          <div className="dashboard-grid po-bottom-section">
            <div className="col-span-2">
               <RecentPurchaseOrders />
            </div>
            <div className="col-span-2">
               <TopVendors />
            </div>
            <div className="col-span-1">
               <ActivityFeed title="RECENT ACTIVITY" />
            </div>
          </div>

          <ProcurementQuickActions />
          
        </main>
      </div>
    </div>
  );
}
