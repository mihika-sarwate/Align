import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Invoices', 'Pending Verification', 'Verified', 'Partially Paid', 'Paid', 'Overdue'];

export default function AccountsInvoicesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Invoices');
  const [showModal, setShowModal] = useState(false);
  const [inv, setInv] = useState({ invoiceNo: '', vendorId: 'VEN-001', poId: 'PO-401', receiptId: 'REC-301', amount: 190000, invoiceDate: new Date().toISOString().split('T')[0] });

  const filtered = state.invoices.filter(i => {
    if (activeTab === 'Pending Verification') return i.verificationStatus === 'Pending';
    if (activeTab === 'Verified') return i.verificationStatus === 'Verified';
    if (activeTab === 'Partially Paid') return i.paymentStatus === 'Partially Paid';
    if (activeTab === 'Paid') return i.paymentStatus === 'Paid';
    if (activeTab === 'Overdue') return i.status === 'Overdue';
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const vendor = state.vendors.find(v => v.id === inv.vendorId);
    dispatch({
      type: 'CREATE_INVOICE',
      payload: {
        id: 'INV-' + (state.invoices.length + 1),
        invoiceNo: inv.invoiceNo,
        vendorId: inv.vendorId,
        vendorName: vendor?.name || 'UltraTech Cement Ltd',
        poId: inv.poId,
        receiptId: inv.receiptId,
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        totalAmount: Number(inv.amount),
        paidAmount: 0,
        verificationStatus: 'Pending',
        paymentStatus: 'Unpaid',
        status: 'Pending Verification',
        invoiceDate: inv.invoiceDate
      }
    });
    setShowModal(false);
    alert('Invoice logged and queued for 3-way matching verification.');
  };

  return (
    <>
      <PageHeader title="Vendor Invoices & Billing" subtitle="Register vendor tax invoices, monitor GST credits, and track settlement status." actionLabel="Log Invoice" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Invoice #', accessor: 'invoiceNo', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.invoiceNo}</span> },
            { header: 'Vendor', accessor: 'vendorName', cell: r => <span style={{ fontWeight: 600 }}>{r.vendorName}</span> },
            { header: 'PO Ref', accessor: 'poId' },
            { header: 'Total Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
            { header: 'Paid Amount', accessor: 'paidAmount', cell: r => '₹' + Number(r.paidAmount || 0).toLocaleString('en-IN') },
            { header: 'Balance Due', accessor: 'balance', cell: r => '₹' + Number((r.totalAmount || 0) - (r.paidAmount || 0)).toLocaleString('en-IN') },
            { header: 'Audit', accessor: 'verificationStatus', cell: r => <span className={'badge ' + (r.verificationStatus === 'Verified' ? 'green' : 'orange')}>{r.verificationStatus}</span> },
            { header: 'Payment', accessor: 'paymentStatus', cell: r => <StatusBadge status={r.paymentStatus || r.status} /> }
          ]}
          data={filtered}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Inbound Vendor Tax Invoice">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Invoice Number (from Bill)</label>
            <input required type="text" value={inv.invoiceNo} onChange={e => setInv({ ...inv, invoiceNo: e.target.value })} placeholder="e.g. UT-INV-2024-998" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor</label>
              <select value={inv.vendorId} onChange={e => setInv({ ...inv, vendorId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Invoice Amount (₹)</label>
              <input required type="number" min="1" value={inv.amount} onChange={e => setInv({ ...inv, amount: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Invoice</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
