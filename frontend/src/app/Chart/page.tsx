"use client";
import ChartComponent from "../components/ChartComponent"; 
import Link from "next/link";

export default function ChartPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">📊 Financial Chart</h1>

            {/* Chart Component */}
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <ChartComponent />
            </div>

            {/* Back to Dashboard Link */}
            <Link href="/protected">
                <button className="mt-6 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg shadow-lg transition-all">
                    🔙 Back to Dashboard
                </button>
            </Link>
        </div>
    );
}
