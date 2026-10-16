import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function POIssuesPage() {
  const { state } = useApp();
  const issues = state.issues.filter(i => i.category === 'Material' || i.category === 'Vendor');

  return (
    <>
      <PageHeader title="Supply Chain & Material Issues" subtitle="Material bottlenecks, delayed transit escalations, and vendor quality rejections." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Title', accessor: 'title' },
            { header: 'Category', accessor: 'category' },
            { header: 'Priority', accessor: 'priority' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={issues}
        />
      </div>
    </>
  );
}
