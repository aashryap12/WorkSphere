import React, { useState, useEffect } from 'react';
import Icon from '../../components/DashboardIcons';
import './MyProfile.css';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    manager: '',
    startDate: '',
    employeeId: '',
    employeeCode: '',
    status: '',
  });

  const [editData, setEditData] = useState(profileData);

  const userId = sessionStorage.getItem('userId');
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      // Try to get employee by userId first
      let response = await fetch(`http://localhost:8080/api/employees/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Fallback to email
      if (!response.ok && userEmail) {
        response = await fetch(`http://localhost:8080/api/employees/email/${encodeURIComponent(userEmail)}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      if (response.ok) {
        const employee = await response.json();
        const data = {
          id: employee.id,
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
          email: employee.email || userEmail || '',
          phone: employee.phone || '',
          department: employee.department || employee.departmentName || '',
          position: employee.jobTitle || '',
          manager: employee.manager || employee.managerName || '',
          startDate: employee.startDate || '',
          employeeId: employee.id,
          employeeCode: employee.employeeCode || '',
          status: employee.status || employee.employmentStatus || 'Active',
        };
        setProfileData(data);
        setEditData(data);
        setError(null);
      } else {
        setError('Profile not found. Please contact HR.');
      }
    } catch (err) {
      setError('Failed to load profile data');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/employees/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          phone: editData.phone,
        })
      });

      if (response.ok) {
        setProfileData(editData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <Icon name="clock" /> Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <Icon name="alert" /> {error}
          <button onClick={fetchProfileData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button 
          className="btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        {/* Profile Picture Section */}
        <div className="profile-avatar-section">
          
          {isEditing && (
            <button className="btn-secondary-small">
              <Icon name="upload" /> Change Photo
            </button>
          )}
        </div>

        {/* Profile Information */}
        <div className="profile-info">
          {/* Basic Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Basic Information</h3>
            </div>
            <div className="card-body">
              {!isEditing ? (
                <>
                  <div className="info-row">
                    <span className="info-label">First Name</span>
                    <span className="info-value">{profileData.firstName || '-'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Name</span>
                    <span className="info-value">{profileData.lastName || '-'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profileData.email || '-'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{profileData.phone || '-'}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Employment Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Employment Information</h3>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Employee Code</span>
                <span className="info-value">{profileData.employeeCode || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Department</span>
                <span className="info-value">{profileData.department || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Position</span>
                <span className="info-value">{profileData.position || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Manager</span>
                <span className="info-value">{profileData.manager || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span className={`info-value status-badge ${profileData.status?.toLowerCase()}`}>
                  {profileData.status || '-'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Start Date</span>
                <span className="info-value">{profileData.startDate || '-'}</span>
              </div>
            </div>
          </div>

         

          {/* Qualifications Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Skills & Qualifications</h3>
            </div>
            <div className="card-body">
              <div className="skills-list">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Team Leadership</span>
                <span className="skill-tag">Project Management</span>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Preferences</h3>
            </div>
            <div className="card-body">
              {!isEditing && (
                <>
                  <div className="info-row">
                    <span className="info-label">Email Notifications</span>
                    <span className="info-value">Enabled</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Language</span>
                    <span className="info-value">English</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Theme</span>
                    <span className="info-value">Light Mode</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Important Documents</h3>
            </div>
            <div className="card-body">
              <div className="document-item">
                <div className="doc-icon">
                  <Icon name="file" />
                </div>
                <div className="doc-info">
                  <h4>Employee Handbook</h4>
                  <p className="doc-date">Updated: Jan 10, 2026</p>
                </div>
                <button className="btn-link-small">Download</button>
              </div>
              <div className="document-item">
                <div className="doc-icon">
                  <Icon name="file" />
                </div>
                <div className="doc-info">
                  <h4>Code of Conduct</h4>
                  <p className="doc-date">Updated: Dec 1, 2025</p>
                </div>
                <button className="btn-link-small">Download</button>
              </div>
              <div className="document-item">
                <div className="doc-icon">
                  <Icon name="file" />
                </div>
                <div className="doc-info">
                  <h4>Privacy Policy</h4>
                  <p className="doc-date">Updated: Nov 15, 2025</p>
                </div>
                <button className="btn-link-small">Download</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="edit-actions">
            <button className="btn-primary" onClick={handleSave}>
              <Icon name="check" /> Save Changes
            </button>
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
