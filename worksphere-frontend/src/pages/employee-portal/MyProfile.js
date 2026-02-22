import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './MyProfile.css';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@worksphere.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    manager: 'Sarah Wilson',
    startDate: 'Jan 15, 2023',
    employeeId: 'EMP-2023-0847',
    office: 'New York - Building A',
    reportsTo: 'Sarah Wilson',
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

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
                    <span className="info-value">{profileData.firstName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Name</span>
                    <span className="info-value">{profileData.lastName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profileData.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{profileData.phone}</span>
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
                <span className="info-label">Employee ID</span>
                <span className="info-value">{profileData.employeeId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Department</span>
                <span className="info-value">{profileData.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Position</span>
                <span className="info-value">{profileData.position}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Manager</span>
                <span className="info-value">{profileData.manager}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Office</span>
                <span className="info-value">{profileData.office}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Start Date</span>
                <span className="info-value">{profileData.startDate}</span>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3>Emergency Contact</h3>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Name</span>
                <span className="info-value">Sarah Smith</span>
              </div>
              <div className="info-row">
                <span className="info-label">Relationship</span>
                <span className="info-value">Spouse</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone</span>
                <span className="info-value">+1 (555) 123-4568</span>
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
