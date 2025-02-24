
import { OilStatusPieChart } from "@/components/OilStatusPieChart";
import { DailyUsageChart } from "@/components/DailyUsageChart";
import { RefillHistoryChart } from "@/components/RefillHistoryChart";
import { fetchDailyData, fetchRefillData, transformDailyData, getCurrentTankStatus } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  const { data: dailyDataResponse, isLoading: isDailyLoading, error: dailyError } = useQuery({
    queryKey: ['dailyUsage'],
    queryFn: fetchDailyData,
  });

  const { data: refillData, isLoading: isRefillLoading, error: refillError } = useQuery({
    queryKey: ['refillHistory'],
    queryFn: async () => {
      const response = await fetchRefillData();
      return transformDailyData(response);
    },
  });

  const tankStatus = dailyDataResponse ? getCurrentTankStatus(dailyDataResponse) : { remaining: 0, used: 0 };
  const dailyData = dailyDataResponse ? transformDailyData(dailyDataResponse) : [];

  if (dailyError || refillError) {
    toast({
      title: "Error",
      description: "Failed to fetch data",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Oil Usage Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your heating oil consumption and refill history</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OilStatusPieChart
            used={tankStatus.used}
            remaining={tankStatus.remaining}
          />
          <DailyUsageChart 
            data={dailyData} 
            isLoading={isDailyLoading}
          />
          <RefillHistoryChart 
            data={refillData || []}
            isLoading={isRefillLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
