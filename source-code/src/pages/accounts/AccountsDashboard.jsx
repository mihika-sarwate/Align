import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import { Receipt, DollarSign, AlertCircle, FileCheck2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccountsDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();

  const pendingVerification = state.invoices.filter(i => i.verificationStatus === 'Pending' || i.status === 'Pending Verification').length;
  const overdueInvoices = state.invoices.filter(i => i.status === 'Overdue').length;
  const totalPaid = state.payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const pendingInvoices = state.invoices.filter(i => i.paymentStatus !== 'Paid');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Anjali Chauhan! (Accounts & Finance)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Vendor invoice verification, three-way matching (PO & GRN), payment authorizations, and project cash outflows.
        </p>
      </div>

      <div className="kpi-grid">
        <KPICard title="Invoices Pending Verification" value={pendingVerification} icon={<Receipt size={22} />} color="orange" subtitle="Require PO & GRN matching" />
        <KPICard title="Active Outstanding Invoices" value={pendingInvoices.length} icon={<AlertCircle size={22} />} color="red" subtitle={overdueInvoices + " overdue past credit period"} />
        <KPICard title="Disbursed Payments (MTD)" value={'₹' + (totalPaid / 100000).toFixed(1) + ' L'} icon={<DollarSign size={22} />} color="green" subtitle="Payments successfully cleared" />
        <KPICard title="Verified for Disbursement" value={state.invoices.filter(i => i.verificationStatus === 'Verified').length} icon={<FileCheck2 size={22} />} color="teal" subtitle="Ready for RTGS / NEFT" />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Invoices Awaiting Action</h3>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/accounts/invoices')}>Manage Invoices</button>
        </div>
        <DataTable
          columns={[
            { header: 'Invoice #', accessor: 'invoiceNo', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.invoiceNo}</span> },
            { header: 'Vendor Name', accessor: 'vendorName', cell: r => <span style={{ fontWeight: 600 }}>{r.vendorName}</span> },
            { header: 'Linked PO', accessor: 'poId' },
            { header: 'Invoice Amount', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
            { header: 'Verification', accessor: 'verificationStatus', cell: r => <span className={'badge ' + (r.verificationStatus === 'Verified' ? 'green' : 'orange')}>{r.verificationStatus}</span> },
            { header: 'Payment Status', accessor: 'paymentStatus', cell: r => <StatusBadge status={r.paymentStatus || r.status} /> }
          ]}
          data={state.invoices.slice(0, 6)}
        />
      </div>
    </div>
  );
}
