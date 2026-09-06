import React from 'react';
import { ArrowRight } from 'lucide-react';
// Reusing recent-po-table css as it matches perfectly

export default function PendingInvoicesTable() {
  const invoices = [
    { no: 'INV-298', vendor: 'Ultra Cement Ltd.', project: 'Project A / Site 01', date: '05 Sep 2024', amount: '18,75,000', due: '15 Sep 2024', status: 'Overdue' },
    { no: 'INV-297', vendor: 'ABC Steels', project: 'Project A / Site 01', date: '02 Sep 2024', amount: '12,60,000', due: '12 Sep 2024', status: 'Due Soon' },
    { no: 'INV-296', vendor: 'BuildMax Pvt. Ltd.', project: 'Project B / Site 02', date: '03 Sep 2024', amount: '9,20,000', due: '13 Sep 2024', status: 'Pending' },
    { no: 'INV-295', vendor: 'XYZ Traders', project: 'Project C / Site 01', date: '04 Sep 2024', amount: '8,50,000', due: '14 Sep 2024', status: 'Pending' },
    { no: 'INV-294', vendor: 'Steel World', project: 'Project B / Site 02', date: '01 Sep 2024', amount: '7,40,000', due: '11 Sep 2024', status: 'Overdue' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Overdue': return 'badge red-outline'; // using red-outline created earlier
      case 'Due Soon': return 'badge orange';
      case 'Pending': return 'badge blue';
      default: return 'badge';
    }
  };

  return (
    <div className="card recent-po-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Pending Invoices</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="table-container">
        <table className="recent-po-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Vendor</th>
              <th>Project / Site</th>
              <th>Invoice Date</th>
              <th className="text-right">Amount (₹)</th>
              <th className="text-right">Due Date</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={idx}>
                <td className="font-bold text-primary">{inv.no}</td>
                <td className="font-medium">{inv.vendor}</td>
                <td className="text-secondary font-medium">{inv.project}</td>
                <td className="text-secondary font-medium">{inv.date}</td>
                <td className="text-right font-medium">{inv.amount}</td>
                <td className="text-right font-medium text-secondary">{inv.due}</td>
                <td className="text-center">
                  <span className={getStatusBadge(inv.status)} style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all invoices <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
