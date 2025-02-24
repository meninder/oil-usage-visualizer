
interface OilDataResponse {
  [date: string]: {
    gallons: number;
    change_gallons?: number | null;
  };
}

export const fetchDailyData = async (): Promise<OilDataResponse> => {
  const response = await fetch('https://o3rm6sgjxd.execute-api.us-east-1.amazonaws.com/main/getDailyData');
  if (!response.ok) {
    throw new Error('Failed to fetch daily data');
  }
  return response.json();
};

export const fetchRefillData = async (): Promise<OilDataResponse> => {
  const response = await fetch('https://8rtdju7dv9.execute-api.us-east-1.amazonaws.com/main/getRefillsData');
  if (!response.ok) {
    throw new Error('Failed to fetch refill data');
  }
  return response.json();
};

export const transformDailyData = (data: OilDataResponse) => {
  return Object.entries(data)
    .map(([date, value]) => ({
      date,
      gallons: value.change_gallons ?? 0, // Use change_gallons for daily usage, defaulting to 0 if null
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(entry => entry.gallons !== null); // Filter out null values
};

export const transformRefillData = (data: OilDataResponse) => {
  return Object.entries(data)
    .map(([date, value]) => ({
      date,
      gallons: value.gallons, // Use gallons directly for refill amounts
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getCurrentTankStatus = (data: OilDataResponse) => {
  const TANK_CAPACITY = 330;
  
  // Get the latest date
  const dates = Object.keys(data).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  const latestDate = dates[0];
  const remaining = data[latestDate].gallons;
  const used = TANK_CAPACITY - remaining;
  
  return {
    remaining,
    used
  };
};
