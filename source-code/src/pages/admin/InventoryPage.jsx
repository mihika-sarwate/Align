import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { Box, Layers, AlertCircle, CheckSquare } from 'lucide-react';

const mockData = [
  { code: 'INV-100', name: 'Excavator EX-200', category: 'Heavy Machinery', location: 'Central Yard', stock: 2, status: 'Active' },
  { code: 'INV-101', name: 'Safety Helmets', category: 'PPE', location: 'Site A Store', stock: 150, status: 'In Stock' },
  { code: 'INV-102', name: 'Concrete Mixer', category: 'Equipment', location: 'Site B Store', stock: 0, status: 'Out of Stock' },
];

export default function InventoryPage() {
  const columns = [
    { header: 'Item Code', accessor: 'code', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.code}</span> },
    { header: 'Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Location', accessor: 'location' },
    { header: 'Stock', accessor: 'stock', cell: (row) => <span style={{color: row.stock === 0 ? 'var(--color-red)' : 'inherit', fontWeight: 600}}>{row.stock}</span> },
    { header: 'Status', accessor: 'status', cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return (
    <>
      <PageHeader title="Inventory" subtitle="Manage global tools, equipment, and PPE inventory." actionLabel="Add Item" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Items" value="4,521" icon={<Box size={24} />} color="blue" />
        <KPICard title="Categories" value="18" icon={<Layers size={24} />} color="teal" />
        <KPICard title="Low Stock" value="34" icon={<AlertCircle size={24} />} color="orange" />
        <KPICard title="In Use" value="2,105" icon={<CheckSquare size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}