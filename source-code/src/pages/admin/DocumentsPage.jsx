import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KPICard from '../../components/KPICard';
import { FileText, File, Folder, Download } from 'lucide-react';

const mockData = [
  { id: 'DOC-101', name: 'Alpha_Tower_Blueprints_v2.pdf', type: 'Design', project: 'Alpha Tower', uploader: 'Amit Shah', date: '10 Sep 2024' },
  { id: 'DOC-102', name: 'Vendor_Contract_Tata.docx', type: 'Contract', project: 'Omega Park', uploader: 'Neha Sharma', date: '12 Sep 2024' },
  { id: 'DOC-103', name: 'Site_Safety_Guidelines.pdf', type: 'Policy', project: 'Global', uploader: 'Admin', date: '01 Jan 2024' },
];

export default function DocumentsPage() {
  const columns = [
    { header: 'ID', accessor: 'id', cell: (row) => <span style={{fontWeight: 600, color: 'var(--color-blue)'}}>{row.id}</span> },
    { header: 'Document Name', accessor: 'name', cell: (row) => <span style={{fontWeight: 600}}>{row.name}</span> },
    { header: 'Type', accessor: 'type' },
    { header: 'Project', accessor: 'project' },
    { header: 'Uploaded By', accessor: 'uploader' },
    { header: 'Date', accessor: 'date' },
    { header: 'Action', accessor: 'action', cell: () => <button style={{background: 'none', border: 'none', color: 'var(--color-blue)', cursor: 'pointer'}}><Download size={16} /></button> },
  ];
  return (
    <>
      <PageHeader title="Documents" subtitle="Centralized blueprint, contract, and policy storage." actionLabel="Upload File" />
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <KPICard title="Total Files" value="842" icon={<FileText size={24} />} color="blue" />
        <KPICard title="Blueprints" value="156" icon={<Folder size={24} />} color="teal" />
        <KPICard title="Contracts" value="45" icon={<File size={24} />} color="orange" />
        <KPICard title="Storage Used" value="12.4 GB" icon={<Download size={24} />} color="green" />
      </div>
      <DataTable columns={columns} data={mockData} />
    </>
  );
}