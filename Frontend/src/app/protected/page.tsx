"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            router.push("/login"); // 🔄 Redirect if not logged in
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch(() => router.push("/login"));
    }, []);

    return (
        <div className="flex h-screen bg-black">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
                {user ? `You are logged in as ${user.email}` : "Loading..."}
                <SignOut />
            </div>
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
        <button onClick={handleSignOut} className="mt-4 bg-red-500 p-2 rounded">
            Sign out
        </button>
    );
}