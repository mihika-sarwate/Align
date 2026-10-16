import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function ContractorReportsPage() {
  return (
    <>
      <PageHeader title="Contractor Performance & Output Reports" subtitle="Monthly measurement sheets, work logs, and joint measurement records (JMR)." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Measurement book entries and physical output summaries ready for billing certification.
      </div>
    </>
  );
}
