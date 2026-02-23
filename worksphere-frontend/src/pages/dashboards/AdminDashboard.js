import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import AdminOverview from '../admin-portal/AdminOverview';
import UserManagement from '../admin-portal/UserManagement';
import SystemSettings from '../admin-portal/SystemSettings';
import Security from '../admin-portal/Security';
import SystemLogs from '../admin-portal/SystemLogs';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });
  const [activePage, setActivePage] = useState('overview');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    setUser({ username, role });
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <UserManagement />;
      case 'system':
        return <SystemSettings />;
      case 'security':
        return <Security />;
      case 'logs':
        return <SystemLogs />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="dashboard-container role-admin">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">System Admin</p>
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
            className={`nav-item ${activePage === 'users' ? 'active' : ''}`}
            onClick={() => setActivePage('users')}
          >
            <span className="nav-icon"><Icon name="users" /></span>
            User Management
          </button>
          <button 
            className={`nav-item ${activePage === 'system' ? 'active' : ''}`}
            onClick={() => setActivePage('system')}
          >
            <span className="nav-icon"><Icon name="settings" /></span>
            System Settings
          </button>
          <button 
            className={`nav-item ${activePage === 'security' ? 'active' : ''}`}
            onClick={() => setActivePage('security')}
          >
            <span className="nav-icon"><Icon name="lock" /></span>
            Security
          </button>
          <button 
            className={`nav-item ${activePage === 'logs' ? 'active' : ''}`}
            onClick={() => setActivePage('logs')}
          >
            <span className="nav-icon"><Icon name="log" /></span>
            System Logs
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="Admin" username={user.username} />
        <div className="dashboard-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
