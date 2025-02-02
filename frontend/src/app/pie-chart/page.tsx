"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import PieChart from "../components/PieChart";

export default function PieChartPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Expense Analytics</title>
            </Head>

            {/* Header */}
            <div className="w-full px-8 py-6 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Expense Analytics</h1>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="inline-flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-8 py-10">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Pie Chart Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Expense Distribution</h2>
                        <div className="flex justify-center">
                            <PieChart />
                        </div>
                    </div>

                    {/* Expense Table Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Detailed Breakdown</h2>
                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount ($)
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FF6B6B]">Rent</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">1,200</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4ECDC4]">Shopping</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">400</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFD93D]">Food</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">150</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#45B7D1]">Entertainment</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">200</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#96C]">Health</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">180</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-8 mt-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                        <p className="mt-2 text-2xl font-semibold text-gray-900">$2,845.00</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-sm font-medium text-gray-500">Biggest Category</h3>
                        <p className="mt-2 text-2xl font-semibold text-gray-900">Rent</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-sm font-medium text-gray-500">Monthly Change</h3>
                        <p className="mt-2 text-2xl font-semibold text-green-600 flex items-center">
                            <span className="text-sm mr-1">↓</span> 12%
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}