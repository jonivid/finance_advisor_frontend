/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

// Define the allowed chart types
type ChartType = "line" | "pie" | "bar" | "dual-line" | "savings";

export default function ChartWidget({ token }: { token: string | null }) {
  // State to manage the selected chart type
  const [chartType, setChartType] = useState<ChartType>("line");
  const [chartData, setChartData] = useState<any>(null);

  // Effect to fetch chart data based on the selected chart type
  useEffect(() => {
    const fetchChartData = async () => {
      if (token) {
        try {
          // Determine the endpoint based on the chart type
          let endpoint: string;
          switch (chartType) {
            case "line":
              endpoint = "/finance/chart-data";
              break;
            case "pie":
              endpoint = "/finance/category-distribution";
              break;
            case "savings":
              endpoint = "/finance/chart-data"; // Reusing the same data for savings calculation
              break;
            case "dual-line":
              endpoint = "/finance/chart-data"; // Reusing the same data for dual-line chart
              break;
            case "bar":
              endpoint = "/finance/year-over-year-comparison";
              break;
            default:
              endpoint = "/finance/chart-data";
          }

          // Prepend the base URL from environment variables
          const baseURL = process.env.NEXT_PUBLIC_NEST_SERVER_URL;
          const fullURL = `${baseURL}${endpoint}`;

          console.log("Making request to:", fullURL); // Debugging output
          console.log("Authorization token:", token); // Debugging output

          // Fetch data from the API
          const response = await axios.get(fullURL, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setChartData(response.data);
        } catch (error) {
          console.error("Error fetching chart data:", error);
          alert("Failed to fetch chart data. Please try again later.");
        }
      }
    };

    fetchChartData();
  }, [token, chartType]);

  // Function to set the chart type
  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <div className="chart-widget max-w-3xl mx-auto">
      {/* Chart Type Toggle Buttons */}
      <div className="flex justify-center mb-4 space-x-2">
        {["line", "pie", "bar", "dual-line", "savings"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
              chartType === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            } transition`}
            onClick={() => handleChartTypeChange(type as ChartType)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      <div style={{ height: "400px" }}>
        {chartType === "line" && chartData && (
          <Line
            data={{
              labels: chartData.map((item: any) => item.month),
              datasets: [
                {
                  label: "Income",
                  data: chartData.map((item: any) => item.totalIncome),
                  borderColor: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.2)",
                },
                {
                  label: "Expenses",
                  data: chartData.map((item: any) => item.totalExpense),
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        )}
        {chartType === "pie" && chartData && (
          <Pie
            data={{
              labels: chartData.map((item: any) => item.category),
              datasets: [
                {
                  data: chartData.map((item: any) => item.totalAmount),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
          />
        )}
        {chartType === "bar" && chartData && (
          <Bar
            data={{
              labels: chartData.map((item: any) => item.month),
              datasets: [
                {
                  label: "Current Year",
                  data: chartData.map((item: any) => item.currentYear),
                  backgroundColor: "rgba(75, 192, 192, 0.5)",
                },
                {
                  label: "Previous Year",
                  data: chartData.map((item: any) => item.previousYear),
                  backgroundColor: "rgba(153, 102, 255, 0.5)",
                },
              ],
            }}
          />
        )}
        {chartType === "dual-line" && chartData && (
          <Line
            data={{
              labels: chartData.map((item: any) => item.month),
              datasets: [
                {
                  label: "Income Stability",
                  data: chartData.map((item: any) => item.totalIncome),
                  borderColor: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                },
                {
                  label: "Expense Variability",
                  data: chartData.map((item: any) => item.totalExpense),
                  borderColor: "orange",
                  backgroundColor: "rgba(255, 165, 0, 0.2)",
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        )}
        {chartType === "savings" && chartData && (
          <Line
            data={{
              labels: chartData.map((item: any) => item.month),
              datasets: [
                {
                  label: "Cumulative Savings",
                  data: chartData.map(
                    (item: any) =>
                      parseFloat(item.totalIncome) -
                      parseFloat(item.totalExpense),
                  ),
                  borderColor: "purple",
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    </div>
  );
}
