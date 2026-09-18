import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Truck, Building, Star, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'VEN-001', name: 'UltraTech Cements', category: 'Materials', contact: 'sales@ultratech.com', rating: '4.8/5', status: 'Active' },
  { id: 'VEN-002', name: 'Tata Steel', category: 'Materials', contact: 'orders@tatasteel.com', rating: '4.9/5', status: 'Active' },
  { id: 'VEN-003', name: 'FastLogistics', category: 'Transport', contact: 'help@fastlog.in', rating: '3.2/5', status: 'On Hold' },
];

export default function VendorsPage() {
  const columns = [
    { header: 'Vendor ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--text-secondary)'}}>{row.id}</span> },
    { header: 'Vendor Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.name}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Rating', accessor: 'rating', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-orange)'}}>★ {row.rating}</span> },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Vendors" subtitle="Manage suppliers, contractors, and service providers." actionLabel="Add Vendor" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Vendors" value="45" icon={<Building size={24} />} color="blue" />
        <KPICard title="Active Contracts" value="38" icon={<CheckCircle size={24} />} color="green" />
        <KPICard title="Deliveries Today" value="12" icon={<Truck size={24} />} color="teal" />
        <KPICard title="Top Rated" value="15" icon={<Star size={24} />} color="orange" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}