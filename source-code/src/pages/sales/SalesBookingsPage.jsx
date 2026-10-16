import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/Modal';

const TABS = ['All Bookings', 'Confirmed', 'Payment Pending'];

export default function SalesBookingsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [showModal, setShowModal] = useState(false);
  const [booking, setBooking] = useState({ clientName: '', unitNumber: 'Tower A - Flat 802', bookingAmount: 1000000 });

  const bookings = state.bookings || [];

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_BOOKING',
      payload: {
        ...booking,
        id: 'BKG-' + (bookings.length + 1),
        bookingAmount: Number(booking.bookingAmount),
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'Confirmed'
      }
    });
    setShowModal(false);
    alert('Unit allotment booking confirmed.');
  };

  return (
    <>
      <PageHeader title="Unit Allotments & Bookings" subtitle="Token advance payments, unit block reservations, and client KYC onboarding." actionLabel="New Booking" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Booking #', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Client', accessor: 'clientName', cell: r => <span style={{ fontWeight: 600 }}>{r.clientName}</span> },
            { header: 'Unit Allotted', accessor: 'unitNumber' },
            { header: 'Token Advance', accessor: 'bookingAmount', cell: r => '₹' + Number(r.bookingAmount).toLocaleString('en-IN') },
            { header: 'Booking Date', accessor: 'bookingDate' },
            { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
          ]}
          data={bookings}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Record New Unit Booking">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Client Name</label>
            <input required type="text" value={booking.clientName} onChange={e => setBooking({ ...booking, clientName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit Number</label>
              <input required type="text" value={booking.unitNumber} onChange={e => setBooking({ ...booking, unitNumber: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Token Advance Amount (₹)</label>
              <input required type="number" min="10000" value={booking.bookingAmount} onChange={e => setBooking({ ...booking, bookingAmount: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Booking</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
