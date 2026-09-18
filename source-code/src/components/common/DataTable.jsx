import React from 'react';
import { MoreVertical } from 'lucide-react';
import './DataTable.css';

export default function DataTable({ columns, data }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
              <td className="actions-cell">
                <button className="action-btn">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="empty-state">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
