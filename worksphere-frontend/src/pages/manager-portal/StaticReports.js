import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './StaticReports.css';

const StaticReports = () => {
  const [dateRange, setDateRange] = useState('this-month');
  const [department, setDepartment] = useState('all');

  // Sample data for visualizations
  const attendanceData = [
    { day: 'Mon', value: 92 },
    { day: 'Tue', value: 95 },
    { day: 'Wed', value: 88 },
    { day: 'Thu', value: 91 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 78 },
    
  ];

  const taskCompletionData = [
    { label: 'Completed', value: 42, color: '#16a34a' },
    { label: 'In Progress', value: 18, color: '#0ea5e9' },
    { label: 'Pending', value: 8, color: '#f59e0b' },
    { label: 'Overdue', value: 4, color: '#dc2626' },
  ];

  const performanceTrend = [
    { week: 'W1', value: 75 },
    { week: 'W2', value: 82 },
    { week: 'W3', value: 78 },
    { week: 'W4', value: 88 },
  ];

  const employeeAttendance = [
    { name: 'John Smith', dept: 'Sales', status: 'Present', hours: 38.5, rate: 98 },
    { name: 'Emily Martinez', dept: 'Sales', status: 'Present', hours: 40, rate: 100 },
    { name: 'Michael Johnson', dept: 'Marketing', status: 'Absent', hours: 32, rate: 95 },
    { name: 'Sarah Davis', dept: 'Support', status: 'Present', hours: 36, rate: 97 },
    { name: 'David Wilson', dept: 'Support', status: 'Late', hours: 35, rate: 92 },
    { name: 'Lisa Brown', dept: 'Sales', status: 'Present', hours: 39, rate: 96 },
  ];

  const teamPerformance = [
    { member: 'John Smith', score: 95, tasks: 12 },
    { member: 'Emily Martinez', score: 92, tasks: 14 },
    { member: 'Michael Johnson', score: 88, tasks: 10 },
    { member: 'Sarah Davis', score: 85, tasks: 11 },
    { member: 'David Wilson', score: 82, tasks: 9 },
    { member: 'Lisa Brown', score: 78, tasks: 8 },
  ];

  const leaveSummary = [
    { type: 'Annual Leave', approved: 8, pending: 3 },
    { type: 'Sick Leave', approved: 4, pending: 1 },
    { type: 'Personal Leave', approved: 2, pending: 2 },
    { type: 'Work From Home', approved: 12, pending: 5 },
  ];

  const getMaxValue = (data) => Math.max(...data.map(d => d.value));

  const handleExport = () => {
    alert('Exporting report...');
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <h2>Reports & Analytics</h2>
        <div className="reports-filters">
          <select 
            className="filter-select" 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
          <select 
            className="filter-select" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="support">Support</option>
          </select>
          <button className="btn-export" onClick={handleExport}>
            <Icon name="file" className="icon" />
            Export Report
          </button>
        </div>
      </div>

    
      {/* Charts Grid */}
      <div className="reports-grid">
        {/* Attendance Bar Chart */}
        <div className="report-card">
          <div className="report-card-header">
            <h3>Weekly Attendance</h3>
          </div>
          <div className="bar-chart">
            {attendanceData.map((item, index) => (
              <div className="bar-item" key={index}>
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(item.value / 100) * 160}px`,
                    background: `linear-gradient(to top, #0ea5e9, #60a5fa)`
                  }}
                >
                  <span className="bar-value">{item.value}%</span>
                </div>
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Completion Donut Chart */}
        <div className="report-card">
          <div className="report-card-header">
            <h3>Task Status Distribution</h3>
          </div>
          <div className="donut-chart-container">
            <div className="donut-chart">
              <div className="donut-center">
                <span className="donut-center-value">72</span>
                <span className="donut-center-label">Total</span>
              </div>
            </div>
            <div className="donut-legend">
              {taskCompletionData.map((item, index) => (
                <div className="legend-item" key={index}>
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-text">{item.label}</span>
                  <span className="legend-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Trend Line Chart */}
        <div className="report-card">
          <div className="report-card-header">
            <h3>Performance Trend</h3>
          </div>
          <div className="line-chart-container">
            <div className="line-chart">
              {performanceTrend.map((item, index) => (
                <div className="line-point" key={index}>
                  <div 
                    className="line-bar" 
                    style={{ height: `${(item.value / 100) * 120}px` }}
                  ></div>
                  <div className="line-dot"></div>
                  <span className="line-label">{item.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="report-card">
          <div className="report-card-header">
            <h3>Leave Summary</h3>
          </div>
          <div className="bar-chart">
            {leaveSummary.map((item, index) => (
              <div className="bar-item" key={index}>
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(item.approved / 20) * 140}px`,
                    background: `linear-gradient(to top, #16a34a, #4ade80)`
                  }}
                >
                  <span className="bar-value">{item.approved}</span>
                </div>
                <span className="bar-label">{item.type.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Attendance Table */}
        <div className="report-card wide">
          <div className="report-card-header">
            <h3>Employee Attendance Detail</h3>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Status</th>
                <th>Hours Worked</th>
                <th>Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {employeeAttendance.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <div className="employee-cell">
                      <div className="avatar">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  <td>{emp.dept}</td>
                  <td>
                    <span className={`status-dot ${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>{emp.hours} hrs</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-small">
                        <div 
                          className="progress-fill-small green" 
                          style={{ width: `${emp.rate}%` }}
                        ></div>
                      </div>
                      <span style={{ fontSize: '12px', marginLeft: '8px' }}>{emp.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Performance */}
        <div className="report-card wide">
          <div className="report-card-header">
            <h3>Team Performance Metrics</h3>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Performance Score</th>
                <th>Tasks Completed</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index}>
                  <td>
                    <div className="employee-cell">
                      <div className="avatar">{member.member.split(' ').map(n => n[0]).join('')}</div>
                      <span>{member.member}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontWeight: 600, 
                      color: member.score >= 90 ? '#16a34a' : member.score >= 80 ? '#0ea5e9' : '#f59e0b'
                    }}>
                      {member.score}%
                    </span>
                  </td>
                  <td>{member.tasks}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-small">
                        <div 
                          className={`progress-fill-small ${member.score >= 90 ? 'green' : member.score >= 80 ? 'blue' : 'orange'}`}
                          style={{ width: `${member.score}%` }}
                        ></div>
                      </div>
                    </div>
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

export default StaticReports;
