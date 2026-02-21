import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });

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
          <a href="#overview" className="nav-item active">
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </a>
          <a href="#team" className="nav-item">
            <span className="nav-icon"><Icon name="users" /></span>
            My Team
          </a>
          <a href="#scheduling" className="nav-item">
            <span className="nav-icon"><Icon name="calendar" /></span>
            Scheduling
          </a>
          <a href="#timeoff" className="nav-item">
            <span className="nav-icon"><Icon name="check" /></span>
            Approvals
          </a>
          <a href="#performance" className="nav-item">
            <span className="nav-icon"><Icon name="trend" /></span>
            Performance
          </a>
          <a href="#reports" className="nav-item">
            <span className="nav-icon"><Icon name="report" /></span>
            Reports
          </a>
          <a href="#profile" className="nav-item">
            <span className="nav-icon"><Icon name="user" /></span>
            My Profile
          </a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="Manager" username={user.username} />
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
            <div className="approvals-list">
              <div className="approval-item">
                <div className="approval-info">
                  <h4>Time Off Request</h4>
                  <p>John Smith - Mar 15-17</p>
                  <span className="approval-time">2 hours ago</span>
                </div>
                <div className="approval-actions">
                  <button className="btn-approve"><Icon name="check" /></button>
                  <button className="btn-reject"><Icon name="close" /></button>
                </div>
              </div>
              <div className="approval-item">
                <div className="approval-info">
                  <h4>Overtime Request</h4>
                  <p>Emily Martinez - 5 hours</p>
                  <span className="approval-time">5 hours ago</span>
                </div>
                <div className="approval-actions">
                  <button className="btn-approve"><Icon name="check" /></button>
                  <button className="btn-reject"><Icon name="close" /></button>
                </div>
              </div>
              <div className="approval-item">
                <div className="approval-info">
                  <h4>Schedule Change</h4>
                  <p>Sarah Davis - Swap Feb 22</p>
                  <span className="approval-time">1 day ago</span>
                </div>
                <div className="approval-actions">
                  <button className="btn-approve"><Icon name="check" /></button>
                  <button className="btn-reject"><Icon name="close" /></button>
                </div>
              </div>
            </div>
            <button className="btn-link-full">View All Approvals →</button>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Today's Schedule</h3>
            </div>
            <div className="schedule-timeline">
              <div className="timeline-item">
                <span className="timeline-time">9:00 AM</span>
                <div className="timeline-content">
                  <h4>Team Stand-up</h4>
                  <p>6 attendees</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-time">11:00 AM</span>
                <div className="timeline-content">
                  <h4>Performance Review</h4>
                  <p>John Smith</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-time">2:00 PM</span>
                <div className="timeline-content">
                  <h4>Department Meeting</h4>
                  <p>All team members</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-time">4:30 PM</span>
                <div className="timeline-content">
                  <h4>1-on-1 with Emily</h4>
                  <p>Weekly check-in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Team Performance Metrics</h3>
            </div>
            <div className="metrics-list">
              <div className="metric-item">
                <div className="metric-label">
                  <span>Sales Target</span>
                  <span className="metric-value">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">
                  <span>Customer Satisfaction</span>
                  <span className="metric-value">92%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">
                  <span>Project Completion</span>
                  <span className="metric-value">78%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '78%'}}></div>
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">
                  <span>Team Engagement</span>
                  <span className="metric-value">96%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '96%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
