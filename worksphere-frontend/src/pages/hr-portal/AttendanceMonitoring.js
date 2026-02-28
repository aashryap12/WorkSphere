import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/DashboardIcons';
import DashboardTopBar from '../../components/DashboardTopBar';
import '../dashboards/HRDashboard.css';
import './AttendanceMonitoring.css';

const API_BASE_URL = 'http://localhost:8080/api';

const AttendanceMonitoring = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    employeeId: '',
    workDate: new Date().toISOString().split('T')[0],
    checkInAt: '',
    checkOutAt: '',
    status: 'Present',
    notes: ''
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
    fetchAttendanceRecords();
  }, [navigate, selectedDate]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/attendance?date=${selectedDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }

      const data = await response.json();
      setAttendanceRecords(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
      });

      if (!response.ok) {
        throw new Error('Failed to create attendance record');
      }

      setShowAddModal(false);
      setNewRecord({
        employeeId: '',
        workDate: new Date().toISOString().split('T')[0],
        checkInAt: '',
        checkOutAt: '',
        status: 'Present',
        notes: ''
      });
      fetchAttendanceRecords();
    } catch (err) {
      console.error('Error creating attendance record:', err);
      alert('Failed to create attendance record: ' + err.message);
    }
  };

  const handleUpdateStatus = async (recordId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/attendance/${recordId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      fetchAttendanceRecords();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Support', 'Operations'];
  const statuses = ['All', 'Present', 'Absent', 'Late', 'On Leave', 'Half Day'];

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || record.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || record.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Present':
        return 'status-present';
      case 'Absent':
        return 'status-absent';
      case 'Late':
        return 'status-late';
      case 'On Leave':
        return 'status-leave';
      case 'Half Day':
        return 'status-halfday';
      default:
        return '';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '--';
    const diff = new Date(checkOut) - new Date(checkIn);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter(r => r.status === 'Present').length,
    absent: attendanceRecords.filter(r => r.status === 'Absent').length,
    late: attendanceRecords.filter(r => r.status === 'Late').length,
    onLeave: attendanceRecords.filter(r => r.status === 'On Leave').length
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
          <Link to="/hr-dashboard/employees" className="nav-item">
            <span className="nav-icon"><Icon name="users" /></span>
            Employees
          </Link>
          <Link to="/hr-dashboard/attendance" className="nav-item active">
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
        <div className="attendance-container">
          <div className="attendance-header">
            <div className="header-title">
              <h2>Attendance Monitoring</h2>
              <p className="header-subtitle">Track and manage employee attendance records</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                 Add Record
              </button>
              
            </div>
          </div>

          {/* Stats Cards */}
          <div className="attendance-stats">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Icon name="users" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Employees</p>
                <h3 className="stat-value">{stats.total}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <Icon name="check" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Present</p>
                <h3 className="stat-value">{stats.present}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon red">
                <Icon name="close" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Absent</p>
                <h3 className="stat-value">{stats.absent}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">
                <Icon name="clock" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Late</p>
                <h3 className="stat-value">{stats.late}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">
                <Icon name="calendar" />
              </div>
              <div className="stat-content">
                <p className="stat-label">On Leave</p>
                <h3 className="stat-value">{stats.onLeave}</h3>
              </div>
            </div>
          </div>

          {/* Date Selector and Filters */}
          <div className="attendance-filters">
            <div className="date-picker-group">
              <label>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
              />
            </div>
            <div className="search-box">
              <Icon name="search" />
              <input
                type="text"
                placeholder="Search by name or ID..."
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

          {/* Attendance Table */}
          <div className="attendance-table-container">
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading attendance records...</p>
              </div>
            )}
            {error && (
              <div className="error-state">
                <Icon name="alert" />
                <p>Error: {error}</p>
                <button className="btn-secondary" onClick={fetchAttendanceRecords}>Retry</button>
              </div>
            )}
            {!loading && !error && (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Work Hours</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="employee-cell">
                        <div className="employee-avatar">{getInitials(record.employeeName)}</div>
                        <div className="employee-info">
                          <span className="employee-name">{record.employeeName}</span>
                          <span className="employee-code">{record.employeeCode}</span>
                        </div>
                      </td>
                      <td>
                        <span className="department-badge">{record.department || 'N/A'}</span>
                      </td>
                      <td className="time-cell">
                        <span className="time-value">{formatTime(record.checkInAt)}</span>
                      </td>
                      <td className="time-cell">
                        <span className="time-value">{formatTime(record.checkOutAt)}</span>
                      </td>
                      <td className="hours-cell">
                        <span className="hours-value">{calculateWorkHours(record.checkInAt, record.checkOutAt)}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => setSelectedRecord(record)}
                          title="View Details"
                        >
                          View
                        </button>
                        <select
                          className="status-select"
                          value={record.status}
                          onChange={(e) => handleUpdateStatus(record.id, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="On Leave">On Leave</option>
                          <option value="Half Day">Half Day</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && !error && filteredRecords.length === 0 && (
              <div className="no-results">
                <Icon name="search" />
                <p>No attendance records found for the selected criteria</p>
              </div>
            )}
          </div>

          {/* Record Details Modal */}
          {selectedRecord && (
            <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Attendance Details</h3>
                  <button className="modal-close" onClick={() => setSelectedRecord(null)}>
                    <Icon name="close" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="employee-profile">
                    <div className="profile-avatar-large">{getInitials(selectedRecord.employeeName)}</div>
                    <h2>{selectedRecord.employeeName}</h2>
                    <p className="profile-position">{selectedRecord.department}</p>
                    <span className={`status-badge ${getStatusClass(selectedRecord.status)}`}>
                      {selectedRecord.status}
                    </span>
                  </div>
                  <div className="attendance-details-grid">
                    <div className="detail-item">
                      <label>Employee ID</label>
                      <span>{selectedRecord.employeeCode}</span>
                    </div>
                    <div className="detail-item">
                      <label>Date</label>
                      <span>{selectedRecord.workDate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Check In</label>
                      <span>{formatTime(selectedRecord.checkInAt)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Check Out</label>
                      <span>{formatTime(selectedRecord.checkOutAt)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Work Hours</label>
                      <span>{calculateWorkHours(selectedRecord.checkInAt, selectedRecord.checkOutAt)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Notes</label>
                      <span>{selectedRecord.notes || 'No notes'}</span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={() => setSelectedRecord(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Record Modal */}
          {showAddModal && (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
              <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Add Attendance Record</h3>
                  <button className="modal-close" onClick={() => setShowAddModal(false)}>
                    <Icon name="close" />
                  </button>
                </div>
                <div className="modal-body">
                  <form className="add-record-form" onSubmit={handleCreateRecord}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Employee ID / Code</label>
                        <input
                          type="text"
                          placeholder="Enter employee ID"
                          value={newRecord.employeeId}
                          onChange={(e) => setNewRecord({ ...newRecord, employeeId: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          value={newRecord.workDate}
                          onChange={(e) => setNewRecord({ ...newRecord, workDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Check In Time</label>
                        <input
                          type="time"
                          value={newRecord.checkInAt}
                          onChange={(e) => setNewRecord({ ...newRecord, checkInAt: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Check Out Time</label>
                        <input
                          type="time"
                          value={newRecord.checkOutAt}
                          onChange={(e) => setNewRecord({ ...newRecord, checkOutAt: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={newRecord.status}
                          onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="On Leave">On Leave</option>
                          <option value="Half Day">Half Day</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Notes</label>
                      <textarea
                        placeholder="Add any notes..."
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Add Record
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

export default AttendanceMonitoring;
