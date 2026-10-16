import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function POEquipmentPage() {
  const { state } = useApp();

  return (
    <>
      <PageHeader title="Equipment Procurement" subtitle="Machinery rentals, crane deployments, and plant maintenance orders." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Equipment Name', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Site Location', accessor: 'location' },
            { header: 'Condition', accessor: 'condition', cell: r => <span className="badge green">{r.condition}</span> }
          ]}
          data={state.equipmentInventory}
        />
      </div>
    </>
  );
}
