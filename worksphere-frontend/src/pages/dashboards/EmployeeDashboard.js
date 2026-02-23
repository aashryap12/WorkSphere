import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopBar from '../../components/DashboardTopBar';
import Icon from '../../components/DashboardIcons';
import Attendance from '../employee-portal/Attendance';
import Payroll from '../employee-portal/Payroll';
import Requests from '../employee-portal/Requests';
import Tasks from '../employee-portal/Tasks';
import MyProfile from '../employee-portal/MyProfile';
import './EmployeeDashboard.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    role: ''
  });
  const [activePage, setActivePage] = useState('overview');
  const [employeeId, setEmployeeId] = useState(null);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');

    if (!token || role !== 'employee') {
      navigate('/login');
      return;
    }

    setUser({ username, role });
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('email');

      // Get employee record first
      let empResponse = await fetch(`${API_URL}/api/employees/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!empResponse.ok && userEmail) {
        empResponse = await fetch(`${API_URL}/api/employees/email/${encodeURIComponent(userEmail)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      }

      if (empResponse.ok) {
        const employee = await empResponse.json();
        setEmployeeId(employee.id);

        // Fetch payroll records
        const payrollResponse = await fetch(`${API_URL}/api/payroll?employeeId=${employee.id}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (payrollResponse.ok) {
          const payrollData = await payrollResponse.json();
          setPayrollRecords(Array.isArray(payrollData) ? payrollData : []);
        }

        // Fetch tasks assigned to this employee
        const tasksResponse = await fetch(`${API_URL}/api/tasks?employeeId=${employee.id}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTasks(Array.isArray(tasksData) ? tasksData : []);
        }
      }

      // Fetch requests
      const requestsResponse = await fetch(`${API_URL}/api/requests`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setRequests(Array.isArray(requestsData) ? requestsData : []);
      }
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  // Get next paycheck info
  const getNextPaycheck = () => {
    if (payrollRecords.length === 0) return { amount: '-', date: '-' };
    const sorted = [...payrollRecords].sort((a, b) => 
      new Date(b.payDate || b.payPeriodEnd) - new Date(a.payDate || a.payPeriodEnd)
    );
    const latest = sorted[0];
    return {
      amount: latest.netSalary ? `$${latest.netSalary.toLocaleString()}` : '-',
      date: latest.payDate ? new Date(latest.payDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'
    };
  };

  // Get pending requests count
  const getPendingRequests = () => {
    return requests.filter(r => r.status === 'Pending').length;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container role-employee">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>WorkSphere</h2>
          <p className="user-badge">Employee Portal</p>
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
            className={`nav-item ${activePage === 'attendance' ? 'active' : ''}`}
            onClick={() => setActivePage('attendance')}
          >
            <span className="nav-icon"><Icon name="clock" /></span>
            Attendance
          </button>
          <button 
            className={`nav-item ${activePage === 'payroll' ? 'active' : ''}`}
            onClick={() => setActivePage('payroll')}
          >
            <span className="nav-icon"><Icon name="wallet" /></span>
            Payroll
          </button>
          <button 
            className={`nav-item ${activePage === 'requests' ? 'active' : ''}`}
            onClick={() => setActivePage('requests')}
          >
            <span className="nav-icon"><Icon name="inbox" /></span>
            Requests
          </button>
          <button 
            className={`nav-item ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => setActivePage('tasks')}
          >
            <span className="nav-icon"><Icon name="tasks" /></span>
            Tasks
          </button>
          <button 
            className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
            onClick={() => setActivePage('profile')}
          >
            <span className="nav-icon"><Icon name="user" /></span>
            My Profile
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon"><Icon name="log" /></span>
          Logout
        </button>
      </div>

      <div className="dashboard-main">
        <DashboardTopBar roleLabel="Employee" username={user.username} />
        
        {activePage === 'overview' && (
          <>
            <div className="dashboard-header">
              <div>
                <h1>Welcome {user.username}!</h1>
                <p className="dashboard-subtitle">Here's your workspace overview</p>
              </div>
              <div className="header-actions">
                <button className="btn-secondary">
                  <Icon name="bell" className="icon" /> Notifications
                </button>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon blue"><Icon name="calendar" /></div>
                <div className="stat-content">
                  <p className="stat-label">Hours This Week</p>
                  <h3 className="stat-value">32.5 hrs</h3>
                  
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><Icon name="check" /></div>
                <div className="stat-content">
                  <p className="stat-label">Attendance Rate</p>
                  <h3 className="stat-value">98%</h3>
                  
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orange"><Icon name="calendar" /></div>
                <div className="stat-content">
                  <p className="stat-label">Available PTO</p>
                  <h3 className="stat-value">12 days</h3>
                  <span className="stat-change neutral">Remaining</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple"><Icon name="wallet" /></div>
                <div className="stat-content">
                  <p className="stat-label">Last Paycheck</p>
                  <h3 className="stat-value">{getNextPaycheck().amount}</h3>
                  <span className="stat-change neutral">{getNextPaycheck().date}</span>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Recent Payroll</h3>
                  <button className="btn-link" onClick={() => setActivePage('payroll')}>View All</button>
                </div>
                {loadingData ? (
                  <div className="loading-message">Loading payroll data...</div>
                ) : payrollRecords.length === 0 ? (
                  <div className="empty-message">No payroll records found</div>
                ) : (
                  <div className="payroll-list">
                    {payrollRecords.slice(0, 3).map((record, index) => (
                      <div key={record.id || index} className="payroll-item">
                        <div className="payroll-period">
                          <span className="period-label">Pay Period</span>
                          <span className="period-dates">
                            {record.payPeriodStart ? new Date(record.payPeriodStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'} - {record.payPeriodEnd ? new Date(record.payPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                          </span>
                        </div>
                        <div className="payroll-details">
                          <span className="gross-amount">Gross: ${record.grossSalary?.toLocaleString() || '-'}</span>
                          <span className="net-amount">Net: ${record.netSalary?.toLocaleString() || '-'}</span>
                        </div>
                        <span className={`payroll-status ${record.status?.toLowerCase() || 'pending'}`}>
                          {record.status || 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>My Requests</h3>
                  <button className="btn-link" onClick={() => setActivePage('requests')}>View All</button>
                </div>
                {loadingData ? (
                  <div className="loading-message">Loading requests...</div>
                ) : requests.length === 0 ? (
                  <div className="empty-message">No requests found</div>
                ) : (
                  <div className="requests-list">
                    {requests.slice(0, 4).map((request, index) => (
                      <div key={request.id || index} className="request-item">
                        <div className="request-info">
                          <span className="request-type">{request.type || 'Request'}</span>
                          <span className="request-dates">
                            {request.startDate ? new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                            {request.endDate && request.endDate !== request.startDate ? 
                              ` - ${new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
                          </span>
                        </div>
                        <span className={`request-status ${request.status?.toLowerCase() || 'pending'}`}>
                          {request.status || 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {getPendingRequests() > 0 && (
                  <div className="pending-badge">
                    {getPendingRequests()} pending request{getPendingRequests() > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>My Tasks</h3>
                  <button className="btn-link" onClick={() => setActivePage('tasks')}>View All</button>
                </div>
                {loadingData ? (
                  <div className="loading-message">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                  <div className="empty-message">No tasks assigned</div>
                ) : (
                  <div className="tasks-overview-list">
                    {tasks.filter(t => t.status !== 'completed').slice(0, 4).map((task, index) => (
                      <div key={task.id || index} className={`task-overview-item ${task.priority}`}>
                        <div className="task-overview-info">
                          <span className="task-overview-title">{task.title}</span>
                          <span className="task-overview-due">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                          </span>
                        </div>
                        <span className={`task-overview-status ${task.status}`}>
                          {task.status || 'pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length > 0 && (
                  <div className="tasks-count-badge">
                    {tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length} active task{tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activePage === 'attendance' && <Attendance />}
        {activePage === 'payroll' && <Payroll />}
        {activePage === 'requests' && <Requests />}
        {activePage === 'tasks' && <Tasks />}
        {activePage === 'profile' && <MyProfile />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
