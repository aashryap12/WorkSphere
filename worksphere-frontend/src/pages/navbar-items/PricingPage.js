import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './PricingPage.css';

const PRICING_TIERS = [
  {
    name: 'Scheduling',
    price: '300 Rs.',
    period: 'per employee/month',
    description: 'Shift planning and coverage for lean teams',
    features: [
      'Drag & drop scheduling',
      'Open shift bidding',
      'Availability tracking',
      'Labor forecast basics',
      'Mobile shift updates',
      'Email support',
    ],
    cta: 'Purchase',
    highlighted: false,
  },
  {
    name: 'HR Management',
    price: '400 Rs.',
    period: 'per employee/month',
    description: 'HRIS, onboarding, and employee records',
    features: [
      'Employee database',
      'Onboarding checklists',
      'Documents & policies',
      'Performance notes',
      'Time off management',
      'Priority support',
    ],
    cta: 'Purchase',
    highlighted: false,
  },
  {
    name: 'Payroll',
    price: '500 Rs.',
    period: 'per employee/month',
    description: 'Payroll runs with compliance and automation',
    features: [
      'Automated wage calculations',
      'Overtime & differential pay',
      'Tax-ready exports',
      'Pay cycle automation',
      'Direct deposit files',
      'Priority support',
    ],
    cta: 'Purchase',
    highlighted: false,
  },
  {
    name: 'All-In-One',
    price: '800 Rs.',
    period: 'per employee/month',
    description: 'Scheduling, HR, and Payroll in one suite',
    features: [
      'Everything in Scheduling',
      'Everything in HR Management',
      'Everything in Payroll',
      'Advanced analytics',
      'Custom workflows',
      'Dedicated success manager',
    ],
    cta: 'Purchase',
    highlighted: true,
    badge: 'Best Value',
  },
];

const FEATURE_COMPARISON = [
  {
    category: 'Scheduling',
    features: [
      { name: 'Drag & Drop Scheduling', scheduling: true, hr: false, payroll: false, allInOne: true },
      { name: 'Auto-Scheduling', scheduling: true, hr: false, payroll: false, allInOne: true },
      { name: 'Shift Swapping', scheduling: true, hr: false, payroll: false, allInOne: true },
      { name: 'Labor Forecasting', scheduling: true, hr: false, payroll: false, allInOne: true },
      { name: 'Multi-location Scheduling', scheduling: false, hr: false, payroll: false, allInOne: true },
    ],
  },
  {
    category: 'HR Management',
    features: [
      { name: 'Employee Database', scheduling: false, hr: true, payroll: false, allInOne: true },
      { name: 'Onboarding', scheduling: false, hr: true, payroll: false, allInOne: true },
      { name: 'Performance Management', scheduling: false, hr: true, payroll: false, allInOne: true },
      { name: 'Time Off Management', scheduling: false, hr: true, payroll: false, allInOne: true },
      { name: 'Benefits Administration', scheduling: false, hr: false, payroll: false, allInOne: true },
    ],
  },
  {
    category: 'Payroll',
    features: [
      { name: 'Payroll Processing', scheduling: false, hr: false, payroll: true, allInOne: true },
      { name: 'Overtime & Differentials', scheduling: false, hr: false, payroll: true, allInOne: true },
      { name: 'Tax-ready Exports', scheduling: false, hr: false, payroll: true, allInOne: true },
      { name: 'Direct Deposit Files', scheduling: false, hr: false, payroll: true, allInOne: true },
      { name: 'Payroll Compliance Rules', scheduling: false, hr: false, payroll: true, allInOne: true },
    ],
  },
  {
    category: 'Platform & Analytics',
    features: [
      { name: 'Basic Reports', scheduling: true, hr: true, payroll: true, allInOne: true },
      { name: 'Custom Reports', scheduling: false, hr: true, payroll: true, allInOne: true },
      { name: 'Advanced Analytics', scheduling: false, hr: false, payroll: false, allInOne: true },
      { name: 'Real-time Dashboards', scheduling: true, hr: true, payroll: true, allInOne: true },
      { name: 'Export Capabilities', scheduling: true, hr: true, payroll: true, allInOne: true },
    ],
  },
];

const FAQS = [
  {
    question: 'How does pricing work?',
    answer: 'Our pricing is simple and transparent. You pay per active employee per month. There are no hidden fees, setup costs, or long-term contracts required.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features in your chosen plan. No credit card required to start.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Scheduling includes email support, HR Management and Payroll include priority support, and All-In-One includes a dedicated success manager.',
  },
  {
    question: 'Do you offer custom pricing for large teams?',
    answer: 'Yes, we offer custom pricing for organizations with 500+ employees. Contact our sales team for a tailored quote.',
  },
  {
    question: 'Are there any setup fees?',
    answer: 'No. There are no setup fees, implementation costs, or hidden charges. You only pay the monthly per-employee rate.',
  },
];

function PricingPage() {
  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <h1 className="pricing-hero-title">Simple, Transparent Pricing</h1>
          <p className="pricing-hero-subtitle">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-cards">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`pricing-card ${tier.highlighted ? 'pricing-card-highlighted' : ''}`}
              >
                {tier.badge && <span className="pricing-badge">{tier.badge}</span>}
                <h3 className="pricing-card-name">{tier.name}</h3>
                <div className="pricing-card-price">
                  <span className="price">{tier.price}</span>
                  <span className="period">{tier.period}</span>
                </div>
                <p className="pricing-card-description">{tier.description}</p>
                <Link
                  to={tier.cta === 'Contact Sales' ? '/contact' : '/register'}
                  className={`pricing-cta ${tier.highlighted ? 'pricing-cta-primary' : 'pricing-cta-secondary'}`}
                >
                  {tier.cta}
                </Link>
                <ul className="pricing-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="feature-comparison-section">
        <div className="container">
          <h2 className="section-title">Compare Plans</h2>
          <p className="section-subtitle">See what's included in each plan</p>
          
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Features</th>
                  <th>Scheduling</th>
                  <th>HR Management</th>
                  <th>Payroll</th>
                  <th className="highlighted-col">All-In-One</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((category) => (
                  <Fragment key={category.category}>
                    <tr className="category-row">
                      <td colSpan="5" className="category-header">{category.category}</td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature.name}>
                        <td className="feature-name">{feature.name}</td>
                        <td className="feature-cell">
                          {feature.scheduling ? <span className="check">✓</span> : <span className="dash">—</span>}
                        </td>
                        <td className="feature-cell">
                          {feature.hr ? <span className="check">✓</span> : <span className="dash">—</span>}
                        </td>
                        <td className="feature-cell">
                          {feature.payroll ? <span className="check">✓</span> : <span className="dash">—</span>}
                        </td>
                        <td className="feature-cell highlighted-col">
                          {feature.allInOne ? <span className="check">✓</span> : <span className="dash">—</span>}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {FAQS.map((faq) => (
              <div key={faq.question} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-subtitle">Start your 14-day free trial today. No credit card required.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Purchase Now</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Talk to Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
