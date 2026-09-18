import React from 'react';
import './StatusBadge.css';

export default function StatusBadge({ status, type = 'default' }) {
  const getStatusClass = (statusStr) => {
    const s = statusStr.toLowerCase();
    if (['active', 'completed', 'healthy', 'approved', 'resolved', 'on track'].includes(s)) return 'status-success';
    if (['planning', 'in progress', 'assigned', 'in review', 'pending'].includes(s)) return 'status-info';
    if (['on hold', 'low stock', 'delayed', 'awaiting verification'].includes(s)) return 'status-warning';
    if (['blocked', 'out of stock', 'rejected', 'critical', 'escalated'].includes(s)) return 'status-danger';
    return 'status-default';
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}
