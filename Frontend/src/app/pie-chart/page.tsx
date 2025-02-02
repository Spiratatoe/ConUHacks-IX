"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import PieChart from "../components/PieChart";
import ExpenseTable from "../components/ExpenseTable";

export default function PieChartPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Pie Chart & Expenses</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>

      {/* Pie Chart */}
      <div className="bg-white p-6 shadow-lg rounded-lg w-fit">
        <PieChart />
      </div>

      {/* Expense Table */}
      <ExpenseTable />

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        🔙 Go Back
      </button>
    </div>
  );
}
