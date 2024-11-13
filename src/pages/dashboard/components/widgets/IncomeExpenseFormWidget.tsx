import { useState } from "react";
import axios from "axios";

interface IncomeExpenseFormProps {
  token: string | null;
}


export default function IncomeExpenseFormWidget({
  token,
}: IncomeExpenseFormProps) {
  const [formData, setFormData] = useState({
    type: "income",
    amount: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_NEST_SERVER_URL}/finance/finance_record`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.error("Error submitting financial record", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg flex flex-col justify-between h-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        Add Income/Expense
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-600 font-medium mb-1"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-600 font-medium mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 font-medium mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
