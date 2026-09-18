import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import './PageHeader.css';

export default function PageHeader({ title, subtitle, searchPlaceholder = "Search...", actionLabel, onAction }) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="page-header-actions">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder={searchPlaceholder} />
        </div>
        <button className="filter-btn">
          <Filter size={16} />
          <span>Filters</span>
        </button>
        {actionLabel && (
          <button className="primary-btn" onClick={onAction}>
            <Plus size={16} />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
