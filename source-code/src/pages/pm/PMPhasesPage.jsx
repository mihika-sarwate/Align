import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = ['Phases', 'Phase Activities', 'Task Codes Hierarchy'];

export default function PMPhasesPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Phases');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const myPhases = state.phases.filter(p => myProjectIds.includes(p.projectId));
  const myPhaseIds = myPhases.map(p => p.id);
  const myActivities = state.phaseActivities.filter(a => myPhaseIds.includes(a.phaseId));

  return (
    <>
      <PageHeader title="Construction Phases & Task Hierarchy" subtitle="Standardized 5-phase construction lifecycle breakdown and task coding structure." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Phases' && (
          <DataTable
            columns={[
              { header: 'Order', accessor: 'order' },
              { header: 'Code', accessor: 'code', cell: r => <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>{r.code}</span> },
              { header: 'Phase Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Project ID', accessor: 'projectId' }
            ]}
            data={myPhases}
          />
        )}
        {activeTab === 'Phase Activities' && (
          <DataTable
            columns={[
              { header: 'Activity Code', accessor: 'code', cell: r => <span style={{ fontWeight: 700, color: 'var(--color-teal)' }}>{r.code}</span> },
              { header: 'Activity Description', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Phase Reference', accessor: 'phaseId' }
            ]}
            data={myActivities}
          />
        )}
        {activeTab === 'Task Codes Hierarchy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ALIGN standardizes construction activity through 6-character task codes: [Phase Code (2)][Activity Code (2)][Sequence (2)]. Example: <strong>PC0301</strong> (Preconstruction &rarr; Piling &rarr; Sequence 01).
            </p>
            {myPhases.map(phase => (
              <div key={phase.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-blue)' }}>
                  [{phase.code}] {phase.name}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
                  {state.phaseActivities.filter(a => a.phaseId === phase.id).map(act => (
                    <div key={act.id} style={{ background: 'var(--bg-main)', padding: '8px 12px', borderRadius: '4px', fontSize: '0.8rem' }}>
                      <strong>{act.code}:</strong> {act.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
