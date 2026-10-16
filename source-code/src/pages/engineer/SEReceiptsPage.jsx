import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

const TABS = ['Pending GRNs', 'Verified Receipts', 'Discrepancy Notes'];

export default function SEReceiptsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Pending GRNs');
  const [showModal, setShowModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [acceptedQty, setAcceptedQty] = useState(100);
  const [rejectedQty, setRejectedQty] = useState(0);

  const deliveries = state.deliveries.filter(d => d.siteId === 'SIT-201');

  const openGRN = (del) => {
    setSelectedDelivery(del);
    setAcceptedQty(100);
    setRejectedQty(0);
    setShowModal(true);
  };

  const handleGRNSubmit = (e) => {
    e.preventDefault();
    if (!selectedDelivery) return;
    dispatch({
      type: 'CREATE_RECEIPT',
      payload: {
        deliveryId: selectedDelivery.id,
        poId: selectedDelivery.poId,
        siteId: 'SIT-201',
        vendorName: selectedDelivery.vendorName,
        receivedDate: new Date().toISOString().split('T')[0],
        acceptedQty: Number(acceptedQty),
        rejectedQty: Number(rejectedQty),
        receivedBy: 'Rajesh K',
        status: 'Verified'
      }
    });
    setShowModal(false);
    alert('Goods Receipt Note (GRN) created and verified.');
  };

  return (
    <>
      <PageHeader title="Goods Receipt Notes (GRN)" subtitle="Acknowledge incoming site deliveries, record QA inspection passes, and note damaged goods." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Delivery ID', accessor: 'id' },
            { header: 'PO Reference', accessor: 'poId' },
            { header: 'Vendor', accessor: 'vendorName' },
            { header: 'Expected Date', accessor: 'expectedDate' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
          ]}
          data={deliveries}
          actions={r => (
            <button className="btn btn-sm btn-primary" onClick={() => openGRN(r)}>Record GRN</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={'Create Goods Receipt Note (GRN) — ' + (selectedDelivery?.id || '')}>
        <form onSubmit={handleGRNSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor</label>
            <input disabled type="text" value={selectedDelivery?.vendorName || ''} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Accepted Quantity</label>
              <input required type="number" min="0" value={acceptedQty} onChange={e => setAcceptedQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Rejected / Damaged Quantity</label>
              <input required type="number" min="0" value={rejectedQty} onChange={e => setRejectedQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Verify & Create GRN</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
