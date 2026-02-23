import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/DashboardIcons';
import DashboardTopBar from '../../components/DashboardTopBar';
import '../dashboards/HRDashboard.css';
import './Employees.css';

const API_BASE_URL = 'http://localhost:8080/api';

const Employees = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    departmentId: '',
    managerId: '',
    hireDate: ''
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
    fetchEmployees();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      
      const data = await response.json();
      // Map the backend response to match frontend expected format
      const mappedEmployees = data.map(emp => ({
        id: emp.employeeCode || emp.id,
        backendId: emp.id,
        name: emp.name,
        email: emp.email,
        department: emp.department || emp.departmentName || 'N/A',
        position: emp.jobTitle,
        status: emp.status || emp.employmentStatus,
        startDate: emp.startDate,
        phone: emp.phone,
        manager: emp.manager || emp.managerName || 'N/A'
      }));
      setEmployees(mappedEmployees);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      
      setShowAddModal(false);
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        jobTitle: '',
        departmentId: '',
        managerId: '',
        hireDate: ''
      });
      fetchEmployees();
    } catch (err) {
      console.error('Error creating employee:', err);
      alert('Failed to create employee: ' + err.message);
    }
  };

  const handleDeleteEmployee = async (backendId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/employees/${backendId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee: ' + err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Support', 'Operations'];
  const statuses = ['All', 'Active', 'On Leave', 'Probation'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'On Leave':
        return 'status-leave';
      case 'Probation':
        return 'status-probation';
      default:
        return '';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

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
          <Link to="/hr-dashboard/employees" className="nav-item active">
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
          
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="HR" username={user.username} />
        <div className="employees-container">
          <div className="employees-header">
            <div className="header-title">
              <h2>Employee Management</h2>
              <p className="header-subtitle">Manage all employee records and information</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              Add Employee
              </button>
              <button className="btn-secondary">
               Export
              </button>
            </div>
          </div>

      {/* Stats Cards */}
      <div className="employees-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Icon name="users" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Employees</p>
            <h3 className="stat-value">{employees.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Icon name="check" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{employees.filter((e) => e.status === 'Active').length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Icon name="calendar" />
          </div>
          <div className="stat-content">
            <p className="stat-label">On Leave</p>
            <h3 className="stat-value">{employees.filter((e) => e.status === 'On Leave').length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <Icon name="spark" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Probation</p>
            <h3 className="stat-value">{employees.filter((e) => e.status === 'Probation').length}</h3>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="employees-filters">
        <div className="search-box">
          <Icon name="search" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Department:</label>
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="employees-table-container">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading employees...</p>
          </div>
        )}
        {error && (
          <div className="error-state">
            <Icon name="alert" />
            <p>Error: {error}</p>
            <button className="btn-secondary" onClick={fetchEmployees}>Retry</button>
          </div>
        )}
        {!loading && !error && (
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="employee-cell">
                  <div className="employee-avatar">{getInitials(employee.name)}</div>
                  <div className="employee-info">
                    <span className="employee-name">{employee.name}</span>
                    <span className="employee-email">{employee.email}</span>
                  </div>
                </td>
                <td className="employee-id">{employee.id}</td>
                <td>
                  <span className="department-badge">{employee.department}</span>
                </td>
                <td>{employee.position}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td>{employee.startDate}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn view"
                    onClick={() => setSelectedEmployee(employee)}
                    title="View Details"
                  >
                     View 
                  </button>
                 
                  <button 
                    className="action-btn delete" 
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee.backendId)}
                  >
                     Delete 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {!loading && !error && filteredEmployees.length === 0 && (
          <div className="no-results">
            <Icon name="search" />
            <p>No employees found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Employee Details</h3>
              <button className="modal-close" onClick={() => setSelectedEmployee(null)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="modal-body">
              <div className="employee-profile">
                <div className="profile-avatar-large">{getInitials(selectedEmployee.name)}</div>
                <h2>{selectedEmployee.name}</h2>
                <p className="profile-position">{selectedEmployee.position}</p>
                <span className={`status-badge ${getStatusClass(selectedEmployee.status)}`}>
                  {selectedEmployee.status}
                </span>
              </div>
              <div className="employee-details-grid">
                <div className="detail-item">
                  <label>Employee ID</label>
                  <span>{selectedEmployee.id}</span>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <span>{selectedEmployee.email}</span>
                </div>
                <div className="detail-item">
                  <label>Department</label>
                  <span>{selectedEmployee.department}</span>
                </div>
                <div className="detail-item">
                  <label>Manager</label>
                  <span>{selectedEmployee.manager}</span>
                </div>
                <div className="detail-item">
                  <label>Start Date</label>
                  <span>{selectedEmployee.startDate}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedEmployee(null)}>
                Close
              </button>
              <button className="btn-primary">
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="modal-body">
              <form className="add-employee-form" onSubmit={handleCreateEmployee}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter first name" 
                      value={newEmployee.firstName}
                      onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter last name" 
                      value={newEmployee.lastName}
                      onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter email address" 
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={newEmployee.departmentId}
                      onChange={(e) => setNewEmployee({...newEmployee, departmentId: e.target.value})}
                    >
                      <option value="">Select department</option>
                      {departments.filter((d) => d !== 'All').map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input 
                      type="text" 
                      placeholder="Enter position" 
                      value={newEmployee.jobTitle}
                      onChange={(e) => setNewEmployee({...newEmployee, jobTitle: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Manager</label>
                    <input 
                      type="text" 
                      placeholder="Enter manager name" 
                      value={newEmployee.managerId}
                      onChange={(e) => setNewEmployee({...newEmployee, managerId: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      value={newEmployee.hireDate}
                      onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                     Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
