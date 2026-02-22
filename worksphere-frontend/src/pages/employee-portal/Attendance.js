import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './Attendance.css';

const Attendance = () => {
  const [filterMonth, setFilterMonth] = useState('February');

  const attendanceData = [
    { date: 'Feb 19', day: 'Monday', checkIn: '8:58 AM', checkOut: '5:02 PM', status: 'present', hours: 8.07 },
    { date: 'Feb 20', day: 'Tuesday', checkIn: '9:02 AM', checkOut: '5:00 PM', status: 'present', hours: 7.97 },
    { date: 'Feb 21', day: 'Wednesday', checkIn: '10:00 AM', checkOut: '6:00 PM', status: 'present', hours: 8.0 },
    { date: 'Feb 14', day: 'Thursday', checkIn: '-', checkOut: '-', status: 'absent', hours: 0 },
    { date: 'Feb 13', day: 'Wednesday', checkIn: '9:00 AM', checkOut: '5:00 PM', status: 'present', hours: 8.0 },
    { date: 'Feb 12', day: 'Tuesday', checkIn: '9:15 AM', checkOut: '5:15 PM', status: 'late', hours: 8.0 },
    { date: 'Feb 11', day: 'Monday', checkIn: '9:00 AM', checkOut: '5:00 PM', status: 'present', hours: 8.0 },
    { date: 'Feb 10', day: 'Sunday', checkIn: '-', checkOut: '-', status: 'off', hours: 0 },
  ];

  const stats = {
    present: 6,
    absent: 1,
    late: 1,
    rate: 98
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Attendance</h2>
        <div className="attendance-actions">
          <select className="filter-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
        </div>
      </div>

      <div className="attendance-stats">
        <div className="stat-box present">
          <div className="stat-icon">
            <Icon name="check" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Present</span>
            <span className="stat-number">{stats.present} days</span>
          </div>
        </div>
        <div className="stat-box absent">
          <div className="stat-icon">
            <Icon name="alert" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Absent</span>
            <span className="stat-number">{stats.absent} days</span>
          </div>
        </div>
        <div className="stat-box late">
          <div className="stat-icon">
            <Icon name="clock" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Late Arrivals</span>
            <span className="stat-number">{stats.late} times</span>
          </div>
        </div>
        <div className="stat-box rate">
          <div className="stat-icon">
            <Icon name="chart" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Attendance Rate</span>
            <span className="stat-number">{stats.rate}%</span>
          </div>
        </div>
      </div>

      <div className="attendance-table">
        <div className="table-header">
          <div className="col-date">Date</div>
          <div className="col-check-in">Check In</div>
          <div className="col-check-out">Check Out</div>
          <div className="col-hours">Hours</div>
          <div className="col-status">Status</div>
        </div>
        {attendanceData.map((record, idx) => (
          <div key={idx} className={`table-row status-${record.status}`}>
            <div className="col-date">
              <div className="date-info">
                <span className="date-text">{record.date}</span>
                <span className="day-text">{record.day}</span>
              </div>
            </div>
            <div className="col-check-in">{record.checkIn}</div>
            <div className="col-check-out">{record.checkOut}</div>
            <div className="col-hours">{record.hours > 0 ? record.hours.toFixed(2) : '-'}</div>
            <div className="col-status">
              <span className={`status-badge ${record.status}`}>
                {record.status === 'present' && <Icon name="check" />}
                {record.status === 'absent' && <Icon name="alert" />}
                {record.status === 'late' && <Icon name="clock" />}
                {record.status === 'off' && <Icon name="calendar" />}
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="attendance-notes">
        <h3>Attendance Notes</h3>
        <p>Your attendance record is excellent! Keep up the good work. Please ensure timely check-ins to maintain your perfect attendance record.</p>
      </div>
    </div>
  );
};

export default Attendance;
