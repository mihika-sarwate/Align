import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import { ShoppingCart, Truck, AlertTriangle, Package, Star } from 'lucide-react';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function PODashboard() {
  const { state } = useApp();
  const { materialRequests, purchaseOrders, deliveries, inventory, vendors, quotations } = state;

  const pendingMRQs = materialRequests.filter(m => m.status === 'Pending').length;
  const posInTransit = deliveries.filter(d => d.status === 'In Transit').length;
  const delayed = deliveries.filter(d => {
    if (!d.expectedDate || d.status === 'Delivered') return false;
    return new Date(d.expectedDate) < new Date() && d.status !== 'Delivered';
  }).length;
  const lowStock = inventory.filter(i => i.qtyRequired > 0 && i.qtyPresent / i.qtyRequired < 1).length;

  const today = new Date().toDateString();
  const todayDeliveries = deliveries.filter(d => d.expectedDate && new Date(d.expectedDate).toDateString() === today);
  const activePOs = purchaseOrders.filter(p => ['Approved', 'Dispatched', 'Partially Received'].includes(p.status));

  const vendorPerf = vendors.map(v => {
    const vPOs = purchaseOrders.filter(p => p.vendorId === v.id);
    const vQtns = quotations.filter(q => q.vendorId === v.id);
    const accepted = vQtns.filter(q => q.status === 'Accepted').length;
    return { ...v, poCount: vPOs.length, qtnCount: vQtns.length, accepted };
  }).filter(v => v.poCount > 0 || v.qtnCount > 0);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Welcome, Priya Rao!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Procurement Officer — ALIGN Platform</p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: '28px' }}>
        <KPICard title="Pending Material Requests" value={pendingMRQs} icon={<ShoppingCart size={22} />} color="orange" subtitle="Awaiting PO creation" />
        <KPICard title="POs in Transit" value={posInTransit} icon={<Truck size={22} />} color="blue" subtitle="En route to site" />
        <KPICard title="Deliveries Delayed" value={delayed} icon={<AlertTriangle size={22} />} color="red" subtitle="Past expected date" />
        <KPICard title="Low Stock Items" value={lowStock} icon={<Package size={22} />} color="teal" subtitle="Below required qty" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Pending Material Requests */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Pending Material Requests</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)', cursor: 'pointer' }}>View All</span>
          </div>
          <div style={{ padding: '0' }}>
            {materialRequests.filter(m => m.status === 'Pending').slice(0, 5).map(m => (
              <div key={m.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{m.id}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.materialName} — {m.qty} {m.unit}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Required: {m.requiredDate}</div>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
            {materialRequests.filter(m => m.status === 'Pending').length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No pending requests</div>
            )}
          </div>
        </div>

        {/* Active POs */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Active Purchase Orders</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)', cursor: 'pointer' }}>View All</span>
          </div>
          <div>
            {activePOs.slice(0, 5).map(po => (
              <div key={po.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{po.id}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{po.vendorName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fmt(po.totalAmount)} — Due: {po.expectedDelivery}</div>
                </div>
                <StatusBadge status={po.status} />
              </div>
            ))}
            {activePOs.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No active POs</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Today's Deliveries */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Today's Deliveries</h3>
          </div>
          <div>
            {todayDeliveries.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No deliveries scheduled today</div>
            ) : todayDeliveries.map(d => (
              <div key={d.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{d.id}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.vendorName}</div>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Inventory */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Low Stock Inventory</h3>
          </div>
          <div>
            {inventory.filter(i => i.qtyRequired > 0 && i.qtyPresent / i.qtyRequired < 1).slice(0, 5).map(item => (
              <div key={item.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.material || item.equipment}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.location}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-red)' }}>{item.qtyPresent} / {item.qtyRequired}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Present / Required</div>
                </div>
              </div>
            ))}
            {inventory.filter(i => i.qtyRequired > 0 && i.qtyPresent / i.qtyRequired < 1).length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>All stock levels adequate</div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Performance Summary */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Vendor Performance Summary</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-light)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Vendor</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>POs Issued</th>
                <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quotations</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendorPerf.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{v.name}</td>
                  <td style={{ padding: '10px 16px' }}><StatusBadge status={v.category} /></td>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>{v.poCount}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>{v.qtnCount}</td>
                  <td style={{ padding: '10px 16px' }}><StatusBadge status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
