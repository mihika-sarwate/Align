import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

export default function ContractorEquipmentPage() {
  const { state } = useApp();
  const eq = state.equipmentInventory.filter(e => e.location.includes('Site A'));

  return (
    <>
      <PageHeader title="Assigned Site Plant & Equipment" subtitle="Concrete mixers, vibrators, and bar bending tools deployed on site." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Equipment Name', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Condition', accessor: 'condition', cell: r => <span className="badge green">{r.condition}</span> }
          ]}
          data={eq}
        />
      </div>
    </>
  );
}
