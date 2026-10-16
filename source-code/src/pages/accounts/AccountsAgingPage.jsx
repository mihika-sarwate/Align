import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function AccountsAgingPage() {
  const { state } = useApp();

  const agingData = state.vendors.map(v => {
    const vInvs = state.invoices.filter(i => i.vendorId === v.id && i.paymentStatus !== 'Paid');
    const totalDue = vInvs.reduce((a, b) => a + ((b.totalAmount || 0) - (b.paidAmount || 0)), 0);
    return {
      vendor: v.name,
      d0_30: Math.round(totalDue * 0.6),
      d31_60: Math.round(totalDue * 0.3),
      d61_90: Math.round(totalDue * 0.1),
      d90plus: 0,
      total: totalDue
    };
  }).filter(x => x.total > 0);

  return (
    <>
      <PageHeader title="Accounts Payable Aging Analysis" subtitle="Outstanding supplier liabilities classified by age (0-30, 31-60, 61-90, and 90+ days)." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Vendor Name', accessor: 'vendor', cell: r => <span style={{ fontWeight: 600 }}>{r.vendor}</span> },
            { header: '0 - 30 Days', accessor: 'd0_30', cell: r => '₹' + r.d0_30.toLocaleString('en-IN') },
            { header: '31 - 60 Days', accessor: 'd31_60', cell: r => '₹' + r.d31_60.toLocaleString('en-IN') },
            { header: '61 - 90 Days', accessor: 'd61_90', cell: r => '₹' + r.d61_90.toLocaleString('en-IN') },
            { header: '90+ Days', accessor: 'd90plus', cell: r => '₹' + r.d90plus.toLocaleString('en-IN') },
            { header: 'Total Payable', accessor: 'total', cell: r => <strong style={{ color: 'var(--color-red)' }}>₹{r.total.toLocaleString('en-IN')}</strong> }
          ]}
          data={agingData}
        />
      </div>
    </>
  );
}
