import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const mockWorkers = [
  { id: 'LAB-01', name: 'Munna Kumar', trade: 'Mason', attendance: 'Present', site: 'SIT-201' },
  { id: 'LAB-02', name: 'Sanjay Yadav', trade: 'Bar Bender', attendance: 'Present', site: 'SIT-201' },
  { id: 'LAB-03', name: 'Santosh Pal', trade: 'Carpenter', attendance: 'Present', site: 'SIT-201' },
  { id: 'LAB-04', name: 'Arun Singh', trade: 'Helper', attendance: 'Present', site: 'SIT-201' },
  { id: 'LAB-05', name: 'Deepak Mondal', trade: 'Electrician', attendance: 'Present', site: 'SIT-201' }
];

export default function LabourCrewPage() {
  return (
    <>
      <PageHeader title="Labor Crew & Daily Muster" subtitle="Track daily on-site manpower attendance, trade allocations, and shift muster." />
      <div className="card" style={{ padding: '16px' }}>
        <DataTable
          columns={[
            { header: 'Worker ID', accessor: 'id' },
            { header: 'Full Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
            { header: 'Trade / Skill', accessor: 'trade' },
            { header: 'Site Location', accessor: 'site' },
            { header: 'Today Attendance', accessor: 'attendance', cell: r => <span className="badge green">{r.attendance}</span> }
          ]}
          data={mockWorkers}
        />
      </div>
    </>
  );
}
