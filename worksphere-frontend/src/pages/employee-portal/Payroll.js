import React, { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './Payroll.css';

const Payroll = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [viewType, setViewType] = useState('list');

  const payrollData = [
    { period: 'Feb 10, 2026', payDate: 'Feb 24, 2026', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'upcoming' },
    { period: 'Jan 27 , 2026', payDate: 'Feb 10, 2026', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'paid' },
    { period: 'Jan 13, 2026', payDate: 'Jan 27, 2026', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'paid' },
    { period: 'Dec 30, 2025', payDate: 'Jan 13, 2026', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'paid' },
    { period: 'Dec 16, 2025', payDate: 'Dec 30, 2025', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'paid' },
    { period: 'Dec 2, 2025', payDate: 'Dec 16, 2025', grossSalary: 3000.00, deductions: 1000.00, netPay: 1000.00, status: 'paid' },
  ];

  const deductionBreakdown = {
    federalTax: 345.67,
    stateTax: 156.23,
    socialSecurity: 238.45,
    medicare: 55.79,
    insurance: 96.20,
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

      {viewType === 'list' && (
        <>
          <div className="payroll-stats">
            <div className="pay-stat">
              <span className="stat-label">Gross Salary</span>
              <span className="stat-value">23,076.90</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Deductions</span>
              <span className="stat-value">5,354.04</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Net Pay</span>
              <span className="stat-value highlighted">17,722.86</span>
            </div>
            <div className="pay-stat">
              <span className="stat-label">Next Paycheck</span>
              <span className="stat-value upcoming">Feb 24</span>
            </div>
          </div>

          <div className="payroll-list">
            <div className="list-header">
              <div className="col-period">Pay Period</div>
              <div className="col-date">Pay Date</div>
              <div className="col-gross">Gross</div>
              <div className="col-deduction">Deductions</div>
              <div className="col-net">Net Pay</div>
              <div className="col-status">Status</div>
            </div>
            {payrollData.map((record, idx) => (
              <div key={idx} className={`list-row status-${record.status}`}>
                <div className="col-period">{record.period}</div>
                <div className="col-date">{record.payDate}</div>
                <div className="col-gross">{record.grossSalary.toFixed(2)}</div>
                <div className="col-deduction">{record.deductions.toFixed(2)}</div>
                <div className="col-net">${record.netPay.toFixed(2)}</div>
                <div className="col-status">
                  <span className={`status-badge ${record.status}`}>
                    {record.status === 'paid' && <Icon name="check" />}
                    {record.status === 'upcoming' && <Icon name="clock" />}
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewType === 'summary' && (
        <div className="payroll-summary">
          <div className="summary-card overview">
            <h3>Current Pay Period Overview</h3>
            <div className="summary-row">
              <span className="label">Gross Salary:</span>
              <span className="value">3,846.15</span>
            </div>
            <div className="summary-row">
              <span className="label">Total Deductions:</span>
              <span className="value deduction">-{totalDeductions.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span className="label">Net Pay:</span>
              <span className="value">{(3846.15 - totalDeductions).toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-card deductions">
            <h3>Deduction Breakdown</h3>
            {Object.entries(deductionBreakdown).map(([key, value]) => (
              <div key={key} className="deduction-row">
                <span className="label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="value">{value.toFixed(2)}</span>
              </div>
            ))}
            <div className="deduction-total">
              <span className="label">Total:</span>
              <span className="value">{totalDeductions.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-card benefits">
            <h3>Benefits Information</h3>
            <div className="benefit-item">
              <h4>Health Insurance</h4>
              <p className="benefit-status">Active</p>
              <p className="benefit-detail">Premium: Employer covered</p>
            </div>
            <div className="benefit-item">
              <h4>401(k) Retirement</h4>
              <p className="benefit-status">Active</p>
              <p className="benefit-detail">Contribution: 5% + 3% Match</p>
            </div>
            <div className="benefit-item">
              <h4>Life Insurance</h4>
              <p className="benefit-status">Active</p>
              <p className="benefit-detail">Coverage: 2x Annual Salary</p>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Payroll;
