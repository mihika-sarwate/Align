import React from 'react';
import { FileText, CheckCircle, CreditCard, Calendar, Briefcase, Wallet, DollarSign, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
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
import MaterialsAtAGlance from '../components/MaterialsAtAGlance';
import '../App.css';
import './AccountsDashboard.css';

export default function AccountsDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Sales Summary Calculation
  const totalBooked = (state.bookings || []).reduce((acc, b) => acc + (b.totalAmount || b.amount || 4500000), 0);
  const totalInvoiced = (state.invoices || []).reduce((acc, inv) => acc + (inv.totalAmount || inv.amount || 0), 0);
  const totalReceivables = (state.receivables || []).reduce((acc, r) => acc + (r.amount || 0), 0);
  const totalReceived = (state.receivables || [])
    .filter(r => r.status === 'Collected' || r.status === 'Paid')
    .reduce((acc, r) => acc + (r.amount || 0), 0) || (totalBooked * 0.45);
  const totalOutstanding = (state.receivables || [])
    .filter(r => r.status !== 'Collected' && r.status !== 'Paid')
    .reduce((acc, r) => acc + (r.amount || 0), 0) || (totalBooked * 0.55);

  const formatINR = (val) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} L`;
    return `₹ ${Number(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="app-container">
      <Sidebar role="accounts" />
      <div className="main-content">
        <Header role="accounts" />
        
        <main className="dashboard-content accounts-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header */}
          <div className="dashboard-header" style={{ marginBottom: 0 }}>
            <div>
              <h1 className="welcome-text">Good morning, Anjali! 👋</h1>
              <p className="welcome-subtext">Accounts & Financial Operations Overview</p>
            </div>
          </div>

          {/* Quick Actions (Positioned at Top) */}
          <div style={{ background: 'var(--surface-color)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <AccountsQuickActions />
          </div>

          {/* KPI Grid */}
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

          {/* Sales Summary Section */}
          <div className="card" style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} color="var(--color-primary)" />
                  Sales Summary & Revenue Pipeline
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Total sales booked, customer invoiced billings, collections realized, and outstanding stage receivables.
                </p>
              </div>
              <button 
                className="btn btn-sm btn-outline" 
                onClick={() => navigate('/accounts/reports')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Financial Ledger</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Sales Booked</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>{formatINR(totalBooked)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Across {(state.bookings || []).length} unit agreements</div>
              </div>

              <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #8b5cf6' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Invoiced Billing</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>{formatINR(totalInvoiced)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Stage milestone tax invoices</div>
              </div>

              <div style={{ padding: '14px 18px', background: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Realized Collections</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#15803d', marginTop: '6px' }}>{formatINR(totalReceived)}</div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '4px' }}>Payments credited to bank accounts</div>
              </div>

              <div style={{ padding: '14px 18px', background: '#fffbeb', borderRadius: '6px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Outstanding Receivables</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#b45309', marginTop: '6px' }}>{formatINR(totalOutstanding)}</div>
                <div style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '4px' }}>Pending client installment demand</div>
              </div>
            </div>
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

          <div className="dashboard-grid accounts-extra-section">
            <div>
              <MaterialsAtAGlance />
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
          
        </main>
      </div>
    </div>
  );
}
