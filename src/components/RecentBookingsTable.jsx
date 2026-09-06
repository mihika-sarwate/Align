import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RecentBookingsTable() {
  const bookings = [
    { no: 'BK-1012', client: 'Greenfield Developers', project: 'Project A - Site 01', value: '1,25,00,000', status: 'Confirmed', date: '06 Sep 2024' },
    { no: 'BK-1011', client: 'Urban Buildcon Pvt. Ltd.', project: 'Project B - Site 02', value: '98,50,000', status: 'Agreement In Process', date: '05 Sep 2024' },
    { no: 'BK-1010', client: 'Sunrise Infra', project: 'Project C - Site 01', value: '85,00,000', status: 'Payment Pending', date: '04 Sep 2024' },
    { no: 'BK-1009', client: 'Skyline Constructions', project: 'Project A - Site 02', value: '60,00,000', status: 'On Hold', date: '03 Sep 2024' },
    { no: 'BK-1008', client: 'Maple Homes', project: 'Project B - Site 01', value: '72,50,000', status: 'Confirmed', date: '02 Sep 2024' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Confirmed': return 'badge green-outline';
      case 'Agreement In Process': return 'badge blue-outline';
      case 'Payment Pending': return 'badge orange-outline';
      case 'On Hold': return 'badge purple-outline';
      default: return 'badge';
    }
  };

  return (
    <div className="card recent-po-card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ textTransform: 'uppercase' }}>Recent Bookings</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>
      
      <div className="table-container">
        <table className="recent-po-table">
          <thead>
            <tr>
              <th>Booking No.</th>
              <th>Client</th>
              <th>Project / Site</th>
              <th className="text-right">Value (₹)</th>
              <th className="text-center">Status</th>
              <th className="text-right">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((bk, idx) => (
              <tr key={idx}>
                <td className="font-bold text-primary">{bk.no}</td>
                <td className="font-medium">{bk.client}</td>
                <td className="text-secondary font-medium">{bk.project}</td>
                <td className="text-right font-medium text-primary">₹ {bk.value}</td>
                <td className="text-center">
                  <span className={getStatusBadge(bk.status)} style={{ padding: '2px 8px', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                    {bk.status}
                  </span>
                </td>
                <td className="text-right font-medium text-secondary">{bk.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 
      // Footer space not explicitly strictly needed but let's balance layout if it's there
      */}
    </div>
  );
}
