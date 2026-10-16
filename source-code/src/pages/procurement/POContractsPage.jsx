import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function POContractsPage() {
  return (
    <>
      <PageHeader title="Supplier Master Contracts" subtitle="Annual rate contracts (ARC), pricing agreements, and procurement SLAs." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Active master contracts established with UltraTech, Tata Steel, and Godrej Construction.
      </div>
    </>
  );
}
