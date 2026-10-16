import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ContractorProjectsPage() {
  const { state } = useApp();
  const sites = state.sites.filter(s => s.id === 'SIT-201');

  return (
    <>
      <PageHeader title="Assigned Sites & Contracts" subtitle="Contracted site packages and supervisory contact details." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Site ID', accessor: 'id' },
            { header: 'Site Name', accessor: 'name' },
            { header: 'Project', accessor: 'projectName' },
            { header: 'Supervising PM', accessor: 'pmName' },
            { header: 'Site Engineer', accessor: 'seName' },
            { header: 'Progress', accessor: 'progress', cell: r => r.progress + '%' }
          ]}
          data={sites}
        />
      </div>
    </>
  );
}
