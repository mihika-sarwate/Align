import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Briefcase } from 'lucide-react';
import './Login.css';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'Admin' && username === 'admin' && password === 'password') {
      onLogin({ role: 'Admin' });
      navigate('/admin');
    } else if (role === 'Project Manager' && username === 'pm' && password === 'password') {
      onLogin({ role: 'Project Manager' });
      navigate('/pm');
    } else if (role === 'Site Engineer' && username === 'engineer' && password === 'password') {
      onLogin({ role: 'Site Engineer' });
      navigate('/engineer');
    } else if (role === 'Procurement Officer' && username === 'procurement' && password === 'password') {
      onLogin({ role: 'Procurement Officer' });
      navigate('/procurement');
    } else if (role === 'Accounts Executive' && username === 'accounts' && password === 'password') {
      onLogin({ role: 'Accounts Executive' });
      navigate('/accounts');
    } else if (role === 'Sales Executive' && username === 'sales' && password === 'password') {
      onLogin({ role: 'Sales Executive' });
      navigate('/sales');
    } else {
      setError('Invalid credentials for selected role');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="var(--color-blue)"/>
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
                onChange={(e) => {
                  setRole(e.target.value);
                  setError('');
                }}
              >
                <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Site Engineer">Site Engineer</option>
                <option value="Procurement Officer">Procurement Officer</option>
                <option value="Accounts Executive">Accounts Executive</option>
                <option value="Sales Executive">Sales Executive</option>
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
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
            {error && <span className="error-text">{error}</span>}
          </div>
          
          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
