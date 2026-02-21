import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Products', path: '/products' },
  { label: 'Use Cases', path: '/use-cases' },
  { label: 'Roles', path: '/roles' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Customers', path: '/customers' },
];

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">WorkSphere</Link>
        <nav className="nav-links">
          {NAV_ITEMS.map(({ label, path }) => (
            <button
              key={path}
              type="button"
              className="nav-link"
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
         
          <Link to="/login" className="nav-cta-primary">Log in</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
