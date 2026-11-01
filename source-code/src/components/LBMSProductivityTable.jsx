import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import ProjectSiteSelect from '../components/ProjectSiteSelect';
import Modal from '../components/Modal';
import { Plus, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export const LBMS_ACTIVITIES = [
  'Wall Chasing / Pipe Laying',
  'Ceiling Fixing',
  'Electrical Conduit',
  'Water Proofing',
  'Screed',
  'Soil Line',
  'Brick Bata',
  'Duct Erection',
  'Wall Tile',
  'False Ceiling',
  'Counter Granite',
  'Floor Tile',
  'Electrical Fixtures',
  'Painting',
];

export const LBMS_UOMS = ['RM', 'SQM', 'Nos.', 'Set'];

export const DEVIATION_REASONS = [
  'None / On Schedule',
  'Material shortage',
  'Labour shortage',
  'Weather conditions',
  'Equipment unavailability',
  'Site access restrictions',
  'Design changes',
  'Preceding trade handover delay',
  'Quality rework requirement',
  'Other recorded reasons'
];

/**
 * LBMS Productivity Control Table Component
 *
 * Implements the Location-Based Management System productivity control table:
 * Columns:
 * | Activity | Category | UOM | Planned QTY | Planned Duration | Planned Productivity/Day/Labour | Actual QTY | Actual Duration | Actual Productivity/Day/Labour | Reason for Deviation in Duration |
 *
 * Formulas:
 * Planned Productivity / Day / Labour = Planned QTY / (Planned Duration × Planned Labour)
 * Actual Productivity / Day / Labour = Actual QTY / (Actual Duration × Actual Labour)
 *
 * Summary Metrics:
 * - Cycle Time: Total actual duration across activities (or active site cycle)
 * - Labour Productivity Improvement (%): Weighted comparative productivity gain: ((Actual Prod - Planned Prod) / Planned Prod) * 100
 * - Planned Cycle Days Reduced: Planned Total Duration - Actual Total Duration
 */
export default function LBMSProductivityTable({ defaultSiteId = 'SIT-201', role = 'admin' }) {
  const { state, dispatch } = useApp();
  const [selectedSiteId, setSelectedSiteId] = useState(defaultSiteId);
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [form, setForm] = useState({
    activity: LBMS_ACTIVITIES[0],
    category: 'MEP / Civil',
    uom: 'RM',
    plannedQty: 100,
    plannedDuration: 5,
    plannedLabour: 4,
    actualQty: 90,
    actualDuration: 6,
    actualLabour: 4,
    reason: 'None / On Schedule'
  });

  const allRecords = state.lbmsRecords || [];
  const records = allRecords.filter(r => !selectedSiteId || r.siteId === selectedSiteId);

  // Summary Metrics calculations
  const totalPlannedDuration = records.reduce((acc, r) => acc + (Number(r.plannedDuration) || 0), 0);
  const totalActualDuration = records.reduce((acc, r) => acc + (Number(r.actualDuration) || 0), 0);
  const plannedCycleDaysReduced = totalPlannedDuration - totalActualDuration;

  // Average productivity comparison
  let totalPlannedProd = 0;
  let totalActualProd = 0;
  let prodCount = 0;

  records.forEach(r => {
    const plannedDays = (Number(r.plannedDuration) || 1) * (Number(r.plannedLabour) || 1);
    const actualDays = (Number(r.actualDuration) || 1) * (Number(r.actualLabour) || 1);
    const pProd = plannedDays > 0 ? (Number(r.plannedQty) || 0) / plannedDays : 0;
    const aProd = actualDays > 0 ? (Number(r.actualQty) || 0) / actualDays : 0;
    if (pProd > 0) {
      totalPlannedProd += pProd;
      totalActualProd += aProd;
      prodCount++;
    }
  });

  const avgProductivityImprovement = prodCount > 0 && totalPlannedProd > 0
    ? Math.round(((totalActualProd - totalPlannedProd) / totalPlannedProd) * 100)
    : 0;

  const handleOpenAdd = () => {
    setEditingRow(null);
    setForm({
      activity: LBMS_ACTIVITIES[0],
      category: 'MEP / Civil',
      uom: 'RM',
      plannedQty: 100,
      plannedDuration: 5,
      plannedLabour: 4,
      actualQty: 100,
      actualDuration: 5,
      actualLabour: 4,
      reason: 'None / On Schedule'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (row) => {
    setEditingRow(row);
    setForm({
      activity: row.activity,
      category: row.category || 'Civil',
      uom: row.uom || 'RM',
      plannedQty: row.plannedQty,
      plannedDuration: row.plannedDuration,
      plannedLabour: row.plannedLabour || 4,
      actualQty: row.actualQty,
      actualDuration: row.actualDuration,
      actualLabour: row.actualLabour || 4,
      reason: row.reason || 'None / On Schedule'
    });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const plannedDays = (Number(form.plannedDuration) || 1) * (Number(form.plannedLabour) || 1);
    const actualDays = (Number(form.actualDuration) || 1) * (Number(form.actualLabour) || 1);

    const plannedProd = plannedDays > 0 ? (Number(form.plannedQty) / plannedDays).toFixed(2) : '0';
    const actualProd = actualDays > 0 ? (Number(form.actualQty) / actualDays).toFixed(2) : '0';

    if (editingRow) {
      dispatch({
        type: 'UPDATE_LBMS_RECORD',
        payload: {
          id: editingRow.id,
          siteId: selectedSiteId,
          ...form,
          plannedProductivity: Number(plannedProd),
          actualProductivity: Number(actualProd)
        }
      });
      alert(`LBMS activity updated.`);
    } else {
      const id = 'LBMS-' + String(allRecords.length + 1).padStart(3, '0');
      dispatch({
        type: 'CREATE_LBMS_RECORD',
        payload: {
          id,
          siteId: selectedSiteId,
          ...form,
          plannedProductivity: Number(plannedProd),
          actualProductivity: Number(actualProd)
        }
      });
      alert(`LBMS record added.`);
    }
    setShowModal(false);
  };

  const columns = [
    {
      header: 'Activity',
      accessor: 'activity',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.activity}</span>
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: r => <span className="badge blue" style={{ fontSize: '0.75rem' }}>{r.category}</span>
    },
    {
      header: 'UOM',
      accessor: 'uom',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{r.uom}</span>
    },
    {
      header: 'Planned QTY',
      accessor: 'plannedQty',
      cell: r => <span style={{ fontWeight: 500 }}>{r.plannedQty}</span>
    },
    {
      header: 'Planned Duration',
      accessor: 'plannedDuration',
      cell: r => <span>{r.plannedDuration} days</span>
    },
    {
      header: 'Planned Productivity/Day/Labour',
      accessor: 'plannedProductivity',
      cell: r => {
        const plannedDays = (Number(r.plannedDuration) || 1) * (Number(r.plannedLabour) || 1);
        const prod = (Number(r.plannedQty) / plannedDays).toFixed(2);
        return <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{prod} {r.uom}</span>;
      }
    },
    {
      header: 'Actual QTY',
      accessor: 'actualQty',
      cell: r => <span style={{ fontWeight: 600 }}>{r.actualQty}</span>
    },
    {
      header: 'Actual Duration',
      accessor: 'actualDuration',
      cell: r => {
        const diff = Number(r.actualDuration) - Number(r.plannedDuration);
        return (
          <span>
            {r.actualDuration} days
            {diff > 0 && <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', marginLeft: '4px' }}>(+{diff})</span>}
            {diff < 0 && <span style={{ color: 'var(--color-green)', fontSize: '0.75rem', marginLeft: '4px' }}>({diff})</span>}
          </span>
        );
      }
    },
    {
      header: 'Actual Productivity/Day/Labour',
      accessor: 'actualProductivity',
      cell: r => {
        const actualDays = (Number(r.actualDuration) || 1) * (Number(r.actualLabour) || 1);
        const prod = (Number(r.actualQty) / actualDays).toFixed(2);
        return <span style={{ fontWeight: 700, color: 'var(--color-teal)' }}>{prod} {r.uom}</span>;
      }
    },
    {
      header: 'Reason for Deviation in Duration',
      accessor: 'reason',
      cell: r => (
        <span style={{
          fontSize: '0.8rem',
          color: r.reason && r.reason !== 'None / On Schedule' ? '#b45309' : 'var(--text-secondary)',
          fontWeight: r.reason && r.reason !== 'None / On Schedule' ? 600 : 400
        }}>
          {r.reason || 'None / On Schedule'}
        </span>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Controls & Site Selection */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '12px 16px',
        background: 'var(--bg-main)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Project/Site:</label>
          <ProjectSiteSelect
            value={selectedSiteId}
            onChange={({ siteId }) => setSelectedSiteId(siteId)}
            includeAllOption={true}
            allLabel="All Projects / Sites"
          />
        </div>

        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
          <Plus size={14} style={{ marginRight: '4px' }} /> Record Activity Productivity
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '16px', borderLeft: '4px solid var(--color-blue)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Cycle Time
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>
            {totalActualDuration} Days
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Planned: {totalPlannedDuration} days across {records.length} activities
          </div>
        </div>

        <div className="card" style={{ padding: '16px', borderLeft: `4px solid ${avgProductivityImprovement >= 0 ? 'var(--color-green)' : 'var(--color-red)'}` }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Labour Productivity Improvement
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '4px',
            color: avgProductivityImprovement >= 0 ? 'var(--color-green)' : 'var(--color-red)'
          }}>
            {avgProductivityImprovement > 0 ? `+${avgProductivityImprovement}%` : `${avgProductivityImprovement}%`}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Calculated vs planned baseline across crew allocations
          </div>
        </div>

        <div className="card" style={{ padding: '16px', borderLeft: `4px solid ${plannedCycleDaysReduced >= 0 ? 'var(--color-teal)' : 'var(--color-orange)'}` }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Planned Cycle Days Reduced
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '4px', color: 'var(--color-teal)' }}>
            {plannedCycleDaysReduced >= 0 ? `${plannedCycleDaysReduced} Days Saved` : `${Math.abs(plannedCycleDaysReduced)} Days Overrun`}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Variance between planned & actual cycle schedule
          </div>
        </div>
      </div>

      {/* Main LBMS Table */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px' }}>
          Location-Based Productivity & Duration Deviation Control
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Tracking 14 standard construction trades. Formulas: Planned Productivity/Day/Labour = Qty / (Duration × Labour). Actual Productivity/Day/Labour = Actual Qty / (Actual Duration × Actual Labour).
        </p>

        <DataTable
          columns={columns}
          data={records}
          actions={row => (
            <button
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              onClick={() => handleOpenEdit(row)}
            >
              Update
            </button>
          )}
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingRow ? `Edit LBMS Activity — ${editingRow.activity}` : 'Record LBMS Activity Productivity'}
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Construction Activity</label>
            <select
              value={form.activity}
              onChange={e => setForm({ ...form, activity: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              {LBMS_ACTIVITIES.map(act => <option key={act} value={act}>{act}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <input
                required
                type="text"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Civil, MEP, Finishes"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Unit of Measurement (UOM)</label>
              <select
                value={form.uom}
                onChange={e => setForm({ ...form, uom: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {LBMS_UOMS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-blue)' }}>Planned Parameters</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Planned QTY</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.plannedQty}
                  onChange={e => setForm({ ...form, plannedQty: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Planned Duration (Days)</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.plannedDuration}
                  onChange={e => setForm({ ...form, plannedDuration: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Planned Labour Crew</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.plannedLabour}
                  onChange={e => setForm({ ...form, plannedLabour: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-teal)' }}>Actual Performance</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Actual QTY</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.actualQty}
                  onChange={e => setForm({ ...form, actualQty: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Actual Duration (Days)</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.actualDuration}
                  onChange={e => setForm({ ...form, actualDuration: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Actual Labour Crew</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.actualLabour}
                  onChange={e => setForm({ ...form, actualLabour: Number(e.target.value) })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Reason for Deviation in Duration</label>
            <select
              value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              {DEVIATION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingRow ? 'Save Updates' : 'Save Record'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
