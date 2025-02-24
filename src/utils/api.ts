
interface OilDataResponse {
  [date: string]: {
    gallons: number;
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
      gallons: value.gallons,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

