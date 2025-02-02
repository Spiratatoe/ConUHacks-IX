"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChartComponent from "../components/ChartComponent"; // ✅ Import Chart Component

export default function Dashboard() {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const router = useRouter();

    // useEffect(() => {
    //     const userId = localStorage.getItem("userId");

    //     if (!userId) {
    //         router.push("/login"); // 🔄 Redirect if not logged in
    //         return;
    //     }

    //     fetch(`http://localhost:3000/api/user/${userId}`)
    //         .then((res) => res.json())
    //         .then((data) => setUser(data))
    //         .catch(() => router.push("/login"));
    // }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">
                {user ? `Welcome, ${user.email}!` : "Loading..."}
            </h1>

            {/* 📊 Financial Chart Section */}
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <ChartComponent />
            </div>

            {/* 🔴 Logout Button */}
            <SignOut />
        </div>
    );
}

function SignOut() {
    const router = useRouter();

    const handleSignOut = () => {
        localStorage.removeItem("userId"); // 🔄 Clear authentication
        router.push("/login");
    };

    return (
        <button
            onClick={handleSignOut}
            className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg shadow-lg transition-all"
        >
            Sign Out
        </button>
    );
}
