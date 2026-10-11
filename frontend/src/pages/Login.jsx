import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateAuthForm } from '../utils/validation';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { isValid, errors } = validateAuthForm({
      email,
      password,
      isRegister: false,
    });

    if (!isValid) {
      setFieldErrors(errors);
      setErrorMessage('Please provide valid login credentials.');
      return;
    }

    setFieldErrors({});

    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-sidebar">
        <span className="auth-sidebar-badge">SECURE ACCESS</span>
        <h1 className="auth-sidebar-title">Welcome Back to xSTUDENT</h1>
        <p className="auth-sidebar-desc">
          Sign in to access your administrative dashboard, manage student courses, check
          attendance, and view recent announcements.
        </p>
      </aside>

      <main className="auth-content">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2>Sign In</h2>
            <p className="auth-form-subtitle">Enter your college registered credentials</p>
          </div>

          {errorMessage && (
            <div className="auth-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                className={`auth-input ${fieldErrors.email ? 'input-invalid' : ''}`}
                placeholder="name@college.edu"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                required
              />
              {fieldErrors.email && (
                <span id="login-email-error" className="field-error" role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-input ${fieldErrors.password ? 'input-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {fieldErrors.password && (
                <span id="login-password-error" className="field-error" role="alert">
                  {fieldErrors.password}
                </span>
              )}
            </div>

            <button type="submit" className="auth-btn-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="auth-switch-text">
              Don&apos;t have an account? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
