import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All POs', 'Draft', 'Approved', 'Dispatched', 'Received', 'Cancelled'];

export default function POPurchaseOrdersPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All POs');
  const [showModal, setShowModal] = useState(false);
  const [po, setPo] = useState({
    vendorId: 'VEN-001',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    materialName: 'UltraTech OPC 53 Cement',
    qty: 500,
    rate: 380,
    expectedDelivery: ''
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    const id = 'PO-' + (400 + state.purchaseOrders.length + 1);
    const vendor = state.vendors.find(v => v.id === po.vendorId);
    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        id,
        vendorId: po.vendorId,
        vendorName: vendor?.name || 'UltraTech Cement Ltd',
        projectId: po.projectId,
        siteId: po.siteId,
        totalAmount: po.qty * po.rate,
        expectedDelivery: po.expectedDelivery || '2024-09-25',
        status: 'Approved',
        items: [{ materialName: po.materialName, qty: po.qty, unit: 'Bags', rate: po.rate }]
      }
    });
    setShowModal(false);
    alert('Purchase Order ' + id + ' issued.');
  };

  const filtered = state.purchaseOrders.filter(p => {
    if (activeTab === 'All POs') return true;
    return p.status === activeTab;
  });

  return (
    <>
      <PageHeader title="Purchase Orders" subtitle="Issue legally binding POs to approved vendors and track shipment fulfillment." actionLabel="Create PO" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'PO ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Vendor Name', accessor: 'vendorName', cell: r => <span style={{ fontWeight: 600 }}>{r.vendorName}</span> },
            { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
            { header: 'Total Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
            { header: 'Delivery Date', accessor: 'expectedDelivery' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Direct Purchase Order">
        <form onSubmit={handleCreatePO} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor</label>
            <select value={po.vendorId} onChange={e => setPo({ ...po, vendorId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</label>
              <input required type="number" min="1" value={po.qty} onChange={e => setPo({ ...po, qty: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Negotiated Rate (₹)</label>
              <input required type="number" min="1" value={po.rate} onChange={e => setPo({ ...po, rate: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Delivery Date</label>
            <input required type="date" value={po.expectedDelivery} onChange={e => setPo({ ...po, expectedDelivery: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate PO</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
