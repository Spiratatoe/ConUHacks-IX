"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form } from "@/app/form_register"; // Import updated Form component
import { SubmitButton } from "@/app/submit-button"; // Import SubmitButton


export default function RegisterPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            router.push("/login");
        } else {
            setError("Failed to register. Try again.");
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                    <p className="text-sm text-gray-500">Create an account with your name, email and password</p>
                </div>
                {/* ✅ Use updated Form component */}
                <Form onSubmit={handleSubmit}>
                    <SubmitButton>Sign Up</SubmitButton>
                </Form>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <p className="text-center text-sm text-gray-600">
                    {'Already have an account? '}
                    <Link href="/login" className="font-semibold text-gray-800">
                        Sign in
                    </Link>
                    {' instead.'}
                </p>
                  
            </div>
        </div>
    );
}