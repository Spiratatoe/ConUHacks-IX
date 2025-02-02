"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import expenses, { Expense } from "@/data/expenses";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: expenses.map((e: Expense) => e.category),
    datasets: [
      {
        data: expenses.map((e: Expense) => e.amount),
        backgroundColor: expenses.map((e: Expense) => e.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-80 sm:w-96">
      <Pie data={data} />
    </div>
  );
}
