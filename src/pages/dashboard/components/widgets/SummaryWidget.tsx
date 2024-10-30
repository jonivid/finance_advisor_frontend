import { useEffect, useState } from "react";
import axios from "axios";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
}

interface SummaryWidgetProps {
  token: string | null;
}

export default function SummaryWidget({ token }: SummaryWidgetProps) {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_NEST_SERVER_URL}/finance/summary`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setSummary(response.data);
        } catch (error) {
          console.error("Error fetching financial summary", error);
        }
      }
    };

    fetchSummary();
  }, [token]);

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg flex flex-col justify-between h-full">
      <h2 className="text-xl font-semibold text-gray-700">Financial Summary</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {summary ? (
          <>
            <div className="text-center">
              <h3 className="text-gray-500">Total Income</h3>
              <p className="text-2xl font-bold text-green-500">
                ${summary.totalIncome}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-500">
                ${summary.totalExpenses}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-500">Net Savings</h3>
              <p className="text-2xl font-bold text-blue-500">
                ${summary.netSavings}
              </p>
            </div>
          </>
        ) : (
          <div className="col-span-3 text-center text-gray-400">Loading...</div>
        )}
      </div>
    </div>
  );
}
