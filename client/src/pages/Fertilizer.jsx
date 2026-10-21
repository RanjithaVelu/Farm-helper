import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Fertilizer.css';

function Fertilizer() {
  // Controlled form state with sensible defaults
  const [crop, setCrop] = useState('Tomato');
  const [soilType, setSoilType] = useState('Loamy');
  const [growthStage, setGrowthStage] = useState('Flowering');
  const [landSize, setLandSize] = useState('2.5');
  const [soilCondition, setSoilCondition] = useState('Average');

  // Form error state
  const [errorMessage, setErrorMessage] = useState('');

  // Submitted profile state (initialized with default profile so recommendations are visible immediately)
  const [submittedProfile, setSubmittedProfile] = useState({
    crop: 'Tomato',
    soilType: 'Loamy',
    growthStage: 'Flowering',
    landSize: 2.5,
    soilCondition: 'Average',
    timestamp: 'Loaded with initial sample values',
  });

  const [isEvaluating, setIsEvaluating] = useState(false);

  // Local helper function to generate sample guidance based on user inputs
  const calculateSampleGuidance = (selectedCrop, selectedStage, acres, selectedCondition) => {
    const size = Math.max(0.1, Number(acres) || 1);

    // Multipliers based on soil condition
    let conditionFactor = 1.0;
    if (selectedCondition === 'Poor') conditionFactor = 1.25;
    if (selectedCondition === 'Good') conditionFactor = 0.85;

    // Stage-specific recommendations
    let nBase = 25;
    let pBase = 20;
    let kBase = 20;
    let stageFocus = '';

    switch (selectedStage) {
      case 'Before Planting':
        nBase = 15;
        pBase = 35;
        kBase = 15;
        stageFocus = 'Basal root zone preparation and deep phosphorus placement are prioritized.';
        break;
      case 'Early Growth':
        nBase = 20;
        pBase = 25;
        kBase = 15;
        stageFocus = 'Root establishment and early vegetative vigor are prioritized.';
        break;
      case 'Vegetative':
        nBase = 35;
        pBase = 15;
        kBase = 20;
        stageFocus = 'Leaf canopy formation and branching vigor are prioritized with nitrogen support.';
        break;
      case 'Flowering':
        nBase = 20;
        pBase = 30;
        kBase = 30;
        stageFocus = 'Blossom retention and balanced phosphorus-potassium support are prioritized.';
        break;
      case 'Fruiting/Grain Filling':
        nBase = 15;
        pBase = 15;
        kBase = 40;
        stageFocus = 'Potassium delivery for fruit expansion, grain weight, and uniform sizing is prioritized.';
        break;
      default:
        stageFocus = 'Balanced N-P-K nutrient maintenance.';
    }

    const nRate = Math.round(nBase * conditionFactor);
    const pRate = Math.round(pBase * conditionFactor);
    const kRate = Math.round(kBase * conditionFactor);
    const organicRateTonnes = (1.5 * conditionFactor).toFixed(1);

    const nTotal = Math.round(nRate * size);
    const pTotal = Math.round(pRate * size);
    const kTotal = Math.round(kRate * size);
    const organicTotal = (Number(organicRateTonnes) * size).toFixed(1);

    return {
      stageFocus,
      cards: [
        {
          id: 'nitrogen',
          nutrient: 'Nitrogen (N)',
          badgeClass: 'badge-blue',
          fertilizerName: 'Urea (46% N) / Ammonium Sulphate',
          mainPurpose: 'Vegetative growth, dark green foliage, and stem strength',
          applicationMethod: 'Split side-dressing into moist soil or drip fertigation',
          explanation: `Provides readily available nitrogen for ${selectedCrop} during the ${selectedStage.toLowerCase()} phase. Helps prevent chlorosis and premature leaf shedding.`,
          illustrativePerAcre: `${nRate} kg / acre`,
          illustrativeTotal: `~${nTotal} kg total for ${size} acres`,
          icon: '🌿',
        },
        {
          id: 'phosphorus',
          nutrient: 'Phosphorus (P)',
          badgeClass: 'badge-purple',
          fertilizerName: 'Single Super Phosphate (SSP) / DAP',
          mainPurpose: 'Root network architecture, flowering vigor, and energy transfer',
          applicationMethod: 'Band placement 2–3 inches below seeds or root zone',
          explanation: `Essential for root anchorage and flower cluster initiation in ${selectedCrop}. Works best when incorporated directly into ${selectedCrop === 'Rice' ? 'puddled soil' : 'root-zone soil'}.`,
          illustrativePerAcre: `${pRate} kg / acre`,
          illustrativeTotal: `~${pTotal} kg total for ${size} acres`,
          icon: '🌱',
        },
        {
          id: 'potassium',
          nutrient: 'Potassium (K)',
          badgeClass: 'badge-amber',
          fertilizerName: 'Muriate of Potash (MOP 60% K₂O) / SOP',
          mainPurpose: 'Disease resistance, fruit sizing, water regulation, and crop quality',
          applicationMethod: 'Soil application at weeding or fertigation through drip lines',
          explanation: `Supports osmotic regulation, starch transport, and fruit skin firmness in ${selectedCrop}. Particularly valuable during flowering and fruit setting.`,
          illustrativePerAcre: `${kRate} kg / acre`,
          illustrativeTotal: `~${kTotal} kg total for ${size} acres`,
          icon: '🍅',
        },
        {
          id: 'organic',
          nutrient: 'Organic Fertilizer',
          badgeClass: 'badge-green',
          fertilizerName: 'Well-Rotted Farmyard Manure (FYM) or Vermicompost',
          mainPurpose: 'Soil structure improvement, microbial life, and moisture retention',
          applicationMethod: 'Broadcasting and thorough soil incorporation before bed preparation',
          explanation: `Enhances the biological health of ${selectedCrop === 'Rice' ? 'wetland soil' : 'soil'}, increases cation exchange capacity, and provides long-term trace minerals.`,
          illustrativePerAcre: `${organicRateTonnes} tonnes / acre (or ~250 kg vermicompost)`,
          illustrativeTotal: `~${organicTotal} tonnes total for ${size} acres`,
          icon: '🪱',
        },
      ],
      schedule: [
        {
          fertilizer: 'Organic Compost + Single Super Phosphate',
          stage: 'Before Planting / Basal',
          illustrativeAmount: `${organicRateTonnes} t/acre FYM + ${pRate} kg/acre SSP`,
          status: selectedStage === 'Before Planting' ? 'Current Stage' : 'Completed',
          statusType: selectedStage === 'Before Planting' ? 'current' : 'completed',
        },
        {
          fertilizer: 'Urea (1st Split) + MOP',
          stage: 'Early Growth / Vegetative',
          illustrativeAmount: `${Math.round(nRate * 0.4)} kg Urea + ${Math.round(kRate * 0.3)} kg MOP / acre`,
          status:
            selectedStage === 'Before Planting'
              ? 'Upcoming'
              : selectedStage === 'Early Growth' || selectedStage === 'Vegetative'
              ? 'Current Stage'
              : 'Completed',
          statusType:
            selectedStage === 'Before Planting'
              ? 'upcoming'
              : selectedStage === 'Early Growth' || selectedStage === 'Vegetative'
              ? 'current'
              : 'completed',
        },
        {
          fertilizer: 'NPK Balanced Mix (19-19-19) / SOP',
          stage: 'Flowering Stage',
          illustrativeAmount: `${Math.round(nRate * 0.3)} kg N + ${Math.round(kRate * 0.4)} kg K / acre`,
          status:
            selectedStage === 'Flowering'
              ? 'Current Stage'
              : selectedStage === 'Fruiting/Grain Filling'
              ? 'Completed'
              : 'Upcoming',
          statusType:
            selectedStage === 'Flowering'
              ? 'current'
              : selectedStage === 'Fruiting/Grain Filling'
              ? 'completed'
              : 'upcoming',
        },
        {
          fertilizer: 'Potassium Sulphate (Foliar/Fertigation)',
          stage: 'Fruiting / Grain Filling',
          illustrativeAmount: `${Math.round(kRate * 0.3)} kg SOP / acre`,
          status: selectedStage === 'Fruiting/Grain Filling' ? 'Current Stage' : 'Upcoming',
          statusType: selectedStage === 'Fruiting/Grain Filling' ? 'current' : 'upcoming',
        },
      ],
    };
  };

  // Form submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const parsedAcres = parseFloat(landSize);
    if (isNaN(parsedAcres) || parsedAcres <= 0) {
      setErrorMessage('Please enter a valid positive land size in acres (e.g. 1.5, 3.0).');
      return;
    }

    if (parsedAcres > 1000) {
      setErrorMessage('Land size exceeds maximum evaluation limit (1,000 acres). Please enter a realistic field size.');
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      setSubmittedProfile({
        crop,
        soilType,
        growthStage,
        landSize: parsedAcres,
        soilCondition,
        timestamp: 'Evaluated just now',
      });
    }, 400);
  };

  // Calculate current guidance from submitted profile
  const guidance = calculateSampleGuidance(
    submittedProfile.crop,
    submittedProfile.growthStage,
    submittedProfile.landSize,
    submittedProfile.soilCondition
  );

  return (
    <div className="fertilizer-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="fertilizer-main-content">
        {/* Page Header */}
        <header className="fertilizer-header">
          <div className="header-text-group">
            <span className="fertilizer-crumb">Dashboard / Soil Nutrition</span>
            <h1 className="fertilizer-title">Fertilizer</h1>
            <p className="fertilizer-subtitle">
              Get fertilizer guidance for your crop and field conditions.
            </p>
          </div>

          <div className="demo-label-pill">
            <span className="demo-dot"></span>
            <span>Sample Demonstration Mode</span>
          </div>
        </header>

        {/* Prominent Educational Disclaimer Banner */}
        <div className="disclaimer-banner" role="alert">
          <span className="disclaimer-icon">⚠️</span>
          <div className="disclaimer-content">
            <strong>Demonstration & Sample Guidance Only:</strong>
            <p>
              The fertilizer quantities, methods, and schedules displayed on this page are sample illustrative rules
              designed for educational and project demonstration purposes. This system does not use real-time AI models,
              laboratory chemistry, or soil-sensor hardware. Actual fertilizer application must always be verified
              against local soil-testing laboratory health cards, product labels, and guidance from agricultural extension officers.
            </p>
          </div>
        </div>

        {/* WORKSPACE: Farm Details Form (Left) & Recommendation Overview (Right) */}
        <div className="fertilizer-grid-container">
          {/* SECTION 1: Farm Details Form */}
          <section className="farm-details-card">
            <div className="card-header-bar">
              <span className="step-tag">Step 1</span>
              <h2>Farm Details Form</h2>
              <p>Enter your field conditions to view sample nutrient estimates</p>
            </div>

            {errorMessage && (
              <div className="form-error-alert" role="alert">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="fertilizer-form" noValidate>
              {/* Crop Selector */}
              <div className="form-group">
                <label htmlFor="crop-select">Crop</label>
                <select
                  id="crop-select"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="form-control"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Other">Other (General Field Crop)</option>
                </select>
              </div>

              {/* Soil Type */}
              <div className="form-group">
                <label htmlFor="soil-type-select">Soil Type</label>
                <select
                  id="soil-type-select"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="form-control"
                >
                  <option value="Loamy">Loamy (Balanced texture, good moisture & aeration)</option>
                  <option value="Sandy Loam">Sandy Loam (Fast draining, lighter structure)</option>
                  <option value="Clay">Clay (Heavy, high water & nutrient holding)</option>
                  <option value="Black">Black (High fertility, rich in lime & potash)</option>
                  <option value="Red">Red (Porous, iron-rich, needs phosphorus care)</option>
                </select>
              </div>

              {/* Growth Stage */}
              <div className="form-group">
                <label htmlFor="growth-stage-select">Growth Stage</label>
                <select
                  id="growth-stage-select"
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="form-control"
                >
                  <option value="Before Planting">Before Planting (Basal preparation)</option>
                  <option value="Early Growth">Early Growth (Germination / seedling stage)</option>
                  <option value="Vegetative">Vegetative (Active tillering & leaf expansion)</option>
                  <option value="Flowering">Flowering (Budding & bloom setting)</option>
                  <option value="Fruiting/Grain Filling">Fruiting / Grain Filling (Maturation)</option>
                </select>
              </div>

              {/* Land Size in Acres */}
              <div className="form-group">
                <label htmlFor="land-size-input">Land Size (in Acres)</label>
                <input
                  id="land-size-input"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={landSize}
                  onChange={(e) => {
                    setLandSize(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="e.g. 2.5"
                  className={`form-control ${errorMessage ? 'input-error' : ''}`}
                  required
                />
                <span className="field-hint">Enter positive number of acres (e.g., 1, 2.5, 5)</span>
              </div>

              {/* Soil Condition */}
              <div className="form-group">
                <label htmlFor="soil-condition-select">Soil Condition</label>
                <select
                  id="soil-condition-select"
                  value={soilCondition}
                  onChange={(e) => setSoilCondition(e.target.value)}
                  className="form-control"
                >
                  <option value="Average">Average (Normal fertility history)</option>
                  <option value="Poor">Poor (Depleted soil, needs higher organic input)</option>
                  <option value="Good">Good (High residual organic matter)</option>
                </select>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="submit-recommendation-btn"
                disabled={isEvaluating}
              >
                {isEvaluating ? (
                  <span>Evaluating Sample Guidance...</span>
                ) : (
                  <>
                    <span>Get Fertilizer Recommendation</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* SECTION 2: Interactive Recommendation Overview */}
          <section className="recommendation-results-panel">
            <div className="results-header-card">
              <div className="results-header-text">
                <span className="step-tag green-tag">Step 2</span>
                <h2>Sample Recommendation Results</h2>
                <p>Derived using simple local agronomic rules reflecting your submitted inputs</p>
              </div>

              <span className="evaluation-timestamp">{submittedProfile.timestamp}</span>
            </div>

            {/* Submitted Selections Summary Pill Strip */}
            <div className="profile-summary-strip">
              <div className="profile-chip">
                <span className="chip-label">Crop:</span>
                <strong className="chip-val">{submittedProfile.crop}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Soil Type:</span>
                <strong className="chip-val">{submittedProfile.soilType}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Stage:</span>
                <strong className="chip-val">{submittedProfile.growthStage}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Land Area:</span>
                <strong className="chip-val">{submittedProfile.landSize} Acres</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Condition:</span>
                <strong className="chip-val">{submittedProfile.soilCondition}</strong>
              </div>
            </div>

            {/* Stage-Specific Focus Callout */}
            <div className="stage-focus-callout">
              <span className="focus-icon">🎯</span>
              <div>
                <strong>Current Stage Focus ({submittedProfile.growthStage}):</strong>
                <p>{guidance.stageFocus}</p>
              </div>
            </div>

            {/* SECTION 3: 4 FERTILIZER CARDS (N, P, K, Organic) */}
            <div className="fertilizer-cards-grid">
              {guidance.cards.map((card) => (
                <div key={card.id} className="fertilizer-item-card">
                  <div className="card-top-header">
                    <span className={`nutrient-badge ${card.badgeClass}`}>
                      {card.nutrient}
                    </span>
                    <span className="nutrient-icon">{card.icon}</span>
                  </div>

                  <h3 className="card-fertilizer-title">{card.fertilizerName}</h3>

                  <div className="card-section">
                    <span className="meta-heading">Main Purpose</span>
                    <p className="meta-text">{card.mainPurpose}</p>
                  </div>

                  <div className="card-section">
                    <span className="meta-heading">Application Method</span>
                    <p className="meta-text">{card.applicationMethod}</p>
                  </div>

                  {/* Illustrative Quantity Box */}
                  <div className="illustrative-quantity-box">
                    <div className="qty-row">
                      <span className="qty-label">Illustrative Rate:</span>
                      <strong className="qty-value">{card.illustrativePerAcre}</strong>
                    </div>
                    <div className="qty-row total-row">
                      <span className="qty-label">Estimated for {submittedProfile.landSize} Acres:</span>
                      <strong className="qty-total">{card.illustrativeTotal}</strong>
                    </div>
                    <p className="qty-disclaimer">
                      * Illustrative sample rate only. Actual dosage depends on crop variety, growth stage, certified soil-test results, and local agricultural extension guidance.
                    </p>
                  </div>

                  <div className="card-explanation">
                    <strong>Short Explanation:</strong> {card.explanation}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 4: APPLICATION SCHEDULE */}
        <section className="application-schedule-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-heading">📅 Sample Application Schedule</h2>
              <p className="section-subheading">
                Illustrative split-application timetable for {submittedProfile.crop} (Demonstration entries only)
              </p>
            </div>
            <span className="sample-schedule-tag">Sample Timetable</span>
          </div>

          <div className="schedule-table-card">
            <div className="table-responsive-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Fertilizer Product</th>
                    <th>Application Stage</th>
                    <th>Illustrative Amount (Sample)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {guidance.schedule.map((entry, idx) => (
                    <tr
                      key={idx}
                      className={entry.statusType === 'current' ? 'row-current-highlight' : ''}
                    >
                      <td>
                        <strong className="table-fert-name">{entry.fertilizer}</strong>
                      </td>
                      <td>
                        <span className="table-stage-tag">{entry.stage}</span>
                      </td>
                      <td>
                        <span className="table-amount-val">{entry.illustrativeAmount}</span>
                      </td>
                      <td>
                        <span className={`status-pill status-${entry.statusType}`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="schedule-footer-note">
              <span>
                Note: This schedule represents a sample model. Application dates should be calibrated to weather conditions, rainfall, and seedling readiness.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: FERTILIZER SAFETY TIPS */}
        <section className="safety-tips-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-heading">🛡️ Fertilizer Safety & Practical Tips</h2>
              <p className="section-subheading">
                Important precautions to protect crop health, farmer safety, and local soil & water ecosystems
              </p>
            </div>
          </div>

          <div className="safety-cards-grid">
            <div className="safety-tip-card">
              <span className="tip-icon">🚫</span>
              <div className="tip-body">
                <h3>Avoid Excessive Application</h3>
                <p>
                  Applying more fertilizer than crops can absorb causes leaf tip scorch, root burn, increases soil salinity,
                  and creates unnecessary financial loss.
                </p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">📋</span>
              <div className="tip-body">
                <h3>Follow Product Labels & Guidance</h3>
                <p>
                  Always adhere strictly to instructions printed on commercial packaging, state agricultural university
                  schedules, and local agronomic advisories.
                </p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🧪</span>
              <div className="tip-body">
                <h3>Prefer Soil Testing</h3>
                <p>
                  Conduct periodic soil laboratory testing every 2–3 crop cycles to understand your actual available N-P-K
                  reserves and avoid guessing fertilizer needs.
                </p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🎯</span>
              <div className="tip-body">
                <h3>Use Appropriate Application Methods</h3>
                <p>
                  Place phosphorus near the root zone, split nitrogen applications into smaller doses, and avoid broadcasting
                  volatile products onto dry, windy soil.
                </p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🌊</span>
              <div className="tip-body">
                <h3>Prevent Water Source Runoff</h3>
                <p>
                  Never apply chemical fertilizer immediately before forecasted torrential downpours. Maintain vegetated
                  buffer strips near wells, canals, and ponds to stop chemical runoff.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Fertilizer;
