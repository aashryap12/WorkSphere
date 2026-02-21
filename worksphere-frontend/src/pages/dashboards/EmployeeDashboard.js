import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (!token || role !== 'employee') {
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
    <div className="dashboard-container role-employee">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">Employee Portal</p>
        </div>
        <nav className="sidebar-nav">
          <a href="#overview" className="nav-item active">
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </a>
          <a href="#schedule" className="nav-item">
            <span className="nav-icon"><Icon name="calendar" /></span>
            My Schedule
          </a>
          
          <a href="#attendance" className="nav-item">
            <span className="nav-icon"><Icon name="clock" /></span>
            Attendance
          </a>
          <a href="#payroll" className="nav-item">
            <span className="nav-icon"><Icon name="wallet" /></span>
            Payroll
          </a>
          <a href="#payroll" className="nav-item">
            <span className="nav-icon"><Icon name="wallet" /></span>
            Requests
          </a>
          <a href="#documents" className="nav-item">
            <span className="nav-icon"><Icon name="file" /></span>
            Documents
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
        <DashboardTopBar roleLabel="Employee" username={user.username} />
        <div className="dashboard-header">
          <div>
            <h1>Welcome {user.username}!</h1>
            <p className="dashboard-subtitle">Here's your workspace overview</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <Icon name="bell" className="icon" /> Notifications
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue"><Icon name="calendar" /></div>
            <div className="stat-content">
              <p className="stat-label">Hours This Week</p>
              <h3 className="stat-value">32.5 hrs</h3>
              
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><Icon name="check" /></div>
            <div className="stat-content">
              <p className="stat-label">Attendance Rate</p>
              <h3 className="stat-value">98%</h3>
              
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><Icon name="calendar" /></div>
            <div className="stat-content">
              <p className="stat-label">Available PTO</p>
              <h3 className="stat-value">12 days</h3>
              <span className="stat-change neutral">Remaining</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><Icon name="wallet" /></div>
            <div className="stat-content">
              <p className="stat-label">Next Paycheck</p>
              <h3 className="stat-value">5 days</h3>
              <span className="stat-change neutral">Feb 24</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>This Week's Schedule</h3>
              <button className="btn-link">View All</button>
            </div>
            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-day">
                  <span className="day-name">Monday</span>
                  <span className="day-date">Feb 19</span>
                </div>
                <div className="schedule-time">9:00 AM - 5:00 PM</div>
                <span className="schedule-hours">8 hrs</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-day">
                  <span className="day-name">Tuesday</span>
                  <span className="day-date">Feb 20</span>
                </div>
                <div className="schedule-time">9:00 AM - 5:00 PM</div>
                <span className="schedule-hours">8 hrs</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-day">
                  <span className="day-name">Wednesday</span>
                  <span className="day-date">Feb 21</span>
                </div>
                <div className="schedule-time">10:00 AM - 6:00 PM</div>
                <span className="schedule-hours">8 hrs</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-day">
                  <span className="day-name">Thursday</span>
                  <span className="day-date">Feb 22</span>
                </div>
                <div className="schedule-time">9:00 AM - 5:00 PM</div>
                <span className="schedule-hours">8 hrs</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Announcements</h3>
            </div>
            <div className="announcements-list">
              <div className="announcement-item">
                <div className="announcement-icon"><Icon name="bell" /></div>
                <div className="announcement-content">
                  <h4>Team Meeting Tomorrow</h4>
                  <p>All-hands meeting scheduled at 2 PM</p>
                  <span className="announcement-time">2 hours ago</span>
                </div>
              </div>
              <div className="announcement-item">
                <div className="announcement-icon"><Icon name="spark" /></div>
                <div className="announcement-content">
                  <h4>Employee Appreciation Week</h4>
                  <p>Join us for special events next week</p>
                  <span className="announcement-time">1 day ago</span>
                </div>
              </div>
              <div className="announcement-item">
                <div className="announcement-icon"><Icon name="file" /></div>
                <div className="announcement-content">
                  <h4>Policy Update</h4>
                  <p>New remote work policy now available</p>
                  <span className="announcement-time">3 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Pending Actions</h3>
            </div>
            <div className="actions-list">
              <div className="action-item">
                <div className="action-icon warning"><Icon name="alert" /></div>
                <div className="action-content">
                  <h4>Submit Timesheet</h4>
                  <p>Last week's timesheet needs approval</p>
                </div>
                <button className="btn-action">Review</button>
              </div>
              <div className="action-item">
                <div className="action-icon info"><Icon name="info" /></div>
                <div className="action-content">
                  <h4>Update Skills Profile</h4>
                  <p>Keep your profile up to date</p>
                </div>
                <button className="btn-action">Update</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="calendar" /></span>
                <span>Request Time Off</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="report" /></span>
                <span>Submit Timesheet</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="users" /></span>
                <span>Contact HR</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="chart" /></span>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
