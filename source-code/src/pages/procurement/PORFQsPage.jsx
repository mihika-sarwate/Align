import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['Open Enquiries', 'Quotations Received', 'Create Enquiry'];

export default function PORFQsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Open Enquiries');
  const [showModal, setShowModal] = useState(false);
  const [rfq, setRfq] = useState({ title: '', materialName: 'UltraTech OPC 53 Cement', qty: 500, unit: 'Bags' });

  const handleCreateRFQ = (e) => {
    e.preventDefault();
    const id = 'RFQ-' + (100 + state.rfqs.length + 1);
    dispatch({
      type: 'CREATE_RFQ',
      payload: {
        id,
        title: rfq.title,
        materialRequestId: 'MRQ-201',
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        status: 'Open',
        vendors: ['VEN-001', 'VEN-002']
      }
    });
    setShowModal(false);
    alert('RFQ enquiry floated to vendors.');
  };

  return (
    <>
      <PageHeader title="Requests for Quotation (RFQ)" subtitle="Float supplier tenders, collect competitive rate quotes, and negotiate delivery schedules." actionLabel="New RFQ" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'RFQ ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Enquiry Title', accessor: 'title', cell: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
            { header: 'Project', accessor: 'projectId' },
            { header: 'Invited Vendors', accessor: 'vendors', cell: r => (r.vendors || []).join(', ') },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={state.rfqs}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New RFQ Enquiry">
        <form onSubmit={handleCreateRFQ} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Enquiry Title</label>
            <input required type="text" value={rfq.title} onChange={e => setRfq({ ...rfq, title: e.target.value })} placeholder="e.g. Bulk Procurement for Tower A Raft Cement" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Target Material</label>
            <select value={rfq.materialName} onChange={e => setRfq({ ...rfq, materialName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.materials.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Float RFQ</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
