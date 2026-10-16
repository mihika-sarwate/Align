import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsVendorStatementsPage() {
  const { state } = useApp();
  const [selectedVendorId, setSelectedVendorId] = useState('VEN-001');

  const vendorInvoices = state.invoices.filter(i => i.vendorId === selectedVendorId);
  const totalBilled = vendorInvoices.reduce((a, b) => a + (b.totalAmount || 0), 0);
  const totalPaid = vendorInvoices.reduce((a, b) => a + (b.paidAmount || 0), 0);

  return (
    <>
      <PageHeader title="Vendor Statement & Ledger" subtitle="Running ledger of purchase commitments, received invoices, and disbursements." />
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Select Vendor Ledger:</label>
          <select value={selectedVendorId} onChange={e => setSelectedVendorId(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '240px' }}>
            {state.vendors.map(v => <option key={v.id} value={v.id}>{v.name} ({v.id})</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Invoiced</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>₹{totalBilled.toLocaleString('en-IN')}</div>
        </div>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Disbursed</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-green)', marginTop: '4px' }}>₹{totalPaid.toLocaleString('en-IN')}</div>
        </div>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Outstanding Balance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-red)', marginTop: '4px' }}>₹{(totalBilled - totalPaid).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Invoice #', accessor: 'invoiceNo' },
            { header: 'Date', accessor: 'invoiceDate' },
            { header: 'PO Ref', accessor: 'poId' },
            { header: 'Billed (₹)', accessor: 'totalAmount', cell: r => Number(r.totalAmount).toLocaleString('en-IN') },
            { header: 'Paid (₹)', accessor: 'paidAmount', cell: r => Number(r.paidAmount || 0).toLocaleString('en-IN') },
            { header: 'Balance (₹)', accessor: 'bal', cell: r => Number((r.totalAmount || 0) - (r.paidAmount || 0)).toLocaleString('en-IN') },
            { header: 'Status', accessor: 'paymentStatus', cell: r => <span className={'badge ' + (r.paymentStatus === 'Paid' ? 'green' : 'orange')}>{r.paymentStatus}</span> }
          ]}
          data={vendorInvoices}
        />
      </div>
    </>
  );
}
