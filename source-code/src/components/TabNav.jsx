import React from 'react';
import './TabNav.css';

export default function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tab-nav-container">
      <div className="tab-nav-scroll">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

