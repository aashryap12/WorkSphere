import React, { useState, useEffect } from 'react';
import Icon from '../../components/DashboardIcons';
import './ManagerProfile.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const ManagerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    startDate: '',
    employeeCode: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('email');

      let response = await fetch(`${API_URL}/api/employees/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!response.ok && userEmail) {
        response = await fetch(`${API_URL}/api/employees/email/${encodeURIComponent(userEmail)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      }

      if (response.ok) {
        const data = await response.json();
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          department: data.department || '',
          jobTitle: data.jobTitle || '',
          startDate: data.startDate || '',
          employeeCode: data.employeeCode || ''
        });
        setEditForm(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
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
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/employees/${profile.employeeCode}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updated = await response.json();
        setProfile({
          firstName: updated.firstName || '',
          lastName: updated.lastName || '',
          email: updated.email || '',
          phone: updated.phone || '',
          department: updated.department || '',
          jobTitle: updated.jobTitle || '',
          startDate: updated.startDate || '',
          employeeCode: updated.employeeCode || ''
        });
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully' });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const getInitials = () => {
    return `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>View and manage your personal information</p>
      </div>

      {message.text && (
        <div className={`profile-message ${message.type}`}>{message.text}</div>
      )}

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">{getInitials()}</div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p className="profile-title">{profile.jobTitle || 'Manager'}</p>
            <span className="status-badge-active">Active</span>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-primary" onClick={handleEdit}>
                <Icon name="edit" /> Edit Profile
              </button>
            ) : (
              <>
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
              </>
            )}
          </div>
        </div>

        <div className="profile-details">
          <div className="details-section">
            <h4>Personal Information</h4>
            <div className="details-grid">
              <div className="detail-item">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.firstName || '-'}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.lastName || '-'}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.email || '-'}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.phone || '-'}</span>
                )}
              </div>
            </div>
          </div>

          <div className="details-section">
            <h4>Work Information</h4>
            <div className="details-grid">
              <div className="detail-item">
                <label>Employee ID</label>
                <span>{profile.employeeCode || '-'}</span>
              </div>
              <div className="detail-item">
                <label>Department</label>
                <span>{profile.department || '-'}</span>
              </div>
              <div className="detail-item">
                <label>Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="jobTitle"
                    value={editForm.jobTitle || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{profile.jobTitle || '-'}</span>
                )}
              </div>
              <div className="detail-item">
                <label>Start Date</label>
                <span>{profile.startDate || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
