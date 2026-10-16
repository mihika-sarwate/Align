import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function POReportsPage() {
  return (
    <>
      <PageHeader title="Procurement Spend & Analytics" subtitle="Monthly procurement expenditure, vendor performance indices, and fulfillment lead times." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Procurement analytics dashboard populated across active project sites.
      </div>
    </>
  );
}
