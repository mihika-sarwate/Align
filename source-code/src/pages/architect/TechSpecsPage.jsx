import React, { useState } from 'react';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';

const TABS = ['Structural', 'Architectural', 'Electrical', 'Plumbing', 'HVAC'];

export default function TechSpecsPage() {
  const [activeTab, setActiveTab] = useState('Structural');

  return (
    <>
      <PageHeader title="Technical Specifications & Codes" subtitle="BIS / IS structural standards, finish schedules, and MEP engineering criteria." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>{activeTab} Specifications</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Mandatory compliance guidelines as per Indian Standard Code specifications (IS 456:2000 for Plain and Reinforced Concrete, IS 1786 for High Strength Deformed Steel Bars).
        </p>
      </div>
    </>
  );
}
