import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { User, Shield, Building, MapPin, Key } from 'lucide-react';

export default function ProfilePage({ role = 'pm', name = 'Rahul Mehta' }) {
  const { state } = useApp();
  const emp = state.employees.find(e => e.name.toLowerCase().includes(name.toLowerCase().split(' ')[0])) || state.employees[1];
  
  const [formData, setFormData] = useState({
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <PageHeader title="My Profile" subtitle="Manage your personal profile and account credentials." />
      {saved && (
        <div style={{ padding: '12px 16px', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '20px', fontSize: '0.875rem' }}>
          Profile details updated successfully.
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 700, margin: '0 auto 16px' }}>
            {emp.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{emp.name}</h3>
          <p style={{ color: 'var(--color-blue)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px' }}>{emp.role}</p>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#e0f2fe', color: '#0369a1', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
            {emp.department} • {emp.designation}
          </div>
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={14} /> Employee ID: <strong>{emp.id}</strong>
            </div>
            <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={14} /> Projects: <strong>{emp.projects?.join(', ') || 'All Projects'}</strong>
            </div>
            {emp.sites && emp.sites.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} /> Sites: <strong>{emp.sites.join(', ')}</strong>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} /> Personal Information
            </h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Changes</button>
              </div>
            </form>
          </div>

          <div className="card">
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} /> Change Password
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 20px' }} onClick={() => alert('Password update simulated successfully.')}>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
