
import { OilStatusPieChart } from "@/components/OilStatusPieChart";
import { DailyUsageChart } from "@/components/DailyUsageChart";
import { RefillHistoryChart } from "@/components/RefillHistoryChart";
import { oilUsageData } from "@/utils/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Oil Usage Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your heating oil consumption and refill history</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OilStatusPieChart
            used={oilUsageData.current.used}
            remaining={oilUsageData.current.remaining}
          />
          <DailyUsageChart data={oilUsageData.dailyUsage} />
          <RefillHistoryChart data={oilUsageData.refillHistory} />
        </div>
      </div>
    </div>
  );
};

export default Index;
