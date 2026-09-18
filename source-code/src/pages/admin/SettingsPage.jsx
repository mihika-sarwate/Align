import React from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="System configurations and preferences." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Preferences</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: '6px', fontWeight: 500, color: 'var(--color-blue)' }}>General</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Notifications</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Security</li>
            <li style={{ padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Integrations</li>
          </ul>
        </div>
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>General Settings</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Company Name</label>
              <input type="text" defaultValue="Align Construction Co." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Support Email</label>
              <input type="email" defaultValue="admin@align.com" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Timezone</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }}>
                <option>Asia/Kolkata (IST)</option>
                <option>UTC</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <input type="checkbox" id="maintenance" />
              <label htmlFor="maintenance" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Enable Maintenance Mode</label>
            </div>
            <button type="button" onClick={() => alert('Settings Saved!')} style={{ marginTop: '16px', padding: '10px 24px', background: 'var(--color-blue)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', alignSelf: 'flex-start', fontWeight: 500 }}>Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
}