import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['All Expenses', 'Pending Approval', 'Approved', 'Rejected'];

export default function AccountsExpensesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Expenses');

  const filtered = state.expenses.filter(e => {
    if (activeTab === 'Pending Approval') return e.status === 'Pending';
    if (activeTab === 'Approved') return e.status === 'Approved';
    if (activeTab === 'Rejected') return e.status === 'Rejected';
    return true;
  });

  return (
    <>
      <PageHeader title="Company & Site Petty Cash Expenses" subtitle="Approve reimbursement claims, daily site operational expenses, and travel bills." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Expense ID', accessor: 'id' },
            { header: 'Date', accessor: 'date' },
            { header: 'Category', accessor: 'category' },
            { header: 'Description', accessor: 'description' },
            { header: 'Amount', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
            { header: 'Claimant', accessor: 'submittedBy' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={filtered}
          actions={r => r.status === 'Pending' && (
            <button className="btn btn-sm btn-primary" onClick={() => dispatch({ type: 'APPROVE_EXPENSE', payload: { id: r.id, approvedBy: 'Anjali Chauhan' } })}>Approve Claim</button>
          )}
        />
      </div>
    </>
  );
}
