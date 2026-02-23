import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './AdminPages.css';

const Security = () => {
  const [securityPolicies, setSecurityPolicies] = useState({
    failedLoginTracking: true,
    lockoutDuration: 30,
    ipWhitelist: false,
    passwordExpiration: false,
    passwordExpirationDays: 90,
    requirePasswordChange: false,
    enableAuditLog: true,
  });

  const [failedLogins, setFailedLogins] = useState([
    { ip: '192.168.1.100', username: 'user@example.com', attempts: 3, lastAttempt: '2024-01-15 14:22', status: 'active' },
    { ip: '203.0.113.42', username: 'admin', attempts: 5, lastAttempt: '2024-01-15 11:15', status: 'locked' },
  ]);

  const handlePolicyChange = (key, value) => {
    setSecurityPolicies(prev => ({ ...prev, [key]: value }));
  };

  const unlockIp = (ip) => {
    setFailedLogins(failedLogins.filter(log => log.ip !== ip));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Security Settings</h2>
      </div>

      <div className="security-grid">
        <div className="admin-card">
          <h3>Security Policies</h3>
          
          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={securityPolicies.failedLoginTracking}
                onChange={(e) => handlePolicyChange('failedLoginTracking', e.target.checked)}
              />
              Track Failed Login Attempts
            </label>
          </div>

          <div className="setting-group">
            <label>Account Lockout Duration (minutes)</label>
            <input 
              type="number" 
              value={securityPolicies.lockoutDuration}
              onChange={(e) => handlePolicyChange('lockoutDuration', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={securityPolicies.ipWhitelist}
                onChange={(e) => handlePolicyChange('ipWhitelist', e.target.checked)}
              />
              IP Whitelist (restrict access by IP)
            </label>
          </div>

          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={securityPolicies.passwordExpiration}
                onChange={(e) => handlePolicyChange('passwordExpiration', e.target.checked)}
              />
              Enforce Password Expiration
            </label>
          </div>

          {securityPolicies.passwordExpiration && (
            <div className="setting-group nested">
              <label>Password Expiration Days</label>
              <input 
                type="number" 
                value={securityPolicies.passwordExpirationDays}
                onChange={(e) => handlePolicyChange('passwordExpirationDays', parseInt(e.target.value))}
              />
            </div>
          )}

          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={securityPolicies.enableAuditLog}
                onChange={(e) => handlePolicyChange('enableAuditLog', e.target.checked)}
              />
              Enable Audit Logging
            </label>
          </div>
        </div>

        <div className="admin-card">
          <h3>Failed Login Tracking</h3>
          <div className="failed-logins-table">
            <table>
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>Username</th>
                  <th>Attempts</th>
                  <th>Last Attempt</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {failedLogins.map((log, idx) => (
                  <tr key={idx} className={`status-${log.status}`}>
                    <td><code>{log.ip}</code></td>
                    <td>{log.username}</td>
                    <td><strong>{log.attempts}</strong></td>
                    <td>{log.lastAttempt}</td>
                    <td><span className={`status-badge ${log.status}`}>{log.status}</span></td>
                    <td>
                      <button 
                        className="btn-small"
                        onClick={() => unlockIp(log.ip)}
                      >
                        Unlock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {failedLogins.length === 0 && <p className="empty-state">No failed login attempts</p>}
          </div>
        </div>

        <div className="admin-card">
          <h3>IP Whitelist</h3>
          <div className="ip-whitelist">
            <input type="text" placeholder="Add IP address (e.g., 192.168.1.0/24)" />
            <button className="btn-secondary">Add IP</button>
          </div>
          <div className="ip-list">
            <p className="empty-state">No IPs whitelisted</p>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

export default Security;
