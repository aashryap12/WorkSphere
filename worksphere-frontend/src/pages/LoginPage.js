import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ROLES = [
    { id: 'employee', label: 'Employee' },
    { id: 'manager', label: 'Manager' },
    { id: 'hr', label: 'HR Admin' },
    { id: 'admin', label: 'System Admin' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail: email,
          password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid Credentials');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Check if selected role matches the user's actual role
      if (data.role !== selectedRole) {
        throw new Error(`Invalid role. You are a ${data.role}, but tried to login as ${selectedRole}.`);
      }
      
      // Store token and user info from backend response in sessionStorage (tab-isolated)
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('role', data.role);

      // Redirect based on role from backend
      const roleRoutes = {
        employee: '/employee-dashboard',
        manager: '/manager-dashboard',
        hr: '/hr-dashboard',
        admin: '/admin-dashboard',
      };

      navigate(roleRoutes[data.role] || '/employee-dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your WorkSphere account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {/* Role Selection */}
          <div className="role-selection">
            <label>Select Your Role</label>
            <div className="role-options">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`role-option ${selectedRole === role.id ? 'active' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  
                  <span className="role-label">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Remember & Forgot */}
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>

      {/* Side Info */}
      <div className="login-info">
        <h2>Why Choose WorkSphere?</h2>
        <ul className="features-list">
          <li>✓ Streamlined scheduling and staffing</li>
          <li>✓ Comprehensive HR management</li>
          <li>✓ Automated payroll processing</li>
          <li>✓ Real-time attendance tracking</li>
          <li>✓ Role-based access control</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;
