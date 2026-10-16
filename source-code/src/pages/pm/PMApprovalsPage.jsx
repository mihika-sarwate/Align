import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TABS = ['Pending Material Requests', 'Submitted Tasks', 'Pending Expenses'];

export default function PMApprovalsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Pending Material Requests');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const pendingRequests = state.materialRequests.filter(m => myProjectIds.includes(m.projectId) && m.status === 'Pending');
  const submittedTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId) && t.status === 'Submitted');
  const pendingExpenses = state.expenses.filter(e => myProjectIds.includes(e.projectId) && e.status === 'Pending');

  return (
    <>
      <PageHeader title="Consolidated Approvals Inbox" subtitle="Review all pending material requests, task completion submissions, and expense approvals in one place." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Pending Material Requests' && (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Material', accessor: 'materialName' },
              { header: 'Qty', accessor: 'qty', cell: r => `${r.qty} ${r.unit}` },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Required Date', accessor: 'requiredDate' }
            ]}
            data={pendingRequests}
            actions={r => (
              <button className="btn btn-sm btn-primary" onClick={() => dispatch({ type: 'APPROVE_MATERIAL_REQUEST', payload: { id: r.id, approvedBy: 'Rahul Mehta' } })}>Approve</button>
            )}
          />
        )}
        {activeTab === 'Submitted Tasks' && (
          <DataTable
            columns={[
              { header: 'Task Code', accessor: 'taskCode' },
              { header: 'Title', accessor: 'title' },
              { header: 'Site', accessor: 'siteId' },
              { header: 'Assigned To', accessor: 'assignedToName' }
            ]}
            data={submittedTasks}
            actions={r => (
              <button className="btn btn-sm btn-primary" onClick={() => { dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: r.id, status: 'Verified' } }); }}>Verify</button>
            )}
          />
        )}
        {activeTab === 'Pending Expenses' && (
          <DataTable
            columns={[
              { header: 'Date', accessor: 'date' },
              { header: 'Description', accessor: 'description' },
              { header: 'Amount', accessor: 'amount', cell: r => `₹${Number(r.amount).toLocaleString('en-IN')}` }
            ]}
            data={pendingExpenses}
            actions={r => (
              <button className="btn btn-sm btn-primary" onClick={() => dispatch({ type: 'APPROVE_EXPENSE', payload: { id: r.id, approvedBy: 'Rahul Mehta' } })}>Approve</button>
            )}
          />
        )}
      </div>
    </>
  );
}
