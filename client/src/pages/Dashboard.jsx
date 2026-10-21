import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  // Current formatted date
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Dashboard Area */}
      <main className="dashboard-main">
        {/* Top Header / Welcome Area */}
        <header className="dashboard-header">
          <div className="header-greeting-container">
            <span className="current-date-badge">📅 {todayDate}</span>
            <h1 className="welcome-title">Good Morning, Farmer! 🌾</h1>
            <p className="welcome-description">
              Welcome to your smart farming command center. Monitor real-time weather,
              crop health, irrigation schedules, and agricultural market prices.
            </p>
          </div>

          <div className="header-farm-status">
            <div className="status-pill status-healthy">
              <span className="status-dot"></span>
              <span>Farm Status: Optimal</span>
            </div>
            <span className="farm-location-label">📍 Field #1 • Bangalore North</span>
          </div>
        </header>

        {/* Quick Highlights Strip */}
        <section className="highlights-bar">
          <div className="highlight-pill">
            <span className="highlight-label">Active Crop</span>
            <strong className="highlight-value">Tomato (Field A)</strong>
          </div>
          <div className="highlight-pill">
            <span className="highlight-label">Soil Type</span>
            <strong className="highlight-value">Loamy Sand</strong>
          </div>
          <div className="highlight-pill">
            <span className="highlight-label">Soil Moisture</span>
            <strong className="highlight-value text-green">54% (Optimal)</strong>
          </div>
          <div className="highlight-pill">
            <span className="highlight-label">Next Action</span>
            <strong className="highlight-value text-amber">Drip at 4:30 PM</strong>
          </div>
        </section>

        {/* Cards Grid: 6 Main Agricultural Features */}
        <section className="dashboard-grid">

          {/* 1. Weather Summary Card */}
          <div className="dash-card weather-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-blue">🌦️ Weather Summary</span>
                <h3>Today's Climate</h3>
              </div>
              <span className="card-top-indicator">Partly Cloudy</span>
            </div>

            <div className="weather-hero">
              <div className="weather-temp-group">
                <span className="temp-value">28°C</span>
                <span className="temp-sub">Feels like 29°C</span>
              </div>
              <div className="weather-icon-large">⛅</div>
            </div>

            <div className="weather-details-grid">
              <div className="weather-metric">
                <span className="metric-label">Humidity</span>
                <strong className="metric-val">62%</strong>
              </div>
              <div className="weather-metric">
                <span className="metric-label">Rain Chance</span>
                <strong className="metric-val">10%</strong>
              </div>
              <div className="weather-metric">
                <span className="metric-label">Wind Speed</span>
                <strong className="metric-val">14 km/h</strong>
              </div>
              <div className="weather-metric">
                <span className="metric-label">UV Index</span>
                <strong className="metric-val">5 (Moderate)</strong>
              </div>
            </div>

            <div className="card-tip-box tip-green">
              <strong>💡 Advisory:</strong> Great weather window for foliar nutrient spraying before noon.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/weather')}
            >
              View 7-Day Weather Forecast →
            </button>
          </div>

          {/* 2. Crop Recommendation Card */}
          <div className="dash-card crop-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-green">🌱 Crop Intelligence</span>
                <h3>Recommended Crop</h3>
              </div>
              <span className="confidence-pill">94% Match</span>
            </div>

            <div className="crop-spotlight">
              <div className="crop-avatar">🍅</div>
              <div className="crop-info">
                <h4>Hybrid Tomato (Arka Rakshak)</h4>
                <p>Suitable for moderate temperatures and well-drained loamy soil.</p>
              </div>
            </div>

            <div className="card-stats-row">
              <div className="stat-box">
                <span className="stat-label">Season</span>
                <span className="stat-val">Rabi / Kharif</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Duration</span>
                <span className="stat-val">120 - 135 Days</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Expected Yield</span>
                <span className="stat-val">35 - 40 t/ha</span>
              </div>
            </div>

            <div className="card-tip-box tip-blue">
              <strong>Soil Note:</strong> Current NPK balance (120-60-40) is well-suited for high fruit yield.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/crop-recommendation')}
            >
              Get More Crop Suggestions →
            </button>
          </div>

          {/* 3. Irrigation Recommendation Card */}
          <div className="dash-card irrigation-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-teal">💧 Smart Irrigation</span>
                <h3>Watering Schedule</h3>
              </div>
              <span className="status-pill status-healthy">Soil Hydrated</span>
            </div>

            <div className="schedule-hero">
              <div className="next-time">
                <span className="time-sub">Next Scheduled Watering</span>
                <span className="time-val">Today @ 4:30 PM</span>
              </div>
              <span className="method-tag">Drip Line A & B</span>
            </div>

            <div className="irrigation-indicators">
              <div className="progress-group">
                <div className="progress-label">
                  <span>Current Soil Moisture</span>
                  <strong>54%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '54%' }}></div>
                </div>
              </div>
              <p className="irrigation-meta">
                Estimated water requirement: <strong>1,800 Litres / acre</strong>
              </p>
            </div>

            <div className="card-tip-box tip-teal">
              <strong>💧 Water Saving:</strong> Drip system saved 22% water compared to furrow methods this week.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/irrigation')}
            >
              Adjust Irrigation Timers →
            </button>
          </div>

          {/* 4. Fertilizer Recommendation Card */}
          <div className="dash-card fertilizer-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-amber">🧪 Soil Nutrition</span>
                <h3>Fertilizer Plan</h3>
              </div>
              <span className="due-pill">Due in 3 Days</span>
            </div>

            <div className="fertilizer-item-box">
              <div className="fert-icon">🌿</div>
              <div className="fert-text">
                <h4>NPK 19-19-19 & Potassium Sulfate</h4>
                <p>Required for vegetative branching and early blossom booster.</p>
              </div>
            </div>

            <div className="dosage-strip">
              <div className="dosage-item">
                <span className="d-label">Dosage</span>
                <strong className="d-val">25 kg / acre</strong>
              </div>
              <div className="dosage-item">
                <span className="d-label">Method</span>
                <strong className="d-val">Fertigation / Spray</strong>
              </div>
              <div className="dosage-item">
                <span className="d-label">Stage</span>
                <strong className="d-val">Flowering Stage</strong>
              </div>
            </div>

            <div className="card-tip-box tip-amber">
              <strong>⚠️ Caution:</strong> Apply during cooler evening hours to prevent fertilizer burn on leaves.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/fertilizer')}
            >
              View Full Fertilizer Calculator →
            </button>
          </div>

          {/* 5. Pest Control Guidance Card */}
          <div className="dash-card pest-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-rose">🛡️ Crop Protection</span>
                <h3>Pest & Disease Advisory</h3>
              </div>
              <span className="status-pill status-healthy">Low Risk</span>
            </div>

            <div className="pest-warning-box">
              <div className="pest-icon">🔍</div>
              <div className="pest-info">
                <h4>Aphids & Early Leaf Spot</h4>
                <p>Minor sightings reported in nearby taluks due to morning humidity.</p>
              </div>
            </div>

            <div className="treatment-list">
              <div className="treatment-item">
                <span className="step-num">1</span>
                <span>Inspect underside of lower foliage once every 2 days</span>
              </div>
              <div className="treatment-item">
                <span className="step-num">2</span>
                <span>Preventive organic spray: <strong>Neem Oil (5 ml / Litre)</strong></span>
              </div>
            </div>

            <div className="card-tip-box tip-rose">
              <strong>🌿 Eco Tip:</strong> Encourage ladybugs and beneficial predatory insects in buffer rows.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/pest-control')}
            >
              Diagnose Pest Symptoms →
            </button>
          </div>

          {/* 6. Agricultural Market Prices Card */}
          <div className="dash-card market-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-badge bg-emerald">📈 Mandi Market Prices</span>
                <h3>Live APMC Rates</h3>
              </div>
              <span className="live-pill">● Updated Today</span>
            </div>

            <div className="market-prices-list">
              <div className="market-row">
                <div className="commodity-name">
                  <span className="comm-icon">🌾</span>
                  <div>
                    <strong>Wheat (Sharbati)</strong>
                    <span className="comm-mandi">Bangalore APMC</span>
                  </div>
                </div>
                <div className="commodity-price">
                  <span className="price-val">₹2,450 / q</span>
                  <span className="price-trend up">▲ +₹45</span>
                </div>
              </div>

              <div className="market-row">
                <div className="commodity-name">
                  <span className="comm-icon">🍅</span>
                  <div>
                    <strong>Tomato (Hybrid)</strong>
                    <span className="comm-mandi">Kolar Market</span>
                  </div>
                </div>
                <div className="commodity-price">
                  <span className="price-val">₹28 / kg</span>
                  <span className="price-trend up">▲ +₹3</span>
                </div>
              </div>

              <div className="market-row">
                <div className="commodity-name">
                  <span className="comm-icon">🌽</span>
                  <div>
                    <strong>Maize (Yellow)</strong>
                    <span className="comm-mandi">Mysore Mandi</span>
                  </div>
                </div>
                <div className="commodity-price">
                  <span className="price-val">₹2,120 / q</span>
                  <span className="price-trend steady">● Steady</span>
                </div>
              </div>
            </div>

            <div className="card-tip-box tip-green">
              <strong>📊 Market Trend:</strong> Tomato demand is expected to remain firm over the coming weekend.
            </div>

            <button
              className="card-action-btn"
              onClick={() => navigate('/market-prices')}
            >
              Browse All Commodity Rates →
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}

export default Dashboard;
