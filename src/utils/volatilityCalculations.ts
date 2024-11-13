interface DataPoint {
  strike: number;
  impliedVolatility: number;
}

export const calculateVolatilitySmile = (
  spotPrice: number,
  riskFreeRate: number,
  timeToExpiry: number
): DataPoint[] => {
  const strikes = Array.from({ length: 41 }, (_, i) => 
    spotPrice * (0.5 + i * 0.05)
  );

  return strikes.map(strike => {
    // Simplified volatility smile calculation
    // In reality, this would use market data or a more complex model
    const moneyness = Math.log(strike / spotPrice);
    const baseVol = 0.2; // Base volatility of 20%
    const smile = 0.1 * Math.pow(moneyness, 2); // Quadratic smile component
    const skew = -0.05 * moneyness; // Linear skew component
    const termStructure = 0.02 * Math.log(timeToExpiry); // Term structure effect
    const rateEffect = 0.1 * riskFreeRate; // Interest rate effect

    let impliedVol = baseVol + smile + skew + termStructure + rateEffect;
    impliedVol = Math.max(0.05, Math.min(1, impliedVol)); // Bound between 5% and 100%

    return {
      strike,
      impliedVolatility: impliedVol
    };
  });
};