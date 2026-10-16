import React, { useState } from 'react';

const tabNavStyle = {
  display: 'flex',
  gap: '2px',
  borderBottom: '2px solid var(--border-color)',
  marginBottom: '20px',
  overflowX: 'auto',
  flexWrap: 'nowrap',
};

const tabStyle = (active) => ({
  padding: '10px 18px',
  fontSize: '0.8rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: active ? 'var(--color-blue)' : 'var(--text-secondary)',
  borderBottom: active ? '2px solid var(--color-blue)' : '2px solid transparent',
  marginBottom: '-2px',
  borderRadius: '4px 4px 0 0',
  transition: 'all 0.15s',
  fontFamily: 'inherit',
});

export default function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div style={tabNavStyle}>
      {tabs.map(tab => (
        <button
          key={tab}
          style={tabStyle(activeTab === tab)}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
