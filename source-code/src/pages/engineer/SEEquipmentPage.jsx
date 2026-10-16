import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import SurplusDeficitBadge from '../../components/SurplusDeficitBadge';

export default function SEEquipmentPage() {
  const { state } = useApp();
  const eq = state.equipmentInventory.filter(e => e.location.includes('Site A') || e.location.includes('Central'));

  return (
    <>
      <PageHeader title="Plant & Machinery at Site" subtitle="Condition monitoring, uptime tracking, and equipment allocation." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Equipment ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Category', accessor: 'category' },
            { header: 'Location', accessor: 'location' },
            { header: 'Present', accessor: 'qtyPresent' },
            { header: 'Surplus/Deficit', accessor: 'surplus', cell: r => <SurplusDeficitBadge qtyRequired={r.qtyRequired} qtyPresent={r.qtyPresent} /> },
            { header: 'Condition', accessor: 'condition', cell: r => <span className={'badge ' + (r.condition === 'Good' ? 'green' : 'orange')}>{r.condition}</span> }
          ]}
          data={eq}
        />
      </div>
    </>
  );
}
