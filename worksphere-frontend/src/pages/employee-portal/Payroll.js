import React, { useState, useEffect } from 'react';
import Icon from '../../components/DashboardIcons';
import './Payroll.css';

const Payroll = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [viewType, setViewType] = useState('list');
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  const userId = sessionStorage.getItem('userId');
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    // First get the employee record for this user
    const fetchEmployeeId = async () => {
      try {
        const token = sessionStorage.getItem('token');
        
        // Try to get employee by userId first
        let response = await fetch(`http://localhost:8080/api/employees/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // If userId lookup fails, try by email
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

  useEffect(() => {
    if (employeeId) {
      fetchPayrollRecords();
    }
  }, [selectedYear, employeeId]);

  const fetchPayrollRecords = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:8080/api/payroll?employeeId=${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payroll records');
      }

      const data = await response.json();
      
      // Filter by selected year based on payDate
      const filteredData = data.filter(record => {
        const payDate = new Date(record.payDate);
        return payDate.getFullYear().toString() === selectedYear;
      });

      // Sort by pay date descending
      filteredData.sort((a, b) => new Date(b.payDate) - new Date(a.payDate));
      
      setPayrollData(filteredData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching payroll:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from fetched data
  const stats = payrollData.reduce((acc, record) => {
    acc.grossSalary += record.grossSalary || 0;
    acc.taxAmount += record.taxAmount || 0;
    acc.deductions += record.deductions || 0;
    acc.netPay += record.netPay || 0;
    return acc;
  }, { grossSalary: 0, taxAmount: 0, deductions: 0, netPay: 0 });

  // Find next upcoming paycheck
  const upcomingPayroll = payrollData.find(record => 
    record.status === 'Pending' || record.status === 'Processing'
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rs. 0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Paid':
        return { class: 'paid', label: 'Paid', icon: 'check' };
      case 'Pending':
      case 'Processing':
        return { class: 'upcoming', label: status, icon: 'clock' };
      default:
        return { class: 'pending', label: status, icon: 'clock' };
    }
  };

  // Deduction breakdown (calculated from latest payroll or default)
  const latestPayroll = payrollData[0];
  const deductionBreakdown = {
    federalTax: latestPayroll?.federalTax || 0,
    stateTax: latestPayroll?.stateTax || 0,
    socialSecurity: latestPayroll?.socialSecurity || 0,
    medicare: latestPayroll?.medicare || 0,
    insurance: latestPayroll?.insurance || 0,
  };

  const totalDeductions = Object.values(deductionBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <h2>Payroll</h2>
        <div className="payroll-controls">
          <select className="year-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}>
              <Icon name="file" /> List
            </button>
            <button className={`toggle-btn ${viewType === 'summary' ? 'active' : ''}`} onClick={() => setViewType('summary')}>
              <Icon name="chart" /> Summary
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <Icon name="clock" /> Loading payroll records...
        </div>
      )}

      {error && (
        <div className="error-state">
          <Icon name="alert" /> {error}
          <button onClick={fetchPayrollRecords} className="retry-btn">Retry</button>
        </div>
      )}

      {!loading && !error && viewType === 'list' && (
        <>
          <div className="payroll-stats">
            <div className="pay-stat">
              <span className="stat-label">Gross Salary</span>
              <span className="stat-value">{formatCurrency(stats.grossSalary)}</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Tax</span>
              <span className="stat-value">{formatCurrency(stats.taxAmount)}</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Deductions</span>
              <span className="stat-value">{formatCurrency(stats.deductions)}</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Net Pay</span>
              <span className="stat-value highlighted">{formatCurrency(stats.netPay)}</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Next Paycheck</span>
              <span className="stat-value upcoming">{upcomingPayroll ? formatShortDate(upcomingPayroll.payDate) : 'N/A'}</span>
            </div>
          </div>

          {payrollData.length === 0 ? (
            <div className="empty-state">
              <Icon name="file" />
              <p>No payroll records found for {selectedYear}</p>
            </div>
          ) : (
            <div className="payroll-list">
              <div className="list-header">
                <div className="col-period">Pay Period</div>
                <div className="col-date">Pay Date</div>
                <div className="col-gross">Gross</div>
                <div className="col-tax">Tax</div>
                <div className="col-deduction">Deductions</div>
                <div className="col-net">Net Pay</div>
                <div className="col-status">Status</div>
              </div>
              {payrollData.map((record, idx) => {
                const statusInfo = getStatusDisplay(record.status);
                return (
                  <div key={record.id || idx} className={`list-row status-${statusInfo.class}`}>
                    <div className="col-period">{formatDate(record.payPeriodStart)} - {formatDate(record.payPeriodEnd)}</div>
                    <div className="col-date">{formatDate(record.payDate)}</div>
                    <div className="col-gross">{formatCurrency(record.grossSalary)}</div>
                    <div className="col-tax">{formatCurrency(record.taxAmount)}</div>
                    <div className="col-deduction">{formatCurrency(record.deductions)}</div>
                    <div className="col-net">{formatCurrency(record.netPay)}</div>
                    <div className="col-status">
                      <span className={`status-badge ${statusInfo.class}`}>
                        <Icon name={statusInfo.icon} />
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {!loading && !error && viewType === 'summary' && (
        <div className="payroll-summary">
          <div className="summary-card overview">
            <h3>Current Pay Period Overview</h3>
            {latestPayroll ? (
              <>
                <div className="summary-row">
                  <span className="label">Gross Salary:</span>
                  <span className="value">{formatCurrency(latestPayroll.grossSalary)}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Tax Amount:</span>
                  <span className="value deduction">-{formatCurrency(latestPayroll.taxAmount)}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Total Deductions:</span>
                  <span className="value deduction">-{formatCurrency(latestPayroll.deductions)}</span>
                </div>
                <div className="summary-row total">
                  <span className="label">Net Pay:</span>
                  <span className="value">{formatCurrency(latestPayroll.netPay)}</span>
                </div>
              </>
            ) : (
              <p className="no-data">No payroll data available</p>
            )}
          </div>

          <div className="summary-card deductions">
            <h3>Deduction Breakdown</h3>
            {latestPayroll ? (
              <>
                {Object.entries(deductionBreakdown).map(([key, value]) => (
                  <div key={key} className="deduction-row">
                    <span className="label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="value">{formatCurrency(value)}</span>
                  </div>
                ))}
                <div className="deduction-total">
                  <span className="label">Total:</span>
                  <span className="value">{formatCurrency(totalDeductions)}</span>
                </div>
              </>
            ) : (
              <p className="no-data">No deduction data available</p>
            )}
          </div>

          
        </div>
      )}

     
    </div>
  );
};

export default Payroll;
