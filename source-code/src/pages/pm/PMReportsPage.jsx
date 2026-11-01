import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import ProjectSiteSelect from '../../components/ProjectSiteSelect';
import Modal from '../../components/Modal';
import { FileText, Download, Eye, Plus } from 'lucide-react';

const TABS = [
  'Project-Related Reports',
  'Civic Reports'
];

export default function PMReportsPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('Project-Related Reports');
  const [search, setSearch] = useState('');
  const [filterSite, setFilterSite] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewReport, setViewReport] = useState(null);

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const mySiteIds = mySites.map(s => s.id);

  // New report modal state
  const [newReport, setNewReport] = useState({
    siteId: mySiteIds[0] || 'SIT-201',
    reportType: 'Daily Progress Report',
    title: '',
    workPerformed: '',
    authority: 'Municipal Corporation of Greater Mumbai (MCGM)',
    complianceStatus: 'Compliant'
  });

  // Table 1: Project-Related Reports (Daily progress, weekly, task completion, site updates, project performance)
  const projectReports = (state.dailyReports || [])
    .filter(d => mySiteIds.includes(d.siteId) || myProjectIds.includes(d.projectId))
    .map(d => ({
      id: d.id,
      title: d.workPerformed?.substring(0, 50) || `${d.siteId} Daily Update`,
      reportType: d.reportType || 'Daily Progress Report',
      siteId: d.siteId,
      projectId: d.projectId || 'PRJ-101',
      date: d.date,
      submittedBy: d.submittedBy || 'Rajesh K (SE)',
      status: d.reviewStatus || d.status || 'Submitted',
      summary: d.workPerformed || 'On-site execution log'
    }));

  // Table 2: Civic Reports (Municipal notices, environmental clearances, safety inspections, utility compliances)
  const civicReports = [
    {
      id: 'CVR-001',
      title: 'Municipal Building Sanction Inspection Clearance',
      reportType: 'Municipal Compliance',
      authority: 'MCGM Ward D Building Dept',
      siteId: 'SIT-201',
      projectId: 'PRJ-101',
      date: '2024-08-28',
      submittedBy: 'Civic Liaison Officer',
      status: 'Approved',
      summary: 'Foundation plinth level inspection conducted and certified compliant with DCR rules.'
    },
    {
      id: 'CVR-002',
      title: 'Pollution Control Board Air & Dust Compliance Report',
      reportType: 'Environmental Audit',
      authority: 'State Pollution Control Board',
      siteId: 'SIT-201',
      projectId: 'PRJ-101',
      date: '2024-09-02',
      submittedBy: 'Safety Officer',
      status: 'Compliant',
      summary: 'Perimeter anti-dust curtains and water sprinkler log verified compliant.'
    },
    {
      id: 'CVR-003',
      title: 'Traffic Police Encroachment & Excavation NOC',
      reportType: 'Traffic & Urban NOC',
      authority: 'Joint Commissioner Traffic',
      siteId: 'SIT-202',
      projectId: 'PRJ-101',
      date: '2024-07-15',
      submittedBy: 'Sunil Verma (SE)',
      status: 'Approved',
      summary: 'Heavy concrete mixer transit timing clearance 22:00 to 06:00 approved.'
    },
    {
      id: 'CVR-004',
      title: 'Fire Safety Temporary Water Reservoir NOC',
      reportType: 'Fire Safety Audit',
      authority: 'Chief Fire Officer',
      siteId: 'SIT-201',
      projectId: 'PRJ-101',
      date: '2024-08-10',
      submittedBy: 'Rajesh K (SE)',
      status: 'Compliant',
      summary: 'Emergency static water storage 50,000L inspected and operational.'
    }
  ];

  const handleDownload = (r) => {
    alert(`Downloading ${r.reportType} [${r.id}]: "${r.title}".`);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'Project-Related Reports') {
      const id = 'RPT-' + String(projectReports.length + 1).padStart(3, '0');
      dispatch({
        type: 'CREATE_DAILY_REPORT',
        payload: {
          id,
          siteId: newReport.siteId,
          projectId: myProjects[0]?.id || 'PRJ-101',
          date: new Date().toISOString().split('T')[0],
          workPerformed: newReport.workPerformed || newReport.title,
          reportType: newReport.reportType,
          submittedBy: 'Rahul Mehta (PM)',
          reviewStatus: 'Approved'
        }
      });
      alert(`Project report ${id} submitted.`);
    } else {
      alert(`Civic report filed under ${newReport.authority}.`);
    }
    setShowModal(false);
  };

  // Filter Table 1
  const filteredProjectReports = projectReports.filter(r => {
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.submittedBy.toLowerCase().includes(search.toLowerCase());
    const matchSite = !filterSite || r.siteId === filterSite;
    const matchType = !filterType || r.reportType === filterType;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchSite && matchType && matchStatus;
  });

  // Filter Table 2
  const filteredCivicReports = civicReports.filter(r => {
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.authority.toLowerCase().includes(search.toLowerCase());
    const matchSite = !filterSite || r.siteId === filterSite;
    const matchType = !filterType || r.reportType === filterType;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchSite && matchType && matchStatus;
  });

  const projectCols = [
    {
      header: 'Report ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span>
    },
    {
      header: 'Report Title / Scope',
      accessor: 'title',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600, display: 'block' }}>{r.title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.summary}</span>
        </div>
      )
    },
    {
      header: 'Report Type',
      accessor: 'reportType',
      cell: r => <span className="badge blue">{r.reportType}</span>
    },
    {
      header: 'Project / Site',
      accessor: 'siteId',
      cell: r => {
        const site = mySites.find(s => s.id === r.siteId);
        return <span>{site?.name || r.siteId}</span>;
      }
    },
    {
      header: 'Submission Date',
      accessor: 'date',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.date}</span>
    },
    {
      header: 'Submitted By',
      accessor: 'submittedBy',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.submittedBy}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  const civicCols = [
    {
      header: 'Report ID',
      accessor: 'id',
      cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)', fontFamily: 'monospace' }}>{r.id}</span>
    },
    {
      header: 'Civic Report / Compliance Title',
      accessor: 'title',
      cell: r => (
        <div>
          <span style={{ fontWeight: 600, display: 'block' }}>{r.title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Authority: {r.authority}</span>
        </div>
      )
    },
    {
      header: 'Report Type',
      accessor: 'reportType',
      cell: r => <span className="badge purple">{r.reportType}</span>
    },
    {
      header: 'Project / Site',
      accessor: 'siteId',
      cell: r => {
        const site = mySites.find(s => s.id === r.siteId);
        return <span>{site?.name || r.siteId}</span>;
      }
    },
    {
      header: 'Filing Date',
      accessor: 'date',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.date}</span>
    },
    {
      header: 'Filed By',
      accessor: 'submittedBy',
      cell: r => <span style={{ fontSize: '0.8rem' }}>{r.submittedBy}</span>
    },
    {
      header: 'Compliance Status',
      accessor: 'status',
      cell: r => <StatusBadge status={r.status} />
    }
  ];

  return (
    <>
      <PageHeader
        title="Project & Civic Reports"
        subtitle="Combined reports module with distinct filtered tables for on-site engineering progress and municipal/civic statutory filings."
        actionLabel={activeTab === 'Project-Related Reports' ? 'New Project Report' : 'Log Civic Filing'}
        onAction={() => setShowModal(true)}
      />

      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {/* Unified Search & Filter Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          padding: '12px',
          background: 'var(--bg-main)',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Project / Site</label>
            <ProjectSiteSelect
              value={filterSite}
              onChange={({ siteId }) => setFilterSite(siteId)}
              includeAllOption={true}
              allLabel="All Supervised Sites"
              filterProjectIds={myProjectIds}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Report Type</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Types</option>
              {activeTab === 'Project-Related Reports' ? (
                <>
                  <option value="Daily Progress Report">Daily Progress Report</option>
                  <option value="Weekly Progress Report">Weekly Progress Report</option>
                  <option value="Task Completion Report">Task Completion Report</option>
                  <option value="Site Update">Site Update</option>
                  <option value="Project Performance Report">Project Performance Report</option>
                </>
              ) : (
                <>
                  <option value="Municipal Compliance">Municipal Compliance</option>
                  <option value="Environmental Audit">Environmental Audit</option>
                  <option value="Traffic & Urban NOC">Traffic & Urban NOC</option>
                  <option value="Fire Safety Audit">Fire Safety Audit</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Status</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved">Approved</option>
              <option value="Compliant">Compliant</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchFilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by ID, keyword, author..."
            />
          </div>
        </div>

        {/* TABLE 1: PROJECT-RELATED REPORTS */}
        {activeTab === 'Project-Related Reports' && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                Table 1: Project-Related Engineering & Execution Reports
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Daily progress reports (DPR), weekly rollups, task completion milestones, and site performance.
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <DataTable
                columns={projectCols}
                data={filteredProjectReports}
                actions={row => (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      onClick={() => setViewReport(row)}
                    >
                      <Eye size={12} /> View
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      onClick={() => handleDownload(row)}
                    >
                      <Download size={12} /> PDF
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        )}

        {/* TABLE 2: CIVIC REPORTS */}
        {activeTab === 'Civic Reports' && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                Table 2: Civic, Municipal & Statutory Reports
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Statutory agency submissions, municipal building clearances, environmental logs, and civic NOCs.
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <DataTable
                columns={civicCols}
                data={filteredCivicReports}
                actions={row => (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      onClick={() => setViewReport(row)}
                    >
                      <Eye size={12} /> View
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      style={{ fontSize: '0.72rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      onClick={() => handleDownload(row)}
                    >
                      <Download size={12} /> PDF
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* View Report Details Modal */}
      {viewReport && (
        <Modal isOpen={Boolean(viewReport)} onClose={() => setViewReport(null)} title={`${viewReport.reportType} — ${viewReport.id}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Title:</strong>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{viewReport.title}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Site / Project:</strong>
                <span>{viewReport.siteId} ({viewReport.projectId})</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Submission Date:</strong>
                <span>{viewReport.date}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Submitted By:</strong>
                <span>{viewReport.submittedBy}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Status:</strong>
                <StatusBadge status={viewReport.status} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-secondary)' }}>Report Details & Summary:</strong>
              <p style={{ margin: '4px 0 0 0', padding: '10px', background: 'var(--bg-main)', borderRadius: '4px' }}>
                {viewReport.summary || viewReport.workPerformed || 'On-site execution completed per schedule.'}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setViewReport(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleDownload(viewReport)}>Download Full Document</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={activeTab === 'Project-Related Reports' ? 'Submit Project-Related Report' : 'Log Civic / Statutory Report'}
      >
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Project & Site</label>
            <ProjectSiteSelect
              value={newReport.siteId}
              onChange={({ siteId }) => setNewReport({ ...newReport, siteId })}
              filterProjectIds={myProjectIds}
              required={true}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Report Type</label>
            <select
              value={newReport.reportType}
              onChange={e => setNewReport({ ...newReport, reportType: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              {activeTab === 'Project-Related Reports' ? (
                <>
                  <option value="Daily Progress Report">Daily Progress Report</option>
                  <option value="Weekly Progress Report">Weekly Progress Report</option>
                  <option value="Task Completion Report">Task Completion Report</option>
                  <option value="Site Update">Site Update</option>
                  <option value="Project Performance Report">Project Performance Report</option>
                </>
              ) : (
                <>
                  <option value="Municipal Compliance">Municipal Compliance</option>
                  <option value="Environmental Audit">Environmental Audit</option>
                  <option value="Traffic & Urban NOC">Traffic & Urban NOC</option>
                  <option value="Fire Safety Audit">Fire Safety Audit</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Report Title</label>
            <input
              required
              type="text"
              value={newReport.title}
              onChange={e => setNewReport({ ...newReport, title: e.target.value })}
              placeholder="e.g. Weekly Superstructure Concrete Progress"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          {activeTab === 'Civic Reports' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Statutory Authority</label>
              <input
                required
                type="text"
                value={newReport.authority}
                onChange={e => setNewReport({ ...newReport, authority: e.target.value })}
                placeholder="e.g. Municipal Corporation of Greater Mumbai"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Executive Summary & Findings</label>
            <textarea
              rows={3}
              required
              value={newReport.workPerformed}
              onChange={e => setNewReport({ ...newReport, workPerformed: e.target.value })}
              placeholder="Key milestones achieved, inspection notes..."
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">File Report</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
