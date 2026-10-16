import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsPaymentSchedulePage() {
  const { state } = useApp();

  return (
    <>
      <PageHeader title="Accounts Payable Schedule" subtitle="Forthcoming cash outflow commitments grouped by payment due date." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Schedule ID', accessor: 'id' },
            { header: 'Client / Vendor', accessor: 'clientName' },
            { header: 'Milestone / PO Ref', accessor: 'description' },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Amount Due', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Paid' ? 'green' : 'orange')}>{r.status}</span> }
          ]}
          data={state.paymentSchedules}
        />
      </div>
    </>
  );
}
