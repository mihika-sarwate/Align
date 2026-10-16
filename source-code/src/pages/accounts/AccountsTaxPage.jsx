import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function AccountsTaxPage() {
  return (
    <>
      <PageHeader title="GST & TDS Tax Compliance" subtitle="GST Input Tax Credit (ITC) reconciliation and Section 194C TDS deductions on contractor payments." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        GSTR-2B matching report and TDS certificates (Form 16A) ready for filing.
      </div>
    </>
  );
}
