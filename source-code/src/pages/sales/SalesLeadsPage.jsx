import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Leads', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted'];

export default function SalesLeadsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Leads');
  const [showModal, setShowModal] = useState(false);
  const [lead, setLead] = useState({ clientName: '', requirements: '3 BHK Luxury Apartment', source: 'Website', nextFollowUp: '' });

  const leads = state.leads || [];

  const filtered = leads.filter(l => {
    if (activeTab === 'All Leads') return true;
    return l.status === activeTab;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_LEAD',
      payload: {
        ...lead,
        id: 'LED-' + (100 + leads.length + 1),
        status: 'New',
        assignedTo: 'Riya Sharma'
      }
    });
    setShowModal(false);
    alert('Lead added to sales pipeline.');
  };

  return (
    <>
      <PageHeader title="Sales Leads & Pipeline Funnel" subtitle="Track buyer inquiries through qualification, site visits, and proposal stages." actionLabel="New Lead" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Lead ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Client Name', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Requirements', accessor: 'requirements' },
            { header: 'Lead Source', accessor: 'source' },
            { header: 'Next Follow-Up', accessor: 'nextFollowUp' },
            { header: 'Stage', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Lead">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Prospective Buyer Name</label>
            <input required type="text" value={lead.clientName} onChange={e => setLead({ ...lead, clientName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit Requirements</label>
            <input required type="text" value={lead.requirements} onChange={e => setLead({ ...lead, requirements: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Inquiry Source</label>
              <select value={lead.source} onChange={e => setLead({ ...lead, source: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Website">Website</option>
                <option value="Channel Partner">Channel Partner</option>
                <option value="Walk-In">Walk-In</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Next Follow-up Date</label>
              <input required type="date" value={lead.nextFollowUp} onChange={e => setLead({ ...lead, nextFollowUp: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Lead</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
