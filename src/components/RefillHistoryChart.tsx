
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface RefillData {
  date: string;
  gallons: number;
}

interface RefillHistoryChartProps {
  data: RefillData[];
}

export const RefillHistoryChart = ({ data }: RefillHistoryChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full h-[300px] p-4 bg-white rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Refill History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "MMM d")}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `${value} gallons`}
            labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
            contentStyle={{ background: "white", border: "none", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          />
          <Bar dataKey="gallons" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
