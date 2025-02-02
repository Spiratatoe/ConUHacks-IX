"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Form } from '@/app/form';
import { SubmitButton } from '@/app/submit-button';

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form behavior
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const userId = await response.text();
            localStorage.setItem("userId", userId);
            router.push("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">Use your email and password to sign in</p>
                </div>
                {/* ✅ Use the updated Form component with `onSubmit` */}
                <Form onSubmit={handleSubmit}>
                    <SubmitButton>Sign in</SubmitButton>
                </Form>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <p className="text-center text-sm text-gray-600 py-3">
                    {"Don't have an account? "}
                    <Link href="/register" className="font-semibold text-gray-800">
                        Sign up
                    </Link>
                    {" for free."}
                </p>
            </div>
        </div>
    );
}