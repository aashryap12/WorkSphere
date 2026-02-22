import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import MySchedule from '../employee-portal/MySchedule';
import Attendance from '../employee-portal/Attendance';
import Payroll from '../employee-portal/Payroll';
import Requests from '../employee-portal/Requests';
import MyProfile from '../employee-portal/MyProfile';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
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
          <button 
            className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
            onClick={() => setActivePage('overview')}
          >
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </button>
          <button 
            className={`nav-item ${activePage === 'schedule' ? 'active' : ''}`}
            onClick={() => setActivePage('schedule')}
          >
            <span className="nav-icon"><Icon name="calendar" /></span>
            My Schedule
          </button>
          
          <button 
            className={`nav-item ${activePage === 'attendance' ? 'active' : ''}`}
            onClick={() => setActivePage('attendance')}
          >
            <span className="nav-icon"><Icon name="clock" /></span>
            Attendance
          </button>
          <button 
            className={`nav-item ${activePage === 'payroll' ? 'active' : ''}`}
            onClick={() => setActivePage('payroll')}
          >
            <span className="nav-icon"><Icon name="wallet" /></span>
            Payroll
          </button>
          <button 
            className={`nav-item ${activePage === 'requests' ? 'active' : ''}`}
            onClick={() => setActivePage('requests')}
          >
            <span className="nav-icon"><Icon name="wallet" /></span>
            Requests
          </button>
          <button 
            className={`nav-item ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => setActivePage('tasks')}
          >
            <span className="nav-icon"><Icon name="tasks" /></span>
            Tasks
          </button>
          <button 
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
        <DashboardTopBar roleLabel="Employee" username={user.username} />
        
        {activePage === 'overview' && (
          <>
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
                  <h3>Tasks</h3>
                </div>
              
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Requests</h3>
                </div>
                
              </div>

              
            </div>
          </>
        )}

        {activePage === 'schedule' && <MySchedule />}
        {activePage === 'attendance' && <Attendance />}
        {activePage === 'payroll' && <Payroll />}
        {activePage === 'requests' && <Requests />}
        {activePage === 'profile' && <MyProfile />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
