import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import './Header.css';

const roleUserMap = {
  admin:     { initials: 'AS', name: 'Arjun Sharma',       role: 'System Administrator' },
  pm:        { initials: 'RM', name: 'Rahul Mehta',        role: 'Project Manager' },
  se:        { initials: 'RK', name: 'Rajesh K',           role: 'Site Engineer' },
  po:        { initials: 'PR', name: 'Priya Rao',          role: 'Procurement Officer' },
  accounts:  { initials: 'AC', name: 'Anjali Chauhan',     role: 'Accounts' },
  architect: { initials: 'VP', name: 'Vikram Patel',       role: 'Architect' },
  contractor:{ initials: 'RC', name: 'Ramesh Contractor',  role: 'Contractor' },
  sales:     { initials: 'RS', name: 'Riya Sharma',        role: 'Sales Executive' },
};

export default function Header({ role = 'admin' }) {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const user = roleUserMap[role] || roleUserMap.admin;

  const userNotifs = state.notifications.filter(n => !n.read);
  const unreadCount = userNotifs.length;

  const handleMarkRead = (id) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const handleMarkAllRead = () => {
    dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' });
    setShowNotif(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('align_auth');
    } catch (e) {
      console.error(e);
    }
    navigate('/login');
    window.location.reload();
  };


  return (
    <header className="header">
      <div className="header-left">
        <button
          className="icon-btn menu-btn"
          onClick={() => document.body.classList.toggle('sidebar-collapsed')}
          title="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="header-right">
        {/* Notification Bell */}
        <div className="notification-wrapper" style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => setShowNotif(s => !s)}
            title="Notifications"
          >
            <Bell size={20} />
          </button>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}

          {showNotif && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Notifications</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {unreadCount > 0 && (
                    <button
                      style={{ fontSize: '0.75rem', color: 'var(--color-blue)', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={handleMarkAllRead}
                    >
                      Mark all read
                    </button>
                  )}
                  <button className="icon-btn" onClick={() => setShowNotif(false)} style={{ width: 24, height: 24 }}>
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="notif-list">
                {state.notifications.slice(0, 10).length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    No notifications
                  </div>
                ) : state.notifications.slice(0, 10).map(n => (
                  <div
                    key={n.id}
                    className={`notif-item ${!n.read ? 'unread' : ''}`}
                    onClick={() => { handleMarkRead(n.id); setShowNotif(false); }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontWeight: !n.read ? 600 : 400, fontSize: '0.8rem' }}>{n.title}</span>
                      {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-blue)', flexShrink: 0, marginTop: 4 }} />}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{n.message}</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{n.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div
            className="avatar pm-avatar"
            style={{
              background: role === 'admin' ? 'var(--color-blue)' :
                         role === 'pm' ? 'var(--color-teal)' :
                         role === 'se' ? 'var(--color-slate)' :
                         role === 'architect' ? 'var(--color-purple)' :
                         'var(--color-orange)',
            }}
          >
            {user.initials}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
        </div>

        {/* Logout */}
        <button
          className="icon-btn"
          onClick={handleLogout}
          title="Logout"
          style={{ color: 'var(--color-red)' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
