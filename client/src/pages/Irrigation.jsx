import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Irrigation.css';

function Irrigation() {
  const [selectedField, setSelectedField] = useState('Field #1 (Tomato Crop - 3.5 Acres)');
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusNotice, setStatusNotice] = useState('Watering plan is up-to-date based on current soil parameters.');
  const [lastCheckTime, setLastCheckTime] = useState('Today at 2:30 PM');

  // Sample field status data (transparently static/sample for now)
  const fieldStatus = {
    soilMoisture: 52, // Percentage
    temperature: '28°C',
    humidity: '62%',
    waterAvailability: 'Borewell Storage at 78% (Adequate)',
    lastIrrigation: 'Yesterday at 5:00 PM (1,800 L/acre)',
    irrigationMethod: 'Micro-Drip Line A & B',
  };

  // Sample 5-day watering schedule
  const irrigationSchedule = [
    {
      day: 'Today (Wed)',
      date: 'Sep 30',
      time: '4:30 PM - 5:30 PM',
      amount: '1,800 Litres / acre',
      method: 'Drip Line A',
      status: 'Scheduled Today',
      statusType: 'scheduled',
    },
    {
      day: 'Thursday',
      date: 'Oct 01',
      time: '5:00 PM - 6:00 PM',
      amount: '1,200 Litres / acre',
      method: 'Drip Line B',
      status: 'Upcoming',
      statusType: 'upcoming',
    },
    {
      day: 'Friday',
      date: 'Oct 02',
      time: 'Skip Irrigation',
      amount: '0 L (Natural Rain)',
      method: 'Rain Inflow',
      status: 'Paused for Rain (65%)',
      statusType: 'paused',
    },
    {
      day: 'Saturday',
      date: 'Oct 03',
      time: 'Skip Irrigation',
      amount: '0 L (Natural Rain)',
      method: 'Rain Inflow',
      status: 'Paused for Rain (80%)',
      statusType: 'paused',
    },
    {
      day: 'Sunday',
      date: 'Oct 04',
      time: '6:30 AM - 7:30 AM',
      amount: '1,500 Litres / acre',
      method: 'Drip Line A & B',
      status: 'Planned',
      statusType: 'upcoming',
    },
  ];

  // Best practice farming tips
  const farmingTips = [
    {
      icon: '🚫',
      title: 'Avoid Overwatering',
      desc: 'Saturated soil suffocates root hair, increases fungal wilt risk, and leaches expensive nitrogen fertilizers down past root reach.',
    },
    {
      icon: '🖐️',
      title: 'Check Soil Moisture First',
      desc: 'Before starting valves, perform a simple hand-squeeze test at 4-inch depth. If soil forms a stable ball without crumbling, moisture is still sufficient.',
    },
    {
      icon: '🌅',
      title: 'Water in Morning or Late Evening',
      desc: 'Irrigating between 4:30 PM - 6:30 PM or early morning reduces direct sunlight water evaporation by 25% to 30%.',
    },
    {
      icon: '🌧️',
      title: 'Pause Irrigation for Heavy Rain',
      desc: 'Keep an eye on the 5-day weather forecast. Always suspend scheduled watering 24 hours prior to forecasted monsoon showers.',
    },
  ];

  // Handle "Check Recommendation" button click
  const handleCheckRecommendation = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setLastCheckTime('Just now');
      setStatusNotice('Recommendation recalculated: Drip watering recommended today at 4:30 PM.');
    }, 600);
  };

  return (
    <div className="irrigation-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Irrigation Content */}
      <main className="irrigation-main-content">

        {/* Page Header */}
        <header className="irrigation-header">
          <div className="header-text-group">
            <span className="irrigation-badge">Dashboard / Water Management</span>
            <h1 className="irrigation-title">Irrigation</h1>
            <p className="irrigation-subtitle">
              Manage your farm watering schedule and make better irrigation decisions.
            </p>
          </div>

          <div className="irrigation-header-actions">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="field-dropdown"
            >
              <option value="Field #1 (Tomato Crop - 3.5 Acres)">Field #1 (Tomato Crop - 3.5 Acres)</option>
              <option value="Field #2 (Maize Plot - 2.0 Acres)">Field #2 (Maize Plot - 2.0 Acres)</option>
              <option value="Field #3 (Nursery Patch - 1.0 Acre)">Field #3 (Nursery Patch - 1.0 Acre)</option>
            </select>

            <button
              type="button"
              className="check-recommendation-btn"
              onClick={handleCheckRecommendation}
              disabled={isUpdating}
            >
              {isUpdating ? 'Calculating...' : '🔄 Check Recommendation'}
            </button>
          </div>
        </header>

        {/* Status Notice Banner */}
        <div className="irrigation-status-banner">
          <span className="banner-icon">ℹ️</span>
          <span className="banner-text">{statusNotice}</span>
          <span className="banner-time">Last checked: {lastCheckTime}</span>
        </div>

        {/* TOP WORKSPACE: Current Field Status & Recommendation Card */}
        <div className="irrigation-overview-grid">

          {/* 1. Current Field Status Section */}
          <section className="field-status-card">
            <div className="card-top-header">
              <span className="sub-badge">Field Monitoring</span>
              <h2>Current Field Status</h2>
              <span className="selected-field-name">{selectedField}</span>
            </div>

            {/* Soil Moisture Big Gauge Bar */}
            <div className="moisture-meter-box">
              <div className="moisture-meta-row">
                <span className="meter-label">Soil Moisture Level</span>
                <strong className="meter-val text-green">{fieldStatus.soilMoisture}% (Moderate)</strong>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ width: `${fieldStatus.soilMoisture}%` }}
                ></div>
              </div>
              <div className="meter-scale">
                <span>0% (Dry)</span>
                <span className="target-zone">45% - 65% (Optimal Range)</span>
                <span>100% (Saturated)</span>
              </div>
            </div>

            {/* 4 Supporting Status Metrics */}
            <div className="status-metrics-grid">
              <div className="status-item">
                <span className="item-icon">🌡️</span>
                <div>
                  <span className="item-label">Air Temperature</span>
                  <strong className="item-value">{fieldStatus.temperature}</strong>
                </div>
              </div>

              <div className="status-item">
                <span className="item-icon">💧</span>
                <div>
                  <span className="item-label">Humidity</span>
                  <strong className="item-value">{fieldStatus.humidity}</strong>
                </div>
              </div>

              <div className="status-item">
                <span className="item-icon">🚰</span>
                <div>
                  <span className="item-label">Water Availability</span>
                  <strong className="item-value">{fieldStatus.waterAvailability}</strong>
                </div>
              </div>

              <div className="status-item">
                <span className="item-icon">⏱️</span>
                <div>
                  <span className="item-label">Last Irrigation Time</span>
                  <strong className="item-value">{fieldStatus.lastIrrigation}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Irrigation Recommendation Card */}
          <section className="recommendation-hero-card">
            <div className="card-top-header">
              <span className="sub-badge badge-green">Advisory</span>
              <h2>Irrigation Recommendation</h2>
              <span className="status-flag flag-active">● Action Required Today</span>
            </div>

            <div className="recommendation-highlight-box">
              <div className="rec-icon-circle">💧</div>
              <div className="rec-text">
                <span className="rec-status-heading">Recommended Status:</span>
                <h3 className="rec-main-decision">Irrigation Recommended Today</h3>
                <span className="rec-timing-badge">⏰ Suggested Time: 4:30 PM - 5:30 PM (Evening)</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="rec-metrics-row">
              <div className="rec-metric-pill">
                <span className="r-label">Water Volume Needed</span>
                <strong className="r-value">1,800 Litres / acre</strong>
              </div>
              <div className="rec-metric-pill">
                <span className="r-label">Water Depth Equivalent</span>
                <strong className="r-value">~18 mm</strong>
              </div>
              <div className="rec-metric-pill">
                <span className="r-label">Recommended Method</span>
                <strong className="r-value">{fieldStatus.irrigationMethod}</strong>
              </div>
            </div>

            {/* Explanation */}
            <div className="recommendation-explanation-box">
              <h4>Why is irrigation recommended?</h4>
              <p>
                Soil moisture in <strong>{selectedField}</strong> has dipped to <strong>52%</strong> following
                warm 28°C afternoon conditions. Irrigating during late afternoon avoids rapid evaporation
                losses from direct sun exposure, allowing water to infiltrate deeply into root clusters before nightfall.
              </p>
            </div>
          </section>

        </div>

        {/* 3. Irrigation Schedule Section */}
        <section className="schedule-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-title">📅 5-Day Irrigation Schedule</h2>
              <p className="section-subtitle">
                Planned watering intervals adjusted according to upcoming weather and rainfall forecasts
              </p>
            </div>
            <span className="sample-tag">Sample Timetable</span>
          </div>

          <div className="schedule-table-card">
            <div className="schedule-table-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day & Date</th>
                    <th>Suggested Time</th>
                    <th>Water Requirement</th>
                    <th>Irrigation System</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {irrigationSchedule.map((item, idx) => (
                    <tr key={idx} className={item.statusType === 'scheduled' ? 'row-highlight' : ''}>
                      <td>
                        <strong className="table-day">{item.day}</strong>
                        <span className="table-date">{item.date}</span>
                      </td>
                      <td>
                        <span className="table-time">{item.time}</span>
                      </td>
                      <td>
                        <strong className="table-amount">{item.amount}</strong>
                      </td>
                      <td>
                        <span className="table-method">{item.method}</span>
                      </td>
                      <td>
                        <span className={`schedule-status-badge status-${item.statusType}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. Farming Tips Section */}
        <section className="farming-tips-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-title">🌿 Smart Irrigation Best Practices</h2>
              <p className="section-subtitle">
                Practical techniques to conserve water, sustain soil vitality, and boost yield
              </p>
            </div>
          </div>

          <div className="tips-grid">
            {farmingTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <span className="tip-card-icon">{tip.icon}</span>
                <div className="tip-card-body">
                  <h3 className="tip-card-title">{tip.title}</h3>
                  <p className="tip-card-desc">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Irrigation;
