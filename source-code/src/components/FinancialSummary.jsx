import React from 'react';
import { IndianRupee, PieChart, ShoppingCart, Activity } from 'lucide-react';
import './FinancialSummary.css';

export default function FinancialSummary() {
  return (
    <div className="card financial-summary-card">
      <div className="fs-header">
        <h3 className="card-title">FINANCIAL SUMMARY (All Projects)</h3>
      </div>
      
      <div className="fs-stats">
        <div className="fs-stat-item">
          <div className="fs-icon blue">
            <PieChart size={20} />
          </div>
          <div className="fs-details">
            <span className="fs-label">Total Budget</span>
            <span className="fs-value">₹ 6.50 Cr</span>
          </div>
        </div>
        
        <div className="fs-stat-item">
          <div className="fs-icon green">
            <IndianRupee size={20} />
          </div>
          <div className="fs-details">
            <span className="fs-label">Total Committed</span>
            <span className="fs-value">₹ 4.50 Cr</span>
          </div>
        </div>
        
        <div className="fs-stat-item">
          <div className="fs-icon orange">
            <ShoppingCart size={20} />
          </div>
          <div className="fs-details">
            <span className="fs-label">Total Spent</span>
            <span className="fs-value">₹ 3.62 Cr</span>
          </div>
        </div>
        
        <div className="fs-stat-item">
          <div className="fs-icon teal">
            <Activity size={20} />
          </div>
          <div className="fs-details">
            <span className="fs-label">Balance</span>
            <span className="fs-value">₹ 2.88 Cr</span>
          </div>
        </div>
        
        <div className="fs-action">
          <a href="#" className="btn-secondary">View Financial Report <span className="arrow-right">→</span></a>
        </div>
      </div>
    </div>
  );
}
