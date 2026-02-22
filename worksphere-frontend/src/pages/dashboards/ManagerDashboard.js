import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import ManagerApprovals from '../manager-portal/ManagerApprovals';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });
  const [activePage, setActivePage] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (!token || role !== 'manager') {
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
    <div className="dashboard-container role-manager">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">Manager Portal</p>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
            onClick={() => setActivePage('overview')}
          >
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </button>
          <button
            type="button"
            className={`nav-item ${activePage === 'team' ? 'active' : ''}`}
            onClick={() => setActivePage('team')}
          >
            <span className="nav-icon"><Icon name="users" /></span>
            My Team
          </button>
          <button
            type="button"
            className={`nav-item ${activePage === 'scheduling' ? 'active' : ''}`}
            onClick={() => setActivePage('scheduling')}
          >
            <span className="nav-icon"><Icon name="calendar" /></span>
            Scheduling
          </button>
          <button
            type="button"
            className={`nav-item ${activePage === 'approvals' ? 'active' : ''}`}
            onClick={() => setActivePage('approvals')}
          >
            <span className="nav-icon"><Icon name="check" /></span>
            Approvals
          </button>

          <button
            type="button"
            className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
            onClick={() => setActivePage('reports')}
          >
            <span className="nav-icon"><Icon name="report" /></span>
            Reports
          </button>
          <button
            type="button"
            className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
            onClick={() => setActivePage('profile')}
          >
            <span className="nav-icon"><Icon name="user" /></span>
            My Profile
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="Manager" username={user.username} />

        {activePage === 'overview' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1>Manager Dashboard</h1>
                <p className="dashboard-subtitle">Welcome, {user.username} - Manage your team effectively</p>
              </div>
              <div className="header-actions">
                <button className="btn-primary">
                  <Icon name="plus" className="icon" /> Add Employee
                </button>
                <button className="btn-secondary">
                  <Icon name="bell" className="icon" /> Notifications
                </button>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon blue"><Icon name="users" /></div>
                <div className="stat-content">
                  <p className="stat-label">Team Members</p>
                  <h3 className="stat-value">24</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><Icon name="check" /></div>
                <div className="stat-content">
                  <p className="stat-label">Team Attendance</p>
                  <h3 className="stat-value">96%</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange"><Icon name="clock" /></div>
                <div className="stat-content">
                  <p className="stat-label">Pending Approvals</p>
                  <h3 className="stat-value">8</h3>
                  <span className="stat-change warning">Needs review</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple"><Icon name="trend" /></div>
                <div className="stat-content">
                  <p className="stat-label">Team Performance</p>
                  <h3 className="stat-value">92%</h3>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card wide">
                <div className="card-header">
                  <h3>Team Overview</h3>
                  <div className="header-filters">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">On Shift</button>
                    <button className="filter-btn">Off Duty</button>
                  </div>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Hours This Week</th>
                        <th>Attendance</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="employee-cell">
                            <div className="avatar">JS</div>
                            <span>John Smith</span>
                          </div>
                        </td>
                        <td>Sales</td>
                        <td><span className="status-badge active">On Shift</span></td>
                        <td>38.5 hrs</td>
                        <td>98%</td>
                        <td><button className="btn-icon"><Icon name="eye" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="employee-cell">
                            <div className="avatar">EM</div>
                            <span>Emily Martinez</span>
                          </div>
                        </td>
                        <td>Sales</td>
                        <td><span className="status-badge active">On Shift</span></td>
                        <td>40 hrs</td>
                        <td>100%</td>
                        <td><button className="btn-icon"><Icon name="eye" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="employee-cell">
                            <div className="avatar">MJ</div>
                            <span>Michael Johnson</span>
                          </div>
                        </td>
                        <td>Marketing</td>
                        <td><span className="status-badge off">Off Duty</span></td>
                        <td>32 hrs</td>
                        <td>95%</td>
                        <td><button className="btn-icon"><Icon name="eye" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="employee-cell">
                            <div className="avatar">SD</div>
                            <span>Sarah Davis</span>
                          </div>
                        </td>
                        <td>Support</td>
                        <td><span className="status-badge active">On Shift</span></td>
                        <td>36 hrs</td>
                        <td>97%</td>
                        <td><button className="btn-icon"><Icon name="eye" /></button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Pending Approvals</h3>
                  <span className="badge-count">8</span>
                </div>
                
                <button className="btn-link-full" onClick={() => setActivePage('approvals')}>View All Approvals →</button>
              </div>
            </div>
          </>
        )}

        {activePage === 'approvals' && <ManagerApprovals />}
      </div>
    </div>
  );
};

export default ManagerDashboard;
