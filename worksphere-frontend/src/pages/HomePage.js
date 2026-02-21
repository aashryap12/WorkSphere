import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Using realistic professional images
const heroDashboard = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80';
const previewScheduling = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80';
const previewHr = 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80';
const previewPayroll = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80';
const caseShipley = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80';
const casePalace = 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=400&fit=crop&q=80';
const caseAmenity = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80';
const caseDominos = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80';
const avatar1 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80';
const avatar2 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80';
const avatar3 = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80';
const avatar4 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80';
const avatar5 = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80';

const HERO_PILLS = [
  'Time & Attendance',
  'Forecasting',
  'Payroll',
  'Dashboards',
  'Scheduling',
  'HRIS',
  'Leave Management',
  'Hiring',
  'Communications',
];

const FEATURES = [
  {
    title: '1-click payroll compliance',
    description: 'Automatically calculate complex pay rates, including differentials and overtime, before processing payroll — based on team structures, clocked hours, and local regulations.',
  },
  {
    title: 'All-in-one HRIS',
    description: 'Eliminate double entry for good. Sync hiring, onboarding, and payroll with a single login. Employees can update details, request time off, and access W-2s — all in one place.',
  },
  {
    title: 'Forecasting & Shift Swapping',
    description: 'Stop being short-staffed. Forecast labor needs and quickly fill gaps with reactive scheduling, using shift swapping and bidding to manage call-outs.',
  },
];

