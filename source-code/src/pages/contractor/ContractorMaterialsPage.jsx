import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

export default function ContractorMaterialsPage() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [req, setReq] = useState({ materialName: 'UltraTech OPC 53 Cement', qty: 50, unit: 'Bags', reason: '' });

  const requests = state.materialRequests.filter(m => m.siteId === 'SIT-201');

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'MRQ-' + (state.materialRequests.length + 1);
    dispatch({
      type: 'CREATE_MATERIAL_REQUEST',
      payload: {
        id,
        materialName: req.materialName,
        qty: Number(req.qty),
        unit: req.unit,
        projectId: 'PRJ-101',
        siteId: 'SIT-201',
        submittedBy: 'Ramesh Contractor',
        reason: req.reason,
        status: 'Pending'
      }
    });
    setShowModal(false);
    alert('Material indent submitted to Site Engineer.');
  };

  return (
    <>
      <PageHeader title="Site Material Indents" subtitle="Request site materials needed for ongoing work packages." actionLabel="Request Materials" onAction={() => setShowModal(true)} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Indent ID', accessor: 'id' },
            { header: 'Material', accessor: 'materialName' },
            { header: 'Quantity', accessor: 'qty', cell: r => r.qty + ' ' + r.unit },
            { header: 'Submitted By', accessor: 'submittedBy' },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Approved' ? 'green' : 'orange')}>{r.status}</span> }
          ]}
          data={requests}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Submit Material Indent">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Material</label>
            <select value={req.materialName} onChange={e => setReq({ ...req, materialName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {state.materials.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Required Quantity</label>
            <input required type="number" min="1" value={req.qty} onChange={e => setReq({ ...req, qty: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Work Justification</label>
            <textarea rows={2} required value={req.reason} onChange={e => setReq({ ...req, reason: e.target.value })} placeholder="e.g. Masonry for 2nd floor exterior walls." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Indent</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
