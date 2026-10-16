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
        {activeTab !== 'Material Requests' && activeTab !== 'Pending Approvals' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Showing {activeTab} for supervised projects ({myProjectIds.join(', ')}).
          </div>
        )}
      </div>
    </>
  );
}
