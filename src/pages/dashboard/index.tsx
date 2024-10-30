import { useState, useEffect } from "react";
import SummaryWidget from "./components/widgets/SummaryWidget";
import dynamic from "next/dynamic";

const ChartWidget = dynamic(() => import("./components/widgets/ChartWidget"), {
  ssr: false,
});
import IncomeExpenseFormWidget from "./components/widgets/IncomeExpenseFormWidget";

export default function DashboardPage({ token }: { token: string | null }) {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const isExpired = decodedToken.exp * 1000 < Date.now();
        setIsTokenValid(!isExpired);
      } catch (error) {
        console.error("Invalid token", error);
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  // If the token validity check hasn’t completed yet, show a loading placeholder
  if (isTokenValid === null) {
    return (
      <div className="text-center text-gray-500 font-medium mt-8">
        Loading...
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="text-center text-red-500 font-medium mt-8">
        Please log in to view your dashboard
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SummaryWidget token={token} />
        <ChartWidget token={token} />
        <IncomeExpenseFormWidget token={token} />
      </div>
    </div>
  );
}
