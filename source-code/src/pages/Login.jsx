import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Briefcase, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const ROLE_CREDENTIALS = {
  'Admin':                { username: 'admin',       password: 'password', path: '/admin' },
  'Project Manager':      { username: 'pm',          password: 'password', path: '/pm' },
  'Site Engineer':        { username: 'engineer',    password: 'password', path: '/engineer' },
  'Procurement Officer':  { username: 'procurement', password: 'password', path: '/procurement' },
  'Accounts':             { username: 'accounts',    password: 'password', path: '/accounts' },
  'Architect':            { username: 'architect',   password: 'password', path: '/architect' },
  'Contractor':           { username: 'contractor',  password: 'password', path: '/contractor' },
  'Sales Executive':      { username: 'sales',       password: 'password', path: '/sales' },
};

export default function Login({ onLogin }) {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const creds = ROLE_CREDENTIALS[role];
    if (creds && username === creds.username && password === creds.password) {
      onLogin({ role });
      navigate(creds.path);
    } else {
      setError('Invalid credentials for selected role');
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
                onChange={e => { setRole(e.target.value); setError(''); setUsername(''); setPassword(''); }}
              >
                {Object.keys(ROLE_CREDENTIALS).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="username"
                placeholder={`e.g. ${hint?.username}`}
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

          <div className="login-hint">
            <span>Demo: <strong>{hint?.username}</strong> / <strong>password</strong></span>
          </div>

          <button type="submit" className="login-submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
