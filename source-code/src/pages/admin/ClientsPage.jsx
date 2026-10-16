import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = [
  'All Clients',
  'Projects',
  'Leads & Enquiries',
  'Bookings',
  'Agreements',
  'Payment Schedules',
  'Receivables',
  'Documents'
];

export default function ClientsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Clients');
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({ name: '', contactPerson: '', phone: '', email: '', address: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'CLI-' + String(state.clients.length + 1).padStart(3, '0');
    dispatch({
      type: 'CREATE_CLIENT',
      payload: { ...client, id, status: 'Active' }
    });
    setShowModal(false);
    alert('Client ' + client.name + ' (' + id + ') registered.');
  };

  return (
    <>
      <PageHeader
        title="Client Accounts & Customer Management"
        subtitle="Manage developer clients, retail buyers, bookings, agreements, and installment receivables."
        actionLabel="Add Client"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'All Clients' && (
          <DataTable
            columns={[
              { header: 'Client ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Client / Entity', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Primary Contact', accessor: 'contactPerson' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Email', accessor: 'email' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.clients}
          />
        )}

        {activeTab === 'Projects' && (
          <DataTable
            columns={[
              { header: 'Project ID', accessor: 'id' },
              { header: 'Project Name', accessor: 'name' },
              { header: 'Client Name', accessor: 'clientName' },
              { header: 'Budget', accessor: 'budget', cell: r => '₹' + (r.budget / 10000000).toFixed(1) + ' Cr' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.projects}
          />
        )}

        {activeTab === 'Leads & Enquiries' && (
          <DataTable
            columns={[
              { header: 'Lead ID', accessor: 'id' },
              { header: 'Buyer Name', accessor: 'clientName' },
              { header: 'Requirements', accessor: 'requirements' },
              { header: 'Source', accessor: 'source' },
              { header: 'Pipeline Stage', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.leads}
          />
        )}

        {activeTab === 'Bookings' && (
          <DataTable
            columns={[
              { header: 'Booking #', accessor: 'id' },
              { header: 'Client Name', accessor: 'clientName' },
              { header: 'Unit Allotted', accessor: 'unitNumber' },
              { header: 'Token Advance', accessor: 'bookingAmount', cell: r => '₹' + Number(r.bookingAmount).toLocaleString('en-IN') },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.bookings}
          />
        )}

        {activeTab === 'Agreements' && (
          <DataTable
            columns={[
              { header: 'Agreement #', accessor: 'id' },
              { header: 'Buyer', accessor: 'clientName' },
              { header: 'Value', accessor: 'totalValue', cell: r => '₹' + (r.totalValue / 10000000).toFixed(2) + ' Cr' },
              { header: 'Date', accessor: 'signedDate' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.agreements}
          />
        )}

        {activeTab === 'Payment Schedules' && (
          <DataTable
            columns={[
              { header: 'Schedule #', accessor: 'id' },
              { header: 'Client Name', accessor: 'clientName' },
              { header: 'Milestone', accessor: 'description' },
              { header: 'Amount Due', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
              { header: 'Due Date', accessor: 'dueDate' },
              { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Paid' ? 'green' : 'orange')}>{r.status}</span> }
            ]}
            data={state.paymentSchedules}
          />
        )}

        {activeTab === 'Receivables' && (
          <DataTable
            columns={[
              { header: 'Receivable #', accessor: 'id' },
              { header: 'Buyer Name', accessor: 'clientName' },
              { header: 'Installment', accessor: 'installment' },
              { header: 'Demanded (₹)', accessor: 'amount', cell: r => Number(r.amount).toLocaleString('en-IN') },
              { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Collected' ? 'green' : 'red')}>{r.status}</span> }
            ]}
            data={state.receivables}
          />
        )}

        {activeTab === 'Documents' && (
          <DataTable
            columns={[
              { header: 'Document', accessor: 'name' },
              { header: 'Category', accessor: 'category' },
              { header: 'Upload Date', accessor: 'uploadDate' }
            ]}
            data={state.documents.filter(d => d.category === 'Contracts')}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register Client Account">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client / Company Name</label>
            <input required type="text" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Primary Contact Person</label>
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