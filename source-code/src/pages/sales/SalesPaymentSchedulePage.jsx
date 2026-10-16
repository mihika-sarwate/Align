import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function SalesPaymentSchedulePage() {
  const { state } = useApp();

  return (
    <>
      <PageHeader title="Client Milestone Payment Schedules" subtitle="Construction-linked payment plan (CLP) milestones tied to structural floor completions." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Schedule Ref', accessor: 'id' },
            { header: 'Buyer Name', accessor: 'clientName' },
            { header: 'Construction Milestone', accessor: 'description' },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Milestone Demand', accessor: 'amount', cell: r => '₹' + Number(r.amount).toLocaleString('en-IN') },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Paid' ? 'green' : 'orange')}>{r.status}</span> }
          ]}
          data={state.paymentSchedules}
        />
      </div>
    </>
  );
}
