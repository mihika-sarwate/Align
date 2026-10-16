import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import './DataTable.css';

export default function DataTable({ columns, data, actions, emptyMessage = 'No records found.' }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (accessor) => {
    if (!accessor) return;
    if (sortKey === accessor) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(accessor);
      setSortDir('asc');
    }
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                onClick={() => col.sortable !== false && col.accessor && handleSort(col.accessor)}
                style={{ cursor: col.sortable !== false && col.accessor ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap' }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {col.header}
                  {col.sortable !== false && col.accessor && (
                    sortKey === col.accessor
                      ? (sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />)
                      : <ChevronsUpDown size={13} style={{ opacity: 0.3 }} />
                  )}
                </span>
              </th>
            ))}
            {actions && <th style={{ width: '1px', whiteSpace: 'nowrap' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-state">
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
                  <div style={{ fontSize: '0.875rem' }}>{emptyMessage}</div>
                </div>
              </td>
            </tr>
          ) : sorted.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
              {actions && (
                <td className="actions-cell">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
