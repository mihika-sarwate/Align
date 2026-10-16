import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function SalesReportsPage() {
  return (
    <>
      <PageHeader title="Sales Analytics & Revenue Reports" subtitle="Lead conversion velocity, inventory absorption rates, and monthly collections." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Sales velocity and quarterly revenue collection reports compiled.
      </div>
    </>
  );
}
