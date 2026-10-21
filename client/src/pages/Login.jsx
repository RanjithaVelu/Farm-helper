import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import authService from '../services/authService';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler connected to backend
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    // Mode: Registration
    if (isRegistering) {
      if (!name.trim() || !email.trim() || !password) {
        setStatusMessage({
          type: 'error',
          text: 'Please fill in all required fields (Name, Email, and Password).',
        });
        return;
      }

      if (password.length < 8) {
        setStatusMessage({
          type: 'error',
          text: 'Password must be at least 8 characters long.',
        });
        return;
      }

      setIsLoading(true);
      try {
        const data = await authService.register(name, email, password);
        setStatusMessage({
          type: 'success',
          text: data.message || 'Account created successfully! Redirecting...',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 600);
      } catch (err) {
        setStatusMessage({
          type: 'error',
          text: err.message || 'Registration failed. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Mode: Login
    if (!email.trim() || !password) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter both email and password.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setStatusMessage({
        type: 'success',
        text: data.message || 'Logged in successfully! Redirecting...',
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Invalid email or password.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo credentials fill helper (great for testing & college demos)
  const handleFillDemo = () => {
    setEmail('farmer@farmhelper.com');
    setPassword('farmhelper123');
    setStatusMessage({
      type: 'info',
      text: 'Demo credentials loaded. Click "Log In" to submit to the backend!',
    });
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        
        {/* LEFT SECTION: Introductory Agriculture Branding */}
        <div className="login-intro-panel">
          <div className="intro-content">
            {/* Brand Logo & Title */}
            <div className="brand-header">
              <div className="brand-logo-circle">
                {/* Sprout / Leaf SVG Icon */}
                <svg
                  className="brand-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 20h10" />
                  <path d="M10 20c0-4.5 2-8 7-9" />
                  <path d="M17 11c0-4.5-3.5-7-7-7-3 0-5 2-5 5 0 4 3 6.5 5 11" />
                </svg>
              </div>
              <div>
                <h1 className="brand-title">FarmHelper</h1>
                <span className="brand-tagline">Smart Farming Assistant</span>
              </div>
            </div>

            {/* Introductory Heading & Message */}
            <div className="intro-body">
              <span className="pill-badge">🌾 Agriculture Intelligence</span>
              <h2>Grow Smarter. Harvest Better.</h2>
              <p>
                Get data-backed recommendations for weather, crop selection,
                precision irrigation, fertilizers, and real-time mandi market prices.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🌦️</span>
                <div>
                  <strong>Weather & Alerts</strong>
                  <p>Accurate rainfall & climate forecasting</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌱</span>
                <div>
                  <strong>Crop & Irrigation Advice</strong>
                  <p>Customized guidance tailored to soil type</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <div>
                  <strong>Live Market Prices</strong>
                  <p>Up-to-date regional APMC commodity rates</p>
                </div>
              </div>
            </div>

            {/* Bottom farmer trust note */}
            <div className="intro-footer">
              <div className="trust-avatars">
                <span className="avatar">👨‍🌾</span>
                <span className="avatar">👩‍🌾</span>
                <span className="avatar">🚜</span>
              </div>
              <span className="trust-text">Designed specifically for Indian & global farmers</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Login Form */}
        <div className="login-form-panel">
          <div className="form-content">
            
            {/* Mobile/Tablet mini brand */}
            <div className="mobile-brand-header">
              <div className="mobile-logo-circle">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                >
                  <path d="M7 20h10" />
                  <path d="M10 20c0-4.5 2-8 7-9" />
                  <path d="M17 11c0-4.5-3.5-7-7-7-3 0-5 2-5 5 0 4 3 6.5 5 11" />
                </svg>
              </div>
              <span>FarmHelper</span>
            </div>

            {/* Form Title & Subtitle */}
            <div className="form-header">
              <h2 className="welcome-heading">
                {isRegistering ? 'Create Account' : 'Welcome Back!'}
              </h2>
              <p className="welcome-subtext">
                {isRegistering
                  ? 'Join FarmHelper to access smart agricultural recommendations.'
                  : 'Please enter your details to sign in to your farm dashboard.'}
              </p>
            </div>

            {/* Alert / Feedback message */}
            {statusMessage.text && (
              <div className={`status-banner status-${statusMessage.type}`}>
                {statusMessage.type === 'error' && '⚠️ '}
                {statusMessage.type === 'success' && '✅ '}
                {statusMessage.type === 'info' && '💡 '}
                {statusMessage.text}
              </div>
            )}

            {/* Main Auth Form */}
            <form onSubmit={handleAuthSubmit} className="login-form">
              {/* Full Name Input (Registration Only) */}
              {isRegistering && (
                <InputField
                  label="Full Name"
                  id="register-name"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
              )}

              {/* Email Input */}
              <InputField
                label="Email Address"
                id="login-email"
                type="email"
                placeholder="farmer@farmhelper.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />

              {/* Password Input */}
              <InputField
                label="Password"
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={isRegistering ? 'At least 8 characters' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
                rightAction={
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      /* Eye Off SVG */
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      /* Eye SVG */
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                }
              />

              {/* Remember Me & Forgot Password (Login mode only) */}
              {!isRegistering && (
                <div className="form-options">
                  <label className="remember-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="remember-checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#forgot"
                    className="forgot-password-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setStatusMessage({
                        type: 'info',
                        text: 'Password reset feature will be connected to your verified email.',
                      });
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-text">
                    {isRegistering ? 'Creating Account...' : 'Logging in...'}
                  </span>
                ) : (
                  <>
                    <span>{isRegistering ? 'Create Account' : 'Log In'}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Quick Demo Credentials Button (Login mode only) */}
              {!isRegistering && (
                <button
                  type="button"
                  className="demo-account-btn"
                  onClick={handleFillDemo}
                >
                  ⚡ Fill Demo Account
                </button>
              )}
            </form>

            {/* Toggle between Sign Up and Sign In */}
            <div className="signup-footer">
              {isRegistering ? (
                <p>
                  Already have an account?{' '}
                  <a
                    href="#login"
                    className="signup-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistering(false);
                      setStatusMessage({ type: '', text: '' });
                    }}
                  >
                    Sign in
                  </a>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <a
                    href="#signup"
                    className="signup-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistering(true);
                      setStatusMessage({ type: '', text: '' });
                    }}
                  >
                    Sign up
                  </a>
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
