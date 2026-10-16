import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function SalesReceivablesPage() {
  const { state, dispatch } = useApp();
  const recs = state.receivables || [];

  const handleCollect = (r) => {
    dispatch({ type: 'COLLECT_RECEIVABLE', payload: r.id });
    alert('Milestone payment of ₹' + Number(r.amount).toLocaleString('en-IN') + ' recorded.');
  };

  return (
    <>
      <PageHeader title="Accounts Receivable & Inflows" subtitle="Track buyer demand notices, overdue installments, and payment collections." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Receivable #', accessor: 'id' },
            { header: 'Buyer Name', accessor: 'clientName' },
            { header: 'Milestone Demanded', accessor: 'installment' },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Demanded (₹)', accessor: 'amount', cell: r => Number(r.amount).toLocaleString('en-IN') },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Collected' ? 'green' : 'red')}>{r.status}</span> }
          ]}
          data={recs}
          actions={r => r.status !== 'Collected' && (
            <button className="btn btn-sm btn-primary" onClick={() => handleCollect(r)}>Mark Collected</button>
          )}
        />
      </div>
    </>
  );
}
