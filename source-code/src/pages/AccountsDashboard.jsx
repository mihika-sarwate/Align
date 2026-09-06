import React from 'react';
import { FileText, CheckCircle, CreditCard, Calendar, Briefcase, Wallet } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AccountsKPICard from '../components/AccountsKPICard';
import InvoiceSummaryChart from '../components/InvoiceSummaryChart';
import PaymentSummaryChart from '../components/PaymentSummaryChart';
import ExpenseOverview from '../components/ExpenseOverview';
import PendingInvoicesTable from '../components/PendingInvoicesTable';
import PaymentsDueTable from '../components/PaymentsDueTable';
import ActivityFeed from '../components/ActivityFeed';
import AccountsQuickActions from '../components/AccountsQuickActions';
import '../App.css';
import './AccountsDashboard.css';

export default function AccountsDashboard() {
  return (
    <div className="app-container">
      <Sidebar role="accounts" />
      <div className="main-content">
        <Header role="accounts" />
        
        <main className="dashboard-content accounts-dashboard">
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Good morning, Anjali! 👋</h1>
              <p className="welcome-subtext">Here's an overview of your accounting activities.</p>
            </div>
          </div>
          
          <div className="accounts-kpi-grid">
            <AccountsKPICard 
              title="Invoices Pending" 
              count="24" 
              amount="₹ 89,45,200" 
              icon={<FileText size={24} />} 
              color="blue" 
              linkText="View Invoices"
            />
            <AccountsKPICard 
              title="Invoices Verified" 
              count="8" 
              amount="₹ 32,18,600" 
              icon={<CheckCircle size={24} />} 
              color="green" 
              linkText="View Verified"
            />
            <AccountsKPICard 
              title="Payments Pending" 
              count="18" 
              amount="₹ 76,30,500" 
              icon={<CreditCard size={24} />} 
              color="orange" 
              linkText="View Payments"
            />
            <AccountsKPICard 
              title="Payments Due This Week" 
              count="6" 
              amount="₹ 24,75,000" 
              icon={<Calendar size={24} />} 
              color="purple" 
              linkText="View Schedule"
            />
            <AccountsKPICard 
              title="Total Paid (This Month)" 
              amount="₹ 1.28 Cr" 
              icon={<Briefcase size={24} />} 
              color="teal" 
              trend="↑ 12% vs last month"
              trendColor="green"
              linkText="View Report"
            />
            <AccountsKPICard 
              title="Expenses This Month" 
              amount="₹ 18,75,600" 
              icon={<Wallet size={24} />} 
              color="red" 
              trend="↑ 8% vs last month"
              trendColor="red"
              linkText="View Expenses"
            />
          </div>
          
          <div className="dashboard-grid accounts-middle-section">
            <div>
              <InvoiceSummaryChart />
            </div>
            <div>
              <PaymentSummaryChart />
            </div>
            <div>
              <ExpenseOverview />
            </div>
          </div>

          <div className="dashboard-grid accounts-bottom-section">
            <div className="col-span-2">
               <PendingInvoicesTable />
            </div>
            <div className="col-span-2">
               <PaymentsDueTable />
            </div>
            <div className="col-span-1">
               <ActivityFeed title="RECENT ACTIVITY" />
            </div>
          </div>

          <AccountsQuickActions />
          
        </main>
      </div>
    </div>
  );
}
