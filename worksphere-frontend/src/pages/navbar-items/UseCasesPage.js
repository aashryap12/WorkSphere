import './UseCasesPage.css';

const USE_CASES = [
  {
    id: 'retail',
    industry: 'Retail & Commerce',
    title: 'Multi-store Scheduling at Scale',
    description: 'Manage schedules across hundreds of locations with AI-powered forecasting that adapts to seasonal demand.',
    challenge: 'Coordinating schedules across multiple time zones while responding to customer traffic patterns',
    solution: [
      'Centralized scheduling for 500+ locations',
      'AI demand forecasting integration',
      'Automated shift swaps and coverage',
      'Real-time labor cost optimization'
    ],
    impact: { metric: '35%', label: 'Increase in scheduling efficiency' }
  },
  {
    id: 'healthcare',
    industry: 'Healthcare',
    title: 'Compliance-Ready Staffing',
    description: 'Ensure proper staffing levels with built-in compliance for healthcare labor regulations.',
    challenge: 'Meeting strict licensing requirements while managing complex shift patterns and staff expertise',
    solution: [
      'Automated compliance checking',
      'Certification tracking',
      'Skills-based scheduling',
      'Emergency response protocols'
    ],
    impact: { metric: '99%', label: 'Patient satisfaction improvement' }
  },
  {
    id: 'hospitality',
    industry: 'Hospitality & Food Service',
    title: 'Event & Peak Season Management',
    description: 'Handle massive staffing fluctuations during peak seasons and special events seamlessly.',
    challenge: 'Managing seasonal hiring surges and maintaining service quality during high-demand periods',
    solution: [
      'Rapid staff onboarding',
      'Flexible scheduling templates',
      'Performance tracking',
      'Automated payroll for high-volume periods'
    ],
    impact: { metric: '45%', label: 'Reduction in overtime costs' }
  },
  {
    id: 'logistics',
    industry: 'Logistics & Supply Chain',
    title: 'Route-Based Team Management',
    description: 'Optimize field operations with location-aware scheduling and real-time route management.',
    challenge: 'Coordinating drivers and field teams across dynamic routes and unexpected changes',
    solution: [
      'GPS-enabled scheduling',
      'Route optimization',
      'Mobile clock in/out',
      'Real-time communication'
    ],
    impact: { metric: '28%', label: 'Improvement in delivery times' }
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing & Operations',
    title: 'Production Line Efficiency',
    description: 'Align workforce with production schedules for maximum efficiency and minimal downtime.',
    challenge: 'Synchronizing worker schedules with equipment maintenance and production quotas',
    solution: [
      'Production-aligned scheduling',
      'Maintenance window coordination',
      'Overtime management',
      'Capacity planning tools'
    ],
    impact: { metric: '40%', label: 'Reduction in production delays' }
  },
  {
    id: 'foodservice',
    industry: 'Food Service & QSR',
    title: 'Labor Cost Optimization',
    description: 'Reduce labor costs while maintaining service quality through intelligent scheduling.',
    challenge: 'Balancing staffing needs with labor budget constraints across multiple shifts',
    solution: [
      'Labor cost forecasting',
      'Shift swapping automation',
      'Inventory-linked scheduling',
      'Performance analytics'
    ],
    impact: { metric: '22%', label: 'Average labor cost reduction' }
  }
];

export default function UseCasesPage() {
  return (
    <div className="usecases-page">
      {/* Hero */}
      <section className="usecases-hero">
        <div className="container">
          <h1 className="hero-title">Industry-Specific Solutions</h1>
          <p className="hero-subtitle">
            See how WorkSphere transforms operations across diverse industries, from retail to healthcare.
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="section usecases-section">
        <div className="container">
          <div className="usecases-grid">
            {USE_CASES.map((useCase) => (
              <article key={useCase.id} className="usecase-card">
                <div className="usecase-header">
                  <span className="usecase-tag">{useCase.industry}</span>
                </div>
                <div className="usecase-content">
                  <h3 className="usecase-title">{useCase.title}</h3>
                  <p className="usecase-desc">{useCase.description}</p>
                  
                  <div className="usecase-challenge">
                    <strong>Challenge:</strong>
                    <p>{useCase.challenge}</p>
                  </div>

                  <div className="usecase-solution">
                    <strong>Our Solution:</strong>
                    <ul>
                      {useCase.solution.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="usecase-impact">
                    <span className="impact-metric">{useCase.impact.metric}</span>
                    <span className="impact-label">{useCase.impact.label}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section usecases-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">500+</div>
              <div className="stat-description">Organizations transformed</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">25</div>
              <div className="stat-description">Industries served</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">2M+</div>
              <div className="stat-description">Employees managed</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">$1B+</div>
              <div className="stat-description">In labor costs optimized</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section usecases-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Transform Your Operations?</h2>
            <p>See how WorkSphere can improve efficiency and reduce costs for your organization.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg">Schedule a Demo</button>
              <button className="btn btn-outline">Download Case Study</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
