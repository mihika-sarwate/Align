import React from 'react';
import { UserPlus, Users, MessageSquare, FileText, Calendar, Briefcase, FileSignature, IndianRupee } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AccountsKPICard from '../components/AccountsKPICard'; // We can reuse this as it matches perfectly
import SalesPipelineFunnel from '../components/SalesPipelineFunnel';
import RecentEnquiries from '../components/RecentEnquiries';
import BookingsOverview from '../components/BookingsOverview';
import RecentBookingsTable from '../components/RecentBookingsTable';
import SalesPaymentSchedule from '../components/SalesPaymentSchedule';
import ReceivablesSummary from '../components/ReceivablesSummary';
import TodaysActivities from '../components/TodaysActivities';
import SalesQuickActions from '../components/SalesQuickActions';
import '../App.css';
import './SalesDashboard.css';

export default function SalesDashboard() {
  return (
    <div className="app-container">
      <Sidebar role="sales" />
      <div className="main-content">
        <Header role="sales" />
        
        <main className="dashboard-content sales-dashboard">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Good morning, Riya! 👋</h1>
              <p className="welcome-subtext">Here's the overview of your sales activities.</p>
            </div>
          </div>
          
          <div className="sales-kpi-grid">
            <AccountsKPICard 
              title="Total Leads" 
              count="58" 
              icon={<UserPlus size={24} />} 
              color="purple" 
              trend="↑ 18% vs last week"
              trendColor="green"
              linkText="View Leads"
            />
            <AccountsKPICard 
              title="Enquiries" 
              count="34" 
              icon={<MessageSquare size={24} />} 
              color="blue" 
              trend="↑ 12% vs last week"
              trendColor="green"
              linkText="View Enquiries"
            />
            <AccountsKPICard 
              title="Quotations" 
              count="22" 
              icon={<FileText size={24} />} 
              color="orange" 
              trend="↑ 10% vs last week"
              trendColor="green"
              linkText="View Quotations"
            />
            <AccountsKPICard 
              title="Bookings" 
              count="12" 
              icon={<Briefcase size={24} />} 
              color="green" 
              trend="↑ 9% vs last week"
              trendColor="green"
              linkText="View Bookings"
            />
            <AccountsKPICard 
              title="Agreements" 
              count="9" 
              icon={<FileSignature size={24} />} 
              color="red" 
              trend="↑ 13% vs last week"
              trendColor="green"
              linkText="View Agreements"
            />
            <AccountsKPICard 
              title="Revenue (This Month)" 
              amount="₹ 3.62 Cr" 
              icon={<IndianRupee size={24} />} 
              color="teal" 
              trend="↑ 16% vs last month"
              trendColor="green"
              linkText="View Revenue"
            />
          </div>
          
          <div className="dashboard-grid sales-middle-section">
            <div>
              <SalesPipelineFunnel />
            </div>
            <div>
              <RecentEnquiries />
            </div>
            <div>
              <BookingsOverview />
            </div>
          </div>

          <div className="dashboard-grid sales-bottom-section">
            <div className="col-span-2">
               <RecentBookingsTable />
            </div>
            <div className="col-span-2">
               <SalesPaymentSchedule />
            </div>
            <div className="col-span-1">
               <ReceivablesSummary />
            </div>
          </div>

          <div className="sales-footer-section">
             <TodaysActivities />
             <SalesQuickActions />
          </div>
          
        </main>
      </div>
    </div>
  );
}
