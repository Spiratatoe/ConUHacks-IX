"use client";

import expenses, { Expense } from "../../data/expenses";

export default function ExpenseTable() {
  return (
    <div className="w-full max-w-2xl mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Expense Breakdown</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-right">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: Expense, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition-all">
              <td className="py-2 px-4" style={{ color: expense.color }}>
                {expense.category}
              </td>
              <td className="py-2 px-4 text-right">${expense.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
