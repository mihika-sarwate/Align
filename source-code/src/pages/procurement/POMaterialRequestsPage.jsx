import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/common/DataTable';
import SearchFilterBar from '../../components/SearchFilterBar';

const TABS = ['All Requests', 'Pending Review', 'Approved', 'Rejected', 'Ready for Procurement', 'Ordered', 'Fulfilled'];

export default function POMaterialRequestsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Requests');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const tabFilter = {
    'All Requests': null,
    'Pending Review': 'Pending',
    'Approved': 'Approved',
    'Rejected': 'Rejected',
    'Ready for Procurement': 'Ready for Procurement',
    'Ordered': 'Ordered',
    'Fulfilled': 'Fulfilled',
  };

  const filtered = state.materialRequests.filter(m => {
    const statusMatch = !tabFilter[activeTab] || m.status === tabFilter[activeTab];
    const searchMatch = !search ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.materialName.toLowerCase().includes(search.toLowerCase()) ||
      (m.submittedBy || '').toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleCreateRFQ = (req) => {
    dispatch({
      type: 'CREATE_RFQ',
      payload: {
        materialRequestId: req.id,
        title: `RFQ for ${req.materialName}`,
        description: `Request for quotation — ${req.qty} ${req.unit} of ${req.materialName}.`,
        projectId: req.projectId,
        siteId: req.siteId,
        createdBy: 'EMP-007',
        vendors: [],
      }
    });
    alert(`RFQ created for ${req.id}`);
  };

  const handleCreatePO = (req) => {
    alert(`Open PO creation for ${req.id} — go to Purchase Orders to create.`);
  };

  const columns = [
    { header: 'ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem' }}>{r.id}</span> },
    { header: 'Material', accessor: 'materialName', cell: r => <span style={{ fontWeight: 600 }}>{r.materialName}</span> },
    { header: 'Qty', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
    { header: 'Project', accessor: 'projectId' },
    { header: 'Site', accessor: 'siteId' },
    { header: 'Required Date', accessor: 'requiredDate' },
    { header: 'Submitted By', accessor: 'submittedBy' },
    { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="Material Requests" subtitle="Review and act on material requests from site teams." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by ID, material..."
          filters={[
            { key: 'project', label: 'All Projects', options: [...new Set(state.materialRequests.map(m => m.projectId))] },
          ]}
          activeFilters={filters}
          onFilterChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
        />
        <DataTable
          columns={columns}
          data={filtered}
          emptyMessage="No material requests found."
          actions={row => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Approved', 'Pending'].includes(row.status) && (
                <button className="btn btn-sm btn-secondary" onClick={() => handleCreateRFQ(row)}>Create RFQ</button>
              )}
              {row.status === 'Approved' && (
                <button className="btn btn-sm btn-primary" onClick={() => handleCreatePO(row)}>Create PO</button>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}
