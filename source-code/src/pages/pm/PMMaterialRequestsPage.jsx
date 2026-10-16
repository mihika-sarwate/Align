import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['All Requests', 'Pending Approval', 'Approved', 'Rejected'];

export default function PMMaterialRequestsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Requests');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const requests = state.materialRequests.filter(m => myProjectIds.includes(m.projectId));

  const filtered = requests.filter(r => {
    if (activeTab === 'Pending Approval') return r.status === 'Pending';
    if (activeTab === 'Approved') return r.status === 'Approved';
    if (activeTab === 'Rejected') return r.status === 'Rejected';
    return true;
  });

  return (
    <>
      <PageHeader title="Material Requisitions" subtitle="Manage and verify requisitions raised by Site Engineers." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Material', accessor: 'materialName' },
            { header: 'Qty', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Required Date', accessor: 'requiredDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={r => r.status === 'Pending' && (
            <button className="btn btn-sm btn-primary" onClick={() => dispatch({ type: 'APPROVE_MATERIAL_REQUEST', payload: { id: r.id, approvedBy: 'Rahul Mehta' } })}>
              Approve
            </button>
          )}
        />
      </div>
    </>
  );
}
