import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import TabNav from './TabNav';
import DataTable from './common/DataTable';
import StatusBadge from './common/StatusBadge';
import ProjectSiteSelect from './ProjectSiteSelect';
import { CheckCircle2, Clock, AlertTriangle, HelpCircle } from 'lucide-react';

const TABS = ['All Sites', 'Active', 'Delayed'];

/**
 * Site Progress Summary Tab / Component (Section 2.2)
 *
 * Dedicated tab displaying:
 * - Project/Site
 * - Total tasks
 * - Completed tasks
 * - In-progress tasks
 * - Blocked tasks
 * - Pending verification
 * - Overall completion percentage
 * - Current progress status
 *
 * All values calculated dynamically from actual task and site records.
 */
export default function SiteProgressSummaryTab({ filterProjectIds = null }) {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('All Sites');
  const [selectedSiteFilter, setSelectedSiteFilter] = useState('');

  let sites = state.sites || [];
  if (filterProjectIds && filterProjectIds.length > 0) {
    sites = sites.filter(s => filterProjectIds.includes(s.projectId));
  }

  if (selectedSiteFilter) {
    sites = sites.filter(s => s.id === selectedSiteFilter);
  }

  // Calculate stats per site
  const siteSummaries = sites.map(site => {
    const project = state.projects?.find(p => p.id === site.projectId);
    const siteTasks = (state.tasks || []).filter(t => t.siteId === site.id);

    const totalTasks = siteTasks.length;
    const completedTasks = siteTasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = siteTasks.filter(t => t.status === 'In Progress').length;
    const blockedTasks = siteTasks.filter(t => t.status === 'Blocked').length;
    const pendingVerification = siteTasks.filter(t => t.status === 'Submitted' || t.status === 'Awaiting Verification').length;

    const completionPercentage = totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : (site.progress || 0);

    let progressStatus = 'On Track';
    if (blockedTasks > 0) {
      progressStatus = 'Blocked';
    } else if (completionPercentage === 100 && totalTasks > 0 && pendingVerification === 0) {
      progressStatus = 'Completed';
    } else if (site.status === 'Delayed' || siteTasks.some(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date())) {
      progressStatus = 'Delayed';
    } else if (inProgressTasks > 0) {
      progressStatus = 'In Progress';
    }

    return {
      siteId: site.id,
      siteName: site.name,
      projectId: site.projectId,
      projectName: project?.name || site.projectName || 'Project',
      totalTasks,
      completedTasks,
      inProgressTasks,
      blockedTasks,
      pendingVerification,
      completionPercentage,
      progressStatus,
      rawStatus: site.status
    };
  });

  const filteredSummaries = siteSummaries.filter(s => {
    if (activeTab === 'Active') return s.progressStatus !== 'Completed';
    if (activeTab === 'Delayed') return s.progressStatus === 'Delayed' || s.blockedTasks > 0;
    return true;
  });

  const columns = [
    {
      header: 'Project / Site',
      accessor: 'siteName',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
            {r.projectName} — {r.siteName}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {r.projectId} • {r.siteId}
          </span>
        </div>
      )
    },
    {
      header: 'Total Tasks',
      accessor: 'totalTasks',
      cell: r => <span style={{ fontWeight: 600 }}>{r.totalTasks}</span>
    },
    {
      header: 'Completed Tasks',
      accessor: 'completedTasks',
      cell: r => <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>{r.completedTasks}</span>
    },
    {
      header: 'In-Progress Tasks',
      accessor: 'inProgressTasks',
      cell: r => <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{r.inProgressTasks}</span>
    },
    {
      header: 'Blocked Tasks',
      accessor: 'blockedTasks',
      cell: r => (
        <span style={{ color: r.blockedTasks > 0 ? 'var(--color-red)' : 'var(--text-secondary)', fontWeight: r.blockedTasks > 0 ? 700 : 400 }}>
          {r.blockedTasks}
        </span>
      )
    },
    {
      header: 'Pending Verification',
      accessor: 'pendingVerification',
      cell: r => (
        <span style={{ color: r.pendingVerification > 0 ? 'var(--color-orange)' : 'var(--text-secondary)', fontWeight: r.pendingVerification > 0 ? 600 : 400 }}>
          {r.pendingVerification}
        </span>
      )
    },
    {
      header: 'Overall Completion',
      accessor: 'completionPercentage',
      cell: r => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, minWidth: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
            <div
              style={{
                height: '100%',
                background: r.completionPercentage === 100 ? 'var(--color-green)' : 'var(--color-blue)',
                borderRadius: '3px',
                width: `${r.completionPercentage}%`
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{r.completionPercentage}%</span>
        </div>
      )
    },
    {
      header: 'Current Progress Status',
      accessor: 'progressStatus',
      cell: r => <StatusBadge status={r.progressStatus} />
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter by Project/Site:</label>
          <ProjectSiteSelect
            value={selectedSiteFilter}
            onChange={({ siteId }) => setSelectedSiteFilter(siteId)}
            includeAllOption={true}
            allLabel="All Projects & Sites"
            filterProjectIds={filterProjectIds}
          />
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Calculated in real-time from active tasks and site logs
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          data={filteredSummaries}
        />
      </div>
    </div>
  );
}
