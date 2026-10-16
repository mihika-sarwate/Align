import React from 'react';

export function surplusDeficit(qtyPresent, qtyRequired) {
  if (!qtyRequired || qtyRequired === 0) return null;
  return Math.round((qtyPresent / qtyRequired) * 100);
}

export default function SurplusDeficitBadge({ qtyPresent, qtyRequired }) {
  const pct = surplusDeficit(qtyPresent, qtyRequired);
  if (pct === null) return <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>N/A</span>;

  let bg, color;
  if (pct >= 100) {
    bg = 'var(--color-green-light)';
    color = '#166534';
  } else if (pct > 70) {
    bg = '#fef9c3';
    color = '#854d0e';
  } else {
    bg = 'var(--color-red-light)';
    color = '#991b1b';
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: '9999px',
      background: bg,
      color,
      fontSize: '0.8rem',
      fontWeight: 700,
      minWidth: '52px',
      justifyContent: 'center',
    }}>
      {pct}%
    </span>
  );
}
