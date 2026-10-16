import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'Material Catalogue',
  'Material Requests',
  'Approvals',
  'Purchase Pipeline',
  'Deliveries',
  'Material Receipts',
  'Material Reports'
];

export default function MaterialsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Material Catalogue');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mat, setMat] = useState({ name: '', category: 'Raw Materials', unit: 'Bags', minStockLevel: 100 });

  const handleCreateMaterial = (e) => {
    e.preventDefault();
    const id = 'MAT-' + (100 + state.materials.length + 1);
    dispatch({
      type: 'CREATE_MATERIAL',
      payload: { ...mat, id, minStockLevel: Number(mat.minStockLevel) }
    });
    setShowModal(false);
    alert('Material registered in central catalogue.');
  };

  const handleApproveMRQ = (req) => {
    dispatch({ type: 'APPROVE_MATERIAL_REQUEST', payload: { id: req.id, approvedBy: 'Arjun Sharma (Admin)' } });
  };

  const pendingMRQs = state.materialRequests.filter(m => m.status === 'Pending');

  return (
    <>
      <PageHeader
        title="Materials Management"
        subtitle="Catalogue administration, multi-stage requisition approvals, inbound delivery tracking, and GRN receipts."
        actionLabel="Add Material"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search materials, requests..." />

        {activeTab === 'Material Catalogue' && (
          <DataTable
            columns={[
              { header: 'Material ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Category', accessor: 'category' },
              { header: 'Standard Unit', accessor: 'unit' },
              { header: 'Minimum Buffer Level', accessor: 'minStockLevel', cell: r => (r.minStockLevel || 50) + ' ' + r.unit }
            ]}
            data={state.materials}
          />
        )}

        {activeTab === 'Material Requests' && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
              { header: 'Requisition Qty', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
              { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
              { header: 'Required Date', accessor: 'requiredDate' },
              { header: 'Indented By', accessor: 'submittedBy' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.materialRequests}
            actions={row => row.status === 'Pending' && (
              <button className="btn btn-sm btn-primary" onClick={() => handleApproveMRQ(row)}>Approve</button>
            )}
          />
        )}

        {activeTab === 'Approvals' && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id' },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Requisition Qty', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required Date', accessor: 'requiredDate' }
            ]}
            data={pendingMRQs}
            actions={row => (
              <button className="btn btn-sm btn-primary" onClick={() => handleApproveMRQ(row)}>Approve Indent</button>
            )}
          />
        )}

        {activeTab === 'Purchase Pipeline' && (
          <DataTable
            columns={[
              { header: 'PO Number', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
              { header: 'Committed Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
              { header: 'Delivery Date', accessor: 'expectedDelivery' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders}
          />
        )}

        {activeTab === 'Deliveries' && (
          <DataTable
            columns={[
              { header: 'Delivery ID', accessor: 'id' },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Destination Site', accessor: 'siteId' },
              { header: 'Expected Date', accessor: 'expectedDate' },
              { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Delivered' ? 'green' : 'blue')}>{r.status}</span> }
            ]}
            data={state.deliveries}
          />
        )}

        {activeTab === 'Material Receipts' && (
          <DataTable
            columns={[
              { header: 'GRN ID', accessor: 'id' },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Accepted Quantity', accessor: 'acceptedQty' },
              { header: 'Rejected Quantity', accessor: 'rejectedQty' },
              { header: 'Audited Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
            ]}
            data={state.receipts}
          />
        )}

        {activeTab === 'Material Reports' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Aggregated material burn rate and project inventory forecasts.
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Item to Material Catalogue">
        <form onSubmit={handleCreateMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Material Name</label>
            <input required type="text" value={mat.name} onChange={e => setMat({ ...mat, name: e.target.value })} placeholder="e.g. Ready Mix Concrete (RMC) M25" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select value={mat.category} onChange={e => setMat({ ...mat, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Structural Steel">Structural Steel</option>
                <option value="Aggregates">Aggregates</option>
                <option value="Finishes">Finishes</option>
                <option value="Electrical & Plumbing">Electrical & Plumbing</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Standard Unit</label>
              <input required type="text" value={mat.unit} onChange={e => setMat({ ...mat, unit: e.target.value })} placeholder="e.g. cu.m, Bags, MT" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Minimum Stock Buffer Level</label>
            <input required type="number" min="1" value={mat.minStockLevel} onChange={e => setMat({ ...mat, minStockLevel: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save to Catalogue</button>
          </div>
        </form>
      </Modal>
    </>
  );
}