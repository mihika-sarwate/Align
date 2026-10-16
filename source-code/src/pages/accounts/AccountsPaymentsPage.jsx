import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

const TABS = ['Pending Payments', 'Disbursement History'];

export default function AccountsPaymentsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Pending Payments');
  const [showModal, setShowModal] = useState(false);
  const [selectedInv, setSelectedInv] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [method, setMethod] = useState('NEFT / RTGS');
  const [reference, setReference] = useState('');

  const payableInvoices = state.invoices.filter(i => i.verificationStatus === 'Verified' && i.paymentStatus !== 'Paid');

  const openPayment = (inv) => {
    setSelectedInv(inv);
    const balance = (inv.totalAmount || 0) - (inv.paidAmount || 0);
    setPaymentAmount(balance);
    setReference('TXN-' + Math.floor(100000 + Math.random() * 900000));
    setShowModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedInv) return;
    dispatch({
      type: 'CREATE_PAYMENT',
      payload: {
        invoiceId: selectedInv.id,
        invoiceNo: selectedInv.invoiceNo,
        vendorName: selectedInv.vendorName,
        amount: Number(paymentAmount),
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: method,
        referenceNumber: reference,
        status: 'Completed'
      }
    });
    setShowModal(false);
    alert('Payment of ₹' + Number(paymentAmount).toLocaleString('en-IN') + ' recorded and invoice updated.');
  };

  return (
    <>
      <PageHeader title="Disbursements & Payment Processing" subtitle="Authorize bank transfers for verified vendor invoices and maintain transaction records." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Pending Payments' && (
          <DataTable
            columns={[
              { header: 'Invoice #', accessor: 'invoiceNo', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.invoiceNo}</span> },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Total Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
              { header: 'Balance Due', accessor: 'balance', cell: r => <strong style={{ color: 'var(--color-red)' }}>₹{Number((r.totalAmount || 0) - (r.paidAmount || 0)).toLocaleString('en-IN')}</strong> },
              { header: 'Verification', accessor: 'verificationStatus', cell: r => <span className="badge green">{r.verificationStatus}</span> }
            ]}
            data={payableInvoices}
            actions={r => (
              <button className="btn btn-sm btn-primary" onClick={() => openPayment(r)}>Record Payment</button>
            )}
          />
        )}
        {activeTab === 'Disbursement History' && (
          <DataTable
            columns={[
              { header: 'Payment ID', accessor: 'id' },
              { header: 'Invoice #', accessor: 'invoiceNo' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Disbursed Amount', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
              { header: 'Date', accessor: 'paymentDate' },
              { header: 'Method', accessor: 'paymentMethod' },
              { header: 'UTR / Ref', accessor: 'referenceNumber' }
            ]}
            data={state.payments}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={'Disburse Payment — ' + (selectedInv?.invoiceNo || '')}>
        <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor Beneficiary</label>
            <input disabled type="text" value={selectedInv?.vendorName || ''} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Payment Amount (₹)</label>
              <input required type="number" min="1" max={(selectedInv?.totalAmount || 0) - (selectedInv?.paidAmount || 0)} value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Payment Mode</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="NEFT / RTGS">NEFT / RTGS</option>
                <option value="Cheque">Cheque</option>
                <option value="IMPS">IMPS</option>
                <option value="Petty Cash">Petty Cash</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Bank UTR / Transaction Reference</label>
            <input required type="text" value={reference} onChange={e => setReference(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Disbursement</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
