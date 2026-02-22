import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './MySchedule.css';

const MySchedule = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [scheduleView, setScheduleView] = useState('week');

  const scheduleData = {
    current: [
      { day: 'Monday', date: 'Feb 19', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'completed' },
      { day: 'Tuesday', date: 'Feb 20', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'completed' },
      { day: 'Wednesday', date: 'Feb 21', timeIn: '10:00 AM', timeOut: '6:00 PM', hours: 8, status: 'today' },
      { day: 'Thursday', date: 'Feb 22', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Friday', date: 'Feb 23', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Saturday', date: 'Feb 24', timeIn: 'Off', timeOut: '', hours: 0, status: 'off' },
      { day: 'Sunday', date: 'Feb 25', timeIn: 'Off', timeOut: '', hours: 0, status: 'off' },
    ],
    next: [
      { day: 'Monday', date: 'Feb 26', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Tuesday', date: 'Feb 27', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Wednesday', date: 'Feb 28', timeIn: '10:00 AM', timeOut: '6:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Thursday', date: 'Mar 1', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Friday', date: 'Mar 2', timeIn: '9:00 AM', timeOut: '5:00 PM', hours: 8, status: 'upcoming' },
      { day: 'Saturday', date: 'Mar 3', timeIn: 'Off', timeOut: '', hours: 0, status: 'off' },
      { day: 'Sunday', date: 'Mar 4', timeIn: 'Off', timeOut: '', hours: 0, status: 'off' },
    ]
  };

  const currentSchedule = scheduleData[selectedWeek];
  const totalHours = currentSchedule.reduce((sum, day) => sum + day.hours, 0);

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>My Schedule</h2>
        <div className="schedule-controls">
          <div className="view-toggle">
            <button className={`toggle-btn ${scheduleView === 'week' ? 'active' : ''}`} onClick={() => setScheduleView('week')}>
              <Icon name="calendar" /> Week
            </button>
            <button className={`toggle-btn ${scheduleView === 'month' ? 'active' : ''}`} onClick={() => setScheduleView('month')}>
              <Icon name="calendar" /> Month
            </button>
          </div>
          <button className="btn-primary">
            Schedule Change
          </button>
        </div>
      </div>

      <div className="schedule-filters">
        <button className={`filter-btn ${selectedWeek === 'current' ? 'active' : ''}`} onClick={() => setSelectedWeek('current')}>
          Current Week
        </button>
        <button className={`filter-btn ${selectedWeek === 'next' ? 'active' : ''}`} onClick={() => setSelectedWeek('next')}>
          Next Week
        </button>
      </div>

      <div className="schedule-content">
        <div className="schedule-summary">
          <div className="summary-item">
            <span className="summary-label">Total Hours</span>
            <span className="summary-value">{totalHours} hrs</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Avg Daily Hours</span>
            <span className="summary-value">{(totalHours / 5).toFixed(1)} hrs</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Days Off</span>
            <span className="summary-value">2</span>
          </div>
        </div>

        <div className="schedule-grid">
          {currentSchedule.map((day, idx) => (
            <div key={idx} className={`schedule-day-card ${day.status}`}>
              <div className="day-header">
                <h3>{day.day}</h3>
                <span className="day-date">{day.date}</span>
              </div>
              <div className="day-content">
                {day.status === 'off' ? (
                  <div className="day-off">
                    <Icon name="calendar" />
                    <span>Day Off</span>
                  </div>
                ) : (
                  <>
                    <div className="time-slot">
                      <span className="time-label">In</span>
                      <span className="time-value">{day.timeIn}</span>
                    </div>
                    <div className="time-divider">→</div>
                    <div className="time-slot">
                      <span className="time-label">Out</span>
                      <span className="time-value">{day.timeOut}</span>
                    </div>
                    <div className="time-hours">{day.hours}h</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-legend">
          <div className="legend-item">
            <div className="legend-color completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color today"></div>
            <span>Today</span>
          </div>
          <div className="legend-item">
            <div className="legend-color upcoming"></div>
            <span>Upcoming</span>
          </div>
          <div className="legend-item">
            <div className="legend-color off"></div>
            <span>Day Off</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
