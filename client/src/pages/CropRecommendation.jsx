import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './CropRecommendation.css';

function CropRecommendation() {
  // Farm input states
  const [soilType, setSoilType] = useState('Loamy Soil');
  const [season, setSeason] = useState('Kharif (Monsoon / Autumn)');
  const [waterAvailability, setWaterAvailability] = useState('Moderate (Borewell / Drip)');
  const [landSize, setLandSize] = useState('3.5');
  const [temperature, setTemperature] = useState('28');
  const [rainfall, setRainfall] = useState('Moderate (700 - 1000 mm)');

  // Calculation & Results display state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedCropDetail, setSelectedCropDetail] = useState(null);

  // Sample Recommendation Data (Transparently presented as sample agronomic profiles)
  const sampleCrops = [
    {
      id: 'tomato',
      name: 'Tomato (Hybrid Arka Rakshak)',
      icon: '🍅',
      category: 'Vegetable / Cash Crop',
      suitability: 94,
      duration: '110 - 130 Days',
      expectedYield: '35 - 40 tonnes / ha',
      waterNeed: 'Moderate (Drip Ideal)',
      profitability: 'High',
      reason: 'Ideal fit for well-drained loamy soil. The current 28°C average temperature promotes vigorous flowering and healthy fruit setting.',
      strengths: [
        'Optimal vegetative growth between 20°C - 30°C',
        'Thrives with drip irrigation without waterlogging root zones',
        'Strong daily liquidity in regional APMC mandis',
      ],
    },
    {
      id: 'maize',
      name: 'Maize (Hybrid HQPM-1)',
      icon: '🌽',
      category: 'Cereal / Grain Crop',
      suitability: 88,
      duration: '90 - 110 Days',
      expectedYield: '6.5 - 8.0 tonnes / ha',
      waterNeed: 'Moderate',
      profitability: 'Medium - High',
      reason: 'Robust vegetative growth in warm weather with moderate water. Highly tolerant to short dry spells between watering cycles.',
      strengths: [
        'Deep root network utilizes subsoil nutrients efficiently',
        'Low labor requirement compared to vegetable farming',
        'Consistent demand from grain mills and poultry feed manufacturers',
      ],
    },
    {
      id: 'rice',
      name: 'Rice / Paddy (Sona Masuri)',
      icon: '🌾',
      category: 'Staple Food Crop',
      suitability: 81,
      duration: '125 - 140 Days',
      expectedYield: '5.2 - 6.5 tonnes / ha',
      waterNeed: 'High (Needs regular water)',
      profitability: 'Stable',
      reason: 'Produces strong yields if steady watering is maintained during early tillering and panicle development stages.',
      strengths: [
        'Consistent market price backed by regional government procurement',
        'Well-adapted to local seasonal rainfall patterns',
        'Beneficial crop rotation option to restore soil balance',
      ],
    },
  ];

  // Handle "Get Recommendation" action
  const handleGetRecommendation = (e) => {
    e.preventDefault();
    setIsEvaluating(true);

    // Brief simulated calculation effect for realistic user experience
    setTimeout(() => {
      setIsEvaluating(false);
      // Reset selected detail to default top crop
      setSelectedCropDetail(sampleCrops[0]);
    }, 600);
  };

  // Quick Preset Helper for demo
  const handleLoadPreset = (type) => {
    if (type === 'vegetable') {
      setSoilType('Loamy Soil');
      setSeason('Kharif (Monsoon / Autumn)');
      setWaterAvailability('Moderate (Borewell / Drip)');
      setTemperature('27');
      setRainfall('Moderate (700 - 1000 mm)');
    } else if (type === 'grain') {
      setSoilType('Black Soil');
      setSeason('Rabi (Winter)');
      setWaterAvailability('Abundant (Canal / River)');
      setTemperature('24');
      setRainfall('High (>1000 mm)');
    }
  };

  return (
    <div className="crop-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Crop Recommendation Content */}
      <main className="crop-main-content">

        {/* Page Header */}
        <header className="crop-page-header">
          <div className="header-info">
            <span className="crumb-badge">Dashboard / Crop Intelligence</span>
            <h1 className="crop-title">Crop Recommendation</h1>
            <p className="crop-subtitle">
              FarmHelper helps farmers choose suitable crops based on soil conditions,
              seasonal climate, water availability, and land characteristics.
            </p>
          </div>

          <div className="preset-buttons">
            <span className="preset-label">Quick Presets:</span>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handleLoadPreset('vegetable')}
            >
              🍅 Loamy + Vegetable
            </button>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handleLoadPreset('grain')}
            >
              🌾 Black Soil + Grain
            </button>
          </div>
        </header>

        {/* TWO-COLUMN WORKFLOW: Input Form (Left) & Results (Right) */}
        <div className="crop-workspace-grid">

          {/* LEFT: Farm Inputs Card */}
          <section className="farm-input-card">
            <div className="card-heading-group">
              <span className="step-tag">Step 1</span>
              <h2>Farm & Environmental Inputs</h2>
              <p>Enter your field specifications to evaluate suitable crops</p>
            </div>

            <form onSubmit={handleGetRecommendation} className="crop-input-form">
              {/* Soil Type */}
              <div className="form-field">
                <label htmlFor="soil-type">Soil Type</label>
                <select
                  id="soil-type"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="crop-select"
                >
                  <option value="Loamy Soil">Loamy Soil (Balanced NPK, Good Drainage)</option>
                  <option value="Sandy Loam">Sandy Loam (Fast Draining, Light)</option>
                  <option value="Clay Soil">Clay Soil (High Moisture Retention)</option>
                  <option value="Black Soil">Black Soil (Rich in Lime, Iron, Magnesia)</option>
                  <option value="Red Soil">Red Soil (Iron Rich, Porous)</option>
                </select>
              </div>

              {/* Season */}
              <div className="form-field">
                <label htmlFor="season">Farming Season</label>
                <select
                  id="season"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="crop-select"
                >
                  <option value="Kharif (Monsoon / Autumn)">Kharif (Monsoon / Autumn: Jun - Oct)</option>
                  <option value="Rabi (Winter)">Rabi (Winter: Oct - Mar)</option>
                  <option value="Zaid (Summer)">Zaid (Summer: Mar - Jun)</option>
                </select>
              </div>

              {/* Water Availability */}
              <div className="form-field">
                <label htmlFor="water-availability">Available Water Resource</label>
                <select
                  id="water-availability"
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  className="crop-select"
                >
                  <option value="Moderate (Borewell / Drip)">Moderate (Borewell / Drip System)</option>
                  <option value="Abundant (Canal / River)">Abundant (Canal / River / Flood)</option>
                  <option value="Low (Rainfed / Dependent)">Low (Purely Rainfed / Limited)</option>
                </select>
              </div>

              {/* Land Size & Temperature (2-column row) */}
              <div className="form-row-two">
                <div className="form-field">
                  <label htmlFor="land-size">Land Size (Acres)</label>
                  <input
                    id="land-size"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    placeholder="e.g. 3.5"
                    className="crop-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="temperature">Avg. Temp (°C)</label>
                  <input
                    id="temperature"
                    type="number"
                    min="10"
                    max="45"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="e.g. 28"
                    className="crop-input"
                    required
                  />
                </div>
              </div>

              {/* Expected Rainfall */}
              <div className="form-field">
                <label htmlFor="rainfall">Expected Rainfall</label>
                <select
                  id="rainfall"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  className="crop-select"
                >
                  <option value="Moderate (700 - 1000 mm)">Moderate (700 - 1000 mm / normal)</option>
                  <option value="Low (< 600 mm)">Low (&lt; 600 mm / dry spells)</option>
                  <option value="High (> 1100 mm)">High (&gt; 1100 mm / heavy monsoon)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="evaluate-btn"
                disabled={isEvaluating}
              >
                {isEvaluating ? (
                  <span>Evaluating Suitability...</span>
                ) : (
                  <>
                    <span>Get Recommendation</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* RIGHT: Recommendation Results Section */}
          <section className="results-container">
            <div className="results-header">
              <div className="results-title-group">
                <span className="step-tag green-tag">Step 2</span>
                <h2>Recommended Crops for Your Field</h2>
                <p>Based on {soilType}, {season}, and {temperature}°C ambient climate</p>
              </div>
              <span className="sample-data-badge">Sample Evaluation Data</span>
            </div>

            {/* List of 3 Recommended Crops */}
            <div className="crops-list">
              {sampleCrops.map((crop, index) => (
                <div
                  key={crop.id}
                  className={`crop-result-card ${index === 0 ? 'top-match' : ''}`}
                >
                  {/* Card Top Strip */}
                  <div className="crop-card-top">
                    <div className="crop-identity">
                      <span className="crop-icon-bubble">{crop.icon}</span>
                      <div>
                        <div className="name-category">
                          <h3 className="crop-name">{crop.name}</h3>
                          <span className="crop-category">{crop.category}</span>
                        </div>
                        {index === 0 && (
                          <span className="top-choice-badge">⭐ Top Recommendation</span>
                        )}
                      </div>
                    </div>

                    <div className="suitability-score">
                      <span className="score-percentage">{crop.suitability}%</span>
                      <span className="score-label">Suitability Match</span>
                    </div>
                  </div>

                  {/* Crop Metrics Row */}
                  <div className="crop-metrics-strip">
                    <div className="c-metric">
                      <span className="c-label">Growing Duration</span>
                      <strong className="c-value">{crop.duration}</strong>
                    </div>
                    <div className="c-metric">
                      <span className="c-label">Expected Yield</span>
                      <strong className="c-value">{crop.expectedYield}</strong>
                    </div>
                    <div className="c-metric">
                      <span className="c-label">Water Need</span>
                      <strong className="c-value">{crop.waterNeed}</strong>
                    </div>
                    <div className="c-metric">
                      <span className="c-label">Market Demand</span>
                      <strong className="c-value">{crop.marketDemand}</strong>
                    </div>
                  </div>

                  {/* Short Reason */}
                  <div className="crop-reason-box">
                    <strong>Why it is suitable:</strong> {crop.reason}
                  </div>
                </div>
              ))}
            </div>

            {/* "Why this crop?" Detailed Explanation Section */}
            <div className="why-this-crop-card">
              <div className="why-header">
                <span className="why-icon">💡</span>
                <div>
                  <h3>Understanding "Why This Crop?"</h3>
                  <p>How your input parameters translate into high harvest probability</p>
                </div>
              </div>

              <div className="why-criteria-grid">
                <div className="criteria-item">
                  <div className="crit-icon">🌱</div>
                  <div>
                    <strong>1. Soil Compatibility</strong>
                    <p>
                      <strong>{soilType}</strong> provides physical anchoring and nutrient retention
                      best matched for taproot vegetables and deep-feeding cereals.
                    </p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="crit-icon">☀️</div>
                  <div>
                    <strong>2. Thermal & Seasonal Fit</strong>
                    <p>
                      The <strong>{temperature}°C</strong> average supports high chlorophyll synthesis
                      without causing heat-stress flower drop during the <strong>{season}</strong> cycle.
                    </p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="crit-icon">💧</div>
                  <div>
                    <strong>3. Water Efficiency</strong>
                    <p>
                      Your <strong>{waterAvailability}</strong> resource provides the required volume
                      for these crops without risking drought stress or water waste.
                    </p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="crit-icon">📈</div>
                  <div>
                    <strong>4. Land Utilization & Economics</strong>
                    <p>
                      On a <strong>{landSize} Acre</strong> plot, rotating between tomato and maize
                      ensures consistent cash flow and natural soil nitrogen balance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default CropRecommendation;
