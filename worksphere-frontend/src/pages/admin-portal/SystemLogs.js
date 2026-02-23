import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './AdminPages.css';

const SystemLogs = () => {
  const [logs] = useState([
    { id: 1, timestamp: '2024-01-15 14:35:22', type: 'LOGIN', user: 'john_doe', action: 'User logged in', level: 'info' },
    { id: 2, timestamp: '2024-01-15 14:30:10', type: 'REQUEST_APPROVAL', user: 'sarah_manager', action: 'Approved leave request', level: 'info' },
    { id: 3, timestamp: '2024-01-15 14:25:45', type: 'USER_UPDATE', user: 'admin', action: 'Updated user role', level: 'info' },
    { id: 4, timestamp: '2024-01-15 14:20:00', type: 'FAILED_LOGIN', user: 'unknown', action: 'Failed login attempt from 203.0.113.42', level: 'warning' },
    { id: 5, timestamp: '2024-01-15 14:15:33', type: 'SYSTEM_ERROR', user: 'system', action: 'Database connection timeout', level: 'error' },
    { id: 6, timestamp: '2024-01-15 14:10:12', type: 'LOGOUT', user: 'bob_smith', action: 'User logged out', level: 'info' },
    { id: 7, timestamp: '2024-01-15 14:05:00', type: 'SETTINGS_CHANGE', user: 'admin', action: 'System settings updated', level: 'warning' },
    { id: 8, timestamp: '2024-01-15 13:55:45', type: 'LOGIN', user: 'hr_admin', action: 'User logged in', level: 'info' },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchUser, setSearchUser] = useState('');

  const levelColors = {
    info: '#2196F3',
    warning: '#FF9800',
    error: '#F44336',
  };

  const filteredLogs = logs.filter(log => 
    (filterType === 'all' || log.type === filterType) &&
    (filterLevel === 'all' || log.level === filterLevel) &&
    (log.user.toLowerCase().includes(searchUser.toLowerCase()) || 
     log.action.toLowerCase().includes(searchUser.toLowerCase()))
  );

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Type', 'User', 'Action', 'Level'],
      ...filteredLogs.map(log => [log.timestamp, log.type, log.user, log.action, log.level])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-logs.csv';
    a.click();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>System Logs</h2>
        <button className="btn-primary" onClick={exportLogs}>
       Export Logs
        </button>
      </div>

      <div className="admin-card">
        <div className="card-header">
          <h3>System Activity Log</h3>
          <div className="log-filters">
            <input 
              type="text" 
              placeholder="Search by user or action..." 
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="search-input"
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option value="all">All Types</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
              <option value="REQUEST_APPROVAL">Request Approval</option>
              <option value="USER_UPDATE">User Update</option>
              <option value="FAILED_LOGIN">Failed Login</option>
              <option value="SYSTEM_ERROR">System Error</option>
              <option value="SETTINGS_CHANGE">Settings Change</option>
            </select>
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="filter-select">
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <div className="logs-table">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>User</th>
                <th>Action</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className={`log-level-${log.level}`}>
                  <td>{log.timestamp}</td>
                  <td><span className="log-type-badge">{log.type}</span></td>
                  <td><strong>{log.user}</strong></td>
                  <td>{log.action}</td>
                  <td>
                    <span 
                      className="log-level-badge" 
                      style={{ backgroundColor: levelColors[log.level] }}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLogs.length === 0 && <p className="empty-state">No logs match the selected filters</p>}
        </div>
      </div>

      <div className="log-stats">
        <div className="stat-card">
          <h4>Total Events</h4>
          <p className="stat-number">{logs.length}</p>
        </div>
        <div className="stat-card">
          <h4>Info Events</h4>
          <p className="stat-number" style={{ color: '#2196F3' }}>{logs.filter(l => l.level === 'info').length}</p>
        </div>
        <div className="stat-card">
          <h4>Warnings</h4>
          <p className="stat-number" style={{ color: '#FF9800' }}>{logs.filter(l => l.level === 'warning').length}</p>
        </div>
        <div className="stat-card">
          <h4>Errors</h4>
          <p className="stat-number" style={{ color: '#F44336' }}>{logs.filter(l => l.level === 'error').length}</p>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
