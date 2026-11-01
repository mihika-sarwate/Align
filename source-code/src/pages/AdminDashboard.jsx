import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import KPICard from '../components/KPICard';
import TabNav from '../components/TabNav';
import SiteProgressSummaryTab from '../components/SiteProgressSummaryTab';
import InventoryMasterView from '../components/InventoryMasterView';
import TasksChart from '../components/TasksChart';
import ActivityFeed from '../components/ActivityFeed';
import UpcomingEvents from '../components/UpcomingEvents';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import ProjectSiteSelect from '../components/ProjectSiteSelect';
import {
  Building2, MapPin, CheckSquare, AlertTriangle, Box,
  TrendingUp, HardHat, Calendar, ChevronRight, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const DASHBOARD_TABS = [
  'Overview',
  'Site Progress Summary',
  'Task Allocation',
  'Inventory'
];

export default function AdminDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [taskFilterSite, setTaskFilterSite] = useState('');

  // Compact metrics calculated from real data
  const totalProjects = state.projects?.length || 0;
  const activeSites = state.sites?.filter(s => s.status === 'Active')?.length || 0;
  const totalTasks = state.tasks?.length || 0;
  const openIssues = state.issues?.filter(i => i.status !== 'Closed')?.length || 0;
  const totalMaterialsInStock = state.inventory?.length || 0;

  // Task Allocation quick view
  const taskAllocationData = (state.tasks || []).filter(t => !taskFilterSite || t.siteId === taskFilterSite);

  const taskAllocationColumns = [
    {
      header: 'Task ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{r.id}</span>
    },
    {
      header: 'Task Title',
      accessor: 'title',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600 }}>{r.title}</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Code: {r.taskCode}</span>
        </div>
      )
    },
    {
      header: 'Project/Site',
      accessor: 'siteId',
      cell: r => {
        const site = state.sites?.find(s => s.id === r.siteId);
        const prj = state.projects?.find(p => p.id === (r.projectId || site?.projectId));
        return (
          <div>
            <span style={{ fontWeight: 600 }}>{prj?.name || r.projectId}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{site?.name || r.siteId}</span>
          </div>
        );
      }
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: r => <span className={`badge ${r.category === 'Procurement' ? 'orange' : r.category === 'Reports' ? 'teal' : 'blue'}`}>{r.category || 'Civil'}</span>
    },
    {
      header: 'Assigned Employee',
      accessor: 'assignedToName',
      cell: r => <span>{r.assignedToName || 'Rajesh K'}</span>
    },
    {
      header: 'Date of Assignment',
      accessor: 'dateOfAssignment',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.dateOfAssignment || r.plannedStart || '2024-09-01'}</span>
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.dueDate}</span>
    },
    {
      header: 'Priority',
      accessor: 'priority',
      cell: r => <span className={`badge ${r.priority === 'Critical' ? 'red' : r.priority === 'High' ? 'orange' : 'blue'}`}>{r.priority}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Compact Header */}
      <div className="dashboard-header" style={{ padding: '4px 0 8px 0', marginBottom: '4px' }}>
        <div>
          <h1 className="welcome-text" style={{ fontSize: '1.4rem', marginBottom: '2px' }}>
            System Administrator Workspace
          </h1>
          <p className="welcome-subtext" style={{ fontSize: '0.825rem' }}>
            Enterprise overview across all active construction projects, sites, task allocations, and material inventories.
          </p>
        </div>
        <div className="date-picker" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Calendar size={14} />
          <span>Active Construction Cycle: Q3 2024</span>
        </div>
      </div>

      {/* Navigation Tabs (Section 2.1, 2.2, 2.3) */}
      <TabNav tabs={DASHBOARD_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'Overview' && (
        <>
          {/* Compact KPI Row - No Expenses card */}
          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <KPICard
              title="Total Projects"
              value={totalProjects}
              icon={<Building2 size={20} />}
              color="blue"
              trendUp={true}
              trendValue="2"
            />
            <KPICard
              title="Active Sites"
              value={activeSites}
              icon={<MapPin size={20} />}
              color="green"
              trendUp={true}
              trendValue="3"
            />
            <KPICard
              title="Tasks in Pipeline"
              value={totalTasks}
              icon={<CheckSquare size={20} />}
              color="purple"
              trendUp={true}
              trendValue="18"
            />
            <KPICard
              title="Open Issues"
              value={openIssues}
              icon={<AlertTriangle size={20} />}
              color="orange"
              trendUp={false}
              trendValue="5"
            />
            <KPICard
              title="Inventory Materials"
              value={totalMaterialsInStock}
              icon={<Box size={20} />}
              color="teal"
              subtitle="Monitored across sites"
            />
          </div>

          {/* Quick Access Switch to Site Progress & Task Allocation */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Site Progress At A Glance</h3>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                  onClick={() => setActiveTab('Site Progress Summary')}
                >
                  Dedicated View <ChevronRight size={13} style={{ marginLeft: 2 }} />
                </button>
              </div>
              <SiteProgressSummaryTab />
            </div>

            <div className="card" style={{ padding: '16px' }}>
              <TasksChart />
            </div>
          </div>

          <div className="dashboard-grid bottom-section" style={{ marginTop: '0' }}>
            <div className="col-span-2">
              <ActivityFeed />
            </div>
            <div className="col-span-2">
              <UpcomingEvents />
            </div>
          </div>
        </>
      )}

      {/* TAB 2: DEDICATED SITE PROGRESS SUMMARY (Section 2.2) */}
      {activeTab === 'Site Progress Summary' && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
              Dedicated Site Progress Summary
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Tracks total, completed, in-progress, blocked, and pending verification tasks for every project site.
            </p>
          </div>
          <SiteProgressSummaryTab />
        </div>
      )}

      {/* TAB 3: DEDICATED TASK ALLOCATION (Section 2.3) */}
      {activeTab === 'Task Allocation' && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
                Executive Task Allocation
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Master oversight of task assignments across Civil, Procurement, and Reports.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter Project/Site:</label>
              <ProjectSiteSelect
                value={taskFilterSite}
                onChange={({ siteId }) => setTaskFilterSite(siteId)}
                includeAllOption={true}
                allLabel="All Projects & Sites"
              />
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate('/admin/tasks')}
              >
                Manage Tasks
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <DataTable
              columns={taskAllocationColumns}
              data={taskAllocationData}
              actions={row => (
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  onClick={() => navigate('/admin/tasks')}
                >
                  View Details
                </button>
              )}
            />
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY ACCESS (Section 2.1, 2.8) */}
      {activeTab === 'Inventory' && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
              Material & Equipment Inventory
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Standard 11-column stock oversight with recent transaction movements and surplus/deficit metrics.
            </p>
          </div>
          <InventoryMasterView
            role="admin"
            canPlaceOrder={true}
            canRaiseIssue={true}
            canAdjustStock={true}
            showTransactionHistory={true}
          />
        </div>
      )}
    </div>
  );
}
