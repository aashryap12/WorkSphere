import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Product: [
    { label: 'Employee Scheduling', href: '/product' },
    { label: 'Time & Attendance', href: '/product' },
    { label: 'Labor Forecasting', href: '/product' },
    { label: 'Payroll', href: '/product' },
    { label: 'Employee Onboarding', href: '/product' },
    { label: 'HRIS', href: '/product' },
  ],
  Industry: [
    { label: 'Restaurants & Hospitality', href: '/use-cases' },
    { label: 'Healthcare', href: '/use-cases' },
    { label: 'Retail', href: '/use-cases' },
    { label: 'Elder Care', href: '/use-cases' },
  ],
  Resources: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Guides', href: '/resources' },
    { label: 'Integrations', href: '/resources' },
    { label: 'Security', href: '/resources' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'News', href: '/resources' },
  ],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="footer-col">
              <h4 className="footer-heading">{heading}</h4>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">© 2026 WorkSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
