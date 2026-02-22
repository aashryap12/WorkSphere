import React, { useEffect, useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './Requests.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const Requests = () => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [alerts, setAlerts] = useState({ status: null, msg: '' });
  const [currentFilter, setCurrentFilter] = useState('all');
  const [formVisible, setFormVisible] = useState(false);
  const [formFields, setFormFields] = useState({
    type: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token. Please log in first.');
        }
        const response = await fetch(`${API_URL}/api/requests`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', response.status, errorText);
          throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
        }
        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading requests:', error);
        setAlerts({ status: 'error', msg: error.message || 'Failed to fetch requests' });
      } finally {
        setIsFetching(false);
      }
    };
    loadData();
  }, []);

  const handleFieldChange = (key, value) => {
    setFormFields(prev => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAlerts({ status: null, msg: '' });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/requests`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields),
      });
      if (!response.ok) throw new Error('Submission failed');
      const newItem = await response.json();
      setItems(prev => [newItem, ...prev]);
      setFormFields({ type: '', startDate: '', endDate: '', description: '' });
      setFormVisible(false);
      setAlerts({ status: 'success', msg: 'Request submitted successfully' });
    } catch (error) {
      setAlerts({ status: 'error', msg: error.message });
    }
  };

  const countByStatus = (status) => {
    if (status === 'all') return items.length;
    return items.filter(i => i.status === status).length;
  };

  const displayedItems = currentFilter === 'all' ? items : items.filter(i => i.status === currentFilter);

  return (
    <div className="requests-container">
      <div className="requests-header">
        <h2>Requests</h2>
        <button className="btn-primary" type="button" onClick={() => setFormVisible(!formVisible)}>
          <Icon name="plus" /> {formVisible ? 'Cancel' : 'New Request'}
        </button>
      </div>

      {alerts.msg && <div className={`requests-alert ${alerts.status}`}>{alerts.msg}</div>}

      {formVisible && (
        <div className="request-form-card">
          <h3>Create New Request</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Request Type:</label>
              <select value={formFields.type} onChange={(e) => handleFieldChange('type', e.target.value)} required>
                <option value="">-- Select Request Type --</option>
                <option value="Time Off">Time Off / Vacation</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Shift Swap">Shift Swap</option>
                <option value="Schedule Change">Schedule Change</option>
                <option value="Overtime">Overtime</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date:</label>
                <input type="date" value={formFields.startDate} onChange={(e) => handleFieldChange('startDate', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>End Date:</label>
                <input type="date" value={formFields.endDate} onChange={(e) => handleFieldChange('endDate', e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={formFields.description} onChange={(e) => handleFieldChange('description', e.target.value)} placeholder="Provide details..." rows="3" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Submit</button>
              <button type="button" className="btn-secondary" onClick={() => setFormVisible(false)}>Close</button>
            </div>
          </form>
        </div>
      )}

      <div className="requests-stats">
        <div className="stat-card pending">
          <div className="stat-icon"><Icon name="clock" /></div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-number">{countByStatus('pending')}</span>
          </div>
        </div>
        <div className="stat-card approved">
          <div className="stat-icon"><Icon name="check" /></div>
          <div className="stat-info">
            <span className="stat-label">Approved</span>
            <span className="stat-number">{countByStatus('approved')}</span>
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon"><Icon name="alert" /></div>
          <div className="stat-info">
            <span className="stat-label">Rejected</span>
            <span className="stat-number">{countByStatus('rejected')}</span>
          </div>
        </div>
        <div className="stat-card total">
          <div className="stat-icon"><Icon name="file" /></div>
          <div className="stat-info">
            <span className="stat-label">Total</span>
            <span className="stat-number">{countByStatus('all')}</span>
          </div>
        </div>
      </div>

      <div className="requests-filters">
        <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>All Requests</button>
        <button className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`} onClick={() => setCurrentFilter('pending')}>Pending</button>
        <button className={`filter-btn ${currentFilter === 'approved' ? 'active' : ''}`} onClick={() => setCurrentFilter('approved')}>Approved</button>
        <button className={`filter-btn ${currentFilter === 'rejected' ? 'active' : ''}`} onClick={() => setCurrentFilter('rejected')}>Rejected</button>
      </div>

      {isFetching ? (
        <div className="requests-alert info">Loading requests...</div>
      ) : displayedItems.length === 0 ? (
        <div className="empty-state"><p>No requests found</p></div>
      ) : (
        <div className="requests-list">
          {displayedItems.map((req, index) => (
            <div key={`req-${index}-${req.type}`} className={`request-card status-${req.status}`}>
              <div className="request-header">
                <div className="request-type">
                  <span className="type-badge">{req.type}</span>
                  <span className="request-dates">{req.startDate} to {req.endDate}</span>
                </div>
                <span className={`status-badge ${req.status}`}>
                  {req.status === 'pending' && <Icon name="clock" />}
                  {req.status === 'approved' && <Icon name="check" />}
                  {req.status === 'rejected' && <Icon name="alert" />}
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              <div className="request-body">
                {req.description && (
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{req.description}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Submitted:</span>
                  <span className="detail-value">{new Date(req.submittedDate).toLocaleDateString()}</span>
                </div>
                {req.status !== 'pending' && (
                  <div className="detail-row">
                    <span className="detail-label">Decision:</span>
                    <span className="detail-value">
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      {req.approvedBy && ` - By: ${req.approvedBy}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
