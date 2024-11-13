import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateVolatilitySmile } from '../utils/volatilityCalculations';

interface VolatilityChartProps {
  spotPrice: number;
  riskFreeRate: number;
  timeToExpiry: number;
}

export const VolatilityChart: React.FC<VolatilityChartProps> = ({
  spotPrice,
  riskFreeRate,
  timeToExpiry,
}) => {
  const data = calculateVolatilitySmile(spotPrice, riskFreeRate, timeToExpiry);

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="strike" 
            label={{ value: 'Strike Price', position: 'bottom' }}
            domain={['auto', 'auto']}
          />
          <YAxis
            label={{ value: 'Implied Volatility', angle: -90, position: 'insideLeft' }}
            domain={[0, 'auto']}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-200 p-2 rounded shadow-lg">
                    <p className="text-sm">Strike: ${payload[0].payload.strike}</p>
                    <p className="text-sm">IV: {(payload[0].value * 100).toFixed(2)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="impliedVolatility"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            name="Implied Volatility"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};