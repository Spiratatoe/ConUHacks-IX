"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const ChartComponent = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Monthly Expenses ($)",
                data: [400, 600, 300, 800, 700, 900],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-center mb-4">📊 Financial Overview</h2>
            <Line data={data} />
        </div>
    );
};
export default ChartComponent;
