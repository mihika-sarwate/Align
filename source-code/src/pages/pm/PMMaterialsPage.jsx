import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Material Requests', 'Pending Approvals', 'Inventory Overview', 'Material Shortages', 'Purchase Orders', 'Delivery Tracking', 'Material Receipts'];

export default function PMMaterialsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Material Requests');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const myRequests = state.materialRequests.filter(m => myProjectIds.includes(m.projectId));
  const pendingRequests = myRequests.filter(m => m.status === 'Pending');

  const handleApprove = (req) => {
    dispatch({ type: 'APPROVE_MATERIAL_REQUEST', payload: { id: req.id, approvedBy: 'Rahul Mehta' } });
    alert(`Material Request ${req.id} approved.`);
  };

  return (
    <>
      <PageHeader title="Materials Oversight" subtitle="Review site material requisitions, approve stock requests, and track inbound deliveries." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {['Material Requests', 'Pending Approvals'].includes(activeTab) && (
          <DataTable
            columns={[
              { header: 'Request ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
              { header: 'Quantity', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required Date', accessor: 'requiredDate' },
              { header: 'Submitted By', accessor: 'submittedBy' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={activeTab === 'Pending Approvals' ? pendingRequests : myRequests}
            actions={row => (
              row.status === 'Pending' && (
                <button className="btn btn-sm btn-primary" onClick={() => handleApprove(row)}>Approve Requisition</button>
              )
            )}
          />
        )}
        {activeTab === 'Inventory Overview' && (
          <DataTable
            columns={[
              { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
              { header: 'Present', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
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
            data={state.inventory.filter(i => myProjectIds.includes(i.projectId))}
          />
        )}
        {activeTab === 'Material Shortages' && (
          <DataTable
            columns={[
              { header: 'Inventory ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required', accessor: 'qtyRequired', cell: r => `${r.qtyRequired} ${r.unit}` },
              { header: 'Present', accessor: 'qtyPresent', cell: r => `${r.qtyPresent} ${r.unit}` },
              { header: 'Deficit Qty', accessor: 'deficit', cell: r => <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>{Math.max(0, r.qtyRequired - r.qtyPresent)} {r.unit}</span> }
            ]}
            data={state.inventory.filter(i => myProjectIds.includes(i.projectId) && (i.qtyPresent / (i.qtyRequired || 1)) < 1)}
          />
        )}
        {activeTab === 'Purchase Orders' && (
          <DataTable
            columns={[
              { header: 'PO Number', accessor: 'poNumber', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.poNumber}</span> },
              { header: 'Project', accessor: 'projectId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Total Value', accessor: 'totalAmount', cell: r => `₹${(r.totalAmount || 0).toLocaleString('en-IN')}` },
              { header: 'Delivery Due', accessor: 'expectedDelivery' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.purchaseOrders.filter(p => myProjectIds.includes(p.projectId))}
          />
        )}
        {activeTab === 'Delivery Tracking' && (
          <DataTable
            columns={[
              { header: 'Delivery ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Vendor', accessor: 'vendorName' },
              { header: 'Expected Date', accessor: 'expectedDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.deliveries.filter(d => myProjectIds.includes(d.projectId))}
          />
        )}
        {activeTab === 'Material Receipts' && (
          <DataTable
            columns={[
              { header: 'Receipt ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'PO Ref', accessor: 'poId' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Accepted Qty', accessor: 'acceptedQty', cell: r => `${r.acceptedQty} ${r.unit}` },
              { header: 'Rejected Qty', accessor: 'rejectedQty', cell: r => `${r.rejectedQty} ${r.unit}` },
              { header: 'Inspection Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.receipts.filter(rc => myProjectIds.includes(rc.projectId))}
          />
        )}
      </div>
    </>
  );
}
