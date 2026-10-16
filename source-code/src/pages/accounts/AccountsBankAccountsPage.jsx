import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const mockBanks = [
  { id: 'BNK-01', bankName: 'HDFC Bank Ltd', accountNo: '••••••••4812', branch: 'Fort, Mumbai', ifsc: 'HDFC0000060', balance: '₹ 4,82,50,000' },
  { id: 'BNK-02', bankName: 'ICICI Bank Ltd', accountNo: '••••••••9031', branch: 'Nariman Point, Mumbai', ifsc: 'ICIC0000104', balance: '₹ 1,15,20,000' },
  { id: 'BNK-03', bankName: 'State Bank of India', accountNo: '••••••••2219', branch: 'BKC, Mumbai', ifsc: 'SBIN0004123', balance: '₹ 88,40,000' }
];

export default function AccountsBankAccountsPage() {
  return (
    <>
      <PageHeader title="Corporate Bank Accounts & Treasury" subtitle="Operational current accounts, project escrow accounts, and liquidity monitoring." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Bank Name', accessor: 'bankName', cell: r => <span style={{ fontWeight: 600 }}>{r.bankName}</span> },
            { header: 'Account Number', accessor: 'accountNo' },
            { header: 'IFSC Code', accessor: 'ifsc' },
            { header: 'Branch', accessor: 'branch' },
            { header: 'Book Balance', accessor: 'balance', cell: r => <span style={{ fontWeight: 700, color: 'var(--color-teal)' }}>{r.balance}</span> }
          ]}
          data={mockBanks}
        />
      </div>
    </>
  );
}
