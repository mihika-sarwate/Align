import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { ShoppingCart, FileText, Clock, IndianRupee } from 'lucide-react';

const mockData = [
  { po: 'PO-2024-001', vendor: 'UltraTech Cements', amount: '₹ 2,45,000', date: '10 Sep 2024', status: 'Approved' },
  { po: 'PO-2024-002', vendor: 'Tata Steel', amount: '₹ 8,90,000', date: '12 Sep 2024', status: 'Pending' },
  { po: 'PO-2024-003', vendor: 'Local Hardware Co', amount: '₹ 45,000', date: '14 Sep 2024', status: 'Rejected' },
];

export default function PurchasesPage() {
  const columns = [
    { header: 'PO Number', accessor: 'po', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.po}</span> },
    { header: 'Vendor', accessor: 'vendor', cell: (row) => <span style={{fontWeight: 600}}>{row.vendor}</span> },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Purchases" subtitle="Track Purchase Orders and vendor invoices." actionLabel="Create PO" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total POs" value="156" icon={<ShoppingCart size={24} />} color="blue" />
        <KPICard title="Pending Approval" value="12" icon={<Clock size={24} />} color="orange" />
        <KPICard title="Approved (This Month)" value="45" icon={<FileText size={24} />} color="green" />
        <KPICard title="Total Spend" value="₹ 1.2 Cr" icon={<IndianRupee size={24} />} color="teal" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}