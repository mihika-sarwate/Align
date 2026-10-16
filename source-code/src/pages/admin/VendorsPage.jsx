import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = [
  'All Vendors',
  'Suppliers',
  'Contractors',
  'Purchase Orders',
  'Deliveries',
  'Invoices',
  'Payments',
  'Performance'
];

export default function VendorsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Vendors');
  const [showModal, setShowModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Supplier', contactPerson: '', phone: '', email: '', gstin: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'VEN-' + String(state.vendors.length + 1).padStart(3, '0');
    dispatch({
      type: 'CREATE_VENDOR',
      payload: {
        ...newVendor,
        id,
        rating: 4.5,
        status: 'Active'
      }
    });
    setShowModal(false);
    alert('Vendor ' + newVendor.name + ' (' + id + ') onboarded.');
  };

  const filtered = state.vendors.filter(v => {
    if (activeTab === 'Suppliers') return v.category === 'Supplier' || v.category === 'Cement' || v.category === 'Steel';
    if (activeTab === 'Contractors') return v.category === 'Contractor' || v.category === 'Civil Works';
    return true;
  });

  return (
    <>
      <PageHeader
        title="Vendor & Contractor Directory"
        subtitle="Manage approved supplier relationships, GST compliance, purchase contracts, and quality performance ratings."
        actionLabel="Onboard Vendor"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {['All Vendors', 'Suppliers', 'Contractors', 'Performance'].includes(activeTab) && (
          <DataTable
            columns={[
              { header: 'Vendor ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Vendor Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Category', accessor: 'category' },
              { header: 'Contact Person', accessor: 'contactPerson' },
              { header: 'Phone / Email', accessor: 'phone', cell: r => (
                <div>
                  <div>{r.phone}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.email}</div>
                </div>
              )},
              { header: 'Rating', accessor: 'rating', cell: r => <strong style={{ color: 'var(--color-orange)' }}>★ {r.rating || 4.5}</strong> },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={filtered}
          />
        )}

        {activeTab === 'Purchase Orders' && (
          <DataTable
            columns={[
              { header: 'PO #', accessor: 'id' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Amount', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders}
          />
        )}

        {activeTab === 'Deliveries' && (
          <DataTable
            columns={[
              { header: 'Delivery #', accessor: 'id' },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Expected Date', accessor: 'expectedDate' },
              { header: 'Status', accessor: 'status', cell: r => <span className="badge blue">{r.status}</span> }
            ]}
            data={state.deliveries}
          />
        )}

        {activeTab === 'Invoices' && (
          <DataTable
            columns={[
              { header: 'Invoice #', accessor: 'invoiceNo' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Amount', accessor: 'totalAmount', cell: r => '₹' + Number(r.totalAmount).toLocaleString('en-IN') },
              { header: 'Status', accessor: 'paymentStatus', cell: r => <StatusBadge status={r.paymentStatus || r.status} /> }
            ]}
            data={state.invoices}
          />
        )}

        {activeTab === 'Payments' && (
          <DataTable
            columns={[
              { header: 'Payment Ref', accessor: 'referenceNumber' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Disbursed', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
              { header: 'Date', accessor: 'paymentDate' }
            ]}
            data={state.payments}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Onboard Supplier or Contractor">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor Legal Name</label>
            <input required type="text" value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select value={newVendor.category} onChange={e => setNewVendor({ ...newVendor, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Supplier">Material Supplier</option>
                <option value="Contractor">Civil Contractor</option>
                <option value="Transport">Logistics & Transport</option>
                <option value="Services">Consultant / Testing</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>GSTIN</label>
              <input type="text" value={newVendor.gstin} onChange={e => setNewVendor({ ...newVendor, gstin: e.target.value })} placeholder="27AAAAA0000A1Z5" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Contact Person</label>
              <input required type="text" value={newVendor.contactPerson} onChange={e => setNewVendor({ ...newVendor, contactPerson: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Phone</label>
              <input required type="tel" value={newVendor.phone} onChange={e => setNewVendor({ ...newVendor, phone: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email</label>
            <input required type="email" value={newVendor.email} onChange={e => setNewVendor({ ...newVendor, email: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Onboard Vendor</button>
          </div>
        </form>
      </Modal>
    </>
  );
}