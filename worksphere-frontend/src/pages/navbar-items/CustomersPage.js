import './CustomersPage.css';
import Icon from '../../components/DashboardIcons';

const shipleyImg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80';
const palaceImg = 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=600&fit=crop&q=80';
const amenityImg = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80';
const dominosImg = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80';

const avatar1 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80';
const avatar2 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80';
const avatar3 = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80';
const avatar4 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80';

const CASE_STUDIES = [
  {
    id: 'shipley',
    company: 'Shipley Do-Nuts',
    industry: 'Food Service & QSR',
    description: 'Full-service donut shop operator managing multiple locations with complex scheduling needs.',
    challenge: 'Managing schedules across 15 locations with high employee turnover and unpredictable demand patterns.',
    solution: 'Implemented WorkSphere scheduling with AI forecasting and automated shift distribution.',
    results: [
      { metric: '95%', label: 'Less time on scheduling & payroll' },
      { metric: '3.2x', label: 'Faster payroll processing' },
      { metric: '-18%', label: 'Labor costs reduction' },
      { metric: '4.8/5', label: 'Employee satisfaction' }
    ],
    image: shipleyImg,
    testimonial: {
      quote: "WorkSphere transformed how we manage our team. What used to take 40 hours a week now takes just 4. That's time we reinvest back into our business.",
      author: 'Robert Chen',
      role: 'Operations Manager',
      avatar: avatar1
    }
  },
  {
    id: 'palace',
    company: 'Palace Entertainment',
    industry: 'Hospitality & Entertainment',
    description: 'Large entertainment venues requiring dynamic workforce management across multiple properties.',
    challenge: 'Coordinating 1,200+ seasonal employees with varying skill levels and availability during peak and off-seasons.',
    solution: 'Deployed WorkSphere with custom workflows for seasonal hiring and skills-based scheduling.',
    results: [
      { metric: '72h', label: 'Onboarding time' },
      { metric: '99%', label: 'Compliance score' },
      { metric: '+28%', label: 'Seasonal efficiency' },
      { metric: '92%', label: 'Employee retention' }
    ],
    image: palaceImg,
    testimonial: {
      quote: "The mobile-first design means managers can handle scheduling from anywhere. Our seasonal hiring process that took 2 weeks now takes 3 days.",
      author: 'Maria Santos',
      role: 'HR Director',
      avatar: avatar2
    }
  },
  {
    id: 'amenity',
    company: 'Amenity Staffing',
    industry: 'Staffing & Professional Services',
    description: 'Professional staffing company placing contractor workers across multiple client accounts.',
    challenge: 'Managing contractor assignments, certifications, and compliance across 30+ client accounts simultaneously.',
    solution: 'Integrated WorkSphere with ATS and compliance management for unified contractor management.',
    results: [
      { metric: '45%', label: 'Faster placement' },
      { metric: '99.8%', label: 'Compliance rate' },
      { metric: '0', label: 'Compliance violations' },
      { metric: '156%', label: 'ROI in Year 1' }
    ],
    image: amenityImg,
    testimonial: {
      quote: "WorkSphere's compliance tracking has eliminated our audit risk. We had zero violations this year for the first time in our company's history.",
      author: 'David Martinez',
      role: 'CEO',
      avatar: avatar3
    }
  },
  {
    id: 'dominos',
    company: 'Domino\'s Franchise Group',
    industry: 'Food Delivery & Quick Service',
    description: 'Multi-unit franchise operator managing delivery and in-store operations with high-volume turnover.',
    challenge: 'Recovering from high employee turnover (150% annually) while maintaining delivery time SLAs.',
    solution: 'Implemented comprehensive HRIS and scheduling solution with employee engagement tools.',
    results: [
      { metric: '67%', label: 'Turnover reduction' },
      { metric: '34min', label: 'Average delivery time' },
      { metric: '4.7★', label: 'Customer satisfaction' },
      { metric: '$2.3M', label: 'Annual savings' }
    ],
    image: dominosImg,
    testimonial: {
      quote: "WorkSphere isn't just a scheduling tool—it's transformed how we treat our employees. Lower turnover means better service for customers.",
      author: 'Jennifer Wong',
      role: 'Franchise Owner',
      avatar: avatar4
    }
  }
];

