import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function AccountsReconciliationPage() {
  return (
    <>
      <PageHeader title="Bank Reconciliation" subtitle="Match cleared disbursements against bank statement entries." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        All recorded vendor payments matched and reconciled with HDFC & ICICI bank feeds.
      </div>
    </>
  );
}