const PREVIEWS = [
  {
    id: 'scheduling',
    label: 'Scheduling',
    title: 'Build smarter schedules in minutes',
    description: 'Auto-balance coverage, build templates, and publish shifts with a single click.',
    image: previewScheduling,
    metrics: [
      { label: 'Hours saved weekly', value: '12+' },
      { label: 'Schedule accuracy', value: '98%' },
      { label: 'Open shifts filled', value: '4x' },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    title: 'Unify onboarding and HR records',
    description: 'Keep employee data, documents, and performance in one secure place.',
    image: previewHr,
    metrics: [
      { label: 'Onboarding time', value: '-60%' },
      { label: 'Paperwork completion', value: '99%' },
      { label: 'HR tasks automated', value: '30+' },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    title: 'Run payroll without the manual work',
    description: 'Calculate wages, tips, and overtime with compliant, automated pay runs.',
    image: previewPayroll,
    metrics: [
      { label: 'Payroll run time', value: '-70%' },
      { label: 'Errors reduced', value: '85%' },
      { label: 'Pay cycles automated', value: '100%' },
    ],
  },
];

const STATS = [
  { value: '450%', label: 'ROI total overall economic impact' },
  { value: '80%', label: 'Gain in scheduling efficiency' },
  { value: '11%', label: 'Decrease in customer labor costs' },
  { value: '5.2%', label: 'Increase in revenue per labor hour' },
];

const CASE_STUDIES = [
  {
    company: 'Shipley Do-Nuts',
    stat: '95% Less Time',
    description: 'creating schedules and running payroll',
    tags: 'Scheduling · Payroll · Human Resources',
    image: caseShipley,
  },
  {
    company: 'Palace Playland',
    stat: '$1,000+ saved',
    description: 'a week in time theft costs · 50% reduction in timesheet auditing',
    tags: 'Time and Attendance · Labor Compliance',
    image: casePalace,
  },
  {
    company: 'The Amenity Collective',
    stat: '85% reduction',
    description: 'in administrative work · 50% drop in overtime',
    tags: 'Scheduling · Time and Attendance · Shift Replacement',
    image: caseAmenity,
  },
  {
    company: "Domino's Pizza",
    stat: '11% decrease',
    description: 'in labor costs · 12% increase in sales per labor hour',
    tags: 'Scheduling · Time and Attendance · Labor Forecasting',
    image: caseDominos,
  },
];

const TESTIMONIALS = [
  {
    role: 'Operations',
    quote: "WorkSphere's alert system and native dashboards help us identify real-time challenges – managers understand exactly where their workforce is at all times.",
    name: 'Dan Cohen',
    company: 'Amenity Collective',
    avatar: avatar1,
  },
  {
    role: 'Human Resources',
    quote: "When it comes to human resources, WorkSphere has really streamlined and made things easier for our employees, managers, and administrators across all levels.",
    name: 'Nicole Grube',
    company: 'LIVunLtd',
    avatar: avatar2,
  },
  {
    role: 'Finance',
    quote: "WorkSphere gives us the ability to really dive deep into individual labor costs and cashflow projections – we're able to dissect different locations and teams.",
    name: 'Christine Kavic',
    company: 'Lake Elsinore',
    avatar: avatar3,
  },
  {
    role: 'Payroll',
    quote: "Being able to pull accurate timesheets and reports allows us to quickly process payroll – the speed at which we're able to do things now is so much better.",
    name: 'Elizabeth Watts',
    company: 'COVIDCheck',
    avatar: avatar4,
  },
  {
    role: 'C-Suite',
    quote: "WorkSphere gives me a direct connection to the field – this transparency helps our retention and employee experience, ultimately creating more loyalty.",
    name: 'Jeff Shipman',
    company: 'Heartline Fitness',
    avatar: avatar5,
  },
];

// Button Component
function Button({ href, to, variant = 'primary', size, children, className = '' }) {
  const baseClass = 'btn';
  const variantClass =
    variant === 'primary' ? 'btn-primary' :
    variant === 'outlineLight' ? 'btn-outline btn-outline-light' : 'btn-outline';
  const sizeClass = size === 'lg' ? 'btn-lg' : '';
  const classes = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}

// Feature Card Component
function FeatureCard({ title, description }) {
  return (
    <article className="feature-card">
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{description}</p>
    </article>
  );
}

// Case Study Card Component
function CaseStudyCard({ company, stat, description, tags, image, imageAlt }) {
  return (
    <article className="case-card">
      {image && <img className="case-image" src={image} alt={imageAlt || `${company} workspace`} />}
      <span className="case-company">{company}</span>
      <p className="case-stat">{stat}</p>
      <p className="case-desc">{description}</p>
      <div className="case-tags">{tags}</div>
    </article>
  );
}

// Testimonial Card Component
function TestimonialCard({ role, quote, name, company, avatar }) {
  return (
    <div className="testimonial-card">
      <img className="testimonial-avatar" src={avatar} alt={`${name} avatar`} />
      <span className="testimonial-role">{role}</span>
      <blockquote className="testimonial-quote">&quot;{quote}&quot;</blockquote>
      <p className="testimonial-author">{name}, {company}</p>
    </div>
  );
}

// Hero Pill Slider Component
function HeroPillSlider() {
  // Duplicate pills for seamless circular scrolling
  const duplicatedPills = [...HERO_PILLS, ...HERO_PILLS];
  
  return (
    <div className="hp-slider-wrapper">
      <div className="hp-slider">
        {duplicatedPills.map((hp, index) => (
          <div key={index} className="hp-item">
            {hp}
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const [activePreviewId, setActivePreviewId] = useState(PREVIEWS[0].id);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const activePreview = PREVIEWS.find((preview) => preview.id === activePreviewId) || PREVIEWS[0];
  const activeTestimonial = TESTIMONIALS[activeTestimonialIndex];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">
              HR, Scheduling, and Payroll
              <br />
              <span className="hero-title-accent">for your hourly workforce</span>
            </h1>
            <p className="hero-subtitle">
              Build staff schedules, onboard new hires, track hours worked, and calculate complex pay rates — all in one place.
            </p>
            <div className="hero-ctas">
              <Button to="/register" variant="primary">Get a demo</Button>
             
            </div>
            <div className="hero-badges">
              <span className="hero-badge">4.8 ★</span>
              <span className="hero-badge-sep">10,000+ workforces</span>
            </div>
            <HeroPillSlider />
          </div>
          
        </div>
      </section>

      {/* All-in-One Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-grid">
            <div className="section-copy">
              <h2 className="section-title">All-in-One Workforce Management</h2>
              <p className="section-lead">
                Forecast demand, auto-guide labor levels, track attendance, simplify human resources and process pay — all in one place.
              </p>
              <p className="section-text">
                Most old school HR & Payroll systems aren't designed to handle the complexities of managing an hourly staff workforce. That's why we built WorkSphere to work best for hourly businesses. Your scheduling syncs with attendance, HRIS, and payroll; one login, no double entry, and complete visibility.
              </p>
              <a href="#learn" className="link-arrow">Read more</a>
            </div>
            <div className="section-media">
              <img src={previewHr} alt="HR workspace preview" className="section-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="section features-grid">
        <div className="container">
          <div className="feature-cards">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="section preview-section">
        <div className="container">
          <div className="preview-header">
            <h2 className="section-title">See WorkSphere in motion</h2>
            <p className="section-lead">Switch between modules to explore how teams work faster.</p>
          </div>
          <div className="preview-tabs">
            {PREVIEWS.map((preview) => (
              <button
                key={preview.id}
                type="button"
                className={`preview-tab ${activePreviewId === preview.id ? 'active' : ''}`}
                onClick={() => setActivePreviewId(preview.id)}
              >
                {preview.label}
              </button>
            ))}
          </div>
          <div className="preview-panel">
            <div className="preview-copy">
              <span className="preview-tag">{activePreview.label}</span>
              <h3 className="preview-title">{activePreview.title}</h3>
              <p className="preview-desc">{activePreview.description}</p>
              <div className="preview-metrics">
                {activePreview.metrics.map((metric) => (
                  <div key={metric.label} className="preview-metric">
                    <span className="preview-metric-value">{metric.value}</span>
                    <span className="preview-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/register" className="preview-cta">Start your free trial</Link>
            </div>
            <div className="preview-media">
              <img src={activePreview.image} alt={`${activePreview.label} preview`} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="stats-source">Forrester Report</p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section section-alt case-studies">
        <div className="container">
          <h2 className="section-title section-title-case">See how it works for teams like yours</h2>
          <div className="case-grid">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.company}
                company={study.company}
                stat={study.stat}
                description={study.description}
                tags={study.tags}
                image={study.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title section-title-testimonials">Human capital management that works for every team</h2>
          <div className="testimonial-carousel">
            <TestimonialCard
              role={activeTestimonial.role}
              quote={activeTestimonial.quote}
              name={activeTestimonial.name}
              company={activeTestimonial.company}
              avatar={activeTestimonial.avatar}
            />
            <div className="testimonial-controls">
              <button type="button" className="testimonial-btn" onClick={handlePrevTestimonial}>
                Prev
              </button>
              <div className="testimonial-dots">
                {TESTIMONIALS.map((t, index) => (
                  <button
                    key={t.role}
                    type="button"
                    className={`testimonial-dot ${index === activeTestimonialIndex ? 'active' : ''}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                    aria-label={`Show testimonial from ${t.role}`}
                  />
                ))}
              </div>
              <button type="button" className="testimonial-btn" onClick={handleNextTestimonial}>
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container cta-inner">
          <h2 className="section-title section-title-light">See how it works</h2>
          <div className="hero-ctas">
            <Button to="/register" variant="primary" size="lg">Get a demo</Button>
            <Button to="/pricing" variant="outlineLight" size="lg">Pricing</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
