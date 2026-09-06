import React from 'react';
import { ArrowRight } from 'lucide-react';
// We can reuse the css from RecentPurchaseOrders by just matching class names, but let's create a small wrapper if needed.

export default function TopVendors() {
  const vendors = [
    { name: 'ABC Steels', value: '45,80,000', orders: 6, onTime: '92%' },
    { name: 'BuildMax Pvt. Ltd.', value: '38,75,000', orders: 5, onTime: '90%' },
    { name: 'Ultra Cement Ltd.', value: '32,10,000', orders: 4, onTime: '95%' },
    { name: 'Steel World', value: '28,40,000', orders: 4, onTime: '88%' },
    { name: 'XYZ Traders', value: '22,65,000', orders: 3, onTime: '100%' },
  ];

  return (
    <div className="card recent-po-card">
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Top Vendors (By PO Value)</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="table-container">
        <table className="recent-po-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th className="text-right">PO Value (₹)</th>
              <th className="text-center">Orders</th>
              <th className="text-right">On-time Delivery</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v, idx) => (
              <tr key={idx}>
                <td className="font-bold text-primary">{v.name}</td>
                <td className="text-right font-medium">{v.value}</td>
                <td className="text-center font-medium">{v.orders}</td>
                <td className="text-right font-medium text-secondary">{v.onTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="card-footer">
        <a href="#" className="view-all-link" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          View all vendors <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
