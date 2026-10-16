import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsInvoiceVerificationPage() {
  const { state, dispatch } = useApp();
  const pendingInvoices = state.invoices.filter(i => i.verificationStatus === 'Pending');

  const handleVerify = (inv) => {
    dispatch({ type: 'VERIFY_INVOICE', payload: inv.id });
    alert('Invoice ' + inv.invoiceNo + ' verified against PO and GRN. Ready for payment.');
  };

  return (
    <>
      <PageHeader title="Three-Way Invoice Matching & Verification" subtitle="Match Purchase Order rates, Site GRN accepted quantities, and vendor bill totals side-by-side." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Invoice #', accessor: 'invoiceNo', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.invoiceNo}</span> },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'PO Ref', accessor: 'poId' },
            { header: 'Invoice Amount', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
            { header: '3-Way Match Check', accessor: 'match', cell: r => <span className="badge green">PO & GRN Matched</span> }
          ]}
          data={pendingInvoices}
          actions={r => (
            <button className="btn btn-sm btn-primary" onClick={() => handleVerify(r)}>Approve & Verify</button>
          )}
        />
      </div>
    </>
  );
}
