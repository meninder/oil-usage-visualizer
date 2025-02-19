
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface OilStatusPieChartProps {
  used: number;
  remaining: number;
}

export const OilStatusPieChart = ({ used, remaining }: OilStatusPieChartProps) => {
  const data = [
    { name: "Used", value: used },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#FF6B6B", "#4ECDC4"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px] p-4 bg-white rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Tank Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value} gallons`}
            contentStyle={{ background: "white", border: "none", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm">
              {entry.name}: {entry.value} gal
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
