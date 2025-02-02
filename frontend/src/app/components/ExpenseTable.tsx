"use client";

import expenses, { Expense } from "../../data/expenses";

export default function ExpenseTable() {
    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="w-full max-w-2xl mt-8">
            <h2 className="text-2xl font-semibold mb-6">Detailed Breakdown</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider text-right">
                            Amount ($)
                        </div>
                    </div>
                </div>

                {/* Expense Items */}
                <div className="divide-y divide-gray-200">
                    {expenses.map((expense: Expense, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <div
                                className="text-base font-medium"
                                style={{ color: expense.color }}
                            >
                                {expense.category}
                            </div>
                            <div className="text-right font-semibold text-gray-900">
                                {expense.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}

                    {/* Total Row */}
                    <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-gray-50">
                        <div className="text-base font-semibold text-gray-900">
                            Total
                        </div>
                        <div className="text-right font-bold text-gray-900">
                            {total.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}