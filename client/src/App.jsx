import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import CropRecommendation from './pages/CropRecommendation';
import Irrigation from './pages/Irrigation';
import Fertilizer from './pages/Fertilizer';
import PestControl from './pages/PestControl';
import MarketPrices from './pages/MarketPrices';
import authService from './services/authService';

/**
 * ProtectedRoute: checks whether the user has an active JWT session.
 * If not authenticated, redirects directly to /login.
 */
function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Login & Registration Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard & Agriculture Feature Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crop-recommendation"
          element={
            <ProtectedRoute>
              <CropRecommendation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/irrigation"
          element={
            <ProtectedRoute>
              <Irrigation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fertilizer"
          element={
            <ProtectedRoute>
              <Fertilizer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pest-control"
          element={
            <ProtectedRoute>
              <PestControl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market-prices"
          element={
            <ProtectedRoute>
              <MarketPrices />
            </ProtectedRoute>
          }
        />

        {/* Default route: if authenticated go to /dashboard, else /login */}
        <Route
          path="/"
          element={
            authService.isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all unknown routes redirect to /dashboard (or /login via protection) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
