import React, { ReactNode } from "react";
import Link from "next/link";

// Define the interface for the layout props
interface LayoutProps {
  children: ReactNode;
  token: string | null;
  handleLogout: () => void;
}

export default function Layout({ children, token, handleLogout }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">Personal Finance Advisor</Link>
          </div>
          <nav className="space-x-6">
            {/* Only render links based on the global token state */}
            {token ? (
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

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto px-4 py-8">{children}</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2024 Personal Finance Advisor. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
