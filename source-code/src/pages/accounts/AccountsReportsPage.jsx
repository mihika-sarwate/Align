import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function AccountsReportsPage() {
  return (
    <>
      <PageHeader title="Financial Statements & Accounts Reports" subtitle="Cash outflow summaries, project-wise cost accounting, and payment audit reports." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Accounts reports and financial statement summaries compiled across active billing cycles.
      </div>
    </>
  );
}
