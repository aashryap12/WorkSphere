import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../components/DashboardTopBar';
import Icon from '../components/DashboardIcons';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    setUser({ username, role });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container role-admin">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">System Admin</p>
        </div>
        <nav className="sidebar-nav">
          <a href="#overview" className="nav-item active">
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </a>
          <a href="#users" className="nav-item">
            <span className="nav-icon"><Icon name="users" /></span>
            User Management
          </a>
          <a href="#system" className="nav-item">
            <span className="nav-icon"><Icon name="settings" /></span>
            System Settings
          </a>
          <a href="#security" className="nav-item">
            <span className="nav-icon"><Icon name="lock" /></span>
            Security
          </a>
          <a href="#integrations" className="nav-item">
            <span className="nav-icon"><Icon name="link" /></span>
            Integrations
          </a>
          <a href="#logs" className="nav-item">
            <span className="nav-icon"><Icon name="log" /></span>
            System Logs
          </a>
          <a href="#analytics" className="nav-item">
            <span className="nav-icon"><Icon name="trend" /></span>
            Analytics
          </a>
          <a href="#backup" className="nav-item">
            <span className="nav-icon"><Icon name="database" /></span>
            Backup & Restore
          </a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="Admin" username={user.username} />
        <div className="dashboard-header">
          <div>
            <h1>System Administration</h1>
            <p className="dashboard-subtitle">Welcome, {user.username} - Complete System Control</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary">
              <Icon name="settings" className="icon" /> System Config
            </button>
            <button className="btn-secondary">
              <Icon name="bell" className="icon" /> System Alerts (2)
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue"><Icon name="users" /></div>
            <div className="stat-content">
              <p className="stat-label">Total Users</p>
              <h3 className="stat-value">1,247</h3>
              <span className="stat-change positive">+18 this week</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><Icon name="success" /></div>
            <div className="stat-content">
              <p className="stat-label">System Uptime</p>
              <h3 className="stat-value">99.9%</h3>
              <span className="stat-change positive">Excellent</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><Icon name="database" /></div>
            <div className="stat-content">
              <p className="stat-label">Storage Used</p>
              <h3 className="stat-value">67%</h3>
              <span className="stat-change neutral">450 GB / 670 GB</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><Icon name="lock" /></div>
            <div className="stat-content">
              <p className="stat-label">Security Score</p>
              <h3 className="stat-value">95/100</h3>
              <span className="stat-change positive">Strong</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card wide">
            <div className="card-header">
              <h3>System Health Monitor</h3>
              <button className="btn-link">Refresh</button>
            </div>
            <div className="health-grid">
              <div className="health-item status-healthy">
                <div className="health-icon"><Icon name="overview" /></div>
                <div className="health-info">
                  <h4>Application Server</h4>
                  <p>Running smoothly</p>
                  <span className="health-status">Healthy</span>
                </div>
                <div className="health-metrics">
                  <span>CPU: 45%</span>
                  <span>Memory: 62%</span>
                </div>
              </div>
              <div className="health-item status-healthy">
                <div className="health-icon"><Icon name="database" /></div>
                <div className="health-info">
                  <h4>Database</h4>
                  <p>MongoDB Atlas</p>
                  <span className="health-status">Healthy</span>
                </div>
                <div className="health-metrics">
                  <span>Connections: 247</span>
                  <span>Response: 12ms</span>
                </div>
              </div>
              <div className="health-item status-warning">
                <div className="health-icon"><Icon name="link" /></div>
                <div className="health-info">
                  <h4>Cloud Storage</h4>
                  <p>AWS S3</p>
                  <span className="health-status warning">Warning</span>
                </div>
                <div className="health-metrics">
                  <span>Usage: 78%</span>
                  <span>Latency: 45ms</span>
                </div>
              </div>
              <div className="health-item status-healthy">
                <div className="health-icon"><Icon name="inbox" /></div>
                <div className="health-info">
                  <h4>Email Service</h4>
                  <p>SendGrid</p>
                  <span className="health-status">Healthy</span>
                </div>
                <div className="health-metrics">
                  <span>Sent: 1,234</span>
                  <span>Delivered: 99.8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>User Activity</h3>
              <select className="filter-select">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="activity-stats">
              <div className="activity-stat-item">
                <h4>248</h4>
                <p>Active Users</p>
                <span className="trend positive">↑ 12%</span>
              </div>
              <div className="activity-stat-item">
                <h4>1,847</h4>
                <p>Sessions Today</p>
                <span className="trend positive">↑ 8%</span>
              </div>
              <div className="activity-stat-item">
                <h4>5.2 min</h4>
                <p>Avg Session</p>
                <span className="trend neutral">→ 0%</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent System Events</h3>
            </div>
            <div className="events-list">
              <div className="event-item">
                <div className="event-icon success"><Icon name="success" /></div>
                <div className="event-content">
                  <h4>System Backup Completed</h4>
                  <p>Automated backup successful</p>
                  <span className="event-time">10 minutes ago</span>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon info"><Icon name="info" /></div>
                <div className="event-content">
                  <h4>Security Update Applied</h4>
                  <p>System patched to v2.4.1</p>
                  <span className="event-time">2 hours ago</span>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon warning"><Icon name="alert" /></div>
                <div className="event-content">
                  <h4>High Memory Usage Detected</h4>
                  <p>Server 3 reached 85% capacity</p>
                  <span className="event-time">5 hours ago</span>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon success"><Icon name="success" /></div>
                <div className="event-content">
                  <h4>Database Optimization</h4>
                  <p>Query performance improved by 23%</p>
                  <span className="event-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>User Role Distribution</h3>
            </div>
            <div className="role-distribution">
              <div className="role-item">
                <div className="role-bar">
                  <div className="role-fill blue" style={{width: '68%'}}></div>
                </div>
                <div className="role-info">
                  <span className="role-name">Employees</span>
                  <span className="role-count">848 (68%)</span>
                </div>
              </div>
              <div className="role-item">
                <div className="role-bar">
                  <div className="role-fill green" style={{width: '20%'}}></div>
                </div>
                <div className="role-info">
                  <span className="role-name">Managers</span>
                  <span className="role-count">249 (20%)</span>
                </div>
              </div>
              <div className="role-item">
                <div className="role-bar">
                  <div className="role-fill orange" style={{width: '10%'}}></div>
                </div>
                <div className="role-info">
                  <span className="role-name">HR</span>
                  <span className="role-count">125 (10%)</span>
                </div>
              </div>
              <div className="role-item">
                <div className="role-bar">
                  <div className="role-fill purple" style={{width: '2%'}}></div>
                </div>
                <div className="role-info">
                  <span className="role-name">Admins</span>
                  <span className="role-count">25 (2%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Security Alerts</h3>
              <span className="badge-count">2</span>
            </div>
            <div className="security-alerts">
              <div className="security-alert warning">
                <div className="alert-icon"><Icon name="alert" /></div>
                <div className="alert-content">
                  <h4>Failed Login Attempts</h4>
                  <p>5 failed attempts on admin account from IP: 192.168.1.45</p>
                  <button className="btn-alert-action">Investigate</button>
                </div>
              </div>
              <div className="security-alert info">
                <div className="alert-icon"><Icon name="info" /></div>
                <div className="alert-content">
                  <h4>Password Policy Update</h4>
                  <p>12 users need to update passwords by Mar 1</p>
                  <button className="btn-alert-action">View Users</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>System Performance</h3>
            </div>
            <div className="performance-metrics">
              <div className="perf-metric">
                <div className="perf-label">
                  <span>API Response Time</span>
                  <span className="perf-value">142ms</span>
                </div>
                <div className="perf-indicator good">Excellent</div>
              </div>
              <div className="perf-metric">
                <div className="perf-label">
                  <span>Database Queries</span>
                  <span className="perf-value">8.3k/min</span>
                </div>
                <div className="perf-indicator good">Normal</div>
              </div>
              <div className="perf-metric">
                <div className="perf-label">
                  <span>Error Rate</span>
                  <span className="perf-value">0.03%</span>
                </div>
                <div className="perf-indicator good">Excellent</div>
              </div>
              <div className="perf-metric">
                <div className="perf-label">
                  <span>Cache Hit Rate</span>
                  <span className="perf-value">94%</span>
                </div>
                <div className="perf-indicator good">Good</div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Admin Actions</h3>
            </div>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="users" /></span>
                <span>Manage Users</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="database" /></span>
                <span>Backup Now</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="settings" /></span>
                <span>System Config</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="report" /></span>
                <span>Full Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
