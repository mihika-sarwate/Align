import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ total, page, pageSize = 20, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', padding: '12px 0', borderTop: '1px solid var(--border-color)' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Showing {from}–{to} of {total} records
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={{ opacity: page === 1 ? 0.4 : 1, padding: '5px 8px' }}
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pg = i + 1;
          if (totalPages > 5 && page > 3) pg = page - 2 + i;
          if (pg > totalPages) return null;
          return (
            <button
              key={pg}
              className={`btn btn-sm ${pg === page ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onPageChange(pg)}
              style={{ minWidth: '32px' }}
            >
              {pg}
            </button>
          );
        })}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          style={{ opacity: page === totalPages ? 0.4 : 1, padding: '5px 8px' }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
