import React from 'react';
import { Settings, RefreshCw } from 'lucide-react';

interface InputPanelProps {
  spotPrice: number;
  setSpotPrice: (value: number) => void;
  riskFreeRate: number;
  setRiskFreeRate: (value: number) => void;
  timeToExpiry: number;
  setTimeToExpiry: (value: number) => void;
  onReset: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  spotPrice,
  setSpotPrice,
  riskFreeRate,
  setRiskFreeRate,
  timeToExpiry,
  setTimeToExpiry,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Parameters
        </h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spot Price ($)
          </label>
          <input
            type="number"
            value={spotPrice}
            onChange={(e) => setSpotPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            step="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk-Free Rate (%)
          </label>
          <input
            type="number"
            value={riskFreeRate * 100}
            onChange={(e) => setRiskFreeRate(Number(e.target.value) / 100)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time to Expiry (Years)
          </label>
          <input
            type="number"
            value={timeToExpiry}
            onChange={(e) => setTimeToExpiry(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};