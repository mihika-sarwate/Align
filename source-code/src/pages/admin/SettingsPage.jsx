import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import './SettingsPage.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'Notifications', 'Security', 'Integrations'];

  return (
    <>
      <PageHeader title="Settings" subtitle="System configurations and preferences." />
      
      <div className="settings-container">
        {/* Sidebar for Settings */}
        <div className="settings-sidebar">
          <h3 className="settings-sidebar-title">Preferences</h3>
          <ul className="settings-nav">
            {tabs.map(tab => (
              <li 
                key={tab}
                className={`settings-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="settings-content">
          
          {activeTab === 'General' && (
            <div className="settings-section">
              <h3 className="settings-section-title">General Settings</h3>
              <p className="settings-section-subtitle">Update your company details and global configurations.</p>
              
              <form className="settings-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" defaultValue="Align Construction Co." />
                </div>
                
                <div className="form-group">
                  <label>Support Email</label>
                  <input type="email" defaultValue="admin@align.com" />
                </div>
                
                <div className="form-group">
                  <label>Timezone</label>
                  <select defaultValue="ist">
                    <option value="ist">Asia/Kolkata (IST)</option>
                    <option value="utc">UTC</option>
                    <option value="est">Eastern Time (EST)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select defaultValue="inr">
                    <option value="inr">Indian Rupee (₹)</option>
                    <option value="usd">US Dollar ($)</option>
                    <option value="eur">Euro (€)</option>
                  </select>
                </div>
                
                <div className="form-toggle">
                  <div className="toggle-info">
                    <h4>Maintenance Mode</h4>
                    <p>Disable access to the platform for all non-admin users.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>

                <button type="button" className="btn-save" onClick={() => alert('General Settings Saved!')}>Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Notification Preferences</h3>
              <p className="settings-section-subtitle">Control how and when alerts are sent to users.</p>
              
              <div className="settings-form">
                <div className="form-toggle">
                  <div className="toggle-info">
                    <h4>Email Alerts</h4>
                    <p>Send daily summaries to project managers.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-toggle">
                  <div className="toggle-info">
                    <h4>Push Notifications</h4>
                    <p>Notify engineers instantly on mobile about critical issues.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-toggle">
                  <div className="toggle-info">
                    <h4>Inventory Warnings</h4>
                    <p>Alert procurement team when stock falls below 10%.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <button type="button" className="btn-save" onClick={() => alert('Notification Settings Saved!')}>Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Security & Access</h3>
              <p className="settings-section-subtitle">Manage password policies and two-factor authentication.</p>
              
              <form className="settings-form">
                <div className="form-toggle">
                  <div className="toggle-info">
                    <h4>Require 2FA</h4>
                    <p>Mandatory two-factor authentication for Admin roles.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-group">
                  <label>Session Timeout (Minutes)</label>
                  <input type="number" defaultValue={30} />
                </div>
                
                <div className="form-group">
                  <label>Password Expiry (Days)</label>
                  <input type="number" defaultValue={90} />
                </div>

                <button type="button" className="btn-save" onClick={() => alert('Security Settings Saved!')}>Update Security</button>
              </form>
            </div>
          )}

          {activeTab === 'Integrations' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Third-Party Integrations</h3>
              <p className="settings-section-subtitle">Connect ALIGN with your favorite external tools.</p>
              
              <div className="integration-cards">
                <div className="integration-card">
                  <div className="integration-info">
                    <h4>Slack</h4>
                    <p>Push issue alerts directly to Slack channels.</p>
                  </div>
                  <button className="btn-connect connected">Connected</button>
                </div>

                <div className="integration-card">
                  <div className="integration-info">
                    <h4>Tally ERP 9</h4>
                    <p>Sync expenses and purchase orders automatically.</p>
                  </div>
                  <button className="btn-connect">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-info">
                    <h4>Google Drive</h4>
                    <p>Backup documents and blueprints to cloud storage.</p>
                  </div>
                  <button className="btn-connect">Connect</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}