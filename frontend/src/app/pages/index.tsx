import Head from "next/head";
import PieChart from "../components/PieChart";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Expense Chart</title>
      </Head>

      <h1 className="text-3xl font-bold mb-4">Expense Breakdown</h1>
      <div className="w-96 h-96 bg-white p-4 shadow-lg rounded-lg">
        <PieChart />
      </div>
    </div>
  );
}
