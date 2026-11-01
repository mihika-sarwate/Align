import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import Modal from '../../components/Modal';

const TABS = [
  'Purchases',
  'Misc.'
];

export default function PurchasesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Purchases');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSiteFilter, setSelectedSiteFilter] = useState('');

  const [newPo, setNewPo] = useState({
    vendorId: 'VND-001',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    materialName: 'UltraTech OPC 53 Cement',
    qty: 500,
    unit: 'Bags',
    rate: 380,
    orderPlacedBy: 'EMP-001',
    expectedDelivery: '2024-09-25'
  });

  const [newMisc, setNewMisc] = useState({
    title: '',
    vendorId: 'VND-001',
    projectId: 'PRJ-101',
    siteId: 'SIT-201',
    itemDescription: '',
    qty: 1,
    unit: 'Lot',
    cost: 15000,
    orderPlacedBy: 'EMP-001',
    expectedDelivery: '2024-09-20'
  });

  const handleCreatePo = (e) => {
    e.preventDefault();
    const id = 'PO-' + (400 + (state.purchaseOrders?.length || 0) + 1);
    const vendor = state.vendors?.find(v => v.id === newPo.vendorId);
    const emp = state.employees?.find(e => e.id === newPo.orderPlacedBy);
    const today = new Date().toISOString().split('T')[0];

    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        id,
        vendorId: newPo.vendorId,
        vendorName: vendor?.name || 'ACC Cement Ltd',
        projectId: newPo.projectId,
        siteId: newPo.siteId,
        materialName: newPo.materialName,
        totalAmount: newPo.qty * newPo.rate,
        orderDate: today,
        expectedDelivery: newPo.expectedDelivery,
        orderPlacedBy: emp?.name || 'Arjun Sharma',
        status: 'Approved',
        isMisc: false,
        items: [{ materialName: newPo.materialName, qty: newPo.qty, unit: newPo.unit, rate: newPo.rate }]
      }
    });
    setShowModal(false);
    alert(`Purchase Order ${id} issued.`);
  };

  const handleCreateMisc = (e) => {
    e.preventDefault();
    const id = 'MSC-' + (500 + (state.purchaseOrders?.filter(p => p.isMisc)?.length || 0) + 1);
    const vendor = state.vendors?.find(v => v.id === newMisc.vendorId);
    const emp = state.employees?.find(e => e.id === newMisc.orderPlacedBy);
    const today = new Date().toISOString().split('T')[0];

    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        id,
        vendorId: newMisc.vendorId,
        vendorName: vendor?.name || 'Local Supplier',
        projectId: newMisc.projectId,
        siteId: newMisc.siteId,
        materialName: newMisc.itemDescription || newMisc.title,
        totalAmount: Number(newMisc.cost),
        orderDate: today,
        expectedDelivery: newMisc.expectedDelivery,
        orderPlacedBy: emp?.name || 'Arjun Sharma',
        status: 'Approved',
        isMisc: true,
        items: [{ materialName: newMisc.itemDescription || newMisc.title, qty: newMisc.qty, unit: newMisc.unit, rate: newMisc.cost }]
      }
    });
    setShowModal(false);
    alert(`Miscellaneous Purchase ${id} recorded.`);
  };

  const getFilteredPurchases = () => {
    const isMiscTab = activeTab === 'Misc.';
    let dataset = (state.purchaseOrders || []).filter(p => isMiscTab ? Boolean(p.isMisc) : !p.isMisc);

    if (selectedSiteFilter) {
      dataset = dataset.filter(p => p.siteId === selectedSiteFilter);
    }

    return dataset.filter(p => {
      const matchSearch = !search ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        (p.vendorName || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.materialName || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.orderPlacedBy || '').toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  };

  // Mandatory Table Format:
  // Order ID | Project/Site | Material/Item | Quantity | Vendor | Date of Order | Expected Delivery | Order Placed By | Status | Actions
  const purchasesColumns = [
    {
      header: 'Order ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem' }}>{r.id}</span>
    },
    {
      header: 'Project/Site',
      accessor: 'siteId',
      cell: r => {
        const siteObj = state.sites?.find(s => s.id === r.siteId);
        const prjObj = state.projects?.find(p => p.id === (r.projectId || siteObj?.projectId));
        return (
          <div>
            <span style={{ fontWeight: 600 }}>{prjObj?.name || r.projectId}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {siteObj ? `${siteObj.name} (${siteObj.id})` : r.siteId}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Material/Item',
      accessor: 'materialName',
      cell: r => <span style={{ fontWeight: 600 }}>{r.materialName || r.items?.[0]?.materialName || 'Material'}</span>
    },
    {
      header: 'Quantity',
      accessor: 'qty',
      cell: r => {
        const item = r.items?.[0];
        const qty = item?.qty || r.qty || 100;
        const unit = item?.unit || r.unit || 'units';
        return <span>{qty} {unit}</span>;
      }
    },
    {
      header: 'Vendor',
      accessor: 'vendorName',
      cell: r => <span>{r.vendorName}</span>
    },
    {
      header: 'Date of Order',
      accessor: 'orderDate',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.orderDate || r.createdDate || '2024-09-05'}</span>
    },
    {
      header: 'Expected Delivery',
      accessor: 'expectedDelivery',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.expectedDelivery || '-'}</span>
    },
    {
      header: 'Order Placed By',
      accessor: 'orderPlacedBy',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.orderPlacedBy || 'Arjun Sharma (Admin)'}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  return (
    <>
      <PageHeader
        title="Purchases & Orders"
        subtitle="Dedicated separation of regular material purchases and miscellaneous project expenditures."
        actionLabel={activeTab === 'Purchases' ? 'Create Purchase Order' : 'Record Misc Purchase'}
        onAction={() => setShowModal(true)}
      />

      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

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
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Project/Site:</label>
            <ProjectSiteSelect
              value={selectedSiteFilter}
              onChange={({ siteId }) => setSelectedSiteFilter(siteId)}
              includeAllOption={true}
              allLabel="All Projects / Sites"
            />
          </div>

          <SearchFilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder={activeTab === 'Purchases' ? 'Search regular purchase orders...' : 'Search miscellaneous purchases...'}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <DataTable
            columns={purchasesColumns}
            data={getFilteredPurchases()}
            actions={row => (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  onClick={() => alert(`Order ${row.id} details: Value ₹${(row.totalAmount || 0).toLocaleString('en-IN')}`)}
                >
                  View Details
                </button>
              </div>
            )}
          />
        </div>
      </div>

      {/* Modal for Regular Purchases */}
      {activeTab === 'Purchases' && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Regular Purchase Order">
          <form onSubmit={handleCreatePo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project & Site Destination</label>
                <ProjectSiteSelect
                  value={newPo.siteId}
                  onChange={({ siteId, projectId }) => setNewPo({ ...newPo, siteId, projectId })}
                  required={true}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Approved Vendor</label>
                <select
                  value={newPo.vendorId}
                  onChange={e => setNewPo({ ...newPo, vendorId: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                >
                  {state.vendors?.map(v => <option key={v.id} value={v.id}>{v.name} ({v.id})</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Material / Item</label>
              <input
                required
                type="text"
                value={newPo.materialName}
                onChange={e => setNewPo({ ...newPo, materialName: e.target.value })}
                placeholder="e.g. UltraTech OPC 53 Cement"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={newPo.qty}
                  onChange={e => setNewPo({ ...newPo, qty: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit</label>
                <input
                  required
                  type="text"
                  value={newPo.unit}
                  onChange={e => setNewPo({ ...newPo, unit: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Rate per Unit (₹)</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={newPo.rate}
                  onChange={e => setNewPo({ ...newPo, rate: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Order Placed By</label>
                <select
                  value={newPo.orderPlacedBy}
                  onChange={e => setNewPo({ ...newPo, orderPlacedBy: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                >
                  {state.employees?.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Delivery Date</label>
                <input
                  required
                  type="date"
                  value={newPo.expectedDelivery}
                  onChange={e => setNewPo({ ...newPo, expectedDelivery: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Generate Purchase Order</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal for Misc Purchases */}
      {activeTab === 'Misc.' && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Record Miscellaneous Purchase">
          <form onSubmit={handleCreateMisc} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Purchase Title / Item Description</label>
              <input
                required
                type="text"
                value={newMisc.itemDescription}
                onChange={e => setNewMisc({ ...newMisc, itemDescription: e.target.value })}
                placeholder="e.g. Scaffolding Clamps Emergency Purchase"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project & Site</label>
                <ProjectSiteSelect
                  value={newMisc.siteId}
                  onChange={({ siteId, projectId }) => setNewMisc({ ...newMisc, siteId, projectId })}
                  required={true}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Vendor / Supplier</label>
                <select
                  value={newMisc.vendorId}
                  onChange={e => setNewMisc({ ...newMisc, vendorId: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                >
                  {state.vendors?.map(v => <option key={v.id} value={v.id}>{v.name} ({v.id})</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={newMisc.qty}
                  onChange={e => setNewMisc({ ...newMisc, qty: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit</label>
                <input
                  required
                  type="text"
                  value={newMisc.unit}
                  onChange={e => setNewMisc({ ...newMisc, unit: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Total Cost (₹)</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={newMisc.cost}
                  onChange={e => setNewMisc({ ...newMisc, cost: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Order Placed By</label>
                <select
                  value={newMisc.orderPlacedBy}
                  onChange={e => setNewMisc({ ...newMisc, orderPlacedBy: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                >
                  {state.employees?.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expected Delivery Date</label>
                <input
                  required
                  type="date"
                  value={newMisc.expectedDelivery}
                  onChange={e => setNewMisc({ ...newMisc, expectedDelivery: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Record Misc Order</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
