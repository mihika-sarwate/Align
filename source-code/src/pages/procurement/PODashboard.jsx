import React from 'react';
import { useApp } from '../../store/AppContext';
import KPICard from '../../components/KPICard';
import StatusBadge from '../../components/common/StatusBadge';
import ProcurementQuickActions from '../../components/ProcurementQuickActions';
import { ShoppingCart, Truck, AlertTriangle, Package, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Procurement Officer Dashboard (Part 5.1)
 *
 * Requirements:
 * - Quick Actions moved to the TOP.
 * - Remove Inventory Value.
 * - Remove Top Vendors.
 * - Add Quality Inspection widget/metrics.
 * - Make the dashboard more compact.
 * - Preserve inventory functionality.
 */
export default function PODashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const { materialRequests, purchaseOrders, deliveries, inventory, qualityInspections } = state;

  const pendingMRQs = (materialRequests || []).filter(m => m.status === 'Pending').length;
  const posInTransit = (deliveries || []).filter(d => d.status === 'In Transit').length;
  const delayed = (deliveries || []).filter(d => {
    if (!d.expectedDate || d.status === 'Delivered') return false;
    return new Date(d.expectedDate) < new Date() && d.status !== 'Delivered';
  }).length;
  const lowStock = (inventory || []).filter(i => i.qtyRequired > 0 && i.qtyPresent / i.qtyRequired < 1).length;

  // Quality Inspection metrics (Section 5.1 & 5.2)
  const inspections = qualityInspections || [];
  const pendingInspections = inspections.filter(i => i.qualityStatus === 'Pending Inspection').length;
  const passedInspections = inspections.filter(i => i.qualityStatus === 'Passed').length;

  const today = new Date().toDateString();
  const todayDeliveries = (deliveries || []).filter(d => d.expectedDate && new Date(d.expectedDate).toDateString() === today);
  const activePOs = (purchaseOrders || []).filter(p => ['Approved', 'Dispatched', 'Partially Received'].includes(p.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '0' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
          Procurement Operations Workspace — Priya Rao
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
          Inbound delivery schedules, vendor commitments, quality inspections, and site inventory replenishment.
        </p>
      </div>

      {/* QUICK ACTIONS MOVED TO TOP (Section 5.1) */}
      <div className="card" style={{ padding: '12px 16px', background: 'var(--bg-card)' }}>
        <ProcurementQuickActions />
      </div>

      {/* Compact KPIs (NO Inventory Value, includes Quality Inspections) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        <KPICard
          title="Pending Requests"
          value={pendingMRQs}
          icon={<ShoppingCart size={20} />}
          color="orange"
          subtitle="Requisitions awaiting PO"
        />
        <KPICard
          title="Deliveries In Transit"
          value={posInTransit}
          icon={<Truck size={20} />}
          color="blue"
          subtitle="En route to site"
        />
        <KPICard
          title="Delayed Deliveries"
          value={delayed}
          icon={<AlertTriangle size={20} />}
          color="red"
          subtitle="Past expected schedule"
        />
        <KPICard
          title="Pending Quality Inspection"
          value={pendingInspections}
          icon={<ShieldCheck size={20} />}
          color="purple"
          subtitle={`${passedInspections} batches passed`}
        />
        <KPICard
          title="Low Stock Materials"
          value={lowStock}
          icon={<Package size={20} />}
          color="teal"
          subtitle="Below required quantity"
        />
      </div>

      {/* Quality Inspection Overview + Active POs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Quality Inspection Summary Widget (Section 5.1 & 5.2) */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '0.925rem', fontWeight: 600, margin: 0 }}>Recent Quality Inspections</h3>
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
              onClick={() => navigate('/procurement/inspections')}
            >
              Full Inspection Log
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {inspections.slice(0, 4).map(ins => (
              <div
                key={ins.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  background: 'var(--bg-main)',
                  borderRadius: '6px',
                  fontSize: '0.8rem'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--color-blue)', display: 'block' }}>{ins.id} • {ins.materialName}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    PO: {ins.poId} • {ins.vendorName} • {ins.siteId}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${ins.qualityStatus === 'Passed' ? 'green' : ins.qualityStatus === 'Failed' ? 'red' : 'orange'}`}>
                    {ins.qualityStatus}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Acc: {ins.qtyAccepted} / {ins.qtyReceived}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Purchase Orders */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '0.925rem', fontWeight: 600, margin: 0 }}>Active Purchase Orders</h3>
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
              onClick={() => navigate('/procurement/purchase-orders')}
            >
              View All POs
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activePOs.slice(0, 4).map(po => (
              <div
                key={po.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  background: 'var(--bg-main)',
                  borderRadius: '6px',
                  fontSize: '0.8rem'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--color-blue)', display: 'block' }}>{po.id} • {po.vendorName}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {po.materialName || po.items?.[0]?.materialName} • Due: {po.expectedDelivery}
                  </span>
                </div>
                <StatusBadge status={po.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliveries & Low Stock Quick Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.925rem', fontWeight: 600, margin: 0 }}>Pending Material Requisitions</h3>
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '2px 8px' }}
              onClick={() => navigate('/procurement/material-requests')}
            >
              Process Requests
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(materialRequests || []).filter(m => m.status === 'Pending').slice(0, 3).map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-main)', borderRadius: '4px', fontSize: '0.8rem' }}>
                <span><strong>{m.materialName}</strong> ({m.qty} {m.unit})</span>
                <span style={{ color: 'var(--text-secondary)' }}>Site: {m.siteId}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.925rem', fontWeight: 600, margin: 0 }}>Stock Shortages Needing PO</h3>
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '2px 8px' }}
              onClick={() => navigate('/procurement/inventory')}
            >
              Open Inventory
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(inventory || []).filter(i => (i.qtyPresent / (i.qtyRequired || 1)) < 1).slice(0, 3).map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-main)', borderRadius: '4px', fontSize: '0.8rem' }}>
                <span><strong>{item.materialName || item.material}</strong></span>
                <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>
                  Present: {item.qtyPresent} / Req: {item.qtyRequired}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
