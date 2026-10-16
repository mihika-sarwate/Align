import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchFilterBar from '../../components/SearchFilterBar';
import Modal from '../../components/Modal';

const TABS = [
  'All Employees',
  'Active',
  'Inactive',
  'Departments',
  'Project Assignments',
  'Site Assignments'
];

export default function EmployeesPage() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('All Employees');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Site Engineer',
    department: 'Engineering',
    designation: 'Field Engineer'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const id = 'EMP-' + String(state.employees.length + 1).padStart(3, '0');
    dispatch({
      type: 'CREATE_EMPLOYEE',
      payload: {
        ...newEmp,
        id,
        status: 'Active',
        projects: ['PRJ-101'],
        sites: ['SIT-201'],
        lastActive: 'Just now'
      }
    });
    setShowModal(false);
    alert('Employee ' + newEmp.name + ' (' + id + ') created.');
  };

  const filtered = state.employees.filter(e => {
    const matchSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'All Employees') return matchSearch;
    if (activeTab === 'Active') return matchSearch && e.status === 'Active';
    if (activeTab === 'Inactive') return matchSearch && e.status === 'Inactive';
    return matchSearch;
  });

  return (
    <>
      <PageHeader
        title="Employee Directory & Roster"
        subtitle="Manage personnel across all 8 organizational roles, project allocations, and access permissions."
        actionLabel="Add Employee"
        onAction={() => setShowModal(true)}
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '16px' }}>
        <SearchFilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search employees by name, role, email..." />
        
        {activeTab === 'Project Assignments' ? (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Employee Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Role', accessor: 'role' },
              { header: 'Assigned Projects', accessor: 'projects', cell: r => (r.projects || []).join(', ') || 'Global' }
            ]}
            data={state.employees}
          />
        ) : activeTab === 'Site Assignments' ? (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Employee Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Role', accessor: 'role' },
              { header: 'Assigned Sites', accessor: 'sites', cell: r => (r.sites || []).join(', ') || 'N/A' }
            ]}
            data={state.employees}
          />
        ) : (
          <DataTable
            columns={[
              { header: 'ID', accessor: 'id', cell: r => <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{r.id}</span> },
              { header: 'Full Name', accessor: 'name', cell: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
              { header: 'Role', accessor: 'role', cell: r => <span className="badge blue">{r.role}</span> },
              { header: 'Department', accessor: 'department' },
              { header: 'Designation', accessor: 'designation' },
              { header: 'Email', accessor: 'email' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Status', accessor: 'status', cell: r => <StatusBadge status={r.status} /> }
            ]}
            data={filtered}
          />
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Employee">
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
            <input required type="text" value={newEmp.name} onChange={e => setNewEmp({ ...newEmp, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Role</label>
              <select value={newEmp.role} onChange={e => setNewEmp({ ...newEmp, role: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Site Engineer">Site Engineer</option>
                <option value="Procurement Officer">Procurement Officer</option>
                <option value="Accounts">Accounts</option>
                <option value="Architect">Architect</option>
                <option value="Contractor">Contractor</option>
                <option value="Sales Executive">Sales Executive</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Department</label>
              <input required type="text" value={newEmp.department} onChange={e => setNewEmp({ ...newEmp, department: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Email</label>
              <input required type="email" value={newEmp.email} onChange={e => setNewEmp({ ...newEmp, email: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Phone</label>
              <input required type="tel" value={newEmp.phone} onChange={e => setNewEmp({ ...newEmp, phone: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Employee</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
