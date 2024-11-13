interface OptionData {
  strike: number;
  impliedVolatility: number;
  callPrice: number;
  putPrice: number;
  daysToExpiry: number;
  moneyness: number;
}

const blackScholes = (
  S: number,  // Spot price
  K: number,  // Strike price
  T: number,  // Time to expiry (in years)
  r: number,  // Risk-free rate
  v: number,  // Volatility
  isCall: boolean
): number => {
  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);
  
  const normDist = (x: number): number => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);
    const t = 1.0 / (1.0 + p * x);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1.0 + sign * erf);
  };

  if (isCall) {
    return S * normDist(d1) - K * Math.exp(-r * T) * normDist(d2);
  } else {
    return K * Math.exp(-r * T) * normDist(-d2) - S * normDist(-d1);
  }
};

export const calculateOptionsData = (
  spotPrice: number,
  riskFreeRate: number,
  daysToExpiryArray: number[]
): OptionData[] => {
  const data: OptionData[] = [];
  const strikes = Array.from({ length: 21 }, (_, i) => 
    spotPrice * (0.7 + i * 0.03)
  );

  daysToExpiryArray.forEach(days => {
    const timeToExpiry = days / 365;

    strikes.forEach(strike => {
      const moneyness = Math.log(strike / spotPrice);
      const baseVol = 0.2;
      const smile = 0.1 * Math.pow(moneyness, 2);
      const skew = -0.05 * moneyness;
      const termStructure = 0.02 * Math.log(timeToExpiry);
      const rateEffect = 0.1 * riskFreeRate;

      let impliedVol = baseVol + smile + skew + termStructure + rateEffect;
      impliedVol = Math.max(0.05, Math.min(1, impliedVol));

      const callPrice = blackScholes(spotPrice, strike, timeToExpiry, riskFreeRate, impliedVol, true);
      const putPrice = blackScholes(spotPrice, strike, timeToExpiry, riskFreeRate, impliedVol, false);

      data.push({
        strike,
        impliedVolatility: impliedVol,
        callPrice,
        putPrice,
        daysToExpiry: days,
        moneyness: (strike / spotPrice - 1) * 100 // as percentage
      });
    });
  });

  return data;
};