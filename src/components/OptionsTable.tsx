import React from 'react';
import { calculateOptionsData } from '../utils/optionsCalculations';

interface OptionsTableProps {
  spotPrice: number;
  riskFreeRate: number;
  selectedExpiry: number;
}

export const OptionsTable: React.FC<OptionsTableProps> = ({
  spotPrice,
  riskFreeRate,
  selectedExpiry,
}) => {
  const data = calculateOptionsData(spotPrice, riskFreeRate, [selectedExpiry])
    .sort((a, b) => a.strike - b.strike);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strike</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moneyness</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IV (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Put Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.strike.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.moneyness.toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(row.impliedVolatility * 100).toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.callPrice.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.putPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};