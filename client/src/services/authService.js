/**
 * FarmHelper Authentication Service (Frontend API & Token Helper)
 * 
 * Beginner-friendly helper that handles:
 * - Calling Express auth endpoints (/api/auth/login, /api/auth/register, /api/auth/me)
 * - Safely storing and retrieving JWT tokens in localStorage
 * - Providing authentication state checks for route protection
 */

// Configurable API URL with fallback to local development port 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TOKEN_KEY = 'farmhelper_token';
const USER_KEY = 'farmhelper_user';

export const authService = {
  /**
   * Get currently stored JWT token
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get currently stored user profile object
   */
  getUser() {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check whether the user is currently authenticated
   */
  isAuthenticated() {
    const token = this.getToken();
    return Boolean(token && token.trim() !== '');
  },

  /**
   * Store token and safe user details in browser storage
   */
  setSession(token, user) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  /**
   * Clear session on logout
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Register a new user account
   */
  async register(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed. Please try again.');
    }

    if (data.token && data.user) {
      this.setSession(data.token, data.user);
    }

    return data;
  },

  /**
   * Log in an existing user
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }

    if (data.token && data.user) {
      this.setSession(data.token, data.user);
    }

    return data;
  },

  /**
   * Fetch current authenticated user profile from /api/auth/me
   */
  async getProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
      }
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    return data.user;
  },
};

export default authService;
