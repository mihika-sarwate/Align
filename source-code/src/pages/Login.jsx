import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Briefcase, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const ROLE_CREDENTIALS = {
  'Admin': {
    usernames: ['admin', 'arjun.sharma@align.in', 'arjun.sharma'],
    passwords: ['password', 'admin123'],
    path: '/admin',
    label: 'admin / password'
  },
  'Project Manager': {
    usernames: ['pm', 'rahul.mehta@align.in', 'rahul.mehta'],
    passwords: ['password', 'pm123'],
    path: '/pm',
    label: 'pm / password'
  },
  'Site Engineer': {
    usernames: ['engineer', 'se', 'rajesh.k@align.in', 'rajesh.k'],
    passwords: ['password', 'engineer123'],
    path: '/engineer',
    label: 'engineer / password'
  },
  'Procurement Officer': {
    usernames: ['procurement', 'po', 'priya.rao@align.in', 'priya.rao'],
    passwords: ['password', 'procure123', 'po123'],
    path: '/procurement',
    label: 'procurement / password'
  },
  'Accounts': {
    usernames: ['accounts', 'anjali.chauhan@align.in', 'anjali.chauhan'],
    passwords: ['password', 'accounts123'],
    path: '/accounts',
    label: 'accounts / password'
  },
  'Architect': {
    usernames: ['architect', 'vikram.patel@align.in', 'vikram.patel'],
    passwords: ['password', 'architect123'],
    path: '/architect',
    label: 'architect / password'
  },
  'Contractor': {
    usernames: ['contractor', 'ramesh.c@align.in', 'ramesh.c'],
    passwords: ['password', 'contractor123'],
    path: '/contractor',
    label: 'contractor / password'
  },
  'Sales Executive': {
    usernames: ['sales', 'riya.sharma@align.in', 'riya.sharma'],
    passwords: ['password', 'sales123'],
    path: '/sales',
    label: 'sales / password'
  },
};

export default function Login({ onLogin }) {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    const cred = ROLE_CREDENTIALS[selectedRole];
    if (cred) {
      setUsername(cred.usernames[0]);
      setPassword(cred.passwords[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const creds = ROLE_CREDENTIALS[role];
    const u = username.trim().toLowerCase();
    const p = password.trim();

    const usernameValid = creds.usernames.some(x => x.toLowerCase() === u);
    const passwordValid = creds.passwords.includes(p);

    if (creds && usernameValid && passwordValid) {
      onLogin({ role });
      navigate(creds.path);
    } else {
      setError(`Invalid credentials. Use "${creds.usernames[0]}" / "password" (or "${creds.usernames[1]}").`);
    }
  };

  const hint = ROLE_CREDENTIALS[role];

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="var(--color-blue)" />
            </svg>
          </div>
          <h2 className="login-title">ALIGN Platform</h2>
          <p className="login-subtitle">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <div className="input-wrapper">
              <Briefcase size={18} className="input-icon" />
              <select
                id="role"
                value={role}
                onChange={e => handleRoleChange(e.target.value)}
              >
                {Object.keys(ROLE_CREDENTIALS).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="username"
                placeholder={`e.g. ${hint?.usernames[0]} or ${hint?.usernames[1]}`}
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="input-icon-right">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="login-hint" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Demo Username: <strong>{hint?.usernames[0]}</strong> or <strong>{hint?.usernames[1]}</strong></span>
            <span>Demo Password: <strong>password</strong> or <strong>{hint?.passwords[1]}</strong></span>
          </div>

          <button type="submit" className="login-submit">Sign In</button>
        </form>

        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>
            Quick One-Click Demo Role Switch:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {Object.keys(ROLE_CREDENTIALS).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                style={{
                  padding: '6px 4px',
                  fontSize: '0.7rem',
                  borderRadius: '6px',
                  border: role === r ? '1px solid var(--color-blue)' : '1px solid var(--border-color)',
                  background: role === r ? 'var(--color-blue-light)' : 'var(--bg-main)',
                  color: role === r ? 'var(--color-blue)' : 'var(--text-primary)',
                  fontWeight: role === r ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={r}
              >
                {r.replace(' Executive', '').replace(' Officer', '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
