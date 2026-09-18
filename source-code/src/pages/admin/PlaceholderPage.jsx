import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function PlaceholderPage({ title }) {
  return (
    <>
      <PageHeader 
        title={title} 
        subtitle={`Manage ${title.toLowerCase()} across all projects.`}
      />
      <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h2>{title} Module</h2>
        <p>This module is currently under construction for Phase 2/3.</p>
      </div>
    </>
  );
}
