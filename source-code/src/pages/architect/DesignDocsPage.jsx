import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function DesignDocsPage() {
  return (
    <>
      <PageHeader title="Design Briefs & Architectural Concepts" subtitle="Conceptual elevations, 3D renderings, and client spatial briefs." />
      <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Design documents and architectural concept boards repository.
      </div>
    </>
  );
}
