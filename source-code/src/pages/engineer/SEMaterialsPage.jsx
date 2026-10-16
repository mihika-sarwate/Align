import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['Material Catalogue', 'My Material Requests', 'Incoming Deliveries', 'Material Receipts', 'Stock at My Sites'];

export default function SEMaterialsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('My Material Requests');
  const [showModal, setShowModal] = useState(false);
  const [newReq, setNewReq] = useState({ materialName: 'UltraTech OPC 53 Cement', qty: 100, unit: 'Bags', requiredDate: '', reason: '' });

  const myRequests = state.materialRequests.filter(m => m.siteId === 'SIT-201');

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const id = 'MRQ-' + (200 + state.materialRequests.length + 1);
    dispatch({
      type: 'CREATE_MATERIAL_REQUEST',
      payload: {
        ...newReq,
        id,
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        submittedBy: 'Rajesh K (SE)',
        status: 'Pending'
      }
    });
    setShowModal(false);
  };

  return (
    <>
      <PageHeader title="Site Materials" subtitle="Request construction materials, check stock availability, and track inbound deliveries." actionLabel="New Material Request" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'My Material Requests' && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
              { header: 'Quantity', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
              { header: 'Required Date', accessor: 'requiredDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={myRequests}
          />
        )}
        {activeTab === 'Material Catalogue' && (
          <DataTable
            columns={[
              { header: 'Material Code', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material Name', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Unit', accessor: 'unit' },
              { header: 'Standard Rate', accessor: 'standardRate', cell: r => `₹${r.standardRate || 0}` }
            ]}
            data={state.materials}
          />
        )}
        {activeTab === 'Incoming Deliveries' && (
          <DataTable
            columns={[
              { header: 'Delivery ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Expected Date', accessor: 'expectedDate' },
              { header: 'Delivery Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.deliveries.filter(d => d.siteId === 'SIT-201')}
          />
        )}
        {activeTab === 'Material Receipts' && (
          <DataTable
            columns={[
              { header: 'GRN Number', accessor: 'receiptNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.receiptNumber}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Accepted Qty', accessor: 'acceptedQty', cell: r => `${r.acceptedQty} ${r.unit}` },
              { header: 'Rejected Qty', accessor: 'rejectedQty', cell: r => `${r.rejectedQty} ${r.unit}` },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.receipts.filter(rc => rc.siteId === 'SIT-201')}
          />
        )}
        {activeTab === 'Stock at My Sites' && (
          <DataTable
            columns={[
              { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Usage Phase', accessor: 'usage' },
              { header: 'Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
              { header: 'Present on Site', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
              { header: 'Stock Health', accessor: 'surplus', cell: r => {
                const ratio = Math.round((r.qtyPresent / (r.qtyRequired || 1)) * 100);
                return (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: ratio >= 100 ? 'var(--color-green-light)' : ratio >= 71 ? 'var(--color-orange-light)' : 'var(--color-red-light)',
                    color: ratio >= 100 ? '#166534' : ratio >= 71 ? '#9a3412' : '#991b1b'
                  }}>
                    {ratio}%
                  </span>
                );
              }}
            ]}
            data={state.inventory.filter(i => i.siteId === 'SIT-201')}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Site Material Requisition">
        <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Select Material</label>
            <select value={newReq.materialName} onChange={e => setNewReq({ ...newReq, materialName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.materials.map(m => <option key={m.id} value={m.name}>{m.name} ({m.unit})</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</label>
              <input required type="number" min="1" value={newReq.qty} onChange={e => setNewReq({ ...newReq, qty: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Required By Date</label>
              <input required type="date" value={newReq.requiredDate} onChange={e => setNewReq({ ...newReq, requiredDate: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Reason / Task Justification</label>
            <textarea rows={2} required value={newReq.reason} onChange={e => setNewReq({ ...newReq, reason: e.target.value })} placeholder="e.g. Raft slab casting required this weekend." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Requisition</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
