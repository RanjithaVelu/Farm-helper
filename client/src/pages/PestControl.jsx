import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './PestControl.css';

function PestControl() {
  // Form input states
  const [crop, setCrop] = useState('Tomato');
  const [problem, setProblem] = useState('Yellowing leaves');
  const [affectedArea, setAffectedArea] = useState('Part of the field');
  const [severity, setSeverity] = useState('Moderate');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Submitted profile for active guidance display (initialized with defaults so guidance is visible immediately)
  const [submittedReport, setSubmittedReport] = useState({
    crop: 'Tomato',
    problem: 'Yellowing leaves',
    affectedArea: 'Part of the field',
    severity: 'Moderate',
    notes: 'Noticed slight curling and yellow margins on lower leaves.',
    timestamp: 'Loaded with initial sample values',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Local rule-based preliminary guidance generator
  const getPestGuidance = (selectedCrop, selectedProblem, selectedArea, selectedSeverity) => {
    let possibleCauses = [];
    let inspectionSteps = [];
    let ipmSuggestions = [];
    let diagnosticSummary = '';

    switch (selectedProblem) {
      case 'Yellowing leaves':
        possibleCauses = [
          'Sap-sucking insects (Aphids, Whiteflies, Spider Mites)',
          'Nitrogen or micronutrient deficiency (Iron/Magnesium)',
          'Early fungal root rot or over-irrigation stress',
        ];
        inspectionSteps = [
          'Examine the undersides of yellowing leaves with a magnifying glass for tiny moving insects or web-like silk.',
          'Check whether yellowing starts from older bottom leaves (often nutrient deficiency) or young top shoots (often viral or sap-sucking pests).',
          'Inspect the root collar and moisture level 4 inches down to rule out waterlogged roots.',
        ];
        ipmSuggestions = [
          'Prune heavily yellowed or necrotic lower leaves to improve air circulation and prevent fungal spore spread.',
          'Apply an organic neem oil emulsion spray (3–5 ml per litre of water with a drop of liquid soap) during the cool evening.',
          'Conserve natural predators such as ladybird beetles and lacewings which feed on aphids.',
          'If yellowing persists despite pest absence, perform a quick soil or leaf tissue nutrient test.',
        ];
        diagnosticSummary = `Yellowing in ${selectedCrop} is commonly linked to either sap-sucking pest clusters draining chlorophyll or root-zone nutrient uptake imbalance.`;
        break;

      case 'Holes in leaves':
        possibleCauses = [
          'Foliar chewing caterpillars (Fruit Borer, Spodoptera / Armyworm)',
          'Flea beetles or grasshoppers',
          'Snails or slugs during high-humidity periods',
        ];
        inspectionSteps = [
          'Scout the central whorls, leaf margins, and flowering clusters during early morning when caterpillars feed actively.',
          'Look for dark pellet-like insect droppings (frass) on leaf surfaces beneath damaged sections.',
          'Inspect leaf undersides for clusters of tiny spherical moth egg masses.',
        ];
        ipmSuggestions = [
          'Hand-pick and physically remove caterpillars and egg clutches on small acreage plots.',
          'Install pheromone monitoring traps (4–5 traps per acre) to gauge adult moth population surges.',
          'Erect wooden bird perches (T-shaped perches, 15–20 per acre) to encourage insect-eating birds.',
          'For escalating caterpillar populations, consult extension officers regarding biological formulations such as Bacillus thuringiensis (Bt).',
        ];
        diagnosticSummary = `Leaf perforation in ${selectedCrop} indicates chewing pests. Fresh feeding holes with visible frass point to active caterpillar larvae.`;
        break;

      case 'White insects':
        possibleCauses = [
          'Whiteflies (Bemisia tabaci) — key vector for leaf curl virus',
          'Mealybugs (cottony white waxy clusters)',
          'Woolly aphid colonies or white powdery mildew residue',
        ];
        inspectionSteps = [
          'Gently tap upper crop stems to see if tiny white-winged insects fly out and re-settle immediately.',
          'Inspect leaf joints and stem axils for white cottony coatings characteristic of mealybugs.',
          'Check for sticky honeydew secretions or black sooty mold film developing on foliage below.',
        ];
        ipmSuggestions = [
          'Install bright yellow sticky cards (10–15 traps per acre) positioned 10 cm above the crop canopy.',
          'Use a high-pressure water spray jet on small patches to physically dislodge mealybug colonies.',
          'Apply cold-pressed neem seed kernel extract (NSKE 5%) or mineral oil spray to suffocate soft-bodied nymphs.',
          'Eradicate alternative host weeds along field bunds that harbor whitefly colonies between seasons.',
        ];
        diagnosticSummary = `White insects on ${selectedCrop} pose double damage: direct sap depletion and transmission of viral diseases such as Leaf Curl.`;
        break;

      case 'Wilting':
        possibleCauses = [
          'Bacterial wilt (Ralstonia solanacearum) or Fusarium fungal wilt',
          'Root-knot nematodes (Meloidogyne spp.) damaging root hair',
          'Severe root rot caused by stagnant water or soil-borne Pythium',
        ];
        inspectionSteps = [
          'Perform a clean water glass test: cut a lower stem segment and suspend in clear water to observe cloudy bacterial ooze streams (indicates bacterial wilt).',
          'Gently uproot one symptomatic plant to inspect roots for swollen nodules/galls (indicates nematodes) or brown rotting roots.',
          'Note if wilting occurs rapidly during daytime warmth and recovers at night (early symptom of vascular wilt).',
        ];
        ipmSuggestions = [
          'Carefully rogue (uproot) and destroy severely wilted plants; do not compost infected residues in the field.',
          'Disinfect hand tools and footwear with a bleach or potassium permanganate solution before moving between plots.',
          'Avoid furrow over-irrigation which rapidly transports bacterial and fungal pathogens across crop rows.',
          'Plan crop rotation for the next cycle with non-host crops (such as maize, marigold, or green manure pulses).',
        ];
        diagnosticSummary = `Wilting in ${selectedCrop} indicates a vascular block or compromised root system. Immediate containment is vital to protect neighboring plants.`;
        break;

      case 'Spots on leaves':
        possibleCauses = [
          'Early Blight (Alternaria) or Septoria leaf spot',
          'Bacterial spot or bacterial speck',
          'Foliar anthracnose or chemical spray burn',
        ];
        inspectionSteps = [
          'Observe spot geometry: concentric target-like brown rings indicate fungal Alternaria; water-soaked angular dots often point to bacteria.',
          'Verify if spots are surrounded by bright yellow halos (characteristic of fungal leaf spots).',
          'Check whether symptoms started on lowest leaves in contact with humid soil moisture and are moving upward.',
        ];
        ipmSuggestions = [
          'Strip and safely discard the lowest diseased foliage up to 20 cm from the ground to eliminate soil splashback.',
          'Switch to drip irrigation to keep crop foliage completely dry; avoid evening overhead hose watering.',
          'Space plants adequately to encourage sunlight penetration and rapid morning canopy drying.',
          'Apply protective copper-based or bio-fungicide sprays only if weather forecasts indicate continuous wet humidity.',
        ];
        diagnosticSummary = `Foliar spots on ${selectedCrop} typically flourish in humid microclimates. Managing canopy moisture is the most effective cultural barrier.`;
        break;

      default:
        possibleCauses = [
          'Complex multi-pest stress or secondary fungal invasion',
          'Weather injury (hail scorch, heat shock, or frost damage)',
          'Herbicide drift or soil pH imbalance',
        ];
        inspectionSteps = [
          'Compare damaged rows against healthy adjacent crop patches to isolate pattern (localized spot vs field-wide edge effect).',
          'Take close-up photos of leaf top, leaf underside, stem, and root collar in bright natural lighting.',
          'Review chemical applications or fertilizer sprays conducted within the past 7 days.',
        ];
        ipmSuggestions = [
          'Mark symptomatic plants with colored ribbons and monitor changes over the next 48 hours.',
          'Avoid applying broad-spectrum chemical cocktails which eliminate beneficial insects without curing the root problem.',
          'Pack a fresh, whole symptomatic plant specimen (roots + leaves) in a sealed plastic bag and visit the local extension lab.',
        ];
        diagnosticSummary = `Unspecified symptoms on ${selectedCrop} require careful observational recording before any remedial action is taken.`;
    }

    const isCritical = selectedSeverity === 'High' || selectedArea === 'Most of the field';

    return {
      diagnosticSummary,
      possibleCauses,
      inspectionSteps,
      ipmSuggestions,
      isCritical,
    };
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!crop) {
      setErrorMessage('Please select a valid crop.');
      return;
    }

    if (!problem) {
      setErrorMessage('Please select the observed problem/symptom.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setSubmittedReport({
        crop,
        problem,
        affectedArea,
        severity,
        notes: notes.trim(),
        timestamp: 'Evaluated just now',
      });
    }, 400);
  };

  const guidance = getPestGuidance(
    submittedReport.crop,
    submittedReport.problem,
    submittedReport.affectedArea,
    submittedReport.severity
  );

  return (
    <div className="pest-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="pest-main-content">
        
        {/* Page Header */}
        <header className="pest-header">
          <div className="header-text-group">
            <span className="pest-crumb">Dashboard / Plant Health & Protection</span>
            <h1 className="pest-title">Pest Control</h1>
            <p className="pest-subtitle">
              Identify common crop problems and explore responsible pest-management guidance.
            </p>
          </div>

          <div className="demo-mode-pill">
            <span className="demo-dot"></span>
            <span>Educational Demonstration Mode</span>
          </div>
        </header>

        {/* Educational Disclaimer Banner */}
        <div className="disclaimer-banner" role="alert">
          <span className="disclaimer-icon">⚠️</span>
          <div className="disclaimer-content">
            <strong>Preliminary Demonstration Guidance Only:</strong>
            <p>
              This tool provides rule-based educational guidance for college project demonstration purposes.
              It does NOT utilize a real artificial intelligence model, computer vision diagnosis, or lab testing.
              Visual crop symptoms alone cannot definitively identify a specific pest or pathogen.
              Always cross-verify plant health observations with your nearest Government Agricultural Extension Office or Krishi Vigyan Kendra (KVK).
            </p>
          </div>
        </div>

        {/* WORKSPACE: Form (Left) & Guidance Results (Right) */}
        <div className="pest-workspace-grid">
          
          {/* SECTION 1: Crop and Symptom Form */}
          <section className="pest-form-card">
            <div className="card-header-bar">
              <span className="step-tag">Step 1</span>
              <h2>Crop & Symptom Form</h2>
              <p>Record your observations to retrieve relevant preliminary management guidance</p>
            </div>

            {errorMessage && (
              <div className="form-error-alert" role="alert">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="pest-input-form" noValidate>
              {/* Crop Selector */}
              <div className="form-group">
                <label htmlFor="pest-crop-select">Crop</label>
                <select
                  id="pest-crop-select"
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

              {/* Observed Problem */}
              <div className="form-group">
                <label htmlFor="pest-problem-select">Observed Problem</label>
                <select
                  id="pest-problem-select"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="form-control"
                >
                  <option value="Yellowing leaves">Yellowing leaves</option>
                  <option value="Holes in leaves">Holes in leaves</option>
                  <option value="White insects">White insects</option>
                  <option value="Wilting">Wilting</option>
                  <option value="Spots on leaves">Spots on leaves</option>
                  <option value="Other">Other (Complex / mixed symptoms)</option>
                </select>
              </div>

              {/* Affected Area & Severity (2-column layout) */}
              <div className="form-row-duo">
                <div className="form-group">
                  <label htmlFor="affected-area-select">Affected Area</label>
                  <select
                    id="affected-area-select"
                    value={affectedArea}
                    onChange={(e) => setAffectedArea(e.target.value)}
                    className="form-control"
                  >
                    <option value="A few plants">A few plants (Localized)</option>
                    <option value="Part of the field">Part of the field (Clustered)</option>
                    <option value="Most of the field">Most of the field (Widespread)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="severity-select">Severity Level</label>
                  <select
                    id="severity-select"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="form-control"
                  >
                    <option value="Low">Low (Mild stress)</option>
                    <option value="Moderate">Moderate (Active spread)</option>
                    <option value="High">High (Severe damage)</option>
                  </select>
                </div>
              </div>

              {/* Optional Notes */}
              <div className="form-group">
                <label htmlFor="pest-notes">Optional Field Notes</label>
                <textarea
                  id="pest-notes"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Started after recent rains, mostly on southern border plants..."
                  className="form-control textarea-control"
                />
                <span className="field-hint">Record recent weather, watering history, or unusual observations</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-pest-btn"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <span>Evaluating Guidance...</span>
                ) : (
                  <>
                    <span>Get Pest Guidance</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* SECTION 2: Interactive Guidance Results */}
          <section className="pest-results-panel">
            <div className="results-head-card">
              <div className="results-head-text">
                <span className="step-tag green-tag">Step 2</span>
                <h2>Integrated Pest Management (IPM) Guidance</h2>
                <p>Preliminary advisory for {submittedReport.crop} experiencing {submittedReport.problem.toLowerCase()}</p>
              </div>

              <span className="eval-time-badge">{submittedReport.timestamp}</span>
            </div>

            {/* Submitted Selections Summary Chip Bar */}
            <div className="submitted-profile-bar">
              <div className="profile-chip">
                <span className="chip-label">Crop:</span>
                <strong className="chip-value">{submittedReport.crop}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Symptom:</span>
                <strong className="chip-value">{submittedReport.problem}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Spread:</span>
                <strong className="chip-value">{submittedReport.affectedArea}</strong>
              </div>
              <div className="profile-chip">
                <span className="chip-label">Severity:</span>
                <strong className={`chip-value severity-${submittedReport.severity.toLowerCase()}`}>
                  {submittedReport.severity}
                </strong>
              </div>
            </div>

            {/* CRITICAL WARNING BANNER (Shown prominently when severity is High or Most of the field is affected) */}
            {guidance.isCritical && (
              <div className="critical-alert-box" role="alert">
                <div className="critical-header">
                  <span className="critical-icon">🚨</span>
                  <strong>PROMPT AGRICULTURAL EXPERT CONSULTATION ADVISED</strong>
                </div>
                <p>
                  You indicated that <strong>{submittedReport.affectedArea.toLowerCase()}</strong> is showing{' '}
                  <strong>{submittedReport.severity.toLowerCase()} severity</strong> symptoms. When pest damage spreads
                  rapidly or threatens large acreage, self-treatment without confirmed laboratory diagnosis risks
                  irreversible crop yield loss. Please contact your local District Agricultural Officer, Krishi Vigyan
                  Kendra (KVK) scientist, or University Extension Specialist immediately with a fresh whole-plant sample.
                </p>
              </div>
            )}

            {/* Diagnostic Summary Callout */}
            <div className="diagnostic-summary-box">
              <span className="summary-bulb">💡</span>
              <div>
                <strong>Preliminary Symptom Overview:</strong>
                <p>{guidance.diagnosticSummary}</p>
                <span className="symptom-disclaimer">
                  * Note: Multiple pests, bacterial pathogens, or nutrient imbalances can cause identical visual symptoms.
                </span>
              </div>
            </div>

            {/* Potential Causes & Inspection Checklist (2 Columns) */}
            <div className="guidance-detail-grid">
              
              {/* Card A: Relevant Possible Causes */}
              <div className="guidance-card">
                <div className="card-title-group">
                  <span className="guidance-card-badge badge-rose">Diagnosis</span>
                  <h3>Relevant Possible Causes</h3>
                </div>
                <p className="card-sub-description">Common insect categories or fungal/physiological factors matching this symptom:</p>

                <ul className="guidance-list">
                  {guidance.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="list-item">
                      <span className="item-bullet">🔍</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card B: Practical Inspection Steps */}
              <div className="guidance-card">
                <div className="card-title-group">
                  <span className="guidance-card-badge badge-blue">Field Scouting</span>
                  <h3>Practical Inspection Steps</h3>
                </div>
                <p className="card-sub-description">Actionable field checks before applying any treatment:</p>

                <ul className="guidance-list">
                  {guidance.inspectionSteps.map((step, idx) => (
                    <li key={idx} className="list-item">
                      <span className="item-bullet">📋</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card C: Responsible IPM Suggestions */}
            <div className="ipm-action-card">
              <div className="card-title-group">
                <span className="guidance-card-badge badge-green">Management Strategy</span>
                <h3>Responsible Integrated Pest Management (IPM) Suggestions</h3>
              </div>
              <p className="card-sub-description">Eco-friendly cultural, mechanical, and biological controls to minimize chemical dependency:</p>

              <div className="ipm-suggestions-grid">
                {guidance.ipmSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="ipm-suggestion-pill">
                    <span className="ipm-num">{idx + 1}</span>
                    <p className="ipm-text">{suggestion}</p>
                  </div>
                ))}
              </div>

              {submittedReport.notes && (
                <div className="recorded-notes-box">
                  <strong>Recorded Farmer Notes:</strong> "{submittedReport.notes}"
                </div>
              )}
            </div>

          </section>

        </div>

        {/* SECTION 3: Common Crop Problems (Sample Educational Cards) */}
        <section className="common-problems-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-heading">🌾 Common Crop Problems Reference</h2>
              <p className="section-subheading">
                Educational reference cards for widespread pests and fungal diseases in major Indian crops
              </p>
            </div>
            <span className="reference-tag">Educational Reference</span>
          </div>

          <div className="problem-cards-grid">
            {/* Card 1: Tomato */}
            <div className="problem-card">
              <div className="problem-card-top">
                <span className="crop-pill">🍅 Tomato</span>
                <span className="pest-category-pill">Fungal & Insect Complex</span>
              </div>
              <h3 className="problem-name">Early Blight & Fruit Borer</h3>

              <div className="problem-detail-item">
                <span className="detail-label">Example Symptom:</span>
                <p className="detail-val">Brown concentric target-like rings on lower leaves; circular entry boreholes near tomato stem ends.</p>
              </div>

              <div className="problem-detail-item">
                <span className="detail-label">Possible Cause / Pest:</span>
                <p className="detail-val"><em>Alternaria solani</em> (fungus) &amp; <em>Helicoverpa armigera</em> (caterpillar larvae).</p>
              </div>

              <div className="problem-action-box">
                <span className="action-tag">Safe First Step:</span>
                <p>Prune lowest foliage touching wet soil to eliminate splashback; install 5 pheromone traps per acre for early borer monitoring.</p>
              </div>
            </div>

            {/* Card 2: Rice / Paddy */}
            <div className="problem-card">
              <div className="problem-card-top">
                <span className="crop-pill">🌾 Rice / Paddy</span>
                <span className="pest-category-pill">Stem Borer &amp; Blast</span>
              </div>
              <h3 className="problem-name">Yellow Stem Borer &amp; Leaf Blast</h3>

              <div className="problem-detail-item">
                <span className="detail-label">Example Symptom:</span>
                <p className="detail-val">"Dead hearts" (central shoots drying out) during tillering; spindle-shaped eye lesions with grey centers on leaves.</p>
              </div>

              <div className="problem-detail-item">
                <span className="detail-label">Possible Cause / Pest:</span>
                <p className="detail-val"><em>Scirpophaga incertulas</em> (Stem Borer) &amp; <em>Magnaporthe oryzae</em> (Blast fungus).</p>
              </div>

              <div className="problem-action-box">
                <span className="action-tag">Safe First Step:</span>
                <p>Clip seedling leaf tips before transplanting to remove moth egg masses; avoid excess split-urea application during cloudy weather.</p>
              </div>
            </div>

            {/* Card 3: Maize */}
            <div className="problem-card">
              <div className="problem-card-top">
                <span className="crop-pill">🌽 Maize</span>
                <span className="pest-category-pill">Invasive Lepidoptera</span>
              </div>
              <h3 className="problem-name">Fall Armyworm (FAW)</h3>

              <div className="problem-detail-item">
                <span className="detail-label">Example Symptom:</span>
                <p className="detail-val">Ragged, windowpaned feeding holes on leaves; thick sawdust-like frass accumulating deep inside central whorls.</p>
              </div>

              <div className="problem-detail-item">
                <span className="detail-label">Possible Cause / Pest:</span>
                <p className="detail-val"><em>Spodoptera frugiperda</em> (Fall Armyworm caterpillar).</p>
              </div>

              <div className="problem-action-box">
                <span className="action-tag">Safe First Step:</span>
                <p>Scout 20 consecutive plants across 5 field quadrants; apply dry fine sand or neem cake dust into central whorls to physically deter larvae.</p>
              </div>
            </div>

            {/* Card 4: Tomato Whitefly */}
            <div className="problem-card">
              <div className="problem-card-top">
                <span className="crop-pill">🍅 Tomato</span>
                <span className="pest-category-pill">Viral Vector Insect</span>
              </div>
              <h3 className="problem-name">Whitefly &amp; Leaf Curl Virus</h3>

              <div className="problem-detail-item">
                <span className="detail-label">Example Symptom:</span>
                <p className="detail-val">Upward leaf curling, thick leathery texture, severe plant stunting, and tiny fluttering white flies on undersides.</p>
              </div>

              <div className="problem-detail-item">
                <span className="detail-label">Possible Cause / Pest:</span>
                <p className="detail-val"><em>Bemisia tabaci</em> (Whitefly vectoring Tomato Leaf Curl Virus).</p>
              </div>

              <div className="problem-action-box">
                <span className="action-tag">Safe First Step:</span>
                <p>Erect yellow sticky cards 10 cm above the crop canopy; remove non-crop weeds along bunds that shelter whiteflies between seasons.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Safe Pest-Management Tips */}
        <section className="safety-tips-section">
          <div className="section-head-bar">
            <div>
              <h2 className="section-heading">🛡️ Safe Pest-Management Principles</h2>
              <p className="section-subheading">
                Responsible, health-conscious safety protocols to protect workers, livestock, and ecosystems
              </p>
            </div>
          </div>

          <div className="safety-cards-grid">
            <div className="safety-tip-card">
              <span className="tip-icon">🔎</span>
              <div className="tip-body">
                <h3>Inspect Plants Regularly</h3>
                <p>Walk the field at least twice weekly. Record symptom changes and monitor whether problems remain isolated or spread.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🍃</span>
              <div className="tip-body">
                <h3>Check Both Sides of Leaves</h3>
                <p>Most pests (aphids, mites, whitefly eggs) conceal themselves on leaf undersides and stem axils. Always turn leaves over.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">✂️</span>
              <div className="tip-body">
                <h3>Selective Sanitary Pruning</h3>
                <p>Remove heavily damaged or sporulating leaves only when appropriate. Safely dispose of them away from the field perimeter.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🚫</span>
              <div className="tip-body">
                <h3>Avoid Unnecessary Spraying</h3>
                <p>Never spray preventative chemical pesticides without confirmed economic threshold damage. Over-spraying breeds resistant super-pests.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🏷️</span>
              <div className="tip-body">
                <h3>Strict Label & Safety Compliance</h3>
                <p>If authorized chemical intervention is deemed necessary, follow the product label, wear personal protective equipment, and obey pre-harvest waiting periods.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">🔒</span>
              <div className="tip-body">
                <h3>Safe Storage & Water Protection</h3>
                <p>Lock all chemicals securely away from children, livestock, and food stores. Never wash or rinse sprayers near wells, borewells, or irrigation canals.</p>
              </div>
            </div>

            <div className="safety-tip-card">
              <span className="tip-icon">👨‍🔬</span>
              <div className="tip-body">
                <h3>Seek Qualified Local Advice</h3>
                <p>When unexpected symptoms escalate or fail to respond to cultural controls, consult certified agricultural extension scientists without delay.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default PestControl;
