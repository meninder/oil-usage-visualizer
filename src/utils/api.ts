
interface DailyDataResponse {
  [date: string]: {
    gallons: number;
  };
}

export const fetchDailyData = async (): Promise<DailyDataResponse> => {
  const response = await fetch('https://o3rm6sgjxd.execute-api.us-east-1.amazonaws.com/main/getDailyData');
  if (!response.ok) {
    throw new Error('Failed to fetch daily data');
  }
  return response.json();
};

export const transformDailyData = (data: DailyDataResponse) => {
  return Object.entries(data)
    .map(([date, value]) => ({
      date,
      gallons: value.gallons,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
