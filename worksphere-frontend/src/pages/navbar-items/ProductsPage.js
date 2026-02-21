import { useState } from 'react';
import Icon from '../../components/DashboardIcons';
import './ProductsPage.css';

const productScheduling = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80';
const productPayroll = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80';
const productHRIS = 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80';
const productAnalytics = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80';
const productCommunications = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80';
const productCompliance = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80';

const PRODUCTS = [
  {
    id: 'scheduling',
    name: 'Intelligent Scheduling',
    description: 'AI-powered scheduling that optimizes coverage, minimizes costs, and respects employee preferences.',
    features: [
      'Smart shift prediction',
      'Automated gap filling',
      'Multi-location management',
      'Shift swapping & bidding'
    ],
    image: productScheduling,
    color: '#3b82f6'
  },
  {
    id: 'payroll',
    name: 'Automated Payroll',
    description: 'Simplify complex payroll with automated calculations, compliance, and direct deposits.',
    features: [
      'Multi-state compliance',
      'Overtime management',
      'Tax calculation',
      'Direct deposit integration'
    ],
    image: productPayroll,
    color: '#10b981'
  },
  {
    id: 'hris',
    name: 'Complete HRIS',
    description: 'Centralized employee data, documents, and performance tracking in one secure platform.',
    features: [
      'Hire to retire workflows',
      'Employee self-service',
      'Document management',
      'Performance tracking'
    ],
    image: productHRIS,
    color: '#f59e0b'
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Real-time dashboards and insights to drive better workforce decisions.',
    features: [
      'Predictive analytics',
      'Labor forecasting',
      'ROI tracking',
      'Custom reports'
    ],
    image: productAnalytics,
    color: '#8b5cf6'
  },
  {
    id: 'communications',
    name: 'Team Communications',
    description: 'Keep your team connected with integrated messaging and announcements.',
    features: [
      'In-app messaging',
      'Push notifications',
      'Team broadcasts',
      'Mobile-first design'
    ],
    image: productCommunications,
    color: '#ec4899'
  },
  {
    id: 'compliance',
    name: 'Compliance & Security',
    description: 'Enterprise-grade security and compliance with industry standards.',
    features: [
      'SSO & API access',
      'Audit trails',
      'Data encryption',
      'GDPR compliant'
    ],
    image: productCompliance,
    color: '#06b6d4'
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1 className="hero-title">Powerful Workforce Solutions</h1>
          <p className="hero-subtitle">
            Comprehensive modules designed to transform how you manage your workforce. From scheduling to compliance, we've got you covered.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section products-grid-section">
        <div className="container">
          <div className="products-grid">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-card-header" style={{ borderTopColor: product.color }}>
                  <img src={product.image} alt={product.name} className="product-card-image" />
                  <div className="product-card-overlay" style={{ backgroundColor: `${product.color}20` }}>
                    <span className="product-tag">Featured</span>
                  </div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="section product-details">
        <div className="container">
          <div className="details-wrapper">
            <div className="details-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="details-badge" style={{ backgroundColor: selectedProduct.color }}>
                {selectedProduct.name}
              </div>
            </div>
            <div className="details-content">
              <h2>{selectedProduct.name}</h2>
              <p className="details-desc">{selectedProduct.description}</p>
              
              <div className="features-list">
                <h4>Key Features</h4>
                <ul>
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-icon" style={{ backgroundColor: selectedProduct.color }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="details-cta">
                <button className="btn btn-primary" style={{ backgroundColor: selectedProduct.color }}>
                  Learn More
                </button>
                <button className="btn btn-outline">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose WorkSphere?</h2>
          <div className="benefits-grid">
            {[
              { icon: 'lightning', title: 'Lightning Fast', desc: 'Real-time updates across all modules' },
              { icon: 'lock', title: 'Enterprise Security', desc: 'Bank-level encryption and compliance' },
              { icon: 'mobile', title: 'Mobile First', desc: 'Full functionality on any device' },
              { icon: 'handshake', title: '24/7 Support', desc: 'Dedicated support team always available' },
              { icon: 'link', title: 'API Ready', desc: 'Integrate with your existing tools' },
              { icon: 'chart', title: 'Advanced Analytics', desc: 'Data-driven insights for better decisions' }
            ].map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">
                  <Icon name={benefit.icon} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
