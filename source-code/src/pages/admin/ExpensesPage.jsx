import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { IndianRupee, TrendingDown, CheckSquare, XCircle } from 'lucide-react';

const mockData = [
  { id: 'EXP-901', category: 'Travel', project: 'Alpha Tower', amount: '₹ 12,500', date: '15 Sep 2024', status: 'Approved' },
  { id: 'EXP-902', category: 'Site Maintenance', project: 'Omega Park', amount: '₹ 45,000', date: '16 Sep 2024', status: 'Pending' },
  { id: 'EXP-903', category: 'Office Supplies', project: 'HQ', amount: '₹ 8,200', date: '17 Sep 2024', status: 'Rejected' },
];

export default function ExpensesPage() {
  const columns = [
    { header: 'Expense ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Category', accessor: 'category', cell: (row) => <span style={{fontWeight: 600}}>{row.category}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Expenses" subtitle="Manage petty cash, reimbursements, and overheads." actionLabel="Log Expense" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Expenses" value="₹ 8.5L" icon={<IndianRupee size={24} />} color="blue" />
        <KPICard title="Average Daily" value="₹ 25K" icon={<TrendingDown size={24} />} color="teal" />
        <KPICard title="Pending Claims" value="24" icon={<CheckSquare size={24} />} color="orange" />
        <KPICard title="Rejected" value="3" icon={<XCircle size={24} />} color="red" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}