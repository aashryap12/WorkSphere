import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/DashboardIcons';
import './MyTeam.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const MyTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [managerEmployeeId, setManagerEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchManagerAndTeam();
  }, []);

  const fetchManagerAndTeam = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('email');

      console.log('Fetching manager info - userId:', userId, 'email:', userEmail);

      let managerId = null;

      // Get manager's employee record
      let empResponse = await fetch(`${API_URL}/api/employees/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!empResponse.ok && userEmail) {
        console.log('User lookup failed, trying email lookup...');
        empResponse = await fetch(`${API_URL}/api/employees/email/${encodeURIComponent(userEmail)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      }

      if (empResponse.ok) {
        const manager = await empResponse.json();
        console.log('Manager employee record found:', manager);
        managerId = manager.id;
        setManagerEmployeeId(manager.id);
      } else {
        // No employee record - use userId as managerId
        console.log('No employee record found, using userId as managerId');
        managerId = userId;
        setManagerEmployeeId(userId);
      }

      // Fetch team members
      if (managerId) {
        const teamResponse = await fetch(`${API_URL}/api/employees/team/${managerId}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamMembers(Array.isArray(teamData) ? teamData : []);
        }
      }

      // Fetch all employees for adding to team
      const allResponse = await fetch(`${API_URL}/api/employees`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (allResponse.ok) {
        const allData = await allResponse.json();
        setAllEmployees(Array.isArray(allData) ? allData : []);
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTeam = async (employeeId) => {
    if (!managerEmployeeId) {
      setMessage({ type: 'error', text: 'Cannot add team members - your employee record was not found. Please contact HR.' });
      return;
    }
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/employees/${employeeId}/assign-team/${managerEmployeeId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add employee to team');
      }

      const updatedEmployee = await response.json();
      setTeamMembers(prev => [...prev, updatedEmployee]);
      setMessage({ type: 'success', text: 'Employee added to team successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleRemoveFromTeam = async (employeeId) => {
    if (!window.confirm('Are you sure you want to remove this employee from your team?')) return;

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/employees/${employeeId}/remove-from-team`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to remove employee from team');
      }

      setTeamMembers(prev => prev.filter(emp => emp.id !== employeeId));
      setMessage({ type: 'success', text: 'Employee removed from team' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  // Get employees available to add (not already in team and not the manager)
  const availableEmployees = useMemo(() => {
    const teamIds = new Set(teamMembers.map(m => m.id));
    return allEmployees.filter(emp => 
      !teamIds.has(emp.id) && 
      emp.id !== managerEmployeeId &&
      emp.employmentStatus === 'Active' &&
      (searchQuery === '' || 
        emp.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [allEmployees, teamMembers, managerEmployeeId, searchQuery]);

  const filteredTeamMembers = useMemo(() => {
    if (filter === 'all') return teamMembers;
    return teamMembers.filter(emp => emp.employmentStatus?.toLowerCase() === filter.toLowerCase());
  }, [teamMembers, filter]);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="myteam-container">
      <div className="myteam-header">
        <div>
          <h2>My Team</h2>
          <p>Manage your team members</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          Add Team Member
        </button>
      </div>

      {message.text && (
        <div className={`myteam-alert ${message.type}`}>{message.text}</div>
      )}

      <div className="team-stats">
        <div className="stat-card">
          <div className="stat-icon blue"><Icon name="users" /></div>
          <div className="stat-info">
            <span className="stat-label">Total Members</span>
            <span className="stat-number">{teamMembers.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Icon name="check" /></div>
          <div className="stat-info">
            <span className="stat-label">Active</span>
            <span className="stat-number">{teamMembers.filter(m => m.employmentStatus === 'Active').length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Icon name="clock" /></div>
          <div className="stat-info">
            <span className="stat-label">On Leave</span>
            <span className="stat-number">{teamMembers.filter(m => m.employmentStatus === 'On Leave' || m.employmentStatus === 'on_leave').length}</span>
          </div>
        </div>
      </div>

      <div className="team-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'on_leave' ? 'active' : ''}`}
          onClick={() => setFilter('on_leave')}
        >
          On Leave
        </button>
      </div>

      {loading ? (
        <div className="myteam-loading">Loading team members...</div>
      ) : filteredTeamMembers.length === 0 ? (
        <div className="myteam-empty">
          <Icon name="users" />
          <p>No team members found</p>
          <span>{filter === 'all' ? 'Click "Add Team Member" to start building your team' : `No ${filter} team members`}</span>
        </div>
      ) : (
        <div className="team-grid">
          {filteredTeamMembers.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="member-header">
                <div className="member-avatar">{getInitials(member.firstName, member.lastName)}</div>
                <div className="member-actions">
                  <button 
                    className="btn-icon remove" 
                    onClick={() => handleRemoveFromTeam(member.id)}
                    title="Remove from team"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
              <div className="member-info">
                <h4>{member.firstName} {member.lastName}</h4>
                <p className="member-title">{member.jobTitle || 'Employee'}</p>
                <p className="member-email">{member.email}</p>
              </div>
              <div className="member-details">
                <div className="detail-item">
                  <Icon name="folder" />
                  <span>{member.department || 'No Department'}</span>
                </div>
                <div className="detail-item">
                  <Icon name="calendar" />
                  <span>Joined: {member.startDate || '-'}</span>
                </div>
              </div>
              <div className="member-footer">
                <span className={`status-badge ${member.employmentStatus?.toLowerCase().replace(' ', '-') || 'active'}`}>
                  {member.employmentStatus || 'Active'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Team Member Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Team Member</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="modal-search">
              <Icon name="search" />
              <input 
                type="text"
                placeholder="Search employees by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="modal-body">
              {availableEmployees.length === 0 ? (
                <div className="no-employees">
                  <p>{searchQuery ? 'No employees match your search' : 'No available employees to add'}</p>
                </div>
              ) : (
                <div className="employee-list">
                  {availableEmployees.map((emp) => (
                    <div key={emp.id} className="employee-item">
                      <div className="employee-avatar">{getInitials(emp.firstName, emp.lastName)}</div>
                      <div className="employee-details">
                        <span className="employee-name">{emp.firstName} {emp.lastName}</span>
                        <span className="employee-meta">{emp.jobTitle || 'Employee'} • {emp.department || 'No Dept'}</span>
                      </div>
                      <button 
                        className="btn-add"
                        onClick={() => handleAddToTeam(emp.id)}
                      >
                        <Icon name="plus" /> Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
