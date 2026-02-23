import React from 'react';
import Icon from '../../components/DashboardIcons';

const AdminOverview = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Overview</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="users" />
          </div>
          <div className="stat-content">
            <h4>Total Users</h4>
            <p className="stat-number">1,247</p>
            <small>+12 this month</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="clock" />
          </div>
          <div className="stat-content">
            <h4>System Uptime</h4>
            <p className="stat-number">99.9%</p>
            <small>Last 30 days</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="database" />
          </div>
          <div className="stat-content">
            <h4>Storage Usage</h4>
            <p className="stat-number">67%</p>
            <small>~340 GB of 500 GB</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="shield" />
          </div>
          <div className="stat-content">
            <h4>Security Score</h4>
            <p className="stat-number">95/100</p>
            <small>Excellent</small>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="admin-card">
          <h3>System Health Monitor</h3>
          <div className="health-grid">
            <div className="health-item">
              <span className="health-indicator active"></span>
              <div>
                <p className="health-name">API Server</p>
                <p className="health-status">Operational</p>
              </div>
            </div>
            <div className="health-item">
              <span className="health-indicator active"></span>
              <div>
                <p className="health-name">Database</p>
                <p className="health-status">Operational</p>
              </div>
            </div>
            <div className="health-item">
              <span className="health-indicator active"></span>
              <div>
                <p className="health-name">Cache Service</p>
                <p className="health-status">Operational</p>
              </div>
            </div>
            <div className="health-item">
              <span className="health-indicator warning"></span>
              <div>
                <p className="health-name">Email Service</p>
                <p className="health-status">Degraded (90% uptime)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>User Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <p className="activity-user">John Doe</p>
              <p className="activity-action">Logged in</p>
              <p className="activity-time">2 minutes ago</p>
            </div>
            <div className="activity-item">
              <p className="activity-user">Sarah Johnson</p>
              <p className="activity-action">Approved request</p>
              <p className="activity-time">15 minutes ago</p>
            </div>
            <div className="activity-item">
              <p className="activity-user">Mike Wilson</p>
              <p className="activity-action">Updated profile</p>
              <p className="activity-time">1 hour ago</p>
            </div>
            <div className="activity-item">
              <p className="activity-user">Emma Davis</p>
              <p className="activity-action">Submitted request</p>
              <p className="activity-time">3 hours ago</p>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>Recent System Events</h3>
          <div className="events-list">
            <div className="event-item">
              <span className="event-type info">INFO</span>
              <div>
                <p className="event-title">Database backup completed</p>
                <p className="event-time">Jan 15, 2024 2:30 AM</p>
              </div>
            </div>
            <div className="event-item">
              <span className="event-type warning">WARNING</span>
              <div>
                <p className="event-title">High memory usage detected</p>
                <p className="event-time">Jan 15, 2024 1:15 AM</p>
              </div>
            </div>
            <div className="event-item">
              <span className="event-type info">INFO</span>
              <div>
                <p className="event-title">System update deployed</p>
                <p className="event-time">Jan 14, 2024 11:45 PM</p>
              </div>
            </div>
            <div className="event-item">
              <span className="event-type error">ERROR</span>
              <div>
                <p className="event-title">Failed API request from unknown IP</p>
                <p className="event-time">Jan 14, 2024 10:20 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>User Role Distribution</h3>
          <div className="roles-chart">
            <div className="role-stat">
              <p className="role-name">Employees</p>
              <p className="role-count">856</p>
              <div className="role-bar"><div className="role-fill" style={{ width: '68%' }}></div></div>
            </div>
            <div className="role-stat">
              <p className="role-name">Managers</p>
              <p className="role-count">240</p>
              <div className="role-bar"><div className="role-fill" style={{ width: '19%' }}></div></div>
            </div>
            <div className="role-stat">
              <p className="role-name">HR Personnel</p>
              <p className="role-count">120</p>
              <div className="role-bar"><div className="role-fill" style={{ width: '10%' }}></div></div>
            </div>
            <div className="role-stat">
              <p className="role-name">Admins</p>
              <p className="role-count">31</p>
              <div className="role-bar"><div className="role-fill" style={{ width: '2.5%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>Security Alerts</h3>
          <div className="alerts-list">
            <div className="alert-item alert-critical">
              <span className="alert-icon">!</span>
              <div>
                <p className="alert-title">Suspicious login attempts detected</p>
                <p className="alert-desc">12 failed attempts from IP 203.0.113.42 in last hour</p>
              </div>
            </div>
            <div className="alert-item alert-warning">
              <span className="alert-icon">⚠</span>
              <div>
                <p className="alert-title">SSL certificate expires soon</p>
                <p className="alert-desc">Certificate expires in 45 days</p>
              </div>
            </div>
            <div className="alert-item alert-info">
              <span className="alert-icon">i</span>
              <div>
                <p className="alert-title">System backup completed</p>
                <p className="alert-desc">Incremental backup of 125 GB completed successfully</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>System Performance</h3>
          <div className="performance-metrics">
            <div className="metric">
              <p className="metric-label">CPU Usage</p>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '45%' }}></div>
              </div>
              <p className="metric-value">45%</p>
            </div>
            <div className="metric">
              <p className="metric-label">Memory Usage</p>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '72%' }}></div>
              </div>
              <p className="metric-value">72%</p>
            </div>
            <div className="metric">
              <p className="metric-label">Disk I/O</p>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '28%' }}></div>
              </div>
              <p className="metric-value">28%</p>
            </div>
            <div className="metric">
              <p className="metric-label">Network</p>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '61%' }}></div>
              </div>
              <p className="metric-value">61%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
