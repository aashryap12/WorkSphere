import React, { useState, useEffect } from 'react';
import Icon from '../../components/DashboardIcons';
import './Attendance.css';

const Attendance = () => {
  const [filterMonth, setFilterMonth] = useState(new Date().toLocaleString('en-US', { month: 'long' }));
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [todayRecord, setTodayRecord] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const userId = sessionStorage.getItem('userId');
  const userEmail = sessionStorage.getItem('email');

  // Get employee ID from user ID
  useEffect(() => {
    const fetchEmployeeId = async () => {
      try {
        const token = sessionStorage.getItem('token');
        
        let response = await fetch(`http://localhost:8080/api/employees/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok && userEmail) {
          response = await fetch(`http://localhost:8080/api/employees/email/${encodeURIComponent(userEmail)}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        }

        if (response.ok) {
          const employee = await response.json();
          setEmployeeId(employee.id);
        } else {
          setError('Employee record not found. Please contact HR.');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch employee info');
        setLoading(false);
      }
    };

    if (userId) {
      fetchEmployeeId();
    }
  }, [userId, userEmail]);

  // Fetch attendance records
  useEffect(() => {
    if (employeeId) {
      fetchAttendanceRecords();
    }
  }, [filterMonth, employeeId]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:8080/api/attendance?employeeId=${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }

      const data = await response.json();
      
      // Filter by selected month
      const monthIndex = new Date(`${filterMonth} 1, 2026`).getMonth();
      const filteredData = data.filter(record => {
        const recordDate = new Date(record.workDate);
        return recordDate.getMonth() === monthIndex;
      });

      // Sort by date descending
      filteredData.sort((a, b) => new Date(b.workDate) - new Date(a.workDate));
      
      setAttendanceData(filteredData);

      // Find today's record - compare dates by parsing both to same format
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayRec = data.find(r => {
        const recordDate = new Date(r.workDate);
        recordDate.setHours(0, 0, 0, 0);
        return recordDate.getTime() === today.getTime();
      });
      setTodayRecord(todayRec || null);

      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check In
  const handleCheckIn = async () => {
    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token');
      const now = new Date();
      
      const response = await fetch('http://localhost:8080/api/attendance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId: employeeId,
          workDate: now.toISOString().split('T')[0],
          checkInAt: now.toTimeString().split(' ')[0].substring(0, 5),
          status: now.getHours() >= 9 && now.getMinutes() > 15 ? 'Late' : 'Present'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check in');
      }

      await fetchAttendanceRecords();
      alert('Checked in successfully!');
    } catch (err) {
      alert('Failed to check in: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Check Out
  const handleCheckOut = async () => {
    if (!todayRecord) {
      alert('No check-in record found for today');
      return;
    }

    try {
      setActionLoading(true);
      const token = sessionStorage.getItem('token');
      const now = new Date();
      
      const response = await fetch(`http://localhost:8080/api/attendance/${todayRecord.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checkOutAt: now.toTimeString().split(' ')[0].substring(0, 5)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check out');
      }

      await fetchAttendanceRecords();
      alert('Checked out successfully!');
    } catch (err) {
      alert('Failed to check out: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Calculate stats
  const stats = attendanceData.reduce((acc, record) => {
    if (record.status === 'Present') acc.present++;
    else if (record.status === 'Absent') acc.absent++;
    else if (record.status === 'Late') acc.late++;
    return acc;
  }, { present: 0, absent: 0, late: 0 });

  const totalDays = stats.present + stats.absent + stats.late;
  stats.rate = totalDays > 0 ? Math.round((stats.present / totalDays) * 100) : 100;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '-';
    // Handle ISO timestamp from backend (Instant)
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) return 0;
    return (outDate - inDate) / (1000 * 60 * 60);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'present': return 'present';
      case 'absent': return 'absent';
      case 'late': return 'late';
      case 'half-day': return 'half-day';
      default: return 'off';
    }
  };

  const canCheckIn = !todayRecord || !todayRecord.checkInAt;
  const canCheckOut = todayRecord && todayRecord.checkInAt && !todayRecord.checkOutAt;

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Attendance</h2>
        <div className="attendance-actions">
          <select className="filter-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
      </div>

      {/* Check In / Check Out Section */}
      <div className="checkin-section">
        <div className="checkin-status">
          <div className="today-info">
            <Icon name="calendar" />
            <span>Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          {todayRecord && (
            <div className="today-times">
              <span>Check In: {todayRecord.checkInAt ? formatTime(todayRecord.checkInAt) : 'Not checked in'}</span>
              <span>Check Out: {todayRecord.checkOutAt ? formatTime(todayRecord.checkOutAt) : 'Not checked out'}</span>
            </div>
          )}
        </div>
        <div className="checkin-buttons">
          <button 
            className={`btn-checkin ${!canCheckIn ? 'disabled' : ''}`}
            onClick={handleCheckIn}
            disabled={!canCheckIn || actionLoading}
          >
            <Icon name="check" />
            {actionLoading ? 'Processing...' : 'Check In'}
          </button>
          <button 
            className={`btn-checkout ${!canCheckOut ? 'disabled' : ''}`}
            onClick={handleCheckOut}
            disabled={!canCheckOut || actionLoading}
          >
            <Icon name="clock" />
            {actionLoading ? 'Processing...' : 'Check Out'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <Icon name="clock" /> Loading attendance records...
        </div>
      )}

      {error && (
        <div className="error-state">
          <Icon name="alert" /> {error}
          <button onClick={fetchAttendanceRecords} className="retry-btn">Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
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

          {attendanceData.length === 0 ? (
            <div className="empty-state">
              <Icon name="calendar" />
              <p>No attendance records found for {filterMonth}</p>
            </div>
          ) : (
            <div className="attendance-table">
              <div className="table-header">
                <div className="col-date">Date</div>
                <div className="col-check-in">Check In</div>
                <div className="col-check-out">Check Out</div>
                <div className="col-hours">Hours</div>
                <div className="col-status">Status</div>
              </div>
              {attendanceData.map((record, idx) => {
                const hours = calculateHours(record.checkInAt, record.checkOutAt);
                const statusClass = getStatusClass(record.status);
                return (
                  <div key={record.id || idx} className={`table-row status-${statusClass}`}>
                    <div className="col-date">
                      <div className="date-info">
                        <span className="date-text">{formatDate(record.workDate)}</span>
                        <span className="day-text">{formatDay(record.workDate)}</span>
                      </div>
                    </div>
                    <div className="col-check-in">{formatTime(record.checkInAt)}</div>
                    <div className="col-check-out">{formatTime(record.checkOutAt)}</div>
                    <div className="col-hours">{hours > 0 ? hours.toFixed(2) : '-'}</div>
                    <div className="col-status">
                      <span className={`status-badge ${statusClass}`}>
                        {statusClass === 'present' && <Icon name="check" />}
                        {statusClass === 'absent' && <Icon name="alert" />}
                        {statusClass === 'late' && <Icon name="clock" />}
                        {statusClass === 'off' && <Icon name="calendar" />}
                        {record.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="attendance-notes">
            <h3>Attendance Notes</h3>
            <p>Your attendance record is excellent! Keep up the good work. Please ensure timely check-ins to maintain your perfect attendance record.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
