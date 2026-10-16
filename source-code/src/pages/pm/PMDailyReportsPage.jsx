import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const TABS = ['Today', 'This Week', 'Site Reports', 'History'];

export default function PMDailyReportsPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Today');

  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const mySites = state.sites.filter(s => myProjectIds.includes(s.projectId)).map(s => s.id);
  const reports = state.dailyReports.filter(d => mySites.includes(d.siteId));

  return (
    <>
      <PageHeader title="Daily Engineering Reports" subtitle="Review site activity reports submitted by Site Engineers." />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Report ID', accessor: 'id' },
            { header: 'Date', accessor: 'date' },
            { header: 'Site', accessor: 'siteId' },
            { header: 'Work Performed', accessor: 'workPerformed' },
            { header: 'Manpower Present', accessor: 'manpowerCount' },
            { header: 'Author', accessor: 'submittedBy' },
            { header: 'Status', accessor: 'status', cell: r => <span className="badge green">{r.status || 'Submitted'}</span> }
          ]}
          data={reports}
        />
      </div>
    </>
  );
}
