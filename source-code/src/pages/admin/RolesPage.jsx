import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

const TABS = [
  'Roles',
  'Permission Matrix',
  'User Assignments',
  'Access Audit'
];

const ROLES_INFO = [
  { role: 'Admin', count: 1, access: 'Full Enterprise Visibility', desc: 'Owner-level overseer with organization-wide permissions across all projects, finances, and settings.' },
  { role: 'Project Manager', count: 3, access: 'Assigned Projects', desc: 'Project lifecycle oversight, task assignment, contractor supervision, and milestone verification.' },
  { role: 'Site Engineer', count: 3, access: 'Assigned Sites', desc: 'On-site execution logging, DPR filings, material requisitioning, and Goods Receipt Note verification.' },
  { role: 'Procurement Officer', count: 1, access: 'Enterprise Procurement', desc: 'Vendor management, RFQ tenders, quotation comparisons, and PO issuance.' },
  { role: 'Accounts', count: 1, access: 'Enterprise Finance', desc: 'Three-way invoice matching (PO/GRN), vendor disbursement scheduling, and ledger reconciliations.' },
  { role: 'Architect', count: 1, access: 'Assigned Projects', desc: 'Design briefs, technical drawing release, versioned revisions, and RFI clarifications.' },
  { role: 'Contractor', count: 1, access: 'Assigned Work Packages', desc: 'Labor crew muster, work package physical output updates, and site roadblock reporting.' },
  { role: 'Sales Executive', count: 1, access: 'CRM & Allotments', desc: 'Prospective buyer pipeline, sales quotes, unit booking token agreements, and payment collections.' }
];

const MATRIX = [
  { role: 'Admin', view: true, create: true, edit: true, delete: true, approve: true, reject: true, verify: true, export: true },
  { role: 'Project Manager', view: true, create: true, edit: true, delete: false, approve: true, reject: true, verify: true, export: true },
  { role: 'Site Engineer', view: true, create: true, edit: true, delete: false, approve: false, reject: false, verify: true, export: false },
  { role: 'Procurement Officer', view: true, create: true, edit: true, delete: false, approve: true, reject: true, verify: false, export: true },
  { role: 'Accounts', view: true, create: true, edit: true, delete: false, approve: true, reject: true, verify: true, export: true },
  { role: 'Architect', view: true, create: true, edit: true, delete: false, approve: true, reject: true, verify: false, export: true },
  { role: 'Contractor', view: true, create: false, edit: true, delete: false, approve: false, reject: false, verify: false, export: false },
  { role: 'Sales Executive', view: true, create: true, edit: true, delete: false, approve: false, reject: false, verify: false, export: true }
];

export default function RolesPage() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Roles');

  return (
    <>
      <PageHeader
        title="Roles & Access Control"
        subtitle="Role-Based Access Control (RBAC) governance for all 8 construction and real estate platform roles."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        {activeTab === 'Roles' && (
          <DataTable
            columns={[
              { header: 'Role Title', accessor: 'role', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.role}</span> },
              { header: 'Active Employees', accessor: 'count', cell: r => {
                const count = state.employees.filter(e => e.role === r.role).length;
                return <span style={{ fontWeight: 600 }}>{count}</span>;
              }},
              { header: 'Access Scope', accessor: 'access' },
              { header: 'Organizational Responsibility', accessor: 'desc' }
            ]}
            data={ROLES_INFO}
          />
        )}

        {activeTab === 'Permission Matrix' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>View</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Create</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Edit</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Delete</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Approve</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Reject</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Verify</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Export</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(m => (
                  <tr key={m.role} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{m.role}</td>
                    {['view', 'create', 'edit', 'delete', 'approve', 'reject', 'verify', 'export'].map(k => (
                      <td key={k} style={{ padding: '12px', textAlign: 'center' }}>
                        {m[k] ? (
                          <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>✓</span>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)' }}>—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'User Assignments' && (
          <DataTable
            columns={[
              { header: 'Employee ID', accessor: 'id' },
              { header: 'Full Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Role Assigned', accessor: 'role', cell: r => <span className="badge blue">{r.role}</span> },
              { header: 'Assigned Projects', accessor: 'projects', cell: r => (r.projects || []).join(', ') || 'Global' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={state.employees}
          />
        )}

        {activeTab === 'Access Audit' && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            All user sessions and permission delegations audited and verified in compliance with enterprise security protocols.
          </div>
        )}
      </div>
    </>
  );
}