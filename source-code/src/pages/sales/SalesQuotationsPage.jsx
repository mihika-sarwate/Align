import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Quotations', 'Sent', 'Accepted', 'Under Review'];

export default function SalesQuotationsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Quotations');
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState({ clientName: '', unitNumber: 'Unit 1402', amount: 25000000 });

  const quotations = state.salesQuotations || [];

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_SALES_QUOTATION',
      payload: {
        ...quote,
        id: 'SQ-' + (quotations.length + 1),
        amount: Number(quote.amount),
        status: 'Sent',
        sentDate: new Date().toISOString().split('T')[0]
      }
    });
    setShowModal(false);
    alert('Sales quotation transmitted.');
  };

  return (
    <>
      <PageHeader title="Sales Quotations & Pricing Sheets" subtitle="Generate commercial proposals, payment milestone schedules, and parking add-on quotes." actionLabel="Create Quote" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Quote #', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Buyer', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Unit Allocated', accessor: 'unitNumber' },
            { header: 'Quote Price', accessor: 'amount', cell: r => '₹' + (r.amount / 10000000).toFixed(2) + ' Cr' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={quotations}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Unit Sales Quotation">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client Name</label>
            <input required type="text" value={quote.clientName} onChange={e => setQuote({ ...quote, clientName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit Number</label>
              <input required type="text" value={quote.unitNumber} onChange={e => setQuote({ ...quote, unitNumber: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>All-Inclusive Price (₹)</label>
              <input required type="number" value={quote.amount} onChange={e => setQuote({ ...quote, amount: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Quote</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
