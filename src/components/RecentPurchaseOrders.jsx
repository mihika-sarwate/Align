import React from 'react';
import { ArrowRight } from 'lucide-react';
import './RecentPurchaseOrders.css';

export default function RecentPurchaseOrders() {
  const orders = [
    { no: 'PO-1042', project: 'Project A / Site 01', vendor: 'ABC Steels', value: '18,75,000', status: 'In Transit', expDel: '10 Sep 2024' },
    { no: 'PO-1041', project: 'Project B / Site 02', vendor: 'BuildMax Pvt. Ltd.', value: '12,30,000', status: 'In Transit', expDel: '09 Sep 2024' },
    { no: 'PO-1040', project: 'Project A / Site 02', vendor: 'Ultra Cement Ltd.', value: '8,50,000', status: 'Delivered', expDel: '06 Sep 2024' },
    { no: 'PO-1039', project: 'Project C / Site 01', vendor: 'XYZ Traders', value: '9,20,000', status: 'Pending', expDel: '12 Sep 2024' },
    { no: 'PO-1038', project: 'Project B / Site 01', vendor: 'Steel World', value: '14,15,000', status: 'Delivered', expDel: '04 Sep 2024' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'In Transit': return 'badge blue';
      case 'Delivered': return 'badge green';
      case 'Pending': return 'badge orange';
      default: return 'badge';
    }
  };

  return (
    <div className="card recent-po-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Recent Purchase Orders</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="table-container">
        <table className="recent-po-table">
          <thead>
            <tr>
              <th>PO No.</th>
              <th>Project / Site</th>
              <th>Vendor</th>
              <th className="text-right">Value (₹)</th>
              <th className="text-center">Status</th>
              <th className="text-right">Expected Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((po, idx) => (
              <tr key={idx}>
                <td className="font-bold text-primary">{po.no}</td>
                <td className="text-secondary font-medium">{po.project}</td>
                <td className="font-medium">{po.vendor}</td>
                <td className="text-right font-medium">{po.value}</td>
                <td className="text-center">
                  <span className={getStatusBadge(po.status)} style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                    {po.status}
                  </span>
                </td>
                <td className="text-right font-medium text-secondary">{po.expDel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all purchase orders <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
