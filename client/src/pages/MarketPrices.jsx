import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import './MarketPrices.css';

function MarketPrices() {
  // Sample demonstration dataset (20 entries across 5 crops and 4 markets in Tamil Nadu)
  const allSampleData = [
    // Tomato
    { id: 1, crop: 'Tomato', icon: '🍅', market: 'Chennai (Koyambedu)', minPrice: 2200, maxPrice: 2800, modalPrice: 2550, date: '18 Oct 2026' },
    { id: 2, crop: 'Tomato', icon: '🍅', market: 'Coimbatore', minPrice: 2100, maxPrice: 2600, modalPrice: 2400, date: '18 Oct 2026' },
    { id: 3, crop: 'Tomato', icon: '🍅', market: 'Tiruvannamalai', minPrice: 1950, maxPrice: 2450, modalPrice: 2250, date: '18 Oct 2026' },
    { id: 4, crop: 'Tomato', icon: '🍅', market: 'Madurai', minPrice: 2300, maxPrice: 2900, modalPrice: 2650, date: '18 Oct 2026' },

    // Rice
    { id: 5, crop: 'Rice', icon: '🌾', market: 'Chennai (Koyambedu)', minPrice: 3200, maxPrice: 3800, modalPrice: 3550, date: '18 Oct 2026' },
    { id: 6, crop: 'Rice', icon: '🌾', market: 'Coimbatore', minPrice: 3150, maxPrice: 3700, modalPrice: 3450, date: '18 Oct 2026' },
    { id: 7, crop: 'Rice', icon: '🌾', market: 'Tiruvannamalai', minPrice: 2950, maxPrice: 3500, modalPrice: 3300, date: '18 Oct 2026' },
    { id: 8, crop: 'Rice', icon: '🌾', market: 'Madurai', minPrice: 3100, maxPrice: 3650, modalPrice: 3400, date: '18 Oct 2026' },

    // Maize
    { id: 9, crop: 'Maize', icon: '🌽', market: 'Chennai (Koyambedu)', minPrice: 2150, maxPrice: 2550, modalPrice: 2380, date: '18 Oct 2026' },
    { id: 10, crop: 'Maize', icon: '🌽', market: 'Coimbatore', minPrice: 2200, maxPrice: 2600, modalPrice: 2450, date: '18 Oct 2026' },
    { id: 11, crop: 'Maize', icon: '🌽', market: 'Tiruvannamalai', minPrice: 2050, maxPrice: 2400, modalPrice: 2220, date: '18 Oct 2026' },
    { id: 12, crop: 'Maize', icon: '🌽', market: 'Madurai', minPrice: 2100, maxPrice: 2500, modalPrice: 2350, date: '18 Oct 2026' },

    // Onion
    { id: 13, crop: 'Onion', icon: '🧅', market: 'Chennai (Koyambedu)', minPrice: 2800, maxPrice: 3600, modalPrice: 3250, date: '18 Oct 2026' },
    { id: 14, crop: 'Onion', icon: '🧅', market: 'Coimbatore', minPrice: 2700, maxPrice: 3500, modalPrice: 3150, date: '18 Oct 2026' },
    { id: 15, crop: 'Onion', icon: '🧅', market: 'Tiruvannamalai', minPrice: 2500, maxPrice: 3200, modalPrice: 2900, date: '18 Oct 2026' },
    { id: 16, crop: 'Onion', icon: '🧅', market: 'Madurai', minPrice: 2750, maxPrice: 3450, modalPrice: 3100, date: '18 Oct 2026' },

    // Groundnut
    { id: 17, crop: 'Groundnut', icon: '🥜', market: 'Chennai (Koyambedu)', minPrice: 6200, maxPrice: 7100, modalPrice: 6700, date: '18 Oct 2026' },
    { id: 18, crop: 'Groundnut', icon: '🥜', market: 'Coimbatore', minPrice: 6400, maxPrice: 7300, modalPrice: 6900, date: '18 Oct 2026' },
    { id: 19, crop: 'Groundnut', icon: '🥜', market: 'Tiruvannamalai', minPrice: 6100, maxPrice: 6900, modalPrice: 6550, date: '18 Oct 2026' },
    { id: 20, crop: 'Groundnut', icon: '🥜', market: 'Madurai', minPrice: 6300, maxPrice: 7200, modalPrice: 6800, date: '18 Oct 2026' },
  ];

  // Filter states
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedMarket, setSelectedMarket] = useState('All Markets');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Crop selected specifically for the visual horizontal comparison bar chart
  const [comparisonCrop, setComparisonCrop] = useState('Tomato');

  // Filtered dataset
  const filteredData = useMemo(() => {
    return allSampleData.filter((item) => {
      const matchesCrop =
        selectedCrop === 'All Crops' || item.crop.toLowerCase() === selectedCrop.toLowerCase();
      const matchesMarket =
        selectedMarket === 'All Markets' ||
        item.market.toLowerCase().includes(selectedMarket.toLowerCase());
      const matchesKeyword =
        !searchKeyword ||
        item.crop.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.market.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchesCrop && matchesMarket && matchesKeyword;
    });
  }, [selectedCrop, selectedMarket, searchKeyword]);

  // Dynamic calculations from filtered data
  const stats = useMemo(() => {
    const count = filteredData.length;
    if (count === 0) {
      return { count: 0, lowest: 'N/A', highest: 'N/A', average: 'N/A' };
    }

    const minPrices = filteredData.map((d) => d.minPrice);
    const maxPrices = filteredData.map((d) => d.maxPrice);
    const modalPrices = filteredData.map((d) => d.modalPrice);

    const lowest = Math.min(...minPrices);
    const highest = Math.max(...maxPrices);
    const average = Math.round(modalPrices.reduce((a, b) => a + b, 0) / count);

    return {
      count,
      lowest: `₹${lowest.toLocaleString('en-IN')}`,
      highest: `₹${highest.toLocaleString('en-IN')}`,
      average: `₹${average.toLocaleString('en-IN')}`,
    };
  }, [filteredData]);

  // Data for the visual horizontal bar chart comparison
  const comparisonData = useMemo(() => {
    const list = allSampleData.filter((d) => d.crop === comparisonCrop);
    if (list.length === 0) return [];

    const maxModalInSet = Math.max(...list.map((d) => d.modalPrice));

    return list.map((item) => ({
      ...item,
      percentage: Math.round((item.modalPrice / maxModalInSet) * 100),
    }));
  }, [comparisonCrop]);

  const handleResetFilters = () => {
    setSelectedCrop('All Crops');
    setSelectedMarket('All Markets');
    setSearchKeyword('');
  };

  return (
    <div className="market-page-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="market-main-content">
        
        {/* Page Header */}
        <header className="market-header">
          <div className="header-text-group">
            <span className="market-crumb">Dashboard / Commodity Economics</span>
            <h1 className="market-title">Market Prices</h1>
            <p className="market-subtitle">
              Compare sample crop prices and explore market information before planning your sale.
            </p>
          </div>

          <div className="sample-badge-pill" role="status">
            <span className="sample-badge-dot"></span>
            <span>Sample Demonstration Data</span>
          </div>
        </header>

        {/* Clear Demonstration Data Notice Banner */}
        <div className="market-disclaimer-banner" role="alert">
          <span className="disclaimer-icon">⚠️</span>
          <div className="disclaimer-text">
            <strong>Demonstration Notice:</strong>
            <p>
              The prices shown on this page are sample illustrative values for project demonstration only.
              They are NOT live, verified, or official real-time Mandi market rates.
              Always consult official APMC bulletins, Agmarknet, or local Mandi commission agents before negotiating farm sales.
            </p>
          </div>
        </div>

        {/* SECTION 2: Search and Filter Section */}
        <section className="market-filter-card">
          <div className="filter-header-row">
            <div>
              <h2 className="filter-title">🔍 Search &amp; Filter Market Data</h2>
              <p className="filter-subtitle">Filter sample rates by crop, regional market center, or keyword</p>
            </div>
            <span className="unit-indicator">Price Unit: <strong>₹ per quintal (100 kg)</strong></span>
          </div>

          <div className="filter-controls-grid">
            {/* Crop Selector */}
            <div className="filter-group">
              <label htmlFor="crop-filter">Crop</label>
              <select
                id="crop-filter"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="filter-select"
              >
                <option value="All Crops">All Crops</option>
                <option value="Tomato">Tomato</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Onion">Onion</option>
                <option value="Groundnut">Groundnut</option>
              </select>
            </div>

            {/* Market / Location Selector */}
            <div className="filter-group">
              <label htmlFor="market-filter">Market / Location</label>
              <select
                id="market-filter"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="filter-select"
              >
                <option value="All Markets">All Markets</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruvannamalai">Tiruvannamalai</option>
                <option value="Madurai">Madurai</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="filter-group">
              <label htmlFor="search-input">Search Keyword</label>
              <input
                id="search-input"
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Type crop or mandi name..."
                className="filter-input"
              />
            </div>

            {/* Reset Button */}
            <div className="filter-group filter-action-group">
              <label>&nbsp;</label>
              <button
                type="button"
                className="reset-filter-btn"
                onClick={handleResetFilters}
                title="Reset all filters to default"
              >
                🔄 Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dynamic Price Overview Cards */}
        <section className="overview-cards-grid">
          <div className="overview-stat-card">
            <div className="stat-icon-bubble bubble-green">📊</div>
            <div className="stat-content">
              <span className="stat-label">Entries Displayed</span>
              <strong className="stat-number">{stats.count}</strong>
              <span className="stat-note">Matching current filters</span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon-bubble bubble-teal">📉</div>
            <div className="stat-content">
              <span className="stat-label">Lowest Sample Price</span>
              <strong className="stat-number text-teal">{stats.lowest}</strong>
              <span className="stat-note">Sample minimum in filtered set</span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon-bubble bubble-rose">📈</div>
            <div className="stat-content">
              <span className="stat-label">Highest Sample Price</span>
              <strong className="stat-number text-rose">{stats.highest}</strong>
              <span className="stat-note">Sample maximum in filtered set</span>
            </div>
          </div>

          <div className="overview-stat-card">
            <div className="stat-icon-bubble bubble-amber">⚖️</div>
            <div className="stat-content">
              <span className="stat-label">Average Sample Modal</span>
              <strong className="stat-number text-amber">{stats.average}</strong>
              <span className="stat-note">Average wholesale rate</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: Visual Price Comparison Interaction (CSS Horizontal Bars) */}
        <section className="comparison-visual-card">
          <div className="comparison-head-row">
            <div>
              <span className="section-mini-tag">Visual Comparison</span>
              <h2 className="comparison-title">Relative Price Comparison Across Mandis</h2>
              <p className="comparison-sub">Compare relative modal rates across markets for a selected crop</p>
            </div>

            <div className="comparison-select-box">
              <label htmlFor="comparison-crop-select">Select Crop to Compare:</label>
              <select
                id="comparison-crop-select"
                value={comparisonCrop}
                onChange={(e) => setComparisonCrop(e.target.value)}
                className="comparison-select"
              >
                <option value="Tomato">🍅 Tomato</option>
                <option value="Rice">🌾 Rice</option>
                <option value="Maize">🌽 Maize</option>
                <option value="Onion">🧅 Onion</option>
                <option value="Groundnut">🥜 Groundnut</option>
              </select>
            </div>
          </div>

          <div className="bars-list">
            {comparisonData.map((item) => (
              <div key={item.id} className="bar-row">
                <div className="bar-label-group">
                  <span className="bar-market-name">{item.market}</span>
                  <span className="bar-range-text">Range: ₹{item.minPrice} - ₹{item.maxPrice}</span>
                </div>

                <div className="bar-visual-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${item.percentage}%` }}
                    title={`Modal rate: ₹${item.modalPrice}/q`}
                  >
                    <span className="bar-fill-text">₹{item.modalPrice} / q</span>
                  </div>
                </div>

                <div className="bar-value-pill">
                  <strong>₹{item.modalPrice.toLocaleString('en-IN')}</strong>
                  <span className="bar-unit">/ q</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Market Price Comparison Table */}
        <section className="table-section">
          <div className="table-head-bar">
            <div>
              <h2 className="table-section-title">📋 Sample Market Price Comparison Table</h2>
              <p className="table-section-sub">
                Wholesale commodity rates from sample regional APMC mandis (Demonstration data)
              </p>
            </div>
            <span className="table-count-badge">
              Showing {filteredData.length} of {allSampleData.length} entries
            </span>
          </div>

          <div className="table-card">
            {filteredData.length === 0 ? (
              <div className="no-results-box">
                <span className="no-results-icon">🔎</span>
                <h3>No Matching Crop or Market Entries Found</h3>
                <p>
                  We couldn't find any sample entries matching your current filter selections:
                  <strong> Crop: "{selectedCrop}", Market: "{selectedMarket}", Keyword: "{searchKeyword}"</strong>.
                </p>
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={handleResetFilters}
                >
                  Clear Filters &amp; Show All Data
                </button>
              </div>
            ) : (
              <div className="table-scroll-wrapper">
                <table className="market-table">
                  <thead>
                    <tr>
                      <th>Crop Name</th>
                      <th>Market / Location</th>
                      <th>Sample Min Price (₹/q)</th>
                      <th>Sample Max Price (₹/q)</th>
                      <th>Sample Modal Price (₹/q)</th>
                      <th>Sample Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div className="crop-cell">
                            <span className="crop-cell-icon">{row.icon}</span>
                            <strong className="crop-cell-name">{row.crop}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="market-location-tag">📍 {row.market}</span>
                        </td>
                        <td>
                          <span className="price-tag min-price">₹{row.minPrice.toLocaleString('en-IN')}</span>
                        </td>
                        <td>
                          <span className="price-tag max-price">₹{row.maxPrice.toLocaleString('en-IN')}</span>
                        </td>
                        <td>
                          <strong className="price-tag modal-price">₹{row.modalPrice.toLocaleString('en-IN')}</strong>
                        </td>
                        <td>
                          <span className="date-tag">{row.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="table-footer-legend">
              <span>* Note: All prices are strictly demonstration sample values in ₹ per quintal (1 quintal = 100 kg).</span>
            </div>
          </div>
        </section>

        {/* SECTION 6: Farmer Tips Section */}
        <section className="farmer-tips-section">
          <div className="tips-head-bar">
            <div>
              <h2 className="tips-heading">💡 Smart Commodity Selling &amp; Market Tips</h2>
              <p className="tips-subheading">
                Essential economic considerations before transporting and selling your harvest
              </p>
            </div>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🗺️</span>
              <div className="tip-content">
                <h3>Compare Nearby Mandis</h3>
                <p>
                  Wholesale demand fluctuates daily between neighboring districts. Checking multiple mandis can reveal significant price differences.
                </p>
              </div>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🚚</span>
              <div className="tip-content">
                <h3>Factor in Transport &amp; Quality</h3>
                <p>
                  Higher headline prices in distant cities may be offset by freight expenses, unloading fees, and transit spoilage. Always calculate net margins.
                </p>
              </div>
            </div>

            <div className="tip-card">
              <span className="tip-icon">📞</span>
              <div className="tip-content">
                <h3>Confirm Current Prices First</h3>
                <p>
                  Before loading trucks, call trusted APMC commission agents or check official government portals (such as Agmarknet) for morning arrivals and modal rates.
                </p>
              </div>
            </div>

            <div className="tip-card">
              <span className="tip-icon">⚠️</span>
              <div className="tip-content">
                <h3>Demonstration Data Notice</h3>
                <p>
                  Do not make commercial commitments or financial agreements based on sample educational prices. Use verified real-time rates from market secretaries.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default MarketPrices;
