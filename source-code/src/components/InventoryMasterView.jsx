import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import TabNav from './TabNav';
import DataTable from './common/DataTable';
import SurplusDeficitBadge from './SurplusDeficitBadge';
import SearchFilterBar from './SearchFilterBar';
import ProjectSiteSelect from './ProjectSiteSelect';
import Modal from './Modal';
import { Package, Plus, AlertCircle, ArrowRightLeft } from 'lucide-react';

/**
 * Shared Eleven-Column Inventory Table Component
 *
 * Mandatory exact 11-column format across Admin, PM, Procurement, and Accounts:
 * | Inventory ID | Order ID | Material | Usage | Task ID | Location | Quantity Required | Quantity Present | Forthcoming Dates | Surplus/Deficit | Quick Actions |
 *
 * ID Rules: MAT identifies materials, EQP identifies equipment (XXX-YYY-00n).
 * Surplus/Deficit (%) = (Quantity Present / Quantity Required) * 100.
 * Green: >=100%, Amber: >70% & <100%, Red: <=70%.
 */
export default function InventoryMasterView({
  allowedProjectIds = null,
  allowedSiteIds = null,
  role = 'admin',
  canPlaceOrder = true,
  canRaiseIssue = true,
  canAdjustStock = false,
  showTransactionHistory = true,
  title = 'Inventory Management',
  subtitle = 'Live tracking of site stock, forthcoming requirement dates, surplus/deficit ratios, and replenishment actions.'
}) {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Materials Inventory');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedSiteFilter, setSelectedSiteFilter] = useState('');

  // Quick Action: Place Order Modal
  const [orderModal, setOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const [orderQty, setOrderQty] = useState(100);

  // Quick Action: Raise Issue Modal
  const [issueModal, setIssueModal] = useState(false);
  const [issueItem, setIssueItem] = useState(null);
  const [issueDesc, setIssueDesc] = useState('');
  const [issuePriority, setIssuePriority] = useState('High');

  // Stock Adjustment / Movement Modal
  const [adjustModal, setAdjustModal] = useState(false);
  const [adjustItem, setAdjustItem] = useState(null);
  const [adjustType, setAdjustType] = useState('Issue');
  const [adjustQty, setAdjustQty] = useState(10);
  const [adjustNote, setAdjustNote] = useState('');

  const openPlaceOrder = (item) => {
    setOrderItem(item);
    setOrderQty(Math.max(1, (item.qtyRequired || 100) - (item.qtyPresent || 0)));
    setOrderModal(true);
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderItem) return;
    const poId = 'PO-' + (400 + (state.purchaseOrders?.length || 0) + 1);
    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        id: poId,
        vendorId: 'VEN-001',
        vendorName: 'UltraTech Cement Ltd',
        projectId: orderItem.projectId || 'PRJ-101',
        siteId: orderItem.siteId || orderItem.location || 'SIT-201',
        linkedMrqId: orderItem.orderId || 'MRQ-201',
        totalAmount: orderQty * 380,
        expectedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        status: 'Draft',
        items: [{ materialName: orderItem.materialName || orderItem.material, qty: orderQty, unit: orderItem.unit || 'Bags', rate: 380 }]
      }
    });
    setOrderModal(false);
    alert(`Purchase Order ${poId} drafted for ${orderQty} ${orderItem.unit || 'units'} of ${orderItem.materialName || orderItem.material}`);
  };

  const openRaiseIssue = (item) => {
    setIssueItem(item);
    setIssueDesc(`Material deficit identified: ${item.materialName || item.material} at ${item.location}. Required: ${item.qtyRequired}, Present: ${item.qtyPresent}.`);
    setIssueModal(true);
  };

  const handleRaiseIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueItem) return;
    dispatch({
      type: 'CREATE_ISSUE',
      payload: {
        title: `Material Shortage: ${issueItem.materialName || issueItem.material}`,
        category: 'Material',
        projectId: issueItem.projectId || 'PRJ-101',
        siteId: issueItem.siteId || issueItem.location || 'SIT-201',
        priority: issuePriority,
        description: issueDesc,
        status: 'Open'
      }
    });
    setIssueModal(false);
    alert(`Issue raised for ${issueItem.materialName || issueItem.material}`);
  };

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (!adjustItem) return;
    dispatch({
      type: 'STOCK_MOVEMENT',
      payload: {
        inventoryId: adjustItem.id,
        movementType: adjustType,
        qty: Number(adjustQty),
        reference: 'ADJ-' + Date.now().toString().slice(-5),
        by: state.employees?.find(e => e.role === role)?.name || 'Admin',
        note: adjustNote || 'Authorized stock adjustment'
      }
    });
    setAdjustModal(false);
    alert(`Stock ${adjustType} of ${adjustQty} ${adjustItem.unit || 'units'} recorded.`);
  };

  // Base dataset scoped by role permissions
  const getScopedInventory = () => {
    let dataset = state.inventory || [];
    if (allowedProjectIds && allowedProjectIds.length > 0) {
      dataset = dataset.filter(i => !i.projectId || allowedProjectIds.includes(i.projectId));
    }
    if (allowedSiteIds && allowedSiteIds.length > 0) {
      dataset = dataset.filter(i => allowedSiteIds.includes(i.siteId) || allowedSiteIds.includes(i.location));
    }
    if (selectedSiteFilter) {
      dataset = dataset.filter(i => i.siteId === selectedSiteFilter || i.location === selectedSiteFilter);
    }
    return dataset;
  };

  // Filter items
  const getFilteredData = () => {
    let dataset = getScopedInventory();
    if (activeTab === 'Low Stock & Shortages') {
      dataset = dataset.filter(i => (i.qtyPresent / (i.qtyRequired || 1)) < 1);
    }
    return dataset.filter(item => {
      const matName = item.materialName || item.material || '';
      const matchSearch = !search ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        matName.toLowerCase().includes(search.toLowerCase()) ||
        (item.location || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.usage || '').toLowerCase().includes(search.toLowerCase());
      const matchUsage = !filters.usage || item.usage === filters.usage;
      return matchSearch && matchUsage;
    });
  };

  // EXACT MANDATORY 11-COLUMN FORMAT (Section 2.8, 3.5, 6.1, 9)
  const columns = [
    {
      header: 'Inventory ID',
      accessor: 'id',
      cell: r => (
        <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {r.id}
        </span>
      )
    },
    {
      header: 'Order ID',
      accessor: 'orderId',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.orderId || '-'}</span>
    },
    {
      header: 'Material',
      accessor: 'material',
      cell: r => <span style={{ fontWeight: 600 }}>{r.materialName || r.material}</span>
    },
    {
      header: 'Usage',
      accessor: 'usage',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.usage || 'In-use'}</span>
    },
    {
      header: 'Task ID',
      accessor: 'taskId',
      cell: r => <span style={{ fontSize: '0.8rem', color: 'var(--color-purple)' }}>{r.taskId || '-'}</span>
    },
    {
      header: 'Location',
      accessor: 'location',
      cell: r => {
        const siteObj = state.sites?.find(s => s.id === r.siteId || s.id === r.location);
        return (
          <span style={{ fontSize: '0.8rem' }}>
            {siteObj ? `${siteObj.name} (${siteObj.id})` : (r.location || '-')}
          </span>
        );
      }
    },
    {
      header: 'Quantity Required',
      accessor: 'qtyRequired',
      cell: r => <span style={{ fontWeight: 500 }}>{r.qtyRequired} {r.unit || 'units'}</span>
    },
    {
      header: 'Quantity Present',
      accessor: 'qtyPresent',
      cell: r => <span style={{ fontWeight: 600 }}>{r.qtyPresent} {r.unit || 'units'}</span>
    },
    {
      header: 'Forthcoming Dates',
      accessor: 'forthcomingDates',
      cell: r => <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.forthcomingDates || '-'}</span>
    },
    {
      header: 'Surplus/Deficit',
      accessor: 'surplus',
      cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} />
    },
    {
      header: 'Quick Actions',
      accessor: 'actions',
      sortable: false,
      cell: r => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {canPlaceOrder && (
            <button
              className="btn btn-sm btn-primary"
              style={{ fontSize: '0.72rem', padding: '3px 7px', whiteSpace: 'nowrap' }}
              onClick={() => openPlaceOrder(r)}
            >
              Place Order
            </button>
          )}
          {canRaiseIssue && (
            <button
              className="btn btn-sm btn-danger"
              style={{ fontSize: '0.72rem', padding: '3px 7px', whiteSpace: 'nowrap' }}
              onClick={() => openRaiseIssue(r)}
            >
              Raise Issue
            </button>
          )}
          {canAdjustStock && (
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.72rem', padding: '3px 7px', whiteSpace: 'nowrap' }}
              onClick={() => { setAdjustItem(r); setAdjustModal(true); }}
            >
              Adjust
            </button>
          )}
        </div>
      )
    }
  ];

  // Recent Material Transactions (Section 2.8)
  const transactionColumns = [
    {
      header: 'Transaction ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem' }}>{r.id}</span>
    },
    {
      header: 'Inventory ID',
      accessor: 'inventoryId',
      cell: r => <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{r.inventoryId}</span>
    },
    {
      header: 'Material',
      accessor: 'materialName',
      cell: r => {
        const item = state.inventory?.find(i => i.id === r.inventoryId);
        return <span style={{ fontWeight: 600 }}>{r.materialName || item?.materialName || item?.material || 'Material'}</span>;
      }
    },
    {
      header: 'Transaction Type',
      accessor: 'type',
      cell: r => {
        const isReceipt = r.type === 'Receipt' || r.type === 'IN';
        const isIssue = r.type === 'Issue' || r.type === 'OUT';
        const isTransfer = r.type?.includes('Transfer');
        return (
          <span className={`badge ${isReceipt ? 'green' : isIssue ? 'orange' : isTransfer ? 'purple' : 'blue'}`}>
            {r.type}
          </span>
        );
      }
    },
    {
      header: 'Quantity',
      accessor: 'qty',
      cell: r => {
        const item = state.inventory?.find(i => i.id === r.inventoryId);
        return <strong>{r.qty} {item?.unit || 'units'}</strong>;
      }
    },
    {
      header: 'Project/Site',
      accessor: 'location',
      cell: r => {
        const item = state.inventory?.find(i => i.id === r.inventoryId);
        return <span>{r.toLocation || r.fromLocation || item?.location || 'Central Site'}</span>;
      }
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.date}</span>
    },
    {
      header: 'Reference Order ID',
      accessor: 'reference',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.reference || r.referenceDoc || '-'}</span>
    },
    {
      header: 'Updated By',
      accessor: 'by',
      cell: r => {
        const emp = state.employees?.find(e => e.id === r.by);
        return <span style={{ fontSize: '0.8rem' }}>{emp?.name || r.by || 'System'}</span>;
      }
    }
  ];

  const TABS = [
    'Materials Inventory',
    'Low Stock & Shortages',
    'Recent Material Transactions',
    'Equipment Inventory'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Top Filter and Combined Project/Site Selector */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Project / Site Scope:</label>
            <ProjectSiteSelect
              value={selectedSiteFilter}
              onChange={({ siteId }) => setSelectedSiteFilter(siteId)}
              includeAllOption={true}
              allLabel="All Accessible Projects / Sites"
            />
          </div>

          <SearchFilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search inventory ID, material, location..."
          />
        </div>

        {['Materials Inventory', 'Low Stock & Shortages'].includes(activeTab) && (
          <div style={{ overflowX: 'auto' }}>
            <DataTable
              columns={columns}
              data={getFilteredData()}
            />
          </div>
        )}

        {activeTab === 'Recent Material Transactions' && (
          <div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                Material Movement & Stock Transaction History
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Tracks Receipts, Issues, Transfers, and Authorized Adjustments
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <DataTable
                columns={transactionColumns}
                data={state.stockMovements || []}
              />
            </div>
          </div>
        )}

        {activeTab === 'Equipment Inventory' && (
          <div style={{ overflowX: 'auto' }}>
            <DataTable
              columns={[
                { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span> },
                { header: 'Order ID', accessor: 'orderId', cell: r => r.orderId || '-' },
                { header: 'Material / Equipment', accessor: 'equipment', cell: r => <span style={{ fontWeight: 600 }}>{r.equipment}</span> },
                { header: 'Usage', accessor: 'usage' },
                { header: 'Task ID', accessor: 'taskId', cell: r => r.taskId || '-' },
                { header: 'Location', accessor: 'location' },
                { header: 'Quantity Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} units` },
                { header: 'Quantity Present', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} units` },
                { header: 'Forthcoming Dates', accessor: 'forthcomingDates', cell: r => r.forthcomingDates || '-' },
                { header: 'Surplus/Deficit', accessor: 'surplus', cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} /> },
                {
                  header: 'Quick Actions',
                  accessor: 'quickActions',
                  cell: r => (
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '3px 7px' }}
                      onClick={() => openRaiseIssue(r)}
                    >
                      Report Maintenance
                    </button>
                  )
                }
              ]}
              data={state.equipmentInventory || []}
            />
          </div>
        )}
      </div>

      {/* Place Order Modal */}
      <Modal isOpen={orderModal} onClose={() => setOrderModal(false)} title={`Place Purchase Order — ${orderItem?.materialName || orderItem?.material}`}>
        <form onSubmit={handlePlaceOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Material</label>
            <input disabled type="text" value={orderItem?.materialName || orderItem?.material || ''} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
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
      <Modal isOpen={issueModal} onClose={() => setIssueModal(false)} title={`Raise Stock Issue — ${issueItem?.materialName || issueItem?.material}`}>
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

      {/* Stock Adjustment Modal */}
      <Modal isOpen={adjustModal} onClose={() => setAdjustModal(false)} title={`Stock Adjustment — ${adjustItem?.materialName || adjustItem?.material}`}>
        <form onSubmit={handleAdjustSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Adjustment Type</label>
              <select value={adjustType} onChange={e => setAdjustType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Issue">Material Issue</option>
                <option value="Receipt">Material Receipt</option>
                <option value="Transfer Out">Transfer Out</option>
                <option value="Transfer In">Transfer In</option>
                <option value="Adjustment">Stock Count Adjustment</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity ({adjustItem?.unit || 'units'})</label>
              <input required type="number" min="1" value={adjustQty} onChange={e => setAdjustQty(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Authorized Justification / Note</label>
            <textarea rows={2} required value={adjustNote} onChange={e => setAdjustNote(e.target.value)} placeholder="Reason for stock movement..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setAdjustModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Record Stock Movement</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
