import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/DashboardIcons';
import DashboardTopBar from '../../components/DashboardTopBar';
import '../dashboards/HRDashboard.css';
import './PayrollManagement.css';

const API_BASE_URL = 'http://localhost:8080/api';

const PayrollManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [newPayroll, setNewPayroll] = useState({
    employeeId: '',
    periodStart: '',
    periodEnd: '',
    grossPay: '',
    deductions: '',
    taxAmount: '',
    status: 'Pending'
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
    fetchPayrollRecords();
  }, [navigate]);

  const fetchPayrollRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/payroll`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payroll records');
      }

      const data = await response.json();
      setPayrollRecords(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching payroll:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayroll = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/payroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPayroll)
      });

      if (!response.ok) {
        throw new Error('Failed to create payroll record');
      }

      setShowAddModal(false);
      setNewPayroll({
        employeeId: '',
        periodStart: '',
        periodEnd: '',
        grossPay: '',
        deductions: '',
        taxAmount: '',
        status: 'Pending'
      });
      fetchPayrollRecords();
    } catch (err) {
      console.error('Error creating payroll:', err);
      alert('Failed to create payroll record: ' + err.message);
    }
  };

  const handleProcessPayroll = async (recordId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/payroll/${recordId}/process`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to process payroll');
      }

      fetchPayrollRecords();
    } catch (err) {
      console.error('Error processing payroll:', err);
      alert('Failed to process payroll: ' + err.message);
    }
  };

  const handleUpdateStatus = async (recordId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/payroll/${recordId}/status`, {
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

      fetchPayrollRecords();
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
  const statuses = ['All', 'Pending', 'Processing', 'Paid', 'Failed'];
  const periods = [
    { value: 'current', label: 'Current Period' },
    { value: 'previous', label: 'Previous Period' },
    { value: 'all', label: 'All Periods' }
  ];

  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch =
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || record.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || record.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'status-paid';
      case 'Pending':
        return 'status-pending';
      case 'Processing':
        return 'status-processing';
      case 'Failed':
        return 'status-failed';
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

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rs. 0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = {
    totalPayroll: payrollRecords.reduce((sum, r) => sum + (parseFloat(r.grossPay) || 0), 0),
    totalPaid: payrollRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + (parseFloat(r.netPay) || 0), 0),
    pending: payrollRecords.filter(r => r.status === 'Pending').length,
    processed: payrollRecords.filter(r => r.status === 'Paid').length
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
          <Link to="/hr-dashboard/attendance" className="nav-item">
            <span className="nav-icon"><Icon name="calendar" /></span>
            Attendance
          </Link>
          <Link to="/hr-dashboard/payroll" className="nav-item active">
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
        <div className="payroll-container">
          <div className="payroll-header">
            <div className="header-title">
              <h2>Payroll Management</h2>
              <p className="header-subtitle">Manage employee salaries and payments</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                 Add Payroll
              </button>
              <button className="btn-secondary" onClick={() => setShowProcessModal(true)}>
                <Icon name="check" /> Process All
              </button>
             
            </div>
          </div>

          {/* Stats Cards */}
          <div className="payroll-stats">
            <div className="stat-card">
              <div className="stat-icon blue">
                <Icon name="wallet" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Payroll</p>
                <h3 className="stat-value">{formatCurrency(stats.totalPayroll)}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <Icon name="check" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Paid</p>
                <h3 className="stat-value">{formatCurrency(stats.totalPaid)}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">
                <Icon name="clock" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Pending</p>
                <h3 className="stat-value">{stats.pending}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">
                <Icon name="report" />
              </div>
              <div className="stat-content">
                <p className="stat-label">Processed</p>
                <h3 className="stat-value">{stats.processed}</h3>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="payroll-filters">
            <div className="filter-group">
              <label>Period:</label>
              <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                {periods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
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

          {/* Payroll Table */}
          <div className="payroll-table-container">
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading payroll records...</p>
              </div>
            )}
            {error && (
              <div className="error-state">
                <Icon name="alert" />
                <p>Error: {error}</p>
                <button className="btn-secondary" onClick={fetchPayrollRecords}>Retry</button>
              </div>
            )}
            {!loading && !error && (
              <table className="payroll-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Period</th>
                    <th>Gross Pay</th>
                    <th>Deductions</th>
                    <th>Net Pay</th>
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
                      <td className="period-cell">
                        <span className="period-dates">
                          {formatDate(record.periodStart)} - {formatDate(record.periodEnd)}
                        </span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount gross">{formatCurrency(record.grossPay)}</span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount deductions">-{formatCurrency(record.deductions)}</span>
                      </td>
                      <td className="amount-cell">
                        <span className="amount net">{formatCurrency(record.netPay)}</span>
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
                        {(record.status === 'Pending' || record.status === 'Processing') && (
                          <button
                            className="action-btn process"
                            onClick={() => handleProcessPayroll(record.id)}
                            title="Process Payment"
                          >
                            Process
                          </button>
                        )} 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && !error && filteredRecords.length === 0 && (
              <div className="no-results">
                <Icon name="search" />
                <p>No payroll records found for the selected criteria</p>
              </div>
            )}
          </div>

          {/* Record Details Modal */}
          {selectedRecord && (
            <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Payroll Details</h3>
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
                  <div className="payroll-details-grid">
                    <div className="detail-item">
                      <label>Employee ID</label>
                      <span>{selectedRecord.employeeCode}</span>
                    </div>
                    <div className="detail-item">
                      <label>Pay Period</label>
                      <span>{formatDate(selectedRecord.periodStart)} - {formatDate(selectedRecord.periodEnd)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Gross Pay</label>
                      <span className="amount gross">{formatCurrency(selectedRecord.grossPay)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Tax Amount</label>
                      <span className="amount deductions">{formatCurrency(selectedRecord.taxAmount)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Deductions</label>
                      <span className="amount deductions">{formatCurrency(selectedRecord.deductions)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Net Pay</label>
                      <span className="amount net">{formatCurrency(selectedRecord.netPay)}</span>
                    </div>
                    {selectedRecord.paidAt && (
                      <div className="detail-item full-width">
                        <label>Paid On</label>
                        <span>{new Date(selectedRecord.paidAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={() => setSelectedRecord(null)}>
                    Close
                  </button>
                  {(selectedRecord.status === 'Pending' || selectedRecord.status === 'Processing') && (
                    <button className="btn-primary" onClick={() => {
                      handleProcessPayroll(selectedRecord.id);
                      setSelectedRecord(null);
                    }}>
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Add Payroll Modal */}
          {showAddModal && (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
              <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Add Payroll Record</h3>
                  <button className="modal-close" onClick={() => setShowAddModal(false)}>
                    <Icon name="close" />
                  </button>
                </div>
                <div className="modal-body">
                  <form className="add-payroll-form" onSubmit={handleCreatePayroll}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Employee ID / Code</label>
                        <input
                          type="text"
                          placeholder="Enter employee ID"
                          value={newPayroll.employeeId}
                          onChange={(e) => setNewPayroll({ ...newPayroll, employeeId: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Period Start</label>
                        <input
                          type="date"
                          value={newPayroll.periodStart}
                          onChange={(e) => setNewPayroll({ ...newPayroll, periodStart: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Period End</label>
                        <input
                          type="date"
                          value={newPayroll.periodEnd}
                          onChange={(e) => setNewPayroll({ ...newPayroll, periodEnd: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Gross Pay ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={newPayroll.grossPay}
                          onChange={(e) => setNewPayroll({ ...newPayroll, grossPay: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Tax Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={newPayroll.taxAmount}
                          onChange={(e) => setNewPayroll({ ...newPayroll, taxAmount: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Deductions ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={newPayroll.deductions}
                          onChange={(e) => setNewPayroll({ ...newPayroll, deductions: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          value={newPayroll.status}
                          onChange={(e) => setNewPayroll({ ...newPayroll, status: e.target.value })}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Add Payroll
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Process All Modal */}
          {showProcessModal && (
            <div className="modal-overlay" onClick={() => setShowProcessModal(false)}>
              <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Process All Payroll</h3>
                  <button className="modal-close" onClick={() => setShowProcessModal(false)}>
                    <Icon name="close" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="confirm-message">
                    <Icon name="alert" />
                    <p>Are you sure you want to process all pending payroll records?</p>
                    <p className="confirm-details">
                      This will process <strong>{stats.pending}</strong> pending payments totaling approximately <strong>{formatCurrency(payrollRecords.filter(r => r.status === 'Pending').reduce((sum, r) => sum + (parseFloat(r.netPay) || 0), 0))}</strong>.
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-secondary" onClick={() => setShowProcessModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={() => {
                    // Process all pending
                    payrollRecords.filter(r => r.status === 'Pending').forEach(r => handleProcessPayroll(r.id));
                    setShowProcessModal(false);
                  }}>
                    Process All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
