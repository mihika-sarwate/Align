import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import SurplusDeficitBadge from '../../components/SurplusDeficitBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'Materials Inventory',
  'Equipment Inventory',
  'Stock Movements',
  'Low Stock & Shortages',
  'Transfers',
  'Inventory Reports'
];

export default function InventoryPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Materials Inventory');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  // Place Order Modal
  const [orderModal, setOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const [orderQty, setOrderQty] = useState(100);

  // Raise Issue Modal
  const [issueModal, setIssueModal] = useState(false);
  const [issueItem, setIssueItem] = useState(null);
  const [issueDesc, setIssueDesc] = useState('');
  const [issuePriority, setIssuePriority] = useState('High');

  const openPlaceOrder = (item) => {
    setOrderItem(item);
    setOrderQty(Math.max(1, (item.qtyRequired || 100) - (item.qtyPresent || 0)));
    setOrderModal(true);
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderItem) return;
    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        vendorId: 'VEN-001',
        vendorName: 'UltraTech Cement Ltd',
        projectId: 'PRJ-101',
        siteId: orderItem.location || 'SIT-201',
        linkedMrqId: orderItem.orderId || 'MRQ-201',
        totalAmount: orderQty * 380,
        expectedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        status: 'Draft',
        items: [{ materialName: orderItem.materialName, qty: orderQty, unit: orderItem.unit || 'Bags', rate: 380 }]
      }
    });
    setOrderModal(false);
    alert(`Purchase Order drafted for ${orderQty} ${orderItem.unit || 'units'} of ${orderItem.materialName}`);
  };

  const openRaiseIssue = (item) => {
    setIssueItem(item);
    setIssueDesc(`Material deficit identified: ${item.materialName} at ${item.location}. Required: ${item.qtyRequired}, Present: ${item.qtyPresent}.`);
    setIssueModal(true);
  };

  const handleRaiseIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueItem) return;
    dispatch({
      type: 'CREATE_ISSUE',
      payload: {
        title: `Material Shortage: ${issueItem.materialName}`,
        category: 'Material',
        projectId: 'PRJ-101',
        siteId: issueItem.location || 'SIT-201',
        priority: issuePriority,
        description: issueDesc,
        status: 'Open'
      }
    });
    setIssueModal(false);
    alert(`Issue raised for ${issueItem.materialName}`);
  };

  // Filter items
  const getFilteredData = () => {
    let dataset = state.inventory;
    if (activeTab === 'Low Stock & Shortages') {
      dataset = state.inventory.filter(i => (i.qtyPresent / (i.qtyRequired || 1)) < 1);
    }
    return dataset.filter(item => {
      const matchSearch = !search ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.materialName.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.usage.toLowerCase().includes(search.toLowerCase());
      const matchUsage = !filters.usage || item.usage === filters.usage;
      const matchLoc = !filters.location || item.location === filters.location;
      return matchSearch && matchUsage && matchLoc;
    });
  };

  // Section 12 EXACT 11-column table specification
  const inventoryColumns = [
    { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem' }}>{r.id}</span> },
    { header: 'Order ID', accessor: 'orderId', cell: r => <span style={{ fontSize: '0.8rem' }}>{r.orderId || '-'}</span> },
    { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
    { header: 'Usage', accessor: 'usage', cell: r => <span style={{ fontSize: '0.8rem' }}>{r.usage}</span> },
    { header: 'Task ID', accessor: 'taskId', cell: r => <span style={{ fontSize: '0.8rem', color: 'var(--color-purple)' }}>{r.taskId || '-'}</span> },
    { header: 'Location', accessor: 'location', cell: r => <span style={{ fontSize: '0.8rem' }}>{r.location}</span> },
    { header: 'Quantity Required', accessor: 'qtyRequired', cell: r => <span style={{ fontWeight: 500 }}>{r.qtyRequired} {r.unit}</span> },
    { header: 'Quantity Present', accessor: 'qtyPresent', cell: r => <span style={{ fontWeight: 600 }}>{r.qtyPresent} {r.unit}</span> },
    { header: 'Forthcoming Dates', accessor: 'forthcomingDates', cell: r => <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.forthcomingDates || '-'}</span> },
    { header: 'Surplus/Deficit', accessor: 'surplus', cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} /> },
  ];

  return (
    <>
      <PageHeader
        title="Inventory Management"
        subtitle="Live tracking of site stock, forthcoming requirement dates, surplus/deficit ratios, and replenishment actions."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {['Materials Inventory', 'Low Stock & Shortages'].includes(activeTab) && (
          <>
            <SearchFilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search material, inventory ID, location..."
              filters={[
                { key: 'usage', label: 'All Usages', options: [...new Set(state.inventory.map(i => i.usage))] },
                { key: 'location', label: 'All Locations', options: [...new Set(state.inventory.map(i => i.location))] }
              ]}
              activeFilters={filters}
              onFilterChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
            />
            <DataTable
              columns={inventoryColumns}
              data={getFilteredData()}
              actions={row => (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => openPlaceOrder(row)}
                  >
                    Place Order
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => openRaiseIssue(row)}
                  >
                    Raise Issue
                  </button>
                </div>
              )}
            />
          </>
        )}

        {activeTab === 'Equipment Inventory' && (
          <DataTable
            columns={[
              { header: 'Equipment ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Equipment Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Category', accessor: 'category' },
              { header: 'Location / Site', accessor: 'location' },
              { header: 'Quantity Present', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} units` },
              { header: 'Quantity Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} units` },
              { header: 'Surplus/Deficit', accessor: 'surplus', cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} /> },
              { header: 'Condition', accessor: 'condition', cell: r => <span className={`badge ${r.condition === 'Good' ? 'green' : 'orange'}`}>{r.condition}</span> }
            ]}
            data={state.equipmentInventory}
          />
        )}

        {activeTab === 'Stock Movements' && (
          <DataTable
            columns={[
              { header: 'Movement ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Date', accessor: 'date' },
              { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
              { header: 'Type', accessor: 'type', cell: r => <span className={`badge ${r.type === 'IN' ? 'green' : 'orange'}`}>{r.type}</span> },
              { header: 'Quantity', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
              { header: 'From', accessor: 'fromLocation' },
              { header: 'To', accessor: 'toLocation' },
              { header: 'Ref Document', accessor: 'referenceDoc' }
            ]}
            data={state.stockMovements}
          />
        )}

        {activeTab === 'Transfers' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No pending inter-site stock transfers. All inventory remains allocated to primary project sites.
          </div>
        )}

        {activeTab === 'Inventory Reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px' }}>Inventory Health Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Monitored Materials:</span>
                  <strong>{state.inventory.length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534' }}>
                  <span>Sufficient Stock (&ge;100%):</span>
                  <strong>{state.inventory.filter(i => (i.qtyPresent / (i.qtyRequired || 1)) >= 1).length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b45309' }}>
                  <span>Moderate Shortage (71-99%):</span>
                  <strong>{state.inventory.filter(i => { const r = (i.qtyPresent / (i.qtyRequired || 1)); return r >= 0.71 && r < 1; }).length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#991b1b' }}>
                  <span>Severe Deficit (&le;70%):</span>
                  <strong>{state.inventory.filter(i => (i.qtyPresent / (i.qtyRequired || 1)) <= 0.7).length}</strong>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px' }}>Quick Actions Needed</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Items below 70% surplus threshold require immediate purchase order placement to avoid scheduled task delays.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Place Order Modal */}
      <Modal isOpen={orderModal} onClose={() => setOrderModal(false)} title={`Place Order — ${orderItem?.materialName}`}>
        <form onSubmit={handlePlaceOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Material</label>
            <input disabled type="text" value={orderItem?.materialName || ''} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Delivery Site / Location</label>
              <input disabled type="text" value={orderItem?.location || ''} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Order Quantity ({orderItem?.unit || 'units'})</label>
              <input required type="number" min="1" value={orderQty} onChange={e => setOrderQty(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setOrderModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Purchase Order</button>
          </div>
        </form>
      </Modal>

      {/* Raise Issue Modal */}
      <Modal isOpen={issueModal} onClose={() => setIssueModal(false)} title={`Raise Inventory Issue — ${issueItem?.materialName}`}>
        <form onSubmit={handleRaiseIssueSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Priority</label>
            <select value={issuePriority} onChange={e => setIssuePriority(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Description / Reason for Deficit</label>
            <textarea rows={3} required value={issueDesc} onChange={e => setIssueDesc(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIssueModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-danger">Submit Issue</button>
          </div>
        </form>
      </Modal>
    </>
  );
}