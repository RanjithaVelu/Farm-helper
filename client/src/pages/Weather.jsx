import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Weather.css';

function Weather() {
  const [selectedField, setSelectedField] = useState('Field #1 (Main Farmland)');
  const [lastRefreshed, setLastRefreshed] = useState('Just now');

  // Sample/Static Weather Data (Farmer-focused)
  const currentWeather = {
    location: 'Bangalore Rural, Karnataka',
    temp: 28,
    feelsLike: 30,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 64,
    windSpeed: 14,
    rainChance: 15,
    uvIndex: '5 (Moderate)',
    pressure: '1012 hPa',
    dewPoint: '19°C',
    sunrise: '6:14 AM',
    sunset: '6:28 PM',
  };

  // 5-Day Forecast sample data
  const fiveDayForecast = [
    {
      day: 'Today',
      date: 'Wed, Sep 30',
      condition: 'Partly Cloudy',
      icon: '⛅',
      tempMax: 29,
      tempMin: 21,
      rainChance: 15,
      humidity: '64%',
      tip: 'Good day for field operations',
    },
    {
      day: 'Thursday',
      date: 'Oct 01',
      condition: 'Mostly Sunny',
      icon: '☀️',
      tempMax: 31,
      tempMin: 22,
      rainChance: 5,
      humidity: '58%',
      tip: 'Higher evaporation, plan evening drip',
    },
    {
      day: 'Friday',
      date: 'Oct 02',
      condition: 'Scattered Showers',
      icon: '🌧️',
      tempMax: 26,
      tempMin: 20,
      rainChance: 65,
      humidity: '78%',
      tip: 'Rain arriving late afternoon; pause irrigation',
    },
    {
      day: 'Saturday',
      date: 'Oct 03',
      condition: 'Thunderstorms',
      icon: '⛈️',
      tempMax: 25,
      tempMin: 19,
      rainChance: 80,
      humidity: '84%',
      tip: 'Avoid pesticide spraying; check field drains',
    },
    {
      day: 'Sunday',
      date: 'Oct 04',
      condition: 'Clear & Mild',
      icon: '🌤️',
      tempMax: 28,
      tempMin: 20,
      rainChance: 20,
      humidity: '66%',
      tip: 'Favorable conditions to resume farm tasks',
    },
  ];

  // Agricultural Advisories based on weather
  const advisories = [
    {
      id: 'irrigation',
      badge: '💧 Irrigation Advisory',
      badgeClass: 'badge-teal',
      status: 'Schedule for 4:30 PM Today',
      title: 'Optimal Late-Afternoon Watering Window',
      text: 'Current soil moisture is 54%. With mild 28°C temperatures and light breeze, run drip lines during late afternoon to prevent evaporation losses. Hold irrigation on Friday as rainfall is expected.',
    },
    {
      id: 'spraying',
      badge: '🌿 Spraying Advisory',
      badgeClass: 'badge-green',
      status: 'Safe Window Before 11:00 AM',
      title: 'Low Wind Drift & Safe Foliar Applications',
      text: 'Wind speeds are calm at 14 km/h (well within the safe <18 km/h limit). If applying foliar nutrients or organic neem oil, complete work before noon. Avoid any chemical spraying from Friday due to rain wash-off risks.',
    },
    {
      id: 'rain-alert',
      badge: '⚠️ Weather & Harvest Warning',
      badgeClass: 'badge-amber',
      status: 'Rain Predicted (Oct 2 - Oct 3)',
      title: 'Scattered Showers & Thunderstorms Ahead',
      text: 'Rain probability increases to 65% on Friday and 80% on Saturday. Ensure field drainage furrows are clear to prevent water stagnation around root zones, and move harvested produce to dry storage sheds.',
    },
  ];

  const handleRefresh = () => {
    setLastRefreshed('Updated just now');
  };

  return (
    <div className="weather-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Weather Content */}
      <main className="weather-main-content">
        
        {/* Header Section */}
        <header className="weather-page-header">
          <div className="header-text-group">
            <span className="weather-crumb">Dashboard / Weather Information</span>
            <h1 className="weather-title">Weather</h1>
            <p className="weather-subtitle">
              Current weather conditions, 5-day forecast, and agricultural climate advisories for your farm.
            </p>
          </div>

          <div className="header-actions">
            <div className="field-select-wrapper">
              <span className="field-icon">📍</span>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="field-selector"
              >
                <option value="Field #1 (Main Farmland)">Field #1 (Main Farmland)</option>
                <option value="Field #2 (Tomato Patch)">Field #2 (Tomato Patch)</option>
                <option value="Field #3 (Orchard & Nursery)">Field #3 (Orchard & Nursery)</option>
              </select>
            </div>

            <button
              type="button"
              className="refresh-btn"
              onClick={handleRefresh}
              title="Refresh weather data"
            >
              🔄 <span className="refresh-text">{lastRefreshed}</span>
            </button>
          </div>
        </header>

        {/* CURRENT WEATHER CARD */}
        <section className="current-weather-card">
          <div className="current-weather-top">
            <div className="location-info">
              <span className="location-tag">📍 {currentWeather.location}</span>
              <h2 className="selected-field-title">{selectedField}</h2>
              <span className="condition-label">{currentWeather.condition}</span>
            </div>

            <div className="temp-hero">
              <div className="hero-icon">{currentWeather.icon}</div>
              <div className="hero-values">
                <span className="hero-temp">{currentWeather.temp}°C</span>
                <span className="hero-feels">Feels like {currentWeather.feelsLike}°C</span>
              </div>
            </div>
          </div>

          {/* Key Agricultural Weather Metrics */}
          <div className="weather-metrics-grid">
            <div className="metric-card">
              <span className="m-icon">💧</span>
              <div className="m-info">
                <span className="m-title">Humidity</span>
                <strong className="m-value">{currentWeather.humidity}%</strong>
                <span className="m-hint">Optimal for crop foliage</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="m-icon">🌧️</span>
              <div className="m-info">
                <span className="m-title">Rain Probability</span>
                <strong className="m-value">{currentWeather.rainChance}%</strong>
                <span className="m-hint">Low chance today</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="m-icon">💨</span>
              <div className="m-info">
                <span className="m-title">Wind Speed</span>
                <strong className="m-value">{currentWeather.windSpeed} km/h</strong>
                <span className="m-hint">Calm breeze (Good for spray)</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="m-icon">☀️</span>
              <div className="m-info">
                <span className="m-title">UV Index</span>
                <strong className="m-value">{currentWeather.uvIndex}</strong>
                <span className="m-hint">Moderate sunlight</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="m-icon">🌅</span>
              <div className="m-info">
                <span className="m-title">Sunrise / Sunset</span>
                <strong className="m-value">{currentWeather.sunrise} / {currentWeather.sunset}</strong>
                <span className="m-hint">12h 14m daylight</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="m-icon">🧭</span>
              <div className="m-info">
                <span className="m-title">Air Pressure</span>
                <strong className="m-value">{currentWeather.pressure}</strong>
                <span className="m-hint">Stable barometric reading</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5-DAY WEATHER FORECAST */}
        <section className="forecast-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">📅 5-Day Weather Forecast</h2>
              <p className="section-subtitle">Plan field activities, sowing, and irrigation according to upcoming trends</p>
            </div>
          </div>

          <div className="forecast-grid">
            {fiveDayForecast.map((dayItem, index) => (
              <div
                key={dayItem.day}
                className={`forecast-card ${index === 0 ? 'today-highlight' : ''}`}
              >
                {index === 0 && <span className="today-badge">Today</span>}
                <span className="forecast-day-name">{dayItem.day}</span>
                <span className="forecast-date">{dayItem.date}</span>

                <div className="forecast-icon">{dayItem.icon}</div>
                <span className="forecast-condition">{dayItem.condition}</span>

                <div className="forecast-temp-range">
                  <span className="temp-high">{dayItem.tempMax}°</span>
                  <span className="temp-divider">/</span>
                  <span className="temp-low">{dayItem.tempMin}°C</span>
                </div>

                <div className="forecast-rain-pill">
                  <span>🌧️ {dayItem.rainChance}% rain</span>
                </div>

                <p className="forecast-tip">{dayItem.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FARMING ADVISORY SECTION */}
        <section className="advisories-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">🌾 Climate Farming Advisories</h2>
              <p className="section-subtitle">Real-time agronomic guidance tailored to current and upcoming weather</p>
            </div>
          </div>

          <div className="advisories-grid">
            {advisories.map((advisory) => (
              <div key={advisory.id} className="advisory-card">
                <div className="advisory-card-header">
                  <span className={`advisory-badge ${advisory.badgeClass}`}>
                    {advisory.badge}
                  </span>
                  <span className="advisory-status-tag">{advisory.status}</span>
                </div>

                <h3 className="advisory-title">{advisory.title}</h3>
                <p className="advisory-text">{advisory.text}</p>

                <div className="advisory-footer">
                  <span className="advisory-tag">✔ Verified for current soil conditions</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Weather;
