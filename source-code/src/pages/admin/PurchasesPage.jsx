import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'Material Requests',
  'Pending Approvals',
  'Enquiries / RFQs',
  'Quotation Comparisons',
  'Purchase Orders',
  'Deliveries',
  'Material Receipts',
  'Invoices',
  'Verification',
  'Payments',
  'Purchase Reports'
];

export default function PurchasesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Purchase Orders');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newPo, setNewPo] = useState({
    vendorId: 'VEN-001',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    materialName: 'UltraTech OPC 53 Cement',
    qty: 500,
    rate: 380,
    expectedDelivery: '2024-09-25'
  });

  const handleCreatePo = (e) => {
    e.preventDefault();
    const id = 'PO-' + (400 + state.purchaseOrders.length + 1);
    const vendor = state.vendors.find(v => v.id === newPo.vendorId);
    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        id,
        vendorId: newPo.vendorId,
        vendorName: vendor?.name || 'UltraTech Cement Ltd',
        projectId: newPo.projectId,
        siteId: newPo.siteId,
        totalAmount: newPo.qty * newPo.rate,
        expectedDelivery: newPo.expectedDelivery,
        status: 'Approved',
        items: [{ materialName: newPo.materialName, qty: newPo.qty, unit: 'Bags', rate: newPo.rate }]
      }
    });
    setShowModal(false);
    alert('Purchase order ' + id + ' issued.');
  };

  return (
    <>
      <PageHeader
        title="Purchases & Procurement Operations"
        subtitle="Manage the complete procurement lifecycle: Requisitions → RFQs → Quotations → POs → Deliveries → GRN → Invoices → Payments."
        actionLabel="Create PO"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search purchase records..." />

        {activeTab === 'Material Requests' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Quantity', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.materialRequests}
          />
        )}

        {activeTab === 'Purchase Orders' && (
          <DataTable
            columns={[
              { header: 'PO ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Vendor Name', accessor: 'vendorName', cell: r => <span style={{ fontWeight: 600 }}>{r.vendorName}</span> },
              { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
              { header: 'Total Value', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
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
              { header: 'PO Reference', accessor: 'poId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Destination Site', accessor: 'siteId' },
              { header: 'Expected Delivery', accessor: 'expectedDate' },
              { header: 'Status', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
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
              { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
            ]}
            data={state.receipts}
          />
        )}

        {activeTab === 'Invoices' && (
          <DataTable
            columns={[
              { header: 'Invoice #', accessor: 'invoiceNo' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Total Amount', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
              { header: 'Verification', accessor: 'verificationStatus', cell: r => <span className="badge green">{r.verificationStatus}</span> },
              { header: 'Payment', accessor: 'paymentStatus', cell: r => <StatusBadge status={r.paymentStatus || r.status} /> }
            ]}
            data={state.invoices}
          />
        )}

        {activeTab === 'Payments' && (
          <DataTable
            columns={[
              { header: 'Payment ID', accessor: 'id' },
              { header: 'Invoice #', accessor: 'invoiceNo' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Disbursed (₹)', accessor: 'amount', cell: r => Number(r.amount).toLocaleString('en-IN') },
              { header: 'Date', accessor: 'paymentDate' },
              { header: 'Ref #', accessor: 'referenceNumber' }
            ]}
            data={state.payments}
          />
        )}

        {activeTab === 'Pending Approvals' && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Quantity', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required By', accessor: 'requiredDate' },
              { header: 'Submitted By', accessor: 'submittedByName' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.materialRequests.filter(r => r.status === 'Pending')}
          />
        )}

        {activeTab === 'Enquiries / RFQs' && (
          <DataTable
            columns={[
              { header: 'RFQ ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Title', accessor: 'title' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Vendors Invited', accessor: 'vendors', cell: r => r.vendors?.length ? `${r.vendors.length} Vendors` : 'All Vendors' },
              { header: 'Submission Deadline', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.rfqs}
          />
        )}

        {activeTab === 'Quotation Comparisons' && (
          <DataTable
            columns={[
              { header: 'Quotation ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Linked RFQ', accessor: 'rfqId' },
              { header: 'Unit Rate', accessor: 'unitRate', cell: r => `₹${r.unitRate || 0}` },
              { header: 'Total Value', accessor: 'totalAmount', cell: r => `₹${(r.totalAmount || 0).toLocaleString('en-IN')}` },
              { header: 'Delivery Lead Time', accessor: 'deliveryDays', cell: r => `${r.deliveryDays || 3} days` },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.quotations}
          />
        )}

        {activeTab === 'Verification' && (
          <DataTable
            columns={[
              { header: 'GRN Number', accessor: 'receiptNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.receiptNumber}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Received Qty', accessor: 'receivedQty', cell: r => `${r.receivedQty} ${r.unit}` },
              { header: 'Accepted Qty', accessor: 'acceptedQty', cell: r => `${r.acceptedQty} ${r.unit}` },
              { header: 'Rejected Qty', accessor: 'rejectedQty', cell: r => `${r.rejectedQty} ${r.unit}` },
              { header: 'Inspection Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.receipts}
          />
        )}

        {activeTab === 'Purchase Reports' && (
          <DataTable
            columns={[
              { header: 'PO Number', accessor: 'poNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.poNumber}</span> },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Order Value', accessor: 'totalAmount', cell: r => `₹${(r.totalAmount || 0).toLocaleString('en-IN')}` },
              { header: 'Expected Date', accessor: 'expectedDelivery' },
              { header: 'Order Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders}
          />
        )}

      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Direct Purchase Order">
        <form onSubmit={handleCreatePo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor</label>
            <select value={newPo.vendorId} onChange={e => setNewPo({ ...newPo, vendorId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</label>
              <input required type="number" min="1" value={newPo.qty} onChange={e => setNewPo({ ...newPo, qty: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Negotiated Rate (₹)</label>
              <input required type="number" min="1" value={newPo.rate} onChange={e => setNewPo({ ...newPo, rate: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Delivery Date</label>
            <input required type="date" value={newPo.expectedDelivery} onChange={e => setNewPo({ ...newPo, expectedDelivery: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
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