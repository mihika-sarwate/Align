import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function POApprovalsPage() {
  const { state, dispatch } = useApp();
  const pendingRequests = state.materialRequests.filter(m => m.status === 'Approved' || m.status === 'Pending');

  const handleCreatePO = (req) => {
    dispatch({
      type: 'CREATE_PURCHASE_ORDER',
      payload: {
        vendorId: 'VEN-001',
        vendorName: 'UltraTech Cement Ltd',
        projectId: req.projectId,
        siteId: req.siteId,
        linkedMrqId: req.id,
        totalAmount: req.qty * 380,
        expectedDelivery: req.requiredDate || '2024-09-20',
        status: 'Draft',
        items: [{ materialName: req.materialName, qty: req.qty, unit: req.unit, rate: 380 }]
      }
    });
    alert('Purchase Order drafted for ' + req.materialName);
  };

  return (
    <>
      <PageHeader title="Procurement Approvals & Ready Requisitions" subtitle="Approved material requisitions ready for PO drafting and supplier placement." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Requisition ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
            { header: 'Quantity', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
            { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
            { header: 'Required Date', accessor: 'requiredDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={pendingRequests}
          actions={r => (
            <button className="btn btn-sm btn-primary" onClick={() => handleCreatePO(r)}>Draft PO</button>
          )}
        />
      </div>
    </>
  );
}
