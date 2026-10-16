import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { TrendingUp, UserCheck, FileCheck, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SalesDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const totalLeads = state.leads?.length || 0;
  const activeBookings = state.bookings?.filter(b => b.status === 'Confirmed' || b.status === 'Agreement in Progress').length || 0;
  const pendingQuotations = state.salesQuotations?.filter(q => q.status === 'Sent' || q.status === 'Under Review').length || 0;
  const totalReceivables = state.receivables?.filter(r => r.status !== 'Collected').reduce((acc, r) => acc + (r.amount || 0), 0) || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Riya Sharma! (Sales & CRM Executive)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Customer relationship pipeline, booking token agreements, sales quotations, and milestone payment collections.
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="Total Active Leads" value={totalLeads} icon={<TrendingUp size={22} />} color="blue" subtitle="Inquiries across portals & walk-ins" />
        <KPICard title="Pending Quotations" value={pendingQuotations} icon={<FileCheck size={22} />} color="orange" subtitle="Proposals awaiting client closure" />
        <KPICard title="Active Unit Bookings" value={activeBookings} icon={<UserCheck size={22} />} color="teal" subtitle="Confirmed token allotments" />
        <KPICard title="Outstanding Collections" value={'₹' + (totalReceivables / 10000000).toFixed(1) + ' Cr'} icon={<DollarSign size={22} />} color="green" subtitle="Milestone installments due" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Inquiries & Client Leads</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/sales/leads')}>Pipeline View</button>
        </div>
        <DataTable
          columns={[
            { header: 'Lead ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Client Name', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Requirements', accessor: 'requirements' },
            { header: 'Source', accessor: 'source' },
            { header: 'Next Follow-Up', accessor: 'nextFollowUp' },
            { header: 'Stage', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={(state.leads || []).slice(0, 6)}
        />
      </div>
    </div>
  );
}
