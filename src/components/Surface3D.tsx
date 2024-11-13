import React from 'react';
import Plot from 'react-plotly.js';
import { calculateOptionsData } from '../utils/optionsCalculations';

interface Surface3DProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const Surface3D: React.FC<Surface3DProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const daysToExpiryArray = [30, 60, 90, 120, 150, 180];
  const data = calculateOptionsData(spotPrice, riskFreeRate, daysToExpiryArray);

  // Prepare data for 3D surface
  const x = Array.from(new Set(data.map(d => d.moneyness))).sort((a, b) => a - b);
  const y = Array.from(new Set(data.map(d => d.daysToExpiry))).sort((a, b) => a - b);
  const z = Array(y.length).fill(0).map(() => Array(x.length).fill(0));

  // Fill z matrix with implied volatilities
  data.forEach(d => {
    const xIndex = x.indexOf(d.moneyness);
    const yIndex = y.indexOf(d.daysToExpiry);
    if (xIndex !== -1 && yIndex !== -1) {
      z[yIndex][xIndex] = d.impliedVolatility * 100; // Convert to percentage
    }
  });

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
      <Plot
        data={[
          {
            type: 'surface',
            x: x,
            y: y,
            z: z,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
              title: 'IV (%)',
              thickness: 20,
              len: 0.5,
            },
          },
        ]}
        layout={{
          title: '3D Volatility Surface',
          autosize: true,
          scene: {
            xaxis: { title: 'Moneyness (%)' },
            yaxis: { title: 'Days to Expiry' },
            zaxis: { title: 'Implied Volatility (%)' },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.5 },
            },
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 30,
          },
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};