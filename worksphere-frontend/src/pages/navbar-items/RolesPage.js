import './RolesPage.css';

const managerImg = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80';
const employeeImg = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80';
const hrImg = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&q=80';
const adminImg = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80';
const executiveImg = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80';

const ROLES = [
  {
    id: 'employee',
    title: 'Employees',
    subtitle: 'Mobile-first self-service experience',
    description: 'Empower frontline employees with tools to manage their own schedules, request time off, and stay connected.',
    image: employeeImg,
    features: [
      'View personal schedule',
      'Request time off',
      'Swap shifts with colleagues',
      'Clock in/out via mobile',
      'Access pay stubs',
      'Receive announcements'
    ],
    benefits: ['Increased engagement', 'Reduced admin burden', 'Better work-life balance']
  },
  {
    id: 'manager',
    title: 'Managers',
    subtitle: 'Complete team oversight and control',
    description: 'Manage schedules, approve requests, monitor performance, and communicate with your team in real-time.',
    image: managerImg,
    features: [
      'Create and publish schedules',
      'Approve time-off requests',
      'Monitor attendance',
      'Track performance metrics',
      'Communicate with team',
      'Manage shift swaps'
    ],
    benefits: ['Better team planning', 'Faster decision making', 'Improved team communication']
  },
  {
    id: 'hr',
    title: 'HR Professionals',
    subtitle: 'Strategic workforce management',
    description: 'From hiring to retirement, manage the entire employee lifecycle with comprehensive HR tools.',
    image: hrImg,
    features: [
      'Recruit and onboard',
      'Manage employee records',
      'Benefits administration',
      'Compliance tracking',
      'Compensation planning',
      'Analytics & reporting'
    ],
    benefits: ['Streamlined operations', 'Compliance assurance', 'Better talent management']
  },
  {
    id: 'admin',
    title: 'Administrators',
    subtitle: 'System configuration and security',
    description: 'Configure the system, manage users, set permissions, and maintain data integrity and security.',
    image: adminImg,
    features: [
      'User & role management',
      'System configuration',
      'Data security settings',
      'Audit logs & compliance',
      'API integrations',
      'Backup management'
    ],
    benefits: ['Complete control', 'Enhanced security', 'Seamless integrations']
  },
  {
    id: 'executive',
    title: 'Executives & Leadership',
    subtitle: 'Strategic insights and business intelligence',
    description: 'Access high-level dashboards with key metrics, ROI tracking, and strategic recommendations.',
    image: executiveImg,
    features: [
      'Executive dashboards',
      'ROI metrics',
      'Trend analysis',
      'Cost optimization insights',
      'Strategic reports',
      'Forecasting tools'
    ],
    benefits: ['Data-driven decisions', 'Strategic planning', 'Competitive advantage']
  }
];

const CAPABILITIES = {
  employee: [
    { category: 'Scheduling', items: ['View Schedule', 'Request Time Off', 'Swap Shifts', 'Overtime Bids'] },
    { category: 'Self-Service', items: ['Update Profile', 'W-2 Access', 'Pay Stub View', 'Benefits Info'] },
    { category: 'Mobile', items: ['Clock In/Out', 'Message Manager', 'Notifications', 'Schedule Access'] }
  ],
  manager: [
    { category: 'Team Management', items: ['Create Schedules', 'Manage Requests', 'Monitor Attendance', 'Track Performance'] },
    { category: 'Analytics', items: ['Labor Reports', 'Cost Analysis', 'Efficiency Metrics', 'Forecasts'] },
    { category: 'Communication', items: ['Team Messaging', 'Announcements', 'Notifications', 'Performance Feedback'] }
  ],
  hr: [
    { category: 'Recruitment', items: ['Job Posting', 'Candidate Tracking', 'Interview Scheduling', 'Offer Management'] },
    { category: 'Onboarding', items: ['Document Management', 'Training Tracking', 'Compliance Setup', 'System Access'] },
    { category: 'Administration', items: ['Employee Records', 'Benefits Management', 'Payroll Setup', 'Compliance Tracking'] }
  ]
};

export default function RolesPage() {
  return (
    <div className="roles-page">
      {/* Hero */}
      <section className="roles-hero">
        <div className="container">
          <h1 className="hero-title">Built for Every Role</h1>
          <p className="hero-subtitle">
            Tailored interfaces and workflows designed for each role in your organization, from frontline employees to executives.
          </p>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="section roles-section">
        <div className="container">
          <div className="roles-grid">
            {ROLES.map((role) => (
              <article key={role.id} className="role-card">
                <div className="role-image">
                  <img src={role.image} alt={role.title} />
                  <div className="role-overlay">
                    <button className="btn btn-primary">Learn More</button>
                  </div>
                </div>
                <div className="role-content">
                  <h3 className="role-title">{role.title}</h3>
                  <p className="role-subtitle-text">{role.subtitle}</p>
                  <p className="role-desc">{role.description}</p>
                  
                  <div className="role-features">
                    <h4>Key Features</h4>
                    <ul>
                      {role.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="role-benefits">
                    {role.benefits.map((benefit, idx) => (
                      <span key={idx} className="benefit-badge">{benefit}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Capabilities */}
      <section className="section capabilities-section">
        <div className="container">
          <h2 className="section-title">Detailed Capabilities</h2>
          
          <div className="capabilities-tabs">
            {['employee', 'manager', 'hr'].map((role) => (
              <div key={role} className="capability-group">
                <h3>{role === 'employee' ? 'Employees' : role === 'manager' ? 'Managers' : 'HR Professionals'}</h3>
                <div className="capability-cards">
                  {CAPABILITIES[role].map((cap, idx) => (
                    <div key={idx} className="capability-card">
                      <h4>{cap.category}</h4>
                      <ul>
                        {cap.items.map((item, i) => (
                          <li key={i}>
                            <span className="checkmark">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permission Matrix */}
      <section className="section permission-section">
        <div className="container">
          <h2 className="section-title">Permission & Access Matrix</h2>
          <div className="permission-matrix">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Employee</th>
                  <th>Manager</th>
                  <th>HR</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>View Own Schedule</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                </tr>
                <tr>
                  <td>Create Schedules</td>
                  <td className="access-none">—</td>
                  <td className="access-full">✓</td>
                  <td className="access-partial">◐</td>
                  <td className="access-full">✓</td>
                </tr>
                <tr>
                  <td>Approve Time Off</td>
                  <td className="access-none">—</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                </tr>
                <tr>
                  <td>View Analytics</td>
                  <td className="access-none">—</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                  <td className="access-full">✓</td>
                </tr>
                <tr>
                  <td>Manage Users</td>
                  <td className="access-none">—</td>
                  <td className="access-none">—</td>
                  <td className="access-partial">◐</td>
                  <td className="access-full">✓</td>
                </tr>
                <tr>
                  <td>Configure System</td>
                  <td className="access-none">—</td>
                  <td className="access-none">—</td>
                  <td className="access-none">—</td>
                  <td className="access-full">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section roles-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Empower Your Teams?</h2>
            <p>Give each team member the tools they need to succeed</p>
            <button className="btn btn-primary btn-lg">Start Free Trial</button>
          </div>
        </div>
      </section>
    </div>
  );
}
