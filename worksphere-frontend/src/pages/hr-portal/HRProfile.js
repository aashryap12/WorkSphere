import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/DashboardIcons';
import DashboardTopBar from '../../components/DashboardTopBar';
import '../dashboards/HRDashboard.css';
import './HRProfile.css';

const API_BASE_URL = 'http://localhost:8080/api';

const HRProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    startDate: '',
    employeeCode: '',

  });

  const [editForm, setEditForm] = useState({ ...profile });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');

    if (!token || role !== 'hr') {
      navigate('/login');
      return;
    }

    setUser({ username, role });
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('email');

      // Try to fetch from employee endpoint
      const response = await fetch(`${API_BASE_URL}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const employees = await response.json();
      
      // Find the current user's employee record by email
      const currentEmployee = employees.find(emp => emp.email === userEmail);

      if (currentEmployee) {
        setProfile({
          firstName: currentEmployee.firstName || '-',
          lastName: currentEmployee.lastName || '-',
          email: currentEmployee.email || '-',
          phone: currentEmployee.phone || '-',
          department: currentEmployee.department || currentEmployee.departmentName || '-',
          jobTitle: currentEmployee.jobTitle || '-',
          startDate: currentEmployee.startDate || currentEmployee.hireDate || '-',
          employeeCode: currentEmployee.employeeCode || '-',

        });
      } else {
        // If no employee record found, use basic info from session
        setProfile({
          firstName: userEmail?.split('@')[0] || 'User',
          lastName: '-',
          email: userEmail || '-',
          phone: '-',
          department: 'Human Resources',
          jobTitle: 'HR Manager',
          startDate: new Date().toISOString().split('T')[0],
          employeeCode: userId || '-',
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...profile });
    setError(null);
    setSuccessMessage('');
  };

  const handleSave = async () => {
    try {
      setError(null);
      setSuccessMessage('');
      
      // For now, just update local state (backend update can be added later)
      setProfile({ ...editForm });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const getInitials = () => {
    return `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="dashboard-container role-hr">
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>WorkSphere</h2>
            <p className="user-badge">HR Portal</p>
          </div>
          <nav className="sidebar-nav">
            <Link to="/hr-dashboard" className="nav-item">
              <span className="nav-icon"><Icon name="overview" /></span>
              Overview
            </Link>
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
            <Link to="/hr-dashboard/my-profile" className="nav-item active">
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
          <div className="profile-loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container role-hr">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">HR Portal</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/hr-dashboard" className="nav-item">
            <span className="nav-icon"><Icon name="overview" /></span>
            Overview
          </Link>
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
          <Link to="/hr-dashboard/my-profile" className="nav-item active">
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
        
        <div className="profile-container">
          <div className="profile-header">
            <h2>My Profile</h2>
            <p>View and manage your personal information</p>
          </div>

          {successMessage && (
            <div className="profile-message success">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="profile-message error">
              {error}
            </div>
          )}

          <div className="profile-content">
        {/* Sidebar Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {getInitials()}
            </div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p className="profile-title">{profile.jobTitle}</p>
            <span className="status-badge-active">Active</span>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-primary" onClick={handleEdit}>
                
                Edit Profile
              </button>
            ) : (
              <>
                
                <button className="btn-secondary" onClick={handleCancel}>
               
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSave}>
                  
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Details Sections */}
        <div className="profile-details">
          {/* Personal Information */}
          <div className="details-section">
            <h4>Personal Information</h4>
            <div className="details-grid">
              <div className="detail-item">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.firstName}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.lastName}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="details-section">
            <h4>Work Information</h4>
            <div className="details-grid">
              <div className="detail-item">
                <label>Employee Code</label>
                <span>{profile.employeeCode}</span>
              </div>
              <div className="detail-item">
                <label>Department</label>
                <span>{profile.department}</span>
              </div>
              <div className="detail-item">
                <label>Job Title</label>
                <span>{profile.jobTitle}</span>
              </div>
              <div className="detail-item">
                <label>Start Date</label>
                <span>{formatDate(profile.startDate)}</span>
              </div>
            </div>
          </div>


        </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HRProfile;
