import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { Tag } from 'lucide-react';

export default function GlossaryPage() {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('All');

  const terms = state.glossary || [];
  const phases = ['All', 'PC', 'SP', 'SS', 'BS', 'FS'];

  const filtered = terms.filter(t => {
    const matchSearch = !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchPhase = selectedPhase === 'All' || (t.relatedPhases && t.relatedPhases.includes(selectedPhase));
    return matchSearch && matchPhase;
  });

  return (
    <>
      <PageHeader
        title="Construction Glossary"
        subtitle="Standardized engineering, architectural, and construction terms across all project phases."
      />
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="Search glossary terms or definitions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: '280px', flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
          />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phase Filter:</span>
            {phases.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPhase(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-color)',
                  background: selectedPhase === p ? 'var(--color-blue)' : 'var(--bg-main)',
                  color: selectedPhase === p ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map(t => (
          <div key={t.id || t.term} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.term}</h3>
                {t.phaseCode && (
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--color-blue-light)', color: 'var(--color-blue)', fontSize: '0.7rem', fontWeight: 700 }}>
                    {t.phaseCode}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {t.definition}
              </p>
            </div>
            {t.relatedPhases && t.relatedPhases.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <Tag size={12} style={{ color: 'var(--text-secondary)' }} />
                {t.relatedPhases.map(rp => (
                  <span key={rp} style={{ fontSize: '0.7rem', background: 'var(--bg-main)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                    {rp}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
