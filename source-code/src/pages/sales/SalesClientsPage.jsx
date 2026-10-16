import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Clients', 'Active Buyers', 'Prospects'];

export default function SalesClientsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Clients');
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({ name: '', contactPerson: '', email: '', phone: '', address: '' });

  const clients = state.clients || [];

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_CLIENT',
      payload: {
        ...client,
        id: 'CLI-' + (100 + clients.length + 1),
        status: 'Active'
      }
    });
    setShowModal(false);
    alert('Client registered.');
  };

  return (
    <>
      <PageHeader title="Client Directory" subtitle="Real estate buyers, corporate tenants, and high-net-worth investors." actionLabel="New Client" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Client ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Client / Entity', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Primary Contact', accessor: 'contactPerson' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Email', accessor: 'email' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={clients}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Client">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client / Company Name</label>
            <input required type="text" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Contact Person</label>
              <input required type="text" value={client.contactPerson} onChange={e => setClient({ ...client, contactPerson: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Phone</label>
              <input required type="tel" value={client.phone} onChange={e => setClient({ ...client, phone: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email</label>
            <input required type="email" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Client</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
