import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Package, AlertTriangle, Truck, CheckCircle } from 'lucide-react';

const mockData = [
  { id: 'MAT-001', name: 'Cement (Grade 53)', project: 'Alpha Tower', site: 'Tower A', quantity: '500', unit: 'Bags', status: 'In Stock' },
  { id: 'MAT-002', name: 'Steel TMT Bars', project: 'Omega Park', site: 'IT Block 1', quantity: '50', unit: 'Tons', status: 'Low Stock' },
  { id: 'MAT-003', name: 'Bricks', project: 'City Mall', site: 'Main Atrium', quantity: '10000', unit: 'Pcs', status: 'Delayed' },
];

export default function MaterialsPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Material', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Project', accessor: 'project' },
    { header: 'Site', accessor: 'site' },
    { header: 'Qty', accessor: 'quantity', cell: (row) => `${row.quantity} ${row.unit}` },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Materials" subtitle="Track material requisitions and site-level stock." actionLabel="Request Material" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Requests" value="1,284" icon={<Package size={24} />} color="blue" />
        <KPICard title="Pending Delivery" value="45" icon={<Truck size={24} />} color="orange" />
        <KPICard title="Low Stock" value="12" icon={<AlertTriangle size={24} />} color="red" />
        <KPICard title="Delivered Today" value="8" icon={<CheckCircle size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}