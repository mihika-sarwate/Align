import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

export default function SiteQueriesPage() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');

  const queries = state.siteQueries || [];

  const openRespond = (q) => {
    setSelectedQuery(q);
    setResponse('');
    setShowModal(true);
  };

  const handleRespondSubmit = (e) => {
    e.preventDefault();
    if (!selectedQuery) return;
    dispatch({
      type: 'RESPOND_SITE_QUERY',
      payload: { id: selectedQuery.id, response, respondedBy: 'Vikram Patel' }
    });
    setShowModal(false);
    alert('Response dispatched to Site Engineer.');
  };

  return (
    <>
      <PageHeader title="Site RFIs & Engineering Queries" subtitle="Requests for Information (RFIs) submitted by Site Engineers during physical execution." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'RFI #', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Drawing Ref', accessor: 'drawingId' },
            { header: 'Query Subject', accessor: 'query', cell: r => <span style={{ fontWeight: 600 }}>{r.query}</span> },
            { header: 'Raised By', accessor: 'raisedBy' },
            { header: 'Date', accessor: 'date' },
            { header: 'Status', accessor: 'status', cell: r => <span className={'badge ' + (r.status === 'Responded' ? 'green' : 'orange')}>{r.status}</span> }
          ]}
          data={queries}
          actions={r => r.status !== 'Responded' && (
            <button className="btn btn-sm btn-primary" onClick={() => openRespond(r)}>Clarify RFI</button>
          )}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={'Respond to RFI — ' + (selectedQuery?.id || '')}>
        <form onSubmit={handleRespondSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Site Query</label>
            <div style={{ padding: '10px', background: 'var(--bg-main)', borderRadius: '4px', fontSize: '0.85rem' }}>{selectedQuery?.query}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Architectural Response / Clarification</label>
            <textarea rows={4} required value={response} onChange={e => setResponse(e.target.value)} placeholder="Provide exact structural coordinates, sleeve sizes, or reinforcement details..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Transmit Clarification</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
