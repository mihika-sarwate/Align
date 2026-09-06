import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PaymentsDueTable() {
  const payments = [
    { to: 'Ultra Cement Ltd.', ref: 'INV-298', due: '09 Sep 2024', amount: '18,75,000', status: 'Overdue' },
    { to: 'ABC Steels', ref: 'INV-297', due: '10 Sep 2024', amount: '12,60,000', status: 'Due Soon' },
    { to: 'BuildMax Pvt. Ltd.', ref: 'INV-296', due: '11 Sep 2024', amount: '9,20,000', status: 'Due Soon' },
    { to: 'XYZ Traders', ref: 'INV-295', due: '12 Sep 2024', amount: '8,50,000', status: 'Upcoming' },
    { to: 'Steel World', ref: 'INV-294', due: '13 Sep 2024', amount: '7,40,000', status: 'Upcoming' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Overdue': return 'badge red-outline'; // red text on transparent or light red. We have red-outline. Let's use it or make a new one.
      case 'Due Soon': return 'badge orange';
      case 'Upcoming': return 'badge blue';
      default: return 'badge';
    }
  };

  return (
    <div className="card recent-po-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Payments Due This Week</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="table-container">
        <table className="recent-po-table">
          <thead>
            <tr>
              <th>Payment To</th>
              <th>Reference</th>
              <th className="text-right">Due Date</th>
              <th className="text-right">Amount (₹)</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr key={idx}>
                <td className="font-bold text-primary">{pay.to}</td>
                <td className="text-secondary font-medium">{pay.ref}</td>
                <td className="text-right font-medium text-secondary">{pay.due}</td>
                <td className="text-right font-medium">{pay.amount}</td>
                <td className="text-center">
                  <span className={getStatusBadge(pay.status)} style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all payments <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
