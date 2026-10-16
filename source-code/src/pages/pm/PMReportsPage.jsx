import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';

const TABS = ['Project Progress', 'Task Performance', 'Material Consumption', 'Delays'];

export default function PMReportsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Project Progress');

  return (
    <>
      <PageHeader title="Project Analytics & Reports" subtitle="High-level performance, material burn rate, and milestone tracking." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>{activeTab} Summary</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Aggregated weekly and monthly analytics for projects Alpha Residential Tower and Sunrise Apartments.
        </p>
      </div>
    </>
  );
}
