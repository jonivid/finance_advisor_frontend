// layout.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  token: string | null;
  handleLogout: () => void;
}

export default function Layout({ children, token, handleLogout }: LayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [clientToken, setClientToken] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setClientToken(token);
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">Personal Finance Advisor</Link>
          </div>
          <nav className="space-x-6">
            {/* Use a consistent structure with placeholders */}
            {isClient && clientToken ? (
              <>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2024 Personal Finance Advisor. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
