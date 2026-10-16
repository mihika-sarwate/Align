import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/Modal';

const TABS = ['My Reports', 'Create Report'];

export default function SEDailyReportsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('My Reports');
  const [showModal, setShowModal] = useState(false);
  const [report, setReport] = useState({
    date: new Date().toISOString().split('T')[0],
    workPerformed: '',
    manpowerCount: 25,
    issues: 'None'
  });

  const reports = state.dailyReports.filter(d => d.siteId === 'SIT-201');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'DPR-' + (100 + state.dailyReports.length + 1);
    dispatch({
      type: 'CREATE_DAILY_REPORT',
      payload: {
        ...report,
        id,
        siteId: 'SIT-201',
        submittedBy: 'Rajesh K (SE)',
        status: 'Submitted'
      }
    });
    setShowModal(false);
    alert('Daily Progress Report (DPR) submitted.');
  };

  return (
    <>
      <PageHeader title="Daily Progress Reports (DPR)" subtitle="Daily engineering log documenting work performed, manpower headcounts, and site weather." actionLabel="New DPR" onAction={() => setShowModal(true)} />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'DPR Number', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
            { header: 'Date', accessor: 'date' },
            { header: 'Work Performed', accessor: 'workPerformed' },
            { header: 'Manpower Present', accessor: 'manpowerCount', cell: r => r.manpowerCount + ' workers' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status}</span> }
          ]}
          data={reports}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="File Daily Progress Report (DPR)">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Date</label>
            <input required type="date" value={report.date} onChange={e => setReport({ ...report, date: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Work Executed Today</label>
            <textarea rows={3} required value={report.workPerformed} onChange={e => setReport({ ...report, workPerformed: e.target.value })} placeholder="Describe concrete pouring, steel binding, shuttering..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Total Manpower / Laborers</label>
            <input required type="number" min="1" value={report.manpowerCount} onChange={e => setReport({ ...report, manpowerCount: Number(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit DPR to PM</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