const STATS = [
  { label: 'Customers Transformed', value: '500+' },
  { label: 'Employees Managed', value: '2M+' },
  { label: 'Industries Served', value: '25+' },
  { label: 'Years of Success', value: '12' }
];

export default function CustomersPage() {
  return (
    <div className="customers-page">
      {/* Hero */}
      <section className="customers-hero">
        <div className="container">
          <h1 className="hero-title">Trusted by Leading Organizations</h1>
          <p className="hero-subtitle">
            See how WorkSphere helps industry leaders optimize operations, reduce costs, and improve employee satisfaction.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section customers-stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section case-studies-section">
        <div className="container">
          <h2 className="section-title">Customer Success Stories</h2>
          <div className="case-studies-grid">
            {CASE_STUDIES.map((caseStudy) => (
              <article key={caseStudy.id} className="case-study-card">
                <div className="case-image">
                  <img src={caseStudy.image} alt={caseStudy.company} />
                  <div className="case-overlay">
                    <span className="industry-tag">{caseStudy.industry}</span>
                  </div>
                </div>
                <div className="case-content">
                  <h3 className="case-company">{caseStudy.company}</h3>
                  <p className="case-description">{caseStudy.description}</p>

                  <div className="case-section">
                    <h4>Challenge</h4>
                    <p>{caseStudy.challenge}</p>
                  </div>

                  <div className="case-section">
                    <h4>Solution</h4>
                    <p>{caseStudy.solution}</p>
                  </div>

                  <div className="case-results">
                    <h4>Results</h4>
                    <div className="results-grid">
                      {caseStudy.results.map((result, idx) => (
                        <div key={idx} className="result-item">
                          <div className="result-metric">{result.metric}</div>
                          <div className="result-label">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-testimonial">
                    <div className="testimonial-quote">"{caseStudy.testimonial.quote}"</div>
                    <div className="testimonial-author">
                      <img src={caseStudy.testimonial.avatar} alt={caseStudy.testimonial.author} />
                      <div>
                        <div className="author-name">{caseStudy.testimonial.author}</div>
                        <div className="author-role">{caseStudy.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="section industry-section">
        <div className="container">
          <h2 className="section-title">Industries We Serve</h2>
          <div className="industry-grid">
            {[
              { icon: 'store', industry: 'Retail', count: '150+' },
              { icon: 'hospital', industry: 'Healthcare', count: '80+' },
              { icon: 'pizza', industry: 'Food & Hospitality', count: '120+' },
              { icon: 'box', industry: 'Logistics', count: '45+' },
              { icon: 'factory', industry: 'Manufacturing', count: '35+' },
              { icon: 'theater', industry: 'Entertainment', count: '25+' },
            ].map((item, idx) => (
              <div key={idx} className="industry-card">
                <div className="industry-icon">
                  <Icon name={item.icon} />
                </div>
                <div className="industry-name">{item.industry}</div>
                <div className="industry-count">{item.count} customers</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {[
              { quote: 'WorkSphere has been a game-changer for our organization. We save money, time, and most importantly, our employees are happier.', author: 'CEO, Regional Retail Chain' },
              { quote: 'The compliance features alone have paid for itself multiple times over. We sleep better at night knowing we\'re always compliant.', author: 'HR Manager, Healthcare Network' },
              { quote: 'Best investment we\'ve made in years. From implementation to ongoing support, the WorkSphere team has been exceptional.', author: 'Operations Director, Logistics Firm' },
              { quote: 'Our employees love the mobile app. The shift-swapping feature has reduced our communication bottleneck significantly.', author: 'Store Manager, Quick Service Restaurant' }
            ].map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">{testimonial.quote}</p>
                <p className="testimonial-att">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section customers-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Join Hundreds of Successful Organizations</h2>
            <p>Let WorkSphere transform your workforce management</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">Start Free Trial</button>
              <button className="btn btn-outline">Request Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
