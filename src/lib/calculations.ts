// Energy calculation logic

/**
 * Calculates Monthly Consumption in kWh.
 * E(kWh) = (P(W) * t(h)) / 1000
 * @param powerWatts Power rating of the appliance in Watts
 * @param hoursPerDay Hours used per day
 * @param daysPerMonth Number of days in the month (default 30)
 * @returns Monthly consumption in kWh
 */
export function calculateConsumption(powerWatts: number, hoursPerDay: number, daysPerMonth = 30): number {
  return (powerWatts * (hoursPerDay * daysPerMonth)) / 1000;
}

/**
 * Calculates Slab-based Billing based on local slabs.
 * Example slabs:
 * 0-100 units = ₹5/unit
 * 101-300 units = ₹8/unit
 * 301+ units = ₹10/unit
 * @param kwh Total monthly consumption in kWh
 * @returns Total estimated cost in ₹
 */
export function calculateBilling(kwh: number): number {
  let cost = 0;
  if (kwh <= 100) {
    cost = kwh * 5;
  } else if (kwh <= 300) {
    cost = 100 * 5 + (kwh - 100) * 8;
  } else {
    cost = 100 * 5 + 200 * 8 + (kwh - 300) * 10;
  }
  return cost;
}

/**
 * Uses a conversion factor of 0.85kg CO2 per kWh to estimate environmental impact.
 * @param kwh Total monthly consumption in kWh
 * @returns CO2 emissions in kg
 */
export function calculateCarbon(kwh: number): number {
  return kwh * 0.85;
}

/**
 * Calculates equivalent trees needed to offset the carbon footprint.
 * Assuming 1 mature tree absorbs ~21kg of CO2 per year (so ~1.75kg per month).
 * @param co2kg CO2 emissions in kg
 * @returns Number of trees equivalent
 */
export function calculateTreesOffset(co2kg: number): number {
  return co2kg / 1.75;
}

/**
 * Calculates a Green Score out of 100 based on monthly consumption.
 * Lower consumption = Higher score.
 * 0 kWh = 100 score, 500+ kWh = 0 score.
 * @param kwh Total monthly consumption in kWh
 * @returns Green Score (0-100)
 */
export function calculateGreenScore(kwh: number): number {
  const score = 100 - (kwh / 5);
  return Math.max(0, Math.min(100, Math.round(score)));
}
