import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function SearchFilterBar({ searchValue, onSearchChange, searchPlaceholder = 'Search...', filters = [], onFilterChange, activeFilters = {} }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
        <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          style={{ width: '100%', paddingLeft: '34px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', background: 'var(--bg-card)' }}
        />
        {searchValue && (
          <button onClick={() => onSearchChange('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={14} />
          </button>
        )}
      </div>
      {filters.length > 0 && (
        <>
          <button
            onClick={() => setShowFilters(s => !s)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Filter size={14} />
            Filters {Object.values(activeFilters).some(v => v) ? '•' : ''}
          </button>
          {showFilters && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {filters.map(f => (
                <select
                  key={f.key}
                  value={activeFilters[f.key] || ''}
                  onChange={e => onFilterChange(f.key, e.target.value)}
                  style={{ padding: '6px 10px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', background: 'var(--bg-card)', cursor: 'pointer' }}
                >
                  <option value="">{f.label}</option>
                  {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ))}
              {Object.values(activeFilters).some(v => v) && (
                <button
                  onClick={() => filters.forEach(f => onFilterChange(f.key, ''))}
                  className="btn btn-secondary btn-sm"
                >Clear</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
