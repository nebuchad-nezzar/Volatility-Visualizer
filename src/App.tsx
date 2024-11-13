import React, { useState } from 'react';
import { TrendingUp, Table2, Box } from 'lucide-react';
import { VolatilityChart } from './components/VolatilityChart';
import { Surface3D } from './components/Surface3D';
import { OptionsTable } from './components/OptionsTable';
import { InputPanel } from './components/InputPanel';

function App() {
  const [spotPrice, setSpotPrice] = useState(100);
  const [riskFreeRate, setRiskFreeRate] = useState(0.05);
  const [timeToExpiry, setTimeToExpiry] = useState(1);
  const [selectedExpiry, setSelectedExpiry] = useState(30);
  const [activeTab, setActiveTab] = useState<'surface' | 'smile' | 'table'>('surface');

  const handleReset = () => {
    setSpotPrice(100);
    setRiskFreeRate(0.05);
    setTimeToExpiry(1);
    setSelectedExpiry(30);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Options Volatility Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <InputPanel
            spotPrice={spotPrice}
            setSpotPrice={setSpotPrice}
            riskFreeRate={riskFreeRate}
            setRiskFreeRate={setRiskFreeRate}
            timeToExpiry={timeToExpiry}
            setTimeToExpiry={setTimeToExpiry}
            onReset={handleReset}
          />

          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('surface')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'surface'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Box className="w-4 h-4" />
                3D Surface
              </button>
              <button
                onClick={() => setActiveTab('smile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'smile'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Volatility Smile
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'table'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Table2 className="w-4 h-4" />
                Options Chain
              </button>
            </div>

            {activeTab === 'surface' && (
              <Surface3D
                spotPrice={spotPrice}
                riskFreeRate={riskFreeRate}
              />
            )}

            {activeTab === 'smile' && (
              <VolatilityChart
                spotPrice={spotPrice}
                riskFreeRate={riskFreeRate}
                timeToExpiry={timeToExpiry}
              />
            )}

            {activeTab === 'table' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">
                    Days to Expiry:
                  </label>
                  <select
                    value={selectedExpiry}
                    onChange={(e) => setSelectedExpiry(Number(e.target.value))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {[30, 60, 90, 120, 150, 180].map((days) => (
                      <option key={days} value={days}>
                        {days} days
                      </option>
                    ))}
                  </select>
                </div>
                <OptionsTable
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                  selectedExpiry={selectedExpiry}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About Options Volatility</h2>
            <p className="text-gray-600 leading-relaxed">
              This tool visualizes the relationship between implied volatility, strike prices, and time to expiry in options markets. 
              The 3D surface shows how volatility varies across different strike prices and expiration dates, while the volatility smile 
              displays the characteristic "smile" or "smirk" pattern at a specific expiration. The options chain provides detailed pricing 
              for both calls and puts, incorporating the Black-Scholes model with our volatility surface.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Options Volatility Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;