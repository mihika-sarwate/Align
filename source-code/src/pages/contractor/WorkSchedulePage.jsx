import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function WorkSchedulePage() {
  return (
    <>
      <PageHeader title="Weekly Work Schedule" subtitle="Planned pouring sequences, shuttering deadlines, and milestone inspections." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Weekly schedule aligned with Project Manager target allocations.
      </div>
    </>
  );
}
