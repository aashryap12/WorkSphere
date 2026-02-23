import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './AdminPages.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'employee', status: 'active', joinDate: 'Jan 15, 2023' },
    { id: 2, username: 'sarah_manager', email: 'sarah@example.com', role: 'manager', status: 'active', joinDate: 'Oct 10, 2022' },
    { id: 3, username: 'hr_admin', email: 'hr@example.com', role: 'hr', status: 'active', joinDate: 'Jun 1, 2023' },
    { id: 4, username: 'bob_smith', email: 'bob@example.com', role: 'employee', status: 'inactive', joinDate: 'Feb 20, 2023' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => 
    (filterRole === 'all' || user.role === filterRole) &&
    (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeactivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>User Management</h2>
        <button className="btn-primary">
           Add New User
        </button>
      </div>

      <div className="admin-card">
        <div className="card-header">
          <h3>All Users</h3>
          <div className="filters">
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="role-filter">
              <option value="all">All Roles</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className={`user-row ${user.status}`}>
                  <td><strong>{user.username}</strong></td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                  <td><span className={`status-badge ${user.status}`}>{user.status}</span></td>
                  <td>{user.joinDate}</td>
                  <td>
                    <button className="btn-small edit">Edit</button>
                    <button 
                      className="btn-small delete" 
                      onClick={() => handleDeactivate(user.id)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
