import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Sidebar.css';

function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      name: 'Weather',
      path: '/weather',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128A6 6 0 0 0 3 14c0 3.314 2.686 6 6 6h10a5 5 0 0 0 1.947-9.6" />
        </svg>
      ),
    },
    {
      name: 'Crop Recommendation',
      path: '/crop-recommendation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M7 20h10" />
          <path d="M10 20c0-4.5 2-8 7-9" />
          <path d="M17 11c0-4.5-3.5-7-7-7-3 0-5 2-5 5 0 4 3 6.5 5 11" />
        </svg>
      ),
    },
    {
      name: 'Irrigation',
      path: '/irrigation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 18a6 6 0 0 0 4.24-10.24" />
        </svg>
      ),
    },
    {
      name: 'Fertilizer',
      path: '/fertilizer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="m11 4 3 3-7 7-3-3Z" />
          <path d="m18 11 3 3-7 7-3-3Z" />
          <path d="m8 15 1 1" />
          <path d="m15 8 1 1" />
        </svg>
      ),
    },
    {
      name: 'Pest Control',
      path: '/pest-control',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect width="8" height="14" x="8" y="6" rx="4" />
          <path d="m19 7-3 2" />
          <path d="m5 7 3 2" />
          <path d="m19 19-3-2" />
          <path d="m5 19 3-2" />
          <path d="M20 13h-4" />
          <path d="M4 13h4" />
          <path d="m10 4 1 2" />
          <path d="m14 4-1 2" />
        </svg>
      ),
    },
    {
      name: 'Market Prices',
      path: '/market-prices',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
    },
  ];

  const currentUser = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Top Navbar with hamburger */}
      <div className="mobile-header">
        <div className="mobile-header-brand">
          <div className="mobile-brand-icon">🌱</div>
          <span>FarmHelper</span>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Dimmed backdrop on mobile when sidebar is open */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`sidebar-container ${isMobileOpen ? 'open' : ''}`}>
        {/* Brand / Logo */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M7 20h10" />
              <path d="M10 20c0-4.5 2-8 7-9" />
              <path d="M17 11c0-4.5-3.5-7-7-7-3 0-5 2-5 5 0 4 3 6.5 5 11" />
            </svg>
          </div>
          <div className="brand-text">
            <h2 className="brand-title">FarmHelper</h2>
            <span className="brand-badge">Smart Farming</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <span className="nav-section-title">MAIN MENU</span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Farmer Profile & Logout */}
        <div className="sidebar-footer">
          <div className="farmer-profile">
            <div className="farmer-avatar">👨‍🌾</div>
            <div className="farmer-info">
              <span className="farmer-name">{currentUser?.name || 'Farmer'}</span>
              <span className="farmer-role">{currentUser?.email || 'Active Farm #1'}</span>
            </div>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            title="Log out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
