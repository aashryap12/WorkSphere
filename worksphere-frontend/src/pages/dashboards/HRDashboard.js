import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import './HRDashboard.css';

const HRDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');

    if (!token || role !== 'hr') {
      navigate('/login');
      return;
    }

    setUser({ username, role });
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container role-hr">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">HR Portal</p>
        </div>
        <nav className="sidebar-nav">
          <a href="#overview" className="nav-item active">
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </a>
          <Link to="/hr-dashboard/employees" className="nav-item">
            <span className="nav-icon"><Icon name="users" /></span>
            Employees
          </Link>
          <Link to="/hr-dashboard/attendance" className="nav-item">
            <span className="nav-icon"><Icon name="calendar" /></span>
            Attendance
          </Link>
          <Link to="/hr-dashboard/payroll" className="nav-item">
            <span className="nav-icon"><Icon name="wallet" /></span>
            Payroll
          </Link>
          <Link to="/hr-dashboard/my-profile" className="nav-item">
            <span className="nav-icon"><Icon name="user" /></span>
            My Profile
          </Link>
          
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="HR" username={user.username} />
        <div className="dashboard-header">
          <div>
            <h1>HR Dashboard</h1>
            <p className="dashboard-subtitle">Welcome, {user.username} - Human Resources Management</p>
          </div>
          <div className="header-actions">
            
            <button className="btn-secondary">
              <Icon name="bell" className="icon" /> Notifications
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue"><Icon name="users" /></div>
            <div className="stat-content">
              <p className="stat-label">Total Employees</p>
              <h3 className="stat-value">248</h3>
              
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><Icon name="briefcase" /></div>
            <div className="stat-content">
              <p className="stat-label">Active Recruitments</p>
              <h3 className="stat-value">18</h3>
            
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><Icon name="spark" /></div>
            <div className="stat-content">
              <p className="stat-label">Onboarding</p>
              <h3 className="stat-value">5</h3>
              <span className="stat-change warning">In progress</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><Icon name="shield" /></div>
            <div className="stat-content">
              <p className="stat-label">Compliance Rate</p>
              <h3 className="stat-value">98%</h3>
            
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card wide">
            <div className="card-header">
              <h3>Recent Activities</h3>
              <div className="header-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Hiring</button>
                <button className="filter-btn">Terminations</button>
              </div>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon new"><Icon name="plus" /></div>
                <div className="activity-content">
                  <h4>New Employee Added</h4>
                  <p>Jessica Brown joined as Software Engineer</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon update"><Icon name="report" /></div>
                <div className="activity-content">
                  <h4>Contract Updated</h4>
                  <p>Michael Johnson - Salary revision approved</p>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning"><Icon name="alert" /></div>
                <div className="activity-content">
                  <h4>Document Expiring</h4>
                  <p>5 employees have certifications expiring this month</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info"><Icon name="spark" /></div>
                <div className="activity-content">
                  <h4>Onboarding Completed</h4>
                  <p>David Lee completed orientation program</p>
                  <span className="activity-time">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recruitment Pipeline</h3>
            </div>
            <div className="pipeline-stats">
              <div className="pipeline-stage">
                <div className="stage-header">
                  <span className="stage-label">Applications</span>
                  <span className="stage-count">142</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">
                  <span className="stage-label">Screening</span>
                  <span className="stage-count">68</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '48%'}}></div>
                </div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">
                  <span className="stage-label">Interviews</span>
                  <span className="stage-count">24</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '17%'}}></div>
                </div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">
                  <span className="stage-label">Offers</span>
                  <span className="stage-count">8</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '6%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Department Headcount</h3>
            </div>
            <div className="department-list">
              <div className="department-item">
                <div className="dept-info">
                  <span className="dept-name">Engineering</span>
                  <span className="dept-count">82 employees</span>
                </div>
                <div className="dept-change positive">+5</div>
              </div>
              <div className="department-item">
                <div className="dept-info">
                  <span className="dept-name">Sales</span>
                  <span className="dept-count">54 employees</span>
                </div>
                <div className="dept-change positive">+3</div>
              </div>
              <div className="department-item">
                <div className="dept-info">
                  <span className="dept-name">Marketing</span>
                  <span className="dept-count">32 employees</span>
                </div>
                <div className="dept-change neutral">0</div>
              </div>
              <div className="department-item">
                <div className="dept-info">
                  <span className="dept-name">Support</span>
                  <span className="dept-count">45 employees</span>
                </div>
                <div className="dept-change positive">+2</div>
              </div>
              <div className="department-item">
                <div className="dept-info">
                  <span className="dept-name">Operations</span>
                  <span className="dept-count">35 employees</span>
                </div>
                <div className="dept-change positive">+2</div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Pending Tasks</h3>
              <span className="badge-count">12</span>
            </div>
            <div className="tasks-list">
              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <h4>Review leave requests</h4>
                  <span className="task-priority high">High Priority</span>
                </div>
              </div>
              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <h4>Update employee handbook</h4>
                  <span className="task-priority medium">Medium</span>
                </div>
              </div>
              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <h4>Schedule performance reviews</h4>
                  <span className="task-priority high">High Priority</span>
                </div>
              </div>
              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <h4>Process payroll adjustments</h4>
                  <span className="task-priority medium">Medium</span>
                </div>
              </div>
            </div>
          </div>

          

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="plus" /></span>
                <span>Add Employee</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="briefcase" /></span>
                <span>Post Job</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="wallet" /></span>
                <span>Process Payroll</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon-large"><Icon name="report" /></span>
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
