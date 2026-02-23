import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './AdminPages.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    jwtExpiration: 86400,
    passwordMinLength: 8,
    maxLoginAttempts: 5,
    sessionTimeout: 3600,
    enableTwoFactor: false,
    maintenanceMode: false,
    apiRateLimit: 1000,
    databaseBackupHour: 2,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>System Settings</h2>
      </div>

      {saved && <div className="success-message">Settings saved successfully!</div>}

      <div className="settings-grid">
        <div className="admin-card">
          <h3>Authentication Settings</h3>
          <div className="setting-group">
            <label>JWT Token Expiration (seconds)</label>
            <input 
              type="number" 
              value={settings.jwtExpiration}
              onChange={(e) => handleChange('jwtExpiration', parseInt(e.target.value))}
            />
            <small>Default: 86400 (24 hours)</small>
          </div>
          <div className="setting-group">
            <label>Password Minimum Length</label>
            <input 
              type="number" 
              min="4" 
              max="20"
              value={settings.passwordMinLength}
              onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
            />
          </div>
          <div className="setting-group">
            <label>Max Login Attempts</label>
            <input 
              type="number" 
              value={settings.maxLoginAttempts}
              onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
            />
          </div>
          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.enableTwoFactor}
                onChange={(e) => handleChange('enableTwoFactor', e.target.checked)}
              />
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>

        <div className="admin-card">
          <h3>Session & Performance</h3>
          <div className="setting-group">
            <label>Session Timeout (seconds)</label>
            <input 
              type="number" 
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
            />
            <small>User will be logged out after inactive time</small>
          </div>
          <div className="setting-group">
            <label>API Rate Limit (requests/hour)</label>
            <input 
              type="number" 
              value={settings.apiRateLimit}
              onChange={(e) => handleChange('apiRateLimit', parseInt(e.target.value))}
            />
          </div>
          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              />
              Maintenance Mode (disables user access)
            </label>
          </div>
        </div>

        <div className="admin-card">
          <h3>Backup & Database</h3>
          <div className="setting-group">
            <label>Daily Backup Time (hour)</label>
            <select 
              value={settings.databaseBackupHour}
              onChange={(e) => handleChange('databaseBackupHour', parseInt(e.target.value))}
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={i}>{i.toString().padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>
          <button className="btn-secondary">Backup Now</button>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary" onClick={handleSave}>
       Save Settings
        </button>
        <button className="btn-secondary">Reset to Defaults</button>
      </div>
    </div>
  );
};

export default SystemSettings;
