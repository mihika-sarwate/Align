import React, { useState } from 'react';
import TabNav from '../../components/TabNav';
import PageHeader from '../../components/common/PageHeader';
import './SettingsPage.css';

const TABS = [
  'Organization',
  'Users & Access',
  'Project Settings',
  'Task & Phase Settings',
  'Procurement',
  'Finance',
  'Notifications',
  'Documents',
  'Security & Audit',
  'General'
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Organization');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <PageHeader
        title="Platform & Enterprise Settings"
        subtitle="Manage company information, RBAC policies, phase definitions, tax configuration, and audit controls."
      />
      <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="card" style={{ padding: '24px', maxWidth: '900px' }}>
        {saved && (
          <div style={{ padding: '12px 16px', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '20px', fontSize: '0.875rem' }}>
            Settings saved and persisted successfully.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeTab === 'Organization' && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Organization Details</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Enterprise Entity Name</label>
                <input type="text" defaultValue="ALIGN Construction & Real Estate Developers Ltd" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Corporate PAN</label>
                  <input type="text" defaultValue="AAACA1234F" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Corporate GSTIN</label>
                  <input type="text" defaultValue="27AAACA1234F1Z5" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Registered Office Address</label>
                <input type="text" defaultValue="Level 14, Tower 3, Equinox Business Park, BKC, Mumbai - 400051" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }} />
              </div>
            </>
          )}

          {activeTab === 'Users & Access' && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Access & Authentication Governance</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Default Session Timeout (Minutes)</label>
                <input type="number" defaultValue={60} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Enforce Two-Factor Authentication (2FA)</label>
                <select defaultValue="admin_pm" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <option value="all">All Roles</option>
                  <option value="admin_pm">Admin, PM, and Accounts only</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'Task & Phase Settings' && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Construction Phase Standardization</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                System-enforced 5 lifecycle phases: PC (Preconstruction), SP (Superstructure I), SS (Superstructure II), BS (Building Services), FS (Fire Safety).
              </p>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Task Code Format Prefix</label>
                <input type="text" disabled defaultValue="[Phase 2][Activity 2][Seq 2] e.g. PC0301" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }} />
              </div>
            </>
          )}

          {activeTab === 'Procurement' && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Procurement Thresholds & Approvals</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>PO Auto-Approval Limit (₹)</label>
                  <input type="number" defaultValue={100000} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Minimum Vendor RFQ Quotations</label>
                  <input type="number" defaultValue={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'Finance' && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Financial & Tax Configuration</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Standard TDS Rate on Contractors (%)</label>
                  <input type="number" defaultValue={2} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Three-Way Matching Tolerance (₹)</label>
                  <input type="number" defaultValue={500} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
            </>
          )}

          {!['Organization', 'Users & Access', 'Task & Phase Settings', 'Procurement', 'Finance'].includes(activeTab) && (
            <>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{activeTab} Preferences</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Configure platform notifications, document watermarks, and immutable audit logs.
              </p>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Notification Channels</label>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
                  <label><input type="checkbox" defaultChecked /> In-App Notification Bell</label>
                  <label><input type="checkbox" defaultChecked /> Email Digest</label>
                  <label><input type="checkbox" /> SMS Escalations</label>
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Settings</button>
          </div>
        </form>
      </div>
    </>
  );
}