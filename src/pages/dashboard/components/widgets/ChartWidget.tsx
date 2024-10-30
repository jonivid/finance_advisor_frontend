import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartWidget({ token }: { token: string | null }) {
  const [chartData, setChartData] = useState<ChartData<
    "line",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_NEST_SERVER_URL}/finance/chart-data`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          const data = response.data;
          setChartData({
            labels: ["Jan", "Feb", "Mar"],
            datasets: [
              {
                label: "Income",
                data: data.incomeData,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
              },
              {
                label: "Expenses",
                data: data.expenseData,
                borderColor: "#FF5252",
                backgroundColor: "rgba(255, 82, 82, 0.2)",
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching chart data", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Income vs Expenses Over Time" },
    },
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg flex flex-col justify-between h-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Income vs Expenses
      </h2>
      {chartData ? (
        <div className="relative h-64">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      )}
    </div>
  );
}
