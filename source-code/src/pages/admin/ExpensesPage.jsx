import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = [
  'All Expenses',
  'Pending Approval',
  'Approved',
  'Rejected',
  'Project-wise Expenses',
  'Site-wise Expenses',
  'Expense Reports'
];

export default function ExpensesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Expenses');
  const [showModal, setShowModal] = useState(false);
  const [exp, setExp] = useState({ category: 'Site Maintenance', projectId: 'PRJ-101', siteId: 'SIT-201', description: '', amount: 5000 });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'EXP-' + (900 + state.expenses.length + 1);
    dispatch({
      type: 'CREATE_EXPENSE',
      payload: {
        ...exp,
        id,
        amount: Number(exp.amount),
        date: new Date().toISOString().split('T')[0],
        submittedBy: 'Arjun Sharma (Admin)',
        status: 'Approved'
      }
    });
    setShowModal(false);
    alert('Expense ' + id + ' recorded.');
  };

  const handleApprove = (item) => {
    dispatch({ type: 'APPROVE_EXPENSE', payload: { id: item.id, approvedBy: 'Arjun Sharma (Admin)' } });
  };

  const filtered = state.expenses.filter(e => {
    if (activeTab === 'Pending Approval') return e.status === 'Pending';
    if (activeTab === 'Approved') return e.status === 'Approved';
    if (activeTab === 'Rejected') return e.status === 'Rejected';
    return true;
  });

  return (
    <>
      <PageHeader
        title="Expenses & Petty Cash"
        subtitle="Manage company disbursements, site operational overheads, and petty cash vouchers."
        actionLabel="Log Expense"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Expense ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Category', accessor: 'category', cell: r => <span style={{ fontWeight: 600 }}>{r.category}</span> },
            { header: 'Project / Site', accessor: 'siteId', cell: r => r.projectId + ' / ' + r.siteId },
            { header: 'Description', accessor: 'description' },
            { header: 'Amount', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
            { header: 'Claimant', accessor: 'submittedBy' },
            { header: 'Date', accessor: 'date' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={r => r.status === 'Pending' && (
            <button className="btn btn-sm btn-primary" onClick={() => handleApprove(r)}>Approve</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Expense Voucher">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
            <select value={exp.category} onChange={e => setExp({ ...exp, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <option value="Site Maintenance">Site Maintenance</option>
              <option value="Fuel & Generator">Fuel & Generator</option>
              <option value="Safety & PPE">Safety & PPE</option>
              <option value="Travel & Transport">Travel & Transport</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Amount (₹)</label>
              <input required type="number" min="1" value={exp.amount} onChange={e => setExp({ ...exp, amount: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project</label>
              <input type="text" value={exp.projectId} onChange={e => setExp({ ...exp, projectId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Expense Purpose / Voucher Description</label>
            <textarea rows={2} required value={exp.description} onChange={e => setExp({ ...exp, description: e.target.value })} placeholder="e.g. Diesel for generator run during night pour." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Record Expense</button>
          </div>
        </form>
      </Modal>
    </>
  );
}