import Image from "next/image";
import Link from "next/link";
import { Card } from "@/app/card";

export default function Home() {
  return (
      <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gray-50 overflow-hidden">
        <main className="flex flex-col gap-8 items-center">
          {/* Ensures the Card is centered properly */}
          <Card title="Welcome" description="Sign in or sign up to get started!">
            <div className="flex gap-4 items-center flex-col sm:flex-row justify-center">
              <Link
                  href="/login"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Sign in
              </Link>
              <Link
                  href="/register"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Sign up
              </Link>
            </div>
          </Card>
        </main>
      </div>
  );
}